---
name: write-post
description: Write a blog post for beto.page. Use when the user wants to write, draft, or publish a post, a note, or an article for the site, or turn an experiment from research/ into writing. Enforces the house voice (English, first person, plain, funny, no em dashes) and wires in real numbers, code links and charts from the experiment that the post is about.
---

# Writing a post for beto.page

Posts live in `src/content/posts/<slug>.md`. A post with a body gets its own
page. A file with only frontmatter shows up in the list as a one line note.

```markdown
---
title: What I learned about X.
date: 2026-09-22
description: One sentence, used for the page description and the RSS item.
---
```

`title` ends with a period, like the rest of the site. `date` is the day it is
published. `draft: true` keeps it out of the site while you work on it.

## Voice

Write the post the way Beto would tell a friend what he just found out. That
means:

- **Always English.** Even when the conversation is in Spanish.
- **First person, past tense.** "I gave it a ham sandwich", not "one can observe".
- **No em dashes.** Not a single one. Use a comma, a period, or parentheses.
  Two sentences beat one long sentence with a dash in the middle.
- **Short sentences.** If a sentence needs a second breath, split it.
- **Plain words.** Say "fast", not "performant". Say "it broke", not "it
  exhibited unexpected behavior". No "delve", "leverage", "robust",
  "in today's landscape", "it's worth noting", "furthermore".
- **Funny, but dry.** The joke comes from the specific detail, not from
  exclamation marks. "I asked it which superhero a ham sandwich was" is funny
  on its own. Never explain the joke afterwards.
- **What I learned, not a tutorial.** The reader should finish knowing what
  surprised you and what you would do differently. Skip the setup steps unless
  they are the point.
- **Admit what you don't know.** "I have no idea why" is a good sentence.
  It is the most trustworthy thing in the post.

Never invent numbers, quotes, or results. Every figure comes from a real run.

## Shape

A post is usually 400 to 900 words, in this order:

1. **The hook.** One or two sentences with the surprising thing, up front. No
   "in this post I will".
2. **What I was doing and why.** Two or three sentences of context.
3. **The body.** Two to four sections, each one thing you learned, each with a
   number or a snippet that proves it.
4. **What broke.** The limits, the weird result, the thing you can't explain.
   This section is not optional. It is what makes the rest believable.
5. **What I'd use it for.** Plain, concrete, in your own work.
6. **The link.** Where the code lives, so people can rerun it.

Headings are sentence case, short, and say something: "It can't say no" beats
"Limitations".

## Use the real experiment

Posts about an experiment are backed by the code in
`research/<project>/` (a separate private repo, ignored by this one).

- Read the script and its saved `.txt` output before writing. Quote the numbers
  exactly as they came out, including the ugly ones.
- Show small code snippets, never the whole file. Eight lines is plenty. Strip
  imports and boilerplate so the snippet is the idea, not the plumbing.
- Paste real output in a fenced block, trimmed to the lines that matter.
- When the repo is private, say so and describe what the script does instead of
  linking to it. When it is public, link the file.
- Runs vary. If a number moved between runs, say so and give both.

## Charts

Charts are welcome when they beat a sentence. In order of preference:

1. **A markdown table.** Three or four rows, two or three columns. Most
   "charts" should be this.
2. **A monospace bar chart** in a fenced block, which matches the site's mono
   body font and needs no styling:

   ```
   said 0.04  ·                          happened  0%
   said 0.95  ·······················    happened 100%
   ```

3. **Inline SVG** for anything with a real shape, like a calibration curve.
   Keep it under 60 lines, no external libraries, `stroke="currentColor"` so it
   works on the dark background, `width="100%"` with a `viewBox` so it scales on
   phones, and a one line caption under it.

Never a screenshot of a terminal. The text is the point and it should be
selectable.

## Before publishing

1. Read the draft out loud in your head. Anything that sounds like a press
   release gets cut.
2. Search the draft for em dashes and for the banned words above.
3. `npm run build` passes.
4. Check it in the browser at `http://localhost:4321/posts/<slug>/`.
5. Commit and push with `rsalas6`, then switch `gh` back to `roberto-micro1`.
   Cloudflare Pages deploys from `main` on its own.
