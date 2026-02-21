// Visual Novel Template - Skeleton Story
// Replace this with your own story!

// Variables - define any you need for tracking choices
VAR example_score = 0

// Starting point
-> start

=== start ===
# background: intro
# mood: intro

Welcome to your visual novel.

This is a skeleton story to demonstrate the template patterns.

+ [Begin the journey]
    -> scene_one

=== scene_one ===
# background: scene_one

You're standing at a crossroads.

The path ahead splits in two directions.

* [Take the left path]
    ~ example_score += 1
    You chose the left path. It feels right.
    -> scene_one_end

* [Take the right path]
    ~ example_score -= 1
    You chose the right path. Adventure awaits.
    -> scene_one_end

=== scene_one_end ===
+ [...]
    -> scene_two

=== scene_two ===
# background: scene_two

You continue forward.

The journey is just beginning.

* [Keep going]
    -> ending

=== ending ===
# background: ending

You've reached the end of the demo.

Your example_score is: {example_score}

+ [See results]
    # show: results
    -> END
