// Study Material Data - Comprehensive notes for each topic
export const STUDY_MATERIAL = {
  java: {
    1: {
      title: "Object-Oriented Programming",
      keyPoints: [
        "OOP is a programming paradigm based on objects containing data and methods",
        "Four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction (APIE)",
        "Classes are blueprints, Objects are instances of classes",
        "Benefits: Code reusability, modularity, flexibility, maintainability"
      ],
      concepts: [
        { term: "Encapsulation", def: "Bundling data and methods together, hiding internal details using private access" },
        { term: "Inheritance", def: "Child class inherits properties and methods from parent class using 'extends'" },
        { term: "Polymorphism", def: "Same method behaves differently - Overloading (compile-time) & Overriding (runtime)" },
        { term: "Abstraction", def: "Hiding implementation details, showing only functionality via abstract classes/interfaces" }
      ],
      example: `class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark!"); }
}`,
      tips: "Remember APIE: Abstraction, Polymorphism, Inheritance, Encapsulation"
    },
    2: {
      title: "Classes and Objects",
      keyPoints: [
        "Class = Template/Blueprint, Object = Instance of class",
        "Access Modifiers: public, private, protected, default (package-private)",
        "Constructors: Special methods called when object is created, same name as class",
        "Static members belong to class, not instance - shared by all objects"
      ],
      concepts: [
        { term: "Constructor", def: "Special method to initialize objects. Default constructor has no params. Can overload." },
        { term: "this keyword", def: "Refers to current object instance. Used to differentiate instance vars from params." },
        { term: "Static", def: "Belongs to class, not object. Accessed via ClassName.member. Shared across instances." },
        { term: "Access Modifiers", def: "public: everywhere, private: same class, protected: same package + subclass, default: same package" }
      ],
      example: `class Student {
    private String name;
    private static int count = 0; // shared
    
    public Student(String name) {
        this.name = name;
        count++;
    }
}`,
      tips: "Private = max security, Public = max accessibility"
    },
    3: {
      title: "Inheritance and Polymorphism",
      keyPoints: [
        "Inheritance: Child extends Parent - gets all non-private members",
        "super keyword: Access parent class members and constructor",
        "Method Overloading: Same name, different parameters (compile-time polymorphism)",
        "Method Overriding: Same signature in child, @Override annotation (runtime polymorphism)"
      ],
      concepts: [
        { term: "extends", def: "Keyword to inherit from class. Java supports single inheritance only." },
        { term: "super", def: "Refers to parent class. super() calls parent constructor, super.method() calls parent method." },
        { term: "Overloading", def: "Multiple methods, same name, different params. Resolved at compile time." },
        { term: "Overriding", def: "Child redefines parent method. Same signature. Uses @Override. Runtime resolution." }
      ],
      example: `class Parent {
    void show() { System.out.println("Parent"); }
}
class Child extends Parent {
    @Override
    void show() { System.out.println("Child"); }
    void show(int x) { } // overloading
}`,
      tips: "Overloading = different params, Overriding = same signature"
    },
    4: {
      title: "Abstract Classes & Interfaces",
      keyPoints: [
        "Abstract class: Cannot instantiate, can have abstract + concrete methods",
        "Interface: 100% abstraction (before Java 8), defines contract",
        "Java 8+: Interfaces can have default and static methods",
        "Class implements interface, extends abstract class"
      ],
      concepts: [
        { term: "abstract", def: "Method with no body. Class must be abstract if it has abstract methods." },
        { term: "interface", def: "Contract of methods. Variables are public static final. Methods are public abstract." },
        { term: "implements", def: "Keyword for class to implement interface. Must provide all method implementations." },
        { term: "Multiple Inheritance", def: "Not allowed with classes. Achieved via multiple interfaces." }
      ],
      example: `interface Drawable {
    void draw(); // public abstract by default
    default void info() { System.out.println("Drawable"); }
}
abstract class Shape {
    abstract void area();
    void display() { System.out.println("Shape"); }
}`,
      tips: "Interface = CAN DO (Flyable), Abstract = IS A (Animal)"
    },
    5: {
      title: "Exception Handling",
      keyPoints: [
        "Exception: Runtime error that disrupts normal program flow",
        "try-catch-finally: try contains risky code, catch handles exception, finally always runs",
        "throw: Explicitly throw exception, throws: Declare exception in method signature",
        "Checked exceptions: Must handle (IOException), Unchecked: Optional (NullPointerException)"
      ],
      concepts: [
        { term: "try-catch", def: "try block contains code that might throw exception. catch handles it." },
        { term: "finally", def: "Always executes whether exception occurs or not. Used for cleanup." },
        { term: "throw", def: "Keyword to throw an exception object explicitly: throw new Exception()" },
        { term: "throws", def: "Declares exceptions method might throw: void read() throws IOException" }
      ],
      example: `try {
    int result = 10/0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} finally {
    System.out.println("Always executes");
}`,
      tips: "throw = throw the ball, throws = warns you'll throw"
    },
    6: {
      title: "Packages & Wrapper Classes",
      keyPoints: [
        "Package: Group of related classes and interfaces. Avoids naming conflicts.",
        "import: Brings classes from other packages. java.lang auto-imported.",
        "Wrapper Classes: Object versions of primitives (int → Integer, char → Character)",
        "Autoboxing: Auto convert primitive to wrapper. Unboxing: wrapper to primitive."
      ],
      concepts: [
        { term: "package", def: "Namespace for organizing classes: package com.example; First statement in file." },
        { term: "import", def: "Access classes from other packages: import java.util.ArrayList;" },
        { term: "Wrapper Class", def: "int→Integer, double→Double, char→Character, boolean→Boolean" },
        { term: "Autoboxing", def: "Automatic: Integer x = 5; Unboxing: int y = x;" }
      ],
      example: `package com.myapp;
import java.util.ArrayList;

Integer num = 10; // autoboxing
int val = num;    // unboxing

ArrayList<Integer> list = new ArrayList<>();
list.add(5); // autoboxing`,
      tips: "Wrappers needed for Collections (can't use primitives)"
    },
    7: {
      title: "Multithreading",
      keyPoints: [
        "Thread: Lightweight process, enables concurrent execution",
        "Create thread: Extend Thread class OR implement Runnable interface",
        "Thread lifecycle: New → Runnable → Running → Blocked/Waiting → Terminated",
        "synchronized: Ensures only one thread accesses critical section"
      ],
      concepts: [
        { term: "Thread class", def: "Extend and override run(). Call start() to begin thread." },
        { term: "Runnable", def: "Implement interface, define run(). Pass to Thread constructor." },
        { term: "synchronized", def: "Lock on object/method. Only one thread enters at a time." },
        { term: "wait/notify", def: "wait() releases lock and waits. notify() wakes up waiting thread." }
      ],
      example: `class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}
MyThread t = new MyThread();
t.start(); // NOT t.run()`,
      tips: "start() creates new thread, run() just method call"
    },
    8: {
      title: "Collection Framework",
      keyPoints: [
        "Collection: Framework to store and manipulate groups of objects",
        "List (ordered, duplicates): ArrayList, LinkedList, Vector",
        "Set (unique, unordered): HashSet, LinkedHashSet, TreeSet",
        "Map (key-value pairs): HashMap, LinkedHashMap, TreeMap"
      ],
      concepts: [
        { term: "ArrayList", def: "Dynamic array. Fast random access O(1). Slow insert/delete O(n)." },
        { term: "LinkedList", def: "Doubly linked list. Fast insert/delete O(1). Slow access O(n)." },
        { term: "HashSet", def: "No duplicates, unordered. Uses hashCode(). O(1) operations." },
        { term: "HashMap", def: "Key-value pairs. Allows one null key. Not synchronized. O(1) average." }
      ],
      example: `ArrayList<String> list = new ArrayList<>();
list.add("A"); list.add("B");

HashSet<Integer> set = new HashSet<>();
set.add(1); set.add(1); // only one 1

HashMap<String, Integer> map = new HashMap<>();
map.put("age", 25);`,
      tips: "ArrayList for access, LinkedList for insert/delete, HashSet for unique"
    },
    9: {
      title: "Generics & Annotations",
      keyPoints: [
        "Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces and methods",
        "Provides compile-time type safety and eliminates the need for casts",
        "Annotations provide metadata about a program that is not part of the program itself"
      ],
      concepts: [
        { term: "Generic Class", def: "class Box<T> { T t; } where T is a type parameter." },
        { term: "Wildcards", def: "<?> represents an unknown type. <? extends T> for upper bound." },
        { term: "Annotations", def: "Starts with @. Built-in: @Override, @Deprecated, @SuppressWarnings." }
      ],
      example: `ArrayList<String> list = new ArrayList<>(); // String is type param
@Override
public String toString() { return "Box"; }`,
      tips: "Generics = Type Safety + Reusability"
    },
    10: {
      title: "I/O Streams",
      keyPoints: [
        "Java I/O is used to process input and produce output",
        "Uses stream concept to make I/O faster",
        "Byte Streams (8-bit) vs Character Streams (16-bit)",
        "Serialization: Converting object to byte stream"
      ],
      concepts: [
        { term: "InputStream", def: "Superclass of all byte input streams (e.g., FileInputStream)." },
        { term: "BufferedReader", def: "Reads text from character-input stream, buffering characters for efficiency." },
        { term: "Scanner", def: "Simple text scanner which can parse primitive types and strings using regex." }
      ],
      example: `BufferedReader reader = new BufferedReader(new FileReader("file.txt"));
String line = reader.readLine();`,
      tips: "Always close streams to prevent memory leaks"
    }
  },
  ai: {
    1: {
      title: "Introduction to AI",
      keyPoints: [
        "AI: Machines that mimic cognitive functions like learning and problem-solving",
        "Types: Narrow AI (specific task), General AI (human-level), Super AI (beyond human)",
        "Intelligent Agent: Perceives environment through sensors, acts through actuators",
        "Agent types: Simple reflex, Model-based, Goal-based, Utility-based, Learning"
      ],
      concepts: [
        { term: "Turing Test", def: "Can machine exhibit intelligent behavior indistinguishable from human?" },
        { term: "Agent", def: "Entity that perceives environment and takes actions to achieve goals." },
        { term: "PEAS", def: "Performance, Environment, Actuators, Sensors - describes agent's task." },
        { term: "Rationality", def: "Choosing action that maximizes expected performance measure." }
      ],
      example: `Agent Function: f: Percept* → Action
- Vacuum cleaner agent
- Sensors: Location, Dirt
- Actuators: Wheels, Vacuum
- Actions: Left, Right, Suck`,
      tips: "AI = making machines think and act rationally"
    },
    2: {
      title: "Problem Solving & Search",
      keyPoints: [
        "Search Problem: Initial state, Actions, Transition model, Goal test, Path cost",
        "BFS: Level-by-level, complete, optimal for unit cost, O(b^d) space",
        "DFS: Deep first, not complete in infinite, O(bm) space",
        "A*: Best-first using f(n) = g(n) + h(n), optimal if h is admissible"
      ],
      concepts: [
        { term: "BFS", def: "Breadth-First: Explore level by level. Uses queue. Complete & optimal." },
        { term: "DFS", def: "Depth-First: Go deep first. Uses stack. Not complete in infinite graphs." },
        { term: "A*", def: "f(n) = g(n) + h(n). g=cost so far, h=heuristic estimate to goal." },
        { term: "Admissible", def: "Heuristic never overestimates actual cost. Guarantees optimal solution." }
      ],
      example: `A* Search Example:
f(n) = g(n) + h(n)
If actual cost = 10, h can be 8 (admissible)
h cannot be 12 (overestimates)

BFS: Finds shortest path (fewest edges)
DFS: Memory efficient, may not find shortest`,
      tips: "A* = BFS + heuristic guidance. h(n)=0 makes A* = UCS"
    },
    3: {
      title: "Knowledge Representation",
      keyPoints: [
        "Knowledge: Facts and rules about the world that enable reasoning",
        "Propositional Logic: Simple statements (P, Q) with AND, OR, NOT, IMPLIES",
        "First-Order Logic (FOL): Adds predicates, variables, quantifiers (∀, ∃)",
        "Semantic Networks: Graph of concepts connected by relationships"
      ],
      concepts: [
        { term: "Propositional Logic", def: "Symbols + connectives. P ∧ Q, P ∨ Q, ¬P, P → Q" },
        { term: "FOL", def: "Predicates + quantifiers. ∀x Human(x) → Mortal(x)" },
        { term: "∀ (For all)", def: "Universal quantifier: ∀x means 'for every x'" },
        { term: "∃ (Exists)", def: "Existential quantifier: ∃x means 'there exists an x'" }
      ],
      example: `Propositional: It is raining → Ground is wet
P → Q

FOL: All humans are mortal
∀x Human(x) → Mortal(x)

Socrates is human: Human(Socrates)
∴ Mortal(Socrates)`,
      tips: "FOL is more expressive than propositional logic"
    },
    4: {
      title: "Uncertain Knowledge & Probability",
      keyPoints: [
        "Uncertainty: Real world is not fully observable or deterministic",
        "Probability: P(A) ranges from 0 (impossible) to 1 (certain)",
        "Bayes' Theorem: P(A|B) = P(B|A)P(A) / P(B) - updates beliefs with evidence",
        "Bayesian Networks: DAG representing conditional dependencies"
      ],
      concepts: [
        { term: "Prior P(A)", def: "Probability before seeing evidence" },
        { term: "Likelihood P(B|A)", def: "Probability of evidence given hypothesis" },
        { term: "Posterior P(A|B)", def: "Updated probability after seeing evidence" },
        { term: "Bayes", def: "P(A|B) = P(B|A)P(A) / P(B)" }
      ],
      example: `Disease test: 1% have disease
Test: 99% accurate

P(Disease|Positive) = ?
P(+|D) × P(D) / P(+)
= 0.99 × 0.01 / 0.0198
≈ 50%`,
      tips: "Bayes updates prior belief with new evidence"
    },
    5: {
      title: "Machine Learning Basics",
      keyPoints: [
        "ML: Systems that learn from data without being explicitly programmed",
        "Supervised: Learn from labeled data (classification, regression)",
        "Unsupervised: Find patterns in unlabeled data (clustering)",
        "Reinforcement: Learn through rewards and punishments"
      ],
      concepts: [
        { term: "Supervised", def: "Input-output pairs. Learn mapping. Classification (categories) or Regression (continuous)." },
        { term: "Unsupervised", def: "No labels. Discover patterns. Clustering, dimensionality reduction." },
        { term: "Overfitting", def: "Model memorizes training data, fails on new data. Too complex model." },
        { term: "Underfitting", def: "Model too simple to capture patterns. High bias." }
      ],
      example: `Supervised: Spam detection
- Input: Email text
- Output: Spam / Not Spam
- Train on labeled emails

Unsupervised: Customer segmentation
- Input: Purchase data
- Find natural groupings`,
      tips: "Supervised = teacher, Unsupervised = self-discovery"
    },
    6: {
      title: "Reinforcement Learning",
      keyPoints: [
        "Agent learns by interacting with environment, receiving rewards/penalties",
        "MDP: Markov Decision Process - states, actions, transitions, rewards",
        "Q-Learning: Learn Q(s,a) value function without model of environment",
        "Key parameters: α (learning rate), γ (discount factor), ε (exploration)"
      ],
      concepts: [
        { term: "State", def: "Current situation of the agent in environment" },
        { term: "Action", def: "Choice agent makes in a state" },
        { term: "Reward", def: "Immediate feedback from environment" },
        { term: "Q-value", def: "Expected cumulative reward for action in state" }
      ],
      example: `Q-Learning Update:
Q(s,a) ← Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]

α = learning rate (0.1)
γ = discount factor (0.9)
r = immediate reward`,
      tips: "Q-Learning learns optimal policy through exploration"
    },
    7: {
      title: "Natural Language Processing (NLP)",
      keyPoints: [
        "NLP: Enabling computers to understand, interpret and generate human language",
        "Components: NLU (understanding) and NLG (generation)",
        "Key tasks: Tokenization, Stemming, Lemmatization, POS tagging, Parsing",
        "Word Embeddings: Representing words as vectors (Word2Vec, GloVe)"
      ],
      concepts: [
        { term: "Tokenization", def: "Splitting text into individual words or tokens." },
        { term: "Stemming", def: "Reducing words to their root form (e.g., fishing → fish)." },
        { term: "Transformers", def: "Neural network architecture using attention mechanisms (e.g., BERT, GPT)." }
      ],
      example: `Tokenization: "AI is cool" → ["AI", "is", "cool"]
Stop words removal: "The cat is on the mat" → ["cat", "mat"]`,
      tips: "Attention is all you need for modern NLP"
    }
  },
  se: {
    1: {
      title: "Introduction to Software Engineering",
      keyPoints: [
        "Software Engineering: Systematic approach to development, operation, maintenance",
        "Software characteristics: Maintainability, Dependability, Efficiency, Usability",
        "SDLC: Software Development Life Cycle - phases from concept to retirement",
        "Software crisis: Projects over budget, delayed, low quality - need better methods"
      ],
      concepts: [
        { term: "Software", def: "Programs + documentation + configuration data" },
        { term: "SDLC", def: "Requirements → Design → Develop → Test → Deploy → Maintain" },
        { term: "Stakeholder", def: "Anyone with interest in the project: users, developers, managers" },
        { term: "Legacy System", def: "Old system still in use, hard to maintain/replace" }
      ],
      example: `SDLC Phases:
1. Requirements Analysis
2. System Design
3. Implementation (Coding)
4. Testing
5. Deployment
6. Maintenance`,
      tips: "SE applies engineering principles to software development"
    },
    2: {
      title: "Process Models",
      keyPoints: [
        "Waterfall: Sequential phases, no going back, good for stable requirements",
        "Iterative: Develop in cycles, refine each iteration",
        "Spiral: Risk-driven, combines waterfall + prototyping",
        "Agile: Iterative, collaborative, adaptive to change"
      ],
      concepts: [
        { term: "Waterfall", def: "Linear sequential: Requirements → Design → Code → Test. No overlap." },
        { term: "Agile", def: "Iterative + incremental. Working software over documentation. Respond to change." },
        { term: "Spiral", def: "Risk analysis at each loop. Prototype → Risk → Develop → Plan next." },
        { term: "Scrum", def: "Agile framework: Sprints (2-4 weeks), Daily standups, Product backlog." }
      ],
      example: `Waterfall:
Requirements → Design → Code → Test → Deploy

Scrum Sprint:
Planning → Daily Work → Review → Retrospective
2-4 weeks cycle`,
      tips: "Waterfall = plan-driven, Agile = value-driven"
    },
    3: {
      title: "Requirements Engineering",
      keyPoints: [
        "Requirements: What system should do (functional) and constraints (non-functional)",
        "Elicitation: Gather requirements via interviews, surveys, observation",
        "SRS Document: Software Requirements Specification - detailed requirements doc",
        "Validation: Ensure requirements are complete, consistent, unambiguous"
      ],
      concepts: [
        { term: "Functional", def: "What system does: Login, Calculate, Search, Generate report" },
        { term: "Non-Functional", def: "Quality constraints: Performance, Security, Usability, Reliability" },
        { term: "User Story", def: "As a [user], I want [feature], so that [benefit]" },
        { term: "Use Case", def: "Actor-system interaction sequence to achieve goal" }
      ],
      example: `Functional: "System shall allow user login"
Non-Functional: "Page loads in < 2 seconds"

User Story:
"As a customer, I want to view order history,
so that I can track my purchases"`,
      tips: "Good requirements are SMART: Specific, Measurable, Achievable, Relevant, Time-bound"
    },
    4: {
      title: "Software Design",
      keyPoints: [
        "Design: Transform requirements into blueprint for implementation",
        "Cohesion: How strongly module elements belong together (HIGH = good)",
        "Coupling: Degree of interdependence between modules (LOW = good)",
        "DFD: Data Flow Diagram shows data movement through system"
      ],
      concepts: [
        { term: "Cohesion", def: "Module focus. Functional (best) → Coincidental (worst)." },
        { term: "Coupling", def: "Module dependency. Data coupling (best) → Content (worst)." },
        { term: "DFD", def: "Shows processes, data stores, data flows. Levels 0, 1, 2..." },
        { term: "Modularity", def: "Divide system into modules. Each module = one function." }
      ],
      example: `Good Design:
- High Cohesion: Login module only handles login
- Low Coupling: Modules communicate via interfaces

DFD Symbols:
○ Process
→ Data Flow
═ Data Store
□ External Entity`,
      tips: "HIGH COHESION + LOW COUPLING = Good Design"
    },
    5: {
      title: "Object-Oriented Design",
      keyPoints: [
        "OOD: Design using objects, classes, inheritance, encapsulation",
        "UML: Unified Modeling Language - standard notation for modeling",
        "Design Patterns: Reusable solutions - Singleton, Factory, Observer, etc.",
        "Class Diagram: Shows classes, attributes, methods, relationships"
      ],
      concepts: [
        { term: "UML", def: "Standard modeling language. 14 diagram types." },
        { term: "Class Diagram", def: "Static structure: classes, attributes, methods, relationships" },
        { term: "Sequence Diagram", def: "Time-ordered message exchange between objects" },
        { term: "Design Pattern", def: "Proven solution to common design problem" }
      ],
      example: `Singleton Pattern:
class Database {
    private static Database instance;
    private Database() {}
    public static Database getInstance() {
        if (instance == null)
            instance = new Database();
        return instance;
    }
}`,
      tips: "UML = Universal language for software design"
    },
    7: {
      title: "Coding & Testing",
      keyPoints: [
        "Testing: Process of executing program with intent of finding errors",
        "Unit Testing: Testing individual components (classes/methods)",
        "Integration Testing: Testing how modules work together",
        "System Testing: Testing the complete, integrated system"
      ],
      concepts: [
        { term: "Black Box", def: "Functional testing without knowing internal code structure." },
        { term: "White Box", def: "Structural testing based on internal logic and code." },
        { term: "Regression Testing", def: "Re-testing after changes to ensure old features still work." }
      ],
      example: `Unit Test Example:
@Test
void testAddition() {
    assertEquals(5, Calculator.add(2, 3));
}`,
      tips: "Test early, test often!"
    }
  },
  stats: {
    1: {
      title: "Introduction & Descriptive Statistics",
      keyPoints: [
        "Statistics: Collect, analyze, interpret data to make decisions",
        "Population: Entire group. Sample: Subset of population.",
        "Descriptive: Summarize data. Inferential: Draw conclusions about population.",
        "Data types: Nominal, Ordinal, Interval, Ratio (NOIR)"
      ],
      concepts: [
        { term: "Mean", def: "Average: Sum / n" },
        { term: "Median", def: "Middle value when sorted. Robust to outliers." },
        { term: "Mode", def: "Most frequent value" },
        { term: "Standard Deviation", def: "σ = √(Σ(x-μ)²/n). Measures spread." }
      ],
      example: `Data: 2, 4, 4, 5, 5, 5, 7, 9
Mean = 41/8 = 5.125
Median = (5+5)/2 = 5
Mode = 5 (appears 3 times)`,
      tips: "Mean is affected by outliers, Median is not"
    },
    2: {
      title: "Probability Basics",
      keyPoints: [
        "Probability: Measure of likelihood, ranges from 0 to 1",
        "P(A) = Favorable outcomes / Total outcomes",
        "P(A and B) = P(A) × P(B) if independent",
        "P(A or B) = P(A) + P(B) - P(A and B)"
      ],
      concepts: [
        { term: "Independent", def: "P(A|B) = P(A). One event doesn't affect other." },
        { term: "Mutually Exclusive", def: "Events can't happen together. P(A and B) = 0" },
        { term: "Conditional", def: "P(A|B) = P(A and B) / P(B)" },
        { term: "Complement", def: "P(A') = 1 - P(A)" }
      ],
      example: `Rolling die:
P(6) = 1/6
P(even) = 3/6 = 1/2
P(>4) = 2/6 = 1/3

Coin flip twice:
P(HH) = 1/2 × 1/2 = 1/4`,
      tips: "Addition rule for OR, Multiplication rule for AND"
    },
    3: {
      title: "Probability Distributions",
      keyPoints: [
        "Normal Distribution: Bell-shaped, symmetric, mean=median=mode",
        "68-95-99.7 Rule: 68% within 1σ, 95% within 2σ, 99.7% within 3σ",
        "Binomial: n trials, probability p, discrete outcomes",
        "Z-score: (x - μ) / σ, tells how many SDs from mean"
      ],
      concepts: [
        { term: "Normal", def: "Continuous, symmetric bell curve. Many natural phenomena." },
        { term: "Binomial", def: "n independent trials, success probability p. E(X)=np, Var=np(1-p)" },
        { term: "Poisson", def: "Count of events in fixed interval. λ = mean = variance" },
        { term: "Z-Score", def: "Standardized score: Z = (x - μ) / σ" }
      ],
      example: `IQ scores: μ=100, σ=15
Z-score for IQ=130:
Z = (130-100)/15 = 2

68% between 85-115
95% between 70-130
99.7% between 55-145`,
      tips: "Z-score tells position relative to mean in SDs"
    },
    4: {
      title: "Hypothesis Testing",
      keyPoints: [
        "H₀ (Null): No effect, no difference - what we try to reject",
        "H₁ (Alternative): Effect exists - what we want to prove",
        "p-value: Probability of getting results if H₀ is true",
        "α (Alpha): Significance level, usually 0.05. Reject H₀ if p < α"
      ],
      concepts: [
        { term: "Type I Error", def: "Reject true H₀ (false positive). Probability = α" },
        { term: "Type II Error", def: "Accept false H₀ (false negative). Probability = β" },
        { term: "Power", def: "1 - β. Probability of correctly rejecting false H₀" },
        { term: "p-value", def: "If p < α, reject H₀. Smaller p = stronger evidence against H₀" }
      ],
      example: `Testing if mean > 50:
H₀: μ = 50
H₁: μ > 50
α = 0.05

If p-value = 0.03 < 0.05
Reject H₀, conclude μ > 50`,
      tips: "p < α → Reject null. Small p = Big deal!"
    },
    5: {
      title: "Sampling Distributions & CLT",
      keyPoints: [
        "Sampling Distribution: Probability distribution of a statistic (like mean) from many samples",
        "Central Limit Theorem (CLT): Sample means will be normally distributed if n is large (n ≥ 30)",
        "Standard Error (SE): Standard deviation of the sampling distribution",
        "Decreases as sample size (n) increases"
      ],
      concepts: [
        { term: "CLT", def: "Sample mean distribution approaches normal as n increases, regardless of population shape." },
        { term: "Standard Error", def: "SE = σ / √n. Measures how much sample mean varies from population mean." },
        { term: "Point Estimate", def: "Single value (like x̄) used to estimate population parameter (μ)." }
      ],
      example: `If population σ = 15 and n = 25:
SE = 15 / √25 = 15 / 5 = 3
If n = 100:
SE = 15 / √100 = 15 / 10 = 1.5`,
      tips: "Larger sample = more precision (smaller SE)"
    }
  },
  networks: {
    1: {
      title: "Introduction to Networks & OSI Model",
      keyPoints: [
        "Network: Interconnected devices that share resources and communicate",
        "OSI Model: 7 layers - Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "TCP/IP Model: 4 layers - Network Access, Internet, Transport, Application",
        "Each layer has specific functions and protocols"
      ],
      concepts: [
        { term: "Layer 1 Physical", def: "Bits, cables, hubs. Transmits raw bits over medium." },
        { term: "Layer 2 Data Link", def: "Frames, MAC address, switches. Error detection, flow control." },
        { term: "Layer 3 Network", def: "Packets, IP address, routers. Routing and logical addressing." },
        { term: "Layer 4 Transport", def: "Segments. TCP (reliable) / UDP (fast). End-to-end delivery." }
      ],
      example: `OSI Mnemonic:
"Please Do Not Throw Sausage Pizza Away"
Physical-DataLink-Network-Transport-Session-Presentation-Application

Data at each layer:
L1: Bits
L2: Frames
L3: Packets
L4: Segments`,
      tips: "Lower layers = hardware, Upper layers = software"
    },
    2: {
      title: "Application Layer Protocols",
      keyPoints: [
        "HTTP/HTTPS: Web browsing (Port 80/443)",
        "DNS: Domain Name System - translates names to IP (Port 53)",
        "DHCP: Dynamic Host Configuration Protocol - auto-assigns IP",
        "FTP: File Transfer Protocol (Port 20 data, 21 control)"
      ],
      concepts: [
        { term: "HTTP", def: "Hypertext Transfer Protocol. Request-response. Stateless. Port 80." },
        { term: "DNS", def: "Translates www.google.com → IP address. Hierarchical. Port 53." },
        { term: "SMTP", def: "Simple Mail Transfer Protocol. Sends email. Port 25." },
        { term: "DHCP", def: "Dynamically assigns IP, subnet mask, gateway, DNS to hosts." }
      ],
      example: `DNS Resolution:
Browser → Local DNS → Root → TLD → Authoritative
www.example.com → 93.184.216.34

DHCP DORA:
Discover → Offer → Request → Acknowledge`,
      tips: "DNS = Phone book of the Internet"
    },
    3: {
      title: "Transport Layer (TCP/UDP)",
      keyPoints: [
        "TCP: Connection-oriented, reliable, ordered delivery, flow control",
        "UDP: Connectionless, fast, no guarantee, used for streaming",
        "Port numbers: Identify applications (0-65535)",
        "3-way handshake: SYN → SYN-ACK → ACK"
      ],
      concepts: [
        { term: "TCP", def: "Transmission Control Protocol. Reliable, ordered. 3-way handshake." },
        { term: "UDP", def: "User Datagram Protocol. Fast, no connection. Video/Gaming/DNS." },
        { term: "Port", def: "16-bit number identifying application. Well-known: 0-1023" },
        { term: "Socket", def: "IP address + Port number. Uniquely identifies connection endpoint." }
      ],
      example: `TCP 3-Way Handshake:
Client → Server: SYN (seq=100)
Server → Client: SYN-ACK (seq=200, ack=101)
Client → Server: ACK (ack=201)

Common Ports:
HTTP:80, HTTPS:443, SSH:22, FTP:21, DNS:53`,
      tips: "TCP = Phone call (connected), UDP = Postcard (no guarantee)"
    },
    4: {
      title: "Network Layer & IP Addressing",
      keyPoints: [
        "IP Address: Logical address for routing (IPv4: 32-bit, IPv6: 128-bit)",
        "Subnetting: Divide network into smaller networks",
        "NAT: Network Address Translation - maps private to public IP",
        "Routing: Path selection for packet delivery (RIP, OSPF, BGP)"
      ],
      concepts: [
        { term: "IPv4", def: "32-bit, 4 octets (e.g., 192.168.1.1). About 4.3 billion addresses." },
        { term: "Subnet Mask", def: "Separates network and host portions: 255.255.255.0 = /24" },
        { term: "NAT", def: "Translates private IP (192.168.x.x) to public IP for internet." },
        { term: "Default Gateway", def: "Router's IP that forwards packets to other networks." }
      ],
      example: `IP: 192.168.1.100/24
Network: 192.168.1.0
Broadcast: 192.168.1.255
Usable hosts: 1-254 (254 hosts)

Private IP ranges:
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16`,
      tips: "/24 = 256 IPs - 2 = 254 usable hosts"
    },
    5: {
      title: "Network Layer - Control Plane",
      keyPoints: [
        "Control Plane: Handles routing logic and determines paths for packets",
        "Routing Algorithms: Distance Vector (RIP) and Link State (OSPF)",
        "BGP: Border Gateway Protocol - the protocol of the Internet (Inter-AS routing)",
        "SDN: Software Defined Networking - separates control and data planes"
      ],
      concepts: [
        { term: "RIP", def: "Distance Vector using hop count (max 15 hops)." },
        { term: "OSPF", def: "Link State using Dijkstra's algorithm. More efficient for large networks." },
        { term: "BGP", def: "Path Vector protocol used to exchange routing info between Autonomous Systems." }
      ],
      example: `Routing decision:
Path A: 2 hops, 10Mbps
Path B: 4 hops, 100Mbps
RIP selects A, OSPF might select B based on cost/bandwidth.`,
      tips: "Routing = finding the best path through the network"
    }
  }
};
