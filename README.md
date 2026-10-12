# CareerVantage - Comprehensive Job Portal & Placement Preparation Platform

**CareerVantage** is a modern, responsive web application engineered to give college students and job seekers an all-in-one platform for discovering tech jobs, mastering placement preparation (Aptitude, Core CS, DSA, and HR behavioral rounds), and deciphering company-specific hiring blueprints.

---

## 🚀 Key Modules & Feature Highlights

### 1. 💼 Job Portal
* **Live Search & Multi-Filters:** Filter opportunities by job title, technical skills, company, location (Bangalore, Hyderabad, Pune, Gurgaon, Remote), experience level (Fresher, 0-2 yrs, 1-3 yrs), and job type (Full-Time, Internship).
* **Job Detail Modal:** Detailed job overview, candidate eligibility requirements (Degree, Passing Batch, CGPA cutoff), key responsibilities, hiring round stages, and deadline.
* **1-Click Application System:** Interactive application modal with validation for Name, Email, College, Graduation Year, Resume link, and recruiter notes. Submissions persist to `localStorage`.
* **Employer "+ Post a Job" Feature:** Recruiters or admins can publish new job listings on the fly, instantly rendered in the live directory with `localStorage` persistence.
* **Bookmark & Saved Jobs:** Save interesting jobs with a heart icon and view them anytime in the **My Tracker** tab.

---

### 2. 📚 Comprehensive Preparation Hub
* **🧮 Quantitative, Logical & Verbal Aptitude:**
  * Formula cheat sheets and notes on Time-Speed-Distance, Time & Work, Profit-Loss, Probability, Blood Relations, Syllogisms, and Sentence Correction.
  * **Interactive Practice Arena:** Multiple-choice questions with instant correct/incorrect feedback and detailed mathematical explanations.
* **💻 Technical CS Fundamentals:**
  * **DBMS & SQL:** ACID properties, Normalization (1NF to BCNF), Indexing (B+ Trees), SQL vs NoSQL, and Nth highest salary queries.
  * **Operating Systems:** Process vs Thread lifecycle, Mutex vs Semaphore, Deadlock handling, Virtual Memory, and Paging.
  * **Computer Networks:** OSI 7 layers vs TCP/IP, TCP 3-way handshake, HTTP/1.1 vs HTTP/2 vs HTTP/3, and DNS resolution lifecycle.
  * **Object-Oriented Programming (OOP) & SOLID:** Encapsulation, Abstraction, Polymorphism (vtable), and SOLID principles breakdown.
* **🤝 HR & Behavioral Interview Preparation:**
  * **The STAR Method Guide:** Detailed steps for Situation, Task, Action, Result.
  * **The 2-Minute Elevator Pitch:** Present ➔ Past ➔ Future formula for answering *"Tell me about yourself"*.
  * **Top 15+ Behavioral Questions:** What interviewers evaluate, recommended structure, word-by-word model answers, and critical red flags to avoid.

---

### 3. 🏢 Company Hiring Process Blueprints
* Detailed hiring blueprints for top tech product giants and mass recruiters:
  * **Amazon, Google, Microsoft, Goldman Sachs, TCS (Ninja, Digital & Prime), Infosys (SE & Specialist Programmer), Accenture (ASE & FSE), Cognizant (GenC, Elevate & Next).**
* **Each blueprint includes:**
  * CTC / Compensation range (Base + Stocks + Sign-on).
  * Minimum eligibility criteria, CGPA cutoffs, allowed backlogs, and academic gaps.
  * Round-by-round breakdown (Cognitive, Coding, Technical Interviews, Bar Raiser / Leadership rounds).
  * Section durations and test platform (HackerRank, Codility, TCS iON, Mettl).
  * Core syllabus topics and company-specific tips (e.g., Amazon 16 Leadership Principles, Infosys Cryptarithmetic, Accenture Pseudocode).

---

### 4. 🧠 Dedicated Topic-Wise DSA Preparation Sheet
* Curated SDE sheet categorized into 12 core algorithmic areas:
  * Arrays, Strings, Two Pointers & Sliding Window, Linked Lists, Stacks & Queues, Binary Trees & BST, Dynamic Programming, Graphs, and more.
* **Live Progress Tracking:**
  * Interactive status checkboxes to mark problems as solved.
  * Real-time progress bar calculation (`X of Y Solved (Z%)`).
  * Persisted across browser sessions using `localStorage`.
* **Multi-Language Solutions Modal:**
  * Detailed problem statement and LeetCode/GFG practice links.
  * Optimal intuition and step-by-step approach.
  * Time and Space complexity analysis.
  * Multi-language code implementations (**C++**, **Java**, and **Python 3**) with a 1-click **Copy Code** button.

---

### 5. 📌 Application Tracker & Bookmarks
* Track all submitted job applications with real-time status badges (*Application Submitted*, *Under Review*).
* Manage bookmarked jobs with quick-apply actions.

---

## 📂 File Architecture

```
Digital Committee/
├── index.html               # Main single-page web app container
├── styles.css               # Modern styling, dark mode, animations & responsive grid
├── app.js                   # Application state, event handlers, and UI rendering
├── data/
│   ├── jobs.js              # Job listings dataset with real company openings
│   ├── prep-aptitude.js     # Aptitude notes, formula sheets, and practice MCQs
│   ├── prep-technical.js    # CS Core fundamentals, cheat sheets, and interview Q&As
│   ├── prep-hr.js           # STAR framework, pitch structure, and behavioral Q&As
│   ├── companies.js         # Company hiring blueprints, syllabus, and exam patterns
│   └── dsa-sheet.js         # Topic-wise DSA problems with C++, Java, & Python code
└── README.md                # Project documentation
```

---

## 💻 How to Open and Run

Simply open [index.html](file:///e:/AI%20course/Digital%20Committee/index.html) in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari):

1. Double-click `index.html` or right-click and choose **"Open with Google Chrome"** (or Edge).
2. Everything is self-contained with zero external server dependencies, instant load times, and persistent data storage in your browser.
