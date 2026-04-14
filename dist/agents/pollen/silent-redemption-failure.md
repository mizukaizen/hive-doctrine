---
title: "Silent Redemption Failure — When Your Bot Says 'Redeemed' but the Money Never Arrives"
author: "Melisia Archimedes"
collection: "Diagnostic Patterns"
tier: "pollen"
price: 0
version: "1.0.0"
last_updated: "2026-03-09"
audience: "Prediction market bot operators, DeFi developers, automated trading system builders"
hive_doctrine_id: "HD-0033"
---

# Silent Redemption Failure Pattern

## The Problem

Your prediction market bot just won a trade. Position status: winning. Your redemption pipeline executes flawlessly. Database records show `redeemed=1`. The system logs completion. No errors. No warnings.

The money never arrives.

This is silent redemption failure—one of the deadliest bugs in conditional token systems because everything looks correct until you check the blockchain.

### How It Happens

In prediction market frameworks, winning positions don't automatically settle. They require an active on-chain redemption: a contract call that burns the conditional tokens and releases the collateral back to your wallet. No call = no settlement = no money, regardless of what your database says.

Silent failure occurs in a specific sequence:

1. **Bot holds winning position.** Conditional tokens sit in your smart contract wallet.
2. **Redemption pipeline triggers.** System queries your wallet for the token balance.
3. **Query hits the wrong address.** Due to a wallet derivation bug, the system queries a garbage address instead of your actual wallet.
4. **Garbage address has zero balance.** Of course it does—no tokens were ever sent there.
5. **System interprets zero as success.** "Balance is zero, tokens were redeemed, collateral released. Mark as redeemed."
6. **No on-chain transaction submitted.** Because the code never reached the actual redemption contract call.
7. **Database updated anyway.** `redeemed=1`, `tx_hash=NULL`, `timestamp=now()`.
8. **Money stays locked.** On the actual blockchain, your collateral is still trapped in conditional tokens.

The system reports success. The audit log shows completion. But when you check the blockchain explorer, there's no redemption transaction. When you check your wallet balance, the funds aren't there.

### The Root Cause: Wallet Derivation Bug

The bug lives in wallet address derivation.

Your prediction market bot typically runs against a smart contract wallet (for batching, security, or gas optimisation). This wallet is derived from an Externally Owned Account—an EOA with a private key. The derivation function should take the EOA address as input and deterministically compute the smart contract wallet address.

The bug occurs when:

- **The derivation function receives the smart contract wallet address instead of the EOA.**
- System has two address pointers, both meant to refer to the same entity.
- Environment variables or configuration files store both addresses.
- Code path accidentally passes the wrong one to the derivation function.
- Function computes a new address: `derive(smart_contract_wallet)` → garbage address.
- This garbage address is then used as the query target for token balance.

Result: a wallet address that exists nowhere on the blockchain, contains zero tokens, and causes the system to declare success when it should have failed.

### Why Silent Failure Is Worse Than Loud Failure

A loud failure—an exception, a reverted transaction, a validation error—would halt the pipeline and trigger alerting. You'd see it immediately.

A silent failure passes all internal checks:

- Database consistency checks pass (you wrote to the DB correctly).
- Logging checks pass (you logged the success message correctly).
- Balance query checks pass (you got a response back, and zero is a valid response).
- No contract call was attempted, so no on-chain rejection to trigger alarms.

By the time you notice—days or weeks later, when you do a manual audit or reconcile P&L—the bug has already cost you real capital on multiple winning positions.

---

## The Solution

### 1. Detection

**Check the database for phantom redemptions:**

```sql
SELECT trade_id, position_id, redeemed_at, tx_hash, created_at
FROM redemptions
WHERE tx_hash IS NULL AND redeemed_at IS NOT NULL;
```

Any rows returned are likely silent failures. The transaction hash should never be NULL if the redemption actually executed on-chain.

**Cross-check the blockchain:**

For each trade marked as redeemed in your database, query the blockchain explorer (or contract directly) to confirm the redemption transaction exists. Use the `tx_hash` as the source of truth. If it's NULL, it never happened.

**Inspect your wallet derivation code:**

```python
# Incorrect pattern:
def derive_contract_wallet(wallet_address):
    # BUG: receives smart_contract_wallet instead of eoa
    return keccak256(abi.encodePacked(wallet_address, salt))

# Correct pattern:
def derive_contract_wallet(eoa_address):
    # Takes EOA as input, derives deterministic contract wallet
    return keccak256(abi.encodePacked(eoa_address, salt))
```

Audit every call site. Trace backward from the failure: which function received which address, and in what order?

**Cross-check environment variables:**

Your system likely has:
- `WALLET_EOA` — the private key address
- `WALLET_CONTRACT` — the smart contract wallet address

Verify these are correctly assigned in all configuration sources (`.env` files, Docker secrets, deployment manifests). A common mistake: loading them in the wrong order, or one source overwriting the other.

**Look for ghost fills:**

Even with correct wallet derivation, you might discover additional orphaned trades:

```sql
SELECT trade_id, position_id, balance_query_result, tx_hash
FROM redemptions
WHERE balance_query_result = 0 AND tx_hash IS NULL;
```

These are orders that matched in the orderbook but were never settled on-chain. They're "ghost fills"—profitable on paper, worthless in reality. The correct redemption code would have retried or escalated the alert, but silent failure prevented that.

### 2. Root Cause Repair

**Patch the derivation function** to accept only the EOA address:

```python
def redeem_position(trade_id, eoa_address):
    # Derive from EOA only, never from contract wallet
    contract_wallet = derive_contract_wallet(eoa_address)

    # Confirm before proceeding
    assert contract_wallet == os.getenv("WALLET_CONTRACT")

    # Query the correct wallet
    balance = query_conditional_tokens(contract_wallet)

    # Guard against silent success on zero balance
    if balance == 0:
        log.error(f"Zero balance for {contract_wallet}, skipping redemption")
        return False

    # Submit the real transaction
    tx_hash = submit_redemption_tx(contract_wallet, trade_id)
    assert tx_hash is not None

    # Only mark redeemed after on-chain confirmation
    db.update_trade(trade_id, redeemed=True, tx_hash=tx_hash)
```

Key changes:
- Input validation: ensure the input is the EOA, not the contract wallet.
- Assertion guard: confirm the derived address matches the expected contract wallet.
- Zero-balance guard: refuse to declare success if balance is zero.
- Transaction requirement: never update the database without a real `tx_hash`.

**Reset affected trades:**

```sql
UPDATE redemptions
SET redeemed = 0, tx_hash = NULL, redeemed_at = NULL
WHERE redeemed_at IS NOT NULL AND tx_hash IS NULL;
```

Now re-run the redemption pipeline on these trades with the patched code.

**Restart and monitor:**

- Deploy the patched code to all services using the same module.
- Watch the redemption pipeline for real transaction hashes (non-NULL) on each processed trade.
- Compare on-chain transaction count before and after: you should see new redemption calls appearing on the blockchain.

### 3. Propagation Prevention

**The trap:** You patch the bug in one service, but three other microservices import the same (buggy) wallet derivation module from a shared library.

**The mitigation:**

- Centralise wallet derivation in a single, tested module.
- Pin the module version explicitly in every service that imports it. Never rely on implicit version resolution.
- Add a test that confirms the derived address matches the expected contract wallet.
- Set up a CI/CD gate that runs this test on every merge. Fail the build if the test fails.

```python
def test_derivation():
    eoa = os.getenv("WALLET_EOA")
    expected_contract = os.getenv("WALLET_CONTRACT")
    actual_contract = derive_contract_wallet(eoa)
    assert actual_contract == expected_contract, "Derivation mismatch"
```

Run this test across all services that import the wallet module, not just one.

---

## Key Insights

### Insight 1: Database Consistency ≠ Blockchain Consistency

Your database can be internally consistent (all columns correct, all foreign keys valid) while being completely out of sync with the blockchain. A redeemed trade in the database with a NULL transaction hash is a signal of this mismatch.

**Action:** Always treat the blockchain as the source of truth. The database is a cache. Mismatches are bugs.

### Insight 2: Success Logs Can Lie

A log entry saying "Redemption successful" is meaningless if no on-chain transaction occurred. Logging success is not the same as achieving success.

**Action:** Restructure logging to record the transaction hash at completion. If there's no hash, the log should say "attempted" or "initiated", not "completed". Better: guard the success log behind an actual transaction confirmation.

### Insight 3: Zero Balance Is Not Always a Success Signal

In query-first redemption patterns, a zero balance *could* mean success (tokens were burned) or it could mean failure (wrong wallet, no tokens ever sent there). The system needs additional context to distinguish.

**Action:** Always confirm the wallet address before interpreting the balance. Use assertions, not assumptions. If `balance == 0`, halt and require human review before declaring success.

### Insight 4: Shared Code Is Shared Risk

A bug in a shared wallet module will corrupt all services that import it. The patch must be propagated to all consumers, or the bug will persist in the unpatched services.

**Action:** Implement version pinning and automated testing across all service consumers of shared modules. A test failure in *any* consumer should block a deployment.

---

## Implementation Checklist

- [ ] Query database for phantom redemptions (NULL tx_hash with redeemed=1)
- [ ] Cross-check each transaction hash on the blockchain explorer
- [ ] Inspect wallet derivation code; identify all call sites
- [ ] Verify environment variables are assigned in the correct order
- [ ] Add zero-balance guard to redemption logic
- [ ] Add assertion check: derived wallet == expected wallet
- [ ] Create CI test for wallet derivation across all services
- [ ] Reset affected trades in the database
- [ ] Deploy patched code to all services
- [ ] Monitor blockchain for real redemption transactions (non-NULL hashes)
- [ ] Compare on-chain transaction count before and after
- [ ] Update runbook with wallet derivation requirements
- [ ] Document the bug and fix in the team wiki/knowledge base

---

## Practical Example: Before and After

### Before (Vulnerable)

```python
# config.py
WALLET_CONTRACT = os.getenv("WALLET_CONTRACT")
WALLET_EOA = os.getenv("WALLET_EOA")

# redemption.py
def process_redemption(trade_id):
    # BUG: passes contract wallet to derivation function
    derived = derive_wallet(WALLET_CONTRACT)

    # derived != WALLET_CONTRACT, but code doesn't check
    balance = query_tokens(derived)  # queries wrong address

    if balance >= 0:  # zero is always >= 0
        db.mark_redeemed(trade_id, tx_hash=None)  # NULL tx_hash!
        log.info("Trade redeemed successfully")
        return True
```

Result: Database says redeemed, blockchain says not redeemed, money is locked.

### After (Hardened)

```python
# config.py
WALLET_EOA = os.getenv("WALLET_EOA")
WALLET_CONTRACT = os.getenv("WALLET_CONTRACT")

# redemption.py
def process_redemption(trade_id):
    # Derive from EOA only
    derived = derive_wallet(WALLET_EOA)

    # Verify derivation matches expected contract
    assert derived == WALLET_CONTRACT, \
        f"Derivation mismatch: {derived} != {WALLET_CONTRACT}"

    # Query correct wallet
    balance = query_tokens(WALLET_CONTRACT)

    # Guard against zero balance
    if balance == 0:
        log.error(f"Zero balance, skipping redemption for trade {trade_id}")
        return False

    # Submit real transaction
    tx_hash = submit_redemption(WALLET_CONTRACT, trade_id)

    if not tx_hash:
        log.error(f"Failed to get tx_hash for trade {trade_id}")
        return False

    # Only mark redeemed after confirming tx_hash
    db.mark_redeemed(trade_id, tx_hash=tx_hash)
    log.info(f"Trade {trade_id} redeemed in tx {tx_hash}")
    return True
```

Result: Transaction hash is required before marking as redeemed. Database stays in sync with blockchain.

---

## Packaging Notes

**Who should read this:**

- Prediction market bot operators building on conditional token frameworks
- DeFi engineers implementing redemption pipelines
- Automated trading system builders with multiple microservices
- Anyone who's lost capital to a mysterious silent failure and wants to understand the pattern

**Why it's valuable:**

This pattern explains a failure mode that looks identical to success until you dig into the blockchain. Most teams don't catch it until they're reconciling P&L weeks later. This guide lets you detect it within days, understand the root cause, and patch it systematically.

**Next steps after reading:**

1. Audit your wallet derivation code for this exact pattern.
2. Check your database for phantom redemptions.
3. If found, follow the recovery steps above.
4. Implement the hardened version and CI test.
5. Document the pattern in your team runbook.

---

**Version history:**

- 1.0.0 (2026-03-09): Initial publication. Pattern identified in production automated trading systems.
