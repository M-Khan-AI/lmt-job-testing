/**
 * Technical Preparation: Core CS Fundamentals & Interview Notes
 * DBMS, Operating Systems, Computer Networks, OOP, System Design & SQL
 */

const TECHNICAL_DATA = [
  {
    id: "tech-dbms",
    category: "DBMS & SQL",
    title: "Database Management Systems",
    icon: "database",
    summary: "Relational models, SQL queries, indexing, transactions, ACID properties, and normalization.",
    cheatSheet: [
      "ACID: Atomicity (All or None), Consistency (Valid states), Isolation (Concurrent safety), Durability (Committed data persists).",
      "Normalization: 1NF (Atomic values), 2NF (No partial dependency on composite PK), 3NF (No transitive dependency), BCNF (Every determinant is a candidate key).",
      "Clustered Index: Sorts data rows physically (only 1 per table); Non-Clustered: Separate structure with pointers to rows (multiple allowed).",
      "SQL Execution Order: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT."
    ],
    detailedNotes: `
### 1. ACID Properties Deep Dive
- **Atomicity**: Managed by transaction log (Undo/Redo logs). If any query fails, the entire transaction rolls back.
- **Consistency**: Guarantees that constraints (foreign keys, checks, unique) remain intact before and after execution.
- **Isolation**: Prevents race conditions. ANSI Isolation Levels:
  1. *Read Uncommitted* (Dirty reads possible)
  2. *Read Committed* (Non-repeatable reads possible)
  3. *Repeatable Read* (Phantom reads possible)
  4. *Serializable* (Highest isolation, strictly ordered via locks/MVCC)
- **Durability**: Ensures committed writes are recorded in non-volatile storage (WAL - Write-Ahead Logging).

### 2. SQL vs NoSQL Tradeoffs
- **SQL (PostgreSQL, MySQL)**: Schema-enforced, relational, strong ACID, vertical scaling, optimal for complex joins and financial ledgers.
- **NoSQL (MongoDB, Cassandra, DynamoDB)**: Flexible schema, document/key-value/columnar, horizontal scaling, eventual consistency (BASE), ideal for rapid schema iterations and big data.
    `,
    interviewQuestions: [
      {
        question: "How do you find the Nth highest salary in an Employee table in SQL?",
        answer: `Using \`DENSE_RANK()\` window function:
\`\`\`sql
WITH RankedSalaries AS (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rank_num
    FROM Employee
)
SELECT salary FROM RankedSalaries WHERE rank_num = N LIMIT 1;
\`\`\`
Or using standard \`LIMIT\` offset:
\`\`\`sql
SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET (N - 1);
\`\`\``
      },
      {
        question: "Explain the difference between DELETE, TRUNCATE, and DROP.",
        answer: "• **DELETE**: DML command. Deletes specific rows using a WHERE clause. Can be rolled back. Fires database triggers. Slower because it logs each row deletion.\n• **TRUNCATE**: DDL command. Deletes all rows in a table while keeping the table structure. Deallocates data pages. Cannot be filtered with WHERE. Much faster than DELETE.\n• **DROP**: DDL command. Completely deletes the table schema, definitions, and all data from the database entirely."
      },
      {
        question: "What is Database Indexing and how does a B+ Tree work?",
        answer: "An index is an auxiliary data structure that reduces the number of disk I/O operations required to look up records. Relational databases predominantly use B+ Trees because:\n1. All leaf nodes are linked sequentially at the same level, making range queries (BETWEEN, >, <) extremely fast.\n2. Internal nodes only store keys (routers), maximizing branching factor and keeping tree height low (typically 3-4 levels for millions of records)."
      }
    ]
  },
  {
    id: "tech-os",
    category: "Operating Systems",
    title: "Operating Systems",
    icon: "cpu",
    summary: "Process management, multithreading, CPU scheduling, deadlocks, and virtual memory.",
    cheatSheet: [
      "Process vs Thread: Process has its own virtual address space; Threads share memory (heap, code, data) of the parent process.",
      "Deadlock Conditions (Coffman): Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
      "Virtual Memory: Allows execution of processes not entirely in physical RAM using Paging & Swapping.",
      "Thrashing: When the OS spends more time swapping pages in/out of disk than executing CPU instructions."
    ],
    detailedNotes: `
### 1. Process Lifecycle & State Machine
A process transitions through:
- **New** -> **Ready** (admitted to ready queue) -> **Running** (scheduled to CPU) -> **Waiting/Blocked** (waiting for I/O) -> **Terminated**.
- **Context Switching**: The OS saves the CPU registers, program counter, and stack pointer of the active process into its Process Control Block (PCB) and loads another.

### 2. Deadlock Handling Strategies
- **Prevention**: Invalidate at least one of the 4 Coffman conditions (e.g., impose strict linear ordering on resources to break circular wait).
- **Avoidance**: Banker's Algorithm (checks if granting a resource request leaves the system in a 'Safe State').
- **Detection & Recovery**: Maintain resource-allocation graph; kill processes or preempt resources when cycles are detected.
    `,
    interviewQuestions: [
      {
        question: "What is the difference between a Mutex and a Semaphore?",
        answer: "• **Mutex (Mutual Exclusion)**: A locking mechanism with ownership. Only the thread that locked the mutex can unlock it. Strictly used for protecting critical sections (binary 0 or 1).\n• **Semaphore**: A signaling mechanism without ownership. Any thread can signal (increment) or wait (decrement). Counting semaphores allow up to N concurrent threads to access a pool of resources."
      },
      {
        question: "What is Virtual Memory and how does Paging prevent external fragmentation?",
        answer: "Virtual memory maps virtual addresses into physical frames in RAM using a **Page Table**. Physical memory is split into fixed-size frames (usually 4KB), and virtual memory into pages of the same size. Because any virtual page can fit into any free physical frame anywhere in RAM, external fragmentation is eliminated completely (though slight internal fragmentation can exist in the last page)."
      }
    ]
  },
  {
    id: "tech-cn",
    category: "Computer Networks",
    title: "Computer Networks",
    icon: "globe",
    summary: "OSI & TCP/IP models, TCP 3-way handshake, HTTP/HTTPS, DNS resolution, and sockets.",
    cheatSheet: [
      "OSI 7 Layers: Physical, Data Link, Network (IP), Transport (TCP/UDP), Session, Presentation, Application (HTTP/DNS).",
      "TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK (Establishes connection).",
      "TCP vs UDP: TCP is connection-oriented, reliable, ordered, and flow-controlled. UDP is connectionless, fast, lightweight (DNS, VoIP, gaming).",
      "HTTPS: HTTP over TLS/SSL (Asymmetric encryption for handshake & key exchange + Symmetric encryption for bulk data transfer)."
    ],
    detailedNotes: `
### What happens when you type https://google.com in a browser?
1. **URL Parsing & Browser Cache**: Browser checks its own cache, OS cache, and router cache for IP.
2. **DNS Resolution**: If not cached, sends query to Local Recursive Resolver -> Root Nameserver -> TLD Nameserver (.com) -> Authoritative Nameserver (google.com) to get IP.
3. **TCP Connection**: Three-way handshake (SYN, SYN-ACK, ACK) with the server IP on port 443.
4. **TLS Handshake**: Client and server negotiate cipher suites, authenticate server via SSL certificate, and generate shared symmetric session keys.
5. **HTTP Request/Response**: Browser sends \`GET /\`, server returns HTML.
6. **Rendering Engine**: Browser parses HTML -> builds DOM tree -> parses CSS -> builds CSSOM -> Render Tree -> Layout -> Paint.
    `,
    interviewQuestions: [
      {
        question: "Why does TCP perform a 3-way handshake instead of a 2-way handshake?",
        answer: "A 2-way handshake (SYN, ACK) is insufficient because the client cannot confirm that the server received its initial sequence number, and old duplicate connection requests floating in the network could cause the server to allocate phantom resources for dead sessions. The 3-way handshake ensures bidirectional verification of sequence numbers before data exchange begins."
      },
      {
        question: "Compare HTTP/1.1, HTTP/2, and HTTP/3.",
        answer: "• **HTTP/1.1**: Persistent connections, but suffers from Head-of-Line (HoL) blocking at the application layer (requests must be processed sequentially per connection).\n• **HTTP/2**: Introduces binary framing, multiplexing multiple streams over a single TCP connection, and header compression (HPACK). However, packet loss still stalls all streams at the TCP level.\n• **HTTP/3**: Built on top of **QUIC (over UDP)**. Eliminates TCP Head-of-Line blocking entirely, offers zero-RTT connection establishment, and seamless connection migration across network changes."
      }
    ]
  },
  {
    id: "tech-oop",
    category: "Object-Oriented Programming",
    title: "OOP & SOLID Principles",
    icon: "layers",
    summary: "Encapsulation, abstraction, inheritance, polymorphism, and clean architecture principles.",
    cheatSheet: [
      "Encapsulation: Bundling data and methods into a single unit and restricting direct access using private/protected access modifiers.",
      "Abstraction: Hiding implementation details and exposing only the essential interface (Abstract classes, Interfaces).",
      "Polymorphism: Compile-time (Method Overloading) and Run-time (Method Overriding via Virtual Tables).",
      "SOLID: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion."
    ],
    detailedNotes: `
### SOLID Principles Breakdown
- **S - Single Responsibility Principle**: A class should have one, and only one, reason to change.
- **O - Open/Closed Principle**: Software entities should be open for extension, but closed for modification.
- **L - Liskov Substitution Principle**: Subtypes must be substitutable for their base types without altering correctness.
- **I - Interface Segregation Principle**: Clients should not be forced to depend on interfaces they do not use. Prefer small, focused interfaces.
- **D - Dependency Inversion Principle**: High-level modules should not depend on low-level modules; both should depend on abstractions.
    `,
    interviewQuestions: [
      {
        question: "What is the difference between Abstract Class and Interface?",
        answer: "• **Abstract Class**: Represents an 'IS-A' relationship. Can contain state (instance variables with state), constructors, and concrete method implementations. A class can extend only one abstract class (single inheritance).\n• **Interface**: Represents a 'CAN-DO' contract. Historically only method signatures (though modern Java/C# allow default methods). Cannot maintain state variables. A class can implement multiple interfaces (multiple inheritance of behavior)."
      },
      {
        question: "Explain Run-time Polymorphism and how Virtual Tables (vtable) work.",
        answer: "Run-time polymorphism occurs when a call to an overridden method is resolved at runtime based on the actual object instance rather than the reference type. In C++/Java, this is accomplished using a **vtable (virtual method table)**. Each class with virtual methods has a static table containing function pointers to the overriding implementations. Each object carries an invisible pointer (**vptr**) pointing to its class vtable."
      }
    ]
  }
];
