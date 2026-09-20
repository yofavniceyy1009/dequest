const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
const script = content + '\nmodule.exports = CourseData;';
fs.writeFileSync('temp_data.js', script);
const CourseData = require('./temp_data.js');

CourseData.python.modules[0].content = `<h3>Welcome to Python! 🐍</h3>
<p>Welcome to your first step in becoming a Python Pro! Python is an incredibly powerful, versatile language used by tech giants like Google, Netflix, and NASA. By the end of this module, you'll understand how to make the computer talk and how to format text like a professional.</p>
<hr>
<h4>1. The Power of Print</h4>
<p>The <code>print()</code> function is your megaphone. It tells the computer to output whatever you put inside the parentheses directly to the screen.</p>
<pre><code class="language-python">print("Hello, World!")\nprint("I am becoming a coding master.")</code></pre>
<hr>
<h4>2. Single vs Double Quotes</h4>
<p>In Python, you can use either single quotes (<code>'</code>) or double quotes (<code>"</code>) to create a String (a piece of text). They do exactly the same thing!</p>
<pre><code class="language-python">print('Hello') # This works perfectly\nprint("Hello") # This also works perfectly</code></pre>
<p><strong>Pro Tip:</strong> The difference matters when you want to use a quote <em>inside</em> your string! If you want to print the word <code>Don't</code>, you should use double quotes on the outside so Python doesn't get confused by the apostrophe:</p>
<pre><code class="language-python"># Good!\nprint("Don't give up!") \n\n# ERROR! Python thinks the string ends at 'Don'\nprint('Don't give up!') </code></pre>
<hr>
<h4>3. Adding Comments</h4>
<p>Comments are notes left in the code for human eyes only. The computer completely ignores them. You create a comment by using the hashtag (<code>#</code>) symbol.</p>
<pre><code class="language-python"># This is a comment explaining what the next line does.\nprint("Executing launch sequence...") # You can put comments at the end of a line too!</code></pre>
<hr>
<h4>4. Escaping Characters & Newlines</h4>
<p>What if you want to print a string on multiple lines? You can use a special hidden character called a newline: <code>\\n</code>.</p>
<pre><code class="language-python">print("Line 1\\nLine 2\\nLine 3")</code></pre>
<p>You can also use triple quotes (<code>'''</code> or <code>"""</code>) to write massive blocks of text across multiple lines without using <code>\\n</code>!</p>
<hr>
<h4>🎮 Mini-Game Example: Mad Libs!</h4>
<p>Let's use what we've learned to print out a fun Mad Libs story! Notice how we use the <code>+</code> sign to stitch (concatenate) strings together!</p>
<pre><code class="language-python"># A simple Mad Libs generator\nprint("Welcome to Python Mad Libs!\\n")\n\n# We will learn how to make these dynamic in the next module!\nprint("The " + "giant " + "dragon " + "breathed " + "fire " + "on the " + "village!")\nprint("Everyone yelled, \\"Oh no!\\" and ran away.")</code></pre>
<p><em>Try copying this code into the Playground and changing the words to make your own story!</em></p>`;

CourseData.python.modules[1].content = `<h3>Variables & Data Types 📦</h3>
<p>If <code>print()</code> is the mouth of your program, Variables are its memory. Imagine you are moving to a new house. You put your books in a box and write <strong>"Books"</strong> on the outside with a marker. In programming, <strong>variables</strong> are exactly like those labeled boxes. They store information so you can use it, change it, and remember it later.</p>
<hr>
<h4>1. Creating a Variable</h4>
<p>To create a variable, you just type a name, use the equals sign (<code>=</code>), and give it a value.</p>
<pre><code class="language-python">player_name = "Miles Morales"\nplayer_health = 100\n\nprint(player_name) # This will print: Miles Morales</code></pre>
<h4>Variable Naming Rules</h4>
<ul>
<li>Names cannot start with a number (e.g., <code>1player</code> is illegal).</li>
<li>Names cannot contain spaces. Use underscores instead (e.g., <code>player_score</code>).</li>
<li>Names are case-sensitive! <code>score</code> and <code>Score</code> are two completely different boxes!</li>
</ul>
<hr>
<h4>2. Types of Data</h4>
<p>Just like you wouldn't put soup in a cardboard box, different types of information are stored in different <strong>Data Types</strong>:</p>
<ul>
<li><strong>Strings (str):</strong> Text. Always wrapped in quotes. <br><code>name = "Gwen"</code></li>
<li><strong>Integers (int):</strong> Whole numbers without decimals. Good for counting. <br><code>level = 5</code></li>
<li><strong>Floats (float):</strong> Numbers with decimals. Good for money or precise measurements. <br><code>price = 19.99</code></li>
<li><strong>Booleans (bool):</strong> True or False (must be capitalized!). Good for on/off switches. <br><code>is_game_over = False</code></li>
</ul>
<hr>
<h4>3. Changing Variables & Math</h4>
<p>Variables are called "variable" because they can change! You can update the contents of a box anytime, and even use math (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>).</p>
<pre><code class="language-python">score = 10\nscore = score + 5 # We take the current score (10), add 5, and put 15 back in the box!\nprint("Your score is:")\nprint(score) # Prints 15</code></pre>
<hr>
<h4>4. Getting User Input</h4>
<p>Variables get really fun when the <em>player</em> decides what goes in the box. You can do this using the <code>input()</code> function!</p>
<pre><code class="language-python"># This stops the program and waits for the user to type something!\nfavorite_color = input("What is your favorite color? ")\nprint("Wow, " + favorite_color + " is a great color!")</code></pre>
<hr>
<h4>🎮 Mini-Game Example: RPG Character Creator</h4>
<p>Let's build a real working character creator for a video game!</p>
<pre><code class="language-python">print("=== CHARACTER CREATION ===")\n# Ask the user for their details\nhero_name = input("Enter your hero's name: ")\nhero_class = input("Choose a class (Warrior, Mage, Rogue): ")\n\n# Set starting stats\nlevel = 1\ngold = 50.5\nis_alive = True\n\n# Print the final character sheet\nprint("\\n=== CHARACTER SHEET ===")\nprint("Name: " + hero_name)\nprint("Class: " + hero_class)\nprint("Level: " + str(level)) # Notice we use str() to turn the number into text so we can print it with other text!\nprint("Gold: " + str(gold))\nprint("Ready for adventure? " + str(is_alive))</code></pre>`;

CourseData.python.modules[2].content = `<h3>Decision Making (If/Else) 🤔</h3>
<p>A game where nothing changes isn't a game at all. Programs need to be smart enough to make decisions based on different situations. If the player's health drops to 0, it should say "Game Over". If it's above 0, they should keep playing. We do this using <strong>if statements</strong>.</p>
<hr>
<h4>1. The <code>if</code> Statement</h4>
<p>An <code>if</code> statement checks if a condition is <strong>True</strong>. If it is, it runs the code indented underneath it.</p>
<pre><code class="language-python">health = 0\nif health == 0:\n    print("Game Over!")</code></pre>
<p><em>Note: Notice the double equals (<code>==</code>)? A single equals sign assigns a value to a box. A double equals sign ASKS a question: "Are these two things equal?"</em></p>
<hr>
<h4>2. The <code>else</code> Statement</h4>
<p>What if the condition is False? We use <code>else</code> to provide a backup plan.</p>
<pre><code class="language-python">age = 15\nif age >= 18:\n    print("You can buy a ticket to an R-rated movie.")\nelse:\n    print("Sorry, you are too young.")</code></pre>
<hr>
<h4>3. The <code>elif</code> Statement</h4>
<p>If you have more than two possibilities, use <code>elif</code> (which stands for "else if"). Python will check these in order from top to bottom.</p>
<pre><code class="language-python">score = 85\nif score >= 90:\n    print("You got an A!")\nelif score >= 80:\n    print("You got a B!")\nelse:\n    print("You need to study more.")</code></pre>
<hr>
<h4>Comparison Operators</h4>
<p>To make decisions, you need to compare things. Here are your tools:</p>
<ul>
<li><code>==</code> : Equal to (e.g., <code>5 == 5</code> is True)</li>
<li><code>!=</code> : Not equal to (e.g., <code>5 != 3</code> is True)</li>
<li><code>&gt;</code>  : Greater than</li>
<li><code>&lt;</code>  : Less than</li>
<li><code>&gt;=</code> : Greater than or equal to</li>
<li><code>&lt;=</code> : Less than or equal to</li>
</ul>
<hr>
<h4>🎮 Mini-Game Example: The Magic 8-Ball</h4>
<p>Let's use our new decision-making skills to build a working Magic 8-Ball!</p>
<pre><code class="language-python">import random # This imports Python's built-in random number generator\n\nquestion = input("Ask the Magic 8-Ball a yes/no question: ")\n\n# Generate a random number between 1 and 3\nmagic_number = random.randint(1, 3)\n\nprint("\\nThe Magic 8-Ball says...")\n\n# Make a decision based on the random number!\nif magic_number == 1:\n    print("It is certain!")\nelif magic_number == 2:\n    print("Ask again later. The future is cloudy.")\nelse:\n    print("Don't count on it.")</code></pre>`;

CourseData.python.modules[3].content = `<h3>Loops 🔁</h3>
<p>Programmers are efficiently lazy. If you want to print the numbers 1 to 1000, you shouldn't write 1000 print statements. Instead, you use a <strong>loop</strong> to tell the computer to do the heavy lifting for you.</p>
<hr>
<h4>1. The <code>for</code> Loop</h4>
<p>Use a <code>for</code> loop when you know <strong>exactly how many times</strong> you want to repeat something.</p>
<pre><code class="language-python"># range(5) generates numbers 0, 1, 2, 3, 4\nfor number in range(5):\n    print("Executing loop...")\n    print(number)</code></pre>
<p>This loop will run exactly 5 times. The variable <code>number</code> keeps track of which loop we are currently on.</p>
<hr>
<h4>2. The <code>while</code> Loop</h4>
<p>Use a <code>while</code> loop when you want to keep repeating something <strong>as long as a condition is true</strong> (e.g., as long as the player is alive).</p>
<pre><code class="language-python">lives = 3\nwhile lives > 0:\n    print("You are still alive! Lives left: " + str(lives))\n    lives = lives - 1 # We must subtract a life, otherwise the loop runs forever!\n    \nprint("Game Over!")</code></pre>
<p><strong>Warning!</strong> If you forget to subtract a life, <code>lives > 0</code> will ALWAYS be true. This creates an <strong>Infinite Loop</strong>, which will freeze your computer until it crashes! Always make sure the loop has a way to end.</p>
<hr>
<h4>3. Breaking out of a Loop</h4>
<p>Sometimes you want to emergency-exit a loop before it naturally finishes. You can use the <code>break</code> keyword to smash out of the loop immediately.</p>
<pre><code class="language-python">while True: # This is intentionally an infinite loop!\n    answer = input("Type 'exit' to escape: ")\n    if answer == 'exit':\n        print("You escaped!")\n        break # This destroys the loop!</code></pre>
<hr>
<h4>🎮 Mini-Game Example: The Number Guesser</h4>
<p>Let's combine loops and if-statements to build a classic Number Guessing game!</p>
<pre><code class="language-python">import random\n\nsecret_number = random.randint(1, 20)\nprint("I am thinking of a number between 1 and 20.")\n\n# Give the player 5 tries\nfor attempt in range(5):\n    guess = int(input("Enter your guess: "))\n    \n    if guess == secret_number:\n        print("🎉 YOU WIN! You guessed it!")\n        break # Exit the loop early because they won!\n    elif guess < secret_number:\n        print("Too low!")\n    else:\n        print("Too high!")\n        \n# This else belongs to the FOR loop. It only runs if the loop finishes WITHOUT breaking.\nelse:\n    print("💀 GAME OVER! The number was " + str(secret_number))</code></pre>`;

CourseData.python.modules[4].content = `<h3>Lists 📋</h3>
<p>What if you want to store 100 usernames? Creating 100 different variables (<code>user1</code>, <code>user2</code>, etc.) would be a nightmare. Instead, we use a <strong>List</strong> to store a massive collection of items inside a single variable.</p>
<hr>
<h4>1. Creating a List</h4>
<p>Lists are created using square brackets <code>[]</code>, with items separated by commas.</p>
<pre><code class="language-python">inventory = ["Sword", "Shield", "Health Potion"]\nscores = [95, 80, 100, 42]</code></pre>
<hr>
<h4>2. Accessing Items (Indexing)</h4>
<p>You can pull out a specific item from a list by referring to its position, called its <strong>Index</strong>.</p>
<p><strong>Crucial Rule:</strong> Computers start counting at ZERO, not one! The first item is always at index 0.</p>
<pre><code class="language-python">print(inventory[0]) # Prints "Sword"\nprint(inventory[1]) # Prints "Shield"\n\n# Pro-tip: You can use negative numbers to count backwards from the end!\nprint(inventory[-1]) # Prints "Health Potion" (the last item)</code></pre>
<hr>
<h4>3. Modifying a List</h4>
<p>Lists are "mutable", meaning they can be changed after they are created.</p>
<pre><code class="language-python"># Add a new item to the very end of the list\ninventory.append("Magic Wand")\nprint(inventory) # ["Sword", "Shield", "Health Potion", "Magic Wand"]\n\n# Remove a specific item\ninventory.remove("Shield")\n\n# Change an existing item\ninventory[0] = "Super Sword"</code></pre>
<hr>
<h4>4. Looping through a List</h4>
<p><code>for</code> loops are absolutely perfect for lists. You can easily execute a block of code for every single item in the list automatically.</p>
<pre><code class="language-python">for item in inventory:\n    print("You are carrying a " + item)</code></pre>
<hr>
<h4>🎮 Mini-Game Example: Zombie Survival Inventory</h4>
<p>Let's build a game system where a player can manage their backpack during a zombie apocalypse!</p>
<pre><code class="language-python">backpack = ["Water Bottle", "Bandage", "Flashlight"]\nprint("🧟 ZOMBIE SURVIVAL INVENTORY 🧟")\n\nwhile True:\n    print("\\nYour current backpack:")\n    # Enumerate helps us print the index number AND the item!\n    for i, item in enumerate(backpack):\n        print(str(i) + ". " + item)\n        \n    action = input("\\nWhat do you want to do? (add / drop / quit): ")\n    \n    if action == "quit":\n        print("Good luck out there!")\n        break\n    elif action == "add":\n        new_item = input("What did you find? ")\n        backpack.append(new_item)\n        print(new_item + " added to backpack!")\n    elif action == "drop":\n        drop_index = int(input("Enter the NUMBER of the item to drop: "))\n        dropped_item = backpack.pop(drop_index) # Pop removes an item by its index\n        print("You dropped the " + dropped_item)</code></pre>`;

CourseData.python.modules[5].content = `<h3>Functions 🔧</h3>
<p>As your programs get bigger, you'll find yourself writing the exact same chunk of code in multiple places. A <strong>Function</strong> allows you to package that code into a reusable block, give it a name, and run it whenever you want. Functions are the building blocks of professional software!</p>
<hr>
<h4>1. Defining a Function</h4>
<p>To create a function, you use the <code>def</code> keyword (short for define), give it a name, and add parentheses <code>()</code>.</p>
<pre><code class="language-python">def say_hello():\n    print("Hello! Welcome to the game.")\n    print("Get ready to play!")</code></pre>
<p>Nothing happens when you define a function. The computer just memorizes it. To actually run the code, you have to <strong>call</strong> it.</p>
<pre><code class="language-python">say_hello() # This triggers the function to run</code></pre>
<hr>
<h4>2. Parameters (Giving data to a function)</h4>
<p>Functions become truly powerful when you can pass data into them. We do this using <strong>parameters</strong> inside the parentheses. Think of parameters as blank variables that get filled in when the function is called.</p>
<pre><code class="language-python">def greet_player(name):\n    print("Welcome back, " + name + "!")\n\n# We pass in the "argument" which fills the "name" parameter\ngreet_player("Miles") # Prints: Welcome back, Miles!\ngreet_player("Gwen")  # Prints: Welcome back, Gwen!</code></pre>
<hr>
<h4>3. Return Values (Getting data back)</h4>
<p>Sometimes you want a function to calculate a result and hand it back to you, rather than just printing it out. We use the <code>return</code> keyword for this. The moment a function hits a <code>return</code> statement, it immediately exits and gives the value back.</p>
<pre><code class="language-python">def calculate_damage(base_attack, weapon_bonus):\n    total = base_attack + weapon_bonus\n    return total # Sends the result back to whoever called it\n\n# The function resolves into the number 15, which is stored in final_damage\nfinal_damage = calculate_damage(10, 5)\nprint("You dealt " + str(final_damage) + " damage!")</code></pre>
<hr>
<h4>🎮 Mini-Game Example: Combat Damage Calculator</h4>
<p>Let's use functions to build a scalable combat system that handles critical hits!</p>
<pre><code class="language-python">import random\n\ndef attack(attacker_name, base_damage):\n    """Calculates damage, including a 20% chance for a critical hit!"""\n    print(attacker_name + " swings their weapon!")\n    \n    # Roll a 20-sided die\n    roll = random.randint(1, 20)\n    \n    if roll >= 18: # Critical hit!\n        print("🎯 CRITICAL HIT!")\n        return base_damage * 2\n    elif roll == 1: # Critical miss!\n        print("💨 WHOOSH! A total miss!")\n        return 0\n    else:\n        return base_damage # Normal hit\n\n# Let's test our combat system!\ndamage_dealt = attack("Hero", 15)\nprint("Total damage: " + str(damage_dealt))</code></pre>`;

CourseData.python.modules[6].content = `<h3>Dictionaries 📖</h3>
<p>Lists are great for storing data in a specific order, but what if you want to look up data using a name instead of a number? Think of a real dictionary: you look up a <strong>Word (Key)</strong> to find its <strong>Definition (Value)</strong>. Python Dictionaries work exactly the same way.</p>
<hr>
<h4>1. Creating a Dictionary</h4>
<p>Dictionaries use curly braces <code>{}</code> and store data in <strong>Key-Value pairs</strong> separated by a colon <code>:</code>.</p>
<pre><code class="language-python">player_stats = {\n    "name": "Peter Parker",\n    "health": 100,\n    "web_fluid": 50,\n    "is_poisoned": False\n}</code></pre>
<hr>
<h4>2. Accessing Data</h4>
<p>Instead of using a numerical index like <code>[0]</code>, you use the Key (the word) to look up the Value.</p>
<pre><code class="language-python">print(player_stats["name"]) # Prints: Peter Parker\nprint(player_stats["health"]) # Prints: 100</code></pre>
<hr>
<h4>3. Modifying Data</h4>
<p>You can update existing values, or add brand new Key-Value pairs at any time.</p>
<pre><code class="language-python"># Update an existing value\nplayer_stats["health"] = 80 \n\n# Add a brand new value\nplayer_stats["suit_color"] = "Red and Blue"\n\nprint(player_stats)</code></pre>
<hr>
<h4>4. Looping through a Dictionary</h4>
<p>You can loop through all the keys and values in a dictionary using the <code>.items()</code> method.</p>
<pre><code class="language-python">for key, value in player_stats.items():\n    print(key + ": " + str(value))</code></pre>
<hr>
<h4>🎮 Mini-Game Example: Monster Pokedex</h4>
<p>Let's build a system that lets a player look up the stats of different monsters they encounter!</p>
<pre><code class="language-python"># A dictionary where the values are ALSO dictionaries (Nested Data!)\nmonsters = {\n    "Goblin": {"health": 30, "damage": 5, "type": "Humanoid"},\n    "Dragon": {"health": 500, "damage": 50, "type": "Reptile"},\n    "Slime": {"health": 10, "damage": 2, "type": "Ooze"}\n}\n\nprint("📖 WELCOME TO THE MONSTER DEX 📖")\nwhile True:\n    search = input("Enter a monster name to scan (or 'quit'): ")\n    \n    if search == "quit":\n        break\n        \n    # Check if the key exists in the dictionary\n    if search in monsters:\n        stats = monsters[search]\n        print("\\n=== " + search.upper() + " ===")\n        print("Type: " + stats["type"])\n        print("HP: " + str(stats["health"]))\n        print("ATK: " + str(stats["damage"]) + "\\n")\n    else:\n        print("❌ Monster not found in database!\\n")</code></pre>`;

CourseData.python.modules[7].content = `<h3>Object-Oriented Programming (OOP) 🏗️</h3>
<p>So far, we've used built-in data types like Strings, Integers, and Lists. But what if you are building a game and need a data type for an "Enemy"? You can use <strong>Classes</strong> to create your own custom blueprints. This is the foundation of professional software development!</p>
<hr>
<h4>1. Creating a Class (The Blueprint)</h4>
<p>A Class defines what an object <em>has</em> (variables, known as attributes) and what it <em>does</em> (functions, known as methods).</p>
<pre><code class="language-python">class Enemy:\n    # The __init__ method runs automatically when a new Enemy is created (Constructor)\n    def __init__(self, name, max_health):\n        self.name = name       # Attribute\n        self.health = max_health   # Attribute\n        self.is_alive = True\n        \n    # A method (a function inside a class)\n    def take_damage(self, amount):\n        if not self.is_alive:\n            print(self.name + " is already defeated!")\n            return\n            \n        self.health -= amount # Shorthand for self.health = self.health - amount\n        print(self.name + " took " + str(amount) + " damage!")\n        \n        if self.health <= 0:\n            self.health = 0\n            self.is_alive = False\n            print("💀 " + self.name + " has been defeated!")</code></pre>
<p><em>What is <code>self</code>?</em> It refers to the specific object being interacted with. If you have 5 enemies, <code>self.health</code> ensures you are only hurting the specific enemy that was attacked, not all of them!</p>
<hr>
<h4>2. Creating Objects (Using the Blueprint)</h4>
<p>Once you have a Class, you can build as many <strong>Objects</strong> (instances) from it as you want. Each object has its own independent memory!</p>
<pre><code class="language-python"># Create two distinct objects using the Enemy blueprint\ngoblin = Enemy("Goblin Scout", 30)\ndragon = Enemy("Ancient Dragon", 500)\n\n# Interact with the objects\ngoblin.take_damage(35) # Defeats the goblin!\ndragon.take_damage(50) # Dragon is still alive with 450 HP left</code></pre>
<hr>
<h4>🎮 Mini-Game Example: Virtual Pet (Tamagotchi)</h4>
<p>Let's use OOP to build a Virtual Pet that you have to take care of!</p>
<pre><code class="language-python">class VirtualPet:\n    def __init__(self, name):\n        self.name = name\n        self.hunger = 50\n        self.happiness = 50\n        \n    def feed(self):\n        self.hunger -= 15\n        print("🍎 You fed " + self.name + ". Hunger is now " + str(self.hunger))\n        \n    def play(self):\n        self.happiness += 20\n        self.hunger += 10 # Playing makes them hungry!\n        print("🎾 You played with " + self.name + ". Happiness is now " + str(self.happiness))\n        \n    def status(self):\n        print("\\n=== " + self.name.upper() + "'s STATS ===")\n        print("Hunger: " + str(self.hunger))\n        print("Happiness: " + str(self.happiness) + "\\n")\n\n# Create a pet and play the game!\nmy_pet = VirtualPet("Pikachu")\nmy_pet.status()\nmy_pet.feed()\nmy_pet.play()\nmy_pet.status()</code></pre>`;

CourseData.python.modules[8].content = `<h3>Error Handling (Try / Except) 🛡️</h3>
<p>Have you ever played a game that suddenly crashed to the desktop? That happens when the code encounters an error it doesn't know how to handle. You can protect your programs from crashing using a <code>try / except</code> block. Pro developers spend a LOT of time anticipating errors!</p>
<hr>
<h4>1. The Problem</h4>
<p>If you ask a user for a number, and they maliciously type "apple", Python will try to convert "apple" into math and immediately crash with a <code>ValueError</code>.</p>
<pre><code class="language-python"># If the user types text instead of a number, the program DIES immediately!\nage = int(input("Enter your age: ")) \nprint("Next year you will be " + str(age + 1))</code></pre>
<hr>
<h4>2. The Solution: Try / Except</h4>
<p>You can wrap risky code in a <code>try</code> block. If an error happens, instead of crashing, Python instantly jumps to the <code>except</code> block so you can handle it gracefully.</p>
<pre><code class="language-python">try:\n    age = int(input("Enter your age: ")) \n    print("Next year you will be " + str(age + 1))\nexcept ValueError:\n    print("Oops! That wasn't a valid number. Please try again.")\n    \nprint("The program continues running normally!")</code></pre>
<p>Now, if the user types "apple", the program catches the error, prints a friendly warning, and continues running instead of crashing!</p>
<hr>
<h4>3. Catching Specific Errors</h4>
<p>Different things cause different errors. You can have multiple <code>except</code> blocks to handle different scenarios!</p>
<pre><code class="language-python">try:\n    result = 10 / 0 # This is mathematically illegal!\nexcept ZeroDivisionError:\n    print("You cannot divide by zero! Are you trying to destroy the universe?")</code></pre>
<hr>
<h4>🎮 Mini-Game Example: Unbreakable Casino Dice Roller</h4>
<p>Let's build a dice roller where the user bets money. We will use a <code>while True</code> loop combined with <code>try/except</code> to ensure they MUST enter a valid number before the game proceeds.</p>
<pre><code class="language-python">import random\n\nprint("🎰 WELCOME TO THE PYTHON CASINO 🎰")\n\n# Keep asking until they get it right!\nwhile True:\n    try:\n        bet = int(input("How many coins do you want to bet? "))\n        if bet <= 0:\n            print("You must bet at least 1 coin!")\n            continue # Skips the rest of the loop and starts over\n        break # If we got this far, the input is valid, so break the loop!\n    except ValueError:\n        print("❌ Invalid input! Please enter a real number.")\n\n# Now the game runs safely!\nprint("You bet " + str(bet) + " coins.")\nroll = random.randint(1, 6)\nprint("The dice rolled a " + str(roll) + "!")\n\nif roll >= 4:\n    print("You win " + str(bet * 2) + " coins!")\nelse:\n    print("You lost your bet. Better luck next time!")</code></pre>`;

CourseData.python.modules[9].content = `<h3>File Handling 📁</h3>
<p>Variables, Lists, and Dictionaries are stored in your computer's RAM. That means the moment your program closes, <strong>all your data is erased forever!</strong> To save data permanently (like a high score, or player inventory), you must write it to a file on your hard drive.</p>
<hr>
<h4>1. Writing to a File</h4>
<p>We use the <code>open()</code> function and pass it two things: the name of the file, and the <strong>mode</strong>. We use <code>"w"</code> for Write mode. If the file doesn't exist, Python creates it.</p>
<pre><code class="language-python"># "w" means Write. Warning: Write mode overwrites existing files entirely!\nwith open("savegame.txt", "w") as file:\n    file.write("High Score: 9999")\n    print("File saved successfully!")</code></pre>
<p><em>Why use <code>with open()</code>?</em> When you open a file, it gets locked by your program. The <code>with</code> keyword ensures that the file is automatically closed and unlocked the moment the code block ends, even if an error happens.</p>
<p>If you want to ADD to a file instead of overwriting it, use Append mode (<code>"a"</code>).</p>
<hr>
<h4>2. Reading from a File</h4>
<p>To read data back in, we use <code>"r"</code> for Read mode.</p>
<pre><code class="language-python">try:\n    with open("savegame.txt", "r") as file:\n        data = file.read() # Reads the entire file into a string\n        print("Loaded Data: " + data)\nexcept FileNotFoundError:\n    print("No save file found! Starting a new game...")</code></pre>
<p>Notice how we used a <code>try/except</code> block? If the file doesn't exist, attempting to read it will cause a crash. Catching the <code>FileNotFoundError</code> makes our code bulletproof!</p>
<hr>
<h4>🎮 Mini-Game Example: Persistent High Score Tracker</h4>
<p>Let's build a simple clicking game that remembers your highest score forever, even after you close the program!</p>
<pre><code class="language-python">import os\n\nhigh_score = 0\n\n# 1. Try to load the existing high score\ntry:\n    with open("highscore.txt", "r") as file:\n        high_score = int(file.read())\n        print("Loaded previous High Score: " + str(high_score))\nexcept FileNotFoundError:\n    print("No high score found. Setting to 0.")\n\n# 2. Play the game\nprint("\\nPress ENTER to click! Type 'quit' to stop.")\ncurrent_score = 0\nwhile True:\n    action = input("Click: ")\n    if action == 'quit':\n        break\n    current_score += 10\n    print("Score: " + str(current_score))\n\n# 3. Check for a new high score and save it!\nprint("\\nGame Over! Final Score: " + str(current_score))\nif current_score > high_score:\n    print("🎉 NEW HIGH SCORE! 🎉")\n    with open("highscore.txt", "w") as file:\n        file.write(str(current_score))\n        print("High score saved to disk!")\nelse:\n    print("You didn't beat the high score of " + str(high_score))</code></pre>`;

CourseData.python.modules[10].content = `<h3>Boss Battle 🐉: Full Text-Based RPG</h3>
<p>You have made it to the end of the Python Masterclass. You've learned about Variables, Conditionals, Loops, Lists, Functions, Dictionaries, OOP, and Error Handling. It's time to prove your worth by combining <strong>everything</strong> you've learned into a real, working project!</p>
<p>Your task is to build a <strong>Text-Based RPG</strong> where a player explores a dungeon and fights monsters.</p>
<hr>
<h4>The Requirements</h4>
<p>Write your code in the DevQuest Playground or in your own local IDE. Your game must include all of the following features:</p>
<ol>
<li><strong>Classes (OOP):</strong> Create a <code>Player</code> class and a <code>Monster</code> class. Both should have attributes for <code>name</code>, <code>health</code>, and <code>attack_power</code>. They should also have a <code>take_damage(amount)</code> method.</li>
<li><strong>Variables & Lists:</strong> Create a list called <code>inventory</code> that holds "Health Potion".</li>
<li><strong>The Game Loop:</strong> Use a <code>while True</code> loop that acts as the main menu (Explore, Rest, Quit).</li>
<li><strong>Combat Loop:</strong> When the player chooses "Explore", they encounter a monster. Enter a nested <code>while</code> loop for combat where the player and monster take turns attacking until one of them has 0 health.</li>
<li><strong>Decision Logic & Input:</strong> Ask the player to choose "1. Attack" or "2. Use Potion". Use <code>if/elif/else</code> to process their choice. If they use a potion, increase their health and remove it from the list.</li>
<li><strong>Error Handling:</strong> Use <code>try/except ValueError</code> around your <code>input()</code> calls to prevent the game from crashing if the player types a letter instead of a number.</li>
</ol>
<hr>
<h4>Pro-Tier Challenge (Optional)</h4>
<p>Want to go above and beyond? Try adding these features to make a truly professional game:</p>
<ul>
<li><strong>File Handling:</strong> Add a "Save Game" feature that writes the player's current health and inventory to a <code>save.txt</code> file, and a "Load Game" feature when the script starts!</li>
<li><strong>Dictionaries:</strong> Use a dictionary to store different types of monsters and randomly select one when the player explores!</li>
</ul>
<br>
<p><em>Once you have built a working game that doesn't crash, answer the final quiz below to claim your massive XP reward, secure your Python Masterclass certificate, and become a true coding legend!</em></p>`;

const output = 'const CourseData = ' + JSON.stringify(CourseData, null, 2) + ';';
fs.writeFileSync('data.js', output);
fs.unlinkSync('temp_data.js');
console.log('Successfully updated data.js with massive mini-games');
