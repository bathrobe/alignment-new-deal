// Alignment New Deal
// Ink owns all logic; React is dumb renderer.

// ─── Variables ───
// No axis system. Choices accumulate flavor that determines endings.
VAR choice_1_morning = ""
VAR choice_2_news = ""
VAR choice_3_leave = ""
VAR choice_4_city = ""
VAR choice_5_android = ""
VAR choice_6_pull = ""

// Engagement score: choices that face outward / engage add 1.
// High engagement → active job. Low → receptive job.
VAR engagement = 0

// ─── Scene 1: Home Office — Morning ───
-> morning

=== morning ===
# background: home_office_morning

Morning. You punch in and your job's already done.

The agent did it all overnight. Fourteen tickets, two client reports, a contract redline. All sitting in your approval queue. Natural language summaries. Clean, warm, and perfect.

The cat jumps onto the desk. It's the most activity your keyboard has seen in hours.

You should probably read the reports. You skim the first one. It's good. 

The second one's good too. 

You open the agent's input field. The little blinking cursor. You could tell it what to do. Or not.

* "Same as yesterday."
    ~ choice_1_morning = "routine"
    You type it and hit enter. The cursor blinks once and disappears. It already knows what to do. It knew before you woke up.
    -> morning_end

* "Surprise me."
    ~ choice_1_morning = "curious"
    ~ engagement += 1
    You type it and hit enter. A pause — longer than usual. Then the screen fills with a project plan you've never seen. It looks... interesting. You won't read it.
    -> morning_end

* You change one word in the second report and approve it.
    ~ choice_1_morning = "grip"
    ~ engagement += 1
    "Synergies" becomes "connections." Nobody will notice. You needed to feel like you did something.
    -> morning_end

=== morning_end ===

The cat wants more food. You browse your feeds while the agent works.

This is your job now.

+ [...]
    -> news_feed

// ─── Scene 2: Home Office — The Feed ───

=== news_feed ===
# background: home_office_feed

The feeds stack up while you're not looking.

A data center outside Phoenix, pipe bombed. Smoke pouring off the roof in drone footage. No casualties — it was fully automated. They hate AI, but not enough to kill anything human yet.

Below that: a new protein-folding breakthrough. Cancer's, uh, gone? Hard to keep up, whatever. Life's still stressful.

And some fresh new hell below: two aligned systems went to war with a rogue cluster overnight. Fifteen minutes. The aligned systems won, but they had to kill power to half of Tucson to do it. A quarter million people woke up in the dark, alarm clocks beeping. Grid's back now. Nobody's explaining what "rogue cluster" means.

On the local channel, a meager bastion of sanity. Park opened downtown. Forty-eight hours from bare lot to full canopy. Public Works AI planted three hundred trees. 

Feeds don't stop, they keep going.

* Protect your peace. Tell the algorithm to stop telling you the news.
    ~ choice_2_news = "peace"
    You swipe it all away. The screen goes calm. The cat sighs.
    -> news_feed_end

* Face reality. Keep the news on the feed,
    ~ choice_2_news = "read"
    ~ engagement += 1
    You scroll. The data center fire was the third one this month. The Tucson blackout lasted four hours. The cancer therapy targets three specific mutations. The park has a waiting list for benches. You read until your coffee goes cold.
    -> news_feed_end

=== news_feed_end ===

The afternoon light shifts. The room feels different than it did this morning. Can't say you got much done.

+ [...]
    -> the_call

// ─── Scene 3: The Call ───

=== the_call ===
# background: home_office_firing

A meeting invite. 4:30. "Quick sync." You don't think anything of it.

The face on screen is a woman, maybe forty. Real. Tired eyes, good at her job. She smiles and you can tell she's done this before.

"Hey. Thanks for hopping on. This is going to be a difficult call."

It takes ninety seconds. Restructured. There's a transition package, a check, some warm words.

You stopped doing anything valuable months ago, with the last model release. It still stings.

"Do you have any questions?"

You don't.

The screen goes dark for a second. Then, immediately, like the system already knows — an ad. Bright. Warm colors. A logo you've never seen.

CIVIC FUTURES ADMINISTRATION. Part of the Alignment New Deal. "A Future Worth Building."

An address downtown. They've got jobs?

The screen dims. The apartment is quiet. The cat is staring at you.

* Click the APA ad. See what it is.
    ~ choice_3_leave = "seeking"
    ~ engagement += 1
    You click. A map. An address. A cafeteria, open to everyone. You grab your jacket.
    -> the_call_end

* The walls are closing in. You need air.
    ~ choice_3_leave = "fleeing"
    You close the laptop. Going to have to go on public assistance. You can't be in this room. You grab your jacket and you're out the door before you think about where you're going.
    -> the_call_end

* You open the fridge. It's empty.
    ~ choice_3_leave = "mundane"
    Right. Groceries. You've been meaning to go for three days. You grab your jacket. At least this is a reason to leave.
    -> the_call_end

=== the_call_end ===

The door clicks shut behind you. The hallway smells like someone else's dinner.

+ [...]
    -> the_city

// ─── Scene 4: The City ───

=== the_city ===
# background: the_city

The air hits you. Smells... chaotic. When's the last time you went outside?

The city is too much. An autonomous bus glides past a drone in the gutter—someone spray-painted PULL THE PLUG at the bus stop.

A woman walks past you fast, twitching, eyes locked on something you can't see. Across the street, a man sits on a bench, smiling at absolutely nothing. They got chips in their ears.

Gardens blooming in lots that were empty last month. The bots can beautify things quickly, that's for sure. Thin offices of the city government, suddenly a little more flush. The unemployment office has a line around the block. Next to it, a bright banner: CIVIC FUTURES ADMINISTRATION — "A Future Worth Building."

Streetlights flicker. The park is full of people with nowhere to be.

* You notice the park. The flowers. It's a weird future, but there's beauty.
    ~ choice_4_city = "beauty"
    Someone wrote the code that planted those gardens. 
    -> city_end

* You notice the graffiti. The twitching woman. It's rough.
    ~ choice_4_city = "rot"
    ~ engagement += 1
    DEATH TO DATA CENTERS on a mailbox. The unemployment line hasn't moved.
    -> city_end

=== city_end ===

You keep walking. The AND banner is everywhere now. The "Alignment New Deal". That same logo, that same slogan. Whatever this program is, it's got funding.

You drift toward the address from the ad.

+ [...]
    -> cafeteria

// ─── Scene 5: The Cafeteria — Arrival ───

=== cafeteria ===
# background: cafeteria_warm

You end up at the cafeteria. Part of the program, apparently. Public. "Soup kitchen" scrolls across your mind. This morning you had a cushy computer job.

The food is actually good. The kind of food a tech campus serves to make you forget you live at work. The vegetables were grown in an automated vertical farm six blocks away. Harvested, prepped, and plated without a human hand touching any of it. Tastes like grandma optimized a loss function.

You sit down. Strangers at communal tables. It's warm. It's bright. 

A woman across from you starts talking. She used to work on the computer. Now she's Mediation Corps — she sits in rooms where people are furious and keeps them talking.

"Yesterday this guy comes in. Lost his trucking route eighteen months ago. He'll swing on you if you mention AI. Screaming. Saying the whole thing is a con, it's guilt money, it's the government trying to buy him off so he doesn't riot."

She takes a bite.

"I sat between them for an hour. He didn't calm down. Not even a little."

She takes another bite.

"Got him some work in the restoration corps." The bags under her eyes lurch a tiny bit lower.

The android waiter sets a second plate in front of you. 

* You were just about to get up for seconds.
    ~ choice_5_android = "accept"
    The food is warm. The android moves on. Its hands are perfect. Yours have crumbs on them.
    -> cafeteria_end

* Sycophantic machines.
    ~ choice_5_android = "stare"
    ~ engagement += 1
    It's graceful. Efficient. It got you fired, and it bought you dinner.
    -> cafeteria_end

=== cafeteria_end ===

The mediator watches you.

"First day?"

You nod.

"It gets easier. Or weirder. One of those."

+ [...]
    -> convergence

// ─── Scene 6: The Cafeteria — Convergence ───

=== convergence ===
# background: cafeteria_convergence

Everything hits at once.

The android staff stutter. All of them, at the same moment — nodding out, a plate dropped, recovered too smoothly. The lights flicker. Containment incident. Somewhere, two systems are fighting, and you can feel it in the silverware.

Through the window: the crowd is closer now. Signs. Chanting. Someone throws a bottle and glass scatters across the sidewalk.

At the next table, a man stands up fast, knocking over his chair. His eyes are wild, locked on something invisible. Chips in his ears. Security moves toward him, calm and practiced.

You feel the fear. 

The mediator looks at you. The lights steady. The androids recover. The man sits back down. The crowd outside keeps chanting.

"So," she says. "What are you gonna do?"

There's a job board on the wall. You've been staring at it for twenty minutes without realizing.

* People. I want to be around people.
    ~ choice_6_pull = "people"
    -> job_board_people

* Something physical. My hands, my body.
    ~ choice_6_pull = "physical"
    -> job_board_physical

* I need to think. Make something. Figure out what I believe.
    ~ choice_6_pull = "inner"
    -> job_board_inner

// ─── Job Routing ───
// engagement >= 3 → active job, < 3 → receptive job
// People:   active = mediation,   receptive = listener
// Physical: active = orbital,     receptive = restoration
// Inner:    active = culture,     receptive = comfort

=== job_board_people ===
{ engagement >= 3:
    -> mediation_ending
- else:
    -> listener_ending
}

=== job_board_physical ===
{ engagement >= 3:
    -> orbital_ending
- else:
    -> restoration_ending
}

=== job_board_inner ===
{ engagement >= 3:
    -> culture_ending
- else:
    -> comfort_ending
}

// ─── Endings ───

=== listener_ending ===
# background: ending_listener_corps

You're on someone's porch. They're telling you about a factory that closed in '08. The AI is recording. You're just listening.

The sun is going down. You've heard six stories today. None of them are yours. All of them are.

You'll clean them up. Feed them back. Train the next generation of systems to understand what it actually felt like to be a person in the middle of all this.

+ [...]
    -> END

=== mediation_ending ===
# background: ending_mediation_corps

Two people are screaming at each other across a folding table. One lost his job to an AI. The other works for the program that deployed it. You're between them.

You don't fix it. But they leave the room still talking, and that's the job.

Tomorrow there'll be another room. Another table. Another hour of holding the center while everything pushes outward.

+ [...]
    -> END

=== restoration_ending ===
# background: ending_restoration_corps

Your hands are dirty. There's a tree in the ground that wasn't there this morning. An AI drone surveys the planting grid overhead.

After years on the computer, honest work is killing you. You don't love it. But the tree is real, and you put it there, and tomorrow there'll be another one.

And tonight? The first good night's sleep in ages.

+ [...]
    -> END

=== orbital_ending ===
# background: ending_orbital_construction

The Earth is blue below you. The data center hums. You're building the cathedral that ate your career.

It's the most beautiful thing you've ever seen. You're not sure if you're a pilgrim or a prisoner. Probably both.

+ [...]
    -> END

=== culture_ending ===
# background: ending_culture_corps

The clay is wet under your hands. The AI offered to optimize the shape. You said no.

It's lopsided. It's yours. The gallery is a repurposed Amazon warehouse. Nobody's buying. Everyone's looking.

Someone stands in front of your piece for a long time, and you remember what it feels like to be understood.

+ [...]
    -> END

=== comfort_ending ===
# background: ending_comfort_class

Your apartment is warm. The AI plays something you didn't ask for but somehow needed. The VR visor is a garden of earthly delights.

You're not doing anything. You might not do anything tomorrow either. It's not giving up. It's putting something down.

You'll know when to pick it back up.

+ [...]
    -> END
