---
title: 'RAG Over Your Company Data: What Actually Works in Production'
description: 'Lessons from four RAG systems in production: a finance agent, a lead pipeline, a wellness app and an AI tutor. What works and when RAG is the wrong tool.'
pubDate: 2026-10-07
category: 'ai-tools'
tags: ['rag', 'retrieval augmented generation', 'ai agents', 'llm', 'knowledge base']
authors: ['varmiguemunoz']
readtime: '7 min read'
draft: false
---

Most RAG tutorials end where the real work starts. They load a few PDFs into a vector database, ask a question, get a nice answer, and stop. Then the system meets real company data: numbers that change every day, records that contradict each other, and users who ask things the documents never covered.

I run retrieval in four production systems, each with very different data:

- **A finance agent on WhatsApp** that answers questions about a construction and real estate company's books
- **A lead sourcing pipeline** that researches companies before they reach the CRM
- **A wellness and ritual app** that adapts to each user instead of starting from zero every session
- **An AI tutor** that teaches trading from a private, curated knowledge base

What follows is what those four taught me about making RAG work outside a demo.

## RAG is a retrieval problem first

The "generation" part is the easy half now. Modern models write a good answer from good context. Almost every bad answer I have seen traces back to retrieval: the right information was missing, outdated or buried under the wrong information.

So the first question for any RAG system is not which model to use. It is: **what does the model need to see to answer this question correctly, and where does that live?**

The answer was different in every one of my four systems.

## Four systems, four kinds of data

### Finance: retrieve facts, not paragraphs

When the CEO asks "what did we spend on materials this month?", the answer is a number, and it has to be exact. Embedding transaction rows and hoping similarity search finds the right ones is how you get a confident, wrong total.

In the [finance agent](/blog/whatsapp-to-quickbooks-ai-agent), retrieval is used to understand the question and find the right context: which categories, which projects, which period. The numbers themselves come from the structured records, computed, not guessed. The model explains and reasons; the data layer is the source of truth for every figure.

**Lesson:** for numbers, retrieve the query, not the answer. Let the database do arithmetic.

### Leads: retrieve to enrich, then decide

In the [lead sourcing pipeline](/blog/ai-lead-sourcing-zoominfo-claude-pipedrive), each company is researched before it reaches Pipedrive, and the CRM already holds history about accounts the team has seen before. Retrieval brings that context together, what the company does and what we already know about it, so Claude can score the fit and identify the decision makers with the full picture.

**Lesson:** retrieval is not only for chat. Some of the most useful RAG never talks to a user; it feeds a decision inside a pipeline.

### Wellness app: retrieve the person, not just the content

The wellness app I build for a client needed to feel like it remembers you. A user's history, their intentions and what they wrote in their journal shape what the app should say next. That context is retrieved per user, alongside the meditation framework the experience must follow through a memory and personalization layer.

**Lesson:** in personal products, the most valuable retrieval index is the user's own history, kept separate per person and never mixed.

### AI tutor: retrieve only what was approved

The trading tutor answers from a curated knowledge base, and nothing else. That is the whole point: explanations stay consistent with the course instead of drifting into generic internet answers, and the tutor never turns into a financial advisor.

**Lesson:** sometimes the most important design decision is what the model is **not** allowed to retrieve.

## What actually works

### Keep the index as fresh as the data

A RAG system is only as current as its last update. Company data changes constantly: new transactions, new CRM records, new journal entries. Updating the index has to be part of the same flow that changes the data, not a nightly job someone forgets about.

### Split structured and unstructured data

Documents, notes and conversations belong in retrieval. Numbers, statuses and dates belong in the database and should be queried directly. Most "hallucinations" in business RAG come from forcing structured facts through a similarity search.

### Retrieve less, retrieve better

More context is not better context. Every irrelevant chunk competes with the relevant one for the model's attention. Tight filters by user, project, period or category, applied before similarity search, usually matter more for answer quality than prompt tweaks.

### Scope retrieval to who is asking

A user should only retrieve what they are allowed to see. In a per-user product that means one person's history never leaks into another's. In a company it means respecting the same permissions people already have.

### Make "I don't know" a valid answer

When retrieval comes back empty or weak, the right answer is to say so or to ask. A system that admits a gap keeps trust; one that improvises a plausible answer loses it the first time someone checks.

## When RAG is the wrong tool

RAG is not the answer to every AI problem:

- **Exact numbers and totals:** query the database
- **Real-time status:** call the system's API directly
- **Fixed rules and policies:** put them in the instructions or the data model
- **A handful of short documents:** they may simply fit in the prompt

RAG earns its place when the knowledge is too large to fit in a prompt, changes over time, and is mostly text that people need explained.

## How I would start a RAG project for your company

1. **Write down the 20 questions people actually ask.** Not the questions a demo would ask.
2. **For each question, find where the answer lives.** Documents, CRM, database, someone's head.
3. **Route each source to the right method.** Retrieval for text, direct queries for numbers, APIs for live status.
4. **Build the smallest version on real data** and test it against those 20 questions.
5. **Measure answers, not vibes.** Keep the questions as a test set and rerun it whenever the data or the prompt changes.

You can see these systems next to my other builds on the [homepage](/#work). For agents that run inside your own tools, I also wrote about [building an MCP server so Claude can run my business](/blog/mcp-server-claude-runs-my-business).

If you want an assistant that answers from your company's own data, [send me two lines about what it should know](/#contact) and I will tell you honestly whether RAG is the right approach.
