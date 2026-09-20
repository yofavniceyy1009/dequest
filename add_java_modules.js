const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('data.js', 'utf8');
const script = content + '\nmodule.exports = CourseData;';
fs.writeFileSync('temp_data.js', script);
const CourseData = require(path.join(__dirname, 'temp_data.js'));

for (let i = 0; i < 7; i++) {
  if (CourseData.java.modules[i]) {
    CourseData.java.modules[i].tier = 'Beginner';
  }
}

// ---------------- INTERMEDIATE TIER ---------------- //
const intermediateModules = [
  {
    "id": "java_m8",
    "title": "Module 8: Classes & Objects",
    "description": "What a class is, how to create your own, and instance variables.",
    "tier": "Intermediate",
    "xpReward": 160,
    "content": "<h3>Classes & Objects 🏗️</h3>\n<p>So far, you've used built-in types like <code>int</code> and <code>String</code>. But what if you want to represent something more complex, like a <code>Player</code> in a game? A <strong>Class</strong> is a blueprint or template for creating custom data types. An <strong>Object</strong> is a specific instance built from that blueprint.</p>\n<hr>\n<h4>1. Creating a Class (The Blueprint)</h4>\n<p>To define a class, you use the <code>class</code> keyword. Inside the class, you define <strong>instance variables</strong> (also called fields) which represent the properties of the object.</p>\n<pre><code class=\"language-java\">class Player {\n    String name;\n    int health;\n    int level;\n}</code></pre>\n<hr>\n<h4>2. Creating an Object (The Instance)</h4>\n<p>Once you have a blueprint, you can build as many players as you want using the <code>new</code> keyword.</p>\n<pre><code class=\"language-java\">public class Main {\n    public static void main(String[] args) {\n        // Build a new Player object\n        Player hero = new Player();\n        \n        // Assign values to instance variables\n        hero.name = \"Alicia\";\n        hero.health = 100;\n        hero.level = 1;\n        \n        System.out.println(\"Welcome, \" + hero.name + \"!\");\n    }\n}</code></pre>",
    "quiz": [
      {
        "question": "What is a Class in Java?",
        "options": [
          "A specific item in memory",
          "A blueprint or template for objects",
          "A built-in method",
          "A type of loop"
        ],
        "answer": 1,
        "explanation": "A Class is a template (blueprint) that defines properties and behaviors for objects."
      },
      {
        "question": "What keyword is used to create a new object from a class?",
        "options": [
          "create",
          "make",
          "new",
          "object"
        ],
        "answer": 2,
        "explanation": "The 'new' keyword tells Java to allocate memory and build a new instance of a class."
      },
      {
        "question": "What are instance variables?",
        "options": [
          "Variables defined inside a method",
          "Variables that hold temporary data for loops",
          "Properties or fields defined inside a class",
          "Methods that return objects"
        ],
        "answer": 2,
        "explanation": "Instance variables (fields) represent the unique state (properties) of an individual object."
      },
      {
        "question": "Given 'Player p = new Player();', how do you access the player's health?",
        "options": [
          "Player.health",
          "p->health",
          "p.health",
          "health.p"
        ],
        "answer": 2,
        "explanation": "You use dot notation (p.health) to access an object's instance variables."
      },
      {
        "question": "Can you create multiple objects from the same class?",
        "options": [
          "Yes",
          "No",
          "Only if the class is empty",
          "Only if the objects have the exact same values"
        ],
        "answer": 0,
        "explanation": "Yes! A blueprint (Class) can be used to build as many houses (Objects) as you want."
      }
    ]
  },
  {
    "id": "java_m9",
    "title": "Module 9: Constructors",
    "description": "What they are and how to write one.",
    "tier": "Intermediate",
    "xpReward": 170,
    "content": "<h3>Constructors 🏭</h3>\n<p>In the last module, we created a <code>Player</code> and then manually set its name and health on separate lines. That takes too much time! A <strong>Constructor</strong> is a special block of code that runs automatically the exact moment an object is created with <code>new</code>. It allows you to set up the object instantly.</p>\n<hr>\n<h4>1. Writing a Constructor</h4>\n<p>A constructor looks like a method, but it has <strong>no return type</strong> (not even <code>void</code>) and its name <strong>must exactly match the class name</strong>.</p>\n<pre><code class=\"language-java\">class Player {\n    String name;\n    int health;\n    \n    // This is the Constructor!\n    public Player(String startingName, int startingHealth) {\n        name = startingName;\n        health = startingHealth;\n    }\n}</code></pre>\n<hr>\n<h4>2. Using the Constructor</h4>\n<p>Now, when we create a new <code>Player</code>, we are forced to provide the starting values right away in the parentheses.</p>\n<pre><code class=\"language-java\">public class Main {\n    public static void main(String[] args) {\n        // Create and set up the object in one line!\n        Player hero = new Player(\"Alicia\", 100);\n        Player villain = new Player(\"Bowser\", 500);\n        \n        System.out.println(hero.name + \" vs \" + villain.name);\n    }\n}</code></pre>",
    "quiz": [
      {
        "question": "What is the primary purpose of a Constructor?",
        "options": [
          "To destroy objects and free memory",
          "To loop through arrays",
          "To initialize an object's state when it is created",
          "To print text to the console"
        ],
        "answer": 2,
        "explanation": "Constructors set up (initialize) an object with starting values the moment it is created."
      },
      {
        "question": "Which of these is a rule for naming a Constructor?",
        "options": [
          "It must start with a lowercase letter",
          "It must be named 'init'",
          "It must have the exact same name as the class",
          "It can be named anything"
        ],
        "answer": 2,
        "explanation": "In Java, a constructor's name must perfectly match the name of the class."
      },
      {
        "question": "What return type does a constructor have?",
        "options": [
          "void",
          "int",
          "String",
          "No return type at all"
        ],
        "answer": 3,
        "explanation": "Constructors do not have return types, not even 'void'."
      },
      {
        "question": "When does a constructor run?",
        "options": [
          "When the program finishes",
          "Automatically when the 'new' keyword is used",
          "Every time an instance variable changes",
          "When you manually call it with .construct()"
        ],
        "answer": 1,
        "explanation": "The constructor is triggered automatically the exact moment 'new' creates the object."
      },
      {
        "question": "If you don't write a constructor, what happens?",
        "options": [
          "The program crashes",
          "Java provides an invisible, empty default constructor",
          "You cannot create objects of that class",
          "You must use a while loop instead"
        ],
        "answer": 1,
        "explanation": "Java silently provides a default constructor (with no parameters) if you don't write one yourself."
      }
    ]
  },
  {
    "id": "java_m10",
    "title": "Module 10: Encapsulation",
    "description": "Private fields, getters and setters, and why it matters.",
    "tier": "Intermediate",
    "xpReward": 180,
    "content": "<h3>Encapsulation 🛡️</h3>\n<p>Imagine if anyone could walk up to your bank account and just manually change your balance to <code>-5000</code>. That would be a disaster! In programming, if we leave our instance variables completely exposed, other parts of the program can accidentally break them. <strong>Encapsulation</strong> is the concept of hiding your data to protect it.</p>\n<hr>\n<h4>1. The private Keyword</h4>\n<p>To protect an instance variable, we mark it as <code>private</code>. This makes it invisible to the outside world. Only the class itself can see it.</p>\n<pre><code class=\"language-java\">class BankAccount {\n    private int balance;\n    \n    public BankAccount(int startingBalance) {\n        balance = startingBalance;\n    }\n}</code></pre>\n<p>If someone tries to write <code>account.balance = -999;</code> in the Main file, Java will throw an error!</p>\n<hr>\n<h4>2. Getters and Setters</h4>\n<p>If the data is hidden, how do we use it? We provide controlled public methods called <strong>getters</strong> (to read data) and <strong>setters</strong> (to change data safely).</p>\n<pre><code class=\"language-java\">class BankAccount {\n    private int balance;\n    \n    // Getter: safely returns the balance\n    public int getBalance() {\n        return balance;\n    }\n    \n    // Setter: safely changes the balance (with rules!)\n    public void setBalance(int newBalance) {\n        if (newBalance < 0) {\n            System.out.println(\"Error: Balance cannot be negative!\");\n        } else {\n            balance = newBalance;\n        }\n    }\n}</code></pre>",
    "quiz": [
      {
        "question": "What is Encapsulation?",
        "options": [
          "Combining multiple arrays into one",
          "Hiding and protecting an object's internal data",
          "A type of loop that wraps around",
          "Writing code inside a zip file"
        ],
        "answer": 1,
        "explanation": "Encapsulation protects data by keeping it private and controlling access through methods."
      },
      {
        "question": "What does the 'private' keyword do to an instance variable?",
        "options": [
          "Makes it invisible and inaccessible outside the class",
          "Deletes it from memory",
          "Makes it run faster",
          "Allows anyone to change it"
        ],
        "answer": 0,
        "explanation": "Private variables can only be accessed by code living inside the same class."
      },
      {
        "question": "What is a 'getter' method?",
        "options": [
          "A method that steals data from other objects",
          "A method that safely returns the value of a private variable",
          "A method that gets user input from the keyboard",
          "A built-in Java virus"
        ],
        "answer": 1,
        "explanation": "A getter is a public method that simply reads and returns a private field's value."
      },
      {
        "question": "Why use a 'setter' method instead of making the variable public?",
        "options": [
          "Setters are faster",
          "Setters allow you to enforce rules and validate data before changing it",
          "Public variables are illegal in Java",
          "Setters take up less memory"
        ],
        "answer": 1,
        "explanation": "Setters act as gatekeepers. You can add 'if' statements to prevent bad data (like negative health)."
      },
      {
        "question": "If 'health' is private, which of these is the standard name for its setter?",
        "options": [
          "changeHealth()",
          "setHealth()",
          "makeHealth()",
          "healthSetter()"
        ],
        "answer": 1,
        "explanation": "By convention, you capitalize the variable name and put 'set' in front of it."
      }
    ]
  },
  {
    "id": "java_m11",
    "title": "Module 11: Inheritance",
    "description": "Parent/child classes and the extends keyword.",
    "tier": "Intermediate",
    "xpReward": 190,
    "content": "<h3>Inheritance 🧬</h3>\n<p>Let's say you are building a Zoo simulation. You create a <code>Lion</code> class, a <code>Tiger</code> class, and a <code>Bear</code> class. They all have a <code>eat()</code> method and a <code>sleep()</code> method. Writing the exact same code in all three classes is exhausting. <strong>Inheritance</strong> lets you share code by creating a Parent/Child relationship!</p>\n<hr>\n<h4>1. The Parent Class</h4>\n<p>First, we extract the shared behavior into a general <strong>Parent Class</strong> (also called a Superclass).</p>\n<pre><code class=\"language-java\">class Animal {\n    String name;\n    \n    public void eat() {\n        System.out.println(name + \" is eating food.\");\n    }\n}</code></pre>\n<hr>\n<h4>2. The Child Class (extends)</h4>\n<p>Next, we create a <strong>Child Class</strong> (Subclass) that <code>extends</code> the parent. The child automatically absorbs all the methods and variables of the parent, completely for free!</p>\n<pre><code class=\"language-java\">// Lion inherits everything from Animal!\nclass Lion extends Animal {\n    \n    public void roar() {\n        System.out.println(\"ROAAAAR!\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Lion simba = new Lion();\n        simba.name = \"Simba\";\n        simba.eat(); // Inherited from Animal!\n        simba.roar(); // Unique to Lion\n    }\n}</code></pre>",
    "quiz": [
      {
        "question": "What is the main benefit of Inheritance?",
        "options": [
          "It makes the code run faster",
          "It prevents variables from changing",
          "It allows classes to share and reuse code",
          "It hides data from other classes"
        ],
        "answer": 2,
        "explanation": "Inheritance promotes code reusability by letting child classes inherit methods from parents."
      },
      {
        "question": "What keyword is used to make one class inherit from another?",
        "options": [
          "inherits",
          "extends",
          "implements",
          "uses"
        ],
        "answer": 1,
        "explanation": "The 'extends' keyword tells Java that a child class is extending a parent class."
      },
      {
        "question": "In 'class Car extends Vehicle', which is the parent class?",
        "options": [
          "Car",
          "Vehicle",
          "Both",
          "Neither"
        ],
        "answer": 1,
        "explanation": "Vehicle is the parent (superclass), and Car is the child (subclass) that extends it."
      },
      {
        "question": "Does a child class inherit the parent's methods?",
        "options": [
          "Yes, automatically",
          "No, they must be rewritten",
          "Only if the parent allows it explicitly",
          "Only methods that return ints"
        ],
        "answer": 0,
        "explanation": "The child class instantly absorbs the accessible methods and variables of the parent."
      },
      {
        "question": "Can a child class have its own unique methods too?",
        "options": [
          "No, it can only use parent methods",
          "Yes, it can add unique methods that the parent doesn't have",
          "Only if the parent is empty",
          "Yes, but they must be private"
        ],
        "answer": 1,
        "explanation": "Child classes inherit the parent's base abilities and then add their own unique features!"
      }
    ]
  },
  {
    "id": "java_m12",
    "title": "Module 12: Interfaces",
    "description": "What they are and how to implement contracts in Java.",
    "tier": "Intermediate",
    "xpReward": 200,
    "content": "<h3>Interfaces 📜</h3>\n<p>Inheritance is great, but Java has a strict rule: <strong>A class can only have one parent</strong>. You can't <code>extend</code> multiple classes. So what do you do if you have a <code>Bird</code> class that inherits from <code>Animal</code>, but you also want it to act like a <code>FlyingMachine</code>? You use an <strong>Interface</strong>!</p>\n<p>An Interface is like a legal contract. It lists a bunch of empty methods. If a class signs the contract, it <strong>promises</strong> to write the actual code for those methods.</p>\n<hr>\n<h4>1. Writing the Interface</h4>\n<p>You define an interface using the <code>interface</code> keyword. The methods inside have no bodies (no curly braces).</p>\n<pre><code class=\"language-java\">interface Flyable {\n    // Empty contract methods\n    void takeoff();\n    void fly();\n}</code></pre>\n<hr>\n<h4>2. Implementing the Interface</h4>\n<p>A class uses the <code>implements</code> keyword to sign the contract. It will immediately throw an error if you forget to write the method bodies!</p>\n<pre><code class=\"language-java\">class Bird implements Flyable {\n    \n    // We are FORCED to provide the code for takeoff()\n    public void takeoff() {\n        System.out.println(\"Flapping wings!\");\n    }\n    \n    // We are FORCED to provide the code for fly()\n    public void fly() {\n        System.out.println(\"Soaring through the sky.\");\n    }\n}</code></pre>\n<p>Unlike <code>extends</code>, a class can <code>implements</code> as many interfaces as it wants at the same time!</p>",
    "quiz": [
      {
        "question": "What is an Interface in Java?",
        "options": [
          "A parent class with variables",
          "A contract that forces classes to implement specific methods",
          "The visual window of the app",
          "A type of array"
        ],
        "answer": 1,
        "explanation": "An Interface is a list of empty methods. Any class that implements it must fulfill the contract."
      },
      {
        "question": "What keyword is used by a class to sign an interface contract?",
        "options": [
          "extends",
          "inherits",
          "promises",
          "implements"
        ],
        "answer": 3,
        "explanation": "The 'implements' keyword is used (e.g., class Bird implements Flyable)."
      },
      {
        "question": "How many parents can a Java class extend (Inheritance)?",
        "options": [
          "One",
          "Two",
          "Unlimited",
          "Zero"
        ],
        "answer": 0,
        "explanation": "Java classes can only extend exactly one parent class."
      },
      {
        "question": "How many interfaces can a Java class implement?",
        "options": [
          "One",
          "Two",
          "Unlimited",
          "Zero"
        ],
        "answer": 2,
        "explanation": "A single class can implement an unlimited number of interfaces, separated by commas."
      },
      {
        "question": "What happens if a class implements an interface but forgets to write one of the methods?",
        "options": [
          "It gets a warning but runs fine",
          "The program runs, but skips the method",
          "Java throws an error and refuses to compile",
          "Java writes a default method for you"
        ],
        "answer": 2,
        "explanation": "The contract is legally binding! If you don't write the method bodies, the code will not compile."
      }
    ]
  },
  {
    "id": "java_m13",
    "title": "Module 13: Exception Handling",
    "description": "Try/catch, common exceptions, and why error handling matters.",
    "tier": "Intermediate",
    "xpReward": 210,
    "content": "<h3>Exception Handling 🚨</h3>\n<p>Sometimes, things go wrong that are out of your control. What if you try to open a file that doesn't exist? What if the user types a word when you asked for a number? In Java, these errors are called <strong>Exceptions</strong>, and if you don't handle them, they will violently crash your entire program.</p>\n<hr>\n<h4>1. Try / Catch Blocks</h4>\n<p>To prevent a crash, we can wrap dangerous code in a <strong>try</strong> block. If it blows up, Java instantly hands the explosion over to a <strong>catch</strong> block, allowing the program to survive and keep running.</p>\n<pre><code class=\"language-java\">import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.println(\"Enter your age:\");\n        \n        try {\n            // Dangerous code: user might type \"hello\" instead of a number!\n            int age = scanner.nextInt();\n            System.out.println(\"You are \" + age + \" years old.\");\n            \n        } catch (Exception e) {\n            // The explosion is caught here!\n            System.out.println(\"Error: You did not type a valid number!\");\n        }\n        \n        System.out.println(\"The program is still running smoothly!\");\n    }\n}</code></pre>\n<p>Because of the try/catch, even if the user causes an error, the program recovers gracefully instead of crashing.</p>",
    "quiz": [
      {
        "question": "What happens if an Exception occurs and is not handled?",
        "options": [
          "The program skips the line and continues",
          "Java fixes the error automatically",
          "The entire program crashes immediately",
          "The user is asked to try again"
        ],
        "answer": 2,
        "explanation": "Unhandled exceptions cause fatal crashes that terminate the program."
      },
      {
        "question": "What is the purpose of the 'try' block?",
        "options": [
          "To test if the compiler is working",
          "To wrap dangerous code that might cause an error",
          "To execute code infinitely",
          "To catch the error after it happens"
        ],
        "answer": 1,
        "explanation": "You put the code that might explode inside the 'try' block."
      },
      {
        "question": "What is the purpose of the 'catch' block?",
        "options": [
          "To safely handle the error if the try block fails",
          "To wrap dangerous code",
          "To force the program to crash",
          "To retrieve user input"
        ],
        "answer": 0,
        "explanation": "The 'catch' block catches the explosion and runs recovery code, preventing a crash."
      },
      {
        "question": "Which block runs if the 'try' block succeeds with no errors?",
        "options": [
          "The catch block",
          "The program crashes anyway",
          "The catch block is skipped entirely",
          "It runs the try block again"
        ],
        "answer": 2,
        "explanation": "If the 'try' block is successful, the 'catch' block is completely ignored."
      },
      {
        "question": "What does the 'e' represent in 'catch (Exception e)'?",
        "options": [
          "The letter e",
          "The variable holding the details of the error that occurred",
          "An empty string",
          "An array"
        ],
        "answer": 1,
        "explanation": "It's a variable (usually named 'e') that holds the Exception object with all the error details."
      }
    ]
  }
];

// ---------------- ADVANCED TIER ---------------- //
const advancedModules = [
  {
    "id": "java_m14",
    "title": "Module 14: ArrayLists & Collections",
    "description": "Why they're more flexible than arrays.",
    "tier": "Advanced",
    "xpReward": 250,
    "content": "<h3>ArrayLists 🚀</h3>\n<p>In the Beginner tier, we learned that standard Arrays are fixed-size. If you create an array that holds 5 items, it can NEVER hold a 6th item. That is incredibly annoying for modern apps where data constantly grows and shrinks. Enter the <strong>ArrayList</strong>!</p>\n<hr>\n<h4>1. Creating an ArrayList</h4>\n<p>An ArrayList is a dynamic array that automatically stretches to fit as much data as you want. Because it is a generic class, you have to tell it what kind of Objects it will hold using angle brackets <code>&lt;&gt;</code>. (Note: ArrayLists cannot hold raw primitives like <code>int</code>, you must use their object wrapper <code>Integer</code>).</p>\n<pre><code class=\"language-java\">import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create an empty, stretching list of Strings\n        ArrayList&lt;String&gt; inventory = new ArrayList&lt;&gt;();\n        \n        // Add items effortlessly!\n        inventory.add(\"Sword\");\n        inventory.add(\"Shield\");\n        inventory.add(\"Potion\");\n        \n        System.out.println(inventory); // Prints: [Sword, Shield, Potion]\n    }\n}</code></pre>\n<hr>\n<h4>2. Helpful Methods</h4>\n<p>ArrayLists come packed with built-in tools that make them superior to standard arrays:</p>\n<pre><code class=\"language-java\">// Get an item (instead of inventory[0])\nString weapon = inventory.get(0);\n\n// Check the size (instead of inventory.length)\nint size = inventory.size();\n\n// Remove an item easily!\ninventory.remove(\"Shield\");</code></pre>",
    "quiz": [
      {
        "question": "What is the main advantage of an ArrayList over a standard Array?",
        "options": [
          "It is spelled with more letters",
          "It can dynamically resize itself as you add/remove items",
          "It can hold multiple different data types at once",
          "It runs slightly faster"
        ],
        "answer": 1,
        "explanation": "ArrayLists stretch and shrink automatically, unlike fixed-size standard arrays."
      },
      {
        "question": "Can an ArrayList hold primitive types like 'int' or 'double'?",
        "options": [
          "Yes, effortlessly",
          "No, you must use wrapper classes like Integer or Double",
          "Only if it has less than 10 items",
          "Only if you import java.util.Primitives"
        ],
        "answer": 1,
        "explanation": "Collections can only hold Objects, so you use wrapper classes (Integer, Double, Boolean)."
      },
      {
        "question": "Which method is used to insert a new item into an ArrayList?",
        "options": [
          ".insert()",
          ".append()",
          ".push()",
          ".add()"
        ],
        "answer": 3,
        "explanation": "The .add() method appends an item to the end of the ArrayList."
      },
      {
        "question": "How do you find out how many items are in an ArrayList?",
        "options": [
          ".length",
          ".length()",
          ".size()",
          ".count()"
        ],
        "answer": 2,
        "explanation": "ArrayList uses the .size() method to return the number of elements."
      },
      {
        "question": "How do you access the first item in an ArrayList?",
        "options": [
          "list[0]",
          "list.first()",
          "list.get(0)",
          "list.fetch(1)"
        ],
        "answer": 2,
        "explanation": "You use the .get(index) method to retrieve items, starting at index 0."
      }
    ]
  },
  {
    "id": "java_m15",
    "title": "Module 15: File I/O",
    "description": "Reading and writing files in Java.",
    "tier": "Advanced",
    "xpReward": 260,
    "content": "<h3>File I/O (Input / Output) 💾</h3>\n<p>So far, every time your program closes, all your variables and data are instantly deleted from RAM memory. If you want to save a high score permanently, you need to write it to the hard drive as a text file.</p>\n<hr>\n<h4>1. Writing to a File</h4>\n<p>We use a <code>FileWriter</code> to create and write to files. Because writing to a hard drive can fail (e.g. disk is full, no permissions), Java forces us to wrap this in a <code>try/catch</code> block!</p>\n<pre><code class=\"language-java\">import java.io.FileWriter;\n\npublic class Main {\n    public static void main(String[] args) {\n        try {\n            // Creates a file called save.txt\n            FileWriter writer = new FileWriter(\"save.txt\");\n            writer.write(\"HighScore: 9999\");\n            writer.close(); // You MUST close the file to save it!\n            System.out.println(\"File saved successfully.\");\n            \n        } catch (Exception e) {\n            System.out.println(\"An error occurred saving the file.\");\n        }\n    }\n}</code></pre>\n<hr>\n<h4>2. Reading from a File</h4>\n<p>To read a file, we can use the familiar <code>Scanner</code>, but instead of handing it <code>System.in</code> (keyboard), we hand it a <code>File</code> object!</p>\n<pre><code class=\"language-java\">import java.io.File;\nimport java.util.Scanner;\n\ntry {\n    File saveFile = new File(\"save.txt\");\n    Scanner fileScanner = new Scanner(saveFile);\n    \n    while (fileScanner.hasNextLine()) {\n        String data = fileScanner.nextLine();\n        System.out.println(data);\n    }\n    fileScanner.close();\n    \n} catch (Exception e) {\n    System.out.println(\"File not found!\");\n}</code></pre>",
    "quiz": [
      {
        "question": "What happens to your variables when a Java program finishes running?",
        "options": [
          "They are saved automatically to a database",
          "They are deleted from RAM memory",
          "They are converted to Strings",
          "They are paused in the background"
        ],
        "answer": 1,
        "explanation": "Variables live in temporary RAM. When the program ends, they are completely wiped."
      },
      {
        "question": "What class can we use to write text to a file?",
        "options": [
          "TextSaver",
          "DocumentWriter",
          "FileWriter",
          "FilePrinter"
        ],
        "answer": 2,
        "explanation": "FileWriter is a standard Java class used to write character files."
      },
      {
        "question": "Why does Java force you to use try/catch when working with files?",
        "options": [
          "Because files are dangerous viruses",
          "Because hard drive operations can easily fail (file missing, no permission)",
          "To make the code run faster",
          "It's just a suggestion, not a requirement"
        ],
        "answer": 1,
        "explanation": "File I/O can throw an IOException, which is a 'checked' exception, meaning Java forces you to handle it."
      },
      {
        "question": "What MUST you do after you finish writing to a FileWriter?",
        "options": [
          "Call .close()",
          "Call .save()",
          "Turn off the computer",
          "Delete the file"
        ],
        "answer": 0,
        "explanation": "You must call .close() to flush the data out of the buffer and actually save it to the disk."
      },
      {
        "question": "Which class can be used to read lines of text out of a File?",
        "options": [
          "System.out",
          "FileReader",
          "Scanner",
          "FileLoader"
        ],
        "answer": 2,
        "explanation": "You can pass a File object into a Scanner to read it line by line, just like the keyboard!"
      }
    ]
  },
  {
    "id": "java_m16",
    "title": "Module 16: Recursion",
    "description": "Functions that call themselves.",
    "tier": "Advanced",
    "xpReward": 270,
    "content": "<h3>Recursion 🪞</h3>\n<p>Recursion is a mind-bending concept: <strong>It is a method that calls itself from the inside.</strong> Imagine standing between two mirrors; you see a reflection of a reflection, going on forever. That is recursion.</p>\n<hr>\n<h4>1. The Base Case (Stopping the loop)</h4>\n<p>If a method calls itself forever, the computer will crash (this is called a <em>StackOverflowError</em>). Therefore, every recursive method MUST have a <strong>Base Case</strong>—a simple if-statement that tells it when to stop.</p>\n<pre><code class=\"language-java\">public class Main {\n    \n    // Recursive method to count down to zero\n    public static void countdown(int number) {\n        // 1. The Base Case (When to stop)\n        if (number <= 0) {\n            System.out.println(\"Liftoff!\");\n            return; // Stops the method entirely\n        }\n        \n        // 2. The Recursive Step (Calling itself)\n        System.out.println(number + \"...\");\n        countdown(number - 1); \n    }\n    \n    public static void main(String[] args) {\n        countdown(3); // Prints 3, 2, 1, Liftoff!\n    }\n}</code></pre>\n<p>Recursion is often used as a replacement for loops when dealing with complex branching paths, like searching through folders on your computer.</p>",
    "quiz": [
      {
        "question": "What is Recursion?",
        "options": [
          "A method that calls itself",
          "A loop that never ends",
          "A variable that changes its own type",
          "An error caused by division by zero"
        ],
        "answer": 0,
        "explanation": "Recursion occurs when a method invokes itself from within its own code block."
      },
      {
        "question": "What is a 'Base Case'?",
        "options": [
          "The bottom of an array",
          "A condition that stops the recursive calls",
          "The first line of a file",
          "A method that calls itself"
        ],
        "answer": 1,
        "explanation": "The base case is the exit condition. Without it, the recursion would continue infinitely."
      },
      {
        "question": "What happens if you write a recursive method with no base case?",
        "options": [
          "It returns 0",
          "It gets converted to a for loop",
          "It crashes with a StackOverflowError",
          "It runs exactly 10 times and stops"
        ],
        "answer": 2,
        "explanation": "Infinite recursion fills up the call stack, causing the program to crash with a StackOverflowError."
      },
      {
        "question": "In the countdown(3) example, what value is passed into the next recursive call?",
        "options": [
          "3",
          "2",
          "0",
          "4"
        ],
        "answer": 1,
        "explanation": "It passes 'number - 1', so if number is 3, the next call is countdown(2)."
      },
      {
        "question": "Recursion is most similar in behavior to what other programming concept?",
        "options": [
          "If/Else statements",
          "Classes",
          "Loops",
          "Arrays"
        ],
        "answer": 2,
        "explanation": "Recursion creates repeating behavior, making it a functional alternative to while or for loops."
      }
    ]
  },
  {
    "id": "java_m17",
    "title": "Module 17: Basic Algorithms",
    "description": "Simple searching and sorting, like linear search and bubble sort.",
    "tier": "Advanced",
    "xpReward": 300,
    "content": "<h3>Basic Algorithms 🧩</h3>\n<p>An <strong>Algorithm</strong> is just a fancy word for a step-by-step recipe to solve a specific problem. Two of the most common problems in computer science are <strong>Searching</strong> (finding an item) and <strong>Sorting</strong> (putting items in order).</p>\n<hr>\n<h4>1. Linear Search</h4>\n<p>The simplest way to find an item in an array is to check every single box from left to right until you find it. This is called a Linear Search.</p>\n<pre><code class=\"language-java\">int[] numbers = {4, 2, 8, 5, 1};\nint target = 8;\nboolean found = false;\n\nfor (int i = 0; i < numbers.length; i++) {\n    if (numbers[i] == target) {\n        System.out.println(\"Found 8 at index \" + i);\n        found = true;\n        break; // Stop searching!\n    }\n}</code></pre>\n<hr>\n<h4>2. Bubble Sort</h4>\n<p>How do we sort <code>{4, 2, 8, 5}</code> into <code>{2, 4, 5, 8}</code>? <strong>Bubble Sort</strong> works by comparing two side-by-side numbers. If the left one is bigger, it swaps them. It repeats this until the biggest numbers \"bubble\" up to the right side!</p>\n<pre><code class=\"language-java\">int[] arr = {4, 2, 8, 5};\n\n// We need nested loops to repeat the swapping process\nfor (int i = 0; i < arr.length - 1; i++) {\n    for (int j = 0; j < arr.length - 1 - i; j++) {\n        \n        // If left is bigger than right, SWAP!\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n}</code></pre>",
    "quiz": [
      {
        "question": "What is an Algorithm?",
        "options": [
          "A type of Java variable",
          "A step-by-step procedure to solve a problem",
          "A hardware component in a computer",
          "A database"
        ],
        "answer": 1,
        "explanation": "An algorithm is just a logical sequence of instructions or steps to accomplish a task."
      },
      {
        "question": "How does Linear Search work?",
        "options": [
          "It guesses a random index",
          "It checks every item one by one from start to finish",
          "It splits the array in half repeatedly",
          "It sorts the array first"
        ],
        "answer": 1,
        "explanation": "Linear search goes in a straight line, checking index 0, then 1, then 2, until it finds the target."
      },
      {
        "question": "What does the 'break;' statement do in a search loop?",
        "options": [
          "Crashes the program",
          "Deletes the item",
          "Immediately exits the loop so it stops searching",
          "Pauses the program"
        ],
        "answer": 2,
        "explanation": "Once you find the item, there's no reason to keep checking the rest of the array, so 'break' exits the loop."
      },
      {
        "question": "How does Bubble Sort arrange numbers?",
        "options": [
          "By creating a new empty array and guessing",
          "By comparing adjacent pairs and swapping them if they are in the wrong order",
          "By dividing the array into chunks",
          "By deleting the smallest numbers"
        ],
        "answer": 1,
        "explanation": "Bubble sort repeatedly swaps adjacent elements if the left is larger than the right."
      },
      {
        "question": "Why is a 'temp' variable needed when swapping two values in an array?",
        "options": [
          "Because Java requires variables to be named temp",
          "To hold one value temporarily so it isn't erased when you overwrite it",
          "To speed up the computer",
          "To change the data type"
        ],
        "answer": 1,
        "explanation": "If you do A=B, the original value of A is lost forever! You must store A in 'temp' first."
      }
    ]
  }
];

// Combine all modules
CourseData.java.modules = CourseData.java.modules.concat(intermediateModules, advancedModules);

// Write back to data.js
const finalScript = 'const CourseData = ' + JSON.stringify(CourseData, null, 2) + ';';
fs.writeFileSync('data.js', finalScript);
fs.writeFileSync('deploy/data.js', finalScript);

console.log('Successfully updated data.js and deploy/data.js with 17 tiered Java modules.');
