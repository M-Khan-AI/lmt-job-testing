/**
 * Company Hiring Process Blueprint
 * Detailed Exam Patterns, Syllabus, Eligibility, Rounds, and Interview Strategies
 */

const COMPANIES_DATA = [
  {
    id: "comp-amazon",
    name: "Amazon",
    tier: "Product / MAANG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
    ctcRange: "₹28,00,000 - ₹45,00,000 CTC (Base + Stocks + Sign-on)",
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA (CS / IT / ECE / allied)",
      cgpa: "6.5+ CGPA with no active backlogs",
      batch: "Current Final Year & Pre-final year (for Internships)",
      gapAllowed: "Up to 1 year academic gap allowed"
    },
    examPattern: {
      roundsCount: 4,
      assessmentPlatform: "HackerRank / Mettl",
      duration: "90 - 120 Minutes for OA",
      sections: [
        { name: "Online Assessment (OA)", format: "2 Coding Questions (DSA) + Work Styles Assessment (Amazon 16 Leadership Principles)", duration: "90 mins" },
        { name: "Technical Round 1", format: "Live Coding (Arrays, Strings, Trees, Graphs) + 1-2 LP questions", duration: "60 mins" },
        { name: "Technical Round 2", format: "Deep Problem Solving (DP, Graphs, Heaps) + LP Behavioral check", duration: "60 mins" },
        { name: "Bar Raiser Round", format: "External Senior Bar Raiser: Hard algorithmic scenario + Rigorous LP drill down", duration: "60 mins" }
      ]
    },
    syllabus: [
      "Data Structures: Trees (Binary, BST, LCA), Graphs (BFS, DFS, Dijkstra, TopoSort), Heaps (Priority Queue), HashMaps",
      "Algorithms: Dynamic Programming (0/1 Knapsack, LIS), Two Pointers, Sliding Window, Binary Search variations",
      "Leadership Principles: Customer Obsession, Ownership, Bias for Action, Deliver Results, Dive Deep, Earn Trust",
      "Core CS: Object-Oriented Design (LLD basics), Time & Space Complexity analysis"
    ],
    tips: [
      "Every single round dedicates 15-20 minutes to Amazon's 16 Leadership Principles. Prepare 2 STAR-method stories for each principle.",
      "Think out loud. Amazon interviewers judge your thought process, edge-case analysis, and how you optimize your code from O(N^2) to O(N log N).",
      "Always write modular, clean code with descriptive variable names — pseudo-code is not accepted in final rounds."
    ]
  },
  {
    id: "comp-google",
    name: "Google",
    tier: "Product / MAANG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    ctcRange: "₹35,00,000 - ₹55,00,000 CTC (Base + Equity + Bonus)",
    eligibility: {
      degree: "Bachelor's, Master's or PhD in Computer Science or equivalent",
      cgpa: "No rigid cutoff; exceptional problem-solving and projects required",
      batch: "Freshers & Experienced",
      gapAllowed: "No restriction"
    },
    examPattern: {
      roundsCount: 5,
      assessmentPlatform: "Google Online Challenge (GOC)",
      duration: "60 - 90 mins OA + 45 mins per interview",
      sections: [
        { name: "Google Online Challenge", format: "2 algorithmic problems on Google internal platform / Codeforces style", duration: "60 mins" },
        { name: "Technical Interview 1", format: "Data Structures & Algorithm optimization on Google Docs / CoderPad", duration: "45 mins" },
        { name: "Technical Interview 2", format: "Advanced Graph/DP/Tree problem with non-trivial edge cases", duration: "45 mins" },
        { name: "Technical Interview 3", format: "Algorithm design, complexity trade-offs, and scalability", duration: "45 mins" },
        { name: "Googliness & Leadership", format: "Behavioral interview assessing intellectual humility, bias for collaboration, and ethics", duration: "45 mins" }
      ]
    },
    syllabus: [
      "Advanced DSA: Segment Trees, Disjoint Set Union (DSU), Trie, Graph coloring, Topological Sort, Topological DP",
      "Combinatorics & Number Theory: Modular arithmetic, primes, bit manipulation tricks",
      "CS Fundamentals: Concurrency basics, memory management, Big-O proofs",
      "Googliness: Collaborative mindset, handling ambiguity, ethical decision-making"
    ],
    tips: [
      "No auto-complete or compiler in interviews — you write raw code in Google Docs. Practice writing syntax-clean code without an IDE.",
      "Never jump straight into coding. Spend 5-7 minutes asking clarifying questions, identifying corner cases (empty inputs, duplicates, integer overflow), and establishing test cases.",
      "Google emphasizes mathematical rigor in calculating Time and Space complexity."
    ]
  },
  {
    id: "comp-microsoft",
    name: "Microsoft",
    tier: "Product / MAANG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    ctcRange: "₹25,00,000 - ₹42,00,000 CTC",
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / MCA in CS, IT, ECE, EEE",
      cgpa: "7.0+ CGPA or 70% with no backlogs",
      batch: "2025, 2026 Batch",
      gapAllowed: "Max 1 year"
    },
    examPattern: {
      roundsCount: 4,
      assessmentPlatform: "Codility / Mettl",
      duration: "90 mins OA + 45-60 mins interview rounds",
      sections: [
        { name: "Online Coding Round", format: "3 Coding questions on Codility (Task correctness + Performance tests)", duration: "90 mins" },
        { name: "Technical Round 1", format: "Data Structures (Linked Lists, Trees, Arrays) + Code trace with custom test inputs", duration: "45-60 mins" },
        { name: "Technical Round 2", format: "Algorithms (Dynamic Programming, Recursion) + System fundamentals (OS, Threads)", duration: "45-60 mins" },
        { name: "AA Round (Appropriate Advisor)", format: "Director / Partner level interview: Project deep dive, culture fit, and design thinking", duration: "45 mins" }
      ]
    },
    syllabus: [
      "DSA: Linked List manipulation (LRU cache, cycle detection), Trees & Graphs, Sorting & Searching, Bitwise operations",
      "Operating Systems: Virtual memory, Paging, Threads vs Processes, Thread safety, Deadlocks",
      "DBMS: SQL queries, indexing, ACID transactions",
      "System Design / LLD: Design a parking lot, Design a file system, Design Tic-Tac-Toe"
    ],
    tips: [
      "Codility tests both correctness AND performance (time limit per test case). An O(N^2) solution will score 50% only.",
      "Microsoft places great value on your resume projects. Know every single architectural choice in your projects inside out.",
      "Be prepared to dry run your code manually with pointer diagrams."
    ]
  },
  {
    id: "comp-tcs",
    name: "Tata Consultancy Services (TCS)",
    tier: "IT Services / Mass Recruiter",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    ctcRange: "₹3.36 LPA (Ninja) | ₹7.00 LPA (Digital) | ₹9.00 - ₹11.50 LPA (Prime)",
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc",
      cgpa: "Minimum 60% or 6.0 CGPA throughout 10th, 12th, Diploma, and Degree",
      batch: "2025, 2026 Eligible Batches",
      gapAllowed: "Maximum academic gap of up to 24 months permitted with justification"
    },
    examPattern: {
      roundsCount: 3,
      assessmentPlatform: "TCS iON Platform",
      duration: "165 Minutes Total",
      sections: [
        { name: "Foundation Section (Ninja)", format: "Numerical Ability (20 Q), Reasoning Ability (20 Q), Verbal Ability (25 Q)", duration: "75 mins" },
        { name: "Advanced Section (Digital & Prime)", format: "Advanced Quantitative & Reasoning (15 Q) + Advanced Coding (2 DSA problems)", duration: "90 mins" },
        { name: "Technical & HR Interview", format: "Combined panel (Technical + Managerial + HR) evaluating resume, basic coding, and willingness to relocate", duration: "30-45 mins" }
      ]
    },
    syllabus: [
      "Cognitive: Number system, percentages, work & time, series, syllogisms, reading comprehension",
      "Advanced Coding: Arrays, strings, matrix manipulations, dynamic programming, basic hashing",
      "Technical Subjects: OOPs (Java/C++), basic SQL queries, SDLC models, Web fundamentals",
      "Prime Track: Cloud computing concepts, Generative AI awareness, microservices overview"
    ],
    tips: [
      "There is sectional timing in TCS NQT. You cannot jump back and forth between sections once a section timer runs out.",
      "Coding compilers on TCS iON are strict on standard input/output formats. Make sure your output matches whitespace requirements exactly.",
      "Solving both coding questions with all test cases passed in the Advanced section practically guarantees a Digital or Prime interview invite."
    ]
  },
  {
    id: "comp-infosys",
    name: "Infosys",
    tier: "IT Services / Product Innovation",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    ctcRange: "₹3.6 LPA (System Engineer) | ₹6.5 LPA (DSE) | ₹9.5 LPA (Specialist Programmer)",
    eligibility: {
      degree: "BE / B.Tech / ME / M.Tech / MCA / M.Sc (CS/IT/Electronics)",
      cgpa: "60% or 6.0 CGPA in 10th, 12th and Graduation with no active backlogs",
      batch: "2025, 2026 Graduating Batches",
      gapAllowed: "Up to 2 years allowable with valid medical/education documentation"
    },
    examPattern: {
      roundsCount: 3,
      assessmentPlatform: "Infosys Online Test / HackWithInfy",
      duration: "100 mins (Infy Test) or 180 mins (HackWithInfy Contest)",
      sections: [
        { name: "Infosys Online Test", format: "Reasoning (15 Q), Technical Ability / Math (10 Q), Verbal (20 Q), Pseudocode (5 Q), Numerical Puzzle (4 Q)", duration: "100 mins" },
        { name: "HackWithInfy (SP & DSE track)", format: "3 Competitive Coding problems (Medium to Hard: DP, Graphs, Greedy)", duration: "180 mins" },
        { name: "Technical + HR Interview", format: "Interview on data structures, projects, OOP concepts, and situation handling", duration: "30-40 mins" }
      ]
    },
    syllabus: [
      "Reasoning: Cryptarithmetic puzzles, data sufficiency, visual reasoning, syllogisms",
      "Pseudocode: C/C++/Java snippet output prediction, loops, pointers, recursion stack tracing",
      "Competitive Coding: Dynamic Programming, Graph Theory, Segment Trees, Prefix Sums, Greedy",
      "CS Core: DBMS normalization, SQL joins, OOPs concepts with real-world examples"
    ],
    tips: [
      "Infosys test includes Cryptarithmetic puzzles (e.g., SEND + MORE = MONEY). Practice the mapping rules (unique digits 0-9) to secure full marks in puzzles.",
      "For Specialist Programmer (₹9.5 LPA), bypass the standard test and compete in **HackWithInfy**. Solving 2.5 to 3 problems secures direct SP interview calls.",
      "Revise Java or Python OOP concepts; Infosys places heavy emphasis on object-oriented thinking."
    ]
  },
  {
    id: "comp-accenture",
    name: "Accenture",
    tier: "IT & Global Consulting",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    ctcRange: "₹4.5 LPA (Associate Software Engineer) | ₹6.5 LPA (Advanced ASE / FSE)",
    eligibility: {
      degree: "All B.E/B.Tech/M.E/M.Tech/MCA/M.Sc streams (No branch restriction)",
      cgpa: "Minimum 65% or 6.5 CGPA with zero active backlogs at time of assessment",
      batch: "Current Final Year Batch",
      gapAllowed: "Maximum 1 year gap allowed during education"
    },
    examPattern: {
      roundsCount: 4,
      assessmentPlatform: "Mettl / CoCubes",
      duration: "Elimination-based sequential rounds",
      sections: [
        { name: "Cognitive & Technical Assessment", format: "Cognitive (50 Q) + Technical (40 Q - Pseudocode, Common Applications, MS Office, Networking & Cloud)", duration: "90 mins" },
        { name: "Coding Assessment (Immediate)", format: "2 Coding questions (Hands-on in C, C++, Java, or Python)", duration: "45 mins" },
        { name: "Communication Assessment", format: "Automated Voice AI: Sentence Mastery, Vocabulary, Fluency, Pronunciation", duration: "20 mins" },
        { name: "Virtual Interview", format: "Combined Technical & HR interview based on resume, project challenges, and adaptability", duration: "25-30 mins" }
      ]
    },
    syllabus: [
      "Technical MCQs: Pseudocode output tracing, Cloud fundamentals (IaaS, PaaS, SaaS), Cybersecurity basics, Network topologies",
      "Coding: String transformations, array manipulations, matrix math, hashing",
      "Communication Test: Repeat sentences, answer short questions, story retelling",
      "Interview: Final year project architecture, team management, conflict resolution"
    ],
    tips: [
      "The Cognitive round is an elimination round! If you clear the cutoff, the Coding round unlocks instantly on the same screen.",
      "Pseudocode questions carry significant weight. Focus on bitwise operations (AND, OR, XOR), loop boundaries, and recursion.",
      "The Communication test uses an AI voice grader (Pearson/Versant style). Sit in a quiet room, speak clearly at a natural pace, and do not pause unnecessarily."
    ]
  },
  {
    id: "comp-cognizant",
    name: "Cognizant",
    tier: "IT & Consulting",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Cognizant_logo_2022.svg",
    ctcRange: "₹4.0 LPA (GenC) | ₹5.5 LPA (GenC Elevate) | ₹9.0 LPA (GenC Next)",
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA",
      cgpa: "60% or 6.0 CGPA in 10th, 12th, and Degree",
      batch: "2025, 2026 Batch",
      gapAllowed: "Up to 1 year gap"
    },
    examPattern: {
      roundsCount: 3,
      assessmentPlatform: "Superset / AMCAT",
      duration: "120 - 150 mins",
      sections: [
        { name: "Cognitive Assessment", format: "Quantitative, Logical, and Verbal Ability (AMCAT format)", duration: "60 mins" },
        { name: "GenC Next / Elevate Coding", format: "3 Coding questions (Intermediate to Advanced DSA)", duration: "90 mins" },
        { name: "Technical + HR Interview", format: "Code debugging, live project explanation, SQL queries, behavioral check", duration: "35 mins" }
      ]
    },
    syllabus: [
      "AMCAT Aptitude: Profit & Loss, Logarithms, Permutations, Blood Relations, Deductive Logic",
      "Coding Topics: Two Pointers, Dynamic Programming, Strings, Trees",
      "Core CS: SQL queries (Group By, Joins), OOPs in Java/Python, SDLC"
    ],
    tips: [
      "AMCAT is adaptive: question difficulty increases with consecutive correct answers. Do not rush initial questions.",
      "Aim for the GenC Next track by solving all coding questions in the Elevate/Next section to double your starting compensation."
    ]
  },
  {
    id: "comp-goldman",
    name: "Goldman Sachs",
    tier: "Investment Banking / FinTech",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
    ctcRange: "₹24,00,000 - ₹38,00,000 CTC (Base + Performance Bonus)",
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / Dual Degree (All disciplines welcome)",
      cgpa: "7.0+ CGPA",
      batch: "Graduating batch & pre-final year interns",
      gapAllowed: "Standard academic gaps allowed"
    },
    examPattern: {
      roundsCount: 4,
      assessmentPlatform: "HackerRank (GS Aptitude + Coding)",
      duration: "135 mins OA + 45-60 mins interview rounds",
      sections: [
        { name: "Online Aptitude & Coding", format: "Math/Probability (7 Q) + CS MCQs (7 Q) + Advanced Coding (2 Q) + Subjective Essay", duration: "135 mins" },
        { name: "Technical Round 1", format: "Data Structures & Algorithms (Trees, DP) + Math puzzles", duration: "60 mins" },
        { name: "Technical Round 2", format: "System Architecture, Low-level design, Multithreading & Concurrency", duration: "60 mins" },
        { name: "Hiring Manager & Values", format: "Stress management, financial interest, teamwork, ethical scenarios", duration: "45 mins" }
      ]
    },
    syllabus: [
      "Mathematics: High school & college probability, Baye's theorem, expected values, matrices",
      "DSA: Dynamic Programming, Graph algorithms, Trees, Hash tables",
      "Core Tech: Multi-threading, race conditions, memory leaks, garbage collection (JVM)",
      "Puzzles: Standard quant puzzles (e.g., 25 horses problem, burning ropes, measuring water)"
    ],
    tips: [
      "Goldman Sachs places tremendous emphasis on Probability, Statistics, and Math puzzles alongside DSA.",
      "In coding assessments, test cases include very large constraints where integer overflow and space complexity are strictly penalized.",
      "Explain your mathematical intuition clearly before diving into code."
    ]
  }
];
