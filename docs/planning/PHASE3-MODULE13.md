# Module 13: "Picking the Right AI Tool"
## Subtitle: How to evaluate, compare, and avoid getting burned
### Phase 3 — Put It to Work

---

## Lesson 1: Red Flags in AI Sales Pitches

```
---
id: lesson-1
moduleId: module-13
slug: red-flags-in-ai-sales-pitches
title: "Red Flags in AI Sales Pitches"
subtitle: "The lines every salesperson uses — and what to ask instead"
estimatedMinutes: 8
xpReward: 50
---
```

# Red Flags in AI Sales Pitches

You've done a demo. The product looks slick. The salesperson is enthusiastic. Everything seems to work perfectly.

Here's the thing: it's supposed to look that way. Demos are the most controlled environment an AI tool will ever operate in. Real life — your messy data, your edge cases, your actual workflows — is a completely different story.

Before you sign anything, you need to know which lines to watch out for. These are the phrases that sound great in a sales call and mean almost nothing in practice.

---

## The Phrases That Should Make You Pause

<RevealCard
  id="flag-1"
  label="🚩 'We're 99.9% accurate'"
  reveal="Accurate at what, exactly? Measured how? On whose data? Under what conditions? Accuracy claims are meaningless without context. A spam filter that marks everything as spam is 100% accurate at catching spam — and useless. When you hear an accuracy number, ask: (1) What specific task was this measured on? (2) What was the test dataset — was it representative of my actual use case? (3) What counts as an error? Get specifics or don't trust the stat."
/>

<RevealCard
  id="flag-2"
  label="🚩 'It learns from your data automatically'"
  reveal="This phrase gets used in two very different ways, and the difference matters enormously. Usually, it means the AI remembers context within your conversations — not that the underlying model is actually being retrained on your specific data. True custom model training is expensive, time-consuming, and rare outside enterprise contracts. Ask directly: 'Does the base model get retrained on my data, or does it just use my data as context at runtime?' The honest answer will tell you a lot."
/>

<RevealCard
  id="flag-3"
  label="🚩 'We integrate with everything'"
  reveal="Nobody integrates with everything. Every integration has limits — some are read-only, some only push data in one direction, some break when the other platform updates. Before you take this claim seriously, name your specific tools — the CRM you actually use, the scheduling software you're already on, the database your team lives in — and ask to see those specific integrations running live, with real data. If they hedge or offer to 'set up a technical call,' the integrations may not be as deep as advertised."
/>

<RevealCard
  id="flag-4"
  label="🚩 'No setup required'"
  reveal="There is always setup. Always. What they mean is that you don't need a developer to log in and start the free trial. Getting it to actually work for your situation — connected to your data, tuned to your use cases, configured to match your workflows — takes time, effort, and sometimes help. Ask: 'Walk me through a realistic timeline from signing the contract to getting real value from this tool.' The answer should include integration work, testing, and at least a few rounds of iteration."
/>

<RevealCard
  id="flag-5"
  label="🚩 'Our AI understands your business'"
  reveal="This is a marketing sentence, not a technical claim. AI doesn't understand your business the way a human colleague does. It processes text. It matches patterns. It generates outputs based on training data and the context you give it. When you hear this, ask: 'What does your AI actually do with information about my business? Where is that information stored? How does it affect the outputs I get?' Force the vague claim into specifics."
/>

<RevealCard
  id="flag-6"
  label="🚩 'Our customers see 10x ROI'"
  reveal="Ask who. Ask when. Ask how it was measured. ROI claims in AI sales pitches are almost always cherry-picked, self-reported, or calculated using the most favorable assumptions possible. The 10x ROI customer may have had an unusually manual process before, unusually high adoption afterward, or their 'ROI' was calculated by someone trying to close a deal. Ask to speak with a reference customer who achieved similar results — in a business similar in size and structure to yours."
/>

---

## The Demo vs. Reality Gap

Here's what a demo typically shows you:

- A clean, well-structured dataset
- The most common, well-formed use cases
- Edge cases that have been identified and handled
- A workflow that someone has rehearsed dozens of times

Here's what real life looks like:

- Your data has inconsistencies, missing fields, and legacy weirdness
- Your users will ask questions the system wasn't designed for
- Edge cases you haven't imagined will happen constantly
- No one on your team has rehearsed anything

This isn't a criticism — it's just physics. Every software demo shows the best-case path. Your job as a buyer is to introduce friction and see what happens.

**After any demo, ask the salesperson:** "Can we run through a scenario where the AI gives a wrong answer or doesn't know something? What does the failure mode actually look like?"

How they handle that question — and whether the answer is honest — tells you more than the demo itself.

---

## A Green Flag to Look For

A good vendor will tell you upfront where their tool struggles. They'll say things like: "Our accuracy drops on this type of input," or "This integration works well except for this edge case," or "This use case is harder than it looks — here's why."

Vendors who never admit a weakness aren't more confident in their product. They're just less honest about it.

---

## Quick Check

<Quiz
  id="module13-lesson1-quiz"
  questions={[
    {
      id: "q1",
      text: "A vendor claims their AI is '98% accurate.' What's the most important follow-up question?",
      options: [
        { id: "a", text: "What does the other 2% look like, and how does the error surface?" },
        { id: "b", text: "Is that better than the competition?" },
        { id: "c", text: "Accurate at what specific task, measured on what data, under what conditions?" },
        { id: "d", text: "What happens when you get to 99%?" }
      ],
      correctId: "c",
      explanation: "Accuracy numbers without context are meaningless. 98% accurate at what task? Measured on whose data? Under which conditions? A spam filter that catches every spam email is useless if it also catches all your real emails. Always push accuracy claims into specifics before treating them as meaningful."
    },
    {
      id: "q2",
      text: "A vendor says their tool 'integrates with everything.' What's the right move?",
      options: [
        { id: "a", text: "Take them at their word — they wouldn't say it if it weren't true" },
        { id: "b", text: "Ask to see your specific tools running live in a demo with real data" },
        { id: "c", text: "Check their website for a list of integrations" },
        { id: "d", text: "Assume it's true and verify after you've signed the contract" }
      ],
      correctId: "b",
      explanation: "Nobody integrates with everything. The only way to verify an integration claim is to test your specific tools, with real data, before you buy. A logo on their integration page doesn't mean the integration is deep, reliable, or bidirectional. Demand a live demonstration."
    },
    {
      id: "q3",
      text: "Why is a vendor who admits their tool's weaknesses a green flag?",
      options: [
        { id: "a", text: "It means the tool is new and still improving" },
        { id: "b", text: "It means they have a lower price to compensate for the gaps" },
        { id: "c", text: "Honest vendors who know their limitations are more trustworthy than those who claim perfection" },
        { id: "d", text: "It means they will fix those weaknesses in the next version" }
      ],
      correctId: "c",
      explanation: "Every AI tool has weaknesses. Vendors who acknowledge them honestly are giving you real information you can use to evaluate fit. Vendors who claim no weaknesses either don't know their product well or aren't being straight with you — neither is a good sign."
    }
  ]}
/>

---

## Key Takeaway

> **Demos show you the best-case scenario. Your job is to find the failure mode before you're locked in. When you hear a claim that sounds too clean — accurate, learns automatically, integrates with everything, no setup required — slow down and ask for specifics. Honest vendors welcome the question. The ones who don't are telling you something.**

---

<LessonComplete lessonId="lesson-1" nextLessonSlug="10-questions-before-you-buy" xpReward={50} />

---

---

## Lesson 2: The 10 Questions to Ask Before You Buy

```
---
id: lesson-2
moduleId: module-13
slug: 10-questions-before-you-buy
title: "The 10 Questions to Ask Before You Buy"
subtitle: "A checklist that cuts through the demo magic and gets to the truth"
estimatedMinutes: 9
xpReward: 50
---
```

# The 10 Questions to Ask Before You Buy

Most people evaluate AI tools by answering one question: "Can it do the thing in the demo?"

That's a start. But it's not enough to protect you from a painful contract, a messy migration, or a tool that quietly degrades over time.

These 10 questions are the ones that separate "looks good in a demo" from "actually works for us."

---

## Before the Questions: Do Your Homework First

Before you ever talk to a vendor, answer this question yourself: **What specific problem am I solving, and how am I solving it today?**

Write it in one sentence. If you can't do that, you're not ready to evaluate a tool. You'll buy based on vibes instead of fit — and that's how you end up with a contract you regret.

---

## The 10 Questions

<RevealCard
  id="tq-1"
  label="1. What specific problem does this solve — and what does success look like in 90 days?"
  reveal="The vendor's answer to this question tells you whether they've sold to businesses like yours before. A good answer is concrete: 'You'll reduce time spent on X by Y%' or 'By day 90, your team will be doing Z.' A vague answer ('you'll be more efficient!') means they don't actually know how their tool applies to your situation. If they can't define success, you can't measure it."
/>

<RevealCard
  id="tq-2"
  label="2. What does it cost at 3x and 10x my current usage?"
  reveal="AI pricing is designed to look affordable at low volume and can scale aggressively. A tool that costs $99/month today might cost $600/month once you've actually integrated it into your workflow and expanded usage across your team. Ask for the pricing at 3x and 10x your projected volume. Ask what triggers an upgrade. If they won't give you numbers, assume the scaling is unfavorable."
/>

<RevealCard
  id="tq-3"
  label="3. Can I see it run on my actual data — not demo data?"
  reveal="Demo data is clean, well-structured, and cherry-picked to show the tool in the best possible light. Your real data has gaps, inconsistencies, legacy formatting, and edge cases no demo covers. Before signing, ask for a proof-of-concept or pilot using a sample of your actual data. If the vendor won't do this, you're buying blind."
/>

<RevealCard
  id="tq-4"
  label="4. How do I cancel, and what happens to my data after I do?"
  reveal="Ask this before you start, not when you want to leave. Find out: how much notice is required? What happens to your data — is it deleted, archived, or held hostage? Can you export everything in a usable format? How long is data retained after cancellation? Vendors who make cancellation easy are confident you'll stay. Vendors who make it hard are counting on friction to keep you."
/>

<RevealCard
  id="tq-5"
  label="5. Is my data used to train the model?"
  reveal="The answer is almost always 'no' for paid enterprise plans and 'yes by default' for free or prosumer plans. Check the privacy policy AND the Data Processing Agreement (DPA) — not just the marketing copy. If you're in a regulated industry (healthcare, legal, finance), your data governance requirements may make some tools non-starters regardless of pricing. Get the answer in writing, not in a sales call."
/>

<RevealCard
  id="tq-6"
  label="6. What does it look like when the AI gets something wrong?"
  reveal="Every AI tool makes mistakes. The question isn't whether it fails — it's how it fails. Does it fail visibly (an obvious wrong answer you can catch) or silently (a confident-sounding wrong answer that looks right)? Is there a confidence score or flag when the AI is uncertain? Is there a feedback loop to report and fix errors? Silent failures are dangerous. Tools that surface uncertainty honestly are safer to deploy."
/>

<RevealCard
  id="tq-7"
  label="7. What does actual onboarding look like, step by step?"
  reveal="'No setup required' means you can log in. It doesn't mean you can get value. Ask for the real onboarding timeline: how long from contract to first meaningful output? What work is on your side versus theirs? Do you need a developer? A dedicated admin? How long does integration typically take? What's the most common reason implementations stall? The realistic answer is usually measured in weeks, not minutes."
/>

<RevealCard
  id="tq-8"
  label="8. Can I talk to 2-3 customers in a similar situation before I decide?"
  reveal="Not the testimonials on their website — those are curated. Ask for reference customers who use the tool for something close to your use case, at a similar scale, in a similar industry. When you talk to them, ask: What doesn't work well? What took longer than expected? What would you do differently? Would you buy it again? Vendors who can't provide references may not have solved your specific problem yet."
/>

<RevealCard
  id="tq-9"
  label="9. What's the uptime track record and what's the SLA on my plan?"
  reveal="If you're building workflows around this tool, its downtime is your downtime. Ask for a link to their status page and review the last 90 days of uptime data — not just the summary, but the actual incidents. Ask what the Service Level Agreement (SLA) promises on your plan and what compensation you receive if they miss it. No published uptime history means they're not confident in their reliability."
/>

<RevealCard
  id="tq-10"
  label="10. What does a failed implementation look like — and how common is it?"
  reveal="This is the question that makes mediocre vendors uncomfortable and good vendors appreciate. Ask: what are the most common reasons customers like me don't get the value they expected? What would you do differently with a customer in my situation? What percentage of customers actually achieve their stated goal? Vendors who can answer this honestly have learned from experience. Those who can't either don't track it or don't want you to know."
/>

---

## The Pre-Buy Checklist

Before signing any AI tool contract, confirm you can check every box:

- [ ] I can state the specific problem this solves in one sentence
- [ ] I know what success looks like in 90 days, in measurable terms
- [ ] I know the full cost at 3x and 10x my current usage
- [ ] I've seen it run on my actual data — not a clean demo dataset
- [ ] I know exactly how to cancel and export my data afterward
- [ ] I know whether my data is used for model training — in writing
- [ ] I know what errors look like and how they surface
- [ ] I know the realistic onboarding timeline and who does the work
- [ ] I've spoken with at least one reference customer in a similar situation
- [ ] I've reviewed the uptime history and understand the SLA

If you can't check every box, keep asking questions. The cost of buying wrong is much higher than the cost of taking another week to evaluate.

---

## Quick Check

<Quiz
  id="module13-lesson2-quiz"
  questions={[
    {
      id: "q1",
      text: "Why is it important to ask about pricing at 10x your current usage — not just the current plan?",
      options: [
        { id: "a", text: "Because you'll definitely grow 10x in the first year" },
        { id: "b", text: "AI pricing scales in ways that aren't obvious from starter plan pricing, and a tool affordable now can become unaffordable once you rely on it" },
        { id: "c", text: "Because 10x usage qualifies you for a volume discount" },
        { id: "d", text: "It's just a negotiating tactic to get a better price" }
      ],
      correctId: "b",
      explanation: "AI pricing often scales aggressively — per-seat fees multiply, per-use charges compound, and usage tiers trigger at lower thresholds than you'd expect. Understanding the cost at scale tells you whether this tool is viable long-term or whether you're signing up for a pricing trap."
    },
    {
      id: "q2",
      text: "You ask a vendor for reference customers and they say they can't share contact info due to privacy. What's the right response?",
      options: [
        { id: "a", text: "Accept it — they're just protecting their customers" },
        { id: "b", text: "Ask for written case studies instead — those are equivalent" },
        { id: "c", text: "Push back — reputable vendors maintain opt-in reference pools of willing customers" },
        { id: "d", text: "Search online for independent reviews instead" }
      ],
      correctId: "c",
      explanation: "Reputable vendors maintain a list of customers who have agreed to speak with prospects. A blanket privacy refusal usually means they don't have confident, satisfied customers in your use case. Written testimonials are curated — they're not a substitute for an unscripted conversation with a real customer."
    },
    {
      id: "q3",
      text: "What's the most dangerous type of AI error?",
      options: [
        { id: "a", text: "An obvious error that clearly looks wrong" },
        { id: "b", text: "A confident-sounding wrong answer that appears correct" },
        { id: "c", text: "A slow response that takes longer than expected" },
        { id: "d", text: "An error that crashes the system entirely" }
      ],
      correctId: "b",
      explanation: "Obvious errors get caught. Silent failures — confident-sounding wrong answers that look plausible — are the dangerous ones. They can propagate through your workflow, reach customers, or affect decisions before anyone notices. When evaluating any AI tool, specifically ask to see what wrong answers look like."
    }
  ]}
/>

---

## Key Takeaway

> **The point of these questions isn't to find a reason to say no. It's to make sure that when you say yes, you're saying yes to the tool you'll actually be using — not the one that looked good in a demo with clean data and a practiced presenter.**

---

<LessonComplete lessonId="lesson-2" nextLessonSlug="build-vs-buy" xpReward={50} />

---

---

## Lesson 3: Build vs. Buy — When to Use an Existing Tool vs. Build Your Own

```
---
id: lesson-3
moduleId: module-13
slug: build-vs-buy
title: "Build vs. Buy"
subtitle: "When a vendor tool is the smart move — and when you're better off building your own"
estimatedMinutes: 8
xpReward: 50
---
```

# Build vs. Buy

At some point, almost every business faces this question: should we buy an AI tool off the shelf, or build something ourselves?

The wrong answer is usually the one that gets made for the wrong reasons. Companies build because it feels exciting, or because they don't trust vendors, or because a developer says "we could just build that." Companies buy because they heard the vendor pitch before asking their own team what was possible.

Neither instinct is reliable. Here's how to think about it clearly.

---

## Why the Question Matters More Now

A few years ago, "build your own AI" meant hiring machine learning engineers, collecting massive datasets, and spending millions of dollars. That's still true for cutting-edge foundation models.

But today, "build your own AI" often means writing a few hundred lines of code on top of an existing AI API — connecting it to your data, shaping its outputs, and deploying it as your own workflow. That's cheap, fast, and accessible to most technical teams.

So the question isn't really "can we build it?" anymore. It's "should we?"

---

## When to Buy

<RevealCard
  id="bb-buy-1"
  label="Buy when: the problem is common and already solved"
  reveal="Customer service chatbots, AI email drafting, meeting summaries, document Q&A, scheduling assistance — these are commodity problems. Dozens of mature, well-priced tools exist. Building your own version would take months of engineering time and significant cost to reach feature parity with a $100/month SaaS product. When a problem is generic, buying is almost always right."
/>

<RevealCard
  id="bb-buy-2"
  label="Buy when: speed matters more than perfection"
  reveal="Getting to value in 2-3 weeks with a vendor tool versus 3-6 months building your own is often the right tradeoff — even if the vendor solution isn't perfectly tailored to your needs. Speed matters most when you're validating a new workflow, testing whether AI actually helps with a specific task, or when a business opportunity has a time window. Buy first, optimize later."
/>

<RevealCard
  id="bb-buy-3"
  label="Buy when: you don't have engineering capacity to maintain what you build"
  reveal="Building something is only half the cost. The other half is maintaining it. AI tools need prompt tuning, error monitoring, model updates, and integration maintenance. If your team doesn't have the capacity to own that ongoing work, a vendor who does it for you is a better deal — even at a higher monthly cost. Factor in the full maintenance burden, not just the build cost."
/>

---

## When to Build

<RevealCard
  id="bb-build-1"
  label="Build when: your use case is genuinely unique"
  reveal="If no vendor has solved your specific problem — because your workflow is unusual, your data is proprietary, or your requirements don't match any existing product's design — building is justified. Ask yourself: have I looked at 10 vendors and none of them fit? If yes, you may have a genuinely unique problem. If you've only looked at 2-3 and given up, look harder before defaulting to build."
/>

<RevealCard
  id="bb-build-2"
  label="Build when: vendor pricing becomes prohibitive at scale"
  reveal="If a vendor charges $0.01 per transaction and you process 500,000 transactions a month, that's $5,000/month. At 5 million transactions, it's $50,000/month. At that point, building on top of a foundation model API directly — and optimizing your usage — typically cuts costs by 70-90%. The build vs. buy crossover point is usually somewhere between $5,000 and $30,000/month in vendor fees."
/>

<RevealCard
  id="bb-build-3"
  label="Build when: the AI is your competitive moat"
  reveal="If the AI capability you're building is central to what makes your product or service unique — not just a productivity tool for internal use — ownership matters. You can't build a sustainable competitive advantage on top of vendor features that any competitor can also license. If the AI is the product, it should probably be yours."
/>

---

## The Smart Path Most Companies Take: Buy First, Build Later

Here's what the most successful companies actually do:

1. **Identify a workflow** that might benefit from AI
2. **Buy a vendor tool** to test whether AI actually improves it
3. **Run it for 3-6 months** and measure real results
4. **Once proven, decide**: is the vendor cost justified at scale, or do the economics favor building?
5. **Build a lean custom version** on top of a foundation model API only if volume and ROI justify it

This approach gives you speed-to-value from the vendor and cost efficiency from your own implementation — without risking months of engineering time on something you haven't validated yet.

The businesses that always build end up slow. The ones that always buy end up captive. The smart ones do both — in the right order.

---

## Sort It Out: Buy or Build?

<DragDrop
  id="module13-buy-build-sort"
  instruction="For each scenario, decide whether you should Buy an existing tool or Build your own."
  categories={["Buy", "Build"]}
  items={[
    { id: "s1", text: "You need a chatbot to answer FAQs on your website — same requirement as thousands of other businesses", correctCategory: "Buy" },
    { id: "s2", text: "Your legal firm has proprietary case data and needs AI trained only on your historical case outcomes", correctCategory: "Build" },
    { id: "s3", text: "You want to test if AI summarization saves your team time before committing to it long-term", correctCategory: "Buy" },
    { id: "s4", text: "You're processing 2 million AI requests per month and vendor fees are now $40,000/month", correctCategory: "Build" },
    { id: "s5", text: "You need AI meeting notes — a mature, well-solved commodity problem", correctCategory: "Buy" },
    { id: "s6", text: "Your product's core feature is a recommendation engine built on your unique customer behavior data", correctCategory: "Build" }
  ]}
/>

---

## Quick Check

<Quiz
  id="module13-lesson3-quiz"
  questions={[
    {
      id: "q1",
      text: "A startup wants to add an AI customer service chatbot. They have 2 developers and are focused on getting their core product to market. What's the right approach?",
      options: [
        { id: "a", text: "Build a custom chatbot — it will give them full control" },
        { id: "b", text: "Buy an existing vendor tool — customer service chatbots are a solved problem and their engineering resources are better spent on their core product" },
        { id: "c", text: "Hire ML engineers to train a proprietary model" },
        { id: "d", text: "Skip AI entirely until the product is more mature" }
      ],
      correctId: "b",
      explanation: "Customer service chatbots are a commodity use case. Dozens of mature tools solve it well. Building one from scratch diverts engineering capacity from the core product — where the actual competitive advantage lives. Buy the chatbot, build what makes your product unique."
    },
    {
      id: "q2",
      text: "What's the main benefit of the 'buy first, build later' approach?",
      options: [
        { id: "a", text: "It's always cheaper than building from the start" },
        { id: "b", text: "You validate that AI actually improves the workflow before committing engineering resources to build it" },
        { id: "c", text: "Vendor tools are always better than custom builds" },
        { id: "d", text: "It lets you avoid ever having to make the build decision" }
      ],
      correctId: "b",
      explanation: "The biggest risk in building custom AI is spending months on something that turns out not to work — or not to be worth the cost. Buying a vendor tool first lets you validate the workflow and prove the ROI before you commit engineering resources to building something custom."
    },
    {
      id: "q3",
      text: "At what point does building your own AI start to make economic sense over a vendor tool?",
      options: [
        { id: "a", text: "As soon as you hire your first developer" },
        { id: "b", text: "When vendor monthly fees reach a level where a custom build would pay for itself — typically $5,000 to $30,000/month" },
        { id: "c", text: "The moment you have more than 100 users" },
        { id: "d", text: "Building is always more cost-effective than paying vendors" }
      ],
      correctId: "b",
      explanation: "The build vs. buy economics change as volume grows. At low usage, vendors are almost always cheaper once you factor in engineering and maintenance costs. The crossover point — where building your own becomes more economical — is typically in the range of $5,000 to $30,000/month in vendor fees, depending on your engineering costs."
    }
  ]}
/>

---

## Key Takeaway

> **The question isn't 'can we build it?' — today almost any team can. The question is 'should we?' Buy when the problem is common, speed matters, or you don't have maintenance capacity. Build when your use case is unique, vendor costs are prohibitive at scale, or the AI is your competitive advantage. Start with buy, validate, then decide.**

---

<LessonComplete lessonId="lesson-3" nextLessonSlug="ai-pricing-decoded" xpReward={50} />

---

---

## Lesson 4: AI Pricing Decoded

```
---
id: lesson-4
moduleId: module-13
slug: ai-pricing-decoded
title: "AI Pricing Decoded"
subtitle: "What you see on the pricing page — and what they don't tell you"
estimatedMinutes: 8
xpReward: 50
---
```

# AI Pricing Decoded

AI tool pricing is confusing on purpose. Not always maliciously — the underlying cost structures are genuinely complicated — but the way it gets packaged and presented is designed to make the starting price look as small as possible.

By the end of this lesson, you'll be able to read any AI pricing page and understand what it actually costs to use the tool at real-world scale.

---

## The Three Main Pricing Models

Most AI tools use one of three pricing structures. Once you recognize which one you're dealing with, everything else becomes easier to evaluate.

<RevealCard
  id="price-1"
  label="Per-Seat Pricing"
  reveal="A flat monthly fee per user — for example, $25 per person per month. If you have 10 people using the tool, you pay $250/month. Simple to budget and easy to predict. The downside: you pay for every seat whether people use it or not. This model works well when adoption is consistent across your team. It breaks down when usage is uneven — if 3 people use it daily and 7 barely touch it, you're paying full price for 7 nearly-unused seats."
/>

<RevealCard
  id="price-2"
  label="Per-Use (Consumption) Pricing"
  reveal="You pay per action: per API call, per message sent, per document processed, per minute of audio transcribed. Scales directly with usage — you pay nothing when the tool sits idle. The risk: costs can spike unexpectedly. One heavy batch job, one viral moment, one team member who forgets to set usage limits — and you're looking at a bill 5x what you expected. Always set spending caps and usage alerts before deploying any consumption-priced tool."
/>

<RevealCard
  id="price-3"
  label="Flat Rate ('Unlimited')"
  reveal="One fixed price for unlimited — or very high — usage. Sounds great, and it can be, when your usage is consistently high. The catch: 'unlimited' almost always has conditions in the fine print. Look for fair use policies, soft caps that trigger throttling above a certain volume, or fine print that lets the vendor downgrade model quality for heavy users. Before signing, ask: 'What actually happens if I hit twice the expected usage volume?'"
/>

---

## Hybrid Pricing: The Sneaky Variant

Most enterprise AI tools combine models in ways that are easy to miss:

- **Per-seat base fee** (to access the platform) + **consumption charges** (for actual AI usage)
- **Tiered flat rate** (cheap entry plan with low limits, forced upgrade when you hit the ceiling)
- **Free base + paid add-ons** (the core feature is free, but every useful integration or export is behind a paywall)

The most dangerous variant: **overage charges**. Many flat-rate plans have a soft limit. Cross it, and per-use pricing kicks in — often at a premium rate. Most buyers don't discover this until they get the first bill.

Always ask: "What are the overage terms if I exceed the plan limit?"

---

## The Hidden Costs Nobody Puts on the Pricing Page

The pricing page shows you the subscription fee. It doesn't show you:

| Hidden Cost | What It Actually Costs |
|---|---|
| Setup and configuration time | Hours or weeks of your team's time |
| Integration development | Often requires a developer or a paid connector service |
| Staff training and onboarding | Time is money — factor in learning curves |
| Ongoing prompt maintenance | AI prompts need tuning as your use case evolves |
| Output review and quality control | Human review time if errors are consequential |
| Switching costs if it fails | Migration, re-integration, lost productivity |

A tool that costs $99/month but takes 60 hours to set up and integrate properly has a real first-year cost well above $1,200. Factor these before you calculate ROI.

---

## How to Match the Pricing Model to Your Usage Pattern

The right pricing model depends on how you actually use the tool — not which one sounds cheapest at first glance.

| Your Situation | Best Pricing Match |
|---|---|
| High, consistent usage by many people | Per-seat (predictable, scales with headcount) |
| Occasional, bursty, or variable usage | Flat rate (protects against cost spikes) |
| Low but growing usage | Per-use (pay for what you use, no commitment) |
| Very high volume, cost-sensitive at scale | Negotiate a flat rate or consider build |

The worst match: per-use pricing for high-volume use cases. Small per-unit costs compound fast. If you're processing large volumes regularly, consumption pricing can become more expensive than a flat rate — sometimes by a wide margin.

---

## Evaluate These Scenarios

<Quiz
  id="module13-lesson4-quiz"
  questions={[
    {
      id: "q1",
      text: "A tool charges $0.005 per AI message. Your team sends roughly 2,000 messages per month. What's your monthly cost — and what's the right question to ask before usage grows?",
      options: [
        { id: "a", text: "$10/month now — ask what the per-seat plan costs at your current volume" },
        { id: "b", text: "$10/month now — ask what the per-message cost becomes at 20,000 messages/month" },
        { id: "c", text: "$100/month now — ask whether there's a flat rate option" },
        { id: "d", text: "$1,000/month now — this is already too expensive" }
      ],
      correctId: "b",
      explanation: "At 2,000 messages, you're paying $10/month — manageable. But if adoption grows 10x to 20,000 messages, that's $100/month. At 200,000 messages, it's $1,000/month. Per-use pricing always looks cheap at low volume and gets expensive fast. Always project your costs at 10x usage before committing."
    },
    {
      id: "q2",
      text: "A vendor advertises 'unlimited AI responses for $199/month.' You plan to process about 50,000 messages per month. What should you verify before signing?",
      options: [
        { id: "a", text: "Whether the company has good reviews on G2" },
        { id: "b", text: "Whether there's a fair use policy, soft cap, or throttling above a certain volume — and what the overage charges are" },
        { id: "c", text: "Whether they offer a per-seat alternative" },
        { id: "d", text: "Whether 'unlimited' applies to all features or just the core feature" }
      ],
      correctId: "b",
      explanation: "'Unlimited' almost always has conditions. For a flat rate at $199/month, the math only works for the vendor if most customers don't approach the maximum. Heavy users often get throttled, downgraded to slower models, or charged overages. Find out what actually happens when you push the limits before you depend on the tool."
    },
    {
      id: "q3",
      text: "You're evaluating a $79/month AI tool. Setup requires a developer to build a custom integration (40 hours at your dev's cost), and your team will need 2 weeks to learn it properly. What's the real first-year cost?",
      options: [
        { id: "a", text: "$948 — just the subscription fees for 12 months" },
        { id: "b", text: "$948 plus the full cost of developer time, team training, and any ongoing maintenance — often several times the subscription cost" },
        { id: "c", text: "The subscription plus a one-time $500 setup fee" },
        { id: "d", text: "Less than $1,000 because setup is a one-time cost" }
      ],
      correctId: "b",
      explanation: "The pricing page shows you $79/month. The real cost includes 40 hours of developer time, 2 weeks of reduced productivity during onboarding, ongoing prompt maintenance, and eventual migration costs if the tool doesn't work out. For many AI tools, the true first-year cost is 3-10x the subscription fee — and that math affects your ROI calculation."
    },
    {
      id: "q4",
      text: "Your team's AI usage is variable — some weeks you barely use the tool, some weeks you use it constantly. Which pricing model fits you best?",
      options: [
        { id: "a", text: "Per-seat — it's simple to budget" },
        { id: "b", text: "Per-use — you only pay for what you actually use" },
        { id: "c", text: "Flat rate — it protects you from cost spikes on high-usage weeks" },
        { id: "d", text: "Any pricing model works equally well for variable usage" }
      ],
      correctId: "c",
      explanation: "Variable usage is exactly where flat rate pricing earns its value. Per-use sounds appealing ('pay for what you use'), but high-usage weeks create unpredictable spikes. A flat rate gives you a predictable cost ceiling — you don't pay a premium for the weeks you rely on the tool most."
    }
  ]}
/>

---

## The One-Sentence Framework

Before signing any AI tool contract, run this check:

**"Does the pricing model match my usage pattern — and do I know what it costs at 10x my current volume?"**

If you can answer yes to both, you understand what you're actually buying.

---

## Key Takeaway

> **The pricing page is the starting point, not the full picture. Factor in setup time, integration work, ongoing maintenance, and overage terms before you calculate ROI. Match the pricing model to your usage pattern — per-seat for consistent use, per-use for low or unpredictable use, flat rate for high or variable volume. And always, always ask what 'unlimited' actually means in the fine print.**

---

<ModuleComplete moduleId="module-13" nextModuleSlug="module-14" xpReward={200} />
