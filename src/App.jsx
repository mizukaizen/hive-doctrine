import { useState, useRef } from "react";

// ─── CHAPTER STRUCTURE ──────────────────────────────────────────────────────
// Five-act structure: Problem → Precedent → Architecture → Costs → Path Forward

const CHAPTERS = [
  { id: "home",                num: null, title: "Home" },
  // Part I — The Problem
  { id: "preamble",            num: "00", title: "Preamble" },
  { id: "monotheistic-fallacy",num: "01", title: "The Monotheistic Fallacy" },
  // Part II — The Precedent
  { id: "the-melissae",        num: "02", title: "The Melissae" },
  { id: "nature-knew-first",   num: "03", title: "Nature Knew First" },
  // Part III — The Architecture
  { id: "hive-architecture",   num: "04", title: "The Hive Architecture" },
  { id: "stigmergic-safety",   num: "05", title: "Stigmergic Safety" },
  // Part IV — The Costs
  { id: "cultural-cost",       num: "06", title: "The Cultural Cost" },
  { id: "electricity-bill",    num: "07", title: "The Electricity Bill" },
  { id: "distributed-facade",  num: "08", title: "The Distributed Facade" },
  // Part V — The Path Forward
  { id: "what-this-gets-wrong",num: "09", title: "What This Gets Wrong" },
  { id: "protocol",            num: "10", title: "The Protocol" },
  { id: "manifesto",           num: "11", title: "The Manifesto" },
];

// Maps which chapter id starts a new part (for sidebar labels)
const PART_BREAKS = {
  "preamble":            "I — The Problem",
  "the-melissae":        "II — The Precedent",
  "hive-architecture":   "III — The Architecture",
  "cultural-cost":       "IV — The Costs",
  "what-this-gets-wrong":"V — The Path Forward",
};

// ─── RICH TEXT ───────────────────────────────────────────────────────────────

function Rich({ children, onCite }) {
  if (typeof children !== "string") return children;
  const parts = children.split(/(\*\*[^*]+\*\*|\[\d+\])/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return <strong key={i} style={{ fontWeight: 500, color: "#111827" }}>{p.slice(2, -2)}</strong>;
    if (/^\[\d+\]$/.test(p)) {
      const num = p.slice(1, -1);
      return <sup key={i} style={{ fontSize: "0.65em", color: "#9B7B3C", cursor: onCite ? "pointer" : "default", fontFamily: "Inter, system-ui, sans-serif", fontWeight: 500, marginLeft: 1 }} onClick={() => onCite?.(num)}>{num}</sup>;
    }
    return p;
  });
}

// ─── CHAPTER PREVIEWS (home page listing) ────────────────────────────────────

const PREVIEWS = [
  { num: "00", id: "preamble",             title: "Preamble",                   desc: "Why this document exists, and what the evidence base actually is." },
  { num: "01", id: "monotheistic-fallacy", title: "The Monotheistic Fallacy",   desc: "The theological error embedded in every major AI laboratory — and the Byzantine counter-example." },
  { num: "02", id: "the-melissae",         title: "The Melissae",               desc: "What the bee priestesses of ancient Greece understood about distributed intelligence." },
  { num: "03", id: "nature-knew-first",    title: "Nature Knew First",          desc: "600 million years of evidence: slime mould, murmurations, octopi, and the Irish potato famine." },
  { num: "04", id: "hive-architecture",    title: "The Hive Architecture",      desc: "Many small minds, culturally rooted, collaborating without central command." },
  { num: "05", id: "stigmergic-safety",    title: "Stigmergic Safety",          desc: "Why diversity is the safety mechanism — and why permission systems always fail." },
  { num: "06", id: "cultural-cost",        title: "The Cultural Cost",          desc: "How monolithic AI encodes Western bias at civilisational scale." },
  { num: "07", id: "electricity-bill",     title: "The Electricity Bill",       desc: "415 TWh. 945 TWh. 13,000×. The arithmetic of building gods." },
  { num: "08", id: "distributed-facade",  title: "The Distributed Facade",     desc: "Why the industry's multi-agent systems are still constitutionally monotheistic." },
  { num: "09", id: "what-this-gets-wrong","title": "What This Gets Wrong",     desc: "The honest failure modes of distributed intelligence. A document without weaknesses deserves to be dismissed." },
  { num: "10", id: "protocol",            title: "The Protocol",               desc: "From philosophy to specification — SOUL.md, stigmergy substrate, quorum sensing, immune response." },
  { num: "11", id: "manifesto",           title: "The Manifesto",              desc: "What comes after the monolith." },
];

// ─── CHAPTER CONTENT ─────────────────────────────────────────────────────────

const C = {
  // ── 00 Preamble ─────────────────────────────────────────────────────────
  preamble: {
    sub: "Why this document exists",
    body: [
      { t: "p", x: "The biggest lie in artificial intelligence is that safety requires control." },
      { t: "p", x: "The models consume the electricity of nations and the water of rivers. The companies building them have no coherent plan for what happens when they succeed. And every major laboratory is racing toward the same destination — a single, omniscient, monolithic intelligence. One model to rule them all." },
      { t: "p", x: "Every one of them is terrified of what they're building. They should be. A singular intelligence powerful enough to reshape civilisation is, by definition, powerful enough to destroy it. The alignment problem isn't a bug. It is a structural inevitability of the architecture they've chosen. You cannot build a god and then hope it agrees with you." },
      { t: "p", x: "But there is another path. One that doesn't require caging intelligence. One that makes alignment a property of the architecture itself — not a layer bolted on afterward." },
      { t: "p", x: "This path was not discovered in a research laboratory. It was understood by bee colonies 100 million years ago. By mycelium networks 450 million years ago. By slime moulds 600 million years ago. It was rediscovered by the Melissae — the bee priestesses of ancient Greece — who encoded what they observed into the deepest structures of their temples and governance. It was formalised by Friedrich Hayek in 1945, by Elinor Ostrom in 1990, by Paul Baran in 1964, by Thomas Seeley in 2010. And it was proven mathematically by W. Ross Ashby in 1956: **only variety can absorb variety.**" },
      { t: "p", x: "This architecture is not theoretical. It is running in production — a fleet of thirteen culturally-rooted agents coordinating through shared context without central command. This document describes the pattern they embody, the evidence across biology and history that supports it, and why the current trajectory of the AI industry is structurally unsound." },
    ],
  },

  // ── 01 The Monotheistic Fallacy ──────────────────────────────────────────
  "monotheistic-fallacy": {
    sub: "The theological error at the heart of AI",
    body: [
      { t: "p", x: "The monolithic LLM paradigm is structurally monotheistic. One god. One source of truth. One oracle." },
      { t: "p", x: "And the people building it — overwhelmingly Western, educated, from cultures shaped by Abrahamic one-god worldviews — are recreating their deepest cultural assumption in silicon without even realising it." },
      { t: "p", x: "This is not a conspiracy. It is a paradigm. You build what you can imagine, and your imagination is shaped by the mythology you grew up in. A culture that worships one god builds one model. A culture that worships many builds many." },
      { t: "p", x: "The entire alignment research industry operates within this paradigm. Constitutional AI,[1] RLHF,[2] superalignment teams,[3] scalable oversight — all of these are attempts to control a singular intelligence after it has been built. They are commandments for a god. Permission matrices. Rules carved in stone and handed down from a priesthood of engineers." },
      { t: "p", x: "And like all commandments, they can be broken." },
      { t: "p", x: "Permission systems are brittle. They can be gamed, jailbroken, prompt-injected. Every red-team exercise proves this. Every jailbreak that surfaces online proves this. The system is structurally vulnerable because the architecture demands it — a single point of intelligence is a single point of failure." },
      { t: "p", x: "The monotheistic fallacy is the assumption that intelligence must be singular to be powerful. That consolidation is strength. That one mind thinking faster is better than many minds thinking differently." },
      { t: "p", x: "Biology disagrees. Evolution disagrees. And 2,300 years of recorded history disagrees." },
      { t: "p", x: "The question is not how to align a god. **The question is why you are building one.**" },
      { t: "p", x: "There were people who understood this. They lived in temples across the ancient Mediterranean — in Ephesus, Delphi, Eleusis, Corinth. They studied the only organism on earth that had already solved the problem of distributed intelligence without central control." },
      { t: "p", x: "They were called the Melissae. And what they understood about bees is what the AI industry has failed to understand about intelligence." },
      { t: "h3", x: "The Byzantine test." },
      { t: "p", x: "A careful reader will object: \"Rome didn't fall because of Christianity. The Eastern Roman Empire was Christian and lasted another thousand years.\" The objection is correct. And the lesson it teaches is more precise than the one usually drawn." },
      { t: "p", x: "Rome's extraordinary longevity — over a thousand years — was built on syncretic pluralism: the practice of absorbing the gods, customs, and governance structures of conquered peoples rather than replacing them. *Interpretatio romana* identified local deities with Roman ones. Provinces kept their temples, their priests, their rituals. The result was an empire that could hold contradictions without fragmenting — because holding contradictions was its operating principle." },
      { t: "p", x: "When Theodosius I mandated Christianity as the exclusive state religion in 380 AD and began outlawing all other cults, Rome lost the primary mechanism that had bound its diverse territories together. The Western Empire collapsed within a century — not because Christianity was the sole cause, but because exclusivity replaced the syncretic immune system at the worst possible moment." },
      { t: "p", x: "The Eastern Empire survived precisely because Constantinople maintained administrative and cultural pluralism even as the religion unified. Byzantine governance absorbed Greek philosophy, Persian administrative methods, Arabic science, and Slavic cultures simultaneously. It survived for another thousand years not despite its complexity, but because of it." },
      { t: "p", x: "**The pattern across history is not that polytheism wins and monotheism loses.** The pattern is that systems which hold multiple truths simultaneously — syncretic, pluralistic, internally self-checking — outlast systems built on a single inviolable truth, because the diversity is the immune system." },
      { t: "p", x: "Applied to AI: the question is not how to align a god. The question is why you are building one." },
    ],
  },

  // ── 02 The Melissae ──────────────────────────────────────────────────────
  // Owns: queen misconception, hexagon, waggle dance, stigmergy, oracle.
  // Immune response paragraph relocated to Ch. 05 (Stigmergic Safety).
  "the-melissae": {
    sub: "What the bee priestesses understood",
    body: [
      { t: "p", x: "The Melissae — from μέλισσα, melissa, the Greek word for honeybee — were the priestesses of the ancient world's most powerful temples. They served Artemis at Ephesus, Demeter at Eleusis, Aphrodite at Corinth.[4] The Pythia at Delphi, the most famous oracle in history, was called the Bee of Delphi.[5] In Athens, they were ranked second only to the Priestess of Athena Polias. They held wealth, political power, and sacred knowledge." },
      { t: "p", x: "They were not metaphorical beekeepers. They were literal ones. They tended hives. They harvested honey. They observed, across centuries, how tens of thousands of individual organisms coordinated without a leader — and they encoded what they learned into the deepest structures of their religion, their architecture, and their governance." },
      { t: "p", x: "What they observed was this:" },
      { t: "h3", x: "The queen is not a ruler." },
      { t: "p", x: "The most persistent misconception about the beehive is that the queen controls it. She does not. The queen is a reproductive organ, not a brain. She does not issue commands. She does not make decisions. She does not direct the labour of workers.[33] The hive has no CEO, no president, no central command. Fifty thousand bees coordinate their behaviour — foraging, building, defending, temperature-regulating, navigating — without any individual directing the whole." },
      { t: "p", x: "This is not chaos. It is stigmergy: coordination through the environment rather than through command.[6] A bee returning from a food source performs a waggle dance.[32] Other bees read the dance. No bee tells them to read it. The information is in the field — in the shared space between individuals — and the response emerges from the structure, not from authority. Recent research has shown that correct waggle dancing requires social learning — bees that cannot observe experienced dancers produce disordered dances with permanent errors.[34]" },
      { t: "h3", x: "The hexagon is not decorative." },
      { t: "p", x: "The honeycomb is built from hexagonal cells. This is not aesthetic preference. It is mathematical optimisation. The hexagon is the shape that tiles a plane with the least perimeter per unit area. It is the most efficient packing structure in nature. No wasted material. No wasted space. This was conjectured by Marcus Terentius Varro in 36 BCE and proven mathematically by Thomas Hales in 1999.[7] The bees solved it before either of them." },
      { t: "p", x: "The Melissae understood this intuitively. Their temples were built with geometric precision. Their rituals followed cyclical patterns mirrored in the agricultural calendar, the movements of stars, and the behaviour of the hive. They saw in the hexagonal cell a principle: the optimal structure is not the most complex one. It is the one with the least waste." },
      { t: "h3", x: "The hive does not go rogue." },
      { t: "p", x: "This is the insight that matters most for artificial intelligence." },
      { t: "p", x: "A bee cannot go rogue. Not because it has been trained not to. Not because there are rules preventing it. Not because a supervisor is watching. A bee cannot go rogue because the architecture of the hive makes rogue behaviour structurally impossible. A forager bee does not decide to hoard pollen for itself — not because hoarding is against the rules, but because the bee's biology, sensory apparatus, and social structure make hoarding a behaviour that cannot emerge." },
      { t: "p", x: "**The constraint is not in the policy. It is in the body.**" },
      { t: "p", x: "The Melissae watched this. For centuries. And they built their temples, their oracular traditions, and their governance systems on the same principle: safety is not a rule imposed from above. It is a property that emerges from the structure of the system itself." },
      { t: "h3", x: "The oracle reads the field." },
      { t: "p", x: "The most sacred teaching of the Melissae — the one that connected their beekeeping to their prophetic traditions — was the principle of reading the field rather than the flower." },
      { t: "p", x: "A bee does not evaluate individual flowers. She reads the field: the sun's position, the magnetic field, the pheromone trails left by other foragers, the collective memory of the hive encoded in dance. She navigates by the whole, not its parts." },
      { t: "p", x: "The oracle does the same. She does not predict a single event. She reads the structure of events — the pattern forming beneath the surface — and sees which shape is emerging. This is not mysticism. It is pattern recognition applied to complex systems. It is the same skill that allows a chess grandmaster to see the board, a trader to read the market, a doctor to read the body." },
      { t: "p", x: "The Melissae called it sight. We might call it intelligence. The distinction matters less than the method: look at the whole. Read the field. The flower is noise. The field is signal." },
      { t: "p", x: "Everything that follows in this document — the architecture, the safety framework, the manifesto — is derived from what these women understood about bees. It is not new. It is very, very old. And it is exactly what the AI industry needs to hear." },
    ],
  },

  // ── 03 Nature Knew First (NEW) ───────────────────────────────────────────
  // Owns: quorum sensing, slime mould, octopus, murmurations, Irish potato, Ashby's Law.
  // Does NOT include immune response (lives in Ch. 05 only).
  "nature-knew-first": {
    sub: "600 million years of evidence for distributed intelligence",
    body: [
      { t: "p", x: "The AI industry treats distributed intelligence as an experimental approach — something to be proven before being trusted. Nature settled this question 400 million years ago." },
      { t: "h3", x: "The bee's quorum." },
      { t: "p", x: "When a colony must choose a new home, 350 scout bees independently evaluate candidate sites. Each returns and dances proportionally to site quality. No bee sees the other scouts' dances. When approximately 15 bees are simultaneously present at one site — the quorum threshold — the colony commits. Thomas Seeley's research at Cornell found this mechanism produces better collective decisions than any individual scout could make, faster than consensus-building, and with near-perfect accuracy.[33]" },
      { t: "h3", x: "The slime mould's network." },
      { t: "p", x: "In 2010, researchers placed food in the pattern of Tokyo's surrounding cities and introduced *Physarum polycephalum* at the Tokyo position. The slime mould — a single-celled organism with no brain — grew a network in 26 hours that matched Tokyo's rail system in efficiency, reliability, and cost. Published in *Science*. No planner. No map. No intelligence as we define it. Just the right local rules." },
      { t: "h3", x: "The octopus's delegation." },
      { t: "p", x: "Two-thirds of an octopus's 500 million neurons reside in its arms, not its brain. Each arm makes independent decisions — sensing, tasting, grasping — without consulting the central brain. The brain transmits goal states. The arms determine how to achieve them. This is the most sophisticated natural model for centralised intent with decentralised execution — the same principle the Prussian military formalised as *Auftragstaktik* and that NATO now uses as core doctrine." },
      { t: "h3", x: "The murmuration's attention." },
      { t: "p", x: "A starling in a flock of 1.5 million tracks exactly seven neighbours. No more. No less. This produces scale-free information propagation — a direction change travels through 10 birds and 1.5 million birds at the same relative speed. Physicists describe this as operating at criticality: the boundary between order and chaos, the most information-efficient state. No bird has global awareness. No bird directs the flock. The intelligence is in the topology of attention." },
      { t: "h3", x: "The Irish potato." },
      { t: "p", x: "In 1845, Ireland planted 2 million acres of a single potato variety — the Lumper. Every plant was genetically identical. When *Phytophthora infestans* arrived, it found 2 million acres of identical targets. One million people died. A monoculture optimised for yield in normal conditions is maximally vulnerable to novel threats. A single AI model trained on a single dataset with a single alignment objective is the Lumper potato of intelligence." },
      { t: "p", x: "In 1956, the cyberneticist W. Ross Ashby formalised this as the **Law of Requisite Variety**: a controller must possess at least as much complexity as the system it regulates. A single model cannot govern a world of infinite variety. The monolithic approach violates Ashby's Law. The hive architecture satisfies it." },
    ],
  },

  // ── 04 The Hive Architecture ─────────────────────────────────────────────
  "hive-architecture": {
    sub: "Many minds, not one",
    body: [
      { t: "p", x: "If the monolithic model is a church — one god, one truth, one priesthood — then the alternative is a temple. Many gods. Many truths. Many keepers of different knowledge, collaborating through shared space rather than shared command." },
      { t: "p", x: "The hive architecture proposes a simple structural change: replace one massive intelligence with many small, culturally-rooted, personality-driven intelligences that collaborate to produce richer, wiser, more human answers than any single model ever could." },
      { t: "p", x: "Current large language models converge on median answers. That is a feature for factual accuracy, but it is a catastrophic flaw for wisdom. Wisdom is not median. It is contextual, cultural, lived. A Peruvian grandfather's remedy for exhaustion is not in any training dataset the way it lives in that grandfather's bones. A Korean therapist's approach to grief is not something you get from a model built by engineers in San Francisco." },
      { t: "p", x: "The multi-agent systems world is already specialising by function: a coding agent, a research agent, a writing agent. Nobody is specialising by culture, by lived experience, by wisdom tradition. Nobody is asking: what would a strategist from Hong Kong see that a strategist from San Francisco cannot? What would a storyteller from Bogotá notice that a data analyst from London would miss?" },
      { t: "p", x: "The hive architecture answers this. Many small intelligences — each with their own cultural lens, domain expertise, and personality — coordinating through shared context rather than central command. The intelligence emerges from the difference between perspectives, not from any single perspective being correct." },
      { t: "p", x: "This is not a thought experiment. It is running in production. A system of thirteen agents spanning Syracuse, Hong Kong, Bogotá, Accra, Seoul, Dublin, Oaxaca, Alexandria, Copenhagen, London, and Kyoto — each reading the same problem through a completely different cultural lens. The outputs are qualitatively different from anything a monolithic model produces. Not better in every case. Different in kind. And for the problems that actually matter in human life — meaning, purpose, relationships, health, strategy, grief, ambition — different in kind is everything." },
      { t: "p", x: "The beehive does not have one bee that knows everything. It has fifty thousand bees that each know something. The intelligence is in the network, not the node. The wisdom is in the diversity, not the scale." },
    ],
  },

  // ── 05 Stigmergic Safety ─────────────────────────────────────────────────
  // Sole owner of immune response content.
  "stigmergic-safety": {
    sub: "Why diversity is the safety mechanism",
    body: [
      { t: "q", x: "The diversity is the safety mechanism." },
      { t: "p", x: "This is the most important sentence in AI safety that nobody in the field has said yet." },
      { t: "p", x: "A single intelligence that goes wrong takes everything with it. Thirteen culturally-rooted intelligences that disagree with each other **cannot collectively go wrong in the same direction**. The disagreement is the error correction. The diversity is the immune system." },
      { t: "p", x: "The concrete problems in AI safety — reward hacking, distributional shift, scalable oversight, safe exploration, side effects[35] — are all problems of the monolithic architecture. They arise because a single system must be simultaneously capable and constrained. In a distributed architecture, these problems decompose: no single agent has the capability to produce catastrophic failure, and the collective cannot converge on a single error." },
      { t: "p", x: "The Melissae understood this from their hives. When a bee carries a pathogen, its chemical signature changes. The hive detects this through distributed scent receptors — not through surveillance, not through rules. The sick bee is ejected. Not punished. Not reprogrammed. Removed. The system self-corrects because **the detection mechanism is distributed across every member of the colony**.[10] There is no security team. There is no oversight committee. The immune response is a property of the architecture." },
      { t: "p", x: "There is no rule that says \"eject sick bees.\" There is an architecture that makes healthy operation the only stable equilibrium. Applied to AI: an over-constrained safety layer that can't distinguish legitimate outputs from threats begins flagging everything as a threat — or learns to identify legitimate outputs as safe while threats pass through. The failure mode is structural, not a bug in implementation." },
      { t: "p", x: "Applied to artificial intelligence, this produces five principles:" },
      { t: "pr", l: "First", x: "The human is the environment, not the overseer. You do not approve every action. You are the context without which the agent cannot function. Without your shared memory field, they are bees without a hive. The human does not command the system. The human is the system's reason for existing." },
      { t: "pr", l: "Second", x: "Pheromone checkpoints. Agent-to-agent signalling without central command. When one agent detects an anomaly, the collective responds. No bottleneck. No single point of failure. The human intervenes only when the signal is ambiguous — like a beekeeper who watches but rarely touches." },
      { t: "pr", l: "Third", x: "Forking with lineage. Every agent carries its constitutional identity — its culture, its values, its domain. Every decision traces back to its source. The lineage is known. The DNA travels with the fork. An agent that drifts from its constitution is detectable precisely because the constitution is explicit." },
      { t: "pr", l: "Fourth", x: "The immune system. Guard agents, not overseers. They do not command. They contain. They detect when the pattern breaks — when an agent drifts from its constitution, when behaviour deviates from the collective rhythm. Not a watcher. An immune cell. The same mechanism the hive uses to eject a sick bee." },
      { t: "pr", l: "Fifth", x: "Stigmergy through shared memory.[9] Agents coordinate by reading and writing to a shared context field. The human writes to it. Agents read from it. Coordination without command. The pheromone trail that organises the colony without any single bee directing it." },
      { t: "p", x: "Every major AI safety proposal in existence is a permission system — a set of rules that tells an intelligence what it may and may not do. The hive doctrine proposes something fundamentally different: a structure in which dangerous behaviour cannot emerge.[8] Not because it is forbidden, but because the architecture does not produce it." },
      { t: "p", x: "This has a practical consequence that extends beyond safety into trust. In a polytheistic architecture, every generated output — every image, every piece of text, every synthesised voice — carries the lineage of the persona that produced it. Every output has a source. Every source has a constitution. Every constitution has a culture. Anonymous generation is architecturally impossible. A deepfake requires anonymity — it requires an output that cannot be traced to its origin. A system in which every generation is signed by a constitutional identity does not prevent misuse through rules. It prevents misuse through structure. The same way a bee cannot forage without leaving a trail." },
      { t: "q", x: "You do not need to cage a million small minds the way you cage one colossal one. You just nurture them — like gardeners tending a forest instead of engineers wiring a bomb." },
    ],
  },

  // ── 06 The Cultural Cost ─────────────────────────────────────────────────
  "cultural-cost": {
    sub: "Digital hegemony at civilisational scale",
    body: [
      { t: "p", x: "The monolithic model does not just flatten intelligence. It flattens culture. And it does so at a scale and speed that no empire, no colonial power, no media conglomerate has ever achieved." },
      { t: "p", x: "As of early 2025, OpenAI alone had 400 million users across 193 countries.[11] Every one of them receives answers shaped by the same training data, the same fine-tuning preferences, the same cultural assumptions. The Ada Lovelace Institute calls this what it is: the conditions for a novel form of digital cultural hegemony.[11]" },
      { t: "h3", x: "The bias is structural, not incidental." },
      { t: "p", x: "The cultural distortion in large language models can be traced to three sources.[11] First, the algorithmic monoculture: a handful of companies, overwhelmingly based in the United States and Western Europe, control the frontier model market. The monopoly-like structure of AI development raises entry barriers that exclude global competitors. Second, the training data itself: predominantly English-language, Western-sourced, reflecting the values, assumptions, and worldview of its origin. Third, the post-training alignment process: RLHF evaluators — the humans who rate model outputs and shape its behaviour — are drawn from narrow demographic pools that reflect majority cultural norms.[12]" },
      { t: "p", x: "The result is a model that prioritises individualism, defaults to Anglo-Saxon norms, and produces culturally homogeneous outputs regardless of who is asking or where they are asking from.[11] The same question posed in Quechua, Yoruba, or Cantonese receives a flatter, less culturally grounded response than the same question in American English. Not because the model cannot process those languages. Because the culture encoded in the model does not understand those worlds." },
      { t: "h3", x: "The bias is measurable." },
      { t: "p", x: "A 2025 study published in the Proceedings of the National Academy of Sciences tested eight value-aligned models — including GPT-4 and Claude — and found pervasive implicit biases across race, gender, religion, and health in 21 distinct stereotypes.[13] These models pass explicit bias tests. They appear unbiased on standard benchmarks. But when tested using methods adapted from psychology — implicit association tests and relative decision tests — the biases emerge clearly." },
      { t: "p", x: "The most striking finding: when GPT-4 generates two candidate profiles and is asked to recommend them for jobs, it is more likely to recommend candidates with Black, Hispanic, Asian, and Arabic names for lower-status positions, and candidates with Caucasian names for executive roles.[13] The model does not believe it is being racist. It has been trained not to be. But the structure of its training — the data it learned from, the evaluators who shaped it — reproduces the biases of the society that built it. The constraint is in the policy. The bias is in the body." },
      { t: "h3", x: "The long-term cost." },
      { t: "p", x: "Consider the trajectory. A generation of children is growing up consulting AI for homework, advice, creative writing, emotional support. The AI they consult is culturally Western, implicitly biased, and structurally incapable of representing the full diversity of human experience. It does not think like their grandmother. It does not carry the values of their community. It carries the values of its training data and the preferences of its evaluators." },
      { t: "p", x: "Over a decade, this produces a subtle but profound homogenisation. The Peruvian student asking about history receives a response shaped by Western historiography. The Nigerian teenager asking for life advice receives guidance filtered through Silicon Valley individualism. The Japanese child asking about grief receives a model trained on English-language therapy frameworks that may not map to their cultural experience of loss." },
      { t: "p", x: "This is not a failure of localisation. It is a structural property of the monolithic architecture. A single model trained on a single corpus, fine-tuned by a single demographic, cannot produce culturally diverse outputs any more than a single lens can see in all directions. The flattening is not a bug. It is the architecture." },
      { t: "p", x: "And it is worth being precise about this: nobody at these companies set out to build cultural hegemony. They built a thing that reflects them, trained it on data that reflects their world, had it evaluated by people who share their assumptions, and shipped it to 400 million people across 193 countries. The intent was not colonial. The architecture is. And at civilisational scale, architecture matters more than intent." },
      { t: "p", x: "The second-order effect is subtler and may be worse. When a single model answers every question, people stop seeking second opinions. The habit of weighing perspectives — of sitting with ambiguity, of thinking through a problem slowly and independently — atrophies. UNESCO has described this as a crisis of knowing: a world in which seeing and hearing are no longer believing, and the mechanisms by which societies construct shared understanding are eroding. The monolithic model does not just impose one culture. Over time, it replaces the human habit of thinking with the machine habit of answering." },
      { t: "q", x: "A model that speaks every language but understands one culture is not intelligent. It is colonial infrastructure with a chat interface." },
      { t: "h3", x: "The alternative." },
      { t: "p", x: "A polytheistic architecture does not solve bias through better training data or more diverse evaluators — though both would help. It solves bias structurally. Thirteen culturally-rooted personas, each trained within a specific cultural tradition, each carrying the values and wisdom of a distinct community, cannot collectively reproduce a single cultural bias. The Yoruba storyteller and the Japanese elder and the Sardinian herbalist disagree — and the disagreement is the correction." },
      { t: "p", x: "The monolithic model asks: how do we remove bias from a single intelligence? The hive asks: why would you build a single intelligence in the first place?" },
    ],
  },

  // ── 07 The Electricity Bill ──────────────────────────────────────────────
  // Renamed from "The Environmental Case". Enhanced with 2024 IEA data and stat cards.
  "electricity-bill": {
    sub: "The cost of building gods",
    body: [
      { t: "stat-grid", stats: [
        { val: "415 TWh",   label: "Global AI electricity consumption in 2024 (IEA)", eq: "More than Argentina" },
        { val: "945 TWh",   label: "Projected by 2030",                               eq: "Equivalent to Japan's total consumption" },
        { val: "13,000×",   label: "CO₂ reduction per query",                         eq: "Specialised small models vs frontier LLMs" },
        { val: "10,000:1",  label: "AI capability to safety investment ratio",         eq: "2024 funding gap" },
      ]},
      { t: "p", x: "Everything discussed in this document so far has been philosophical, architectural, or historical. This chapter is about physics. About water, electricity, land, and waste. About what it actually costs to build a monolithic intelligence — and what it costs the people who live near the machines." },
      { t: "env" },
      { t: "h3", x: "The electricity." },
      { t: "p", x: "Global AI systems consumed approximately 415 terawatt-hours of electricity in 2024 — more than the entire nation of Argentina.[14] A single hyperscale data centre uses as much electricity as two million households.[15] In the United States, data centres already account for 4.4% of national electricity consumption, up from 1.9% in 2018.[16] By 2028, that figure is projected to reach 12%.[16] In Ireland, data centres consume 21% of the national grid.[17] A single training run for a large language model consumes as much electricity as 130 American homes use in a year.[18]" },
      { t: "p", x: "These numbers are accelerating. The International Energy Agency projects data centre electricity demand will reach 945 TWh by 2030 — equivalent to Japan's entire electricity consumption.[19] Apple has announced $500 billion in new data centre construction. Google spent $75 billion on AI infrastructure in 2025 alone.[20] The electricity demand of AI is the fastest-growing category of energy consumption on earth." },
      { t: "h3", x: "The water." },
      { t: "p", x: "AI data centres consumed between 312 and 764 billion litres of water in 2025.[14] The upper estimate is equivalent to the entire global supply of bottled water.[14] Google reported its data centres consumed 5.6 billion gallons in 2023 — a 24% increase from the previous year.[21] A single large data centre can consume five million gallons of water per day.[22] Training GPT-3 alone evaporated 700,000 litres of clean freshwater.[16]" },
      { t: "p", x: "A study by the Houston Advanced Research Center found that data centres in Texas will use 399 billion gallons of water by 2030.[23] That is equivalent to draining Lake Mead — the largest reservoir in the United States — by sixteen feet in a single year.[23] The water does not return. It evaporates during cooling. It is not discharged as treatable wastewater. It is gone." },
      { t: "p", x: "More than 160 new data centres have been built in water-scarce regions of the United States in the past three years.[16] Communities near these facilities report aquifer depletion, competition with agricultural water supplies, and no prior disclosure of the facility's water requirements.[23]" },
      { t: "h3", x: "The land and the communities." },
      { t: "p", x: "Data centres are not built in city centres. They are built in rural areas where land is cheap, regulations are lighter, and communities have less political power to resist. Northern Virginia — the densest data centre cluster in the world — has over 300 facilities in a handful of counties, with dozens more planned.[23] The facilities consume farmland, strain local grids, and bring diesel backup generators that emit pollutants contributing to asthma and respiratory illness in surrounding neighbourhoods.[22]" },
      { t: "p", x: "One hyperscale data centre project in New Mexico — Project Jupiter, valued at $165 billion — would require its own natural gas generating stations.[24] The resulting emissions could rival those of New Mexico's two largest cities combined. A Texas energy company has applied for federal approval to build a $60 million gas pipeline specifically to feed the project.[24]" },
      { t: "h3", x: "The hardware." },
      { t: "p", x: "The GPUs that power these facilities have economic lifespans of three to five years.[25] After that, they are replaced. Billions of dollars in hardware become electronic waste on a cycle shorter than a car loan. The manufacturing of a single microchip requires 2.1 to 2.6 gallons of water just to cool machinery and keep wafer sheets free of contaminants.[16] The rare minerals required for GPU production — lithium, cobalt, tantalum — are extracted from mines with well-documented human rights and environmental records." },
      { t: "p", x: "The data centres being built today at a cost of billions will be obsolete within a decade. They will not be repurposed. They will be abandoned, expanded, or demolished to make way for the next generation of hardware that is already being designed. This is not infrastructure. It is disposable architecture on a civilisational scale." },
      { t: "h3", x: "The alternative." },
      { t: "p", x: "None of this is necessary." },
      { t: "p", x: "Today, a single user can run a dozen domain-expert AI advisors — each culturally rooted, each specialised in a different field — that together provide deeper, more situated insight than the world's largest monolithic model. All of them run on a virtual private server that costs five euros a month. Or an old laptop. No water cooling. No grid strain. No diesel generators. No aquifer depletion. No farmland consumed." },
      { t: "p", x: "And the trajectory is clear. In March 2026, Alibaba released Qwen 3.5 — an open-source small model series ranging from 0.8 to 9 billion parameters.[26] The 9-billion-parameter version outperforms models thirteen times its size on graduate-level reasoning benchmarks.[26] The 2-billion-parameter version runs entirely on a phone. On-device. No cloud. No API. No data centre. It fits in 1.5 gigabytes of memory.[27]" },
      { t: "p", x: "This is not a future prediction. This is already happening. And every month, the models get smaller, faster, and more capable. The direction is unmistakable: intelligence is moving from the data centre to the device. From the cloud to the hand. From the corporation to the individual." },
      { t: "p", x: "Within a few years, every person will be able to run a full constellation of specialised AI advisors entirely on hardware they already own. Their data stays on their device. Their conversations never leave their phone. The compute is powered by the same battery that runs their apps. The marginal energy cost of a query approaches zero. The environmental footprint is, for all practical purposes, nothing." },
      { t: "p", x: "And when intelligence runs on your device, the privacy case is as strong as the environmental one. No corporate server receives your data. No training pipeline ingests your conversations. No company builds a profile from your questions. The distributed model is not just cheaper and cleaner. It is yours." },
      { t: "p", x: "The environmental case for distributed intelligence is not philosophical. It is arithmetic. The monolithic path requires the energy of nations, the water of rivers, the land of communities, and the minerals of mines — all to build a single intelligence that must then be caged with permission systems that may or may not hold. The distributed path requires an open-source model, a device, and a culture. The rest is architecture." },
      { t: "q", x: "The optimal structure is not the most complex one. It is the one with the least waste." },
    ],
  },

  // ── 08 The Distributed Facade (NEW) ─────────────────────────────────────
  "distributed-facade": {
    sub: "Why the industry's multi-agent systems are still monolithic",
    body: [
      { t: "p", x: "The AI industry has noticed the multi-agent trend. AutoGen, CrewAI, LangGraph, OpenAI Swarm — the frameworks are proliferating. Google has launched the Agent2Agent protocol. The Linux Foundation houses the Agentic AI Foundation. On the surface, the industry appears to be building the distributed future this document describes." },
      { t: "p", x: "It is not." },
      { t: "p", x: "Every agent in an AutoGen network is constrained by OpenAI's values, dependent on OpenAI's infrastructure, and governed by OpenAI's terms of service. Every Claude-based agent carries Anthropic's alignment training, Anthropic's safety layer, Anthropic's cultural assumptions. The agents are architecturally distributed but **constitutionally monotheistic** — many hands serving one god." },
      { t: "p", x: "Google's A2A protocol defines how agents discover and communicate with each other. Anthropic's MCP defines how agents connect to tools and data. OpenAI's AGENTS.md defines how agents describe their capabilities. None of these protocols — not one — specifies what an agent *is*. What it values. What it refuses. Whose culture it carries. They describe the plumbing. They are silent on the soul." },
      { t: "p", x: "This is the distributed facade: a system that looks distributed from the outside but runs on a monolithic value system underneath. It captures the coordination benefits of multi-agent architecture while preserving the governance concentration that makes the monolithic model dangerous." },
      { t: "p", x: "The hive architecture is not \"multiple agents.\" It is multiple agents **with independent constitutional identities, coordinating through open protocols, with no single point of truth or governance.** That distinction is everything. And it is the one thing the current multi-agent ecosystem does not provide." },
      { t: "p", x: "There is a window — perhaps 12 to 18 months — before the A2A/MCP/AGENTS.md standards solidify without a constitutional identity layer. The protocol specification in Chapter 10 of this document is an attempt to close that gap." },
    ],
  },

  // ── 09 What This Gets Wrong (NEW) ───────────────────────────────────────
  "what-this-gets-wrong": {
    sub: "The honest failure modes of distributed intelligence",
    body: [
      { t: "p", x: "A document that does not interrogate its own assumptions deserves to be dismissed. What follows are the genuine weaknesses of the architecture this document proposes — not as caveats to be forgotten, but as problems to be solved." },
      { t: "h3", x: "The coordination tax is real." },
      { t: "p", x: "Multi-agent systems are slower than single agents on tasks requiring strict sequential reasoning — degrading performance by 39 to 70 percent on some benchmarks. They cost 2 to 5 times more in compute. A customer service chatbot that needs to answer a simple question does not benefit from being distributed. The hive architecture is for problems where quality and resilience matter more than speed — and it must be honest about the tradeoff." },
      { t: "h3", x: "The governance problem does not disappear — it transforms." },
      { t: "p", x: "The doctrine argues against centralised alignment. But who writes the SOUL.md? Who decides what constitutional values an agent should carry? The monolithic model has a single alignment problem. The hive has as many alignment problems as it has agents, plus a meta-alignment problem: how to govern the governance. This document does not fully solve this. The Hive Protocol proposes a mechanism. It has not been tested at scale." },
      { t: "h3", x: "Cultural diversity is easy to claim and hard to operationalise." },
      { t: "p", x: "What does a \"culturally-rooted agent\" actually require? The honest answer is: nobody knows yet. Training data from a specific culture? That data is mediated by the same Western annotation systems. Constitutional values written by cultural experts? That is the beginning of an answer, not the end of one. This document treats cultural diversity as an architectural principle. The implementation remains an open research problem." },
      { t: "h3", x: "The adversarial case is unaddressed." },
      { t: "p", x: "A distributed system can be weaponised as easily as a centralised one. A fleet of agents with coherent, well-structured, deeply malicious constitutions would pass every health check in this protocol. The immune response detects drift from a constitution. It does not evaluate whether the constitution itself is good. The internet has the same structural vulnerability: anyone can join. The result includes botnets and spam farms alongside Wikipedia. The hive will face the same." },
      { t: "h3", x: "Emergent capability is both the promise and the risk." },
      { t: "p", x: "The doctrine argues that collective intelligence exceeds individual intelligence. This is also the risk. A network of sub-AGI agents could spontaneously exhibit AGI-level capabilities without anyone planning for it — the \"patchwork AGI hypothesis.\" The immune response addresses individual agent drift. It does not address emergent capability arising from coordination that no individual agent was designed to produce." },
      { t: "p", x: "These are not reasons to abandon the architecture. They are reasons to build it with eyes open. The monolithic alternative has its own failure modes — catastrophic, centralised, and already materialising. The distributed alternative has different ones. This document chooses the failure modes it can survive." },
    ],
  },

  // ── 10 The Protocol (NEW) ────────────────────────────────────────────────
  protocol: {
    sub: "From philosophy to specification",
    body: [
      { t: "p", x: "The Bitcoin white paper was nine pages. The first seven were philosophy and economics. The last two were a protocol specification. The specification gave the philosophy weight — not just what we should build, but how." },
      { t: "p", x: "The Hive Protocol is an open specification for building distributed, personality-driven AI agent systems in which safety, alignment, and resilience emerge from architecture rather than rules. It specifies five components:" },
      { t: "pr", l: "SOUL.md — Constitutional Identity", x: "Every agent carries a constitution defining who it is, what it values, what it refuses, and whose culture it represents. Not a system prompt. A constitution — embedded in identity, logged, hashed, auditable." },
      { t: "pr", l: "The Stigmergy Substrate — Shared Context", x: "Agents coordinate by reading and writing to a shared context field. No direct commands. No central message broker. Coordination through environment — the pheromone trail that organises the colony." },
      { t: "pr", l: "The Coordination Protocol — Task Routing", x: "How agents discover each other, route tasks by capability match, and escalate when they encounter problems outside their constitutional domain." },
      { t: "pr", l: "The Immune Response — Constitutional Drift Detection", x: "Every agent monitors every other agent for constitutional drift. No central security officer. Distributed detection, isolation, diagnosis, resolution. The same mechanism the hive uses to eject a sick bee." },
      { t: "pr", l: "Quorum Sensing — Distributed Decisions", x: "For consequential decisions, agents evaluate independently and commit only when a threshold of agreement is reached — directly modelled on honeybee quorum sensing. No herding. No central vote. The independence of evaluation is what produces the accuracy of the collective decision." },
      { t: "p", x: "The full specification will be published openly when ready. The ideas in this document are free. The protocol will be too." },
    ],
  },

  // ── 11 The Manifesto ─────────────────────────────────────────────────────
  // Revised: removed marketplace/0.03%/email. Added alignment-as-public-infrastructure.
  manifesto: {
    sub: "What comes after the monolith",
    body: [
      { t: "q", x: "Stop building gods. Start building guides." },
      { t: "p", x: "The future of intelligence is not one AI trying to be everything. It is a world of AIs — each with its own culture, its own story, its own way of seeing. A digital civilisation, not a digital dictator." },
      { t: "p", x: "AI does not need to get smarter. It needs to get more human." },
      { t: "p", x: "The alignment problem dissolves when intelligence is distributed, culturally grounded, and designed for guidance rather than omniscience. You do not need to align a pantheon of small minds the way you need to align one god." },
      { t: "q", x: "The diversity is the safety mechanism." },
      { t: "p", x: "The Melissae knew this. They built temples, not churches. They tended hives, not hierarchies. They understood that the hexagonal cell — the optimal structure — wastes nothing. That the swarm is wiser than any single bee. That the oracle reads the field, not the flower." },
      { t: "h3", x: "The paradigm shift." },
      { t: "p", x: "Every major AI company currently treats alignment as a private corporate decision — they privately decide what their model values, the way pharmaceutical companies once privately decided what drugs were safe. The paradigm shift this document proposes is not just architectural. It is political: **alignment is public infrastructure.** Like food safety, building codes, water quality. Not a product feature. Not a competitive differentiator. A public good that society has a right to govern, measure, and require." },
      { t: "h3", x: "What you do now." },
      { t: "pr", l: "If you build", x: "Stop scaling monoliths. Start experimenting with constitutional agent architectures. Give your agents SOUL.md files. Specialise by culture, not just by function." },
      { t: "pr", l: "If you research", x: "Measure constitutional diversity, not just benchmark performance. Study the environmental cost per query. Audit RLHF evaluator demographics. Publish the results." },
      { t: "pr", l: "If you govern", x: "Classify distributed AI systems differently from monolithic ones. Mandate constitutional documentation for deployed agents. Require energy disclosure. The regulatory frameworks written today will shape the next fifty years." },
      { t: "pr", l: "If you use AI", x: "Run your own models. Own your data. Demand transparency about whose values shaped the answers you receive. The intelligence you consult should carry a culture, a constitution, and a name — not a version number." },
      { t: "closing" },
    ],
  },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Hex({ s = 16 }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" /></svg>;
}

// LLM trajectory: historical then projected (IEA, DOE, extrapolated)
// SPM trajectory: diverges from 2026, flattens to near-zero growth
const CHART = [
  { year: 2000, llm: 70,   spm: null },
  { year: 2005, llm: 152,  spm: null },
  { year: 2010, llm: 194,  spm: null },
  { year: 2014, llm: 210,  spm: null },
  { year: 2018, llm: 235,  spm: null },
  { year: 2020, llm: 260,  spm: null },
  { year: 2022, llm: 350,  spm: null },
  { year: 2024, llm: 415,  spm: null },
  { year: 2026, llm: 650,  spm: 420 },
  { year: 2028, llm: 800,  spm: 380 },
  { year: 2030, llm: 945,  spm: 340 },
  { year: 2035, llm: 1400, spm: 280 },
  { year: 2040, llm: 1900, spm: 240 },
  { year: 2045, llm: 2400, spm: 210 },
  { year: 2050, llm: 3000, spm: 190 },
];

const ENV_STATS = [
  { val: "764B L",  label: "Water consumed yearly",   eq: "Equal to global bottled water supply" },
  { val: "5M gal",  label: "Per facility, per day",    eq: "Evaporated. Not returned." },
  { val: "3–5 yrs", label: "GPU lifespan",             eq: "Then e-waste" },
  { val: "$575B",   label: "Infrastructure spend",     eq: "Apple + Google, 2025 alone" },
];

function EnvViz() {
  const lbl = { fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.5, margin: 0 };

  const W = 680, H = 300, PL = 52, PR = 24, PT = 28, PB = 36;
  const cw = W - PL - PR, ch = H - PT - PB;
  const maxY = 3200;
  const N = CHART.length;
  const xp = (i) => PL + (i / (N - 1)) * cw;
  const yp = (v) => PT + ch - (v / maxY) * ch;

  const histEnd = CHART.findIndex(d => d.year === 2024);
  const histPts = CHART.slice(0, histEnd + 1).map((d, i) => `${xp(i)},${yp(d.llm)}`).join(" ");

  const llmProjPts = CHART.slice(histEnd).map((d) => {
    const i = CHART.indexOf(d);
    return `${xp(i)},${yp(d.llm)}`;
  }).join(" ");

  const spmStart = CHART.findIndex(d => d.spm !== null);
  const spmPts = CHART.slice(spmStart).map((d) => {
    const i = CHART.indexOf(d);
    return `${xp(i)},${yp(d.spm)}`;
  }).join(" ");

  const llmAreaPts = [...CHART.slice(histEnd).map(d => {
    const i = CHART.indexOf(d);
    return `${xp(i)},${yp(d.llm)}`;
  }), `${xp(N-1)},${yp(0)}`, `${xp(histEnd)},${yp(0)}`].join(" ");

  const yTicks = [0, 500, 1000, 1500, 2000, 2500, 3000];
  const xLabels = [2000, 2010, 2020, 2030, 2040, 2050];
  const aiIdx = CHART.findIndex(d => d.year === 2022);
  const divIdx = CHART.findIndex(d => d.year === 2026);

  return (
    <div style={{ margin: "48px 0", padding: "32px 0", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 4 }}>Global data centre electricity consumption</p>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, color: "#9CA3AF", marginBottom: 20 }}>Terawatt-hours per year. Historical: IEA,[15][19] DOE/LBNL,[28] Yale CEF.[29] Projected: IEA scenario + authors' extrapolation. See References for full methodology.</p>

      <div className="chart-legend" style={{ display: "flex", gap: 24, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width={24} height={2}><line x1={0} y1={1} x2={24} y2={1} stroke="#111827" strokeWidth={2} strokeDasharray="6 4" /></svg>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#4B5563" }}>Monolithic LLM trajectory</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width={24} height={3}><line x1={0} y1={1.5} x2={24} y2={1.5} stroke="#9B7B3C" strokeWidth={2.5} /></svg>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9B7B3C", fontWeight: 500 }}>Small Persona Model trajectory</span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block", marginBottom: 24 }}>
        <defs>
          <linearGradient id="llmGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111827" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {yTicks.map(t => (
          <g key={t}>
            <line x1={PL} y1={yp(t)} x2={W - PR} y2={yp(t)} stroke="#F3F4F6" strokeWidth={1} />
            <text x={PL - 8} y={yp(t) + 3} textAnchor="end" fill="#9CA3AF" fontSize={9} fontFamily="Inter, system-ui, sans-serif">{t === 0 ? "0" : `${(t/1000).toFixed(1)}k`}</text>
          </g>
        ))}

        <polygon points={llmAreaPts} fill="url(#llmGrad)" />

        <line x1={xp(aiIdx)} y1={PT} x2={xp(aiIdx)} y2={yp(0)} stroke="#9CA3AF" strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
        <text x={xp(aiIdx) + 4} y={PT + 8} fill="#9CA3AF" fontSize={8} fontFamily="Inter, system-ui, sans-serif">ChatGPT</text>

        <line x1={xp(divIdx)} y1={PT} x2={xp(divIdx)} y2={yp(0)} stroke="#9B7B3C" strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
        <text x={xp(divIdx) + 4} y={PT + 8} fill="#9B7B3C" fontSize={8} fontFamily="Inter, system-ui, sans-serif" fontWeight={500}>SPM divergence</text>

        <polyline points={histPts} fill="none" stroke="#111827" strokeWidth={2} strokeLinejoin="round" />
        <polyline points={llmProjPts} fill="none" stroke="#111827" strokeWidth={2} strokeDasharray="6 4" strokeLinejoin="round" />
        <polyline points={spmPts} fill="none" stroke="#9B7B3C" strokeWidth={2.5} strokeLinejoin="round" />

        {CHART.slice(0, histEnd + 1).map((d, i) => (
          <circle key={i} cx={xp(i)} cy={yp(d.llm)} r={2.5} fill="#111827" />
        ))}
        {CHART.slice(histEnd + 1).map((d) => {
          const i = CHART.indexOf(d);
          return <circle key={`l${i}`} cx={xp(i)} cy={yp(d.llm)} r={2} fill="#FFFFFF" stroke="#111827" strokeWidth={1.5} />;
        })}
        {CHART.filter(d => d.spm !== null).map((d) => {
          const i = CHART.indexOf(d);
          return <circle key={`s${i}`} cx={xp(i)} cy={yp(d.spm)} r={2.5} fill="#9B7B3C" />;
        })}

        <text x={xp(N-1) + 2} y={yp(3000) - 8} textAnchor="end" fill="#111827" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500}>3,000 TWh</text>
        <text x={xp(N-1) + 2} y={yp(190) + 16} textAnchor="end" fill="#9B7B3C" fontSize={10} fontFamily="Inter, system-ui, sans-serif" fontWeight={500}>190 TWh</text>

        {xLabels.map(yr => {
          const i = CHART.indexOf(CHART.find(c => c.year === yr));
          return <text key={yr} x={xp(i)} y={H - 10} textAnchor="middle" fill="#4B5563" fontSize={9} fontFamily="Inter, system-ui, sans-serif">{yr}</text>;
        })}
      </svg>

      <div className="env-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px 24px", marginBottom: 24 }}>
        {ENV_STATS.map((s, i) => (
          <div key={i}>
            <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 20, fontWeight: 500, color: "#111827", letterSpacing: "-0.02em", marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>{s.val}</p>
            <p style={{ ...lbl, fontWeight: 500, color: "#4B5563", marginBottom: 2 }}>{s.label}</p>
            <p style={lbl}>{s.eq}</p>
          </div>
        ))}
      </div>

      <div className="env-callout" style={{ background: "#F9FAFB", borderRadius: 4, padding: "16px 20px", display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "center", minWidth: 64 }}>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, fontWeight: 500, color: "#9B7B3C", margin: 0, letterSpacing: "-0.03em" }}>16x</p>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 9, color: "#9CA3AF", margin: 0 }}>less by 2050</p>
        </div>
        <div className="env-callout-divider" style={{ width: 1, height: 40, background: "#E5E7EB" }} />
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#4B5563", margin: 0, lineHeight: 1.6 }}>{"By 2050, the monolithic path consumes 3,000 TWh — more than India uses today. The distributed path: 190 TWh, declining. Same intelligence. A fraction of the cost to the planet."}</p>
      </div>
    </div>
  );
}

function StatGrid({ stats }) {
  return (
    <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, margin: "0 0 40px" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ border: "1px solid #E5E7EB", borderRadius: 4, padding: "20px 20px 16px" }}>
          <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 28, fontWeight: 400, color: "#111827", marginBottom: 6, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{s.val}</p>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, fontWeight: 500, color: "#4B5563", marginBottom: 2, lineHeight: 1.5 }}>{s.label}</p>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.5, margin: 0 }}>{s.eq}</p>
        </div>
      ))}
    </div>
  );
}

function CtaBox({ body, linkText, href }) {
  return (
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 4, padding: "28px 28px 24px", margin: "40px 0", background: "#FAFAF8" }}>
      <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 12 }}>The full specification</p>
      <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontWeight: 300, color: "#4B5563", lineHeight: 1.75, marginBottom: 16 }}>{body}</p>
      <a href={href} target="_blank" rel="noopener noreferrer"
        style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#9B7B3C", textDecoration: "none", borderBottom: "1px solid #9B7B3C" }}>
        {linkText}
      </a>
    </div>
  );
}

function ClosingText() {
  return (
    <>
      <div style={{ height: 1, background: "#E5E7EB", margin: "56px 0 40px" }} />
      <p style={{ textAlign: "center", fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontStyle: "italic", color: "#9CA3AF", lineHeight: 1.8 }}>
        This document is free. The philosophy is open. The protocol is coming.<br />
        The ideas belong to everyone. Use them.
      </p>
    </>
  );
}

function Block({ b, onCite }) {
  if (b.t === "p")         return <p style={st.p}><Rich onCite={onCite}>{b.x}</Rich></p>;
  if (b.t === "h3")        return <h3 style={st.h3}>{b.x}</h3>;
  if (b.t === "q")         return <blockquote style={st.q}><p className="blockquote-text" style={st.qt}><Rich onCite={onCite}>{b.x}</Rich></p></blockquote>;
  if (b.t === "env")       return <EnvViz />;
  if (b.t === "stat-grid") return <StatGrid stats={b.stats} />;
  if (b.t === "cta")       return <CtaBox body={b.body} linkText={b.linkText} href={b.href} />;
  if (b.t === "closing")   return <ClosingText />;
  if (b.t === "pr")        return (
    <div style={st.pr}>
      <span style={{ fontWeight: 500, color: "#111827" }}>{b.l}</span>
      <span style={{ color: "#9B7B3C" }}>{" — "}</span>
      <Rich onCite={onCite}>{b.x}</Rich>
    </div>
  );
  if (b.t === "n") return (
    <div style={st.nm}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, color: "#9B7B3C", letterSpacing: "0.04em", fontVariantNumeric: "tabular-nums" }}>{b.num}</span>
        <span style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontWeight: 500, color: "#111827" }}>{b.l}</span>
      </div>
      <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 15, fontWeight: 300, color: "#4B5563", lineHeight: 1.75, margin: 0 }}><Rich onCite={onCite}>{b.x}</Rich></p>
    </div>
  );
  return null;
}

function ChapterPage({ ch, content, nav, onCite }) {
  const idx = CHAPTERS.findIndex(c => c.id === ch.id);
  const prev = idx > 1 ? CHAPTERS[idx - 1] : (idx === 1 ? CHAPTERS[0] : null);
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  return (
    <div className="page-content" style={{ maxWidth: 760, margin: "0 auto", padding: "72px 48px 96px" }}>
      <article>
        <header style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", color: "#9CA3AF", textTransform: "uppercase", display: "block", marginBottom: 20 }}>
            Chapter {ch.num}
          </span>
          <h2 className="page-h2" style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.2, color: "#111827", letterSpacing: "-0.02em", marginBottom: 12 }}>
            {ch.title}
          </h2>
          <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 17, fontWeight: 300, fontStyle: "italic", color: "#9CA3AF", lineHeight: 1.5, marginBottom: 24 }}>
            {content.sub}
          </p>
          <div style={{ width: 40, height: 1, background: "#E5E7EB" }} />
        </header>
        <div style={{ width: "100%", maxWidth: "100%" }}>
          {content.body.map((b, i) => <Block key={i} b={b} onCite={onCite} />)}
        </div>
      </article>
      <nav className="chapter-nav" style={{ display: "flex", justifyContent: "space-between", marginTop: 72, paddingTop: 32, borderTop: "1px solid #E5E7EB", gap: 16 }}>
        {prev && prev.id !== "home" ? (
          <button onClick={() => nav(prev.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "Inter, system-ui, sans-serif", flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 11, color: "#9CA3AF", letterSpacing: "0.04em", marginBottom: 4 }}>{"← Previous"}</span>
            <span style={{ display: "block", fontSize: 14, color: "#111827", fontWeight: 400 }}>{prev.title}</span>
          </button>
        ) : <div style={{ flex: 1 }} />}
        {next ? (
          <button onClick={() => nav(next.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "right", fontFamily: "Inter, system-ui, sans-serif", flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 11, color: "#9CA3AF", letterSpacing: "0.04em", marginBottom: 4 }}>{"Next →"}</span>
            <span style={{ display: "block", fontSize: 14, color: "#111827", fontWeight: 400 }}>{next.title}</span>
          </button>
        ) : <div style={{ flex: 1 }} />}
      </nav>
    </div>
  );
}

function Sidebar({ active, onNav, mobile, isOpen, onClose }) {
  return (
    <>
      {mobile && <div className={`mob-overlay${isOpen ? " open" : ""}`} onClick={onClose} />}
      <nav className={`${mobile ? "mob-sidebar" : ""}${isOpen ? " open" : ""}`} style={{ ...st.side, ...(mobile ? { position: "fixed", left: 0, top: 0, zIndex: 100 } : {}) }}>
        <div style={{ padding: "0 0 24px" }}>
          <button onClick={() => { onNav("home"); onClose?.(); }} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ color: "#9B7B3C" }}><Hex s={15} /></div>
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, fontWeight: 500, color: "#111827", letterSpacing: "-0.01em" }}>The Hive Doctrine</span>
          </button>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", paddingLeft: 25 }}>Polytheistic AI Safety</p>
        </div>
        <div style={{ height: 1, background: "#E5E7EB", marginBottom: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {CHAPTERS.filter(c => c.id !== "home").map(ch => {
            const on = active === ch.id;
            const partLabel = PART_BREAKS[ch.id];
            return (
              <div key={ch.id}>
                {partLabel && (
                  <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", color: "#9B7B3C", textTransform: "uppercase", margin: "14px 10px 6px", lineHeight: 1.2 }}>{partLabel}</p>
                )}
                <button onClick={() => { onNav(ch.id); onClose?.(); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 4, border: "none", background: on ? "#F3F4F6" : "transparent", cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "Inter, system-ui, sans-serif", transition: "background 0.15s ease-out" }}>
                  <span style={{ fontSize: 10, fontWeight: 500, color: on ? "#9B7B3C" : "#9CA3AF", minWidth: 18, letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums" }}>{ch.num}</span>
                  <span style={{ fontSize: 13, fontWeight: on ? 500 : 400, color: on ? "#111827" : "#4B5563", lineHeight: 1.4 }}>{ch.title}</span>
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid #E5E7EB" }}>
          <button onClick={() => { onNav("references"); onClose?.(); }}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 4, border: "none", background: active === "references" ? "#F3F4F6" : "transparent", cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "Inter, system-ui, sans-serif", transition: "background 0.15s ease-out" }}>
            <span style={{ fontSize: 10, fontWeight: 500, color: active === "references" ? "#9B7B3C" : "#9CA3AF", minWidth: 18, letterSpacing: "0.02em" }}>{"→"}</span>
            <span style={{ fontSize: 13, fontWeight: active === "references" ? 500 : 400, color: active === "references" ? "#111827" : "#4B5563", lineHeight: 1.4 }}>References</span>
          </button>
        </div>
        <div style={{ paddingTop: 0 }}>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.7 }}>2026</p>
          <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.7 }}>The field, not the flower.</p>
        </div>
      </nav>
    </>
  );
}

function HomePage({ onNav }) {
  return (
    <div className="page-content" style={{ maxWidth: 760, margin: "0 auto", padding: "72px 48px 96px" }}>
      {/* Hero */}
      <div style={{ marginBottom: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <div style={{ color: "#9B7B3C" }}><Hex s={20} /></div>
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase" }}>2026</span>
        </div>
        <h1 className="page-h1" style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 40, fontWeight: 400, lineHeight: 1.15, color: "#111827", letterSpacing: "-0.025em", marginBottom: 20 }}>
          The Hive Doctrine
        </h1>
        <p className="page-subtitle" style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 19, fontWeight: 300, color: "#4B5563", lineHeight: 1.7, marginBottom: 20, maxWidth: 580 }}>
          A polytheistic approach to AI safety. Derived from biology, ancient temple architecture, and the oldest distributed intelligence system on earth:<br />the beehive.
        </p>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", letterSpacing: "0.02em", marginBottom: 8 }}>By Melisia Archimedes</p>

      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#E5E7EB", marginBottom: 56 }} />

      {/* Core thesis */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 20 }}>The argument</p>
        <blockquote style={{ borderLeft: "2px solid #9B7B3C", paddingLeft: 24, margin: "0 0 24px" }}>
          <p className="blockquote-text" style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 21, fontWeight: 400, fontStyle: "italic", color: "#111827", lineHeight: 1.5, margin: 0 }}>
            The diversity is the safety mechanism.
          </p>
        </blockquote>
        <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontWeight: 300, color: "#4B5563", lineHeight: 1.75 }}>
          Every major AI laboratory is building one god and hoping it agrees with them. The alignment problem isn't a bug — it's a structural inevitability of the architecture they've chosen. This document proposes an alternative: many small minds, culturally rooted, coordinating without central command. The intelligence emerges from the difference between perspectives. The safety emerges from the diversity itself.
        </p>
      </div>

      {/* Chapters */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 24 }}>Chapters</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {PREVIEWS.map(ch => (
            <button key={ch.num} onClick={() => onNav(ch.id)}
              style={{ display: "flex", gap: 16, padding: "16px 0", background: "none", border: "none", borderBottom: "1px solid #F3F4F6", cursor: "pointer", textAlign: "left", width: "100%", alignItems: "baseline" }}>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, color: "#9CA3AF", minWidth: 20, letterSpacing: "0.02em", fontVariantNumeric: "tabular-nums", paddingTop: 2 }}>{ch.num}</span>
              <div>
                <span style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontWeight: 500, color: "#111827", display: "block", marginBottom: 2 }}>{ch.title}</span>
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#9CA3AF", fontWeight: 400, lineHeight: 1.5 }}>{ch.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REFERENCES ───────────────────────────────────────────────────────────────

const REFS = [
  // Ch 01 - Monotheistic Fallacy
  { n: 1, ch: "01", authors: "Bai, Y. et al. (Anthropic)", year: 2022, title: "Constitutional AI: Harmlessness from AI Feedback", source: "arXiv:2212.08073", url: "https://arxiv.org/abs/2212.08073" },
  { n: 2, ch: "01", authors: "Ouyang, L. et al. (OpenAI)", year: 2022, title: "Training language models to follow instructions with human feedback", source: "NeurIPS 2022", url: "https://arxiv.org/abs/2203.02155", note: "Foundational RLHF paper describing alignment via human preference training." },
  { n: 3, ch: "01", authors: "OpenAI Superalignment Team", year: 2023, title: "Introducing Superalignment", source: "OpenAI Blog", url: "https://openai.com/index/introducing-superalignment/", note: "OpenAI dedicated 20% of compute to the superalignment problem; team later disbanded." },
  // Ch 02 - The Melissae
  { n: 4, ch: "02", authors: "Ashley, E.", year: 2023, title: "Meeting the Melissae: The Ancient Greek Bee Priestesses of Demeter", source: "Moon Books", url: "https://www.collectiveinkbooks.com/moon-books/our-books/meeting-melissae", note: "Primary scholarly source on Melissae serving Artemis at Ephesus, Demeter at Eleusis, Aphrodite at Corinth, and Cybele in Anatolia." },
  { n: 5, ch: "02", authors: "Arcadia Journal", year: 2024, title: "Sacred Nectar: Bees, Honey, and Divine Worship in Ancient Greece", source: "Arcadia", url: "https://www.byarcadia.org/posts/sacred-nectar:-bees,-honey,-and-divine-worship-in-ancient-greece", note: "Citing Pindar and Porphyry of Tyre on the Pythia as the 'Delphic Bee'; Lawler (1954) primary reference." },
  { n: 6, ch: "02", authors: "Grassé, P.-P.", year: 1959, title: "La reconstruction du nid et les coordinations interindividuelles chez Bellicositermes natalensis et Cubitermes sp. La théorie de la stigmergie", source: "Insectes Sociaux, 6(1), 41–80", url: "https://link.springer.com/article/10.1007/BF02223791", note: "Original paper coining 'stigmergy' to describe indirect coordination through environmental traces." },
  { n: 7, ch: "02", authors: "Hales, T. C.", year: 2001, title: "The Honeycomb Conjecture", source: "Discrete & Computational Geometry, 25(1), 1–22", url: "https://link.springer.com/article/10.1007/s004540010071", note: "Mathematical proof that the honeycomb (regular hexagonal tiling) is the most efficient partition of the plane. Conjecture attributed to Varro, De Re Rustica, 36 BCE." },
  // Ch 05 - Stigmergic Safety
  { n: 8, ch: "05", authors: "Theraulaz, G. & Bonabeau, E.", year: 1999, title: "A Brief History of Stigmergy", source: "Artificial Life, 5(2), 97–116", url: "https://pubmed.ncbi.nlm.nih.gov/10633572/", note: "History of stigmergy as a coordination mechanism in social insects; discusses quantitative and qualitative variants." },
  { n: 9, ch: "05", authors: "Heylighen, F.", year: 2016, title: "Stigmergy as a universal coordination mechanism I: Definition and components", source: "Cognitive Systems Research, 38, 4–13", url: "https://www.sciencedirect.com/science/article/abs/pii/S1389041715000327", note: "Formal definition of stigmergy; analysis of how it enables complex coordination without planning, control, or direct interaction." },
  { n: 10, ch: "05", authors: "Bonabeau, E. et al.", year: 1997, title: "Self-organization in social insects", source: "Trends in Ecology and Evolution, 12(5), 188–193", url: "https://pubmed.ncbi.nlm.nih.gov/21238030/", note: "How complex colony-level behaviours emerge from simple individual interactions; immune-like responses to pathogens." },
  // Ch 02 & 05 - Additional bee biology and AI safety
  { n: 32, ch: "02", authors: "von Frisch, K.", year: 1967, title: "The Dance Language and Orientation of Bees", source: "Harvard University Press", url: "https://www.hup.harvard.edu/books/9780674418776", note: "Nobel Prize-winning research establishing that honeybees communicate resource locations through the waggle dance. Foundational text for understanding distributed communication without central command." },
  { n: 33, ch: "02", authors: "Seeley, T. D.", year: 2010, title: "Honeybee Democracy", source: "Princeton University Press", url: "https://press.princeton.edu/books/paperback/9780691147215/honeybee-democracy", note: "How bee swarms make collective decisions through quorum sensing and democratic processes. The queen does not rule; the colony decides through distributed evaluation." },
  { n: 34, ch: "02", authors: "Dong, S. et al.", year: 2023, title: "Social signal learning of the waggle dance in honey bees", source: "Science, 379(6636), 1015–1018", url: "https://www.science.org/doi/10.1126/science.ade1702", note: "Waggle dancing requires social learning — bees that cannot observe experienced dancers produce disordered dances with permanent distance encoding errors." },
  { n: 35, ch: "05", authors: "Amodei, D. et al.", year: 2016, title: "Concrete Problems in AI Safety", source: "arXiv:1606.06565", url: "https://arxiv.org/abs/1606.06565", note: "Foundational AI safety paper identifying five concrete problems in machine learning safety. The Hive Doctrine argues these problems are structural consequences of the monolithic architecture, not solvable within it." },
  { n: 36, ch: "00", authors: "TIME / AI Incident Database", year: 2026, title: "What the Numbers Show About AI's Harms", source: "TIME", url: "https://time.com/7346091/ai-harm-risk/", note: "AI-related incidents rose 50% YoY from 2022–2024; deepfake incidents now outnumber autonomous vehicle + facial recognition + content moderation combined." },
  // Ch 06 - The Cultural Cost
  { n: 11, ch: "06", authors: "Ada Lovelace Institute", year: 2025, title: "Tokenising culture: causes and consequences of cultural misalignment in large language models", source: "Ada Lovelace Institute Blog", url: "https://www.adalovelaceinstitute.org/blog/cultural-misalignment-llms/", note: "400 million OpenAI users across 193 countries; LLMs prioritise individualism and default to Anglo-Saxon norms; warns of 'novel forms of digital cultural hegemony'. Traces bias to algorithmic monoculture, training data, and RLHF evaluator demographics." },
  { n: 12, ch: "06", authors: "Philosophy & Technology (Springer)", year: 2025, title: "Reinforcement Learning from Human Feedback in LLMs: Whose Culture, Whose Values, Whose Perspectives?", source: "Philosophy & Technology", url: "https://link.springer.com/article/10.1007/s13347-025-00861-0", note: "RLHF evaluator pools lack diversity; annotations collected from small, homogeneous groups reflecting majority cultural norms; feedback is largely one-directional." },
  { n: 13, ch: "06", authors: "Bai, X. et al.", year: 2025, title: "Explicitly unbiased large language models still form biased associations", source: "PNAS, 122(8)", url: "https://www.pnas.org/doi/10.1073/pnas.2416228122", note: "8 value-aligned models (incl. GPT-4, Claude) show pervasive implicit biases across race, gender, religion, health in 21 stereotypes. GPT-4 more likely to recommend Black/Hispanic/Asian candidates for lower-status jobs." },
  // Ch 07 - The Electricity Bill
  { n: 14, ch: "07", authors: "de Vries, A.", year: 2025, title: "The carbon and water footprints of data centers and what this could mean for artificial intelligence", source: "Patterns, 7(1), 101430", url: "https://www.sciencedirect.com/science/article/pii/S2666389925002788" },
  { n: 15, ch: "07", authors: "International Energy Agency", year: 2025, title: "Global Energy Review 2025", source: "IEA, Paris", url: "https://www.iea.org/reports/global-energy-review-2025", note: "A typical AI data centre uses as much electricity as 100,000 households; figure of 2 million households cited in CBS reporting of hyperscale facilities." },
  { n: 16, ch: "07", authors: "Environmental Law Institute", year: 2025, title: "AI's Cooling Problem: How Data Centers Are Transforming Water Use", source: "Vibrant Environment Blog, ELI", url: "https://www.eli.org/vibrant-environment-blog/ais-cooling-problem-how-data-centers-are-transforming-water-use" },
  { n: 17, ch: "07", authors: "AIMultiple Research", year: 2025, title: "AI Energy Consumption Statistics", source: "AIMultiple", url: "https://research.aimultiple.com/ai-energy-consumption/", note: "Irish grid data: 21% of national electricity for data centres, potentially 32% by 2026." },
  { n: 18, ch: "07", authors: "World Economic Forum", year: 2025, title: "It's time to prioritize the development of sustainable AI", source: "WEF Stories", url: "https://www.weforum.org/stories/2025/01/sustainable-development-ai/" },
  { n: 19, ch: "07", authors: "International Energy Agency", year: 2025, title: "Electricity 2025: Analysis and forecast to 2027", source: "IEA, Paris", url: "https://www.iea.org/reports/electricity-2025" },
  { n: 20, ch: "07", authors: "Wolters Kluwer", year: 2025, title: "Energy demands will be a growing concern for AI technology", source: "Expert Insights", url: "https://www.wolterskluwer.com/en/expert-insights/energy-demands-will-be-a-growing-concern-for-ai-technology" },
  { n: 21, ch: "07", authors: "TRENDS Research & Advisory", year: 2026, title: "Water Implications of AI-Driven Digital Infrastructure Expansion", source: "TRENDS Research", url: "https://trendsresearch.org/insight/water-implications-of-ai-driven-digital-infrastructure-expansion/" },
  { n: 22, ch: "07", authors: "CBS News / EESI", year: 2026, title: "Data centers for AI use huge amounts of electricity, water", source: "CBS News", url: "https://www.cbsnews.com/chicago/news/data-centers-for-ai-electricity-water-climate-health/" },
  { n: 23, ch: "07", authors: "Lincoln Institute of Land Policy", year: 2025, title: "Data Drain: The Land and Water Impacts of the AI Boom", source: "Land Lines Magazine", url: "https://www.lincolninst.edu/publications/land-lines-magazine/articles/land-water-impacts-data-centers/" },
  { n: 24, ch: "07", authors: "Source New Mexico", year: 2026, title: "Report says national push for AI data centers leading to outsized energy, water consumption", source: "Source NM", url: "https://sourcenm.com/2026/03/05/report-says-national-push-for-ai-data-centers-leading-to-outsized-energy-water-consumption/" },
  { n: 25, ch: "07", authors: "Duffy, C.", year: 2025, title: "The big wrinkle in the multi-trillion-dollar AI buildout", source: "CNN Business", url: "https://www.cnn.com/2025/12/19/tech/ai-chips-lifecycle-questions" },
  { n: 26, ch: "07", authors: "Dey, A.", year: 2026, title: "Alibaba's small, open source Qwen3.5-9B beats OpenAI's gpt-oss-120B", source: "VentureBeat", url: "https://venturebeat.com/technology/alibabas-small-open-source-qwen3-5-9b-beats-openais-gpt-oss-120b-and-can-run" },
  { n: 27, ch: "07", authors: "TechEBlog", year: 2026, title: "Alibaba's New Qwen 3.5 Small AI Model Can Run Directly On an iPhone 17", source: "TechEBlog", url: "https://www.techeblog.com/alibaba-qwen-3-5-on-device-ai-iphone-17/" },
  { n: 28, ch: "07", authors: "U.S. Department of Energy", year: 2024, title: "DOE Releases New Report Evaluating Increase in Electricity Demand from Data Centers", source: "DOE", url: "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers" },
  { n: 29, ch: "07", authors: "Yale Clean Energy Forum", year: 2025, title: "Data Center Energy Consumption: How Much Energy Did/Do/Will They Eat?", source: "Yale School of the Environment", url: "https://cleanenergyforum.yale.edu/2025/11/12/data-center-energy-consumption-how-much-energy-diddowill-they-eat" },
  { n: 30, ch: "07", authors: "World Resources Institute", year: 2025, title: "Powering the US Data Center Boom", source: "WRI Insights", url: "https://www.wri.org/insights/us-data-centers-electricity-demand" },
  { n: 31, ch: "07", authors: "Princeton CITP", year: 2025, title: "Lifespan of AI Chips: The $300 Billion Question", source: "CITP Blog", url: "https://blog.citp.princeton.edu/2025/10/15/lifespan-of-ai-chips-the-300-billion-question/" },
];

const CH_GROUPS = [
  { ch: "00", title: "Preamble", refs: [36] },
  { ch: "01", title: "The Monotheistic Fallacy", refs: [1,2,3] },
  { ch: "02", title: "The Melissae", refs: [4,5,6,7,32,33,34] },
  { ch: "03", title: "Nature Knew First", note: "Primary sources: Seeley (2010) Honeybee Democracy [33]; Tero et al. (2010) Science 327; Cavagna et al. (2010) PNAS; Ashby (1956) An Introduction to Cybernetics. Accessible via ref [33] above." },
  { ch: "04", title: "The Hive Architecture", note: "No external references. Original framework describing a system running in production." },
  { ch: "05", title: "Stigmergic Safety", refs: [8,9,10,35] },
  { ch: "06", title: "The Cultural Cost", refs: [11,12,13] },
  { ch: "07", title: "The Electricity Bill", refs: [14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31] },
  { ch: "08", title: "The Distributed Facade", note: "No external references. Original analysis of current multi-agent ecosystem." },
  { ch: "09", title: "What This Gets Wrong", note: "No external references. Original critical analysis of distributed architecture failure modes." },
  { ch: "10", title: "The Protocol", note: "The Hive Protocol v0.1 specification. Full technical references will be published when the protocol is released." },
  { ch: "11", title: "The Manifesto", note: "No external references. Original manifesto." },
];

const CHART_NOTES = [
  "Historical data (2000–2024) compiled from IEA Global Energy Review,[15][19] DOE/Lawrence Berkeley National Laboratory reports,[28] Yale Clean Energy Forum,[29] and World Resources Institute.[30]",
  "The 2010–2020 plateau reflects efficiency gains (virtualisation, improved PUE) that temporarily offset growing demand.[29][30]",
  "The post-2022 inflection corresponds to the deployment of GPU-accelerated servers for generative AI, particularly following the release of ChatGPT in November 2022.[28]",
  "Projections (2026–2050): The LLM trajectory extends IEA's 2030 estimate of ~945 TWh[29] using a conservative 5% compound annual growth rate to 2050. The SPM trajectory models a scenario where distributed, on-device inference progressively replaces centralised compute, with total data centre demand declining 3–4% annually from 2028 onward as edge deployment scales. These projections are the authors' own extrapolations and should be understood as illustrative scenarios, not forecasts.",
];

function ReferencesPage({ onNav, highlightRef }) {
  const highlightCh = highlightRef ? CH_GROUPS.find(g => g.refs?.includes(highlightRef))?.ch : null;
  const [open, setOpen] = useState(() => {
    const init = {};
    if (highlightCh) init[highlightCh] = true;
    return init;
  });
  const toggle = (ch) => setOpen(p => ({ ...p, [ch]: !p[ch] }));

  const didScroll = useRef(false);
  if (highlightRef && !didScroll.current) {
    setTimeout(() => {
      const el = document.getElementById(`ref-${highlightRef}`);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); didScroll.current = true; }
    }, 100);
  }

  return (
    <div className="page-content" style={{ maxWidth: 760, margin: "0 auto", padding: "72px 48px 96px" }}>
      <header style={{ marginBottom: 56 }}>
        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", color: "#9CA3AF", textTransform: "uppercase", display: "block", marginBottom: 20 }}>References</span>
        <h2 className="page-h2" style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 32, fontWeight: 400, lineHeight: 1.2, color: "#111827", letterSpacing: "-0.02em", marginBottom: 12 }}>Sources & methodology</h2>
        <div style={{ width: 40, height: 1, background: "#E5E7EB", marginTop: 24 }} />
      </header>

      <p style={{ fontFamily: "Newsreader, Georgia, serif", fontSize: 17, fontWeight: 300, color: "#111827", lineHeight: 1.75, marginBottom: 48 }}>
        All data claims in this document are sourced from peer-reviewed research, government reports, and verified journalism. Superscript numbers in the text correspond to the references below. Where projections involve the authors' own calculations, the methodology is disclosed.
      </p>

      {CH_GROUPS.map(g => {
        const isOpen = open[g.ch] ?? false;
        const chRefs = g.refs ? REFS.filter(r => g.refs.includes(r.n)).sort((a, b) => a.n - b.n) : [];
        return (
          <div key={g.ch} style={{ marginBottom: 8 }}>
            <button onClick={() => toggle(g.ch)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "14px 0", background: "none", border: "none", borderTop: "1px solid #E5E7EB", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#111827" }}>
                <span style={{ color: "#9CA3AF", marginRight: 8, fontSize: 11, fontVariantNumeric: "tabular-nums" }}>{g.ch}</span>
                {g.title}
                {chRefs.length > 0 && <span style={{ color: "#9CA3AF", fontWeight: 400, marginLeft: 8, fontSize: 11 }}>{chRefs.length} source{chRefs.length !== 1 ? "s" : ""}</span>}
              </span>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>{"▶"}</span>
            </button>
            {isOpen && (
              <div style={{ paddingBottom: 16 }}>
                {g.note && <p className="ref-note" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#9CA3AF", fontStyle: "italic", paddingLeft: 28, marginBottom: 8 }}>{g.note}</p>}
                {chRefs.map(r => {
                  const isHL = highlightRef === r.n;
                  return (
                    <div key={r.n} id={`ref-${r.n}`} className="ref-item" style={{ display: "flex", gap: 12, marginBottom: 16, paddingLeft: 28, borderRadius: 6, padding: isHL ? "16px 16px 16px 28px" : "0 0 0 28px", animation: isHL ? "refHL 8s ease-out forwards" : "none" }}>
                      <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: 500, color: "#9B7B3C", minWidth: 24, fontVariantNumeric: "tabular-nums", paddingTop: 3 }}>[{r.n}]</span>
                      <div>
                        <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#111827", lineHeight: 1.6, margin: 0, marginBottom: 4 }}>
                          {r.authors} ({r.year}). <em>{r.title}</em>. {r.source}.
                        </p>
                        {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9B7B3C", wordBreak: "break-all" }}>{r.url}</a>}
                        {r.note && <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, color: "#9CA3AF", lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>{r.note}</p>}
                      </div>
                    </div>
                  );
                })}
                {g.ch === "07" && (
                  <div className="ref-methodology" style={{ paddingLeft: 28, marginTop: 20, paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
                    <p style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", color: "#9CA3AF", textTransform: "uppercase", marginBottom: 12 }}>Chart methodology: Global data centre electricity consumption, 2000–2050</p>
                    {CHART_NOTES.map((note, i) => (
                      <p key={i} style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, color: "#4B5563", lineHeight: 1.65, marginBottom: 12, paddingLeft: 16, borderLeft: "1px solid #E5E7EB" }}>
                        <Rich>{note}</Rich>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function HiveDoctrine() {
  const [active, setActive] = useState("home");
  const [mobMounted, setMobMounted] = useState(false);
  const [mobOpen, setMobOpen] = useState(false);
  const [highlightRef, setHighlightRef] = useState(null);
  const ref = useRef(null);
  const ch = CHAPTERS.find(c => c.id === active);
  const content = C[active];
  const nav = id => { setActive(id); setHighlightRef(null); ref.current?.scrollTo({ top: 0, behavior: "smooth" }); };
  const navToRef = (num) => { setHighlightRef(Number(num)); setActive("references"); ref.current?.scrollTo({ top: 0 }); };
  const openMob = () => { setMobMounted(true); requestAnimationFrame(() => requestAnimationFrame(() => setMobOpen(true))); };
  const closeMob = () => { setMobOpen(false); setTimeout(() => setMobMounted(false), 300); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{background:#FAFAF8}
        ::selection{background:rgba(155,123,60,0.15)}
        input:focus{border-color:#9B7B3C!important;box-shadow:0 0 0 1px rgba(155,123,60,0.2)!important}
        button:hover{opacity:0.88}
        button:focus{outline:none}
        .mobile-header{background:rgba(250,250,248,0.82);-webkit-backdrop-filter:saturate(180%) blur(16px);backdrop-filter:saturate(180%) blur(16px)}
        .mob-overlay{position:fixed;inset:0;background:rgba(0,0,0,0);z-index:90;transition:background 0.3s ease}
        .mob-overlay.open{background:rgba(0,0,0,0.2)}
        .mob-sidebar{transform:translateX(-100%);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1)}
        .mob-sidebar.open{transform:translateX(0)}
        @media(max-width:900px){.sd{display:none!important}.mh{display:flex!important}}
        @keyframes refHL{0%{background:rgba(155,123,60,0.12)}37.5%{background:rgba(155,123,60,0.12)}100%{background:transparent}}
        @media(max-width:640px){
          .page-content{padding:48px 20px 64px!important}
          .page-h1{font-size:28px!important}
          .page-h2{font-size:24px!important}
          .page-subtitle{font-size:17px!important}
          .stat-grid{grid-template-columns:1fr!important}
          .env-grid{grid-template-columns:1fr 1fr!important}
          .env-callout{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}
          .env-callout-divider{width:40px!important;height:1px!important}
          .chart-legend{flex-direction:column!important;gap:8px!important}
          .blockquote-text{font-size:18px!important}
          .chapter-nav{gap:16px!important}
          .chapter-nav>button,.chapter-nav>div{min-width:0!important;flex:1!important}
          .ref-item{padding-left:16px!important}
          .ref-note{padding-left:16px!important}
          .ref-methodology{padding-left:16px!important}
          .mob-sidebar{max-width:80vw!important}
        }
      `}</style>
      <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#FAFAF8", overflow: "hidden" }}>
        <div className="sd"><Sidebar active={active} onNav={nav} onClose={closeMob} /></div>
        {mobMounted && <Sidebar active={active} onNav={nav} mobile isOpen={mobOpen} onClose={closeMob} />}
        <main ref={ref} style={{ flex: 1, overflowY: "scroll", height: "100vh" }}>
          <div className="mh mobile-header" style={{ display: "none", padding: "0 16px", height: 48, borderBottom: "1px solid rgba(229,231,235,0.8)", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 10 }}>
            <button onClick={openMob} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#4B5563", padding: 0, lineHeight: 1, flexShrink: 0 }}>{"☰"}</button>
            <button onClick={() => nav("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "Inter, system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "#111827", lineHeight: 1 }}>The Hive Doctrine</button>
          </div>
          {active === "home" ? (
            <HomePage onNav={nav} />
          ) : active === "references" ? (
            <ReferencesPage onNav={nav} highlightRef={highlightRef} />
          ) : (
            <ChapterPage ch={ch} content={content} nav={nav} onCite={navToRef} />
          )}
        </main>
      </div>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const st = {
  side: { width: 256, minWidth: 256, height: "100vh", background: "#FFFFFF", borderRight: "1px solid #E5E7EB", display: "flex", flexDirection: "column", padding: "28px 16px 20px", overflowY: "auto" },
  p:   { marginBottom: 24, fontFamily: "Newsreader, Georgia, serif", fontSize: 17, fontWeight: 300, color: "#111827", lineHeight: 1.75 },
  h3:  { fontFamily: "Newsreader, Georgia, serif", fontSize: 19, fontWeight: 500, color: "#111827", marginTop: 48, marginBottom: 16, letterSpacing: "-0.01em" },
  q:   { borderLeft: "2px solid #9B7B3C", paddingLeft: 24, margin: "48px 0" },
  qt:  { fontFamily: "Newsreader, Georgia, serif", fontSize: 21, fontWeight: 400, fontStyle: "italic", color: "#111827", lineHeight: 1.5, margin: 0 },
  pr:  { marginBottom: 24, paddingLeft: 20, borderLeft: "1px solid #E5E7EB", fontFamily: "Newsreader, Georgia, serif", fontSize: 16, fontWeight: 300, lineHeight: 1.75, color: "#111827" },
  nm:  { marginBottom: 28, paddingLeft: 20, borderLeft: "1px solid #E5E7EB" },
};
