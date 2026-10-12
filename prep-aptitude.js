/**
 * Aptitude Preparation: Notes, Formulas, and Practice Problems
 * Covers Quantitative, Logical Reasoning, and Verbal Ability
 */

const APTITUDE_DATA = {
  quantitative: {
    title: "Quantitative Aptitude",
    icon: "calculator",
    description: "Master arithmetic, algebra, and modern math concepts essential for campus placements & competitive assessments.",
    topics: [
      {
        id: "quant-1",
        name: "Time, Speed & Distance",
        summary: "Speed = Distance / Time. Crucial for train problems, boats & streams, and average speed.",
        formulaCheatSheet: [
          "Speed = Distance / Time; Time = Distance / Speed",
          "Convert km/hr to m/s: Multiply by (5 / 18)",
          "Convert m/s to km/hr: Multiply by (18 / 5)",
          "Average Speed (equal distance at speeds x and y) = (2xy) / (x + y)",
          "Boats & Streams: Downstream = u + v, Upstream = u - v; Boat Speed = (Down + Up) / 2"
        ],
        notes: `
### Key Concepts:
1. **Relative Speed**:
   - Two objects moving in opposite directions: **Relative Speed = S1 + S2**
   - Two objects moving in the same direction: **Relative Speed = |S1 - S2|**
2. **Train Problems**:
   - Train crossing a pole/man: Distance = Length of Train.
   - Train crossing a platform/bridge: Distance = Length of Train + Length of Platform.
3. **Circular Tracks**:
   - Time to meet for the first time anywhere = Length of track / Relative speed.
   - Time to meet at the starting point = LCM of individual round times.
        `
      },
      {
        id: "quant-2",
        name: "Time & Work",
        summary: "Calculations based on unit work method, efficiencies, and pipes & cisterns.",
        formulaCheatSheet: [
          "If A completes work in n days, 1 day's work = 1 / n",
          "Efficiency is inversely proportional to time taken: Efficiency ∝ (1 / Time)",
          "M1 * D1 * H1 / W1 = M2 * D2 * H2 / W2 (Man-Days-Hours-Work Formula)",
          "Net Work with Inlet (A) & Outlet (B): (1 / A) - (1 / B)"
        ],
        notes: `
### Quick Shortcuts:
- **LCM Method**: Assume total work = LCM of individual times. Find per-day efficiency of each worker. Add/subtract efficiencies to find collective time.
- **Negative Work**: Emptying pipes or workers who damage work have negative work rate.
        `
      },
      {
        id: "quant-3",
        name: "Percentages & Profit-Loss",
        summary: "Percentage changes, successive changes, markup, discount, and false weights.",
        formulaCheatSheet: [
          "Gain% = (Gain * 100) / CP; Loss% = (Loss * 100) / CP",
          "Successive percentage change: A + B + (AB / 100)",
          "SP = CP * (100 + Gain%) / 100; SP = CP * (100 - Loss%) / 100",
          "Discount% = (Discount * 100) / Marked Price (MP)"
        ],
        notes: `
### Pro-Tips:
- When two articles are sold at the same SP, one at a gain of x% and the other at a loss of x%, there is always an overall loss of **(x / 10)^2 %**.
- Dishonest Dealer: Gain% = [Error / (True Value - Error)] * 100.
        `
      },
      {
        id: "quant-4",
        name: "Permutations, Combinations & Probability",
        summary: "Arrangements (nPr), Selections (nCr), and basic & conditional probability.",
        formulaCheatSheet: [
          "nPr = n! / (n - r)! (Arrangement where order matters)",
          "nCr = n! / [r! * (n - r)!] (Selection where order does not matter)",
          "P(E) = Number of favorable outcomes / Total possible outcomes",
          "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)"
        ],
        notes: `
### Fundamentals:
- **Fundamental Principle of Counting**: If an event can happen in m ways and another independent event in n ways, both together can happen in **m * n** ways.
- Complement Rule: P(at least one) = 1 - P(none).
        `
      }
    ],
    practiceProblems: [
      {
        id: "q-quant-1",
        question: "A train running at 54 km/hr takes 20 seconds to pass a platform. If the length of the train is 120 meters, what is the length of the platform?",
        options: ["180 meters", "200 meters", "150 meters", "220 meters"],
        correctIndex: 0,
        explanation: "1) Convert speed: 54 km/hr = 54 * (5/18) = 15 m/s.\n2) Total distance = Speed * Time = 15 m/s * 20 s = 300 meters.\n3) Distance = Train Length + Platform Length.\n4) 300 = 120 + Platform Length => Platform Length = 180 meters."
      },
      {
        id: "q-quant-2",
        question: "A can finish a project in 12 days, and B can finish the same project in 18 days. If they work together, in how many days will the work be completed?",
        options: ["7.2 days", "8 days", "6.5 days", "9 days"],
        correctIndex: 0,
        explanation: "Using LCM method: Let total work = LCM(12, 18) = 36 units.\n- A's rate = 36 / 12 = 3 units/day.\n- B's rate = 36 / 18 = 2 units/day.\n- Combined rate = 3 + 2 = 5 units/day.\n- Time = 36 / 5 = 7.2 days."
      },
      {
        id: "q-quant-3",
        question: "If an item is sold at 20% profit, and the selling price is ₹720, what was its original cost price (CP)?",
        options: ["₹580", "₹600", "₹620", "₹640"],
        correctIndex: 1,
        explanation: "SP = CP * 1.20 => 720 = CP * 1.2 => CP = 720 / 1.2 = ₹600."
      },
      {
        id: "q-quant-4",
        question: "Two cards are drawn at random from a standard pack of 52 cards without replacement. What is the probability that both cards are Kings?",
        options: ["1 / 221", "1 / 169", "4 / 663", "1 / 13"],
        correctIndex: 0,
        explanation: "There are 4 Kings in 52 cards.\n- P(1st King) = 4 / 52 = 1 / 13.\n- P(2nd King) = 3 / 51 = 1 / 17.\n- P(Both) = (1 / 13) * (1 / 17) = 1 / 221."
      }
    ]
  },
  logical: {
    title: "Logical Reasoning",
    icon: "brain-circuit",
    description: "Sharpen your analytical deductions, pattern recognition, and puzzle-solving skills.",
    topics: [
      {
        id: "logic-1",
        name: "Blood Relations",
        summary: "Family tree decoding, pointing/statement-based problems, and coded relations.",
        formulaCheatSheet: [
          "Father's/Mother's father = Grandfather",
          "Father's/Mother's sister = Aunt",
          "Son of brother or sister = Nephew",
          "Daughter of brother or sister = Niece",
          "Spouse's brother = Brother-in-law"
        ],
        notes: `
### Strategy:
- Use standard symbols: **+ for Male**, **- for Female**, **= for Married Couple**, **| for Generation Gap**, **--- for Siblings**.
- Break down statements backwards: "the only son of my mother's husband" -> mother's husband = father -> only son of father = myself/brother.
        `
      },
      {
        id: "logic-2",
        name: "Direction & Distance Sense",
        summary: "Cardinal directions, turns (left/right/angles), and shortest distance using Pythagoras.",
        formulaCheatSheet: [
          "North, South, East, West with ordinal directions (NE, NW, SE, SW)",
          "Right turn from North = East; Left turn from North = West",
          "Shortest Distance = √(Δx² + Δy²) (Pythagorean Theorem)"
        ],
        notes: `
### Tips:
- Always sketch the starting origin at (0,0).
- Shadow rules: In morning, sun is in East, shadow falls to West. In evening, sun is in West, shadow falls to East.
        `
      },
      {
        id: "logic-3",
        name: "Syllogisms & Deductive Logic",
        summary: "Venn diagram deductions for All, Some, No, and Some Not statements.",
        formulaCheatSheet: [
          "All A are B does NOT mean All B are A.",
          "Some A are B implies Some B are A.",
          "No A is B implies No B is A.",
          "Check all possible Venn variations before accepting a conclusion as definitively true."
        ],
        notes: `
### Rules:
- A conclusion is valid ONLY if it holds in 100% of all possible Venn diagrams.
- Look out for 'Either-Or' complementary pairs (Some + No or All + Some Not).
        `
      }
    ],
    practiceProblems: [
      {
        id: "q-logic-1",
        question: "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
        options: ["Brother", "Uncle", "Father", "Grandfather"],
        correctIndex: 2,
        explanation: "1) 'My mother's only son' = Suresh himself (since he is the only son of his mother).\n2) The boy is the son of Suresh.\n3) Therefore, Suresh is the father of the boy."
      },
      {
        id: "q-logic-2",
        question: "A person walks 10 km North, turns right and walks 6 km, then turns right again and walks 2 km. How far is he from his starting point?",
        options: ["10 km", "12 km", "8 km", "14 km"],
        correctIndex: 0,
        explanation: "Displacement in Y-axis: +10 - 2 = +8 km.\nDisplacement in X-axis: +6 km.\nShortest distance = √(8² + 6²) = √(64 + 36) = √100 = 10 km."
      },
      {
        id: "q-logic-3",
        question: "Statements: All cars are cats. All cats are bats. Conclusions: I. All cars are bats. II. Some bats are cars.",
        options: ["Only I follows", "Only II follows", "Neither follows", "Both I and II follow"],
        correctIndex: 3,
        explanation: "All cars are inside cats, and all cats are inside bats. Thus all cars are inside bats (I follows). Since cars exist inside bats, at least some bats are cars (II follows). Both conclusions follow."
      }
    ]
  },
  verbal: {
    title: "Verbal Ability",
    icon: "book-open",
    description: "Grammar, reading comprehension, vocabulary, and corporate communication tests.",
    topics: [
      {
        id: "verb-1",
        name: "Sentence Correction & Subject-Verb Agreement",
        summary: "Identify grammatical errors, tense mismatches, modifier placements, and parallelism.",
        formulaCheatSheet: [
          "Singular subject takes singular verb (The list of items is...)",
          "Neither...nor / Either...or: verb agrees with the closer subject",
          "Modifiers must be placed right next to the noun they modify",
          "Parallelism: In lists, keep verbs in identical forms (reading, coding, and designing)"
        ],
        notes: `
### Common Placement Traps:
- Distractor phrases: 'Along with', 'as well as', 'in addition to' do NOT change the subject number.
- Collective nouns (team, committee) are usually singular unless members are acting individually.
        `
      },
      {
        id: "verb-2",
        name: "Para Jumbles & Sentence Ordering",
        summary: "Techniques to identify mandatory pairs, transition words, and opening statements.",
        formulaCheatSheet: [
          "Look for independent introductory sentences (no pronouns like he/she/this/these without antecedents)",
          "Chronological transitions: Initially -> Subsequently -> Finally",
          "Acronym rule: Full form comes before short acronym"
        ],
        notes: `
### Strategy:
- Look for noun-pronoun links. If statement B says 'Albert Einstein was born...' and statement D says 'He contributed...', B precedes D.
- Watch for contrasting conjunctions (However, But, Although).
        `
      }
    ],
    practiceProblems: [
      {
        id: "q-verb-1",
        question: "Choose the grammatically correct sentence:",
        options: [
          "Neither the manager nor the developers was available for the meeting.",
          "Neither the manager nor the developers were available for the meeting.",
          "Neither the manager nor the developers is available for the meeting.",
          "Neither the manager nor the developers has been available for the meeting."
        ],
        correctIndex: 1,
        explanation: "With 'Neither... nor', the verb must agree with the subject closest to it. 'The developers' is plural, so the plural verb 'were' is correct."
      },
      {
        id: "q-verb-2",
        question: "Identify the antonym of the word 'METICULOUS':",
        options: ["Careless", "Punctual", "Methodical", "Fastidious"],
        correctIndex: 0,
        explanation: "'Meticulous' means showing great attention to detail; very careful and precise. The antonym is 'Careless'."
      }
    ]
  }
};
