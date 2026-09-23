---
title: My sandwich is not Superman.
date: 2026-09-22
description: "Four tests on Jev, the first System One model: what it answers, how fast, how honest its probabilities are, and where it gets stuck."
tags: [testing, ai]
---

I asked a frontier model which superhero a ham sandwich was. It said Superman, with a confidence of 0.30. That is the most useful wrong answer I have gotten from a model all year.

<a href="https://typesafe.ai" target="_blank" rel="noopener">Jev</a> has been all over my timeline for a week, so I got access and spent a few nights trying to break it. I went in expecting a smaller, faster LLM. I spent the first hour confused, because it does not work like one at all. So I wrote four tests, one per thing I did not believe.

## 1. It doesn't write anything

You don't send messages. You send state, which is whatever text your program already has, plus a dictionary of typed questions.

```python
client.system_one(
    state="Goku powers up to Super Saiyan 3 and screams for twenty minutes. "
          "Frieza waits patiently, filing his nails.",
    questions={
        "genre": Choice(instructions="What kind of scene is this",
                        criteria={"fight": "...", "comedy": "...", "other": "..."}),
        "power_level": Score(instructions="How dangerous is this situation",
                             criteria=["Nothing is happening", "A normal fight",
                                       "The planet might explode"]),
        "is_anime": Noul(instructions="This scene is from an anime"),
    },
)
```

What came back:

```
[choice] genre       = comedy  (confidence 0.98)
         {'comedy': 0.99, 'fight': 0.01, 'other': 0.0, 'romance': 0.0}
[score]  power_level = 1.47  (confidence 0.21)
         {0: 0.06, 1: 0.4, 2: 0.54}
[noul]   is_anime    = 0.84
```

Comedy at 0.99 is the right read, and I did not expect a model to get the joke. The 1.47 is my favorite part. There is no level 1.47 on my scale. It split its belief between "a normal fight" and "the planet might explode" and gave me the split instead of picking one. The low confidence is that same split, in one number.

No text to parse, no JSON to validate. The set of things it can say is the set of things I defined.

## 2. Twenty questions cost the same as one

Same idea, different scene. Ash throws a Poke Ball, Pikachu shocks him, Team Rocket shows up in a balloon. I asked 1 question, then 5, then 10, then 20, all in one call each time.

```
questions     ms  ms each  tokens       $ each
        1    408      408     310   0.00001302
        5    458       92     357   0.00000300
       10    298       30     429   0.00000180
       20    178        9     559   0.00000117
```

Twenty decisions took less wall clock time than one. The first call of any run is the slowest, so part of that is my connection waking up, but the clock clearly does not care how many questions I pile on. Tokens only went from 310 to 559, because the scene is paid for once and output is free.

The answers were good, too. "Someone gets electrocuted" 0.99. "Pikachu is an electric type" 0.99, which is not even in the text. "A Pokemon is being caught" 0.17, because the ball bounced off. And "someone says the word 'twerp'" landed at 0.48, which is the most honest coin flip I have seen from a model.

## 3. The probabilities are honest

This is the claim I actually wanted to check: a 0.8 should happen about 80% of the time. So I wrote 41 statements about ten scenes, filled in the right answers by hand, and let it grade itself against me.

Input, roughly:

```python
("Goku is human", False),
("Goku has been to the afterlife", True),
("Mario finishes the level", False),
("Thanos was missing a stone", False),
```

Output:

```
accuracy      39/41 = 95%
brier score   0.033

     it said   n  was true
        0.04  18        0%
        0.57   2       50%
        0.85   4       75%
        0.95  17      100%
```

When it said 0.04, nothing happened, eighteen times out of eighteen. When it said 0.95, all seventeen were true. Calibration error came out at 0.052, and a second run gave 0.064, so the third decimal is noise. The shape holds.

## 4. It can only answer from your list

Last test, the one that changed how I would use it. I asked which superhero something is, gave it three options, and fed it a sandwich.

```python
state = "Two slices of bread with ham and cheese in the middle."
options = {"batman": "...", "superman": "...", "spiderman": "..."}
```

```
3 options  -> superman   confidence 0.30
+ 'other'  -> other      confidence 0.98
```

There is no right answer, so it picked one anyway. That is the flip side of "it can't hallucinate". It cannot break the shape of the answer, but it cannot tell you your options are wrong either, unless you hand it an escape hatch. The confidence is the alarm: 0.30 for the sandwich, 0.97 and up when the scene is actually Batman.

## What I'd use it for

Every system I work on is full of small decisions. Does this need a human. Which queue does this go to. Is this worth sending to the expensive model. Today those are either brittle rules or an LLM call I'm paying way too much for.

That is the job. Not writing, not chatting, not reasoning through a puzzle. Just deciding, fast, with a number attached so my code knows when to stop and ask.

I have not shipped anything with it yet. But the ham sandwich convinced me, which is not a sentence I expected to write.

The four tests: <a href="https://github.com/rsalas6/testing-jev" target="_blank" rel="noopener">github.com/rsalas6/testing-jev</a>
