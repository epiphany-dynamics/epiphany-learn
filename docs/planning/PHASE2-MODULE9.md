# Module 9: The Brains Behind AI (Models, Training, and What the Names Mean)
**Subtitle:** GPT, Claude, Gemini — what these names actually mean and why it matters
**Phase:** 2 — Vocabulary and Building Blocks
**Module:** 9
**Lessons:** 4

---

## Lesson 1: The Engine vs. the Car

---
id: lesson-1
moduleId: module-9
slug: engine-vs-car
title: "The Engine vs. the Car"
subtitle: "ChatGPT is the car. GPT-4 is the engine inside it."
estimatedMinutes: 7
xpReward: 50
---

# The Engine vs. the Car

Here's something that confuses almost everyone when they start getting into AI.

They sign up for ChatGPT, start using it, and then hear someone say "I'm using GPT-4" — and they wonder: wait, are those the same thing? Did I miss something?

Great question. Here's the answer: **ChatGPT is the car. GPT-4 is the engine inside it.**

---

## Cars and Engines Are Not the Same Thing

When you buy a car, you're buying the whole package — the seats, the dashboard, the doors. You interact with the car. You drive it.

But under the hood? There's an engine. It's generating the power that makes the wheels spin.

The car is the thing you see. The engine is the thing that makes it go.

Swap "car" for "AI app" and "engine" for "AI model" — and you've just understood something most adults don't know.

---

## The App vs. The Model

**ChatGPT** is the app. It's the website you log into. It has a clean chat window, memory features, and image generation. It's made by OpenAI.

**GPT-4** is the model — the engine under the hood. It's the thing reading your question and generating the answer.

When you talk to ChatGPT, you're driving the car. GPT-4 is the engine making it possible.

Same logic applies everywhere:

- **Claude.ai** is the app. **Claude Sonnet** or **Claude Opus** is the model underneath.
- **Gemini.com** is the app. **Gemini 1.5** is the model underneath.

The app is what you see. The model is what does the work.

---

## Why This Actually Matters

The same engine can power a lot of different cars.

OpenAI lets other companies use GPT-4 as an engine for their own products. So when a company says their tool is "powered by AI" — what they usually mean is: we built a car and dropped someone else's engine in it.

That customer service chatbot on a random website? Probably GPT-4 under the hood.
That AI writing assistant your company just bought? Same engine, different paint job.

Most AI tools are built on a handful of engines. When a vendor pitches "proprietary AI," it's worth asking: which model is actually running this? Is this genuinely different, or are they charging extra for the wrapper around a free engine?

---

## Quick Check

<Quiz
  id="m9-lesson-1-quiz"
  questions={[
    {
      id: "q1",
      text: "In the car analogy, what does the 'engine' represent?",
      options: [
        { id: "a", text: "The AI app you log into and use" },
        { id: "b", text: "The AI model doing the actual language processing" },
        { id: "c", text: "The company that makes the AI" },
        { id: "d", text: "The internet connection the AI uses" }
      ],
      correctId: "b",
      explanation: "The engine = the AI model (like GPT-4, Claude, Gemini). The car = the app you use (like ChatGPT, Claude.ai). The model does the actual work; the app is just how you interact with it."
    },
    {
      id: "q2",
      text: "A company sells an 'AI customer service tool' for $500/month. They say it's powered by GPT-4. What does that tell you?",
      options: [
        { id: "a", text: "They built something totally unique and novel" },
        { id: "b", text: "They built a wrapper around OpenAI's engine, which you could also access directly" },
        { id: "c", text: "They own GPT-4 and developed it themselves" },
        { id: "d", text: "Their AI is more powerful than regular ChatGPT" }
      ],
      correctId: "b",
      explanation: "If a tool is 'powered by GPT-4,' they're using OpenAI's engine. Their value-add is the wrapper — the features and workflow they built around it. That wrapper might be worth paying for. Or it might not. Now you know how to evaluate it."
    }
  ]}
/>

---

## Key Takeaway

> **ChatGPT, Claude.ai, and Gemini are apps — the car you drive. GPT-4, Claude, and Gemini are models — the engines doing the work. Most AI tools you'll encounter are wrappers around a handful of engines. Knowing which engine is inside helps you cut through the marketing.**

---

<LessonComplete lessonId="lesson-1" nextLessonSlug="meet-the-ai-families" xpReward={50} />

---

## Lesson 2: Meet the AI Families

---
id: lesson-2
moduleId: module-9
slug: meet-the-ai-families
title: "Meet the AI Families"
subtitle: "The major players, what they're known for, and why it matters which one you're using"
estimatedMinutes: 7
xpReward: 50
---

# Meet the AI Families

Now that you know the difference between the app and the model — let's meet the main model families.

Think of these like car manufacturers. Ford makes engines. Toyota makes engines. Honda makes engines. They're not the same, and they have different reputations for different things.

AI models work the same way. There are a few major families, each made by a different company, each with its own strengths.

---

## The Four Families You'll Hear About

<RevealCard
  id="m9l2-gpt"
  label="GPT — Made by OpenAI"
  reveal="GPT is the one that started the mainstream wave. When ChatGPT launched in late 2022, it introduced most of the world to AI chat tools. GPT-4 powers ChatGPT and thousands of apps built on top of it. It's extremely capable and has the biggest ecosystem. Why you'd care: If someone says 'the AI' without specifying which one, they're probably talking about GPT."
/>

<RevealCard
  id="m9l2-claude"
  label="Claude — Made by Anthropic"
  reveal="Claude is the model powering this platform. It's made by Anthropic, founded by researchers who previously worked at OpenAI. Claude is known for being thoughtful, nuanced, and especially good with long documents — you can hand it an entire research paper and ask questions about it. Why you'd care: For writing, summarizing big documents, and tasks where careful answers matter over fast ones, Claude tends to stand out."
/>

<RevealCard
  id="m9l2-gemini"
  label="Gemini — Made by Google"
  reveal="Gemini is Google's AI model. You may already be using it — it's built into Google Search, Gmail, and Google Docs. Google's advantage: decades of data and tight integration with tools billions of people already use. Why you'd care: If you live in Google products, Gemini is already there. No new app to learn."
/>

<RevealCard
  id="m9l2-llama"
  label="Llama — Made by Meta"
  reveal="Llama is Meta's AI model (same Meta that owns Facebook and Instagram). The big difference: Llama is open source. Meta released the code publicly so anyone can download and run it — free, no monthly fees. Why you'd care: A lot of free and cheap AI tools are running Llama under the hood."
/>

---

## They're Different Tools, Not a Ranked List

A common mistake: people assume there's one best AI and everyone should use it.

That's like saying there's one best car. Best for what? Each model was built with different priorities:

- **GPT** — broad capability and general use
- **Claude** — nuance, careful answers, long complex documents
- **Gemini** — Google product integration and real-time search
- **Llama** — openness and developer control, free to run yourself

For most everyday tasks they're honestly pretty close. The differences show up when you push them on specific things.

---

## Quick Check

<Quiz
  id="m9-lesson-2-quiz"
  questions={[
    {
      id: "q1",
      text: "Which AI model family is open source — meaning anyone can download and run it for free?",
      options: [
        { id: "a", text: "GPT (OpenAI)" },
        { id: "b", text: "Claude (Anthropic)" },
        { id: "c", text: "Gemini (Google)" },
        { id: "d", text: "Llama (Meta)" }
      ],
      correctId: "d",
      explanation: "Llama, made by Meta, is open source. The code is publicly available so developers can download it, run it on their own hardware, and build tools without paying API fees. This is a big deal — it means smaller companies and individual developers can build AI-powered tools without depending on any single company."
    },
    {
      id: "q2",
      text: "You have a 50-page contract you need to understand before signing. Which AI characteristic should you prioritize?",
      options: [
        { id: "a", text: "Fastest response time" },
        { id: "b", text: "Ability to handle long documents with careful, nuanced answers" },
        { id: "c", text: "The one with the most name recognition" },
        { id: "d", text: "The one that's been around the longest" }
      ],
      correctId: "b",
      explanation: "For long, complex documents where accuracy matters, you want a model known for handling big contexts carefully. Speed matters less than accuracy when you're trying to understand something important before you sign it."
    }
  ]}
/>

---

## Key Takeaway

> **GPT, Claude, Gemini, and Llama are the four major AI model families. Each has different strengths — there's no single winner. Knowing the families means you can choose the right tool for the job instead of defaulting to whatever you heard of first.**

---

<LessonComplete lessonId="lesson-2" nextLessonSlug="how-ai-learns" xpReward={50} />

---

## Lesson 3: How AI Learns (The Dog Training Analogy)

---
id: lesson-3
moduleId: module-9
slug: how-ai-learns
title: "How AI Learns (The Dog Training Analogy)"
subtitle: "Training, fine-tuning, and what it actually means when someone trains AI on your data"
estimatedMinutes: 7
xpReward: 50
---

# How AI Learns (The Dog Training Analogy)

People talk about "training AI" like it's something mysterious and complicated.

It's not. You've already seen training work before — you just didn't call it that.

You've seen someone train a dog.

---

## You Don't Teach a Dog by Explaining Grammar

Think about how dogs learn to sit.

You don't walk your dog to a whiteboard and explain physics. You don't hand them a manual. You say "sit." They do something — maybe they look at you blankly, or plop down, or spin in a circle. When they sit correctly, you give them a treat. You repeat that about a thousand times.

Eventually the dog doesn't need the treat anymore. It just knows: when I hear "sit," I do this thing.

The dog isn't understanding language. It's recognizing a pattern and matching it to a behavior that got rewarded.

**That is almost exactly how AI learns.**

---

## How AI Training Actually Works

Instead of treats, AI gets mathematical feedback — a signal that says "this response was good" or "this response was bad." Instead of a thousand reps, AI gets **billions** of examples.

The simplified version:

1. Gather an enormous amount of text — books, articles, websites, scientific papers
2. Show the AI pieces of that text and ask it to predict what comes next
3. When it guesses right, it gets reinforced. When it guesses wrong, it adjusts.
4. Repeat billions of times

The AI never "read" anything the way you read. It processed patterns — what words tend to follow other words, what kinds of answers sound right to what kinds of questions.

---

## Fine-Tuning: Teaching a Specific Skill

Once a model is trained on general text, you can give it extra focused training for a specific job. This is called **fine-tuning**.

Think about a rescue dog. First it got regular training — sit, stay, behave around people. Then it got **specific** training: follow a scent trail, navigate rubble, signal when it finds someone.

Fine-tuning works the same way. You take a general model and give it extra examples on one thing — medical documents, legal files, a company's tone of voice. The engine is still the same. But it's much better at that specific job.

---

## "We Trained the AI on Your Data" — What That Means

You've probably heard this pitch: *"Our AI learns from your data."*

Now you know. They're fine-tuning a model on your specific information — your company's documents, customer conversations, your policies. The result is a model that knows your business context.

Smart follow-up questions:

- **"What data did you train this on?"** — General internet, or specific to your industry?
- **"Does our data stay private, or does it feed back into training?"** — Important if you handle sensitive information.

---

## Quick Check

<Quiz
  id="m9-lesson-3-quiz"
  questions={[
    {
      id: "q1",
      text: "In the dog training analogy, what do 'treats' represent in AI training?",
      options: [
        { id: "a", text: "The electricity used to power the servers" },
        { id: "b", text: "Mathematical feedback that reinforces good responses" },
        { id: "c", text: "The internet connection the AI uses to search" },
        { id: "d", text: "The programmers who write the code" }
      ],
      correctId: "b",
      explanation: "When AI generates a good response, it receives a reinforcement signal — the equivalent of a treat. When it generates a poor response, the signal pushes it to adjust. Repeated billions of times, this shapes the model's behavior."
    },
    {
      id: "q2",
      text: "A company says their AI was 'fine-tuned on legal documents.' In plain English, that means:",
      options: [
        { id: "a", text: "The AI was built from scratch using only legal text" },
        { id: "b", text: "A lawyer reviewed all the AI's answers" },
        { id: "c", text: "A general model received extra training focused on legal documents" },
        { id: "d", text: "The AI can access legal databases in real time" }
      ],
      correctId: "c",
      explanation: "Fine-tuning means taking an existing general model and giving it additional training on a specific type of content. It's not built from scratch — it's a general model with extra specialized training layered on top. Like a rescue dog that already knew basic commands and then learned specific search skills."
    }
  ]}
/>

---

## Key Takeaway

> **AI learns the way a dog learns — not by understanding, but by seeing enough examples that patterns become automatic. Fine-tuning is extra training for a specific job. When a vendor says "we trained the AI on your data" — that's fine-tuning. Knowing this helps you ask much smarter questions about any AI tool.**

---

<LessonComplete lessonId="lesson-3" nextLessonSlug="open-source-vs-closed" xpReward={50} />

---

## Lesson 4: Open Source vs. Closed — Why It Matters

---
id: lesson-4
moduleId: module-9
slug: open-source-vs-closed
title: "Open Source vs. Closed: Why It Matters"
subtitle: "Secret recipe vs. shared recipe — and why you should care which one you're depending on"
estimatedMinutes: 8
xpReward: 75
---

# Open Source vs. Closed: Why It Matters

Imagine two restaurants.

The first makes an incredible signature sauce, but they'll never share the recipe. You can eat there and pay their prices — but if they double them tomorrow, you can pay or leave.

The second posts their recipe online. Anyone can make the sauce at home. You can never be locked out.

That's the difference between **closed source** and **open source** AI.

---

## Closed Source: The Secret Recipe

GPT (OpenAI) and Claude (Anthropic) are closed source. You can use them and build on top of them — but the actual model recipe is private.

Why companies do this: it protects their investment (these cost billions to build) and lets them control quality and safety.

**The tradeoff:** You're depending on that company. If OpenAI raises prices, changes the product, or shuts down — your workflow is affected. You can't run the engine yourself, so you have no way out.

---

## Open Source: The Shared Recipe

Llama (Meta) and Mistral are open source. The actual model code is publicly available — you can download it, run it on your own server, and build on it.

**The real advantages:**

- **Cost:** Running it yourself is far cheaper than per-query fees
- **Privacy:** Your data never leaves your own server
- **Control:** If Meta stops maintaining Llama, the community keeps it alive. You can't be locked out.

**The tradeoffs:** More technical to set up. And for the hardest tasks, closed models are still generally more capable — though open source is closing that gap fast.

---

## When It Actually Matters

For **personal use** — grammar checking, brainstorming, summarizing — it doesn't matter. Use whatever works.

The stakes get real with **business decisions**:

- Building a product on top of an AI engine
- Processing sensitive or private information
- Depending on AI for something where a price change would hurt

In those situations, knowing whether you're locked to a closed model is important.

---

## A Simple Framework

<RevealCard
  id="m9l4-personal"
  label="You're using AI for personal productivity"
  reveal="Open vs. closed doesn't matter much. Use whatever is most convenient. ChatGPT, Claude, and Gemini all have free tiers — pick the one you like best."
/>

<RevealCard
  id="m9l4-sensitive"
  label="You're processing sensitive or private data"
  reveal="This matters a lot. With closed models, your data goes to the company's servers. With open source models run on your own infrastructure, your data never leaves your control. For medical records, legal files, or financial data — ask where your data actually goes."
/>

<RevealCard
  id="m9l4-business"
  label="You're building something where price changes could hurt you"
  reveal="Open source becomes very attractive here. If a vendor built their tool on GPT-4 and OpenAI doubles API prices — your vendor passes that cost to you or goes under. If the tool runs on Llama, that risk is mostly gone. For anything mission-critical, know which engine you're depending on."
/>

---

## Quick Check

<Quiz
  id="m9-lesson-4-quiz"
  questions={[
    {
      id: "q1",
      text: "A startup builds their product entirely on GPT-4. OpenAI raises API prices by 300%. What's the main risk?",
      options: [
        { id: "a", text: "No risk — GPT-4 is open source so they can switch easily" },
        { id: "b", text: "They're locked into a closed model and must absorb the cost or rebuild" },
        { id: "c", text: "They can just download their own copy of GPT-4" },
        { id: "d", text: "OpenAI is legally required to keep prices stable" }
      ],
      correctId: "b",
      explanation: "Vendor lock-in. GPT-4 is closed source — you can't download it and run it yourself. They must absorb the price hike, pass it to customers, or pay to migrate to a different engine."
    },
    {
      id: "q2",
      text: "A healthcare company wants AI to review patient records. Their biggest concern is data privacy. Best approach?",
      options: [
        { id: "a", text: "Use ChatGPT — it's the most well-known" },
        { id: "b", text: "Use an open source model on their own servers so patient data never leaves their control" },
        { id: "c", text: "All AI tools handle privacy the same way" },
        { id: "d", text: "AI and healthcare data privacy are completely incompatible" }
      ],
      correctId: "b",
      explanation: "With closed models, data goes to a third party's servers. For sensitive healthcare data, an open source model running on your own infrastructure keeps data entirely under your control."
    },
    {
      id: "q3",
      text: "You want to use AI to plan your weekly grocery shopping. Which statement applies?",
      options: [
        { id: "a", text: "Open source is essential — you must protect your grocery data" },
        { id: "b", text: "Open vs. closed doesn't matter — use whatever is convenient" },
        { id: "c", text: "Only closed models are capable enough for planning tasks" },
        { id: "d", text: "Consult a technical expert before using AI for personal tasks" }
      ],
      correctId: "b",
      explanation: "For low-stakes personal tasks, open vs. closed is not a meaningful distinction. The framework matters when you're handling sensitive data, building a business, or depending on AI in a way where vendor decisions could hurt you."
    }
  ]}
/>

---

## Key Takeaway

> **Closed source AI (GPT, Claude) is like a secret recipe — powerful and polished, but you depend on the company's pricing and decisions. Open source AI (Llama, Mistral) is the shared recipe — free to use, your data stays yours, but more technical to set up. For personal use, it doesn't matter much. For business decisions involving sensitive data or long-term dependency, it matters a lot.**

---

<LessonComplete lessonId="lesson-4" nextLessonSlug="module-9-complete" xpReward={75} />
