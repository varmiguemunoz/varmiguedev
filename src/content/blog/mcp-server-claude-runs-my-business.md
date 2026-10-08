---
title: 'Building an MCP Server So Claude Can Run My Business'
description: 'How I built Daylios, an internal app that gives Claude live access to my projects, clients, meetings and pipeline through an MCP server.'
pubDate: 2026-10-07
category: 'ai-tools'
tags: ['mcp', 'claude', 'ai agents', 'internal tools', 'model context protocol']
authors: ['varmiguemunoz']
readtime: '7 min read'
draft: false
---

Every morning I ask Claude what is pending, and it answers from my real data: today's tasks, the client deliverables that are open, the action items from yesterday's meeting, the deals waiting on a next step. Then it acts on the answer. It moves tasks, logs notes, updates the pipeline and drafts the emails.

That works because of Daylios, an internal app I built and use every day to run my consultancy. Daylios exposes everything through an MCP server, so Claude is not a chatbot I paste context into. It is an assistant with live access to the system I actually work in.

This is how it is built, how I designed the tools Claude uses, and how you can build the same thing for your own internal tools.

## Why MCP instead of another dashboard

I did not need another app to look at. I already had too many tabs. What I needed was an assistant that knew my work as well as I do, without me explaining it every time.

The Model Context Protocol (MCP) solves exactly that. You expose your system as a set of tools with clear inputs and outputs, and Claude decides when to call them. Your data stays in your system. Claude gets context on demand instead of a stale copy pasted into a chat.

The practical difference is huge. "Prepare me for tomorrow's meeting" stops being a request for a generic checklist and becomes: read the client record, pull the last meeting's summary and open action items, check the project's pending deliverables, and write the brief.

## What Daylios manages

Daylios started as a simple personal task manager and grew into the system my consultancy runs on:

- **Tasks and a daily plan.** I cap the day at eight heavy tasks. Anything unfinished carries over to tomorrow on purpose, not by accident.
- **Clients, projects and contacts**, with a document folder per client.
- **Meetings.** Recordings are transcribed and summarized, and the action items come out with an owner and a due date.
- **Notes** attached to clients, projects or meetings.
- **A sales pipeline**, from first contact to a won or lost deal.
- **Lead intake by webhook.** Leads arrive from sources like Zapier, get tagged by origin, and tag rules decide what happens next.
- **Email sequences, newsletters and direct email**, so follow-ups go out from the same place the context lives.

The server runs on Express with TypeORM over SQLite, deliberately simple. I wanted code I can open and change myself in minutes, not a platform I have to maintain.

## Designing tools Claude can actually use

Building the server was the easy part. Designing the tools is where the quality of the whole system is decided. These are the rules I landed on.

### Start with one overview tool

The first tool Claude should reach for answers "how are things going?" in a single call: active clients and their projects, open deliverables, pending action items, the pipeline by stage and the latest meetings. Without it, Claude chains five or six calls to answer a simple question, and every extra call is a chance to lose the thread.

### Separate listing from detail

List tools return short rows without long text: meetings by date, clients with their project counts, contacts with their tags. Detail tools return the full record. This keeps responses small, so Claude can scan a month of meetings cheaply and open only the one that matters.

### Make every write explicit and small

Moving a task, completing an action item, moving a prospect to a new stage, tagging a contact. Each change is its own tool with its own inputs. Small, explicit writes are easy for Claude to choose correctly and easy for me to audit when something looks wrong.

### Write descriptions for the model, not for humans

The tool description is the only documentation Claude reads. A good one says what the tool is for, when to use it instead of a similar tool, and what format the inputs need, such as local dates as YYYY-MM-DD. When a model picks the wrong tool, the description is the first place to look.

### Let the data model carry the rules

Tags, rules and pipeline stages live in the database, not in prompts. When a lead arrives with a tag, the rule for that tag runs the same way every time. Claude can read and change the rules through tools, but it does not have to remember them.

## A day with Daylios

**Morning.** I ask what is on the plate. Claude reads the overview, builds the plan for the day within the eight-task limit, and flags anything overdue.

**During the day.** After a client call, the recording goes in. The transcript and summary come out, and the action items land in the right project with owners and dates. Claude can draft the follow-up email from the summary.

**End of day.** A scheduled review runs automatically: what got done, what carries over and why, and where my effort should go tomorrow. Over time it works like a weekly review with someone who never forgets a detail.

## What I learned

**Context beats intelligence.** The same model gives generic advice with no context and genuinely useful answers with live access to my data. Most of the value came from the tools, not from the prompt.

**Fewer, better tools win.** Every tool Claude could call is a choice it has to make. Two overlapping tools are a coin flip; one clear tool is a decision.

**Keep the server boring.** A small Express app over SQLite has been more reliable than anything clever. When I need a new capability, I add one tool, one route and one description.

## How to build one for your own tools

If you have an internal system your team lives in, a CRM, an operations tool or a project tracker, the path is the same:

1. **List the questions you ask every day.** Those become your read tools, starting with one overview.
2. **List the changes you make every day.** Those become small, explicit write tools.
3. **Write the descriptions as if the model knows nothing**, because it does not.
4. **Return less data than you think.** Short lists, detail on demand.
5. **Put business rules in your data**, not in prompts.

MCP is the same approach behind the [SprintOS](https://www.sprintos.run) server, which lets Claude manage a development board from the terminal. The same layer can sit on top of any client system, so a team works with AI on its own data.

You can see Daylios with my other builds on the [homepage](/#more-builds). If you want Claude, or any AI assistant, working directly inside the tools your team already uses, [send me two lines about your setup](/#contact) and I will tell you what an MCP layer would unlock.
