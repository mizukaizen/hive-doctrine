---
title: "Status Enum Mismatch — Why Your Pipeline Runs Perfectly and Processes Nothing"
author: "Melisia Archimedes"
collection: "Diagnostic Patterns"
tier: "pollen"
price: 0
version: "1.0.0"
last_updated: "2026-03-09"
audience: "Backend developers, bot operators, anyone running status-driven automated pipelines"
hive_doctrine_id: "HD-0034"
---

## The Bug That Looks Fine

Your redeemer process fires every cycle like clockwork. Logs are clean. No errors. No warnings. It completes in 200ms. Perfect execution. And it has processed exactly zero items all week.

You don't notice because there's no alert for "pipeline ran but found nothing to do." The system looks healthy. Everything is technically working. You're just not processing anything.

This is status enum mismatch—the silent killer of automated pipelines.

## The Pattern

Your pipeline does something like this:

```
1. Query for items WHERE status = 'PENDING'
2. Process each item (mark as swept, send to destination, log proof)
3. Commit changes
4. Exit successfully
```

The database, however, contains items with status `'UNKNOWN'`. Not `'PENDING'`. `'UNKNOWN'`.

Your query returns zero rows. Every cycle. You process zero items. Everything works. Nothing happens.

The contract between your code and your data broke, and nobody noticed because the failure mode is silent success.

## How This Happens

**Scenario 1: The Refactor Cascade**

A developer renames status values for clarity:
- `'PENDING'` → `'UNRESOLVED'`
- `'PROCESSED'` → `'SWEPT'`

They update the domain model. They update the state machine. They forget about the sweeper function that lives in a different service, written three months ago. That function still queries for `'PENDING'`. The data now says `'UNRESOLVED'`. Zero rows.

**Scenario 2: Copy-Paste From Another Codebase**

You port a payment retry pipeline from system A to system B. System A uses `'RETRY_PENDING'`. System B was already written to use `'WAITING'`. Your new code queries for `'RETRY_PENDING'`. Nothing matches. The sweep stays empty.

**Scenario 3: Gradual Schema Evolution**

Early in development, items are created with `NULL` status. Somewhere along the way, the code was changed to write `'UNKNOWN'` for unresolved items. But the old query that checks `WHERE status IS NULL` still exists in the sweeper. It works great for legacy items, but new items never get picked up.

**Scenario 4: Test-to-Production Drift**

Your integration tests create items with status `'PENDING'`. Your production code creates items with status `'QUEUED'` because someone changed the enum values and didn't update tests. Tests pass. Production doesn't work.

## The Tell

You're running this pattern if:

- **Pipeline executes zero times per cycle** — "swept 0 items" in logs, every time
- **No obvious errors** — success returns, clean exit, timing looks normal
- **Data exists but untouched** — you can manually query the database and find eligible items
- **Silent for days** — because there's no alert for "zero items processed," the bug survives in production
- **Cascading downstream failures** — downstream systems expecting data never get it, but blame you eventually

## Detection Checklist

Run this now:

```sql
-- What values actually exist?
SELECT DISTINCT status FROM items LIMIT 20;

-- Count eligible but unprocessed items
SELECT COUNT(*) FROM items WHERE status = 'PENDING';

-- What's actually in there?
SELECT COUNT(*) FROM items WHERE status = 'UNKNOWN';

-- Any items were processed (non-null proof)?
SELECT COUNT(DISTINCT id) FROM items WHERE proof IS NOT NULL;
```

Compare the output to your source code. Search for `WHERE status =` in your codebase. Do they match? If not, you have this bug.

Check your cycle logs for "processed 0 items" pattern. One or two is fine. Every single cycle is a red flag.

## The Fix

**Immediate (this week):**

1. Query your database for actual distinct status values
2. Update your query to match reality: `WHERE status = 'UNKNOWN'` (or whatever the actual value is)
3. Run a backfill to process any accumulated unswept items
4. Deploy

**Long-term (next sprint):**

Write an integration test that proves the end-to-end flow works:

```python
def test_sweeper_picks_up_new_items():
    # Create item in expected pre-processing state
    item = create_item(status='PENDING')

    # Run sweeper
    sweep()

    # Verify it was picked up
    item.refresh()
    assert item.status == 'SWEPT'
    assert item.proof is not None  # Has evidence of processing
```

This test would have caught the bug on day one. Run it before every deployment.

**Ongoing:**

- Add alerting for "zero items processed three cycles in a row"
- Document the enum contract in a central place (not scattered across files)
- Code review any status-driven queries; require reviewer to verify against actual DB schema

## Generalisation

This pattern appears everywhere:

- **Email queues** with status mismatch (code expects `'UNSENT'`, DB contains `'DRAFT'`)
- **Payment retry loops** (query for `'NEEDS_RETRY'`, DB actually has `'FAILED'`)
- **Webhook delivery pipelines** (looking for `'PENDING_DELIVERY'` when DB says `'QUEUED'`)
- **Message brokers** (consumer expects message type `'ORDER_CREATED'`, producer sends `'order_created'`)
- **Job schedulers** (looking for job state `'READY'` when unstarted jobs are `NULL`)

The common thread: a system that consumes data expects a contract (schema, status value, message format), but the producer changed the contract without updating the consumer. The consumer runs fine. It just finds nothing to do.

## Key Insights

**Silent failures are worse than loud ones.** A query that errors immediately gets fixed in minutes. A query that returns empty silently stays broken for weeks.

**Logs don't tell the story.** A sweeper that processes zero items still logs "sweep completed successfully." You need explicit, alarmed counts of "items processed this cycle."

**Integration tests catch this.** Unit tests pass. Schema migrations pass. But an end-to-end test that creates a record in expected state and confirms the pipeline picks it up would fail immediately.

**Data contracts matter.** The gap between producer and consumer is where bugs hide. Document your status enums, message formats, and schema contracts in one place. Review them on every change.

## Implementation Checklist

- [ ] Query actual database values (`SELECT DISTINCT`)
- [ ] Compare to code queries; find mismatches
- [ ] Count unprocessed eligible items (backlog size)
- [ ] Write integration test for end-to-end pickup
- [ ] Add alert for "zero items processed N cycles in a row"
- [ ] Update code to match actual data contract
- [ ] Run backfill for accumulated items
- [ ] Deploy and monitor for non-zero processing
- [ ] Document enum contracts in central location

## Why This Matters

This bug doesn't cause crashes. It causes silent data loss. Items sit in the database forever, never reaching their destination. Downstream systems go without data they expect. Users see incomplete results. And nobody notices for days because the pipeline looks healthy.

The fix is simple—one query change, one integration test, one alert. But the detection takes discipline: you have to care enough to ask "wait, why are we processing zero items every cycle?"

If you're running an automated pipeline, ask that question now. Search your logs for zero. If you find it, dig in.

---

## Hive Doctrine Notes

This pattern generalises across:
- Any status-driven batch processor
- Any schema-coupled consumer-producer pair
- Any system where success and failure are hard to distinguish

The prevention technique (integration test for end-to-end pickup) is portable to all of these.
