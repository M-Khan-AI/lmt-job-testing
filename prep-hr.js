/**
 * HR & Behavioral Interview Preparation Guide
 * Frameworks (STAR, Elevator Pitch) & High-Frequency Questions with Model Answers
 */

const HR_DATA = {
  frameworks: [
    {
      id: "star-method",
      name: "The STAR Method",
      badge: "Standard for Behavioral Questions",
      description: "Structured storytelling framework used by Google, Amazon (Leadership Principles), Microsoft, and top tech recruiters.",
      steps: [
        { letter: "S", title: "Situation", tip: "Set the context. Describe the specific challenge, project, or event with concise background." },
        { letter: "T", title: "Task", tip: "Explain your specific responsibility or what goal needed to be accomplished." },
        { letter: "A", title: "Action", tip: "Highlight YOUR individual contribution (Use 'I' instead of just 'we'). What skills and tools did you employ?" },
        { letter: "R", title: "Result", tip: "Quantify the outcome! Share numbers, percentages, speedups, lessons learned, or positive impacts." }
      ]
    },
    {
      id: "elevator-pitch",
      name: "The 2-Minute Elevator Pitch",
      badge: "For 'Tell Me About Yourself'",
      description: "Structure: Present (Current role & top skills) -> Past (Academic/Project highlights & proof points) -> Future (Why this specific company & role).",
      steps: [
        { letter: "1", title: "Present", tip: "Who you are right now, your major domain, and current focus (e.g. final year CS student specializing in full-stack development)." },
        { letter: "2", title: "Past", tip: "1 or 2 high-impact projects or internship achievements that prove your technical ability." },
        { letter: "3", title: "Future", tip: "Why this specific team and company align with your career roadmap." }
      ]
    }
  ],
  questions: [
    {
      id: "hr-1",
      question: "Tell me about yourself.",
      category: "Introduction",
      whatTheyEvaluate: "Communication clarity, confidence, relevance of experience, and whether you can summarize your story succinctly without reciting your resume verbatim.",
      idealStructure: "Present -> Past Achievements -> Why this role (60 to 90 seconds).",
      modelAnswer: `Hello! I am a final-year Computer Science student passionate about building scalable web applications and algorithmic problem-solving. Over the past two years, I've developed deep proficiency in Java, React, and relational database design.

During my recent internship at an edtech startup, I revamped their student dashboard, which reduced page load times by 35% and served over 15,000 active users. Alongside development, I'm an active competitive programmer having solved over 350+ DSA problems across LeetCode and GeeksforGeeks.

I've been following your engineering team's recent work on microservices modernization, and I'm eager to bring my strong technical foundations and fast-learning attitude to this Software Engineer role.`,
      redFlagsToAvoid: [
        "Don't recite your high school marks or irrelevant personal hobbies.",
        "Don't speak for longer than 2.5 minutes.",
        "Don't say 'You have everything in my resume already'."
      ]
    },
    {
      id: "hr-2",
      question: "What is your greatest weakness?",
      category: "Self Awareness",
      whatTheyEvaluate: "Authentic self-awareness, willingness to improve, and whether you have active strategies to mitigate your shortcomings.",
      idealStructure: "Genuine weakness (non-fatal to the role) -> Concrete action taken to overcome it -> Measurable progress.",
      modelAnswer: `Earlier in my college projects, I tended to take on too many tasks simultaneously and hesitated to delegate, believing that doing it all myself was the fastest route. In one major hackathon, this caused me to burn out before the final pitch.

Recognizing this, I started adopting agile sprint boards (Trello/Notion) and actively communicating task distributions with teammates. Now, I establish clear ownership boundaries and schedule daily async check-ins. This has significantly enhanced both my delegation skills and overall team velocity.`,
      redFlagsToAvoid: [
        "Never say cliché humblebrags like 'I am too much of a perfectionist' or 'I work too hard'.",
        "Never mention core job deal-breakers like 'I hate coding' or 'I am bad at meeting deadlines'.",
        "Never say 'I don't have any weaknesses'."
      ]
    },
    {
      id: "hr-3",
      question: "Describe a situation where you had a conflict with a teammate and how you handled it.",
      category: "Conflict Resolution",
      whatTheyEvaluate: "Emotional intelligence (EQ), mature collaboration, objective problem solving, and ability to separate people from ideas.",
      idealStructure: "Situation & Task -> The disagreement -> How you initiated discussion -> Data-driven resolution -> Result.",
      modelAnswer: `During our capstone project, my teammate and I disagreed on whether to use MongoDB or PostgreSQL for our healthcare application backend. He advocated for MongoDB due to fast setup, while I was concerned about data integrity and ACID compliance for medical records.

Instead of arguing in circles, I scheduled a one-on-one session where we mapped out our data relationships. I highlighted the necessity of strict relational schemas and financial transaction rollback requirements. To balance his concern regarding development velocity, I suggested using Prisma ORM with PostgreSQL to keep migrations and queries swift.

He appreciated the objective compromise, and we delivered the project on time with zero schema inconsistencies during production testing.`,
      redFlagsToAvoid: [
        "Don't blame your teammate or speak negatively about their competence.",
        "Don't claim you've never had a conflict; conflict is natural in engineering.",
        "Don't say the professor or manager stepped in to resolve it for you."
      ]
    },
    {
      id: "hr-4",
      question: "Why do you want to join our company?",
      category: "Company Fit",
      whatTheyEvaluate: "Did you do your homework? Are you excited about this specific company or just applying to every listing on the internet?",
      idealStructure: "Company mission/product admiration -> Culture/tech stack alignment -> How your skills contribute.",
      modelAnswer: `I have been following your engineering blog, particularly the recent write-up about how your team migrated to distributed microservices handling 50k requests per second. As someone fascinated by high-throughput backend architecture, working on systems at that scale is inspiring.

Furthermore, your company culture emphasizes continuous learning and mentorship for early-career developers. With my strong fundamentals in data structures, API design, and a proactive mindset, I know I can hit the ground running while absorbing best practices from world-class engineers.`,
      redFlagsToAvoid: [
        "Don't talk about salary, free food, or flexible work hours as primary reasons.",
        "Don't give generic answers that could apply to any other tech company."
      ]
    },
    {
      id: "hr-5",
      question: "Do you have any questions for us?",
      category: "Closing",
      whatTheyEvaluate: "Your curiosity, enthusiasm, and strategic mindset. Candidates who ask smart questions leave a lasting impression.",
      idealStructure: "Pick 2 or 3 thoughtful questions about team culture, engineering challenges, or day-to-day expectations.",
      modelAnswer: `1. 'What does a typical day look like for a software engineer joining this specific squad?'
2. 'What are the biggest technical or architectural challenges the team is currently tackling this quarter?'
3. 'How does the team measure success for someone in this role during the first 90 days?'`,
      redFlagsToAvoid: [
        "Never say 'No, you answered everything' or 'No questions'.",
        "Don't ask about leaves, vacation policy, or promotion cycles in the first round."
      ]
    }
  ]
};
