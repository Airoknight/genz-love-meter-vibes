<div align="center">

# 💘 Gen Z Love Meter

**Enter two names and discover whether the vibe is True Love, a Situationship, Benching—or straight-up Ghosting.**

[Try the Live App](https://genz-love-meter-vibes.vercel.app)

</div>

## About

Gen Z Love Meter is a playful love calculator built as an early vibe-coding experiment with Lovable. It produces a deterministic compatibility score and a Gen-Z relationship label from two names.

> This app is made for entertainment only. Its results are generated from text and do not measure real compatibility.

## Features

- Two-name compatibility calculator
- 10 Gen-Z relationship outcomes
- Animated result card and high-score confetti
- Shareable results
- Supabase-backed result storage and calculation counter
- Responsive interface

## How the Calculation Works

The calculator uses a FLAMES-inspired process:

1. Both names are converted to lowercase.
2. Spaces, numbers, and special characters are removed for letter matching.
3. Matching letters are cancelled one pair at a time.
4. The number of unmatched letters becomes the elimination count.
5. That count repeatedly eliminates labels from the ordered list below until one label remains.
6. The character codes of the original lowercase names are added together.
7. The sum modulo 10 selects a percentage inside the chosen label's range.

In simplified form:

```text
unmatchedCount = letters left after cancelling common letters
label = FLAMES-style elimination(labels, unmatchedCount)
percentage = labelMinimum + (characterCodeSum % 10)
```

This means the label is selected first and the percentage is then generated inside that label's range. The calculation is deterministic: the same two names produce the same result. Swapping the two names also produces the same result.

### Special Cases

- Two identical names, ignoring letter case, return **100% True Love**.
- If every letter cancels out, the label becomes **Siblings**.
- Empty inputs are rejected by the interface.
- The letter-matching step currently recognizes English letters `a-z`.

## Possible Results

| Percentage | Result | Meaning |
|---:|---|---|
| 90–100% | True Love | The universe wants this match |
| 80–89% | Ride or Die | Strong, loyal connection |
| 70–79% | Soulmates | A deeper-than-a-crush connection |
| 60–69% | Situationship | More than friends, less than defined |
| 50–59% | Fling | Fun, but probably short-term |
| 40–49% | Benching | Being kept as an option |
| 30–39% | Ghosting | Someone may disappear without warning |
| 20–29% | Friendzone | Strong “let's just be friends” energy |
| 10–19% | Slow Fade | The connection is gradually disappearing |
| 0–9% | Siblings | Completely platonic energy |

## Example

For `Alice` and `Bob`:

- 8 letters remain after common-letter cancellation
- The elimination process selects **True Love**
- The character-code calculation produces **97%**

## Data Storage

When a calculation is submitted, the two entered names, calculated percentage, and relationship label are saved to a Supabase table. The database count is used to display the total number of calculations.

Do not enter private or sensitive information.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Supabase
- Vercel
- Lovable

## Run Locally

```bash
git clone https://github.com/Airoknight/genz-love-meter-vibes.git
cd genz-love-meter-vibes
npm install
npm run dev
```

## Project Background

This was one of my early projects and was built primarily through vibe coding with Lovable. It was created as a playful experiment with generated interfaces, deterministic algorithms, Supabase persistence, and social sharing.

## Author

Created by [Airoknight](https://github.com/Airoknight).
