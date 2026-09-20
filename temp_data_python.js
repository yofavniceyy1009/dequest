
const CareerPaths = [
  {
    id: "fullstack",
    title: "Full-Stack Web Developer",
    description: "Build dynamic, full-scale web applications from frontend to backend.",
    icon: "fa-solid fa-layer-group",
    color: "#3b82f6",
    courses: ["html", "css", "js", "react", "node", "sql"]
  },
  {
    id: "data_ai",
    title: "AI & Data Scientist",
    description: "Train machines and analyze massive datasets.",
    icon: "fa-solid fa-brain",
    color: "#10b981",
    courses: ["python", "sql", "ml", "ai"]
  },
  {
    id: "gamedev",
    title: "Game Developer",
    description: "Build interactive 3D worlds and script game mechanics.",
    icon: "fa-solid fa-gamepad",
    color: "#8b5cf6",
    courses: ["gamedev", "csharp", "cpp"]
  },
  {
    id: "cs",
    title: "Computer Science Master",
    description: "The classic university curriculum for software engineers.",
    icon: "fa-solid fa-laptop-code",
    color: "#f59e0b",
    courses: ["cli", "git", "java", "dsa"]
  },
  {
    id: "software_arch",
    title: "Software Architect",
    description: "Design massive enterprise systems and core infrastructure.",
    icon: "fa-solid fa-server",
    color: "#ef4444",
    courses: ["java", "csharp", "cpp", "dsa", "git"]
  },
  {
    id: "cloud_devops",
    title: "Cloud & DevOps Engineer",
    description: "Master server infrastructure, cloud deployment, and backend systems.",
    icon: "fa-solid fa-cloud",
    color: "#06b6d4",
    courses: ["cli", "git", "python", "node", "sql"]
  },
  {
    id: "frontend_ui",
    title: "Frontend UI/UX Expert",
    description: "Design and build beautiful, responsive user interfaces.",
    icon: "fa-solid fa-wand-magic-sparkles",
    color: "#ec4899",
    courses: ["uiux", "html", "css", "js", "react"]
  }
];

const CourseData = {
  "python": {
    "title": "Python Masterclass",
    "icon": "fa-brands fa-python",
    "color": "#306998",
    "modules": [
      {
        "id": "py_m1",
        "title": "Module 1: Variables & Data Types",
        "description": "Learn how to save and use information.",
        "xpReward": 80,
        "content": "<h3>Variables & Data Types 📦</h3>\n<p>Welcome to Python! Python is a friendly, easy-to-read programming language. One of the first things you need to know is how to store information using <strong>variables</strong>. Think of variables as labeled boxes where you can store things for later.</p>\n<hr>\n<h4>1. Creating a Variable</h4>\n<p>To create a variable, you just type a name, use the equals sign (<code>=</code>), and give it a value. Python is smart enough to figure out what type of data it is automatically!</p>\n<pre><code class=\"language-python\">player_name = \"Alicia\"\nplayer_health = 100\n</code></pre>\n<h4>Variable Naming Rules</h4>\n<ul>\n<li>Names cannot start with a number (e.g., <code>1player</code> is illegal).</li>\n<li>Names cannot contain spaces. Use underscores instead (e.g., <code>player_score</code>).</li>\n<li>Names are case-sensitive! <code>score</code> and <code>Score</code> are two completely different boxes!</li>\n</ul>\n<hr>\n<h4>2. Types of Data</h4>\n<p>Different types of information are stored in different <strong>Data Types</strong>:</p>\n<ul>\n<li><strong>Strings (str):</strong> Text. Always wrapped in quotes. <br><code>name = \"Gwen\"</code></li>\n<li><strong>Integers (int):</strong> Whole numbers without decimals. Good for counting. <br><code>level = 5</code></li>\n<li><strong>Floats (float):</strong> Numbers with decimals. Good for money or precise measurements. <br><code>price = 19.99</code></li>\n<li><strong>Booleans (bool):</strong> True or False (must be capitalized!). Good for on/off switches. <br><code>is_game_over = False</code></li>\n</ul>",
        "quiz": [
          {
            "question": "Which of these is a valid variable name in Python?",
            "options": [
              "1_player_score",
              "player score",
              "player_score",
              "player-score"
            ],
            "answer": 3,
            "explanation": "Variable names cannot start with numbers, contain spaces, or use hyphens. Underscores are allowed."
          },
          {
            "question": "What data type is used for whole numbers like 42?",
            "options": [
              "String",
              "Float",
              "Integer",
              "Boolean"
            ],
            "answer": 3,
            "explanation": "Integers represent whole numbers without decimals."
          },
          {
            "question": "How do you create a variable storing text?",
            "options": [
              "name = 'Sam'",
              "name = Sam",
              "string name = 'Sam'",
              "let name = 'Sam'"
            ],
            "answer": 1,
            "explanation": "In Python, you don't need keywords like 'let' or 'string'. Just write the name, =, and the text in quotes."
          },
          {
            "question": "Which of the following is a Boolean value in Python?",
            "options": [
              "true",
              "False",
              "\"True\"",
              "0"
            ],
            "answer": 2,
            "explanation": "Booleans must be capitalized in Python: True or False."
          },
          {
            "question": "What data type is used for decimals, like 19.99?",
            "options": [
              "Integer",
              "Float",
              "Decimal",
              "Double"
            ],
            "answer": 2,
            "explanation": "Floats are used to represent numbers with decimal points."
          }
        ]
      },
      {
        "id": "py_m2",
        "title": "Module 2: Print & Input",
        "description": "Learn how to talk to your user.",
        "xpReward": 100,
        "content": "<h3>Print & Input 🗣️</h3>\n<p>Now that we can store data, let's learn how to make our program actually talk to us and ask us questions!</p>\n<hr>\n<h4>1. Displaying Text with Print</h4>\n<p>We use the <code>print()</code> function to show text or variables on the screen. It is the mouth of your program.</p>\n<pre><code class=\"language-python\">print(\"Hello, world!\")\nplayer_name = \"Miles\"\nprint(\"Welcome to the game,\", player_name)</code></pre>\n<hr>\n<h4>2. Getting User Input</h4>\n<p>Variables get really fun when the <em>player</em> decides what goes in the box. You can do this using the <code>input()</code> function! The program will pause and wait for the user to type something and press Enter.</p>\n<pre><code class=\"language-python\"># This stops the program and waits for the user to type something!\nfavorite_color = input(\"What is your favorite color? \")\nprint(\"Wow, \" + favorite_color + \" is a great color!\")</code></pre>\n<hr>\n<h4>3. Changing Data Types</h4>\n<p>When you use <code>input()</code>, Python always saves the answer as a String (text), even if the user typed a number! If you want to do math, you have to convert it using <code>int()</code> or <code>float()</code>.</p>\n<pre><code class=\"language-python\">age_text = input(\"How old are you? \")\nage_number = int(age_text)\nprint(\"Next year you will be\", age_number + 1)</code></pre>",
        "quiz": [
          {
            "question": "How do you display the text 'Game Over' on the screen?",
            "options": [
              "show('Game Over')",
              "print('Game Over')",
              "display('Game Over')",
              "echo 'Game Over'"
            ],
            "answer": 2,
            "explanation": "The print() function is used to output text."
          },
          {
            "question": "What function pauses the program to let the user type an answer?",
            "options": [
              "wait()",
              "listen()",
              "input()",
              "get()"
            ],
            "answer": 3,
            "explanation": "The input() function asks the user for input."
          },
          {
            "question": "What data type does the input() function ALWAYS return?",
            "options": [
              "Integer",
              "Float",
              "String",
              "Boolean"
            ],
            "answer": 3,
            "explanation": "input() always returns text (a String), even if the user types a number."
          },
          {
            "question": "How do you convert a String like '10' into an Integer?",
            "options": [
              "integer('10')",
              "number('10')",
              "int('10')",
              "to_int('10')"
            ],
            "answer": 3,
            "explanation": "The int() function converts a string into an integer."
          },
          {
            "question": "What will this print? print('Hi', 'there')",
            "options": [
              "Hi there",
              "Hithere",
              "Hi,there",
              "Error"
            ],
            "answer": 1,
            "explanation": "Passing multiple items to print() separated by commas prints them with a space in between."
          }
        ]
      },
      {
        "id": "py_m3",
        "title": "Module 3: If/Else Statements",
        "description": "Make your program make choices.",
        "xpReward": 120,
        "content": "<h3>Decision Making (If/Else) 🤔</h3>\n<p>A game where nothing changes isn't a game at all. Programs need to be smart enough to make decisions based on different situations. We do this using <strong>if statements</strong>.</p>\n<hr>\n<h4>1. The <code>if</code> Statement</h4>\n<p>An <code>if</code> statement checks if a condition is <strong>True</strong>. If it is, it runs the code indented underneath it. Notice the 4 spaces of indentation? That's how Python knows the code belongs to the if statement!</p>\n<pre><code class=\"language-python\">health = 0\nif health == 0:\n    print(\"Game Over!\")</code></pre>\n<p><em>Note: Notice the double equals (<code>==</code>)? A single equals sign assigns a value. A double equals sign ASKS a question: \"Are these equal?\"</em></p>\n<hr>\n<h4>2. The <code>else</code> and <code>elif</code> Statements</h4>\n<p>What if the condition is False? We use <code>else</code> to provide a backup plan. If you have more than two possibilities, use <code>elif</code> (which stands for \"else if\").</p>\n<pre><code class=\"language-python\">score = 85\nif score >= 90:\n    print(\"You got an A!\")\nelif score >= 80:\n    print(\"You got a B!\")\nelse:\n    print(\"You need to study more.\")</code></pre>\n<hr>\n<h4>Comparison Operators</h4>\n<ul>\n<li><code>==</code> : Equal to</li>\n<li><code>!=</code> : Not equal to</li>\n<li><code>&gt;</code>  : Greater than</li>\n<li><code>&lt;</code>  : Less than</li>\n<li><code>&gt;=</code> : Greater than or equal to</li>\n<li><code>&lt;=</code> : Less than or equal to</li>\n</ul>",
        "quiz": [
          {
            "question": "What symbol is used to check if two values are equal?",
            "options": [
              "=",
              "==",
              "===",
              "!="
            ],
            "answer": 2,
            "explanation": "The == operator checks for equality."
          },
          {
            "question": "How does Python know which lines of code are inside an if statement?",
            "options": [
              "Curly braces {}",
              "Parentheses ()",
              "Indentation (spaces)",
              "The word 'end'"
            ],
            "answer": 3,
            "explanation": "Python uses indentation (usually 4 spaces) to group code blocks."
          },
          {
            "question": "What keyword is used to add another condition if the first one is false?",
            "options": [
              "else if",
              "elseif",
              "elif",
              "else"
            ],
            "answer": 3,
            "explanation": "Python uses 'elif', short for else if."
          },
          {
            "question": "If score = 10, what does this output: if score > 10: print('Win') else: print('Lose')",
            "options": [
              "Win",
              "Lose",
              "Nothing",
              "Error"
            ],
            "answer": 2,
            "explanation": "10 is not greater than 10, so the else block runs, printing 'Lose'."
          },
          {
            "question": "What does the != operator mean?",
            "options": [
              "Equals",
              "Not equal to",
              "Greater than",
              "Less than"
            ],
            "answer": 2,
            "explanation": "!= means 'not equal to'."
          }
        ]
      },
      {
        "id": "py_m4",
        "title": "Module 4: Loops (for/while)",
        "description": "Repeat things without rewriting code.",
        "xpReward": 130,
        "content": "<h3>Loops 🔁</h3>\n<p>Programmers are efficiently lazy. If you want to print the numbers 1 to 1000, you shouldn't write 1000 print statements. Instead, you use a <strong>loop</strong> to tell the computer to do the heavy lifting.</p>\n<hr>\n<h4>1. The <code>for</code> Loop</h4>\n<p>Use a <code>for</code> loop when you know <strong>exactly how many times</strong> you want to repeat something.</p>\n<pre><code class=\"language-python\"># range(5) generates numbers 0, 1, 2, 3, 4\nfor number in range(5):\n    print(\"Executing loop...\")\n    print(number)</code></pre>\n<hr>\n<h4>2. The <code>while</code> Loop</h4>\n<p>Use a <code>while</code> loop when you want to keep repeating something <strong>as long as a condition is true</strong>.</p>\n<pre><code class=\"language-python\">lives = 3\nwhile lives > 0:\n    print(\"You are still alive!\")\n    lives = lives - 1 # We must subtract a life, otherwise the loop runs forever!\n    \nprint(\"Game Over!\")</code></pre>\n<p><strong>Warning!</strong> If you forget to subtract a life, it creates an <strong>Infinite Loop</strong>, which will crash your program!</p>\n<hr>\n<h4>3. Breaking out of a Loop</h4>\n<p>You can use the <code>break</code> keyword to smash out of a loop immediately.</p>\n<pre><code class=\"language-python\">while True: # Infinite loop!\n    answer = input(\"Type 'exit' to escape: \")\n    if answer == 'exit':\n        break # Destroys the loop!\n</code></pre>",
        "quiz": [
          {
            "question": "Which loop is best when you know exactly how many times to repeat something?",
            "options": [
              "while loop",
              "for loop",
              "repeat loop",
              "until loop"
            ],
            "answer": 2,
            "explanation": "A for loop (often using range()) is used when the number of iterations is known."
          },
          {
            "question": "Which loop runs as long as a condition remains true?",
            "options": [
              "for loop",
              "while loop",
              "if loop",
              "continuous loop"
            ],
            "answer": 2,
            "explanation": "A while loop checks a condition before every iteration."
          },
          {
            "question": "How many times will this loop run? for i in range(3):",
            "options": [
              "2",
              "3",
              "4",
              "0"
            ],
            "answer": 2,
            "explanation": "range(3) generates 0, 1, 2. The loop runs 3 times."
          },
          {
            "question": "What happens if a while loop's condition never becomes false?",
            "options": [
              "It stops after 100 times",
              "It skips the loop entirely",
              "It creates an infinite loop",
              "It throws an error"
            ],
            "answer": 3,
            "explanation": "It creates an infinite loop which will run forever (or until the program crashes)."
          },
          {
            "question": "What keyword is used to instantly exit a loop early?",
            "options": [
              "stop",
              "exit",
              "quit",
              "break"
            ],
            "answer": 4,
            "explanation": "The 'break' keyword forces the loop to terminate immediately."
          }
        ]
      },
      {
        "id": "py_m5",
        "title": "Module 5: Functions",
        "description": "Write code once, use it over and over.",
        "xpReward": 140,
        "content": "<h3>Functions 🔧</h3>\n<p>As your programs get bigger, you'll find yourself writing the exact same chunk of code in multiple places. A <strong>Function</strong> allows you to package that code into a reusable block, give it a name, and run it whenever you want.</p>\n<hr>\n<h4>1. Defining and Calling a Function</h4>\n<p>To create a function, you use the <code>def</code> keyword, give it a name, and add parentheses <code>()</code>.</p>\n<pre><code class=\"language-python\">def say_hello():\n    print(\"Hello! Welcome to the game.\")\n\n# Nothing happens until we CALL the function!\nsay_hello()</code></pre>\n<hr>\n<h4>2. Parameters (Giving data to a function)</h4>\n<p>Functions become powerful when you can pass data into them. Think of parameters as blank variables that get filled in when the function is called.</p>\n<pre><code class=\"language-python\">def greet_player(name):\n    print(\"Welcome back, \" + name + \"!\")\n\ngreet_player(\"Miles\") # Prints: Welcome back, Miles!</code></pre>\n<hr>\n<h4>3. Return Values (Getting data back)</h4>\n<p>Sometimes you want a function to calculate a result and hand it back to you. We use the <code>return</code> keyword for this.</p>\n<pre><code class=\"language-python\">def add_numbers(num1, num2):\n    total = num1 + num2\n    return total # Sends the result back\n\nresult = add_numbers(5, 10)\nprint(\"The sum is:\", result)</code></pre>",
        "quiz": [
          {
            "question": "What keyword is used to create a function in Python?",
            "options": [
              "function",
              "create",
              "def",
              "make"
            ],
            "answer": 3,
            "explanation": "'def' stands for define."
          },
          {
            "question": "What do we call the blank variables inside the parentheses of a function definition?",
            "options": [
              "Arguments",
              "Parameters",
              "Returns",
              "Globals"
            ],
            "answer": 2,
            "explanation": "Variables defined in the function signature are called parameters."
          },
          {
            "question": "What happens when you define a function but never call it?",
            "options": [
              "It runs once",
              "It throws an error",
              "The code inside it never runs",
              "It runs forever"
            ],
            "answer": 3,
            "explanation": "Functions only execute when they are explicitly called."
          },
          {
            "question": "What keyword sends a value back from a function to the code that called it?",
            "options": [
              "send",
              "output",
              "yield",
              "return"
            ],
            "answer": 4,
            "explanation": "'return' passes a value back out of the function."
          },
          {
            "question": "What does a function do when it hits a return statement?",
            "options": [
              "It restarts",
              "It exits the function immediately",
              "It prints the value",
              "It continues running the rest of the function"
            ],
            "answer": 2,
            "explanation": "A return statement immediately terminates the function execution."
          }
        ]
      },
      {
        "id": "py_m6",
        "title": "Module 6: Lists",
        "description": "Store collections of items together.",
        "xpReward": 150,
        "content": "<h3>Lists 📋</h3>\n<p>What if you want to store 100 usernames? Creating 100 different variables would be a nightmare. Instead, we use a <strong>List</strong> to store a massive collection of items inside a single variable.</p>\n<hr>\n<h4>1. Creating a List</h4>\n<p>Lists are created using square brackets <code>[]</code>, with items separated by commas.</p>\n<pre><code class=\"language-python\">inventory = [\"Sword\", \"Shield\", \"Health Potion\"]\nscores = [95, 80, 100]</code></pre>\n<hr>\n<h4>2. Accessing Items (Indexing)</h4>\n<p>You pull an item out using its position (Index). <strong>Computers start counting at ZERO!</strong> The first item is always at index 0.</p>\n<pre><code class=\"language-python\">print(inventory[0]) # Prints \"Sword\"\nprint(inventory[1]) # Prints \"Shield\"</code></pre>\n<hr>\n<h4>3. Modifying a List</h4>\n<p>Lists can be changed after they are created.</p>\n<pre><code class=\"language-python\"># Add a new item to the end\ninventory.append(\"Magic Wand\")\n\n# Remove a specific item\ninventory.remove(\"Shield\")\n\n# Change an existing item\ninventory[0] = \"Super Sword\"</code></pre>\n<hr>\n<h4>4. Looping through a List</h4>\n<p><code>for</code> loops are absolutely perfect for lists. You can easily execute a block of code for every single item.</p>\n<pre><code class=\"language-python\">for item in inventory:\n    print(\"You are carrying a \" + item)</code></pre>",
        "quiz": [
          {
            "question": "What symbols are used to create a list?",
            "options": [
              "{}",
              "()",
              "[]",
              "<>"
            ],
            "answer": 3,
            "explanation": "Square brackets [] denote a list in Python."
          },
          {
            "question": "If colors = ['red', 'green', 'blue'], what does colors[1] output?",
            "options": [
              "red",
              "green",
              "blue",
              "Error"
            ],
            "answer": 2,
            "explanation": "Lists are zero-indexed, so 0 is red and 1 is green."
          },
          {
            "question": "How do you add a new item to the very end of a list?",
            "options": [
              ".add()",
              ".insert()",
              ".push()",
              ".append()"
            ],
            "answer": 4,
            "explanation": "The .append() method adds an element to the end of a list."
          },
          {
            "question": "Which of these loops is perfectly designed to go through every item in a list?",
            "options": [
              "while loop",
              "for loop",
              "do-while loop",
              "until loop"
            ],
            "answer": 2,
            "explanation": "A for loop can iterate directly over the elements of a list (e.g., for item in my_list:)."
          },
          {
            "question": "If items = ['apple', 'banana'], what does items[0] = 'orange' do?",
            "options": [
              "Adds 'orange' to the list",
              "Replaces 'apple' with 'orange'",
              "Replaces 'banana' with 'orange'",
              "Causes an error"
            ],
            "answer": 2,
            "explanation": "It reassigns the item at index 0 to 'orange'."
          }
        ]
      },
      {
        "id": "py_m7",
        "title": "Module 7: Dictionaries",
        "description": "Store data in key-value pairs.",
        "xpReward": 160,
        "content": "<h3>Dictionaries 📖</h3>\n<p>Lists are great for storing data in a specific order, but what if you want to look up data using a name instead of a number? Think of a real dictionary: you look up a <strong>Word (Key)</strong> to find its <strong>Definition (Value)</strong>. Python Dictionaries work exactly the same way.</p>\n<hr>\n<h4>1. Creating a Dictionary</h4>\n<p>Dictionaries use curly braces <code>{}</code> and store data in <strong>Key-Value pairs</strong> separated by a colon <code>:</code>.</p>\n<pre><code class=\"language-python\">player_stats = {\n    \"name\": \"Peter Parker\",\n    \"health\": 100,\n    \"is_poisoned\": False\n}</code></pre>\n<hr>\n<h4>2. Accessing Data</h4>\n<p>Instead of using a numerical index like <code>[0]</code>, you use the Key (the word) in square brackets to look up the Value.</p>\n<pre><code class=\"language-python\">print(player_stats[\"name\"]) # Prints: Peter Parker\nprint(player_stats[\"health\"]) # Prints: 100</code></pre>\n<hr>\n<h4>3. Modifying Data</h4>\n<p>You can update existing values, or add brand new Key-Value pairs at any time.</p>\n<pre><code class=\"language-python\"># Update an existing value\nplayer_stats[\"health\"] = 80 \n\n# Add a brand new value\nplayer_stats[\"suit_color\"] = \"Red and Blue\"\n</code></pre>\n<hr>\n<h4>4. Looping through a Dictionary</h4>\n<p>You can loop through all the keys and values using the <code>.items()</code> method.</p>\n<pre><code class=\"language-python\">for key, value in player_stats.items():\n    print(key + \": \" + str(value))</code></pre>",
        "quiz": [
          {
            "question": "What brackets are used to create a dictionary?",
            "options": [
              "[]",
              "()",
              "{}",
              "<>"
            ],
            "answer": 3,
            "explanation": "Curly braces {} are used for dictionaries."
          },
          {
            "question": "How is data stored inside a dictionary?",
            "options": [
              "In numerical order",
              "In key-value pairs",
              "In a continuous string",
              "In an array"
            ],
            "answer": 2,
            "explanation": "Dictionaries map keys to values."
          },
          {
            "question": "How do you access the 'score' from a dictionary named 'player'?",
            "options": [
              "player[0]",
              "player.score",
              "player('score')",
              "player['score']"
            ],
            "answer": 4,
            "explanation": "You use square brackets with the key string to access values."
          },
          {
            "question": "What character separates a key and its value when creating a dictionary?",
            "options": [
              "=",
              ",",
              ":",
              ";"
            ],
            "answer": 3,
            "explanation": "A colon : separates the key from the value (e.g., 'name': 'John')."
          },
          {
            "question": "What dictionary method is used to loop through both keys and values at the same time?",
            "options": [
              ".keys()",
              ".values()",
              ".items()",
              ".loop()"
            ],
            "answer": 3,
            "explanation": "The .items() method returns pairs of keys and values."
          }
        ]
      }
    ]
  },
  "java": {
    "title": "Java Masterclass",
    "icon": "fa-brands fa-java",
    "color": "#e76f51",
    "modules": [
      {
        "id": "java_m1",
        "title": "Module 1: Getting Started with Java",
        "description": "Learn what Java is and run your first program.",
        "xpReward": 80,
        "content": "<h3>Getting Started with Java ☕</h3>\n<p>Welcome to Java! Java is one of the most popular programming languages in the world. It is used to build massive enterprise backends (like Netflix), Android apps, and even games like Minecraft. The most important thing to know is that Java is <strong>strict</strong>. Everything must be written inside a Blueprint (called a Class), and every program needs a starting point called the <code>main()</code> method.</p>\n<hr>\n<h4>1. Your First Program</h4>\n<p>To print text in Java, you use <code>System.out.println()</code>. Don't forget that almost every instruction in Java MUST end with a semicolon (<code>;</code>)!</p>\n<pre><code class=\"language-java\">public class Main {\n    // The main method is where the program starts running!\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n        System.out.println(\"Welcome to DevQuest.\");\n    }\n}</code></pre>",
        "quiz": [
          {
            "question": "What is the name of the method where every Java program starts running?",
            "options": [
              "start()",
              "begin()",
              "main()",
              "run()"
            ],
            "answer": 2,
            "explanation": "In Java, the public static void main(String[] args) method is the entry point of the program."
          },
          {
            "question": "What punctuation mark must go at the end of most Java statements?",
            "options": [
              "Colon (:)",
              "Period (.)",
              "Semicolon (;)",
              "Comma (,)"
            ],
            "answer": 2,
            "explanation": "Java requires a semicolon (;) to mark the end of an instruction."
          },
          {
            "question": "How do you print text to the screen in Java?",
            "options": [
              "print()",
              "System.out.println()",
              "console.log()",
              "display()"
            ],
            "answer": 1,
            "explanation": "System.out.println() is used to print text followed by a new line in Java."
          },
          {
            "question": "In Java, every piece of code must be written inside a what?",
            "options": [
              "Method",
              "Variable",
              "Class",
              "String"
            ],
            "answer": 2,
            "explanation": "Java is object-oriented, so all code must be enclosed within a Class definition."
          },
          {
            "question": "Which of the following is true about Java?",
            "options": [
              "It is only used for websites",
              "It is an extremely strict language",
              "It does not use curly braces",
              "It ignores capital letters"
            ],
            "answer": 1,
            "explanation": "Java is strongly typed and has very strict syntax rules compared to languages like Python or JavaScript."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m2",
        "title": "Module 2: Variables & Data Types",
        "description": "Learn how to store different kinds of data.",
        "xpReward": 100,
        "content": "<h3>Variables & Data Types 📦</h3>\n<p>To store information in Java, you use <strong>variables</strong>. Think of a variable as a labeled box. Because Java is strict, you have to tell the computer exactly what <em>type</em> of data the box will hold before you can put anything inside it. Once you declare a box is for whole numbers, you can't sneak text into it!</p>\n<hr>\n<h4>1. Creating Variables</h4>\n<p>You write the data type, then the name of the variable, and then you can give it a value.</p>\n<pre><code class=\"language-java\">int playerAge = 16;          // int is for whole numbers\ndouble itemPrice = 5.99;     // double is for decimals\nboolean hasKey = true;       // boolean is for true/false\nchar grade = 'A';            // char is for a single letter (use single quotes)\nString playerName = \"Alex\";  // String is for text (use double quotes, capital S!)</code></pre>\n<hr>\n<h4>2. Constants</h4>\n<p>If you have a value that should never change (like the maximum score), use the <code>final</code> keyword to lock it.</p>\n<pre><code class=\"language-java\">final int MAX_HEALTH = 100;\n// MAX_HEALTH = 150; // This would cause an error!</code></pre>",
        "quiz": [
          {
            "question": "What data type would you use to store a person's age (e.g., 25)?",
            "options": [
              "String",
              "boolean",
              "int",
              "double"
            ],
            "answer": 2,
            "explanation": "The int (integer) data type is used for whole numbers."
          },
          {
            "question": "Which keyword prevents a variable's value from ever being changed?",
            "options": [
              "final",
              "const",
              "static",
              "locked"
            ],
            "answer": 0,
            "explanation": "In Java, adding 'final' before a variable makes it a constant."
          },
          {
            "question": "How do you declare a variable holding text in Java?",
            "options": [
              "string name = \"Sam\";",
              "String name = \"Sam\";",
              "text name = \"Sam\";",
              "char name = \"Sam\";"
            ],
            "answer": 1,
            "explanation": "The String data type must be capitalized and uses double quotes for text."
          },
          {
            "question": "Which of these is the correct way to make a boolean variable?",
            "options": [
              "boolean isReady = True;",
              "Boolean isReady = true;",
              "boolean isReady = \"true\";",
              "boolean isReady = true;"
            ],
            "answer": 3,
            "explanation": "The boolean type is lowercase, and the values true/false must also be lowercase without quotes."
          },
          {
            "question": "What does the 'double' data type store?",
            "options": [
              "Twice the amount of text",
              "Numbers with decimal points",
              "Two whole numbers",
              "True or false values"
            ],
            "answer": 1,
            "explanation": "The double data type is used to store floating-point (decimal) numbers."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m3",
        "title": "Module 3: Input & Output",
        "description": "Talk to your user and get their responses.",
        "xpReward": 120,
        "content": "<h3>Input & Output 🎙️</h3>\n<p>You already know how to output text using <code>System.out.println()</code>. But a program is much more fun when the user can type things back! In Java, getting input from the keyboard requires a special tool called a <strong>Scanner</strong>.</p>\n<hr>\n<h4>1. Using the Scanner</h4>\n<p>To use the Scanner, you first have to <em>import</em> it at the very top of your file. Then, you create a new Scanner object and use its methods to read what the user types.</p>\n<pre><code class=\"language-java\">import java.util.Scanner; // Bring in the tool!\n\npublic class Main {\n    public static void main(String[] args) {\n        // Create the scanner (it listens to System.in, which is the keyboard)\n        Scanner myScanner = new Scanner(System.in);\n        \n        System.out.println(\"What is your name?\");\n        // .nextLine() pauses the program and waits for the user to hit Enter\n        String userName = myScanner.nextLine(); \n        \n        System.out.println(\"Hello, \" + userName + \"!\");\n    }\n}</code></pre>\n<p>If you want them to type a number instead of text, you would use <code>myScanner.nextInt()</code> or <code>myScanner.nextDouble()</code>.</p>",
        "quiz": [
          {
            "question": "What class do you use to read keyboard input in Java?",
            "options": [
              "Keyboard",
              "InputReader",
              "Scanner",
              "SystemIn"
            ],
            "answer": 2,
            "explanation": "The Scanner class is the standard way to read input in basic Java programs."
          },
          {
            "question": "Which statement must go at the top of your file to use Scanner?",
            "options": [
              "include java.Scanner;",
              "import java.util.Scanner;",
              "load java.util.Scanner;",
              "use Scanner;"
            ],
            "answer": 1,
            "explanation": "You must import java.util.Scanner before you can use it."
          },
          {
            "question": "What method reads a full line of text typed by the user?",
            "options": [
              "nextLine()",
              "readText()",
              "getString()",
              "nextText()"
            ],
            "answer": 0,
            "explanation": "The nextLine() method reads all input until the user presses Enter."
          },
          {
            "question": "If you want the user to type a whole number, which method should you use?",
            "options": [
              "nextLine()",
              "nextNumber()",
              "nextInteger()",
              "nextInt()"
            ],
            "answer": 3,
            "explanation": "nextInt() is used to read an integer from the user."
          },
          {
            "question": "What goes inside the parentheses when creating a new Scanner for the keyboard?",
            "options": [
              "new Scanner(\"keyboard\")",
              "new Scanner(System.out)",
              "new Scanner(System.in)",
              "new Scanner(input)"
            ],
            "answer": 2,
            "explanation": "System.in represents standard input (the keyboard)."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m4",
        "title": "Module 4: Making Decisions",
        "description": "Use if/else statements to make choices.",
        "xpReward": 130,
        "content": "<h3>Making Decisions 🚦</h3>\n<p>Programs need to be smart enough to act differently depending on the situation. We do this using <strong>if/else statements</strong>. You give Java a condition in parentheses, and if it's true, it runs the code inside the curly braces <code>{}</code>.</p>\n<hr>\n<h4>1. If, Else If, and Else</h4>\n<pre><code class=\"language-java\">int playerHealth = 45;\n\nif (playerHealth > 50) {\n    System.out.println(\"You are looking healthy!\");\n} else if (playerHealth > 0) {\n    System.out.println(\"Warning: Low health.\");\n} else {\n    System.out.println(\"Game Over!\");\n}</code></pre>\n<hr>\n<h4>2. Comparing Strings (Important!)</h4>\n<p>In Java, you use <code>==</code> to compare numbers. However, you <strong>cannot</strong> use <code>==</code> to compare text! To check if two Strings are identical, you must use the <code>.equals()</code> method.</p>\n<pre><code class=\"language-java\">String secretCode = \"open\";\n\n// WRONG: if (secretCode == \"open\") \n\n// CORRECT:\nif (secretCode.equals(\"open\")) {\n    System.out.println(\"The door unlocks.\");\n}</code></pre>",
        "quiz": [
          {
            "question": "What symbols wrap the condition you are testing in an if statement?",
            "options": [
              "Curly braces {}",
              "Square brackets []",
              "Parentheses ()",
              "Quotation marks \"\""
            ],
            "answer": 2,
            "explanation": "The condition must be enclosed in parentheses, like if (score > 10)."
          },
          {
            "question": "What symbols are used to group the code that runs when an if statement is true?",
            "options": [
              "Curly braces {}",
              "Square brackets []",
              "Parentheses ()",
              "Quotation marks \"\""
            ],
            "answer": 0,
            "explanation": "Curly braces {} group blocks of code in Java."
          },
          {
            "question": "How do you check if two numbers are exactly equal?",
            "options": [
              "=",
              "==",
              "===",
              ".equals()"
            ],
            "answer": 1,
            "explanation": "The double equals (==) is the equality operator for numbers."
          },
          {
            "question": "How do you check if a String variable named 'color' equals 'Red'?",
            "options": [
              "if (color == \"Red\")",
              "if (color = \"Red\")",
              "if (color.equals(\"Red\"))",
              "if (color.matches(\"Red\"))"
            ],
            "answer": 2,
            "explanation": "You must use the .equals() method to compare String contents in Java."
          },
          {
            "question": "Which keyword is used to provide a backup condition if the first one fails?",
            "options": [
              "else if",
              "elif",
              "otherwise",
              "next"
            ],
            "answer": 0,
            "explanation": "Java uses 'else if' for additional conditional checks."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m5",
        "title": "Module 5: Loops",
        "description": "Repeat tasks without copying and pasting.",
        "xpReward": 140,
        "content": "<h3>Loops 🔁</h3>\n<p>Programmers don't like doing the same thing twice. If you want to print the numbers 1 to 100, you shouldn't write 100 print statements. Instead, you use a <strong>loop</strong>.</p>\n<hr>\n<h4>1. The While Loop</h4>\n<p>A <code>while</code> loop keeps repeating its code as long as a condition is true. Don't forget to update your variable inside the loop, or it will run forever (an infinite loop)!</p>\n<pre><code class=\"language-java\">int count = 3;\nwhile (count > 0) {\n    System.out.println(count + \"...\");\n    count = count - 1; // Decrease by 1\n}\nSystem.out.println(\"Go!\");</code></pre>\n<hr>\n<h4>2. The For Loop</h4>\n<p>A <code>for</code> loop packs everything into one line. It is perfect when you know exactly how many times you want to repeat. It has three parts: the starting variable, the condition, and how to change the variable each time.</p>\n<pre><code class=\"language-java\">// Start i at 0; run as long as i is less than 5; increase i by 1 (i++)\nfor (int i = 0; i < 5; i++) {\n    System.out.println(\"Running lap \" + i);\n}</code></pre>",
        "quiz": [
          {
            "question": "Which loop is best when you know exactly how many times it should run?",
            "options": [
              "while loop",
              "for loop",
              "do-while loop",
              "infinite loop"
            ],
            "answer": 1,
            "explanation": "A for loop is designed for iterating a specific number of times."
          },
          {
            "question": "What does the code 'i++' do?",
            "options": [
              "Adds 2 to i",
              "Multiplies i by itself",
              "Adds 1 to i",
              "Subtracts 1 from i"
            ],
            "answer": 2,
            "explanation": "i++ is shorthand for i = i + 1."
          },
          {
            "question": "What happens if a while loop's condition never becomes false?",
            "options": [
              "It skips the loop",
              "It runs exactly 100 times",
              "It creates an infinite loop and crashes",
              "It throws a compiler error"
            ],
            "answer": 2,
            "explanation": "If the condition stays true forever, the loop will never stop, freezing the program."
          },
          {
            "question": "What character separates the three parts inside the parentheses of a for loop?",
            "options": [
              "Comma (,)",
              "Period (.)",
              "Colon (:)",
              "Semicolon (;)"
            ],
            "answer": 3,
            "explanation": "The three parts of a for loop are separated by semicolons (e.g., for(int i=0; i<5; i++) )."
          },
          {
            "question": "Which loop checks its condition before every single iteration?",
            "options": [
              "for loop only",
              "while loop only",
              "Both for and while loops",
              "Neither"
            ],
            "answer": 2,
            "explanation": "Both 'for' and 'while' loops evaluate their condition before running the code block each time."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m6",
        "title": "Module 6: Methods",
        "description": "Package code into reusable blocks.",
        "xpReward": 150,
        "content": "<h3>Methods 🧰</h3>\n<p>A <strong>method</strong> (called a function in other languages) is a named block of code. Instead of copying and pasting the same 10 lines of code everywhere, you write it once inside a method, and then \"call\" its name whenever you need it!</p>\n<hr>\n<h4>1. Creating a Method</h4>\n<p>You must specify what the method will hand back when it's done. If it just does an action and returns nothing, you use the keyword <code>void</code>.</p>\n<pre><code class=\"language-java\">public class Main {\n    // A void method that takes a String parameter\n    public static void greetUser(String name) {\n        System.out.println(\"Welcome, \" + name + \"!\");\n    }\n\n    public static void main(String[] args) {\n        greetUser(\"Alicia\"); // We call the method here!\n    }\n}</code></pre>\n<hr>\n<h4>2. Returning Data</h4>\n<p>If you want a method to calculate something and give you the answer, replace <code>void</code> with the data type you are returning (like <code>int</code>), and use the <code>return</code> keyword.</p>\n<pre><code class=\"language-java\">public static int multiply(int a, int b) {\n    return a * b; // Hands the integer back\n}</code></pre>",
        "quiz": [
          {
            "question": "What is a function called in Java?",
            "options": [
              "A variable",
              "A method",
              "A loop",
              "A class"
            ],
            "answer": 1,
            "explanation": "Functions are called methods in Java because they belong to a class."
          },
          {
            "question": "What keyword means a method does NOT return any data?",
            "options": [
              "empty",
              "null",
              "void",
              "nothing"
            ],
            "answer": 2,
            "explanation": "The 'void' keyword signifies that the method executes actions but returns no value."
          },
          {
            "question": "What keyword is used to send a calculated value back out of a method?",
            "options": [
              "send",
              "output",
              "return",
              "give"
            ],
            "answer": 2,
            "explanation": "The 'return' keyword passes a value back to the code that called the method."
          },
          {
            "question": "Where are parameters placed when defining a method?",
            "options": [
              "Inside curly braces {}",
              "Inside parentheses ()",
              "After the return statement",
              "Before the method name"
            ],
            "answer": 1,
            "explanation": "Parameters (the inputs to the method) are defined inside the parentheses after the method name."
          },
          {
            "question": "If a method is defined as 'public static int getScore()', what type of data must it return?",
            "options": [
              "String",
              "void",
              "int",
              "boolean"
            ],
            "answer": 2,
            "explanation": "The return type is specified right before the method name, which is 'int' in this case."
          }
        ],
        "tier": "Beginner"
      },
      {
        "id": "java_m7",
        "title": "Module 7: Arrays",
        "description": "Store lists of multiple items.",
        "xpReward": 160,
        "content": "<h3>Arrays 📚</h3>\n<p>What if you want to store 5 high scores? Making 5 separate variables is tedious. An <strong>Array</strong> is a single variable that holds a list of items of the same type. In Java, arrays have a <strong>fixed size</strong>—once you create an array to hold 5 items, it can never hold 6!</p>\n<hr>\n<h4>1. Creating an Array</h4>\n<p>You use square brackets <code>[]</code> to indicate an array. You can create an empty array with a specific size, or fill it with data immediately.</p>\n<pre><code class=\"language-java\">// Create an array that holds exactly 3 integers\nint[] highScores = new int[3];\nhighScores[0] = 95; // Computers start counting at 0!\nhighScores[1] = 80;\nhighScores[2] = 100;\n\n// Or, create it with data instantly\nString[] inventory = {\"Sword\", \"Shield\", \"Potion\"};\nSystem.out.println(\"You equipped a \" + inventory[0]); // Prints: Sword</code></pre>\n<hr>\n<h4>2. Looping through an Array</h4>\n<p>You can use a <code>for</code> loop to easily visit every item in an array using the <code>.length</code> property.</p>\n<pre><code class=\"language-java\">for (int i = 0; i < inventory.length; i++) {\n    System.out.println(\"Item: \" + inventory[i]);\n}</code></pre>",
        "quiz": [
          {
            "question": "What symbols are used to declare an array in Java?",
            "options": [
              "{}",
              "()",
              "[]",
              "<>"
            ],
            "answer": 2,
            "explanation": "Square brackets [] are used to denote arrays, e.g., int[] scores."
          },
          {
            "question": "What is the index of the first item in a Java array?",
            "options": [
              "1",
              "0",
              "-1",
              "It varies"
            ],
            "answer": 1,
            "explanation": "Arrays are zero-indexed, meaning the first element is at position 0."
          },
          {
            "question": "True or False: You can change the size of a standard Java array after creating it.",
            "options": [
              "True",
              "False"
            ],
            "answer": 1,
            "explanation": "Standard Java arrays have a fixed size. You cannot add more slots later."
          },
          {
            "question": "How do you find out how many items an array can hold?",
            "options": [
              ".size()",
              ".count",
              ".length",
              ".capacity"
            ],
            "answer": 2,
            "explanation": "The .length property gives you the total number of slots in the array."
          },
          {
            "question": "If String[] colors = {\"Red\", \"Blue\", \"Green\"}; what does colors[1] give you?",
            "options": [
              "Red",
              "Blue",
              "Green",
              "Error"
            ],
            "answer": 1,
            "explanation": "Index 0 is \"Red\", so Index 1 is \"Blue\"."
          }
        ],
        "tier": "Beginner"
      },
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
      },
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
    ]
  },
  "cpp": {
    "title": "C++ Masterclass",
    "icon": "fa-brands fa-cuttlefish",
    "color": "#00599C",
    "modules": [
      {
        "id": "cpp_m1",
        "title": "Module 1: High Performance I/O",
        "description": "Welcome to high-performance C++.",
        "xpReward": 100,
        "content": "<h3>Welcome to C++: The Manual Racecar 🏎️</h3>\n<p>If Python is a self-driving Tesla, <strong>C++</strong> is a manual-transmission Formula 1 racecar. Python does everything for you (like shifting gears). C++ forces YOU to do everything manually.</p>\n<p>Why would anyone want that? Because if you know what you are doing, the manual racecar is <strong>insanely fast.</strong> That's why every major video game (like Fortnite or Call of Duty) is built in C++!</p>\n<hr>\n<h4>1. Manual Memory Management (The Heap)</h4>\n<p>In Python or Java, when you create a variable, the computer automatically finds a spot in its brain (RAM memory) to store it. When you are done, the computer automatically throws it in the trash.</p>\n<p>In C++, YOU have to claim the memory yourself. And more importantly... YOU have to throw it in the trash yourself! If you forget, the computer's brain fills up and it crashes. This is called a <strong>Memory Leak</strong>.</p>\n<hr>\n<h4>2. Pointers (The Treasure Map)</h4>\n<p>To control memory directly, C++ uses something called a <strong>Pointer</strong>. A pointer is NOT a variable. It does not hold data. A pointer is a <em>treasure map</em> that points to the exact physical address in the computer's brain where the data lives.</p>\n<pre><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    // 1. Create a normal variable\n    int health = 100;\n    \n    // 2. Create a Pointer (the asterisk * means pointer)\n    // The ampersand & means \"get the physical address of the health variable\"\n    int* healthPointer = &health;\n    \n    // If you print the pointer, it looks like gibberish (e.g., 0x7ffeeb5a)\n    // That is the exact microscopic coordinate on your RAM chip!\n    cout &lt;&lt; healthPointer &lt;&lt; endl;\n    \n    // 3. Dereferencing: Following the map to get the treasure!\n    // Adding the asterisk back means \"go to the address and grab the actual value\"\n    cout &lt;&lt; *healthPointer &lt;&lt; endl; // Prints 100\n    \n    return 0;\n}</code></pre>",
        "quiz": [
          {
            "question": "What operator is used to push text to std::cout?",
            "options": [
              ">>",
              "<<",
              "==",
              "=>"
            ],
            "answer": 2,
            "explanation": "<< is the stream insertion operator."
          }
        ]
      },
      {
        "id": "cpp_m2",
        "title": "Module 2: Memory & Pointers",
        "description": "The core feature of C++.",
        "xpReward": 150,
        "content": "<h3>Pointers (The Scary Part Made Easy) 📍</h3>\n<p>In languages like Python, memory is managed for you. In C++, you have direct access to the computer's RAM. A <strong>Pointer</strong> is simply a variable that stores the <em>Memory Address</em> of another variable.</p>\n<hr>\n<h4>1. Getting an Address</h4>\n<p>Use the <code>&amp;</code> (Address-Of) operator to find out exactly where a variable lives in RAM!</p>\n<pre><code class=\"language-cpp\">#include &lt;iostream&gt;\n\nint main() {\n    int health = 100;\n    \n    // Prints 100\n    std::cout &lt;&lt; \"Health: \" &lt;&lt; health &lt;&lt; \"\\n\"; \n    \n    // Prints a crazy memory address like 0x7ffee92a2a!\n    std::cout &lt;&lt; \"Memory Address: \" &lt;&lt; &amp;health &lt;&lt; \"\\n\"; \n    return 0;\n}</code></pre>\n<hr>\n<h4>2. Creating a Pointer</h4>\n<p>Use the <code>*</code> operator to declare a Pointer variable, and to \"Dereference\" it (meaning: grab the value at that address).</p>\n<pre><code class=\"language-cpp\">int score = 50;\nint* ptr = &amp;score; // ptr now holds the memory address of score\n\n// Dereferencing: Change the value AT that memory address!\n*ptr = 99;\n\nstd::cout &lt;&lt; score; // Prints 99! We changed it via the pointer!</code></pre>",
        "quiz": [
          {
            "question": "What does the & operator do?",
            "options": [
              "Dereferences a pointer",
              "Gets the memory address",
              "Multiplies variables",
              "Adds variables"
            ],
            "answer": 2,
            "explanation": "& gets the address in RAM."
          }
        ]
      },
      {
        "id": "cpp_m3",
        "title": "Module 3: Classes & Structs",
        "description": "OOP in C++.",
        "xpReward": 180,
        "content": "<h3>Classes & Structs 🏗️</h3>\n<p>C++ uses Classes exactly like Java, but it also has <code>structs</code>. In C++, a struct is just a class where everything is public by default!</p>\n<hr>\n<h4>1. Creating a Class</h4>\n<p>Notice the <code>public:</code> specifier. You MUST put a semicolon after the closing brace of a class!</p>\n<pre><code class=\"language-cpp\">#include &lt;iostream&gt;\n#include &lt;string&gt;\n\nclass Player {\nprivate:\n    int health;\npublic:\n    std::string name;\n    \n    // Constructor\n    Player(std::string n, int h) {\n        name = n;\n        health = h;\n    }\n    \n    void printStatus() {\n        std::cout &lt;&lt; name &lt;&lt; \" has \" &lt;&lt; health &lt;&lt; \" HP.\" &lt;&lt; std::endl;\n    }\n}; // &lt;-- DON'T FORGET THIS SEMICOLON!\n\nint main() {\n    Player p(\"Doomguy\", 100);\n    p.printStatus();\n    return 0;\n}</code></pre>",
        "quiz": [
          {
            "question": "What is required at the very end of a class definition in C++?",
            "options": [
              "A return statement",
              "A semicolon ;",
              "A period .",
              "Nothing"
            ],
            "answer": 2,
            "explanation": "C++ requires a semicolon after a class definition."
          }
        ]
      },
      {
        "id": "cpp_m4",
        "title": "Module 4: Standard Template Library",
        "description": "C++ Vectors.",
        "xpReward": 200,
        "content": "<h3>Vectors (The STL) 📚</h3>\n<p>C++ has standard fixed arrays (<code>int arr[5];</code>), but for dynamic arrays, it uses <code>std::vector</code> from the Standard Template Library (STL).</p>\n<hr>\n<h4>1. Using Vectors</h4>\n<pre><code class=\"language-cpp\">#include &lt;iostream&gt;\n#include &lt;vector&gt; // MUST INCLUDE THIS!\n#include &lt;string&gt;\n\nint main() {\n    std::vector&lt;std::string&gt; inventory;\n    \n    // Add items\n    inventory.push_back(\"Sword\");\n    inventory.push_back(\"Shield\");\n    \n    // Loop through vector\n    for (int i = 0; i &lt; inventory.size(); i++) {\n        std::cout &lt;&lt; \"Item: \" &lt;&lt; inventory[i] &lt;&lt; std::endl;\n    }\n    return 0;\n}</code></pre>\n<p><code>push_back()</code> is the C++ equivalent of Python's <code>append()</code> or Java's <code>add()</code>.</p>",
        "quiz": [
          {
            "question": "Which function adds an element to the end of a std::vector?",
            "options": [
              "append()",
              "push_back()",
              "add()",
              "insert()"
            ],
            "answer": 2,
            "explanation": "push_back() adds an element to the back of the vector."
          }
        ]
      },
      {
        "id": "cpp_m5",
        "title": "Module 5: Dynamic Memory",
        "description": "Managing the Heap.",
        "xpReward": 250,
        "content": "<h3>Dynamic Memory 🧠</h3>\n<p>In Java, when an object is no longer used, the \"Garbage Collector\" deletes it for you. In C++, YOU are the garbage collector. If you create memory dynamically on the \"Heap\", you MUST delete it, or you will cause a <strong>Memory Leak</strong> that crashes your game!</p>\n<hr>\n<h4>1. new and delete</h4>\n<pre><code class=\"language-cpp\">#include &lt;iostream&gt;\n\nint main() {\n    // Allocate memory on the heap\n    int* bossHealth = new int;\n    *bossHealth = 10000;\n    \n    std::cout &lt;&lt; \"Boss HP: \" &lt;&lt; *bossHealth &lt;&lt; std::endl;\n    \n    // YOU MUST DELETE THIS WHEN DONE!\n    delete bossHealth; \n    \n    // Good practice: point it to null so you don't accidentally use deleted memory\n    bossHealth = nullptr;\n    \n    return 0;\n}</code></pre>",
        "quiz": [
          {
            "question": "If you allocate memory with 'new', what keyword must you use later?",
            "options": [
              "free",
              "remove",
              "delete",
              "destroy"
            ],
            "answer": 3,
            "explanation": "new must always be paired with delete to prevent memory leaks."
          }
        ]
      },
      {
        "id": "cpp_boss",
        "title": "Boss Battle 🎒: Inventory Memory System",
        "description": "Build a leak-free inventory.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🎒: Inventory System</h3>\n<p>You know how to manage memory dynamically in C++. It's time to build a robust inventory system using pointers.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create an <code>Item</code> struct with a name, weight, and value.</li>\n<li>In <code>main()</code>, dynamically allocate an array of Items on the Heap using <code>new</code>.</li>\n<li>Allow the user to input data to populate the inventory.</li>\n<li>Iterate through the inventory using a pointer, printing out all items.</li>\n<li>Clean up the memory using <code>delete[]</code> to prevent a memory leak before the program exits!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did you clean up all your memory?",
            "options": [
              "No, it leaked",
              "Yes, no memory leaks here!"
            ],
            "answer": 2,
            "explanation": "Excellent! Memory management is the key to C++."
          }
        ]
      }
    ]
  },
  "js": {
    "title": "JavaScript Masterclass",
    "icon": "fa-brands fa-js",
    "color": "#f7df1e",
    "modules": [
      {
        "id": "js_1",
        "title": "Module 1: Making the Web Alive",
        "description": "Variables and the Console.",
        "xpReward": 100,
        "content": "<h3>Welcome to JavaScript: The Brain & Electricity ⚡</h3>\n<p>HTML is the skeleton. CSS is the paint. But right now, our house is dead. If you click a light switch, nothing happens. If you open a door, it doesn't move. <strong>JavaScript</strong> is the electricity and the brain of the house. It makes things move, think, calculate, and react to your clicks!</p>\n<hr>\n<h4>1. Variables: The Memory Boxes</h4>\n<p>If JavaScript is a brain, it needs a memory. Imagine you are moving to a new house. You put your books in a cardboard box, and you write \"Books\" on the outside with a marker. A <strong>Variable</strong> is exactly like that box. It holds information so the computer can remember it.</p>\n<p>In modern JavaScript, we use <code>let</code> for a box that can be opened and changed later, and <code>const</code> for a box that is super-glued shut and can NEVER be changed.</p>\n<pre><code class=\"language-javascript\">// We use 'let' because your score will change as you play!\nlet score = 0; \n\n// We use 'const' because your birth name will never change!\nconst playerName = \"Alicia\"; \n\n// Let's add 10 to the score box!\nscore = score + 10; \n\n// console.log() is how we make the computer whisper the answer to us in the developer tools.\nconsole.log(\"Great job \" + playerName + \"! Your score is \" + score);</code></pre>",
        "quiz": [
          {
            "question": "What keyword is used to declare a variable that CANNOT be changed?",
            "options": [
              "let",
              "var",
              "static",
              "const"
            ],
            "answer": 4,
            "explanation": "const stands for constant."
          }
        ]
      },
      {
        "id": "js_2",
        "title": "Module 2: DOM Manipulation",
        "description": "Change HTML with JavaScript.",
        "xpReward": 120,
        "content": "<h3>DOM Manipulation: Hacking the Screen 🪄</h3>\n<p>JavaScript has a superpower. It can reach its invisible hands into the HTML skeleton and change it while the user is watching! This is called <strong>DOM Manipulation</strong> (Document Object Model). Imagine being able to magically change the color of a painted wall just by snapping your fingers.</p>\n<hr>\n<h4>1. Finding the Element</h4>\n<p>Before JavaScript can change something, it has to find it. Remember how we gave HTML tags special names using IDs? JavaScript acts like a detective and searches the document for that ID.</p>\n<pre><code class=\"language-html\">&lt;!-- We have a boring title with the ID of 'main-title' --&gt;\n&lt;h1 id=\"main-title\"&gt;Boring Website&lt;/h1&gt;</code></pre>\n<hr>\n<h4>2. Changing it Live!</h4>\n<pre><code class=\"language-javascript\">// 1. The Detective Work: Find the H1 tag and save it in a memory box called 'title'\nconst title = document.getElementById(\"main-title\");\n\n// 2. The Magic: Reach inside and change the text instantly!\ntitle.innerText = \"HACKED BY JAVASCRIPT! 😎\";\n\n// 3. More Magic: Reach inside and change the CSS paint instantly!\ntitle.style.color = \"lime\";\ntitle.style.fontSize = \"100px\";</code></pre>\n<p>If you put this code in a website, the moment the page loads, the text will instantly transform before your very eyes. That is the power of JS!</p>",
        "quiz": [
          {
            "question": "What method finds an HTML element by its ID?",
            "options": [
              "querySelector()",
              "findElement()",
              "getElementById()",
              "find()"
            ],
            "answer": 3,
            "explanation": "document.getElementById() fetches a specific element."
          }
        ]
      },
      {
        "id": "js_3",
        "title": "Module 3: Event Listeners",
        "description": "React to user clicks.",
        "xpReward": 150,
        "content": "<h3>Event Listeners: Reacting to Clicks 🖱️</h3>\n<p>A website that changes on its own is cool, but a website that reacts to the user is a true application. How does Netflix know to play a movie when you click a button? It uses an <strong>Event Listener</strong>.</p>\n<p>Imagine a security guard standing next to a door. Their only job is to \"listen\" for someone trying to open the door, and when it happens, they sound an alarm. That is exactly what an Event Listener does.</p>\n<hr>\n<h4>1. Setting the Trap</h4>\n<p>We first find the button using our detective skills. Then, we attach an event listener to it. We tell it: <em>\"Listen for a 'click'. When a click happens, run this function!\"</em></p>\n<pre><code class=\"language-html\">&lt;button id=\"buy-btn\"&gt;Buy Now!&lt;/button&gt;</code></pre>\n\n<pre><code class=\"language-javascript\">// 1. Find the button\nconst button = document.getElementById(\"buy-btn\");\n\n// 2. Attach the security guard (Event Listener)\nbutton.addEventListener(\"click\", function() {\n    \n    // Everything inside these curly braces {} will ONLY happen WHEN the button is clicked!\n    alert(\"Thank you for your purchase!\");\n    \n    // Let's also change the button so they can't click it again\n    button.innerText = \"Purchased!\";\n    button.style.backgroundColor = \"gray\";\n    \n});</code></pre>\n<p>Now, your website is fully interactive. You have built a true web application!</p>",
        "quiz": [
          {
            "question": "Which method attaches a click event to an element?",
            "options": [
              "onClick()",
              "addEventListener()",
              "listenFor()",
              "bind()"
            ],
            "answer": 2,
            "explanation": "addEventListener allows you to listen for specific events."
          }
        ]
      },
      {
        "id": "js_4",
        "title": "Module 4: Arrow Functions",
        "description": "The modern way to write functions.",
        "xpReward": 180,
        "content": "<h3>Arrow Functions 🏹</h3>\n<p>In modern JavaScript (ES6), developers rarely use the <code>function</code> keyword. Instead, we use Arrow Functions because they are shorter and cleaner.</p>\n<hr>\n<h4>1. The Syntax</h4>\n<pre><code class=\"language-javascript\">// Old way\nfunction add(a, b) {\n    return a + b;\n}\n\n// Modern Arrow Function\nconst add = (a, b) =&gt; {\n    return a + b;\n};\n\n// Extremely short one-liner (implicit return)\nconst multiply = (a, b) =&gt; a * b;</code></pre>",
        "quiz": [
          {
            "question": "What symbol is used for Arrow Functions?",
            "options": [
              "->",
              "=>",
              "~~>",
              ">>"
            ],
            "answer": 2,
            "explanation": "=> is the arrow function syntax."
          }
        ]
      },
      {
        "id": "js_5",
        "title": "Module 5: Arrays & Map",
        "description": "Looping like a pro.",
        "xpReward": 200,
        "content": "<h3>Array Map & Filter 🗺️</h3>\n<p>While you CAN use <code>for</code> loops in JS, modern developers use Array methods like <code>.map()</code> and <code>.filter()</code> to transform arrays elegantly.</p>\n<hr>\n<h4>1. Map</h4>\n<p><code>map()</code> loops over an array, changes every item, and returns a BRAND NEW array.</p>\n<pre><code class=\"language-javascript\">const numbers = [1, 2, 3];\n\n// Multiply every number by 2\nconst doubled = numbers.map(num =&gt; num * 2);\n\nconsole.log(doubled); // [2, 4, 6]</code></pre>\n<hr>\n<h4>2. Filter</h4>\n<pre><code class=\"language-javascript\">const scores = [50, 95, 80, 30, 100];\n\n// Keep only the scores above 80\nconst passingScores = scores.filter(score =&gt; score >= 80);\n\nconsole.log(passingScores); // [95, 80, 100]</code></pre>",
        "quiz": [
          {
            "question": "Which array method returns a brand new array where every item has been transformed?",
            "options": [
              "forEach()",
              "map()",
              "filter()",
              "reduce()"
            ],
            "answer": 2,
            "explanation": ".map() transforms items."
          }
        ]
      },
      {
        "id": "js_6",
        "title": "Module 6: Fetch & APIs",
        "description": "Get data from the internet.",
        "xpReward": 250,
        "content": "<h3>Async & Fetch 🌐</h3>\n<p>How does Netflix get movies to show up on screen? They <code>fetch</code> data from a server API! Because the internet takes time, this process is Asynchronous (Async). We have to <code>await</code> the data to arrive.</p>\n<hr>\n<h4>1. Async / Await</h4>\n<pre><code class=\"language-javascript\">async function getWeather() {\n    try {\n        // We pause the code and WAIT for the server to respond\n        const response = await fetch(\"https://api.weather.com/miami\");\n        const data = await response.json(); // Convert response to JSON\n        \n        console.log(\"The temperature is: \" + data.temp);\n    } catch (error) {\n        console.log(\"Failed to fetch weather: \" + error);\n    }\n}\n\ngetWeather();</code></pre>",
        "quiz": [
          {
            "question": "What keyword pauses execution until a Promise resolves?",
            "options": [
              "pause",
              "wait",
              "await",
              "halt"
            ],
            "answer": 3,
            "explanation": "await pauses execution in an async function."
          }
        ]
      },
      {
        "id": "js_boss",
        "title": "Boss Battle ⚡: The Pokédex",
        "description": "Fetch API data and manipulate the DOM.",
        "xpReward": 500,
        "content": "<h3>Boss Battle ⚡: The Pokédex</h3>\n<p>It's time to build a real app that pulls data from the internet.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create an HTML input box and a \"Search\" button.</li>\n<li>Add an Event Listener to the button. When clicked, read the value from the input.</li>\n<li>Use <code>fetch()</code> to call <code>https://pokeapi.co/api/v2/pokemon/{name}</code>.</li>\n<li>Parse the JSON response and dynamically change the DOM to show the Pokemon's Name, Sprite (Image), and Type!</li>\n</ol>",
        "quiz": [
          {
            "question": "Does your Pokédex successfully fetch and display data?",
            "options": [
              "No, it throws an error",
              "Yes, I caught them all!"
            ],
            "answer": 2,
            "explanation": "You are a JavaScript Master!"
          }
        ]
      }
    ]
  },
  "sql": {
    "title": "SQL & Databases",
    "icon": "fa-solid fa-database",
    "color": "#336791",
    "modules": [
      {
        "id": "sql_1",
        "title": "Module 1: Querying Data",
        "description": "Talk to massive databases.",
        "xpReward": 100,
        "content": "<h3>Welcome to SQL: The Giant Filing Cabinet 🗄️</h3>\n<p>Imagine you run a giant school with 10,000 students. If someone asks you to find the phone number of a student named \"Alicia\", and all their records are thrown in a giant messy cardboard box, you would have to read every single piece of paper one by one. It would take weeks!</p>\n<p>Databases are like highly organized, metal filing cabinets. Everything is sorted into folders (Tables) and perfectly aligned in rows and columns. <strong>SQL</strong> (Structured Query Language) is the language we use to ask the filing cabinet for information instantly.</p>\n<hr>\n<h4>1. Tables, Rows, and Columns</h4>\n<p>A database looks exactly like an Excel Spreadsheet.</p>\n<ul>\n<li><strong>Table:</strong> The name of the spreadsheet (e.g., \"Users\").</li>\n<li><strong>Columns:</strong> The categories at the top (e.g., \"ID\", \"Name\", \"Age\").</li>\n<li><strong>Rows:</strong> The actual data for one specific person.</li>\n</ul>\n<hr>\n<h4>2. Asking for Data (SELECT)</h4>\n<p>To ask the cabinet for data, we use a <strong>Query</strong>. We <code>SELECT</code> what columns we want, and tell it <code>FROM</code> which table.</p>\n<pre><code class=\"language-sql\">-- The star (*) means \"give me every single column!\"\nSELECT * FROM users;\n\n-- If we only want their names and ages, we list them:\nSELECT name, age FROM users;</code></pre>",
        "quiz": [
          {
            "question": "Which keyword filters results in SQL?",
            "options": [
              "FILTER",
              "FIND",
              "WHERE",
              "CHOOSE"
            ],
            "answer": 3,
            "explanation": "WHERE is used to filter records."
          }
        ]
      },
      {
        "id": "sql_2",
        "title": "Module 2: Modifying Data",
        "description": "Add, Update, and Delete.",
        "xpReward": 150,
        "content": "<h3>Filtering Data: Finding the Needle 🪡</h3>\n<p>When you use Twitter, the database doesn't send you every tweet ever written by all 300 million users. That would crash your phone! It only sends you tweets written by the people you follow. We filter data using the <strong>WHERE</strong> clause.</p>\n<hr>\n<h4>1. The WHERE Clause</h4>\n<p>Think of <code>WHERE</code> as a bouncer at a club. It checks every row of data, and if the row doesn't match the rule, it throws it in the trash!</p>\n<pre><code class=\"language-sql\">-- Find the exact user who has the ID number of 5\nSELECT name FROM users WHERE id = 5;\n\n-- Find all users who are officially adults\nSELECT * FROM users WHERE age >= 18;\n\n-- Find all users who live in Miami AND are over 18\nSELECT * FROM users WHERE city = 'Miami' AND age >= 18;</code></pre>\n<p>Because the database is organized like a perfect filing cabinet, these queries happen in milliseconds, even if there are millions of rows!</p>",
        "quiz": [
          {
            "question": "What happens if you run an UPDATE statement WITHOUT a WHERE clause?",
            "options": [
              "It throws an error",
              "It updates the first row",
              "It updates EVERY row in the table",
              "Nothing"
            ],
            "answer": 3,
            "explanation": "Without a WHERE clause to filter, UPDATE modifies the whole table."
          }
        ]
      },
      {
        "id": "sql_3",
        "title": "Module 3: JOINs",
        "description": "Connecting tables together.",
        "xpReward": 200,
        "content": "<h3>Relational Data (JOINs) 🔗</h3>\n<p>Databases are split into multiple tables (e.g., Users, Posts, Comments). To get data from multiple tables at once, we JOIN them together.</p>\n<hr>\n<h4>1. INNER JOIN</h4>\n<p>This gets only the records that have matching data in BOTH tables.</p>\n<pre><code class=\"language-sql\">-- Get the username and their post title\nSELECT users.username, posts.title \nFROM users\nINNER JOIN posts ON users.id = posts.user_id;</code></pre>",
        "quiz": [
          {
            "question": "What command combines columns from two tables based on a related column?",
            "options": [
              "COMBINE",
              "MERGE",
              "JOIN",
              "APPEND"
            ],
            "answer": 3,
            "explanation": "JOIN is used to connect related tables."
          }
        ]
      },
      {
        "id": "sql_boss",
        "title": "Boss Battle 🐦: Twitter Database Schema",
        "description": "Design and query a social network.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🐦: Twitter Schema</h3>\n<p>Build the relational backend for a micro-blogging platform.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Write the SQL to <code>CREATE TABLE users</code> (id, username, created_at).</li>\n<li>Write the SQL to <code>CREATE TABLE tweets</code> (id, user_id, content, likes).</li>\n<li>Insert 3 users and 5 tweets.</li>\n<li>Write a <code>SELECT</code> statement with an <code>INNER JOIN</code> that fetches every tweet, including the username of the person who wrote it!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did your JOIN successfully link tweets to users?",
            "options": [
              "No, the query failed",
              "Yes, the data is connected!"
            ],
            "answer": 2,
            "explanation": "Database Mastery!"
          }
        ]
      }
    ]
  },
  "html": {
    "title": "HTML Masterclass",
    "icon": "fa-brands fa-html5",
    "color": "#e34c26",
    "modules": [
      {
        "id": "html_1",
        "title": "Module 1: The Skeleton",
        "description": "Build the foundation of the web.",
        "xpReward": 80,
        "content": "<h3>Welcome to HTML: The Skeleton 💀</h3>\n<p>Imagine you are building a massive house from scratch. Before you can paint the walls or hook up the electricity, what do you need? <strong>The wooden frame!</strong> The skeleton that holds everything up.</p>\n<p>That is exactly what <strong>HTML</strong> is. HTML stands for HyperText Markup Language. It's not a programming language; it's a way to tell the computer, <em>\"Hey, this piece of text is a title! And this piece of text is a paragraph! And this thing is a picture!\"</em></p>\n<hr>\n<h4>1. Tags: The Building Blocks</h4>\n<p>In HTML, everything you build is wrapped in <strong>Tags</strong>. Think of tags like two pieces of bread in a sandwich. You need a top piece of bread <code>&lt;tag&gt;</code> and a bottom piece of bread <code>&lt;/tag&gt;</code> (notice the slash!). The meat of the sandwich goes in the middle.</p>\n<pre><code class=\"language-html\">&lt;h1&gt;This is a massive heading!&lt;/h1&gt;\n&lt;p&gt;This is a standard paragraph of text that explains things.&lt;/p&gt;\n&lt;button&gt;Click Me!&lt;/button&gt;</code></pre>\n<p>If you forget the closing tag (the bottom piece of bread), the computer gets confused and your sandwich falls apart on the screen!</p>\n<hr>\n<h4>2. The Boilerplate: The Foundation</h4>\n<p>Every single house needs a foundation. Every single website needs a \"Boilerplate\". This is the standard code you MUST put at the top and bottom of every HTML file.</p>\n<pre><code class=\"language-html\">&lt;!DOCTYPE html&gt; &lt;!-- Tells the browser \"Hey, this is an HTML5 file!\" --&gt;\n&lt;html&gt; &lt;!-- The very top of the house --&gt;\n  \n  &lt;head&gt;\n    &lt;!-- The Head is like the brain of the website. Nothing in here is visible on the screen. It just holds information like the title of the tab! --&gt;\n    &lt;title&gt;My Awesome Website&lt;/title&gt;\n  &lt;/head&gt;\n  \n  &lt;body&gt;\n    &lt;!-- The Body is the actual house! EVERYTHING the user sees MUST go inside the body sandwich! --&gt;\n    &lt;h1&gt;Welcome to my home!&lt;/h1&gt;\n  &lt;/body&gt;\n\n&lt;/html&gt;</code></pre>\n<p><em>Pro Tip: If you type an exclamation mark <code>!</code> and hit Enter in most coding programs, it types all of this for you instantly!</em></p>",
        "quiz": [
          {
            "question": "Where does visible content go in an HTML document?",
            "options": [
              "<head>",
              "<title>",
              "<body>",
              "<footer>"
            ],
            "answer": 3,
            "explanation": "All visible content must be placed inside the <body> tag."
          }
        ]
      },
      {
        "id": "html_2",
        "title": "Module 2: Links & Images",
        "description": "Connect the web together.",
        "xpReward": 100,
        "content": "<h3>Links & Images: Connecting the World 🌍</h3>\n<p>Why do we call it the \"World Wide Web\"? Imagine a spider web. Every strand connects to another strand. In the 1990s, websites were just boring text. What made them a \"Web\" was the ability to click a word and magically teleport to another website. We do this using <strong>Links!</strong></p>\n<hr>\n<h4>1. The Anchor Tag (Hyperlinks)</h4>\n<p>To create a link, we use the <code>&lt;a&gt;</code> tag, which stands for Anchor. But just saying \"make a link\" isn't enough. The computer asks, <em>\"Where do you want the link to go?\"</em></p>\n<p>To answer that, we use an <strong>Attribute</strong>. Attributes are like giving your tag a special instruction. The instruction we use is <code>href</code> (HyperText Reference).</p>\n<pre><code class=\"language-html\">&lt;!-- href tells the link exactly where to travel --&gt;\n&lt;a href=\"https://google.com\"&gt;Click me to travel to Google!&lt;/a&gt;</code></pre>\n<hr>\n<h4>2. Images: Adding Pictures</h4>\n<p>Websites need pictures! We use the <code>&lt;img&gt;</code> tag for this. But wait, this tag is weird. It doesn't have a closing tag! It is a <strong>Self-Closing Tag</strong>. It doesn't need two pieces of bread, because there is no text to put inside it.</p>\n<p>Instead, we give it a <code>src</code> (Source) attribute to tell it where the picture is saved, and an <code>alt</code> (Alternative Text) attribute to describe the picture in case a blind person is using a screen reader to read your website.</p>\n<pre><code class=\"language-html\">&lt;!-- src points to the picture. alt describes the picture. --&gt;\n&lt;img src=\"cute_puppy.jpg\" alt=\"A tiny golden retriever playing with a ball\"&gt;</code></pre>",
        "quiz": [
          {
            "question": "Which attribute is used to specify the destination of a link?",
            "options": [
              "src",
              "link",
              "href",
              "url"
            ],
            "answer": 3,
            "explanation": "href stands for hypertext reference."
          }
        ]
      },
      {
        "id": "html_3",
        "title": "Module 3: Forms & Inputs",
        "description": "Get data from users.",
        "xpReward": 120,
        "content": "<h3>Forms & Inputs 📝</h3>\n<p>To let users log in, search, or send messages, you need to use Forms!</p>\n<hr>\n<h4>1. The Form Tag</h4>\n<pre><code class=\"language-html\">&lt;form action=\"/submit\" method=\"POST\"&gt;\n  &lt;label for=\"username\"&gt;Username:&lt;/label&gt;\n  &lt;input type=\"text\" id=\"username\" name=\"username\" placeholder=\"Enter name\" required&gt;\n  \n  &lt;label for=\"password\"&gt;Password:&lt;/label&gt;\n  &lt;input type=\"password\" id=\"password\" name=\"password\" required&gt;\n  \n  &lt;button type=\"submit\"&gt;Login&lt;/button&gt;\n&lt;/form&gt;</code></pre>\n<p>The <code>action</code> dictates where the data is sent when the submit button is clicked.</p>",
        "quiz": [
          {
            "question": "Which input type hides the characters typed by the user?",
            "options": [
              "text",
              "hidden",
              "password",
              "secret"
            ],
            "answer": 3,
            "explanation": "type='password' masks the input."
          }
        ]
      },
      {
        "id": "html_4",
        "title": "Module 4: Lists & Tables",
        "description": "Organizing data.",
        "xpReward": 140,
        "content": "<h3>Lists & Tables 📊</h3>\n<hr>\n<h4>1. Lists</h4>\n<p>Unordered Lists (bullets) use <code>&lt;ul&gt;</code>, Ordered Lists (numbers) use <code>&lt;ol&gt;</code>. The items inside use <code>&lt;li&gt;</code>.</p>\n<pre><code class=\"language-html\">&lt;ul&gt;\n  &lt;li&gt;Apples&lt;/li&gt;\n  &lt;li&gt;Bananas&lt;/li&gt;\n&lt;/ul&gt;</code></pre>\n<hr>\n<h4>2. Tables</h4>\n<pre><code class=\"language-html\">&lt;table border=\"1\"&gt;\n  &lt;tr&gt;\n    &lt;th&gt;Name&lt;/th&gt;\n    &lt;th&gt;Score&lt;/th&gt;\n  &lt;/tr&gt;\n  &lt;tr&gt;\n    &lt;td&gt;Alicia&lt;/td&gt;\n    &lt;td&gt;999&lt;/td&gt;\n  &lt;/tr&gt;\n&lt;/table&gt;</code></pre>",
        "quiz": [
          {
            "question": "What tag creates a numbered list?",
            "options": [
              "<ul>",
              "<li>",
              "<nl>",
              "<ol>"
            ],
            "answer": 4,
            "explanation": "<ol> stands for ordered list (numbered)."
          }
        ]
      },
      {
        "id": "html_5",
        "title": "Module 5: Semantic HTML",
        "description": "Write code for SEO and Accessibility.",
        "xpReward": 160,
        "content": "<h3>Semantic HTML 🤖</h3>\n<p>In the old days, developers used <code>&lt;div&gt;</code> for everything. Now, we use tags that actually DESCRIBE what the content is. This is crucial for Google (SEO) to rank your site, and for screen readers used by the blind.</p>\n<hr>\n<h4>1. Semantic Tags</h4>\n<pre><code class=\"language-html\">&lt;header&gt;This is the top navigation bar&lt;/header&gt;\n\n&lt;main&gt;\n  &lt;article&gt;\n    &lt;h1&gt;Blog Post Title&lt;/h1&gt;\n    &lt;p&gt;Post content...&lt;/p&gt;\n  &lt;/article&gt;\n&lt;/main&gt;\n\n&lt;footer&gt;Copyright 2026&lt;/footer&gt;</code></pre>",
        "quiz": [
          {
            "question": "Why should we use Semantic HTML?",
            "options": [
              "It makes the site faster",
              "It looks prettier",
              "SEO and Accessibility",
              "It uses less memory"
            ],
            "answer": 3,
            "explanation": "Semantic tags describe the meaning of content to machines."
          }
        ]
      },
      {
        "id": "html_boss",
        "title": "Boss Battle 📄: Personal Portfolio",
        "description": "Build a multi-page semantic website.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 📄: Personal Portfolio</h3>\n<p>Combine links, images, tables, lists, and semantic tags into a real website structure.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create three pages: <code>index.html</code> (Home), <code>about.html</code>, and <code>contact.html</code>.</li>\n<li>Use <code>&lt;nav&gt;</code> to link them together on every page.</li>\n<li>On the About page, use an Ordered List to rank your top 3 favorite foods.</li>\n<li>On the Contact page, build a form with Name, Email, and a Textarea for the message.</li>\n</ol>",
        "quiz": [
          {
            "question": "Does your navigation link all pages correctly?",
            "options": [
              "No, 404 error",
              "Yes, it works perfectly!"
            ],
            "answer": 2,
            "explanation": "You are an HTML Master!"
          }
        ]
      }
    ]
  },
  "css": {
    "title": "CSS Masterclass",
    "icon": "fa-brands fa-css3-alt",
    "color": "#264de4",
    "modules": [
      {
        "id": "css_1",
        "title": "Module 1: Selectors & Colors",
        "description": "Make your HTML look beautiful.",
        "xpReward": 100,
        "content": "<h3>Welcome to CSS: The Paint and Decorator 🎨</h3>\n<p>Remember how HTML is the wooden skeleton of the house? A house with just wood is boring and ugly. You want painted walls, carpets, posters, and cool lighting. That is what <strong>CSS</strong> does. It stands for Cascading Style Sheets, and its only job is to make your HTML look absolutely beautiful.</p>\n<hr>\n<h4>1. The Syntax: How to Talk to CSS</h4>\n<p>To style something, you have to follow three steps:</p>\n<ol>\n<li><strong>Selector:</strong> Who are we talking to? (e.g., \"Hey, Paragraph tag!\")</li>\n<li><strong>Property:</strong> What do we want to change? (e.g., \"I want to change your color.\")</li>\n<li><strong>Value:</strong> What are we changing it to? (e.g., \"Make it red!\")</li>\n</ol>\n<pre><code class=\"language-css\">/* We select ALL &lt;h1&gt; tags */\nh1 {\n  color: red; /* Property: color, Value: red */\n  font-size: 50px; /* Make the letters massive */\n  text-align: center; /* Push the text to the middle of the screen */\n}</code></pre>\n<hr>\n<h4>2. Classes and IDs: Giving Things Names</h4>\n<p>Imagine you are a teacher in a classroom. If you shout \"Hey, Student!\", EVERYONE turns around. In CSS, if you write <code>p { color: blue; }</code>, EVERY paragraph turns blue. But what if you only want ONE paragraph to turn blue?</p>\n<p>You have to give that paragraph a special name tag. In HTML, we call this name tag a <strong>Class</strong>.</p>\n<pre><code class=\"language-html\">&lt;!-- We give this paragraph a class name of \"special-text\" --&gt;\n&lt;p class=\"special-text\"&gt;I am super unique!&lt;/p&gt;\n&lt;p&gt;I am just a normal boring paragraph.&lt;/p&gt;</code></pre>\n<p>Now, in CSS, we use a <strong>Dot (.)</strong> to tell the computer, <em>\"Hey, look for the class name, not the tag!\"</em></p>\n<pre><code class=\"language-css\">/* The dot means we are looking for a Class! */\n.special-text {\n  background-color: yellow;\n  font-weight: bold; /* Makes the text thick */\n}</code></pre>",
        "quiz": [
          {
            "question": "How do you select an HTML element with class='button' in CSS?",
            "options": [
              "#button",
              ".button",
              "button",
              "*button"
            ],
            "answer": 2,
            "explanation": "Classes are selected using a period (.) in CSS."
          }
        ]
      },
      {
        "id": "css_2",
        "title": "Module 2: The Box Model",
        "description": "Padding, Borders, and Margins.",
        "xpReward": 120,
        "content": "<h3>The Box Model: Pushing Things Around 📦</h3>\n<p>Here is a secret that most beginners don't know: <strong>Every single thing on a website is a literal rectangular box.</strong> Even if a picture looks like a circle, the computer sees it as an invisible square box. The \"Box Model\" is how we add space inside and outside of these boxes so they don't squish together.</p>\n<hr>\n<h4>1. Padding vs Margin</h4>\n<p>Imagine you are wearing a thick winter coat, and you are standing next to a friend.</p>\n<ul>\n<li><strong>Padding:</strong> This is the stuffing INSIDE your coat. If you add padding, you get fatter, and your coat expands outward. In CSS, padding adds space INSIDE the border of the box.</li>\n<li><strong>Border:</strong> This is the outer skin of your coat.</li>\n<li><strong>Margin:</strong> This is the invisible personal space bubble OUTSIDE of your coat. If you add margin, you force your friend to step backward away from you. Margin pushes OTHER things away.</li>\n</ul>\n<pre><code class=\"language-css\">.my-button {\n  /* PADDING: 20 pixels of space inside the button (makes the button bigger) */\n  padding: 20px; \n  \n  /* BORDER: A solid black line around the button */\n  border: 5px solid black;\n  \n  /* MARGIN: Pushes any text or pictures 50 pixels away from the button */\n  margin: 50px; \n}</code></pre>\n<p><em>Pro Tip: If your text is touching the very edge of your screen and looks ugly, just add <code>padding: 20px;</code> to the body to give it some breathing room!</em></p>",
        "quiz": [
          {
            "question": "Which property adds space INSIDE an element's border?",
            "options": [
              "margin",
              "spacing",
              "padding",
              "border-spacing"
            ],
            "answer": 3,
            "explanation": "Padding is internal space."
          }
        ]
      },
      {
        "id": "css_3",
        "title": "Module 3: Flexbox",
        "description": "Layout items side-by-side easily.",
        "xpReward": 150,
        "content": "<h3>Flexbox 💪</h3>\n<p>Before Flexbox, aligning items horizontally in CSS was a nightmare. Flexbox makes it incredibly easy.</p>\n<hr>\n<h4>1. Display Flex</h4>\n<p>Just add <code>display: flex;</code> to a parent container, and all its children will line up in a row!</p>\n<pre><code class=\"language-html\">&lt;div class=\"container\"&gt;\n  &lt;div class=\"box\"&gt;1&lt;/div&gt;\n  &lt;div class=\"box\"&gt;2&lt;/div&gt;\n&lt;/div&gt;</code></pre>\n<pre><code class=\"language-css\">.container {\n  display: flex;\n  justify-content: center; /* Centers the boxes horizontally */\n  align-items: center; /* Centers the boxes vertically */\n  gap: 20px; /* Puts 20px of space between the boxes */\n}</code></pre>",
        "quiz": [
          {
            "question": "Which property centers items horizontally in a Flex container?",
            "options": [
              "align-items",
              "justify-content",
              "text-align",
              "vertical-align"
            ],
            "answer": 2,
            "explanation": "justify-content aligns items along the main axis (usually horizontal)."
          }
        ]
      },
      {
        "id": "css_4",
        "title": "Module 4: Hover & Transitions",
        "description": "Make buttons feel alive.",
        "xpReward": 180,
        "content": "<h3>Animations & Interactions ✨</h3>\n<p>Interactive websites feel alive. We can use the <code>:hover</code> pseudo-class to change styles when the user's mouse goes over an element.</p>\n<hr>\n<h4>1. Transitions</h4>\n<p>If you just use <code>:hover</code>, the change is instant and jarring. We use <code>transition</code> to make the change smooth over time!</p>\n<pre><code class=\"language-css\">.button {\n  background-color: blue;\n  color: white;\n  transition: all 0.3s ease; /* Any changes take 0.3 seconds! */\n}\n\n.button:hover {\n  background-color: red;\n  transform: scale(1.1); /* Makes the button 10% bigger! */\n}</code></pre>",
        "quiz": [
          {
            "question": "What CSS property makes a hover effect smooth instead of instant?",
            "options": [
              "animation",
              "smooth",
              "transition",
              "transform"
            ],
            "answer": 3,
            "explanation": "transition dictates how long a style change should take."
          }
        ]
      },
      {
        "id": "css_5",
        "title": "Module 5: Responsive Design",
        "description": "Making it look good on phones.",
        "xpReward": 200,
        "content": "<h3>Media Queries 📱</h3>\n<p>A website that looks great on a laptop might look terrible on an iPhone. <strong>Media Queries</strong> allow you to write CSS rules that ONLY apply when the screen is a certain size.</p>\n<hr>\n<h4>1. The Syntax</h4>\n<pre><code class=\"language-css\">/* Default styles for Laptop */\n.grid {\n  display: flex;\n}\n\n/* If the screen is smaller than 768px (Mobile), do this instead: */\n@media (max-width: 768px) {\n  .grid {\n    flex-direction: column; /* Stack them vertically on phones! */\n  }\n}</code></pre>",
        "quiz": [
          {
            "question": "What is used in CSS to target different screen sizes?",
            "options": [
              "@screen",
              "@mobile",
              "@media",
              "@query"
            ],
            "answer": 3,
            "explanation": "@media queries allow responsive CSS."
          }
        ]
      },
      {
        "id": "css_boss",
        "title": "Boss Battle 🍿: Netflix Clone Layout",
        "description": "Clone a popular streaming site.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🍿: Netflix Clone Layout</h3>\n<p>Use Flexbox, Grid, and Hover animations to build a streaming UI.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Set the background to dark grey and text to white.</li>\n<li>Use Flexbox to build a navigation bar with the logo on the left and login button on the right.</li>\n<li>Create a grid of movie posters (divs with images). When you hover over a poster, it should grow (scale) by 1.1x using a smooth CSS transition!</li>\n<li>Use a Media Query to make the grid single-column on mobile screens.</li>\n</ol>",
        "quiz": [
          {
            "question": "Do the movie posters smoothly scale up when hovered?",
            "options": [
              "No",
              "Yes, it looks amazing!"
            ],
            "answer": 2,
            "explanation": "CSS Mastery achieved!"
          }
        ]
      }
    ]
  },
  "react": {
    "title": "React.js Mastery",
    "icon": "fa-brands fa-react",
    "color": "#61dafb",
    "modules": [
      {
        "id": "react_1",
        "title": "Module 1: Thinking in Components",
        "description": "The modern way to build UIs.",
        "xpReward": 100,
        "content": "<h3>Welcome to React: The LEGO Blocks ⚛️</h3>\n<p>In standard HTML, building a website is like molding a giant sculpture out of a single block of clay. If you want 100 identical buttons, you have to mold 100 buttons. If you want to change them later, you have to fix all 100 by hand!</p>\n<p><strong>React</strong> changes everything. Built by Facebook, React allows you to build websites using <strong>Components</strong>, which are exactly like reusable LEGO blocks!</p>\n<hr>\n<h4>1. What is a Component?</h4>\n<p>A Component is literally just a JavaScript function that returns a piece of the HTML skeleton. Because it's a function, you can call it 100 times to stamp out 100 identical buttons instantly!</p>\n<p>This mixture of JavaScript and HTML is called <strong>JSX</strong>.</p>\n<pre><code class=\"language-javascript\">// We create a reusable LEGO block called Button (always capitalize it!)\nfunction Button() {\n  // It returns some HTML styling\n  return (\n    &lt;button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}&gt;\n      Click Me!\n    &lt;/button&gt;\n  );\n}\n\n// Now, in our main website, we can use our LEGO block like a custom HTML tag!\nfunction App() {\n    return (\n        &lt;div&gt;\n            &lt;h1&gt;My Awesome Shop&lt;/h1&gt;\n            &lt;Button /&gt; \n            &lt;Button /&gt; \n            &lt;Button /&gt; \n        &lt;/div&gt;\n    );\n}</code></pre>\n<p>If your boss says \"make all the buttons red!\", you don't have to change 100 buttons. You just change the <code>Button()</code> function once, and all 100 LEGO blocks instantly update!</p>",
        "quiz": [
          {
            "question": "What is a React Component fundamentally?",
            "options": [
              "A CSS file",
              "A JavaScript function that returns JSX",
              "A database",
              "A server"
            ],
            "answer": 2,
            "explanation": "Components are JS functions that return UI markup."
          }
        ]
      },
      {
        "id": "react_2",
        "title": "Module 2: State (useState)",
        "description": "Making components remember things.",
        "xpReward": 150,
        "content": "<h3>React State: The Component's Memory 🧠</h3>\n<p>In standard JavaScript, if you change a variable, the screen doesn't care. You have to manually write code to update the HTML to show the new variable.</p>\n<p>In React, we use something magical called <strong>State</strong>. If a Component has State, it means it has a memory. And the best part? <strong>If a State variable changes, React automatically redraws the screen to show the new value!</strong> You never have to touch the HTML again.</p>\n<hr>\n<h4>1. The useState Hook</h4>\n<p>We use a special tool called <code>useState</code>. It gives us a memory box (the variable), and a magic wand (a function) to change what's inside the box.</p>\n<pre><code class=\"language-javascript\">import { useState } from 'react';\n\nfunction LikeButton() {\n    // 1. Declare the State\n    // 'likes' is the memory box. It starts at 0.\n    // 'setLikes' is the magic wand we use to change the box.\n    const [likes, setLikes] = useState(0);\n\n    return (\n        &lt;div&gt;\n            &lt;!-- Notice we use curly braces {} to show a variable in JSX! --&gt;\n            &lt;p&gt;This post has {likes} likes!&lt;/p&gt;\n            \n            &lt;!-- 2. When clicked, we use the magic wand to add 1 to the box --&gt;\n            &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;\n                👍 Like!\n            &lt;/button&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>\n<p>Every time you click the button, React realizes the memory changed, and it instantly redraws the paragraph text without you doing ANY extra work!</p>",
        "quiz": [
          {
            "question": "What hook is used to add reactive memory to a component?",
            "options": [
              "useMemory",
              "useEffect",
              "useState",
              "useData"
            ],
            "answer": 3,
            "explanation": "useState provides state variables to functional components."
          }
        ]
      },
      {
        "id": "react_3",
        "title": "Module 3: Props",
        "description": "Passing data to components.",
        "xpReward": 180,
        "content": "<h3>Props 🎁</h3>\n<p>Props (short for properties) are how we pass data from a Parent component down to a Child component. They work exactly like HTML attributes!</p>\n<hr>\n<h4>1. Passing and Receiving</h4>\n<pre><code class=\"language-javascript\">// The Child component expects a 'name' prop\nfunction Greeting(props) {\n    return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;\n}\n\n// The Parent component passes the prop down!\nfunction App() {\n    return (\n        &lt;div&gt;\n            &lt;Greeting name=\"Miles\" /&gt;\n            &lt;Greeting name=\"Gwen\" /&gt;\n        &lt;/div&gt;\n    );\n}</code></pre>",
        "quiz": [
          {
            "question": "How does data flow in React?",
            "options": [
              "Bottom to top",
              "Parent to child (Top down)",
              "Sideways",
              "It doesn't"
            ],
            "answer": 2,
            "explanation": "Data flows downwards via props."
          }
        ]
      },
      {
        "id": "react_4",
        "title": "Module 4: useEffect",
        "description": "Running code on load.",
        "xpReward": 200,
        "content": "<h3>The useEffect Hook ⏳</h3>\n<p>What if you want to fetch data from an API the moment your component loads on the screen? You use <code>useEffect</code>!</p>\n<hr>\n<h4>1. The Syntax</h4>\n<p>The empty array <code>[]</code> at the end tells React to ONLY run this code once when the component mounts.</p>\n<pre><code class=\"language-javascript\">import { useState, useEffect } from 'react';\n\nfunction UserProfile() {\n    const [user, setUser] = useState(\"Loading...\");\n\n    useEffect(() =&gt; {\n        // This runs instantly when the component appears\n        fetch(\"/api/user\")\n            .then(res =&gt; res.json())\n            .then(data =&gt; setUser(data.name));\n    }, []); // &lt;-- The Dependency Array\n\n    return &lt;h1&gt;Welcome, {user}!&lt;/h1&gt;;\n}</code></pre>",
        "quiz": [
          {
            "question": "What does an empty dependency array [] mean in useEffect?",
            "options": [
              "Run on every render",
              "Run only once on mount",
              "Never run",
              "Error"
            ],
            "answer": 2,
            "explanation": "[] means it has no dependencies, so it only runs once."
          }
        ]
      },
      {
        "id": "react_conditional",
        "title": "Module: Conditional Rendering",
        "description": "If this, then show that.",
        "xpReward": 250,
        "content": "<h3>Conditional Rendering 🔀</h3>\n<p>Often, you only want to show a Component IF something is true. For example, if a user is logged in, show their profile. If they aren't, show a Login button.</p>\n<hr>\n<h4>1. The Ternary Operator</h4>\n<p>Instead of writing a massive <code>if/else</code> block, React developers use a shortcut called the Ternary Operator (<code>condition ? true : false</code>).</p>\n<pre><code class=\"language-javascript\">function Navbar({ isLoggedIn }) {\n  return (\n    &lt;nav&gt;\n      {/* If isLoggedIn is true, show Profile. Otherwise (:), show Login */}\n      {isLoggedIn ? (\n        &lt;button&gt;Go to Profile&lt;/button&gt;\n      ) : (\n        &lt;button&gt;Login Please&lt;/button&gt;\n      )}\n    &lt;/nav&gt;\n  );\n}</code></pre>",
        "quiz": [
          {
            "question": "What symbol acts as the 'if' in a Ternary Operator?",
            "options": [
              "!",
              "?",
              ":",
              "="
            ],
            "answer": 2,
            "explanation": "The question mark (?) checks if the condition is true."
          }
        ]
      },
      {
        "id": "react_mapping",
        "title": "Module: Mapping Arrays",
        "description": "Rendering massive lists instantly.",
        "xpReward": 250,
        "content": "<h3>Mapping Arrays (The Factory Line) 🏭</h3>\n<p>Imagine you have an Array with 1,000 usernames. You don't want to type out 1,000 <code>&lt;p&gt;</code> tags. Instead, you can use the JavaScript <code>.map()</code> function to turn that Array into HTML instantly!</p>\n<hr>\n<h4>1. The .map() Function</h4>\n<pre><code class=\"language-javascript\">function UserList() {\n  const users = [\"Alicia\", \"Miles\", \"Gwen\"];\n\n  return (\n    &lt;ul&gt;\n      {/* For every user in the array, map them to an LI tag! */}\n      {users.map((name) =&gt; (\n        &lt;li key={name}&gt;{name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}</code></pre>\n<p><em>Warning: React requires you to add a unique <code>key</code> attribute when mapping lists so it doesn't get confused when updating them!</em></p>",
        "quiz": [
          {
            "question": "What attribute is REQUIRED when mapping a list in React?",
            "options": [
              "id",
              "class",
              "key",
              "name"
            ],
            "answer": 3,
            "explanation": "React requires a unique key prop to track items in a list efficiently."
          }
        ]
      },
      {
        "id": "react_router",
        "title": "Module: React Router",
        "description": "Navigating between pages.",
        "xpReward": 250,
        "content": "<h3>React Router (The Teleporter) 🚀</h3>\n<p>React is a \"Single Page Application\". It doesn't actually load new HTML files when you click a link. It just instantly deletes the old Components and renders new ones on the same page. This makes it insanely fast!</p>\n<p>To make the URL change (e.g. going to <code>/about</code>), we use a tool called <strong>React Router</strong>.</p>\n<hr>\n<h4>1. Setting up Routes</h4>\n<pre><code class=\"language-javascript\">import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';\n\nfunction App() {\n  return (\n    &lt;BrowserRouter&gt;\n      &lt;nav&gt;\n        {/* We use Link instead of an anchor tag! */}\n        &lt;Link to=\"/about\"&gt;About Us&lt;/Link&gt;\n      &lt;/nav&gt;\n\n      &lt;Routes&gt;\n        {/* If the URL is /, show Home. If it's /about, show About! */}\n        &lt;Route path=\"/\" element={&lt;Home /&gt;} /&gt;\n        &lt;Route path=\"/about\" element={&lt;About /&gt;} /&gt;\n      &lt;/Routes&gt;\n    &lt;/BrowserRouter&gt;\n  );\n}</code></pre>",
        "quiz": [
          {
            "question": "Why do we use <Link> instead of an <a> tag in React Router?",
            "options": [
              "It looks cooler",
              "It prevents the browser from refreshing the page",
              "It is faster to type",
              "It changes the color"
            ],
            "answer": 2,
            "explanation": "<Link> prevents a full page reload, keeping the app fast!"
          }
        ]
      },
      {
        "id": "react_boss",
        "title": "Boss Battle 🛒: E-Commerce Cart",
        "description": "Manage complex React state.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🛒: E-Commerce Cart</h3>\n<p>Prove you understand Components, Props, and State.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create a parent <code>App</code> component that holds a <code>cartCount</code> state variable.</li>\n<li>Create a <code>ProductCard</code> component that takes <code>name</code>, <code>price</code>, and an <code>addToCart</code> function as props.</li>\n<li>Render 3 ProductCards. When you click \"Add to Cart\" inside a child component, it should correctly trigger the parent's function to increment the <code>cartCount</code>!</li>\n</ol>",
        "quiz": [
          {
            "question": "Does the cart counter increment when a product is clicked?",
            "options": [
              "No",
              "Yes, the state lifts correctly!"
            ],
            "answer": 2,
            "explanation": "React Mastery unlocked!"
          }
        ]
      }
    ]
  },
  "git": {
    "title": "Git & GitHub",
    "icon": "fa-brands fa-github",
    "color": "#f05032",
    "modules": [
      {
        "id": "git_1",
        "title": "Module 1: Version Control",
        "description": "Never lose your code again.",
        "xpReward": 100,
        "content": "<h3>Welcome to Git: The Time Machine ⏳</h3>\n<p>Imagine you are writing a 10-page essay. You finish it, but then you decide to rewrite the ending. You delete the last paragraph, write a new one, and hit \"Save\". The next day, you realize your new ending is terrible, and you want the old one back. Too bad! You hit Save. The old ending is gone forever.</p>\n<p>Programmers cannot afford to lose code like this. That's why we use <strong>Git</strong>. Git is a magical time machine. Instead of just saving your file, Git takes a \"Snapshot\" of the entire universe at that exact moment. If you break your code tomorrow, you can use Git to teleport your files back to yesterday!</p>\n<hr>\n<h4>1. The Staging Area (The Waiting Room)</h4>\n<p>Before you take a snapshot (which we call a <strong>Commit</strong>), you have to tell Git WHICH files you want in the picture. This is called the <strong>Staging Area</strong>. Think of it like a waiting room for a family photo. You use <code>git add</code> to pull people into the waiting room.</p>\n<pre><code class=\"language-bash\"># Tells Git to start watching this folder\ngit init\n\n# Moves the file \"index.html\" into the waiting room (staging area)\ngit add index.html\n\n# Moves EVERY changed file into the waiting room!\ngit add .</code></pre>\n<hr>\n<h4>2. The Commit (Taking the Picture)</h4>\n<p>Now that the files are in the waiting room, you press the camera button to take the snapshot. You must include a message describing what changed, so your future self knows what this point in time looks like.</p>\n<pre><code class=\"language-bash\"># Takes the snapshot and saves it in the timeline forever!\ngit commit -m \"Added the blue login button\"</code></pre>",
        "quiz": [
          {
            "question": "Which command actually saves a snapshot of your code locally?",
            "options": [
              "git init",
              "git save",
              "git commit",
              "git push"
            ],
            "answer": 3,
            "explanation": "git commit creates a snapshot in the timeline."
          }
        ]
      },
      {
        "id": "git_2",
        "title": "Module 2: Branching",
        "description": "Multiverse coding.",
        "xpReward": 150,
        "content": "<h3>Branches 🌿</h3>\n<p>If you are building a risky new feature, you don't want to break the main code. You create a <strong>Branch</strong> (like an alternate universe), do your work there, and then <strong>Merge</strong> it back when it's safe!</p>\n<hr>\n<h4>1. Creating a Branch</h4>\n<pre><code class=\"language-bash\"># Create and switch to a new branch called 'new-feature'\ngit checkout -b new-feature\n\n# Now any commits you make will NOT affect the main code!</code></pre>\n<hr>\n<h4>2. Merging</h4>\n<pre><code class=\"language-bash\"># Switch back to the main timeline\ngit checkout main\n\n# Merge the alternate universe into the main one\ngit merge new-feature</code></pre>",
        "quiz": [
          {
            "question": "What command creates a new branch and switches to it?",
            "options": [
              "git branch new",
              "git checkout -b",
              "git new",
              "git switch -new"
            ],
            "answer": 2,
            "explanation": "git checkout -b creates and immediately checks out a new branch."
          }
        ]
      },
      {
        "id": "git_boss",
        "title": "Boss Battle 🔀: The Merge Conflict",
        "description": "Survive a Git disaster.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🔀: Merge Conflict Survivor</h3>\n<p>In the real world, multiple developers edit the same file, causing a merge conflict. You must fix it!</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create a file called <code>index.html</code> on the main branch, add some text, and commit it.</li>\n<li>Create a new branch called <code>feature-branch</code>. Change the text on the exact same line, and commit it.</li>\n<li>Go back to <code>main</code>, change the text AGAIN on that line, and commit it.</li>\n<li>Try to <code>git merge feature-branch</code>. Git will scream about a conflict!</li>\n<li>Open the file, delete the ugly <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> markers, keep the code you want, and commit the resolution!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did you successfully resolve the conflict and commit?",
            "options": [
              "No, git is stuck",
              "Yes, the timeline is secure!"
            ],
            "answer": 2,
            "explanation": "You are a Git Pro!"
          }
        ]
      }
    ]
  },
  "cli": {
    "title": "Command Line Pro",
    "icon": "fa-solid fa-terminal",
    "color": "#4d4d4d",
    "modules": [
      {
        "id": "cli_1",
        "title": "Module 1: Navigation",
        "description": "Navigate your computer like a hacker.",
        "xpReward": 100,
        "content": "<h3>Welcome to CLI: Hacking the Matrix 🖥️</h3>\n<p>When you use a computer, you use a mouse. You click on a folder icon to open it. This is called a GUI (Graphical User Interface). But what if you were blind? Or what if your computer didn't have a screen, like a server in a massive data center?</p>\n<p>Real developers talk directly to the computer's brain using text. This is the <strong>Command Line Interface (CLI)</strong>. Once you learn it, you will navigate your computer 10x faster than someone using a mouse.</p>\n<hr>\n<h4>1. Where am I? (pwd)</h4>\n<p>When you open the terminal, you are inside a folder, but there is no graphical window to show you. To ask the computer \"Where am I?\", you use <code>pwd</code> (Print Working Directory).</p>\n<pre><code class=\"language-bash\">pwd\n# Output: /Users/alicia/Documents</code></pre>\n<hr>\n<h4>2. What is inside here? (ls)</h4>\n<p>To see all the files in your current folder, you don't double-click anything. You just type <code>ls</code> (List).</p>\n<pre><code class=\"language-bash\">ls\n# Output: index.html  style.css  images_folder/</code></pre>\n<hr>\n<h4>3. Moving Around (cd)</h4>\n<p>To double click a folder and go inside it, you use <code>cd</code> (Change Directory).</p>\n<pre><code class=\"language-bash\"># Go inside the images folder\ncd images_folder\n\n# Go BACKWARDS / UP one folder!\ncd ..</code></pre>\n<p>Congratulations, you are now navigating the matrix using only code!</p>",
        "quiz": [
          {
            "question": "What command lists the files in your current folder?",
            "options": [
              "list",
              "dir",
              "ls",
              "show"
            ],
            "answer": 3,
            "explanation": "ls stands for list."
          }
        ]
      },
      {
        "id": "cli_2",
        "title": "Module 2: Grep & Piping",
        "description": "Search text like a pro.",
        "xpReward": 150,
        "content": "<h3>Grep and Pipes 🔍</h3>\n<hr>\n<h4>1. Grep</h4>\n<p><code>grep</code> searches through files for a specific word.</p>\n<pre><code class=\"language-bash\"># Find the word \"password\" inside config.txt\ngrep \"password\" config.txt</code></pre>\n<hr>\n<h4>2. The Pipe Operator (|)</h4>\n<p>Pipes let you take the output of one command and shove it directly into the input of another!</p>\n<pre><code class=\"language-bash\"># List all files, but PIPE that list into grep to only show files with \"json\" in the name!\nls | grep \"json\"</code></pre>",
        "quiz": [
          {
            "question": "What does the pipe (|) operator do?",
            "options": [
              "Stops a command",
              "Sends output of one command to another",
              "Saves a file",
              "Deletes a file"
            ],
            "answer": 2,
            "explanation": "Piping chains commands together."
          }
        ]
      },
      {
        "id": "cli_boss",
        "title": "Boss Battle 🖥️: Server Hacker",
        "description": "Find the secret key using the terminal.",
        "xpReward": 500,
        "content": "<h3>Boss Battle 🖥️: Server Hacker</h3>\n<p>Combine all your terminal knowledge to find a needle in a haystack.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create 10 folders nested inside each other.</li>\n<li>In the deepest folder, create 5 different text files. Put the word \"SECRET_KEY: 99482\" in one of them.</li>\n<li>Go back to your home folder.</li>\n<li>Without opening your file explorer, use <code>cd</code>, <code>ls</code>, and <code>grep</code> to navigate down and extract the secret key using only text commands!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did you find the secret key using grep?",
            "options": [
              "No",
              "Yes, I hacked the mainframe!"
            ],
            "answer": 2,
            "explanation": "Terminal Mastery!"
          }
        ]
      }
    ]
  },
  "ml": {
    "title": "Data Science & ML",
    "icon": "fa-solid fa-brain",
    "color": "#FF9800",
    "modules": [
      {
        "id": "ml_1",
        "title": "Module 1: Pandas & Data",
        "description": "Analyze massive datasets.",
        "xpReward": 200,
        "content": "<h3>Machine Learning: Training a Puppy 🐶</h3>\n<p>Normal programming is like giving a robot a strict set of rules: <em>\"If you see a red light, stop. If you see a green light, go.\"</em></p>\n<p><strong>Machine Learning (AI)</strong> is different. Instead of giving the computer rules, you give it <strong>Examples</strong>. It's exactly like training a puppy. If you show a puppy 1,000 pictures of cats, and 1,000 pictures of dogs, its brain naturally figures out the difference on its own. We don't write the rules; the computer writes its own rules by studying the data!</p>\n<hr>\n<h4>1. The Data (The Puppy Food)</h4>\n<p>Before you can train an AI, you need thousands of examples (Data). We use a magical Python tool called <strong>Pandas</strong> to organize all this data into massive, easy-to-read spreadsheets called DataFrames.</p>\n<pre><code class=\"language-python\">import pandas as pd\n\n# Let's say we have a massive Excel file with 10,000 pictures of animals\n# Pandas reads it instantly and organizes it for our AI puppy!\npuppy_food_data = pd.read_csv(\"animals.csv\")\n\n# Print the first 5 examples to make sure it looks tasty\nprint(puppy_food_data.head())</code></pre>",
        "quiz": [
          {
            "question": "Which Python library is primarily used for Data Analysis?",
            "options": [
              "React",
              "Pandas",
              "Django",
              "Flask"
            ],
            "answer": 2,
            "explanation": "Pandas is the industry standard for data science."
          }
        ]
      },
      {
        "id": "ml_numpy",
        "title": "Module 2: NumPy Arrays",
        "description": "Fast math for data science.",
        "xpReward": 250,
        "content": "<h3>NumPy: The Calculator 🧮</h3>\n<p>If you want to add 1,000,000 numbers in standard Python, it takes a few seconds. If you use <strong>NumPy</strong>, it happens in 0.001 seconds. NumPy is a library written in C++ that makes Python do math incredibly fast.</p>\n<hr>\n<h4>1. Creating a NumPy Array</h4>\n<p>NumPy arrays look like Python lists, but they are supercharged.</p>\n<pre><code class=\"language-python\">import numpy as np\n\n# Create an array of 5 numbers\nprices = np.array([10, 20, 30, 40, 50])\n\n# Multiply every number by 2 instantly!\ndoubled_prices = prices * 2\n\nprint(doubled_prices) # [20, 40, 60, 80, 100]</code></pre>",
        "quiz": [
          {
            "question": "Why do we use NumPy instead of standard Python lists?",
            "options": [
              "It looks cooler",
              "It is way faster at doing math",
              "It holds text better",
              "It connects to databases"
            ],
            "answer": 2,
            "explanation": "NumPy is optimized for massive mathematical calculations."
          }
        ]
      },
      {
        "id": "ml_matplotlib",
        "title": "Module 3: Matplotlib Graphs",
        "description": "Drawing pretty pictures with data.",
        "xpReward": 250,
        "content": "<h3>Matplotlib: The Artist 📊</h3>\n<p>It's hard to understand data just by looking at a spreadsheet. The human brain understands pictures better. We use <strong>Matplotlib</strong> to turn data into beautiful graphs and charts.</p>\n<hr>\n<h4>1. Drawing a Line Graph</h4>\n<pre><code class=\"language-python\">import matplotlib.pyplot as plt\n\ndays = [1, 2, 3, 4, 5]\ntemperature = [70, 72, 75, 80, 82]\n\n# Tell the artist to plot the dots\nplt.plot(days, temperature)\n\n# Add titles\nplt.title(\"Weather This Week\")\nplt.xlabel(\"Day\")\nplt.ylabel(\"Temperature\")\n\n# Show the drawing!\nplt.show()</code></pre>",
        "quiz": [
          {
            "question": "What function actually displays the graph on the screen?",
            "options": [
              "plt.draw()",
              "plt.plot()",
              "plt.show()",
              "plt.graph()"
            ],
            "answer": 3,
            "explanation": "plt.show() is the final command that pops up the graph window."
          }
        ]
      },
      {
        "id": "ml_split",
        "title": "Module 4: Train / Test Split",
        "description": "Testing your puppy's knowledge.",
        "xpReward": 250,
        "content": "<h3>Train / Test Splitting: The Exam 📝</h3>\n<p>When you train an AI puppy, you show it 1,000 pictures of cats and dogs. But how do you know if it actually learned, or if it just memorized those exact 1,000 pictures?</p>\n<p>You have to give it an exam! You hide 200 pictures in a drawer, train it on the 800 pictures, and then show it the hidden 200 pictures to see if it guesses right!</p>\n<hr>\n<h4>1. Splitting the Data</h4>\n<p>We use <code>scikit-learn</code> to automatically shuffle and split our data.</p>\n<pre><code class=\"language-python\">from sklearn.model_selection import train_test_split\n\n# Let's pretend X is our pictures, and y is the labels (Cat or Dog)\n# We split 20% of the data to use for testing later!\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20)\n\n# Now we train our AI only on the Training Data!\nmodel.fit(X_train, y_train)\n\n# And we test it on the hidden Test Data!\naccuracy = model.score(X_test, y_test)\nprint(accuracy)</code></pre>",
        "quiz": [
          {
            "question": "Why do we split our data into Training and Testing sets?",
            "options": [
              "To save hard drive space",
              "To make the AI train faster",
              "To prove the AI actually learned and didn't just memorize",
              "To make the code look professional"
            ],
            "answer": 3,
            "explanation": "Testing data proves the AI can handle new things it has never seen before."
          }
        ]
      },
      {
        "id": "ml_boss",
        "title": "Boss Battle 🤖: Price Predictor AI",
        "description": "Build a Machine Learning model.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🤖: Price Predictor AI</h3>\n<p>Use scikit-learn to build an AI that predicts house prices!</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Load a dataset of house prices using Pandas.</li>\n<li>Split the data into Training and Testing sets.</li>\n<li>Train a <code>LinearRegression</code> model.</li>\n<li>Ask the user for the square footage of a house, and have the AI predict the price!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did your AI successfully predict the price?",
            "options": [
              "No, it failed",
              "Yes, it is learning!"
            ],
            "answer": 2,
            "explanation": "Data Science Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "node": {
    "title": "Node.js Backend",
    "icon": "fa-brands fa-node",
    "color": "#68a063",
    "modules": [
      {
        "id": "node_1",
        "title": "Module 1: Servers",
        "description": "JavaScript on the backend.",
        "xpReward": 200,
        "content": "<h3>Welcome to Node.js: The Restaurant Kitchen 🍽️</h3>\n<p>Normally, JavaScript only lives inside the browser (the frontend). If a website is a restaurant, the browser is the dining room where the customers sit and look at the menus (HTML/CSS).</p>\n<p>But someone has to actually cook the food! <strong>Node.js</strong> allows JavaScript to run on the <strong>Backend</strong> (the kitchen). The kitchen's job is to talk to the database (the giant pantry fridge) to get the ingredients, cook the data, and send it back out to the dining room.</p>\n<hr>\n<h4>1. Creating a Server (Opening the Restaurant)</h4>\n<p>To build our kitchen, we use a tool called <strong>Express.js</strong>. It makes setting up a server incredibly fast.</p>\n<pre><code class=\"language-javascript\">const express = require('express');\nconst app = express();\n\n// 1. We create a \"Route\" (A window where the waiter passes the ticket to the kitchen)\n// When the customer asks (GETs) the homepage '/', we send them a message!\napp.get('/', (request, response) =&gt; {\n  response.send('Welcome to the Server Restaurant!');\n});\n\n// 2. We turn the Open Sign on!\napp.listen(3000, () =&gt; {\n  console.log('Restaurant is open on port 3000!');\n});</code></pre>",
        "quiz": [
          {
            "question": "What is Express.js?",
            "options": [
              "A database",
              "A frontend framework",
              "A Node.js web server framework",
              "A programming language"
            ],
            "answer": 3,
            "explanation": "Express is used to build Node servers quickly."
          }
        ]
      },
      {
        "id": "node_2",
        "title": "Module 2: Routing (REST APIs)",
        "description": "How to handle different requests.",
        "xpReward": 250,
        "content": "<h3>Routing: The Restaurant Waiter 🤵</h3>\n<p>In our restaurant analogy, the Waiter is the Router. When a customer says \"I want pizza\", the waiter routes that request to the Pizza Chef. When they say \"I want pasta\", the waiter routes it to the Pasta Chef.</p>\n<hr>\n<h4>1. The 4 Main Methods (CRUD)</h4>\n<p>When you talk to an API, you don't just ask for data. You can send data, update data, or delete data. We use different <strong>HTTP Methods</strong> for this:</p>\n<ul>\n<li><strong>GET:</strong> Read (Give me the menu)</li>\n<li><strong>POST:</strong> Create (Here is my new order)</li>\n<li><strong>PUT:</strong> Update (I want to change my order to a large)</li>\n<li><strong>DELETE:</strong> Delete (Cancel my order!)</li>\n</ul>\n<pre><code class=\"language-javascript\">const express = require('express');\nconst app = express();\n\n// GET request\napp.get('/users', (req, res) =&gt; {\n  res.send(\"Here are all the users!\");\n});\n\n// POST request\napp.post('/users', (req, res) =&gt; {\n  res.send(\"Created a brand new user!\");\n});</code></pre>",
        "quiz": [
          {
            "question": "Which HTTP Method is used to CREATE new data?",
            "options": [
              "GET",
              "POST",
              "PUT",
              "DELETE"
            ],
            "answer": 2,
            "explanation": "POST is used to submit new data to the server."
          }
        ]
      },
      {
        "id": "node_3",
        "title": "Module 3: Body Parsing (JSON)",
        "description": "Reading data from the frontend.",
        "xpReward": 250,
        "content": "<h3>Body Parsing: Reading the Order Ticket 📝</h3>\n<p>When a user fills out a Login form on the frontend (HTML) and clicks submit, that data is sent to the backend inside the \"Body\" of the POST request. But by default, Express doesn't know how to read it! It looks like gibberish.</p>\n<hr>\n<h4>1. express.json()</h4>\n<p>To fix this, we have to tell Express to translate the incoming gibberish into a <strong>JSON Object</strong> (JavaScript Object Notation).</p>\n<pre><code class=\"language-javascript\">const express = require('express');\nconst app = express();\n\n// This line is CRITICAL! It translates the incoming body into JSON.\napp.use(express.json());\n\napp.post('/login', (req, res) =&gt; {\n  // Now we can read the data sent by the user!\n  const username = req.body.username;\n  const password = req.body.password;\n  \n  res.send(\"Welcome back, \" + username);\n});</code></pre>",
        "quiz": [
          {
            "question": "What line of code is required to read JSON data sent from the frontend?",
            "options": [
              "app.readJSON()",
              "app.use(express.json())",
              "req.parseBody()",
              "res.sendJSON()"
            ],
            "answer": 2,
            "explanation": "app.use(express.json()) is the built-in middleware for parsing JSON."
          }
        ]
      },
      {
        "id": "node_4",
        "title": "Module 4: Middleware (The Bouncer)",
        "description": "Checking IDs at the door.",
        "xpReward": 250,
        "content": "<h3>Middleware: The Bouncer 🕶️</h3>\n<p>Imagine you have a VIP lounge in your restaurant. You don't let just anyone walk in. You put a Bouncer at the door. The Bouncer checks their ID. If it's valid, he lets them in. If not, he kicks them out.</p>\n<p>In Express, the bouncer is called <strong>Middleware</strong>. It is a function that runs IN THE MIDDLE (between the request coming in, and the route sending a response).</p>\n<hr>\n<h4>1. Writing a Middleware Function</h4>\n<pre><code class=\"language-javascript\">// The Bouncer Function\nfunction requireLogin(req, res, next) {\n  const isLoggedIn = false; // Imagine we check their token here\n  \n  if (isLoggedIn) {\n    next(); // Lets them pass through to the VIP lounge!\n  } else {\n    res.status(401).send(\"Access Denied! You are not logged in!\"); // Kicks them out!\n  }\n}\n\n// We put the bouncer in the middle of the route!\napp.get('/vip-lounge', requireLogin, (req, res) =&gt; {\n  res.send(\"Welcome to the VIP Lounge!\");\n});</code></pre>",
        "quiz": [
          {
            "question": "What does the next() function do in Middleware?",
            "options": [
              "Crashes the server",
              "Sends a response",
              "Passes the user to the next function/route",
              "Logs them out"
            ],
            "answer": 3,
            "explanation": "next() tells Express to move on to the next step in the chain."
          }
        ]
      },
      {
        "id": "node_5",
        "title": "Module 5: MongoDB (The Fridge)",
        "description": "Saving data permanently.",
        "xpReward": 250,
        "content": "<h3>MongoDB: The Giant Fridge 🧊</h3>\n<p>Right now, if our Node.js server restarts, all our data is erased because it only lives in RAM (the computer's short-term memory). We need a giant, permanent fridge to store our data forever. That is a <strong>Database</strong>.</p>\n<hr>\n<h4>1. Mongoose</h4>\n<p>MongoDB is the most popular database for Node.js. To talk to it easily, we use a tool called <strong>Mongoose</strong>. It lets us create \"Models\" (Blueprints) for what our data should look like.</p>\n<pre><code class=\"language-javascript\">const mongoose = require('mongoose');\n\n// 1. Connect to the Fridge\nmongoose.connect('mongodb://localhost/my_restaurant');\n\n// 2. Create a Blueprint (Schema) for a User\nconst UserSchema = new mongoose.Schema({\n  username: String,\n  age: Number\n});\n\n// 3. Create the actual Model\nconst User = mongoose.model('User', UserSchema);\n\n// Now we can save users permanently!\napp.post('/register', async (req, res) =&gt; {\n  const newUser = new User({ username: \"Alicia\", age: 25 });\n  await newUser.save(); // Saves to the database forever!\n  res.send(\"User saved!\");\n});</code></pre>",
        "quiz": [
          {
            "question": "What is Mongoose?",
            "options": [
              "A type of animal",
              "A frontend framework",
              "A tool to easily talk to MongoDB",
              "A server router"
            ],
            "answer": 3,
            "explanation": "Mongoose is an ODM (Object Data Modeling) library for MongoDB."
          }
        ]
      },
      {
        "id": "node_boss",
        "title": "Boss Battle 📡: Chat Server",
        "description": "Build a real-time API.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 📡: Chat Server</h3>\n<p>Build a REST API for a chat application.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create an Express server.</li>\n<li>Create a <code>POST /messages</code> endpoint that saves a message to an array.</li>\n<li>Create a <code>GET /messages</code> endpoint that returns all messages as JSON.</li>\n<li>Test it using Postman or your browser!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did your API successfully save and return messages?",
            "options": [
              "No",
              "Yes, it's live!"
            ],
            "answer": 2,
            "explanation": "Backend Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "dsa": {
    "title": "Algorithms (DSA)",
    "icon": "fa-solid fa-project-diagram",
    "color": "#9c27b0",
    "modules": [
      {
        "id": "dsa_1",
        "title": "Module 1: Big O Notation",
        "description": "Measuring code speed.",
        "xpReward": 200,
        "content": "<h3>DSA: Organizing the Giant Library 📚</h3>\n<p><strong>DSA</strong> stands for Data Structures and Algorithms. It sounds scary, but it's just about organizing things so you can find them fast.</p>\n<p>Imagine a massive library with 1 million books. If all the books were thrown in a giant pile on the floor, finding \"Harry Potter\" would take you a year. That is a terrible <strong>Data Structure</strong>. If the books were sorted alphabetically on shelves, you could find it in 5 minutes! That is a good Data Structure!</p>\n<hr>\n<h4>1. Big O Notation (The Speed Limit)</h4>\n<p>Big O Notation is how programmers brag about how fast their code is.</p>\n<ul>\n<li><strong>O(N) - Linear Time:</strong> Checking the giant pile of books one by one. If there are 1 million books (N), it takes 1 million steps. SLOW!</li>\n<li><strong>O(1) - Constant Time:</strong> You ask the magical librarian exactly where the book is, and she teleports it to your hand in 1 step. INSTANT!</li>\n</ul>\n<p>In coding, searching an Array one-by-one is O(N). But using a Hash Map (Dictionary) is O(1) instant magic!</p>",
        "quiz": [
          {
            "question": "Which Time Complexity is faster?",
            "options": [
              "O(N^2)",
              "O(N)",
              "O(1)",
              "O(log N)"
            ],
            "answer": 3,
            "explanation": "O(1) is instant, regardless of data size."
          }
        ]
      },
      {
        "id": "dsa_boss",
        "title": "Boss Battle 🧩: Binary Search",
        "description": "Write the fastest search algorithm.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🧩: Binary Search</h3>\n<p>Don't search one by one. Cut the data in half every time!</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create a sorted array of 100 numbers.</li>\n<li>Write a Binary Search function that finds a specific number by checking the middle, and discarding the half where the number CANNOT be.</li>\n<li>It should find the answer in less than 7 steps!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did your algorithm find the number instantly?",
            "options": [
              "No, it checked every number",
              "Yes, O(log N) achieved!"
            ],
            "answer": 2,
            "explanation": "Computer Science Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "csharp": {
    "title": "C# & .NET",
    "icon": "fa-brands fa-microsoft",
    "color": "#68217a",
    "modules": [
      {
        "id": "cs_1",
        "title": "Module 1: Enterprise C#",
        "description": "The Microsoft ecosystem.",
        "xpReward": 200,
        "content": "<h3>Welcome to C#: The City Builders 🏙️</h3>\n<p>If Python is a quick and dirty way to build a log cabin, <strong>C# (C-Sharp)</strong> is the massive steel cranes and hardhats used to build skyscrapers. It was created by Microsoft, and it is built for <strong>Enterprise</strong> (giant companies with massive teams).</p>\n<p>It forces everyone on the team to follow very strict rules, so that when 500 people are coding at the same time, the skyscraper doesn't collapse!</p>\n<hr>\n<h4>1. Strict Typing (Hardhats Required)</h4>\n<p>In JavaScript, a variable can be a number today, and a word tomorrow. C# says absolutely not! If a box is meant for numbers, you can never put a word in it. If you try, the building alarms go off!</p>\n<pre><code class=\"language-csharp\">using System;\n\nclass CityBuilder {\n    static void Main() {\n        // We MUST declare this is an Integer (int). \n        // No words allowed!\n        int numberOfSkyscrapers = 50;\n        \n        // We MUST declare this is a String (text).\n        String cityName = \"New York\";\n        \n        Console.WriteLine(cityName + \" has \" + numberOfSkyscrapers + \" buildings!\");\n    }\n}</code></pre>\n<p><em>Pro Tip: C# is also the primary language used in the <strong>Unity Game Engine</strong> to build massive 3D games!</em></p>",
        "quiz": [
          {
            "question": "What game engine famously uses C#?",
            "options": [
              "Unreal Engine",
              "Unity",
              "Godot",
              "Source"
            ],
            "answer": 2,
            "explanation": "Unity uses C# for all its scripting."
          }
        ]
      },
      {
        "id": "cs_boss",
        "title": "Boss Battle 🎮: Unity Controller",
        "description": "Script a player character.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🎮: Player Controller</h3>\n<p>Write the script to move a character in a game!</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create a <code>Player</code> class.</li>\n<li>Read <code>Input.GetAxis(\"Horizontal\")</code> to determine if the player is pressing Left or Right.</li>\n<li>Apply math to the <code>transform.position</code> to move the player across the screen!</li>\n</ol>",
        "quiz": [
          {
            "question": "Does the character move when you press the keys?",
            "options": [
              "No",
              "Yes, it's alive!"
            ],
            "answer": 2,
            "explanation": "C# Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "gamedev": {
    "title": "Game Dev (Lua)",
    "icon": "fa-solid fa-gamepad",
    "color": "#000080",
    "modules": [
      {
        "id": "lua_1",
        "title": "Module 1: Roblox & Lua",
        "description": "Build games in Roblox Studio.",
        "xpReward": 200,
        "content": "<h3>Game Dev (Lua): God Mode 🎮</h3>\n<p>When you play a video game, you are bound by the rules. You can't walk through walls, and if you touch lava, you die.</p>\n<p>But when you code a game, you are in <strong>God Mode</strong>. You write the rules! You want the player to jump 100 feet in the air? You write the code for it. <strong>Lua</strong> is a super fast, lightweight language used to write the rules in massive games like Roblox and World of Warcraft.</p>\n<hr>\n<h4>1. Changing the Rules</h4>\n<p>In Roblox Studio, every object in the game has properties. We can use Lua to change those properties while the game is running!</p>\n<pre><code class=\"language-lua\">-- 1. Find the magical jumping block in the game world\nlocal jumpPad = game.Workspace.JumpPad\n\n-- 2. Change its color to neon green!\njumpPad.BrickColor = BrickColor.new(\"Lime green\")\n\n-- 3. Write a rule: When a player touches it, double their jump height!\njumpPad.Touched:Connect(function(hit)\n    local player = hit.Parent\n    -- Check if the thing that touched it is actually a human player\n    if player:FindFirstChild(\"Humanoid\") then\n        -- God Mode: Give them super jumps!\n        player.Humanoid.JumpPower = 100\n    end\nend)</code></pre>",
        "quiz": [
          {
            "question": "What operator concatenates strings in Lua?",
            "options": [
              "+",
              "&",
              "..",
              "concat()"
            ],
            "answer": 3,
            "explanation": "The double dot (..) joins strings in Lua."
          }
        ]
      },
      {
        "id": "lua_2",
        "title": "Module 2: Studio Basics",
        "description": "How to use Roblox Studio.",
        "xpReward": 250,
        "content": "<h3>Roblox Studio: The Workshop 🛠️</h3>\n<p>Before writing code, you have to build the world! When you open Roblox Studio, you'll see a few very important windows.</p>\n<hr>\n<h4>1. Explorer & Properties</h4>\n<ul>\n<li><strong>The Explorer:</strong> This is a list of EVERY single object in your game (players, blocks, lights, scripts). If it exists, it's in the Explorer.</li>\n<li><strong>The Properties Window:</strong> When you click an object in the Explorer, the Properties window shows you everything about it (its color, size, material).</li>\n<li><strong>The Output Window:</strong> The most important window for coders! This is where errors and <code>print()</code> messages show up. If your game is broken, check the Output!</li>\n</ul>",
        "quiz": [
          {
            "question": "Which window shows you a list of every single object in your game?",
            "options": [
              "The Output Window",
              "The Explorer",
              "The Properties Window",
              "The Script Editor"
            ],
            "answer": 2,
            "explanation": "The Explorer is the hierarchy view of your entire game universe."
          }
        ]
      },
      {
        "id": "lua_3",
        "title": "Module 3: Parts & Properties",
        "description": "Changing the physical world with code.",
        "xpReward": 250,
        "content": "<h3>Parts & Properties: God Mode 🌍</h3>\n<p>In Roblox, blocks are called <strong>Parts</strong>. You can change a Part's color using the Properties window, but it's much cooler to change it using Lua code while the game is running!</p>\n<hr>\n<h4>1. Referencing a Part</h4>\n<p>To change a part, you first have to find it in the <code>game.Workspace</code>.</p>\n<pre><code class=\"language-lua\">-- 1. Find the Part called \"MagicBlock\" inside the Workspace\nlocal myBlock = game.Workspace.MagicBlock\n\n-- 2. Change its color to Neon Blue!\nmyBlock.BrickColor = BrickColor.new(\"Cyan\")\n\n-- 3. Make it slightly invisible! (0 is solid, 1 is invisible)\nmyBlock.Transparency = 0.5</code></pre>",
        "quiz": [
          {
            "question": "Where do physical Parts (blocks) live inside the game?",
            "options": [
              "game.Players",
              "game.Lighting",
              "game.Workspace",
              "game.ServerStorage"
            ],
            "answer": 3,
            "explanation": "The Workspace holds all physical objects that render in the 3D world."
          }
        ]
      },
      {
        "id": "lua_4",
        "title": "Module 4: Variables & Functions",
        "description": "Writing reusable game mechanics.",
        "xpReward": 250,
        "content": "<h3>Variables & Functions ⚙️</h3>\n<p>If you want a player to get coins every time they touch a chest, you don't want to rewrite the code 1,000 times. You use a <strong>Function</strong>!</p>\n<hr>\n<h4>1. Writing a Function</h4>\n<p>A function is a block of code that only runs when you tell it to (or \"call\" it).</p>\n<pre><code class=\"language-lua\">-- 1. Create a variable to hold our coins\nlocal coins = 0\n\n-- 2. Define the Function\nlocal function giveReward()\n    coins = coins + 50\n    print(\"You now have \" .. coins .. \" coins!\")\nend\n\n-- 3. Call the function twice!\ngiveReward()\ngiveReward()\n-- Output: You now have 100 coins!</code></pre>",
        "quiz": [
          {
            "question": "What does calling a function do?",
            "options": [
              "Deletes the code",
              "Runs the code inside the function",
              "Creates a variable",
              "Stops the game"
            ],
            "answer": 2,
            "explanation": "A function must be 'called' for the code inside it to actually run."
          }
        ]
      },
      {
        "id": "lua_5",
        "title": "Module 5: Server vs Client",
        "description": "The most important concept in multiplayer.",
        "xpReward": 250,
        "content": "<h3>Server vs Client: The Golden Rule ⚖️</h3>\n<p>Because Roblox is multiplayer, there is a giant difference between the <strong>Server</strong> (the computer hosting the game for everyone) and the <strong>Client</strong> (your personal computer/phone).</p>\n<hr>\n<h4>1. Server Scripts vs Local Scripts</h4>\n<ul>\n<li><strong>Server Scripts:</strong> These run on the Server. If a Server Script turns the sky red, <em>everyone</em> in the game sees a red sky. We use these for giving players money, dealing damage, and saving data.</li>\n<li><strong>Local Scripts:</strong> These run only on YOUR computer (the Client). If a Local Script turns the sky red, only YOU see it. Everyone else sees a normal blue sky. We use these for UI buttons and detecting mouse clicks!</li>\n</ul>\n<p><em>Rule of thumb: Never trust the Client! Hackers can change Local Scripts, but they can never change Server Scripts.</em></p>",
        "quiz": [
          {
            "question": "If a player clicks a 'Buy' button in their UI, what kind of script detects the click?",
            "options": [
              "Server Script",
              "Local Script",
              "Database Script",
              "Hack Script"
            ],
            "answer": 2,
            "explanation": "UI is strictly handled by Local Scripts running on the player's personal device."
          }
        ]
      },
      {
        "id": "lua_boss",
        "title": "Boss Battle 🌋: Lava Obby",
        "description": "Script a deadly obstacle.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🌋: The Kill Brick</h3>\n<p>Script a block of lava in Roblox that kills the player on touch.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Create a Part in Roblox Studio and color it neon red.</li>\n<li>Add a Script to the Part.</li>\n<li>Write an <code>onTouched(hit)</code> function.</li>\n<li>Check if the thing that touched it has a <code>Humanoid</code>. If so, set its Health to 0!</li>\n</ol>",
        "quiz": [
          {
            "question": "Does the player explode when they touch the lava?",
            "options": [
              "No, it's safe",
              "Yes, instant death!"
            ],
            "answer": 2,
            "explanation": "Game Dev Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "uiux": {
    "title": "UI/UX Design",
    "icon": "fa-solid fa-pen-nib",
    "color": "#ff3366",
    "modules": [
      {
        "id": "ui_1",
        "title": "Module 1: Color & Layout",
        "description": "Design before you code.",
        "xpReward": 200,
        "content": "<h3>UI/UX: The Interior Designer 🛋️</h3>\n<p>Imagine walking into a house where the toilet is in the kitchen, the walls are painted neon pink, and the front door is on the roof. The house \"works\", but the experience is horrible.</p>\n<p><strong>UI (User Interface)</strong> is how the house looks (the paint colors and furniture). <strong>UX (User Experience)</strong> is how the house feels (is it easy to find the bathroom?). Before a programmer ever writes code, a UI/UX Designer draws the perfect blueprint so the programmers don't build a toilet in the kitchen.</p>\n<hr>\n<h4>1. The 60-30-10 Color Rule</h4>\n<p>When picking colors for your app, you should never pick randomly. The best designers use a psychological trick called the 60-30-10 rule:</p>\n<ul>\n<li><strong>60% Background:</strong> A neutral color (like white, dark gray, or black) that covers most of the screen so it doesn't hurt the eyes.</li>\n<li><strong>30% Secondary:</strong> A slightly different color to highlight cards or sidebars.</li>\n<li><strong>10% Accent:</strong> A bright, bold color (like neon blue or red) used ONLY for the most important buttons you want the user to click (like \"Buy Now\" or \"Subscribe\").</li>\n</ul>",
        "quiz": [
          {
            "question": "What does UX stand for?",
            "options": [
              "User X-ray",
              "User Experience",
              "User Extra",
              "Universal Experience"
            ],
            "answer": 2,
            "explanation": "UX is the overall experience and usability of a product."
          }
        ]
      },
      {
        "id": "ui_boss",
        "title": "Boss Battle 🖌️: Figma Prototype",
        "description": "Design a mobile app.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🖌️: Figma Prototype</h3>\n<p>Before writing a single line of code, design it.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Open Figma (or pen and paper).</li>\n<li>Design 3 screens for a Food Delivery App (Home, Menu, Checkout).</li>\n<li>Ensure buttons are large enough for a thumb to easily tap (Accessibility).</li>\n<li>Link the screens together into a clickable prototype!</li>\n</ol>",
        "quiz": [
          {
            "question": "Is your prototype clickable and beautiful?",
            "options": [
              "No, it's just boxes",
              "Yes, it looks ready to code!"
            ],
            "answer": 2,
            "explanation": "Design Mastery Unlocked!"
          }
        ]
      }
    ]
  },
  "ai": {
    "title": "Generative AI",
    "icon": "fa-solid fa-robot",
    "color": "#10a37f",
    "modules": [
      {
        "id": "ai_1",
        "title": "Module 1: Prompt Engineering",
        "description": "Talk to AI like a pro.",
        "xpReward": 200,
        "content": "<h3>Generative AI: The Super-Intern 🤖</h3>\n<p>A lot of people think AI is going to steal their jobs. That is not true. AI is like a brilliant, incredibly fast <strong>Intern</strong> that works for you for free. The intern knows everything, but they have zero common sense. If you give them bad instructions, they will do a bad job really fast.</p>\n<p><strong>Prompt Engineering</strong> is the skill of giving the Super-Intern perfect, crystal-clear instructions so they generate exactly the code you want!</p>\n<hr>\n<h4>1. The Persona Trick</h4>\n<p>If you ask an AI: <em>\"Write me a website\"</em>, the intern will give you a generic, boring, ugly website.</p>\n<p>Instead, you must assign the AI a <strong>Persona</strong> and give it strict rules.</p>\n<pre><code class=\"language-text\">\"Act as a Senior Web Developer at Apple. \nWrite a highly-modern, beautiful landing page for a new iPhone. \nRule 1: Use HTML and CSS only. \nRule 2: Use the 60-30-10 color rule with a dark mode theme. \nRule 3: Ensure the button has a smooth hover animation.\"</code></pre>\n<p>By giving the intern a Persona and Rules, the code it writes will be 100x better!</p>",
        "quiz": [
          {
            "question": "What is the key to getting good code from an AI?",
            "options": [
              "Typing fast",
              "Providing rich context and personas",
              "Using all caps",
              "Saying please"
            ],
            "answer": 2,
            "explanation": "Context and specifics yield the best AI generations."
          }
        ]
      },
      {
        "id": "ai_boss",
        "title": "Boss Battle 🧠: Auto-Coder",
        "description": "Use an API to generate code.",
        "xpReward": 1000,
        "content": "<h3>Boss Battle 🧠: The API Wrapper</h3>\n<p>Write a script that talks to an AI API.</p>\n<hr>\n<h4>The Requirements</h4>\n<ol>\n<li>Get an API key from OpenAI, Anthropic, or Google.</li>\n<li>Write a Python or Node.js script that sends a prompt to the API.</li>\n<li>Have the AI automatically generate a Python script, and then use your script to save it to a file!</li>\n</ol>",
        "quiz": [
          {
            "question": "Did your script successfully generate and save code?",
            "options": [
              "No, API error",
              "Yes, the AI is working for me!"
            ],
            "answer": 2,
            "explanation": "AI Mastery Unlocked!"
          }
        ]
      }
    ]
  }
};
module.exports = CourseData;