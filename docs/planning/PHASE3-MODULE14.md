# MODULE 14: Your First Real AI Project
**Phase 3 — Put It to Work**
**Subtitle:** Stop planning. Start doing. Here's your step-by-step blueprint.

---

## index.json

```json
{
  "id": "module-14",
  "title": "Your First Real AI Project",
  "subtitle": "Stop planning. Start doing. Here's your step-by-step blueprint.",
  "description": "This is it — the capstone. You've spent 13 modules learning what AI is, how it works, where it helps, and where to be careful. Now you're going to take all of that and build something real. In 4 lessons, you'll pick a project, set it up properly, run a two-week pilot, and figure out what comes next. By the end, you'll have done what most people only talk about.",
  "estimatedMinutes": 36,
  "xpReward": 200,
  "badgeId": "ai-builder",
  "lessons": [
    {
      "id": "lesson-1",
      "slug": "choosing-your-project",
      "title": "Choosing Your Project",
      "subtitle": "The right first project isn't the most impressive one — it's the one that actually works",
      "estimatedMinutes": 9,
      "xpReward": 50
    },
    {
      "id": "lesson-2",
      "slug": "setting-up-for-success",
      "title": "Setting Up for Success",
      "subtitle": "Five steps that separate projects that work from projects that stall",
      "estimatedMinutes": 9,
      "xpReward": 50
    },
    {
      "id": "lesson-3",
      "slug": "the-two-week-pilot",
      "title": "The Two-Week Pilot",
      "subtitle": "Launch it, tune it, measure it — here's exactly what to expect",
      "estimatedMinutes": 9,
      "xpReward": 50
    },
    {
      "id": "lesson-4",
      "slug": "whats-next-youve-graduated",
      "title": "What's Next (You've Graduated)",
      "subtitle": "What to do if it worked, what to do if it didn't, and where you go from here",
      "estimatedMinutes": 9,
      "xpReward": 50
    }
  ]
}
```

---

## Lesson 1: Choosing Your Project

**File:** `lesson-1-choosing-your-project.mdx`

```mdx
---
id: lesson-1
moduleId: module-14
slug: choosing-your-project
title: "Choosing Your Project"
subtitle: "The right first project isn't the most impressive one — it's the one that actually works"
estimatedMinutes: 9
xpReward: 50
---

# Choosing Your Project

Here's the most common mistake people make when they decide to run their first real AI project: they pick something impressive instead of something winnable.

They want to automate the whole customer experience, or replace a system that took years to build, or solve a problem nobody's been able to crack. The ambition is real. The results are usually disappointing — not because AI can't do big things, but because big things done badly look worse than nothing at all.

Your first real project should be something different. It should be something that, when it works, makes people go "oh, that actually helps." And when it doesn't work perfectly, the cost is a little wasted time — not a broken process.

That's what this lesson is about.

---

## The Two Criteria That Actually Matter

Every good first project passes two tests. Both matter. Neither one is enough on its own.

**Test 1: Low Risk**

Low risk means: if the AI gets it wrong, nobody gets hurt. No customer gets the wrong information. No critical process breaks. No one's job is on the line because of a mistake. The worst case is a minor inconvenience, not a crisis.

This doesn't mean picking something pointless. It means picking something where the failure mode is manageable. You review the output before it goes anywhere. You have a backup. A human catches the error before it causes damage.

**Test 2: High Visibility**

High visibility means: when the project works, people notice. Not because you announce it, but because the result is obvious. Time gets saved. A task that used to be annoying becomes easy. Something that took hours now takes minutes.

If your project works and nobody notices — including you — it wasn't the right project. You want something where success is self-evident. That feedback is what keeps you motivated to build the next one.

---

## The Use Case Filter

Before committing to a project, run it through these four questions. You want four "yes" answers. If you're getting "no" or "I'm not sure," keep looking.

**Question 1: What happens if AI makes a mistake?**
Can a human catch it before it causes a problem? Is there a review step? If a mistake goes unnoticed, does it cause serious harm? If yes — pick something else. If the answer is "someone reviews it" or "it's annoying but fixable" — you're in good shape.

**Question 2: Can you measure the current state?**
How long does this take right now? How many errors happen? How many questions come in? You need a baseline — something to compare against when the project is done. If you have no idea how things work today, you won't be able to tell if AI improved them.

**Question 3: Is someone doing this repetitively?**
The best AI use cases involve tasks that happen over and over. The same type of email drafted ten times a week. The same questions answered every day. The same data pulled from the same place. Repetition is where AI pays off. One-time tasks, not so much.

**Question 4: Will a win be noticed?**
Not "will you write a report about it" — will the improvement be felt? Will the person doing the task say "this is so much easier"? Will customers respond faster? Will errors drop visibly? If yes, you've got a project worth doing.

---

## Best First Projects

These aren't random suggestions. These are the use cases that consistently work well for first-time AI projects — because they're low-risk, repetitive, and produce visible results fast.

<RevealCard
  id="best-faq-chatbot"
  label="FAQ Chatbot"
  reveal="If your business, team, or organization answers the same questions over and over — 'what are your hours?', 'how do I reset my password?', 'what's your return policy?' — a simple FAQ chatbot handles those without anyone lifting a finger. Low risk (the answers are already written), high visibility (customers get instant answers instead of waiting), measurable (track how many questions get resolved without human help). This is one of the most reliable first projects out there."
/>

<RevealCard
  id="best-email-drafting"
  label="Email Drafting Assistance"
  reveal="A person or team that writes a lot of similar emails — follow-ups, responses to inquiries, outreach messages — uses AI to generate first drafts. A human reviews and sends. The win: drafts that used to take 20 minutes now take 5. The risk: low, because nothing goes out without human eyes. The visibility: whoever is doing the drafting will feel it immediately. This one almost always works."
/>

<RevealCard
  id="best-appointment-reminders"
  label="Appointment Reminders"
  reveal="For any service business that books appointments, AI-powered reminder messages reduce no-shows without staff having to make calls or send individual texts. This is mostly automation with a smart layer on top — personalizing the message based on appointment type or customer history. Low risk (the worst case is someone gets a slightly odd-sounding reminder), measurable (track no-show rate before and after), and the win is obvious in the numbers."
/>

<RevealCard
  id="best-lead-intake"
  label="Lead Intake and Qualification"
  reveal="When someone fills out a contact form or starts a chat, AI can gather basic information — what they need, their timeline, their budget range — before a human ever gets involved. The human gets a pre-qualified lead with context instead of a cold name and email. Risk is low because no commitments are made without a person involved. The visibility is high — sales teams feel the difference when they're spending time on real conversations instead of intake."
/>

<RevealCard
  id="best-meeting-summaries"
  label="Meeting Summaries"
  reveal="Record a meeting, run the transcript through AI, get a clean summary with the key decisions and action items. For teams that spend a lot of time in meetings, this is immediately useful. Low risk (the summary is a supplement, not a replacement for the actual meeting notes), high visibility (the people who used to write the summary will love you), and extremely fast to implement."
/>

---

## Worst First Projects

Just as important as knowing what to pick is knowing what to avoid.

**Replacing a critical process entirely.** If something is load-bearing — if the whole operation depends on it being right every time — do not make that your first AI project. Augment it later, after you've built trust. Not now.

**Solving problems nobody has.** If you can't name three specific people who would benefit from this project, it's probably not a real problem. AI for the sake of AI is a great way to spend a month building something nobody uses.

**Complex multi-system integrations.** Any project that requires three different platforms to talk to each other, two API integrations, and a custom database before it does anything useful — that's project number five, not project number one. First projects should require minimal technical setup.

---

## Your Project in One Sentence

Here's the template. Fill it in before moving to the next lesson.

> **I am going to use AI to [do what] so that [who] can [get what benefit], and I'll know it worked when [what measurable thing happens].**

For example:
- "I am going to use AI to draft first-pass responses to customer inquiries so that our support team can respond in under an hour instead of a half-day, and I'll know it worked when our average response time drops below 60 minutes."
- "I am going to use AI to summarize our weekly team meetings so that everyone leaves with clear action items, and I'll know it worked when we stop having the same conversations twice."
- "I am going to use AI to answer common questions on our website so that visitors get instant answers, and I'll know it worked when our support inbox volume drops."

Write yours down. If you can't complete the sentence, your project isn't defined enough yet. Keep refining it until you can.

---

## Quick Check

<Quiz
  id="lesson-1-quiz"
  questions={[
    {
      id: "q1",
      text: "Which of the following best describes a 'low-risk' AI project?",
      options: [
        { id: "a", text: "The project uses the most advanced AI model available" },
        { id: "b", text: "A human reviews AI output before it goes anywhere that could cause harm" },
        { id: "c", text: "The project has a large potential upside" },
        { id: "d", text: "The project is simple enough that AI will definitely get it right" }
      ],
      correctId: "b",
      explanation: "Low risk isn't about the AI being perfect — it never is, especially at first. Low risk means the system is designed so that errors get caught before they cause damage. A human review layer is the most reliable way to achieve that. Don't count on AI being right every time. Design for when it isn't."
    },
    {
      id: "q2",
      text: "You want to launch an AI project but you can't describe what the current process looks like or how long it takes. What's the problem?",
      options: [
        { id: "a", text: "You need a more complex AI system to handle the uncertainty" },
        { id: "b", text: "You have no baseline, so you won't be able to tell whether the project actually helped" },
        { id: "c", text: "The project is probably too simple for AI" },
        { id: "d", text: "You should skip the measurement phase and just launch" }
      ],
      correctId: "b",
      explanation: "Without a baseline, you're flying blind. If you don't know how long something takes today, you won't know whether AI made it faster. If you don't know how many errors happen today, you won't know whether AI reduced them. Measure first, then launch."
    },
    {
      id: "q3",
      text: "Someone proposes connecting five different software platforms together using AI to fully automate a process that's currently done manually. This is their first AI project. What's the concern?",
      options: [
        { id: "a", text: "Five platforms is too many for AI to handle" },
        { id: "b", text: "Automation projects should never use AI" },
        { id: "c", text: "Multi-system integrations are complex — technical setup alone can stall a first project before it ever runs" },
        { id: "d", text: "The project sounds fine — ambition is good" }
      ],
      correctId: "c",
      explanation: "The complexity is the problem. First projects should require minimal setup so you can get to the actual learning — does AI do this well? — quickly. A project that spends its first four weeks on integration and configuration might never actually tell you whether the AI part works. Save the complex integrations for when you've built the muscle."
    },
    {
      id: "q4",
      text: "You fill in the 'project in one sentence' template and realize you can't define what 'it worked' looks like. What does that tell you?",
      options: [
        { id: "a", text: "Your project is too advanced to measure" },
        { id: "b", text: "Your project isn't defined clearly enough yet — you need a measurable success condition before you start" },
        { id: "c", text: "Measurement is optional for first projects" },
        { id: "d", text: "You should move to the next lesson and figure it out later" }
      ],
      correctId: "b",
      explanation: "If you can't define success, you can't evaluate whether you got there — and you can't make a good decision about what to do next. 'It worked' needs to be something you can point to: a number, a behavior change, a visible result. If that's fuzzy, sharpen the project definition before you build anything."
    }
  ]}
/>

---

## Key Takeaway

> **The best first project isn't the most impressive one — it's the one that passes the low-risk, high-visibility test. Pick something real, something repetitive, and something where you can measure both where you started and where you end up. Define success before you start. Then move to the next lesson.**

---

<LessonComplete lessonId="lesson-1" nextLessonSlug="setting-up-for-success" xpReward={50} />
```

---

## Lesson 2: Setting Up for Success

**File:** `lesson-2-setting-up-for-success.mdx`

```mdx
---
id: lesson-2
moduleId: module-14
slug: setting-up-for-success
title: "Setting Up for Success"
subtitle: "Five steps that separate projects that work from projects that stall"
estimatedMinutes: 9
xpReward: 50
---

# Setting Up for Success

Most AI projects don't fail because the AI is bad. They fail because the setup is vague.

Someone decides to "use AI for customer service." They pick a tool, plug it in, and watch it produce answers that are sort of right, sometimes, in ways that are hard to evaluate. Three weeks later they're not sure if it's helping. A month after that, they quietly stop using it.

The problem wasn't the AI. It was that nobody defined what the AI was supposed to do, who would check its work, or what a win would look like. This lesson gives you the five steps that fix that — before you launch.

---

## Step 1: Define What the AI Will Do AND What It Won't Do

This is the scope boundary, and it might be the most important step of all.

"AI handles customer questions" is not a scope boundary. It's an invitation for trouble. Which questions? All of them? What if someone asks for a refund? What if they're upset? What if they ask something the AI doesn't have a good answer for?

A real scope boundary sounds like this:

> "The AI will answer questions about hours, location, services, and pricing. It will NOT handle complaints, billing disputes, appointment changes, or anything requiring access to a customer's account. When a question falls outside that list, it will say: 'That's a great question for our team — let me connect you with someone who can help.'"

That boundary does several things at once. It tells the AI what to handle. It tells you what to monitor. And it makes sure that the moments requiring human judgment actually get a human.

Write your scope boundary before you do anything else. Two columns: **What AI Does** and **What AI Does Not Do.** If you can't fill in the second column, your first column is too broad.

---

## Step 2: Measure the Baseline

You need to know where you're starting. No exceptions.

Before you launch anything, spend a few days measuring the current state of the process you're improving. You don't need a spreadsheet and a statistics degree. You need honest numbers.

- How long does this task take right now? (In minutes, per instance)
- How often does it happen? (Per day, per week)
- What's the current error or redo rate? (How often does someone have to fix it?)
- How satisfied are the people affected? (If you can get that feedback — even informally)

Write these numbers down. They're your before picture. When the project is over, you'll compare against them and that comparison will tell you whether any of this was worth doing.

If you skip the baseline, you'll have feelings about whether it worked but no data. Feelings are easy to argue with. Numbers aren't.

---

## Step 3: Write the Prompt

This is where most people either do something great or make a mess.

A vague prompt produces vague results. "Answer customer questions helpfully" is not a prompt — it's a suggestion. An AI reading that has almost no idea how you want it to behave.

A good prompt for a real project includes:

- **The role.** "You are a customer service assistant for [Business Name], a [brief description of what the business does]."
- **The goal.** "Your job is to answer common questions from customers clearly and accurately."
- **The rules.** "Always be friendly but professional. Never guess at information you don't have — say 'I don't have that information, but our team can help' instead. Never make commitments about pricing, availability, or policies without confirmation."
- **The knowledge.** Paste in the actual information the AI needs: your FAQ, your pricing, your hours, your policies.
- **The out.** "If a question is outside your scope, say: [exact phrase you want it to use to hand off to a human]."

Here's a template you can fill in:

> **You are [role description] for [business/team/organization name].**
>
> **Your job is to [specific goal].**
>
> **Always:** [list 2-3 behaviors you always want]
>
> **Never:** [list 2-3 behaviors you never want]
>
> **When you don't know something or the question is outside your scope, say exactly:** "[your handoff phrase]"
>
> **Here is the information you have access to:**
> [paste your actual content here]

Test your prompt before you go live. Ask it easy questions. Ask it hard questions. Ask it questions it shouldn't answer. See how it behaves. Adjust. Test again. You should do this five to ten times before anyone else sees it.

---

## Step 4: Set Up the Review Layer

Before anything AI-generated reaches a customer, a client, or the public, a human should see it. At least at first.

This is your review layer. It's not permanent — once you've seen that the AI performs reliably over hundreds of outputs, you can decide how much oversight to maintain. But in the beginning, you need it.

Define it clearly:
- **Who reviews?** Name a specific person or role, not "someone will."
- **What gets reviewed?** Every output? A random sample? Anything flagged as uncertain by the AI?
- **What's the review checklist?** Is the answer accurate? Is the tone right? Does it stay within scope? Is there anything in here that could cause a problem?

A review layer that isn't defined in advance is a review layer that gets skipped when things get busy. Write it down. Make it someone's job. Put it on the calendar.

---

## Step 5: Define Success

You did this in Lesson 1 — but now it's time to make it more specific.

"It worked" is not a success definition. Here's what a real success definition looks like:

> "After two weeks, average response time is below 45 minutes (down from 3 hours). The AI handles at least 60% of incoming questions without escalation. The error rate — defined as responses that required correction before going out — is below 10%."

Three elements: a **target number**, a **timeframe**, and a **measurement method**.

Write yours down. Share it with anyone who's involved. This is the definition you'll use in Lesson 3 to evaluate the pilot.

---

## The Communication Plan

If this project affects other people — your team, your customers, your coworkers — they deserve a heads-up before you launch.

You don't need a formal presentation. You need a clear, honest sentence or two:

> "Starting next week, we're going to test an AI assistant to handle our most common customer questions. [Name] will review all responses before they go out. If you see anything odd, let [Name] know — that feedback is exactly what we need."

That's it. Tell people what's changing, tell them who's watching it, and tell them how to flag problems. The people most likely to torpedo a new AI project are the ones who feel blindsided by it.

---

## Your Setup Checklist

Before you move to Lesson 3, you should have all five of these:

- [ ] Scope boundary written (what AI does AND what it doesn't)
- [ ] Baseline numbers recorded (current time, frequency, error rate)
- [ ] Prompt written, tested at least five times, adjusted
- [ ] Review layer defined (who, what, how often)
- [ ] Success definition written with target numbers and timeframe

If any of these are missing, go back and fill them in. The two-week pilot only works if the setup is solid.

---

## Quick Check

<Quiz
  id="lesson-2-quiz"
  questions={[
    {
      id: "q1",
      text: "You're setting up an AI to handle customer questions. Your scope boundary says 'AI answers all customer questions.' What's the problem?",
      options: [
        { id: "a", text: "The scope is too narrow — AI should do more" },
        { id: "b", text: "There's no second column — you haven't defined what the AI won't handle, which means it has no clear guardrails" },
        { id: "c", text: "The scope is fine — AI can handle anything with the right prompt" },
        { id: "d", text: "The problem is that customers might not trust AI" }
      ],
      correctId: "b",
      explanation: "A scope boundary without a 'won't do' list is incomplete. Every AI will eventually encounter something it shouldn't handle — a complaint, a billing dispute, a request for a refund. If you haven't defined the boundary, the AI will attempt to handle things it shouldn't, and you won't have a clear way to catch those cases. Always define both columns."
    },
    {
      id: "q2",
      text: "Why is measuring the baseline before launching the project so important?",
      options: [
        { id: "a", text: "It gives you something to show your manager" },
        { id: "b", text: "Without a before picture, you can't evaluate whether the project actually improved anything" },
        { id: "c", text: "Regulators often require baseline measurements" },
        { id: "d", text: "It's not important — AI results are obvious enough without measurement" }
      ],
      correctId: "b",
      explanation: "The baseline is your only honest way to answer 'did this help?' Without it, you're comparing to a memory — 'I think it used to take longer' — which is easy to distort in either direction. Numbers from before the project started are the only thing that lets you make a real comparison."
    },
    {
      id: "q3",
      text: "What's missing from this prompt: 'You are a helpful assistant. Answer customer questions.'",
      options: [
        { id: "a", text: "Nothing — simple prompts usually work better" },
        { id: "b", text: "The role, rules, actual knowledge, and an out for questions that are out of scope" },
        { id: "c", text: "It needs to be longer to work properly" },
        { id: "d", text: "It should specify the AI model being used" }
      ],
      correctId: "b",
      explanation: "That prompt tells the AI almost nothing useful. What business is this for? What questions is it supposed to answer? What should it never do? What information does it actually have? What should it say when it doesn't know? A prompt for a real project needs all of those things — not because AI is picky, but because the more specific the instructions, the more predictable and useful the output."
    },
    {
      id: "q4",
      text: "Your review layer plan says 'someone will check AI responses before they go out.' What's the problem?",
      options: [
        { id: "a", text: "Review layers slow things down too much to be useful" },
        { id: "b", text: "'Someone' is not a person — without a named individual and a defined process, reviews get skipped when things get busy" },
        { id: "c", text: "The AI should be trusted enough to not need review" },
        { id: "d", text: "There's no problem — that's a reasonable plan" }
      ],
      correctId: "b",
      explanation: "Vague ownership is no ownership. When the review layer is 'someone will do it,' what actually happens is: nobody feels specifically responsible, and when the workload goes up, reviews get skipped. Name the person. Define what they check. Schedule it. That's the only version that actually happens consistently."
    }
  ]}
/>

---

## Key Takeaway

> **Good setup is the difference between a project that teaches you something and one that just wastes two weeks. Define the scope, measure where you're starting, write a real prompt, build a review layer, and know what winning looks like before you launch. Do all five. Then you're ready.**

---

<LessonComplete lessonId="lesson-2" nextLessonSlug="the-two-week-pilot" xpReward={50} />
```

---

## Lesson 3: The Two-Week Pilot

**File:** `lesson-3-the-two-week-pilot.mdx`

```mdx
---
id: lesson-3
moduleId: module-14
slug: the-two-week-pilot
title: "The Two-Week Pilot"
subtitle: "Launch it, tune it, measure it — here's exactly what to expect"
estimatedMinutes: 9
xpReward: 50
---

# The Two-Week Pilot

You've picked your project. You've done the setup. Now comes the part that most guides skip: what actually happens when you flip the switch.

Real pilots are messy. The prompt that seemed great in testing suddenly struggles with edge cases you didn't think about. People who were enthusiastic in the planning phase are skeptical when the AI produces its first awkward answer. Numbers that looked easy to hit feel more complicated once you're in the middle of things.

This is completely normal. It doesn't mean the project is failing. It means you're running a real pilot instead of a demo.

Here's exactly what to expect over two weeks — and what to do about it.

---

## Week 1: Launch, Expect Bumps, Tune the Prompt

**Day 1-2: The launch.**

Put the project into motion. Make sure your review layer is running. Start logging what the AI is producing. Don't touch anything yet — just watch.

**Day 3-4: The first issues.**

Something will go wrong. Something always goes wrong in the first few days. Here are the three most common problems — and the fix for each.

<RevealCard
  id="issue-vague-prompt"
  label="Issue: The prompt is too vague"
  reveal="Symptoms: AI gives answers that are technically correct but oddly worded, too long, too short, or slightly off in tone. The outputs feel inconsistent — great one time, weird the next. Fix: Add specificity. If tone is wrong, add a tone instruction ('Write like a friendly but professional customer service rep, not a formal document'). If length is wrong, add a length instruction ('Keep answers to 2-3 sentences unless more detail is clearly needed'). If it's handling the wrong things, tighten the scope instructions. One adjustment at a time — change too much at once and you won't know what fixed it."
/>

<RevealCard
  id="issue-edge-cases"
  label="Issue: AI handles edge cases poorly"
  reveal="Symptoms: The AI does fine with common questions but stumbles when something slightly unusual comes in — a question it's never seen, a situation that's almost in scope but not quite, a customer who's frustrated instead of just curious. Fix: Update the prompt with specific instructions for those edge cases. 'If a customer sounds upset or frustrated, acknowledge their frustration before answering, and always offer to connect them with the team.' You can also add these cases to your knowledge section as examples: 'If someone asks [specific edge case], respond with [specific guidance].' Edge cases are actually gifts — they tell you exactly where the prompt needs work."
/>

<RevealCard
  id="issue-trust"
  label="Issue: People aren't trusting the AI yet"
  reveal="Symptoms: The person doing the review is editing almost every response, sometimes rewriting them from scratch. Or team members are skeptical and adding friction to the process. Fix: First, check whether the skepticism is warranted — are the outputs actually poor, or are they just different from what a human would write? Different isn't the same as wrong. If outputs are genuinely poor, tune the prompt. If they're just stylistically different, have a conversation: 'Let's give it two weeks before we decide it's not working. Here's what we're looking for.' Trust in AI output builds through repeated exposure — the first hundred responses feel scary, the five hundredth feel routine."
/>

**Day 5-7: Collect feedback.**

At the end of Week 1, gather feedback from anyone involved. Not a formal survey — just three questions:

1. What's working well?
2. What feels off?
3. Is there a type of input the AI consistently struggles with?

Log the answers. Use them to make one or two prompt adjustments before Week 2.

---

## Week 2: Stabilize, Measure, Compare

**Day 8-10: Stabilize.**

If you did your tuning in Week 1, Week 2 should feel smoother. Resist the urge to keep adjusting. Let the revised prompt run for a few days without interference. You need stable data to compare against your baseline.

This is also when you start seeing the actual pattern. Day 3 was a bad day — maybe the AI had a rough batch of unusual inputs. Day 9 is more representative. The pattern of Week 2 is usually closer to what this project will look like long-term.

**Day 11-12: Measure.**

Pull your numbers. Compare them against the baseline you recorded in Lesson 2.

- **Time.** Is the task taking less time now? How much less?
- **Volume.** Is the AI handling the volume you expected? What percentage of inputs is it handling without escalation?
- **Error rate.** How often is the review layer catching something that needed to be fixed? What's that percentage?
- **People.** Are the people affected — your team, your customers — reporting a better experience?

Write these numbers down next to your baseline numbers. The comparison is the story.

**Day 13-14: Evaluate.**

You have two weeks of data. Now you make a decision.

---

## The Green/Yellow/Red Framework

Use this framework to evaluate your pilot honestly.

**Green — Keep going and expand.**

- Time saved is significant (at least 25-30% reduction)
- Error rate is below 10%
- The review layer is catching errors but not overwhelmed by them
- People affected by the project report neutral-to-positive experience
- You can see a clear path to reducing oversight over time

If you're green: document everything, pick what to improve, and plan the next phase. This one worked.

**Yellow — Promising, needs adjustment.**

- Time saved is modest (10-25% reduction)
- Error rate is between 10-30%
- Some edge cases are still causing problems but you have a theory about how to fix them
- People affected are uncertain but not opposed

If you're yellow: don't scrap the project. Make the adjustments you've identified, run another two weeks, and re-evaluate. Yellow projects often become green with one or two targeted prompt improvements. The data is telling you where to look.

**Red — Stop, reassess, try something different.**

- Error rate is above 30% and not improving despite prompt changes
- Time saved is negative — the review layer is adding more work than the AI is saving
- People affected are actively frustrated and the AI is making their day harder, not easier
- The use case turned out to be more complex or higher-stakes than you thought

If you're red: stop the pilot. This is not failure — this is information. Red results tell you that either this specific use case isn't the right fit for AI, the implementation needs a fundamentally different approach, or this is a project for later when you have more experience. Take what you learned, give yourself credit for running the experiment, and pick a different project.

---

## When to Call It Early

You don't have to wait two full weeks if the data is clear.

**Call it early (stop) if:**
- The error rate is above 50% in Week 1 with no improvement despite prompt changes
- The AI is producing outputs that are actively harmful or deeply misleading, not just imperfect
- The review layer is collapsing — the person reviewing is spending more time fixing AI outputs than they would have spent just doing the task

**Keep going despite bumps if:**
- The first two or three days are rocky but specific problems are identifiable and fixable
- The error rate is declining (even if it's still high) — a decline means the tuning is working
- People are frustrated but their frustration is about novelty, not about actual problems with the outputs

The first few days of almost any AI pilot are rough. That's not a red flag — it's a normal part of running something new. The question isn't "is it perfect?" It's "is it getting better, and is it getting better fast enough?"

---

## Your Pilot Tracker

Keep a simple log for the two weeks. You don't need software. A notes app works fine.

**Daily:**
- Date
- Volume (how many inputs did the AI handle?)
- Flags (how many outputs needed correction?)
- Notes (anything notable — a new edge case, a great output, a problem you spotted)

**Weekly:**
- Total volume
- Error rate (flags / total volume)
- Time saved (estimated)
- One thing that worked
- One thing to improve

At the end of Week 2, you'll have everything you need to make the green/yellow/red call with confidence.

---

## Quick Check

<Quiz
  id="lesson-3-quiz"
  questions={[
    {
      id: "q1",
      text: "Day 3 of your pilot and the AI is producing inconsistent outputs — some great, some oddly worded. What's the most likely cause and fix?",
      options: [
        { id: "a", text: "The AI model is broken — switch to a different one" },
        { id: "b", text: "The prompt is too vague — add specific instructions for tone, length, and scope" },
        { id: "c", text: "Inconsistency is normal and can't be fixed" },
        { id: "d", text: "Stop the pilot — this isn't going to work" }
      ],
      correctId: "b",
      explanation: "Inconsistency in early outputs almost always traces back to vague instructions. The AI is filling in the gaps with its best guesses, and those guesses vary. The fix is to make the prompt more specific — add instructions for the things that keep varying. Do it one adjustment at a time so you can see what's actually working."
    },
    {
      id: "q2",
      text: "After two weeks, your error rate is 12% and time saved is 20%. The review layer is working but busy. What's your call?",
      options: [
        { id: "a", text: "Red — stop the project, 12% error rate is too high" },
        { id: "b", text: "Green — this is a clear success, expand immediately" },
        { id: "c", text: "Yellow — promising results, make targeted adjustments and run another two weeks" },
        { id: "d", text: "There's not enough information to make a call" }
      ],
      correctId: "c",
      explanation: "12% error rate and 20% time saved lands firmly in yellow. It's working — you're saving real time and the errors are being caught. But there's room to improve: bring the error rate under 10% and push the time savings higher. Make the adjustments you've identified from two weeks of data, run another cycle, and re-evaluate. Yellow isn't a verdict — it's a direction."
    },
    {
      id: "q3",
      text: "Your team member is rewriting almost every AI output during the review step. Before changing anything, what's the first question to ask?",
      options: [
        { id: "a", text: "Is the AI model outdated?" },
        { id: "b", text: "Are the outputs actually wrong, or are they just written differently than a human would write them?" },
        { id: "c", text: "Should you remove the review layer to speed things up?" },
        { id: "d", text: "Is the team member working too hard?" }
      ],
      correctId: "b",
      explanation: "Different isn't the same as wrong. When humans review AI output, there's a natural tendency to rewrite anything that doesn't sound exactly like them — even when the AI's version would have served the customer just as well. Before deciding the AI is failing, figure out whether the corrections are fixing actual errors or just stylistic preferences. If it's the latter, that's a conversation to have, not a prompt problem to fix."
    },
    {
      id: "q4",
      text: "Week 1 is rough, but the error rate dropped from 45% on day one to 22% by day five. What does that trend tell you?",
      options: [
        { id: "a", text: "The project should be stopped — 22% is still too high" },
        { id: "b", text: "The tuning is working — declining error rates suggest the adjustments are having the right effect" },
        { id: "c", text: "The improvement is probably random and won't continue" },
        { id: "d", text: "You should expand the project immediately" }
      ],
      correctId: "b",
      explanation: "A declining error rate is a strong positive signal. It means the adjustments you're making are landing. Going from 45% to 22% in five days is significant progress. Keep tuning, keep watching the trend, and see where it stabilizes. A declining curve in Week 1 often points toward a solid green outcome by the end of Week 2."
    }
  ]}
/>

---

## Key Takeaway

> **The two-week pilot is where you find out what's true — not what you hoped. Week 1 is for launching and tuning. Week 2 is for stabilizing and measuring. At the end, you have real data, a green/yellow/red call, and a clear answer about what comes next. That's worth more than any amount of planning.**

---

<LessonComplete lessonId="lesson-3" nextLessonSlug="whats-next-youve-graduated" xpReward={50} />
```

---

## Lesson 4: What's Next (You've Graduated)

**File:** `lesson-4-whats-next-youve-graduated.mdx`

```mdx
---
id: lesson-4
moduleId: module-14
slug: whats-next-youve-graduated
title: "What's Next (You've Graduated)"
subtitle: "What to do if it worked, what to do if it didn't, and where you go from here"
estimatedMinutes: 9
xpReward: 50
---

# What's Next (You've Graduated)

Stop for a second and look at where you started.

You opened this course not knowing much about AI beyond the headlines. Maybe you were curious. Maybe you were nervous. Maybe someone told you that you needed to understand this or get left behind.

Now you've done something most people haven't: you didn't just read about AI, you built something with it. You picked a real use case, set it up properly, ran a pilot, and evaluated the results. That combination — understanding plus execution — is rarer than you'd think.

Before we talk about what comes next, let's talk about what you do with the results you got.

---

## If Your Project Worked

First: document it. Before you move on to the next thing, write down what you did. Not a formal report — just a page of notes.

- What the project was (one sentence)
- What problem it solved
- The baseline numbers before
- The results numbers after
- What the prompt looked like (final version)
- What surprised you
- What you'd do differently next time

This document is worth more than you think. When you run your next project, it's a reference. When someone asks you "how did you get that working?", it's your answer. When you're three projects deep and you can't remember why you made a particular decision, it's your memory.

**Next: pick the next project.**

Don't try to do five things at once. Pick one adjacent use case — something close to what you just built, or the next item on the list from Lesson 1. Run the same setup process. Apply what you learned.

Every project you run gets faster and easier. The first one took real effort. The second one will take less. By the fifth, you'll have internalized the process and you'll be doing it almost automatically.

**Don't expand too fast.**

It's tempting, when something works, to immediately scale it up — add more use cases, remove the review layer, hand it off to someone else without full documentation. Resist that. Let a project stabilize before you expand it. Let the review layer keep running until you've seen enough outputs to trust the behavior. Move deliberately.

---

## If Your Project Didn't Work

Good.

Not because failure is fun, but because a clear result — even a red one — is enormously useful. You learned things that people who never launch anything don't learn.

Here's how to think about it:

**A red result means the approach didn't work, not that AI doesn't work for this type of task.**

Maybe the use case was higher-stakes than it looked and the error rate was always going to be unacceptable. That tells you to build in a stronger human layer next time — or to try a simpler version of the task first. Maybe the prompt was never going to get good enough because the underlying process is too complex and variable. That tells you the right path is to simplify the process before automating it. Maybe the people affected weren't ready for it. That tells you to spend more time on the communication and trust-building side before the next attempt.

Whatever the specific lesson — write it down. It's real knowledge.

**Then adjust the approach and try again.**

Different use case. Simpler scope. Better baseline. Stronger prompt. More review. More time on stakeholder communication. Apply one or two of the lessons and run another pilot. The second attempt, armed with what you now know, will go better.

---

## The Compounding Effect

Here's something that's hard to see from inside your first project but becomes obvious from inside your fifth: this stuff compounds.

The first project is hard because everything is new. You don't know how to scope. You haven't learned to write prompts efficiently. You're not sure what a review layer looks like. You don't know what success metrics to use. So you figure it all out while you're also trying to build something.

The second project is easier because one of those things is already solved. The third is easier still. By the time you're running your fifth or sixth project, you have intuitions — about where AI will struggle, about what scope boundaries to set, about how to write prompts that produce consistent output the first time — that you didn't have before. Those intuitions are worth more than any course.

That's the compounding effect. Every project makes the next one cheaper to run, faster to set up, and more likely to work. The curve is steep at the start and flattens into something that feels almost automatic.

You are at the steep part of the curve right now. That's actually where all the learning happens.

---

## A Look Back at All 14 Modules

Let's take a moment to trace the full journey.

You started in **Phase 1: Understand the Landscape** — getting clear on what AI actually is, stripping away the hype, and understanding why so many people get this wrong in both directions.

In **Module 1**, you learned what AI is and what it isn't. It predicts patterns. It doesn't think. It doesn't know. That single insight is worth revisiting every time you see a breathless headline.

In **Module 2**, you saw what AI can and can't do — the real edges of the capability, not the marketing version.

In **Module 3**, you learned about the tools available to you and how to tell the good ones from the ones that will waste your time and money.

In **Module 4**, you got the risks — the things that bite people who skip past the nuance. Privacy, accuracy, dependence, manipulation.

In **Module 5**, you learned how to have a real conversation with AI — how to give it context, ask follow-up questions, and push back when the output isn't right.

Then in **Phase 2: Build Your Skills**, you went deeper.

**Modules 6 through 9** took you through the practical side: working with AI-generated content, using AI for research and analysis, writing and communication, and creative work. You learned what "good output" actually looks like and how to prompt for it.

**Modules 10 through 13** brought in the professional dimension: AI in the workplace, AI for decision-making, AI ethics, and building a personal AI practice that fits your actual life.

And now you're here — **Module 14**. Where all of it becomes a real thing you built.

That's the arc. Understanding → Skills → Execution. You've done all three.

---

## Three Paths Forward

Where you go from here depends on what you want. All three paths are legitimate. None of them is better than the others.

<RevealCard
  id="path-personal-optimizer"
  label="The Personal Optimizer"
  reveal="You use what you've learned to make your own life and work easier. You've got a handful of AI-assisted workflows — drafting, summarizing, researching, planning — that you reach for naturally when they save you time. You'll occasionally try a new tool or experiment with a new use case when something looks promising. You're not trying to build anything for anyone else — you're just using a powerful set of tools well. This is a completely valid place to land. A lot of the most effective AI users in the world are quiet about it."
/>

<RevealCard
  id="path-business-builder"
  label="The Business Builder"
  reveal="You want to keep building. You've gotten a taste of what it feels like to take a real problem and solve it with AI — and you want more of that. You'll keep running projects, expanding scope gradually, and accumulating the kind of hands-on experience that turns into genuine expertise. This path requires patience (first projects are always humbling) and tolerance for iteration (few projects work perfectly the first time). The ceiling is high. The people who get there are the ones who treat every project — successful or not — as input."
/>

<RevealCard
  id="path-ai-advocate"
  label="The AI Advocate"
  reveal="You want to help other people get here. Maybe it's your workplace, your community, your family. You've seen what it looks like to understand AI versus react to it, and you want to be the person who helps others make that shift. You don't need to be a technical expert to do this — you need to be able to explain what AI actually is, what it's actually good at, what the real risks are, and how to start small. You know all of those things now. Being an effective advocate isn't about knowing everything — it's about having the right frame."
/>

---

## How to Stay Current Without Burning Out

AI changes fast. New tools, new capabilities, new controversies — there's always something. You do not have to follow all of it.

Here's the minimum viable approach to staying current:

**Pick one newsletter.** Something that covers practical AI use rather than hype. Read it when you have time. Skip it when you don't. One is enough.

**Follow one person.** Find someone who thinks clearly about AI and writes in plain language. Not a hype machine, not a doom-sayer — someone who's actually doing things with AI and explaining what they're learning. That's your signal filter.

**Trust your experience.** You have something most people reading AI headlines don't have: direct experience. You've run a real project. You've seen what AI actually does — not what the press release says it does. When something gets announced and everyone reacts, you can evaluate the claim with real context. That's not a small thing. Use it.

---

## Final Quiz: The Full 14-Module Recap

<Quiz
  id="lesson-4-quiz"
  questions={[
    {
      id: "q1",
      text: "AI gives you a confident, well-sourced-sounding answer. Based on what you learned early in this course, what's the right response?",
      options: [
        { id: "a", text: "Trust it — confidence and detail mean accuracy" },
        { id: "b", text: "Reject it — AI is too unreliable to use for anything important" },
        { id: "c", text: "Verify it — AI can sound completely confident while being factually wrong" },
        { id: "d", text: "Ask it to repeat the answer to make sure it's consistent" }
      ],
      correctId: "c",
      explanation: "One of the first lessons in this course: AI generates text by predicting what comes next — it doesn't 'know' things the way you know things. Confidence is a stylistic output, not a signal of accuracy. For anything that matters, verify AI output against another source before acting on it."
    },
    {
      id: "q2",
      text: "A company's software is labeled 'AI-powered.' Based on what you learned, what's the first question you should ask?",
      options: [
        { id: "a", text: "How much does it cost?" },
        { id: "b", text: "Is this actually machine learning, or is it rule-based automation with an AI label?" },
        { id: "c", text: "Which AI company is powering it?" },
        { id: "d", text: "How long has this software been on the market?" }
      ],
      correctId: "b",
      explanation: "'AI-powered' is one of the most overused phrases in software marketing. Many tools that claim to use AI are actually well-designed automation — rule-based logic, not machine learning. That's not necessarily bad, but you want to know what you're actually buying. Ask what the AI does, how it learns, and what happens when it gets something wrong."
    },
    {
      id: "q3",
      text: "You're writing a prompt for an AI project and you want consistent, reliable output. What approach did this course recommend?",
      options: [
        { id: "a", text: "Keep prompts short — more text confuses the AI" },
        { id: "b", text: "Be vague to give the AI room to be creative" },
        { id: "c", text: "Be specific — include the role, goal, rules, actual knowledge, and a defined out for edge cases" },
        { id: "d", text: "Use the same prompt that worked for someone else's project" }
      ],
      correctId: "c",
      explanation: "Vague prompts produce unpredictable output. Specific prompts — with a clear role, goal, rules for what to always and never do, the actual information the AI needs, and instructions for edge cases — produce consistent, usable output. The more specific your instructions, the smaller the gap between what you asked for and what you got."
    },
    {
      id: "q4",
      text: "Your first AI project came back yellow — promising but not quite there yet. What's the right move?",
      options: [
        { id: "a", text: "Stop the project — yellow means it didn't work" },
        { id: "b", text: "Expand the project immediately while momentum is high" },
        { id: "c", text: "Make targeted adjustments based on what you learned and run another two-week cycle" },
        { id: "d", text: "Switch to a different AI tool and start over" }
      ],
      correctId: "c",
      explanation: "Yellow means 'working but needs adjustment' — not 'failing.' Two weeks of data tells you specifically what's going wrong: which edge cases are problematic, where the error rate is highest, what the review layer is catching most often. Use that data to make targeted prompt improvements, then run another cycle. Yellow projects often become green with one or two well-aimed changes."
    },
    {
      id: "q5",
      text: "Someone says AI is about to eliminate their job entirely within two years. How do you evaluate that claim?",
      options: [
        { id: "a", text: "It's probably true — AI is advancing very quickly" },
        { id: "b", text: "It's definitely false — AI can't do real jobs" },
        { id: "c", text: "Evaluate it with context: AI replaces specific tasks, not whole jobs, and the risk depends on how repetitive and rule-based the work is" },
        { id: "d", text: "There's no way to evaluate it — nobody knows" }
      ],
      correctId: "c",
      explanation: "This is exactly what this entire course prepared you to do: evaluate AI claims with real context instead of reacting to them. AI is highly effective at automating specific, repetitive, pattern-based tasks. It's much less effective at judgment-heavy, relationship-dependent, creative, or physically complex work. 'AI will eliminate jobs' is too broad a claim to be useful. The right question is always: what specific tasks is AI good at, and how much of this person's job is composed of those tasks?"
    },
    {
      id: "q6",
      text: "You've finished your first AI project and it worked. What does this course recommend as the smart next move?",
      options: [
        { id: "a", text: "Scale it up as fast as possible and add five more use cases immediately" },
        { id: "b", text: "Take a break — you've earned it" },
        { id: "c", text: "Document what you learned, remove the review layer, and coast" },
        { id: "d", text: "Document what you learned, pick one adjacent use case, and run the same setup process again" }
      ],
      correctId: "d",
      explanation: "Building from a win is the strategy. Document everything first — what the project was, what worked, what the final prompt looked like, what you'd do differently. That documentation is your reference for every future project. Then pick one adjacent use case and repeat the process. The second project will be faster and easier because you've already built the muscle. Expanding too fast before a project has stabilized is how good starts turn into abandoned initiatives."
    },
    {
      id: "q7",
      text: "You've reached the end of 14 modules on AI. What does that realistically mean?",
      options: [
        { id: "a", text: "You know everything important about AI and don't need to keep learning" },
        { id: "b", text: "You have a solid foundation: you understand what AI is, where it fails, how to use it practically, and how to evaluate claims about it" },
        { id: "c", text: "You're now qualified to build advanced AI systems" },
        { id: "d", text: "You've learned enough to avoid AI entirely and make good decisions without it" }
      ],
      correctId: "b",
      explanation: "Fourteen modules gets you to a real foundation — not mastery, but genuine competence. You know what AI actually is (not the hype version). You know where it fails. You know how to prompt it well, how to evaluate its output, how to run a real project, and how to think about the risks. That combination is rarer than you'd think. The field will keep changing, and you'll keep learning — but you now have the frame to evaluate new information instead of just absorbing it."
    }
  ]}
/>

---

## The Closing Message

Here is the thing that is true and worth saying out loud:

You now know more about AI than most people alive.

Not the researchers. Not the engineers. Not the people building the models. But most of the people who encounter AI every day — through headlines, through tools they're using at work, through conversations at dinner about whether this technology is going to save the world or end it — most of those people are still reacting instead of thinking.

You're not doing that anymore.

You know what AI actually is. You know what it's not. You know where the failure modes live. You know how to use it in a way that helps you without handing over your judgment. And you've now done it — not in a demo, not in a tutorial, but in a real pilot with real stakes and real results.

That's not a small thing.

Use it. Share it when it helps someone. Keep experimenting — not because you have to, but because the experiments keep getting more interesting as you get better at running them. Stay curious about the parts you don't understand yet. Stay skeptical about claims that sound too good or too bad to be true.

The tool is extraordinary. So is the person who knows how to use it well.

That's you now.

---

## Key Takeaway

> **You started this course as someone curious about AI. You finish it as someone who understands it, built something with it, and knows how to keep going. That foundation is yours. Every project you run from here gets easier, faster, and more valuable. The learning doesn't stop — but the hard part, the foundation-building part, is done. What you do with it is up to you.**

---

<ModuleComplete moduleId="module-14" xpReward={50} badgeId="ai-builder" nextModuleSlug={null} />
```
