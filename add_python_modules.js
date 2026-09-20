const fs = require('fs');
const path = require('path');

// Read the original file
const text = fs.readFileSync('data.js', 'utf8');
const parts = text.split('const CourseData =');
const careerPathsPrefix = parts[0]; // This preserves the CareerPaths block at the top

// Write out a temporary file so we can require() the CourseData object
const tempScript = text + '\nmodule.exports = CourseData;';
fs.writeFileSync('temp_data_python.js', tempScript);
const CourseData = require(path.join(__dirname, 'temp_data_python.js'));

// --- UPDATE BEGINNER TIER --- //
for (let i = 0; i < 7; i++) {
  if (CourseData.python.modules[i]) {
    CourseData.python.modules[i].tier = 'Beginner';
  }
}

// --- CREATE INTERMEDIATE TIER --- //
const intermediateModules = [
  {
    "id": "py_m8",
    "title": "Module 8: Classes & Objects",
    "description": "Object-Oriented Programming (OOP) basics.",
    "tier": "Intermediate",
    "xpReward": 160,
    "content": "<h3>Classes & Objects 🏗️</h3>\n<p>Python is an <strong>Object-Oriented</strong> programming language. Everything in Python is an object! But what if you want to create your own custom objects, like a <code>Player</code> in a video game? You use a <strong>Class</strong>.</p>\n<hr>\n<h4>1. Creating a Class</h4>\n<p>Think of a class as a blueprint. It defines what a <code>Player</code> should have, like a name and health. The special <code>__init__</code> method (called the constructor) runs automatically when a new player is born.</p>\n<pre><code class=\"language-python\">class Player:\n    def __init__(self, name, health):\n        self.name = name\n        self.health = health\n        \n    def attack(self):\n        print(f\"{self.name} attacks the enemy!\")\n</code></pre>\n<hr>\n<h4>2. Creating Objects</h4>\n<p>Once you have a blueprint, you can build as many objects from it as you want!</p>\n<pre><code class=\"language-python\"># Create two unique players\nhero = Player(\"Alicia\", 100)\nvillain = Player(\"Bowser\", 500)\n\nprint(hero.name) # Alicia\nhero.attack()    # Alicia attacks the enemy!</code></pre>\n<p>Notice the word <code>self</code>? Inside a class, <code>self</code> refers to the specific object you are working with (like saying \"my own name\").</p>",
    "quiz": [
      {
        "question": "What is a Class in Python?",
        "options": [
          "A specific object in memory",
          "A blueprint or template for creating objects",
          "A built-in data type like int or float",
          "A type of loop"
        ],
        "answer": 1,
        "explanation": "A Class is the blueprint. An Object is the actual item built from that blueprint."
      },
      {
        "question": "Which special method runs automatically when an object is created?",
        "options": [
          "__start__",
          "__init__",
          "__create__",
          "__new__"
        ],
        "answer": 1,
        "explanation": "The __init__ method (initializer/constructor) sets up the object instantly when it is created."
      },
      {
        "question": "What does the keyword 'self' refer to inside a class method?",
        "options": [
          "The parent class",
          "The user running the program",
          "The specific object instance that called the method",
          "The Python interpreter"
        ],
        "answer": 2,
        "explanation": "'self' represents the specific instance of the class (e.g. hero vs villain) so they can track their own unique variables."
      },
      {
        "question": "If you have a class called Dog, how do you create a new dog named 'Buddy'?",
        "options": [
          "my_dog = new Dog('Buddy')",
          "my_dog = create Dog('Buddy')",
          "my_dog = Dog('Buddy')",
          "Dog my_dog = 'Buddy'"
        ],
        "answer": 2,
        "explanation": "In Python, you simply call the class name like a function: Dog('Buddy'). No 'new' keyword is needed."
      },
      {
        "question": "How do you call a method named 'bark()' on an object named 'my_dog'?",
        "options": [
          "bark(my_dog)",
          "my_dog->bark()",
          "my_dog.bark()",
          "Dog.bark()"
        ],
        "answer": 2,
        "explanation": "You use dot notation (my_dog.bark()) to access methods and variables inside an object."
      }
    ]
  },
  {
    "id": "py_m9",
    "title": "Module 9: Error Handling",
    "description": "Using try/except blocks to prevent crashes.",
    "tier": "Intermediate",
    "xpReward": 170,
    "content": "<h3>Error Handling 🚨</h3>\n<p>What happens if you ask the user to type their age, but they type \"twenty\" instead of \"20\"? When you try to convert \"twenty\" into a number, Python will violently crash with a <code>ValueError</code>. To stop crashes, we use <strong>Try / Except</strong> blocks.</p>\n<hr>\n<h4>1. Try / Except</h4>\n<p>You put the dangerous code inside the <code>try</code> block. If it explodes, Python catches the error and instantly jumps to the <code>except</code> block instead of crashing the program.</p>\n<pre><code class=\"language-python\">try:\n    age = int(input(\"Enter your age: \"))\n    print(f\"You are {age} years old.\")\nexcept ValueError:\n    # This runs ONLY if a ValueError occurs\n    print(\"Error: Please type a number!\")\n</code></pre>\n<hr>\n<h4>2. Catching All Errors</h4>\n<p>You can catch specific errors (like <code>ValueError</code> or <code>ZeroDivisionError</code>) or catch ALL errors at once using a bare <code>except Exception as e:</code> block.</p>\n<pre><code class=\"language-python\">try:\n    result = 10 / 0\nexcept Exception as e:\n    print(f\"An explosion happened: {e}\")\n\nprint(\"The program is still running perfectly fine!\")</code></pre>",
    "quiz": [
      {
        "question": "What is the purpose of a 'try' block?",
        "options": [
          "To test if the Python compiler is installed",
          "To wrap dangerous code that might cause the program to crash",
          "To repeat code until it succeeds",
          "To slow down the program"
        ],
        "answer": 1,
        "explanation": "The try block holds code that might throw an error so you can catch it safely."
      },
      {
        "question": "Which block catches the error if the 'try' block fails?",
        "options": [
          "catch",
          "handle",
          "except",
          "else"
        ],
        "answer": 2,
        "explanation": "In Python, we use 'except' (unlike Java/C++ which use 'catch')."
      },
      {
        "question": "What happens if code in the 'try' block runs perfectly with no errors?",
        "options": [
          "The except block is skipped entirely",
          "The except block runs anyway",
          "The program asks the user if they want to continue",
          "It crashes"
        ],
        "answer": 0,
        "explanation": "If there is no error, the except block is completely ignored."
      },
      {
        "question": "What error occurs if you try to divide a number by zero in Python?",
        "options": [
          "ValueError",
          "TypeError",
          "ZeroDivisionError",
          "MathError"
        ],
        "answer": 2,
        "explanation": "Dividing by zero is mathematically impossible and throws a ZeroDivisionError."
      },
      {
        "question": "What does 'except Exception as e:' do?",
        "options": [
          "It ignores all errors without reporting them",
          "It catches ANY type of error and stores the error details in the variable 'e'",
          "It only catches spelling errors",
          "It prints 'e' to the screen"
        ],
        "answer": 1,
        "explanation": "This is a catch-all block that stores the error message inside the variable 'e'."
      }
    ]
  },
  {
    "id": "py_m10",
    "title": "Module 10: File Handling",
    "description": "Reading and writing files in Python.",
    "tier": "Intermediate",
    "xpReward": 180,
    "content": "<h3>File Handling 💾</h3>\n<p>Every time your Python program ends, all your variables are wiped from RAM memory. If you want to permanently save a user's high score, you need to write it to the hard drive as a text file.</p>\n<hr>\n<h4>1. Writing to a File</h4>\n<p>We use the built-in <code>open()</code> function. Passing <code>\"w\"</code> tells Python we want to <strong>write</strong> to the file (it will create the file if it doesn't exist). The <code>with</code> keyword ensures the file is safely closed when we are done.</p>\n<pre><code class=\"language-python\"># 'w' mode overwrites the file entirely.\nwith open(\"save_data.txt\", \"w\") as file:\n    file.write(\"HighScore: 9999\\n\")\n    file.write(\"Level: 10\")\n    \nprint(\"File saved!\")</code></pre>\n<hr>\n<h4>2. Reading from a File</h4>\n<p>To read the file back into our program, we use <code>\"r\"</code> for <strong>read</strong> mode.</p>\n<pre><code class=\"language-python\">try:\n    with open(\"save_data.txt\", \"r\") as file:\n        content = file.read() # Reads the entire file as a single string\n        print(\"Loaded Data:\\n\" + content)\nexcept FileNotFoundError:\n    print(\"Save file does not exist yet!\")</code></pre>\n<p>You can also use <code>\"a\"</code> for <strong>append</strong> mode if you want to add new lines to the end of a file without erasing what's already there.</p>",
    "quiz": [
      {
        "question": "What function is used to open a file in Python?",
        "options": [
          "read()",
          "file()",
          "open()",
          "load()"
        ],
        "answer": 2,
        "explanation": "The built-in open() function is used to open files for reading or writing."
      },
      {
        "question": "What does the 'w' mode do when opening a file?",
        "options": [
          "Reads the file",
          "Writes to the file, but erases everything that was already in it",
          "Appends text to the bottom of the file",
          "Waits for the file to exist"
        ],
        "answer": 1,
        "explanation": "'w' (write) mode completely overwrites the file from scratch."
      },
      {
        "question": "What mode should you use if you want to add text to the END of an existing file?",
        "options": [
          "'r' (read)",
          "'w' (write)",
          "'a' (append)",
          "'x' (execute)"
        ],
        "answer": 2,
        "explanation": "'a' (append) mode adds new data to the bottom without destroying the old data."
      },
      {
        "question": "What is the benefit of using the 'with' statement when opening files?",
        "options": [
          "It makes reading files faster",
          "It automatically closes the file for you when the block ends, even if an error occurs",
          "It encrypts the file",
          "It formats the text"
        ],
        "answer": 1,
        "explanation": "The 'with' statement acts as a context manager, ensuring the file is safely closed to prevent memory leaks."
      },
      {
        "question": "What exception is thrown if you try to open a file in 'r' mode that doesn't exist?",
        "options": [
          "ValueError",
          "FileNotFoundError",
          "MissingFileError",
          "SystemError"
        ],
        "answer": 1,
        "explanation": "Python throws a FileNotFoundError if it cannot locate the file on your hard drive."
      }
    ]
  },
  {
    "id": "py_m11",
    "title": "Module 11: Modules and Imports",
    "description": "Using standard libraries and code from other files.",
    "tier": "Intermediate",
    "xpReward": 190,
    "content": "<h3>Modules and Imports 📦</h3>\n<p>Python has a massive ecosystem of pre-written code that you can pull into your projects. A <strong>Module</strong> is simply a Python file containing functions and variables. By using the <code>import</code> keyword, you can use that code in your own file.</p>\n<hr>\n<h4>1. Importing Standard Libraries</h4>\n<p>Python comes with dozens of built-in modules. For example, if you want to generate a random number or calculate a square root, you don't have to write the math yourself!</p>\n<pre><code class=\"language-python\">import math\nimport random\n\n# Generate a random number between 1 and 10\ndice_roll = random.randint(1, 10)\nprint(f\"You rolled a {dice_roll}!\")\n\n# Calculate the square root of 64\nroot = math.sqrt(64)\nprint(f\"Square root of 64 is {root}\")</code></pre>\n<hr>\n<h4>2. Specific Imports</h4>\n<p>If you don't want to type <code>random.randint()</code> every time, you can import just the specific tool you need using the <code>from</code> keyword.</p>\n<pre><code class=\"language-python\">from random import randint, choice\n\n# Now you don't need to type 'random.' first!\nnum = randint(1, 100)\nwinner = choice([\"Alice\", \"Bob\", \"Charlie\"])\n</code></pre>\n<p>You can even import code from your <em>own</em> python files! If you have a file named <code>player.py</code>, you can simply type <code>import player</code> in your main file to use its code.</p>",
    "quiz": [
      {
        "question": "What is a module in Python?",
        "options": [
          "A type of loop",
          "A file containing Python code, functions, and variables",
          "A built-in data type",
          "An error message"
        ],
        "answer": 1,
        "explanation": "A module is just a regular .py file containing reusable code."
      },
      {
        "question": "Which keyword is used to bring a module into your current file?",
        "options": [
          "include",
          "require",
          "import",
          "load"
        ],
        "answer": 2,
        "explanation": "You use the 'import' keyword to bring in modules."
      },
      {
        "question": "What does 'from random import randint' do?",
        "options": [
          "Imports the entire random library",
          "Imports ONLY the randint function so you don't have to type 'random.' before using it",
          "Renames randint to random",
          "Deletes the randint function"
        ],
        "answer": 1,
        "explanation": "This allows you to just type 'randint(1, 10)' directly, saving typing."
      },
      {
        "question": "Which standard library would you import to calculate a square root?",
        "options": [
          "random",
          "os",
          "math",
          "sys"
        ],
        "answer": 2,
        "explanation": "The 'math' module contains advanced mathematical operations like sqrt, sin, cos, and pi."
      },
      {
        "question": "Can you import your own Python files?",
        "options": [
          "Yes, simply by importing the file's name (without the .py)",
          "No, you can only import standard libraries",
          "Only if they are inside a zip file",
          "Only if you pay for a license"
        ],
        "answer": 0,
        "explanation": "If you have a file named config.py, you can just type 'import config' to use its contents."
      }
    ]
  }
];

// --- CREATE ADVANCED TIER --- //
const advancedModules = [
  {
    "id": "py_m12",
    "title": "Module 12: Inheritance and Polymorphism",
    "description": "Advanced Object-Oriented Programming concepts.",
    "tier": "Advanced",
    "xpReward": 250,
    "content": "<h3>Inheritance 🧬</h3>\n<p><strong>Inheritance</strong> allows a new class (Child) to absorb all the variables and methods of an existing class (Parent), saving you from copying and pasting code!</p>\n<pre><code class=\"language-python\"># Parent Class\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n        \n    def eat(self):\n        print(f\"{self.name} is eating.\")\n\n# Child Class (Inherits from Animal)\nclass Dog(Animal):\n    def bark(self):\n        print(\"Woof! Woof!\")\n\nbuddy = Dog(\"Buddy\")\nbuddy.eat()  # Inherited from Animal!\nbuddy.bark() # Unique to Dog\n</code></pre>\n<hr>\n<h4>Polymorphism 🎭</h4>\n<p><strong>Polymorphism</strong> means \"many forms.\" It allows child classes to override a parent's methods and replace them with their own unique version.</p>\n<pre><code class=\"language-python\">class Cat(Animal):\n    # Overriding the parent's eat method!\n    def eat(self):\n        print(f\"{self.name} nibbles on fish daintily.\")\n\ngarfield = Cat(\"Garfield\")\ngarfield.eat() # Prints the unique Cat version, not the Animal version!\n</code></pre>",
    "quiz": [
      {
        "question": "What is the main benefit of Inheritance?",
        "options": [
          "It makes the program run faster",
          "It allows classes to share and reuse code, preventing duplication",
          "It encrypts the code",
          "It converts Python into Java"
        ],
        "answer": 1,
        "explanation": "Inheritance allows child classes to inherit attributes and methods, promoting code reuse."
      },
      {
        "question": "How do you specify that 'Dog' inherits from 'Animal' in Python?",
        "options": [
          "class Dog extends Animal:",
          "class Dog inherits Animal:",
          "class Dog(Animal):",
          "class Animal(Dog):"
        ],
        "answer": 2,
        "explanation": "In Python, you put the parent class inside parentheses: class Dog(Animal):"
      },
      {
        "question": "Does a child class automatically get access to the parent's methods?",
        "options": [
          "Yes",
          "No, they must be rewritten",
          "Only if the parent is empty",
          "Only if the method is named __init__"
        ],
        "answer": 0,
        "explanation": "The child class instantly absorbs all accessible methods from the parent for free."
      },
      {
        "question": "What is Polymorphism?",
        "options": [
          "Writing code in multiple languages",
          "A virus that attacks objects",
          "The ability for a child class to override a parent's method with its own version",
          "The ability to create multiple objects"
        ],
        "answer": 2,
        "explanation": "Polymorphism (many forms) allows child classes to alter or override inherited behaviors."
      },
      {
        "question": "If a Cat overrides the eat() method, what happens when garfield.eat() is called?",
        "options": [
          "It calls the parent Animal's eat() method",
          "It crashes",
          "It calls both methods",
          "It calls the new Cat's eat() method"
        ],
        "answer": 3,
        "explanation": "The child's overridden method replaces the parent's method for that specific object."
      }
    ]
  },
  {
    "id": "py_m13",
    "title": "Module 13: List Comprehensions",
    "description": "Writing powerful, Pythonic one-liner loops.",
    "tier": "Advanced",
    "xpReward": 260,
    "content": "<h3>List Comprehensions ⚡</h3>\n<p>Python developers love writing elegant, readable code (they call this being \"Pythonic\"). A <strong>List Comprehension</strong> is a powerful tool that allows you to create and filter lists in a single, lightning-fast line of code, completely replacing bulky <code>for</code> loops.</p>\n<hr>\n<h4>1. The Bulky Way</h4>\n<p>Let's say we want a list of all numbers from 1 to 5, but doubled.</p>\n<pre><code class=\"language-python\">doubles = []\nfor i in range(1, 6):\n    doubles.append(i * 2)\n    \nprint(doubles) # [2, 4, 6, 8, 10]</code></pre>\n<hr>\n<h4>2. The Pythonic Way</h4>\n<p>We can do the exact same thing in one line of code using a list comprehension. The syntax is: <code>[expression for item in iterable]</code></p>\n<pre><code class=\"language-python\"># Boom! One line.\ndoubles = [i * 2 for i in range(1, 6)]\nprint(doubles) # [2, 4, 6, 8, 10]</code></pre>\n<hr>\n<h4>3. Adding Filters (If statements)</h4>\n<p>You can even add an <code>if</code> statement at the end to filter the results! Let's get only the EVEN numbers from 1 to 10.</p>\n<pre><code class=\"language-python\">evens = [x for x in range(1, 11) if x % 2 == 0]\nprint(evens) # [2, 4, 6, 8, 10]</code></pre>",
    "quiz": [
      {
        "question": "What is the primary purpose of a List Comprehension?",
        "options": [
          "To sort a list alphabetically",
          "To create or filter lists in a concise, single line of code",
          "To encrypt lists",
          "To delete lists from memory"
        ],
        "answer": 1,
        "explanation": "List comprehensions replace multi-line for-loops with a fast, one-line syntax."
      },
      {
        "question": "Which of these is the correct syntax for a simple list comprehension?",
        "options": [
          "[for item in list return expression]",
          "[expression for item in iterable]",
          "{item: expression in list}",
          "(for x in iterable: expression)"
        ],
        "answer": 1,
        "explanation": "The format is always brackets containing the expression, followed by the for loop."
      },
      {
        "question": "What will '[x * 10 for x in range(3)]' produce?",
        "options": [
          "[0, 10, 20]",
          "[10, 20, 30]",
          "[0, 1, 2]",
          "Error"
        ],
        "answer": 0,
        "explanation": "range(3) gives 0, 1, 2. Multiplying by 10 gives [0, 10, 20]."
      },
      {
        "question": "Can you include 'if' statements inside a list comprehension?",
        "options": [
          "No",
          "Yes, they go at the very end to act as a filter",
          "Yes, they go at the very beginning",
          "Only if the list contains strings"
        ],
        "answer": 1,
        "explanation": "You can append an 'if' at the end (e.g., [x for x in nums if x > 5]) to filter items."
      },
      {
        "question": "Why do Python developers prefer list comprehensions?",
        "options": [
          "Because they are mandatory in Python 3",
          "Because they look cool",
          "Because they are more concise, readable, and often run faster than standard loops",
          "Because they use less RAM"
        ],
        "answer": 2,
        "explanation": "They are considered highly 'Pythonic' due to their elegance and execution speed."
      }
    ]
  },
  {
    "id": "py_m14",
    "title": "Module 14: Generators",
    "description": "The yield keyword and extreme memory efficiency.",
    "tier": "Advanced",
    "xpReward": 270,
    "content": "<h3>Generators & The Yield Keyword 🏭</h3>\n<p>Imagine you want to loop through a million numbers. If you put 1,000,000 numbers into a standard Python List, it will consume hundreds of megabytes of RAM. What if your computer doesn't have that much RAM? It crashes.</p>\n<p>A <strong>Generator</strong> solves this. Instead of storing all the numbers in memory at once, a generator calculates and spits out <em>one number at a time</em>, pausing in between. It takes up almost zero RAM!</p>\n<hr>\n<h4>The yield Keyword</h4>\n<p>To create a generator, you write a normal function, but instead of using <code>return</code>, you use <code>yield</code>.</p>\n<pre><code class=\"language-python\">def count_up_to(max):\n    count = 1\n    while count <= max:\n        # Yield pauses the function and spits out the number\n        yield count \n        count += 1\n\n# Using the generator in a loop\nfor number in count_up_to(5):\n    print(number)\n</code></pre>\n<p>When Python hits <code>yield</code>, it hands the number to the <code>for</code> loop, and the function goes to sleep. When the loop asks for the next number, the function wakes up right where it left off! Because it only remembers one number at a time, you could generate a trillion numbers without crashing your computer.</p>",
    "quiz": [
      {
        "question": "What is the primary benefit of a Generator over a List?",
        "options": [
          "It is easier to spell",
          "It uses almost zero memory (RAM) because it generates items one at a time",
          "It can generate images",
          "It sorts data faster"
        ],
        "answer": 1,
        "explanation": "Generators evaluate lazily (one item at a time), meaning they never load massive datasets into memory."
      },
      {
        "question": "What keyword is used inside a function to make it a generator?",
        "options": [
          "return",
          "generate",
          "spit",
          "yield"
        ],
        "answer": 3,
        "explanation": "The 'yield' keyword pauses the function and returns a value, turning the function into a generator."
      },
      {
        "question": "What happens to a generator function after it hits 'yield'?",
        "options": [
          "It deletes itself",
          "It crashes",
          "It pauses its state and goes to sleep until the next item is requested",
          "It loops back to the top automatically"
        ],
        "answer": 2,
        "explanation": "Unlike 'return' which destroys the function, 'yield' simply pauses it so it can resume later."
      },
      {
        "question": "If you try to print a generator directly (e.g., print(count_up_to(5))), what happens?",
        "options": [
          "It prints all the numbers instantly",
          "It prints a generator object address in memory",
          "It throws an error",
          "It prints 0"
        ],
        "answer": 1,
        "explanation": "A generator doesn't compute its values until you loop over it, so it just prints a memory object."
      },
      {
        "question": "Can you use a generator in a standard 'for' loop?",
        "options": [
          "Yes, just like you would loop through a list",
          "No, you must use a while loop",
          "No, generators cannot be looped over",
          "Only if the generator yields strings"
        ],
        "answer": 0,
        "explanation": "Generators are completely iterable, meaning they work perfectly in a 'for item in generator:' loop."
      }
    ]
  },
  {
    "id": "py_m15",
    "title": "Module 15: Decorators",
    "description": "Wrapping and modifying functions on the fly.",
    "tier": "Advanced",
    "xpReward": 280,
    "content": "<h3>Decorators 🎀</h3>\n<p>A <strong>Decorator</strong> allows you to modify or \"wrap\" the behavior of an existing function without actually changing its source code. They are heavily used in modern frameworks like Flask and Django.</p>\n<hr>\n<h4>1. Understanding the Wrapper</h4>\n<p>In Python, functions are just objects. You can pass a function into another function! A decorator is a function that takes a function as input, wraps some extra code around it, and returns the modified package.</p>\n<pre><code class=\"language-python\">def my_decorator(func):\n    def wrapper():\n        print(\"Something is happening BEFORE the function is called.\")\n        func() # Execute the original function\n        print(\"Something is happening AFTER the function is called.\")\n    return wrapper\n</code></pre>\n<hr>\n<h4>2. The @ Syntax</h4>\n<p>To apply a decorator to a function, you simply put the <code>@</code> symbol above it!</p>\n<pre><code class=\"language-python\">@my_decorator\ndef say_hello():\n    print(\"Hello, world!\")\n\n# Now, when we call say_hello(), it will include the wrapper code too!\nsay_hello()\n</code></pre>\n<p><strong>Output:</strong><br>\nSomething is happening BEFORE the function is called.<br>\nHello, world!<br>\nSomething is happening AFTER the function is called.</p>",
    "quiz": [
      {
        "question": "What does a Decorator do?",
        "options": [
          "Changes the font color of the code",
          "Modifies or wraps the behavior of a function without altering its source code",
          "Creates visual UI elements",
          "Deletes a function"
        ],
        "answer": 1,
        "explanation": "Decorators allow you to dynamically add functionality to an existing function."
      },
      {
        "question": "What symbol is used to apply a decorator to a function?",
        "options": [
          "#",
          "$",
          "@",
          "%"
        ],
        "answer": 2,
        "explanation": "The '@' symbol (e.g., @my_decorator) is syntactic sugar to easily apply decorators."
      },
      {
        "question": "Why are functions in Python able to be passed as arguments into other functions?",
        "options": [
          "Because Python is broken",
          "Because functions in Python are first-class objects",
          "Because they are actually strings",
          "Because they use the yield keyword"
        ],
        "answer": 1,
        "explanation": "In Python, functions are treated just like any other object (variables, ints, lists), allowing them to be passed around."
      },
      {
        "question": "In the example, when is 'func()' executed?",
        "options": [
          "Immediately when the program starts",
          "Inside the wrapper function, between the BEFORE and AFTER print statements",
          "It is never executed",
          "Only when the user clicks a button"
        ],
        "answer": 1,
        "explanation": "The wrapper executes some extra code, then calls the original func(), and then executes more extra code."
      },
      {
        "question": "Are decorators used frequently in real-world Python frameworks?",
        "options": [
          "No, they are just a theoretical concept",
          "Yes, frameworks like Flask and Django use them extensively (e.g., for routing URLs)",
          "Only in video game development",
          "Only in Python 1.0"
        ],
        "answer": 1,
        "explanation": "Decorators are a cornerstone of modern Python backend frameworks."
      }
    ]
  },
  {
    "id": "py_m16",
    "title": "Module 16: Working with Libraries",
    "description": "Connecting to the internet with Requests and JSON.",
    "tier": "Advanced",
    "xpReward": 300,
    "content": "<h3>Working with Libraries 🌐</h3>\n<p>A true Python master rarely writes everything from scratch. There are over 400,000 community-built libraries available on the internet (via <code>pip</code>). Let's look at one of the most famous: <strong>requests</strong>.</p>\n<hr>\n<h4>1. Fetching Internet Data</h4>\n<p>The <code>requests</code> library allows your Python code to open websites and download data, just like a browser. Many websites provide data in <strong>JSON</strong> format (JavaScript Object Notation), which looks exactly like a Python Dictionary!</p>\n<pre><code class=\"language-python\">import requests\nimport json\n\n# Let's ask an API for a random fact about cats!\nresponse = requests.get(\"https://catfact.ninja/fact\")\n\n# The internet sends the data back as a raw String.\nraw_text = response.text\nprint(\"Raw Text: \", raw_text)\n\n# We convert the JSON string into a usable Python Dictionary!\ndata = json.loads(raw_text)\nprint(\"The fact is: \", data[\"fact\"])\n</code></pre>\n<hr>\n<h4>2. Installing Third-Party Libraries</h4>\n<p>Because <code>requests</code> is a third-party library, it doesn't come with Python. You must download it using your terminal before running the code:</p>\n<pre><code class=\"language-bash\">pip install requests</code></pre>\n<p>With libraries, your Python script can send emails, scrape websites, run AI models, or even control robots!</p>",
    "quiz": [
      {
        "question": "What is 'pip' in Python?",
        "options": [
          "A type of loop",
          "The package installer used to download community libraries from the internet",
          "A built-in math function",
          "An error code"
        ],
        "answer": 1,
        "explanation": "Pip allows you to easily install third-party packages (like 'requests' or 'numpy')."
      },
      {
        "question": "What does the 'requests' library do?",
        "options": [
          "It asks the user for input",
          "It sends HTTP requests to websites and APIs to fetch data",
          "It forces the computer to shut down",
          "It requests more RAM from the OS"
        ],
        "answer": 1,
        "explanation": "The requests library acts like an invisible web browser, grabbing data from the internet."
      },
      {
        "question": "What is JSON?",
        "options": [
          "A person's name",
          "A standard text format for sending data across the internet, which looks just like a Python Dictionary",
          "A secret encryption key",
          "A type of Python class"
        ],
        "answer": 1,
        "explanation": "JSON (JavaScript Object Notation) is the universal format for API data."
      },
      {
        "question": "What does json.loads() do?",
        "options": [
          "Loads a web page",
          "Converts a raw JSON string into a usable Python Dictionary",
          "Deletes data",
          "Downloads a file"
        ],
        "answer": 1,
        "explanation": "The loads() function takes raw internet text and parses it into a native Python dictionary."
      },
      {
        "question": "Do you have to write all your Python code from scratch?",
        "options": [
          "Yes, it is illegal to use other people's code",
          "No, utilizing community-built libraries is a cornerstone of professional Python development",
          "Only if you don't know how to code",
          "Yes, because libraries are extremely slow"
        ],
        "answer": 1,
        "explanation": "Python's massive community ecosystem (PyPI) is its greatest strength, saving thousands of hours of work."
      }
    ]
  }
];

// Combine all modules
CourseData.python.modules = CourseData.python.modules.concat(intermediateModules, advancedModules);

// Write back to data.js preserving the CareerPaths prefix!
const finalScript = careerPathsPrefix + 'const CourseData = ' + JSON.stringify(CourseData, null, 2) + ';';
fs.writeFileSync('data.js', finalScript);
fs.writeFileSync('deploy/data.js', finalScript);

console.log('Successfully expanded Python course with 16 tiered modules, preserving CareerPaths!');
