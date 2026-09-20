const fs = require('fs');

const CourseData = {
  python: {
    title: "Python Masterclass",
    icon: "fa-brands fa-python",
    color: "#306998",
    modules: [
      {
        id: "py_m1", title: "Module 1: What is Python?",
        description: "Get started with your very first Python program.", xpReward: 80,
        content: `<h3>Welcome to Python! 🐍</h3><p>Python is one of the easiest programming languages to learn. It reads almost like plain English.</p><h4>Your First Program</h4><pre><code class="language-python">print("Hello, World!")</code></pre><h4>Adding Comments</h4><pre><code class="language-python"># This is a comment. Python will ignore this line.</code></pre>`,
        quiz: [
          { question: "How do you make Python show the message 'Hello!'?", options: ["show('Hello!')", "print('Hello!')", "display('Hello!')", "write('Hello!')"], answer: 2, explanation: "print() is the command to display text." },
          { question: "What symbol do you use to write a comment?", options: ["//", "/*", "#", "--"], answer: 3, explanation: "The # symbol starts a comment." }
        ]
      },
      {
        id: "py_m2", title: "Module 2: Variables",
        description: "Learn how to save and use information.", xpReward: 100,
        content: `<h3>Variables 📦</h3><p>Think of a variable like a labeled box.</p><pre><code class="language-python">name = "Jordan"\nage = 16</code></pre><h4>Types of Information</h4><ul><li><strong>String:</strong> Text like <code>"Hello"</code></li><li><strong>Integer:</strong> Whole number like <code>10</code></li><li><strong>Float:</strong> Decimal like <code>3.14</code></li><li><strong>Boolean:</strong> <code>True</code> or <code>False</code></li></ul>`,
        quiz: [
          { question: "What does this code do? name = 'Sam'", options: ["Prints Sam", "Creates variable name storing Sam", "Deletes Sam", "Checks if name is Sam"], answer: 2, explanation: "= means 'store this'." },
          { question: "Which of these is a Float?", options: ["100", "'10.5'", "10.5", "True"], answer: 3, explanation: "A float is a decimal number." }
        ]
      },
      {
        id: "py_m3", title: "Module 3: If/Else",
        description: "Make your program make choices.", xpReward: 120,
        content: `<h3>Decision Making 🤔</h3><pre><code class="language-python">if score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("Study more!")</code></pre><h4>Operators</h4><p><code>></code>, <code><</code>, <code>>=</code>, <code><=</code>, <code>==</code> (equal), <code>!=</code> (not equal).</p>`,
        quiz: [
          { question: "If age = 15, what does 'if age >= 18: print(\"Adult\") else: print(\"Minor\")' output?", options: ["Adult", "Minor", "Nothing", "Error"], answer: 2, explanation: "15 is not >= 18." },
          { question: "What symbol checks if two things are equal?", options: ["=", "==", "===", "!="], answer: 2, explanation: "== checks equality." }
        ]
      },
      {
        id: "py_m4", title: "Module 4: Loops",
        description: "Repeat things without rewriting code.", xpReward: 130,
        content: `<h3>Loops 🔁</h3><h4>For Loop</h4><pre><code class="language-python">for number in range(5):\n    print(number)</code></pre><h4>While Loop</h4><pre><code class="language-python">while lives > 0:\n    lives = lives - 1</code></pre>`,
        quiz: [
          { question: "How many times does 'for i in range(4)' run?", options: ["3", "4", "5", "0"], answer: 2, explanation: "Runs for 0, 1, 2, 3 (4 times)." },
          { question: "Which loop keeps going AS LONG AS a condition is true?", options: ["for", "repeat", "while", "if"], answer: 3, explanation: "while loops use conditions." }
        ]
      },
      {
        id: "py_m5", title: "Module 5: Lists",
        description: "Store collections of items together.", xpReward: 140,
        content: `<h3>Lists 📋</h3><pre><code class="language-python">students = ["Alex", "Jordan", "Maria"]\nprint(students[0]) # Alex</code></pre><p>Add items with <code>.append()</code>.</p>`,
        quiz: [
          { question: "What does colors[1] give if colors = ['red', 'green', 'blue']?", options: ["red", "green", "blue", "Error"], answer: 2, explanation: "Lists start at index 0." },
          { question: "How to add an item to a list?", options: [".add()", ".push()", ".append()", ".insert()"], answer: 3, explanation: ".append() adds to the end." }
        ]
      },
      {
        id: "py_m6", title: "Module 6: Functions",
        description: "Write code once, use it over and over.", xpReward: 160,
        content: `<h3>Functions 🔧</h3><pre><code class="language-python">def add(a, b):\n    return a + b\n\ntotal = add(5, 3)</code></pre>`,
        quiz: [
          { question: "Keyword to create a function?", options: ["function", "create", "def", "make"], answer: 3, explanation: "def stands for define." },
          { question: "What does 'return' do?", options: ["Restarts function", "Stops program", "Sends value back", "Prints value"], answer: 3, explanation: "Sends a value back out." }
        ]
      },
      {
        id: "py_m7", title: "Module 7: Dictionaries",
        description: "Store data in key-value pairs.", xpReward: 180,
        content: `<h3>Dictionaries 📖</h3><p>Use keys instead of numbers to find data.</p><pre><code class="language-python">player = {"name": "Alex", "score": 100}\nprint(player["name"]) # Alex\nplayer["score"] = 150</code></pre>`,
        quiz: [
          { question: "How do you get the score from player = {'score': 10}?", options: ["player[0]", "player.score", "player['score']", "player(score)"], answer: 3, explanation: "Use the string key in brackets." },
          { question: "What brackets are used for dictionaries?", options: ["[]", "()", "{}", "<>"], answer: 3, explanation: "{} define a dictionary." }
        ]
      },
      {
        id: "py_m8", title: "Module 8: Object-Oriented (OOP)",
        description: "Create your own data types with Classes.", xpReward: 200,
        content: `<h3>Classes & Objects 🏗️</h3><pre><code class="language-python">class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print("Woof!")\n\nmy_dog = Dog("Rex")\nmy_dog.bark()</code></pre>`,
        quiz: [
          { question: "What is an Object?", options: ["A function", "A loop", "An instance of a Class", "A variable"], answer: 3, explanation: "Objects are built using Classes as blueprints." },
          { question: "What is 'self' used for?", options: ["Closing the app", "Referring to the specific object", "Deleting data", "Nothing"], answer: 2, explanation: "self refers to the instance of the class calling the method." }
        ]
      },
      {
        id: "py_m9", title: "Module 9: Error Handling",
        description: "Stop your program from crashing.", xpReward: 220,
        content: `<h3>Try / Except 🛡️</h3><p>Catch errors safely.</p><pre><code class="language-python">try:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("You can't divide by zero!")</code></pre>`,
        quiz: [
          { question: "What block runs if an error occurs in the 'try' block?", options: ["catch", "except", "error", "else"], answer: 2, explanation: "Python uses 'except' to handle errors." },
          { question: "Why use Try/Except?", options: ["To make code faster", "To cause errors", "To prevent crashes", "To loop data"], answer: 3, explanation: "It prevents crashes by handling exceptions gracefully." }
        ]
      },
      {
        id: "py_m10", title: "Module 10: File Handling",
        description: "Read and write data to text files.", xpReward: 250,
        content: `<h3>Files 📁</h3><pre><code class="language-python">with open("data.txt", "w") as file:\n    file.write("Hello File!")\n\nwith open("data.txt", "r") as file:\n    print(file.read())</code></pre>`,
        quiz: [
          { question: "What does 'w' stand for in open('file', 'w')?", options: ["Write", "Wait", "Window", "With"], answer: 1, explanation: "'w' opens the file for writing." },
          { question: "Why use 'with open()'? ", options: ["It's faster", "Automatically closes the file", "It looks cool", "It encrypts data"], answer: 2, explanation: "'with' ensures the file is safely closed when done." }
        ]
      },
      {
        id: "py_boss", title: "Boss Battle 🐉: Text-Based RPG",
        description: "Combine everything you've learned to build a game.", xpReward: 500,
        content: `<h3>Boss Battle 🐉</h3><p>It's time to build a real project! You will build a Text RPG where the player fights a dragon.</p><h4>Requirements:</h4><ul><li>Use a <strong>while loop</strong> for the main game loop.</li><li>Use <strong>if/else</strong> to handle player choices (Attack, Heal, Run).</li><li>Use <strong>variables</strong> to track player health and dragon health.</li><li>Use <strong>functions</strong> to calculate damage.</li></ul><p>Write your code in the Playground on the right. When you have a working game, pass the quiz below to claim your massive XP reward!</p>`,
        quiz: [
          { question: "Did you finish building the RPG and test it in the Playground?", options: ["No, not yet", "Yes, I defeated the dragon!"], answer: 1, explanation: "Awesome job! You are officially a Python programmer." }
        ]
      }
    ]
  },

  java: {
    title: "Java Pathway",
    icon: "fa-brands fa-java",
    color: "#e76f51",
    modules: [
      {
        id: "java_m1", title: "Module 1: What is Java?",
        description: "Understand Java structure.", xpReward: 80,
        content: `<h3>Welcome to Java! ☕</h3><pre><code class="language-java">public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}</code></pre><p>All Java statements end with <code>;</code></p>`,
        quiz: [
          { question: "How to print in Java?", options: ["print()", "System.out.println()", "console.log()", "echo()"], answer: 2, explanation: "System.out.println() is the print command." },
          { question: "What must every statement end with?", options: [".", ":", ";", "Nothing"], answer: 3, explanation: "Semicolons are required." }
        ]
      },
      {
        id: "java_m2", title: "Module 2: Variables",
        description: "Learn strict static typing.", xpReward: 100,
        content: `<h3>Variables 📦</h3><pre><code class="language-java">String name = "Jordan";\nint age = 16;\ndouble gpa = 3.8;\nboolean isStudent = true;</code></pre>`,
        quiz: [
          { question: "Create a whole number variable?", options: ["score = 100;", "int score = 100;", "number score = 10;", "var score = 10;"], answer: 2, explanation: "int is for integers." },
          { question: "Type for text?", options: ["text", "str", "String", "char"], answer: 3, explanation: "String (capital S) is used." }
        ]
      },
      {
        id: "java_m3", title: "Module 3: If/Else",
        description: "Decision making in Java.", xpReward: 120,
        content: `<h3>If/Else 🤔</h3><pre><code class="language-java">if (score >= 90) {\n    System.out.println("A");\n} else if (score >= 80) {\n    System.out.println("B");\n}</code></pre>`,
        quiz: [
          { question: "How to write else if?", options: ["elif", "elseif", "else if", "or if"], answer: 3, explanation: "Java uses 'else if'." },
          { question: "What do { } do?", options: ["Lists", "Group code blocks", "Comments", "Nothing"], answer: 2, explanation: "{ } define blocks of code." }
        ]
      },
      {
        id: "java_m4", title: "Module 4: Loops",
        description: "For and While loops.", xpReward: 130,
        content: `<h3>Loops 🔁</h3><pre><code class="language-java">for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}</code></pre>`,
        quiz: [
          { question: "What does i++ do?", options: ["Multiply", "Add 1", "Print", "Subtract 1"], answer: 2, explanation: "Adds 1 to i." },
          { question: "How many times does for(int i=0; i<3; i++) run?", options: ["2", "3", "4", "0"], answer: 2, explanation: "Runs for 0, 1, 2." }
        ]
      },
      {
        id: "java_m5", title: "Module 5: Methods",
        description: "Java's version of functions.", xpReward: 150,
        content: `<h3>Methods 🔧</h3><pre><code class="language-java">static void greet(String name) {\n    System.out.println("Hello, " + name);\n}</code></pre>`,
        quiz: [
          { question: "What does 'void' mean?", options: ["Empty", "Fast", "Doesn't return a value", "Private"], answer: 3, explanation: "Void methods have no return value." },
          { question: "What are functions called in Java?", options: ["Procedures", "Methods", "Commands", "Blocks"], answer: 2, explanation: "They are called methods." }
        ]
      },
      {
        id: "java_m6", title: "Module 6: Arrays & ArrayLists",
        description: "Storing lists of data in Java.", xpReward: 170,
        content: `<h3>Arrays 📋</h3><p>Arrays have fixed sizes. ArrayLists can grow.</p><pre><code class="language-java">int[] nums = {1, 2, 3};\nArrayList&lt;String&gt; list = new ArrayList&lt;&gt;();\nlist.add("Apple");</code></pre>`,
        quiz: [
          { question: "What is the difference between Array and ArrayList?", options: ["Arrays are faster", "ArrayLists can change size", "Arrays only hold text", "No difference"], answer: 2, explanation: "ArrayLists can dynamically grow!" },
          { question: "How to add to an ArrayList?", options: [".push()", ".append()", ".add()", ".insert()"], answer: 3, explanation: "Java uses .add()." }
        ]
      },
      {
        id: "java_m7", title: "Module 7: Classes (OOP)",
        description: "Object Oriented Programming basics.", xpReward: 200,
        content: `<h3>Classes 🏗️</h3><pre><code class="language-java">class Car {\n    String color;\n    void drive() {\n        System.out.println("Vroom");\n    }\n}\nCar myCar = new Car();</code></pre>`,
        quiz: [
          { question: "What keyword creates a new object?", options: ["create", "new", "make", "build"], answer: 2, explanation: "'new' is used to instantiate classes." },
          { question: "Variables inside a class are called?", options: ["Methods", "Fields/Attributes", "Loops", "Pointers"], answer: 2, explanation: "They are fields or attributes." }
        ]
      },
      {
        id: "java_m8", title: "Module 8: Inheritance",
        description: "Classes sharing properties.", xpReward: 220,
        content: `<h3>Inheritance 🧬</h3><p>Use <code>extends</code> to inherit.</p><pre><code class="language-java">class Animal { void eat() {} }\nclass Dog extends Animal { void bark() {} }</code></pre>`,
        quiz: [
          { question: "Which keyword is used for inheritance?", options: ["inherits", "implements", "extends", "copies"], answer: 3, explanation: "'extends' creates a subclass." },
          { question: "A class that extends another is called a?", options: ["Superclass", "Subclass", "Method", "Interface"], answer: 2, explanation: "It's the subclass (or child class)." }
        ]
      },
      {
        id: "java_m9", title: "Module 9: Exceptions",
        description: "Handling crashes in Java.", xpReward: 250,
        content: `<h3>Try / Catch 🛡️</h3><pre><code class="language-java">try {\n    int a = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Error!");\n}</code></pre>`,
        quiz: [
          { question: "What block catches the error in Java?", options: ["except", "catch", "error", "handle"], answer: 2, explanation: "Java uses 'catch'." },
          { question: "What type of object represents an error?", options: ["Exception", "ErrorVar", "Crash", "Bug"], answer: 1, explanation: "Errors are Exception objects." }
        ]
      },
      {
        id: "java_boss", title: "Boss Battle 🏦: Banking System",
        description: "Build an ATM simulator using OOP.", xpReward: 500,
        content: `<h3>Boss Battle 🏦</h3><p>Build a secure Banking application.</p><h4>Requirements:</h4><ul><li>Create a <strong>BankAccount class</strong> with a private balance.</li><li>Add <strong>methods</strong> to deposit, withdraw, and check balance.</li><li>Use <strong>Exception Handling (try/catch)</strong> to prevent withdrawing more money than you have.</li><li>Use a <strong>while loop</strong> for the ATM menu.</li></ul><p>Code it in the Playground, then take the final quiz!</p>`,
        quiz: [
          { question: "Is your Bank System secure against overdrawing?", options: ["No", "Yes, it throws an error if balance is too low!"], answer: 1, explanation: "Great job! Secure code is essential in Java." }
        ]
      }
    ]
  },

  cpp: {
    title: "C++ Conquest",
    icon: "fa-solid fa-microchip",
    color: "#004482",
    modules: [
      {
        id: "cpp_m1", title: "Module 1: What is C++?",
        description: "Speed and power.", xpReward: 80,
        content: `<h3>Welcome to C++! ⚡</h3><pre><code class="language-cpp">#include &lt;iostream&gt;\nint main() {\n    std::cout &lt;&lt; "Hello!" &lt;&lt; std::endl;\n    return 0;\n}</code></pre>`,
        quiz: [
          { question: "What does #include <iostream> do?", options: ["Prints it", "Imports input/output tools", "Creates variable", "Comments"], answer: 2, explanation: "Imports I/O stream tools." },
          { question: "How to print?", options: ["print", "System.out.println", "std::cout <<", "echo"], answer: 3, explanation: "cout with << arrows." }
        ]
      },
      {
        id: "cpp_m2", title: "Module 2: Variables",
        description: "Data types in C++.", xpReward: 100,
        content: `<h3>Variables 📦</h3><pre><code class="language-cpp">int age = 16;\ndouble price = 9.99;\nchar grade = 'A';\nstring name = "Alex";</code></pre>`,
        quiz: [
          { question: "Decimal type?", options: ["float price", "double price;", "decimal", "num"], answer: 2, explanation: "double is the standard decimal type." },
          { question: "What does 'using namespace std;' do?", options: ["Creates namespace", "Imports std library", "Allows omitting std::", "Runs faster"], answer: 3, explanation: "Saves you typing std::." }
        ]
      },
      {
        id: "cpp_m3", title: "Module 3: If/Else & Loops",
        description: "Control flow.", xpReward: 130,
        content: `<h3>Control Flow 🔁</h3><pre><code class="language-cpp">if (x > 0) { cout &lt;&lt; "Pos"; }\nfor (int i=0; i<5; i++) { cout &lt;&lt; i; }</code></pre>`,
        quiz: [
          { question: "What does for(int i=1; i<=3; i++) { cout << i; } print first?", options: ["0", "1", "3", "Nothing"], answer: 2, explanation: "Starts at 1." },
          { question: "Logical AND?", options: ["AND", "&", "&&", "+"], answer: 3, explanation: "&& is logical AND." }
        ]
      },
      {
        id: "cpp_m4", title: "Module 4: Pointers",
        description: "Memory addresses.", xpReward: 200,
        content: `<h3>Pointers ⚡</h3><pre><code class="language-cpp">int score = 100;\nint* ptr = &score;\ncout &lt;&lt; *ptr; // Prints 100</code></pre>`,
        quiz: [
          { question: "What does &x give?", options: ["42", "43", "Memory address", "Error"], answer: 3, explanation: "& is the address-of operator." },
          { question: "What does *ptr do?", options: ["Multiply", "Delete", "Dereferences to value", "Creates pointer"], answer: 3, explanation: "* reads the value at the address." }
        ]
      },
      {
        id: "cpp_m5", title: "Module 5: Vectors",
        description: "Dynamic arrays.", xpReward: 180,
        content: `<h3>Vectors 📈</h3><p>Better than arrays because they can grow!</p><pre><code class="language-cpp">#include &lt;vector&gt;\nvector&lt;int&gt; nums;\nnums.push_back(10);</code></pre>`,
        quiz: [
          { question: "How to add an item to a vector?", options: [".add()", ".push_back()", ".append()", ".insert()"], answer: 2, explanation: "C++ vectors use push_back()." },
          { question: "Advantage of vectors over raw arrays?", options: ["Faster", "Can change size dynamically", "Uses less memory", "None"], answer: 2, explanation: "Vectors automatically resize." }
        ]
      },
      {
        id: "cpp_m6", title: "Module 6: Classes",
        description: "Object-oriented C++.", xpReward: 220,
        content: `<h3>Classes 🏗️</h3><pre><code class="language-cpp">class Player {\npublic:\n    int health;\n    void heal() { health = 100; }\n};</code></pre>`,
        quiz: [
          { question: "What does 'public:' mean in a class?", options: ["It's on the internet", "Functions can be accessed from outside", "It's free", "It's a variable"], answer: 2, explanation: "Public members are accessible outside the class." },
          { question: "How do you call a method on an object?", options: ["obj->method()", "obj.method()", "obj::method()", "method(obj)"], answer: 2, explanation: "Use the dot (.) operator for direct objects." }
        ]
      },
      {
        id: "cpp_m7", title: "Module 7: Memory Management",
        description: "New and Delete.", xpReward: 250,
        content: `<h3>Manual Memory 🧠</h3><pre><code class="language-cpp">int* ptr = new int; // Allocate\n*ptr = 10;\ndelete ptr; // Free memory!</code></pre>`,
        quiz: [
          { question: "What happens if you forget to use 'delete'?", options: ["Nothing", "Memory Leak", "Faster program", "Auto deletes"], answer: 2, explanation: "You get a memory leak!" },
          { question: "What keyword allocates memory on the heap?", options: ["malloc", "create", "new", "alloc"], answer: 3, explanation: "new allocates memory." }
        ]
      },
      {
        id: "cpp_boss", title: "Boss Battle 🎒: Inventory Manager",
        description: "Manage memory and pointers to build a game inventory.", xpReward: 500,
        content: `<h3>Boss Battle 🎒</h3><p>Build a dynamic inventory system for a game character.</p><h4>Requirements:</h4><ul><li>Use <strong>Vectors</strong> to store item names.</li><li>Use <strong>Pointers</strong> to swap items between two players.</li><li>Create an <strong>Item Class</strong> with weight and value.</li></ul><p>Be sure you have zero memory leaks!</p>`,
        quiz: [
          { question: "Did you use pointers correctly without memory leaks?", options: ["No", "Yes, I managed my memory perfectly!"], answer: 1, explanation: "You have conquered C++ memory!" }
        ]
      }
    ]
  },

  js: {
    title: "JavaScript Journey",
    icon: "fa-brands fa-js",
    color: "#f7df1e",
    modules: [
      {
        id: "js_m1", title: "Module 1: What is JS?",
        description: "The language of the web.", xpReward: 80,
        content: `<h3>Welcome to JavaScript! 🌐</h3><p>JavaScript makes websites interactive.</p><pre><code class="language-js">console.log("Hello, Browser!");</code></pre>`,
        quiz: [
          { question: "Where does JavaScript usually run?", options: ["In a database", "In the browser", "In a router", "On a printer"], answer: 2, explanation: "JS runs directly in web browsers." },
          { question: "How to print to the console?", options: ["print()", "console.log()", "System.out()", "echo()"], answer: 2, explanation: "console.log() is used." }
        ]
      },
      {
        id: "js_m2", title: "Module 2: Variables",
        description: "let and const.", xpReward: 100,
        content: `<h3>let & const 📦</h3><pre><code class="language-js">let score = 10; // Can change\nconst pi = 3.14; // Cannot change</code></pre>`,
        quiz: [
          { question: "Which variable keyword cannot be changed?", options: ["let", "var", "const", "static"], answer: 3, explanation: "const means constant." },
          { question: "Which keyword is modern and can be updated?", options: ["var", "let", "update", "set"], answer: 2, explanation: "let is the modern way to declare variables." }
        ]
      },
      {
        id: "js_m3", title: "Module 3: Functions",
        description: "Arrow functions.", xpReward: 130,
        content: `<h3>Arrow Functions 🏹</h3><pre><code class="language-js">const add = (a, b) => {\n    return a + b;\n};</code></pre>`,
        quiz: [
          { question: "What symbol creates an arrow function?", options: ["->", "=>", "==>", ">>>"], answer: 2, explanation: "=> is the arrow function syntax." },
          { question: "How do you call the function 'greet'?", options: ["call greet", "greet()", "run greet", "greet[]"], answer: 2, explanation: "Add parentheses to call." }
        ]
      },
      {
        id: "js_m4", title: "Module 4: Arrays & Objects",
        description: "Storing complex data.", xpReward: 150,
        content: `<h3>Arrays & Objects 📋</h3><pre><code class="language-js">let arr = [1, 2, 3];\nlet obj = { name: "Alex", age: 20 };</code></pre>`,
        quiz: [
          { question: "What brackets for Arrays?", options: ["()", "{}", "[]", "<>"], answer: 3, explanation: "[] for arrays." },
          { question: "What brackets for Objects?", options: ["()", "{}", "[]", "<>"], answer: 2, explanation: "{} for objects." }
        ]
      },
      {
        id: "js_m5", title: "Module 5: DOM Manipulation",
        description: "Changing HTML with JS.", xpReward: 180,
        content: `<h3>The DOM 🖥️</h3><pre><code class="language-js">let btn = document.getElementById("myBtn");\nbtn.innerHTML = "Clicked!";</code></pre>`,
        quiz: [
          { question: "What does DOM stand for?", options: ["Data Object Model", "Document Object Model", "Design Output Module", "Display Orient Matrix"], answer: 2, explanation: "Document Object Model." },
          { question: "How to get an element by its ID?", options: ["get.id()", "document.getElementById()", "findId()", "query()"], answer: 2, explanation: "document.getElementById() is standard." }
        ]
      },
      {
        id: "js_m6", title: "Module 6: Events",
        description: "Listening for clicks.", xpReward: 200,
        content: `<h3>Events 🖱️</h3><pre><code class="language-js">btn.addEventListener("click", () => {\n    alert("Button was clicked!");\n});</code></pre>`,
        quiz: [
          { question: "Which method adds a click listener?", options: ["listen()", "onClick()", "addEventListener()", "bind()"], answer: 3, explanation: "addEventListener hooks up events." },
          { question: "What is 'click'?", options: ["An object", "An event type", "A function", "A style"], answer: 2, explanation: "'click' is a DOM event type." }
        ]
      },
      {
        id: "js_m7", title: "Module 7: Fetch API",
        description: "Getting data from the internet.", xpReward: 250,
        content: `<h3>Fetch 🌍</h3><pre><code class="language-js">fetch('https://api.example.com/data')\n  .then(res => res.json())\n  .then(data => console.log(data));</code></pre>`,
        quiz: [
          { question: "What does fetch() do?", options: ["Deletes data", "Makes network requests", "Sorts arrays", "Draws graphics"], answer: 2, explanation: "Fetch gets resources from the network." },
          { question: "What format is most web API data in?", options: ["XML", "JSON", "CSV", "HTML"], answer: 2, explanation: "JSON is the standard for web data." }
        ]
      },
      {
        id: "js_boss", title: "Boss Battle 📝: To-Do App",
        description: "Build a working To-Do list using the DOM.", xpReward: 500,
        content: `<h3>Boss Battle 📝</h3><p>Time to manipulate the DOM!</p><h4>Requirements:</h4><ul><li>Create an input field and an 'Add' button in HTML.</li><li>Use <strong>addEventListener</strong> to listen for clicks.</li><li>When clicked, create a new <strong>HTML element</strong> (<li>) using JS and append it to a list.</li><li>Bonus: Add a delete button to each item!</li></ul><p>Use the Playground to test your web app!</p>`,
        quiz: [
          { question: "Does your To-Do list let you add items to the screen?", options: ["Not yet", "Yes, my DOM manipulation works!"], answer: 1, explanation: "You're a web developer now!" }
        ]
      }
    ]
  },

  sql: {
    title: "SQL Database Mastery",
    icon: "fa-solid fa-database",
    color: "#336791",
    modules: [
      {
        id: "sql_m1", title: "Module 1: What is SQL?",
        description: "Intro to databases.", xpReward: 80,
        content: `<h3>Databases 🗄️</h3><p>SQL speaks to databases.</p><pre><code class="language-sql">SELECT * FROM users;</code></pre>`,
        quiz: [
          { question: "What does SQL stand for?", options: ["Simple Query Lang", "Structured Query Language", "Server Queue List", "System Query Link"], answer: 2, explanation: "Structured Query Language." },
          { question: "What command retrieves data?", options: ["GET", "PULL", "SELECT", "FETCH"], answer: 3, explanation: "SELECT gets data." }
        ]
      },
      {
        id: "sql_m2", title: "Module 2: Filtering (WHERE)",
        description: "Finding specific data.", xpReward: 100,
        content: `<h3>WHERE clause 🔍</h3><pre><code class="language-sql">SELECT * FROM users WHERE age > 18;</code></pre>`,
        quiz: [
          { question: "Which clause filters rows?", options: ["FILTER", "WHERE", "HAVING", "LIMIT"], answer: 2, explanation: "WHERE filters." },
          { question: "How to select all columns?", options: ["SELECT ALL", "SELECT COLUMNS", "SELECT *", "SELECT #"], answer: 3, explanation: "* means all columns." }
        ]
      },
      {
        id: "sql_m3", title: "Module 3: Sorting Data",
        description: "ORDER BY.", xpReward: 120,
        content: `<h3>ORDER BY 📉</h3><pre><code class="language-sql">SELECT * FROM users ORDER BY score DESC;</code></pre>`,
        quiz: [
          { question: "What orders the results?", options: ["SORT BY", "ORDER BY", "ARRANGE", "ALIGN"], answer: 2, explanation: "ORDER BY is used." },
          { question: "What does DESC mean?", options: ["Describe", "Descending (highest first)", "Descending (lowest first)", "Disconnect"], answer: 2, explanation: "Highest to lowest." }
        ]
      },
      {
        id: "sql_m4", title: "Module 4: Modifying Data",
        description: "INSERT, UPDATE, DELETE.", xpReward: 150,
        content: `<h3>Modifying Data ✍️</h3><pre><code class="language-sql">INSERT INTO users (name) VALUES ('Alex');\nUPDATE users SET score = 100 WHERE id = 1;</code></pre>`,
        quiz: [
          { question: "How to add a new row?", options: ["ADD", "CREATE", "INSERT INTO", "NEW"], answer: 3, explanation: "INSERT INTO adds rows." },
          { question: "Why always use WHERE with UPDATE?", options: ["It's required", "Otherwise it updates EVERY row", "For speed", "To sort it"], answer: 2, explanation: "Without WHERE, all rows change!" }
        ]
      },
      {
        id: "sql_m5", title: "Module 5: JOINs",
        description: "Combining tables.", xpReward: 200,
        content: `<h3>JOINs 🔗</h3><pre><code class="language-sql">SELECT users.name, orders.amount \nFROM users \nJOIN orders ON users.id = orders.user_id;</code></pre>`,
        quiz: [
          { question: "What does JOIN do?", options: ["Deletes tables", "Combines rows from two tables", "Creates a table", "Splits data"], answer: 2, explanation: "Combines data based on related columns." },
          { question: "What specifies HOW tables link together?", options: ["LINK", "WITH", "ON", "BY"], answer: 3, explanation: "ON specifies the matching columns." }
        ]
      },
      {
        id: "sql_boss", title: "Boss Battle 🛒: E-Commerce Database",
        description: "Design and query a complex store database.", xpReward: 500,
        content: `<h3>Boss Battle 🛒</h3><p>You're the Lead Data Engineer for a new store.</p><h4>Requirements:</h4><ul><li>Write queries to <strong>CREATE</strong> a Users table and an Orders table.</li><li><strong>INSERT</strong> at least 5 products and 3 users.</li><li>Write a <strong>JOIN</strong> query to find out which user bought which product.</li></ul><p>Write your SQL queries in the Playground!</p>`,
        quiz: [
          { question: "Were you able to successfully JOIN the users and orders tables?", options: ["No", "Yes, I linked them perfectly!"], answer: 1, explanation: "SQL Master achieved!" }
        ]
      }
    ]
  }
};

fs.writeFileSync('data.js', 'const CourseData = ' + JSON.stringify(CourseData, null, 2) + ';');
console.log("Successfully generated data.js with expanded curriculum!");
