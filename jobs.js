/**
 * Job Listings Dataset
 * Includes diverse tech, product, and entry-level positions with real company details.
 */
const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Software Development Engineer - I (SDE-1)",
    company: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg",
    location: "Bangalore, India",
    type: "Full-Time",
    experience: "0-2 Years",
    salary: "₹18,00,000 - ₹24,00,000 / year",
    category: "Software Engineering",
    postedDate: "2 days ago",
    deadline: "2026-11-15",
    tags: ["Java", "DSA", "AWS", "System Design", "OOP"],
    description: "Amazon is looking for passionate SDE-1 engineers to design, build, and deploy high-performance scalable systems. You will collaborate with senior engineers and product managers to launch features serving millions of worldwide customers.",
    eligibility: {
      degree: "B.Tech / B.E / M.Tech / MCA in CS, IT, or related field",
      batch: "2024, 2025, 2026 Graduates",
      cgpa: "7.0+ CGPA with no active backlogs"
    },
    responsibilities: [
      "Write clean, maintainable, and high-throughput production code in Java or C++.",
      "Participate in design reviews and implement robust microservices.",
      "Troubleshoot production incidents and optimize database queries.",
      "Work closely with AWS services including DynamoDB, SQS, S3, and Lambda."
    ],
    skillsRequired: ["Data Structures & Algorithms", "Java/C++", "Object-Oriented Design", "DBMS & SQL", "RESTful APIs"],
    rounds: ["Online Coding Assessment (2 DSA problems)", "Technical Round 1 (Data Structures)", "Technical Round 2 (Algorithms & Problem Solving)", "Bar Raiser + Amazon Leadership Principles"]
  },
  {
    id: "job-2",
    title: "Associate Software Engineer (ASE)",
    company: "Accenture",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    location: "Hyderabad / Pune / Gurgaon",
    type: "Full-Time",
    experience: "Fresher (0-1 Year)",
    salary: "₹4,50,000 - ₹6,50,000 / year",
    category: "Software Engineering",
    postedDate: "1 day ago",
    deadline: "2026-11-20",
    tags: ["Java", "Python", "SQL", "Cloud Basics", "Fresher Hiring"],
    description: "Accenture is hiring Associate Software Engineers for cross-functional agile teams. You will work on cutting-edge enterprise modernization, full-stack development, and cloud deployments.",
    eligibility: {
      degree: "BE / B.Tech / MCA / M.Sc (CS/IT)",
      batch: "2025, 2026 Batch",
      cgpa: "6.5 CGPA or 65% aggregate throughout 10th, 12th, and Graduation"
    },
    responsibilities: [
      "Develop and test software modules adhering to client specifications.",
      "Collaborate in Agile sprint cycles with CI/CD automation.",
      "Maintain documentation, defect resolution, and code refactoring."
    ],
    skillsRequired: ["Core Java / Python / C#", "Basic SQL", "Problem Solving", "Web Basics (HTML/CSS/JS)"],
    rounds: ["Cognitive & Technical Assessment", "Coding Round (2 questions)", "Communication Assessment", "HR & Technical Interview"]
  },
  {
    id: "job-3",
    title: "Frontend Developer (React / Next.js)",
    company: "Swiggy",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg",
    location: "Remote / Bangalore",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "₹14,00,000 - ₹20,00,000 / year",
    category: "Frontend Development",
    postedDate: "Just now",
    deadline: "2026-11-10",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"],
    description: "Join Swiggy's consumer tech squad to build lightning-fast web and mobile-web experiences. You will lead UI engineering, optimize Core Web Vitals, and build interactive checkout flows.",
    eligibility: {
      degree: "Any Graduate with solid frontend portfolio",
      batch: "All eligible batches",
      cgpa: "No minimum cutoff"
    },
    responsibilities: [
      "Architect reusable, accessible UI component systems in React and TypeScript.",
      "Optimize web performance, reducing LCP, CLS, and FID metrics.",
      "Integrate backend GraphQL and REST APIs with offline caching."
    ],
    skillsRequired: ["React", "TypeScript", "Next.js", "State Management (Redux/Zustand)", "Web Performance Optimization"],
    rounds: ["Machine Coding Round (Build a feature in 90 mins)", "Frontend Deep Dive (JavaScript internals, DOM, CSS)", "System Design (Frontend Architecture)", "Hiring Manager Round"]
  },
  {
    id: "job-4",
    title: "Graduate Engineer Trainee - Digital & Prime",
    company: "Tata Consultancy Services (TCS)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
    location: "Pan India (Mumbai, Chennai, Bangalore, Kolkata, Delhi NCR)",
    type: "Full-Time",
    experience: "Fresher",
    salary: "₹7,00,000 - ₹9,00,000 / year (Prime Track)",
    category: "Entry Level",
    postedDate: "3 days ago",
    deadline: "2026-11-30",
    tags: ["Python", "DSA", "Machine Learning", "Cloud", "TCS NQT"],
    description: "TCS National Qualifier Test (NQT) hiring for Digital and Prime roles. Work on advanced engineering, cloud transformations, artificial intelligence, and cybersecurity projects.",
    eligibility: {
      degree: "B.E / B.Tech / M.E / M.Tech / MCA / M.Sc",
      batch: "2025, 2026 Passouts",
      cgpa: "60% or 6.0 CGPA throughout academics with max 1 active backlog"
    },
    responsibilities: [
      "Participate in comprehensive initial training in high-demand technologies.",
      "Design algorithms, data processing pipelines, or full-stack applications.",
      "Work with global enterprise clients across finance, retail, and healthcare."
    ],
    skillsRequired: ["Problem Solving", "C++ / Java / Python", "Data Structures", "Basics of AI/ML or Cloud"],
    rounds: ["TCS NQT Cognitive Assessment", "Advanced Coding Round (DSA)", "Technical Interview", "Managerial & HR Interview"]
  },
  {
    id: "job-5",
    title: "Backend Engineer (Golang / Distributed Systems)",
    company: "Razorpay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    location: "Bangalore, India",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "₹16,00,000 - ₹25,00,000 / year",
    category: "Backend Development",
    postedDate: "4 days ago",
    deadline: "2026-11-18",
    tags: ["Golang", "Microservices", "Kafka", "PostgreSQL", "Docker"],
    description: "Razorpay powers payments for millions of businesses. We are looking for backend engineers who love low latency, extreme fault-tolerance, and distributed transaction pipelines.",
    eligibility: {
      degree: "B.Tech/B.E in Computer Science or equivalent",
      batch: "2023 - 2025 Graduates",
      cgpa: "No bar; strong engineering fundamentals required"
    },
    responsibilities: [
      "Build high-concurrency payment gateway microservices in Go.",
      "Design event-driven data streaming pipelines with Apache Kafka.",
      "Ensure 99.999% uptime with idempotent payment reconciliation workflows."
    ],
    skillsRequired: ["Golang or Java", "Distributed Systems", "SQL & Database Indexing", "Message Queues (Kafka/RabbitMQ)", "Redis"],
    rounds: ["Coding Round (Algorithms & Data Structures)", "Low-Level System Design (LLD)", "High-Level System Design (HLD)", "Culture & Leadership Round"]
  },
  {
    id: "job-6",
    title: "Software Engineering Intern - Summer 2027",
    company: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    location: "Hyderabad / Noida / Bangalore",
    type: "Internship",
    experience: "Pre-Final Year Students",
    salary: "₹1,25,000 / month (Stipend + Housing)",
    category: "Internship",
    postedDate: "5 days ago",
    deadline: "2026-11-25",
    tags: ["C++", "Algorithms", "Internship", "Azure", "Problem Solving"],
    description: "Join Microsoft as a Software Engineering Intern. Spend your summer solving hard real-world problems on products like Azure, Teams, Windows, or Developer Division, with pre-placement offer (PPO) opportunity.",
    eligibility: {
      degree: "B.Tech / M.Tech in CS, IT, ECE or related engineering field",
      batch: "Graduating in Summer 2027",
      cgpa: "7.5+ CGPA or equivalent"
    },
    responsibilities: [
      "Develop new features and contribute to core Microsoft products.",
      "Work alongside mentors and collaborate in a global development team.",
      "Present project outcomes to engineering leadership at the end of internship."
    ],
    skillsRequired: ["Data Structures & Algorithms", "C++ or C# or Python", "Basic Object-Oriented Principles", "Strong problem-solving capability"],
    rounds: ["Online Assessment (3 DSA problems)", "Technical Round 1 (Coding & Debugging)", "Technical Round 2 (Data Structures & Systems)", "AA Round (Appropriate Advisor / Final Interview)"]
  },
  {
    id: "job-7",
    title: "Specialist Programmer (Power Programmer)",
    company: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    location: "Mysore / Bangalore / Pune",
    type: "Full-Time",
    experience: "Fresher",
    salary: "₹9,50,000 / year",
    category: "Software Engineering",
    postedDate: "6 days ago",
    deadline: "2026-12-05",
    tags: ["Dynamic Programming", "Competitive Programming", "Java", "Python", "HackWithInfy"],
    description: "Specialist Programmer (SP) is Infosys's premier developer hiring track for high-performing algorithmic programmers. Hired candidates work on cutting-edge deep tech and architecture.",
    eligibility: {
      degree: "B.E / B.Tech / M.Tech / MCA",
      batch: "2025, 2026 Batch",
      cgpa: "6.0+ CGPA or 60% with zero backlogs"
    },
    responsibilities: [
      "Tackle complex algorithmic challenges and design scalable components.",
      "Lead prototyping of AI, cloud-native, and high-performance applications.",
      "Mentor junior team members on coding best practices."
    ],
    skillsRequired: ["Advanced DSA (DP, Graphs, Segment Trees)", "C++ / Java / Python", "Competitive Programming"],
    rounds: ["HackWithInfy / InfyTQ Round 1 (DSA Contest)", "Grand Finale / Round 2 (Advanced Coding)", "Technical Interview on Projects & Algorithms", "HR Discussion"]
  },
  {
    id: "job-8",
    title: "Data Analyst / BI Specialist",
    company: "Deloitte",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
    location: "Gurgaon / Hyderabad / Mumbai",
    type: "Full-Time",
    experience: "0-2 Years",
    salary: "₹7,50,000 - ₹11,00,000 / year",
    category: "Data & Analytics",
    postedDate: "1 week ago",
    deadline: "2026-11-28",
    tags: ["SQL", "PowerBI", "Python", "Tableau", "Excel"],
    description: "Deloitte is looking for enthusiastic Data Analysts to turn complex enterprise data into strategic business intelligence, dashboards, and automated forecasting models.",
    eligibility: {
      degree: "B.Tech, B.Sc Statistics, BCA, MCA, or MBA with analytical background",
      batch: "2024, 2025, 2026",
      cgpa: "6.5+ CGPA"
    },
    responsibilities: [
      "Write advanced SQL queries, window functions, and data transformations.",
      "Build interactive executive dashboards in Power BI and Tableau.",
      "Perform exploratory data analysis using Python (Pandas, NumPy, Seaborn)."
    ],
    skillsRequired: ["Advanced SQL", "Power BI / Tableau", "Python for Data Analysis", "Business Communication", "Statistical Modeling"],
    rounds: ["Aptitude & Case Study Assessment", "SQL & Analytics Technical Round", "Client Business Simulation Interview", "Partner / HR Round"]
  }
];
