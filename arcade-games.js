/**
 * arcade-games.js
 * Contains the logic for the Ultimate Course Games.
 * Requires CourseData to be loaded first (from data.js).
 */

function initUltimateArcade(container) {
  // Build Course Options
  let courseOptions = '';
  for (let key in CourseData) {
    courseOptions += `<option value="${key}">${CourseData[key].title}</option>`;
  }

  // Render Selection Menu
  container.innerHTML = `
    <h2><i class="fa-solid fa-gamepad" style="color: var(--accent);"></i> Ultimate Course Arcade</h2>
    <p>Select a course and a game mode to begin your adventure!</p>
    
    <div style="background: var(--bg-card); padding: 20px; border-radius: 10px; border: 1px solid var(--border-color); margin-top: 20px; max-width: 600px;">
      
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--text-secondary);">1. Select your Course (The Topic)</label>
        <select id="ua-course-select" class="form-input" style="padding: 12px; width: 100%; border-radius: 8px; font-size: 1.1rem; background: #1e293b; color: #ffffff; border: 1px solid var(--border-color);">
          ${courseOptions}
        </select>
      </div>

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 10px; font-weight: bold; color: var(--text-secondary);">2. Select your Game Mode</label>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
          <!-- Mode: RPG Boss Battler -->
          <div class="ua-mode-card" data-mode="rpg" style="background: var(--bg-dashboard); border: 2px solid var(--border-color); padding: 15px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
            <h4 style="margin: 0 0 5px 0;"><i class="fa-solid fa-dragon" style="color: #ef4444;"></i> RPG Boss Battler</h4>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Turn-based combat. Answer questions to attack the course boss!</p>
          </div>

          <!-- Mode: Typing Defense -->
          <div class="ua-mode-card" data-mode="typing" style="background: var(--bg-dashboard); border: 2px solid var(--border-color); padding: 15px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
            <h4 style="margin: 0 0 5px 0;"><i class="fa-solid fa-meteor" style="color: #3b82f6;"></i> Typing Defense</h4>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Defend your base! Type falling concepts from the course quickly.</p>
          </div>

          <!-- Mode: Concept Catcher -->
          <div class="ua-mode-card" data-mode="catcher" style="background: var(--bg-dashboard); border: 2px solid var(--border-color); padding: 15px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
            <h4 style="margin: 0 0 5px 0;"><i class="fa-solid fa-basket-shopping" style="color: #10b981;"></i> Concept Catcher</h4>
            <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">Fast-paced arcade action. Catch good concepts, dodge bugs!</p>
          </div>
        </div>
      </div>

      <button id="btn-start-ua" class="btn btn-primary" style="width: 100%; font-size: 1.1rem; padding: 12px;" disabled>Select a Game Mode to Start</button>
    </div>

    <!-- The actual game rendering area -->
    <div id="ua-game-area" style="display: none; width: 100%; margin-top: 20px;"></div>
  `;

  // UI Selection Logic
  let selectedMode = null;
  const modeCards = container.querySelectorAll('.ua-mode-card');
  const startBtn = document.getElementById('btn-start-ua');

  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      modeCards.forEach(c => c.style.borderColor = 'var(--border-color)');
      card.style.borderColor = 'var(--accent)';
      selectedMode = card.getAttribute('data-mode');
      
      startBtn.disabled = false;
      startBtn.classList.remove('btn-primary');
      startBtn.classList.add('btn-accent');
      startBtn.textContent = 'Start Game!';
    });
  });

  startBtn.addEventListener('click', () => {
    const courseKey = document.getElementById('ua-course-select').value;
    const courseData = CourseData[courseKey];
    
    // Hide selection menu, show game area
    startBtn.parentElement.style.display = 'none';
    const gameArea = document.getElementById('ua-game-area');
    gameArea.style.display = 'block';

    if (selectedMode === 'rpg') {
      launchRpgBattler(gameArea, courseData);
    } else if (selectedMode === 'typing') {
      launchTypingDefense(gameArea, courseData);
    } else if (selectedMode === 'catcher') {
      launchConceptCatcher(gameArea, courseData);
    }
  });
}

// Helper to extract quiz questions from a course
function extractCourseQuestions(courseData) {
  let questions = [];
  if (!courseData || !courseData.modules) return questions;
  courseData.modules.forEach(m => {
    if (m.quiz && m.quiz.length > 0) {
      questions.push(...m.quiz);
    }
  });
  return questions.sort(() => Math.random() - 0.5);
}

// Helper to extract keywords from a course (for typing/catcher games)
function extractCourseKeywords(courseData) {
  let text = courseData.title + " " + courseData.description + " ";
  if (courseData.modules) {
    courseData.modules.forEach(m => {
      text += m.title + " " + m.description + " ";
    });
  }
  
  // Clean up and find words
  const words = text.replace(/[^a-zA-Z\s]/g, '').split(/\s+/);
  const uniqueWords = [...new Set(words)];
  
  // Filter for good game words (length 4-10)
  return uniqueWords.filter(w => w.length >= 4 && w.length <= 10).map(w => w.toLowerCase());
}

function finishUltimateGame(container, won, xpAmount, title, message) {
  let trophyColor = won ? '#fbbf24' : '#6b7280';
  let titleStr = won ? `<h2><i class="fa-solid fa-trophy" style="color: ${trophyColor};"></i> You Won!</h2>` : `<h2><i class="fa-solid fa-skull" style="color: #ef4444;"></i> Game Over</h2>`;
  
  container.innerHTML = `
    <div style="text-align: center; padding: 40px; background: var(--bg-card); border-radius: 10px; border: 1px solid var(--border-color); max-width: 500px; margin: 0 auto;">
      ${titleStr}
      <h3 style="color: var(--accent); margin: 10px 0;">${title}</h3>
      <p style="color: var(--text-secondary); margin-bottom: 20px;">${message}</p>
      
      <button class="btn btn-accent" onclick="document.getElementById('btn-exit-game').click()">Return to Arcade Lobby</button>
    </div>
  `;

  if (won && typeof awardGameXP === 'function') {
    awardGameXP(); // Relies on app.js awardGameXP function
  }
}

// ==========================================
// GAME 1: CYBER RPG (HACKER VS GLITCH)
// ==========================================
function launchRpgBattler(container, courseData) {
  const questions = extractCourseQuestions(courseData);
  if (questions.length < 3) {
    container.innerHTML = `<p>Not enough questions for this course to battle a boss! Play a different course.</p><button class="btn btn-secondary" onclick="document.getElementById('btn-exit-game').click()">Go Back</button>`;
    return;
  }

  const bossName = "The " + courseData.title.split(' ')[0] + " Glitch";
  
  container.innerHTML = `
    <div id="rpg-battle-screen" class="cyber-matrix-bg" style="position: relative; width: 100%; max-width: 800px; height: 500px; border: 2px solid rgba(16,185,129,0.3); border-radius: 10px; overflow: hidden; margin: 0 auto; display: flex; flex-direction: column; box-shadow: 0 0 20px rgba(16,185,129,0.1) inset;">
      
      <!-- Top: Battle Arena -->
      <div style="flex: 1; position: relative; padding: 20px; display: flex; justify-content: space-between; align-items: flex-start;">
        
        <!-- Player (Hacker) Rigged -->
        <div id="rpg-player" style="text-align: center; width: 150px; margin-top: 50px; position: relative; transition: transform 0.5s;">
          <h4 style="margin: 0 0 5px 0; color: #3b82f6; text-shadow: 0 0 10px #3b82f6;">Hacker <span id="rpg-ap-disp" style="color: #fbbf24;">(0 AP)</span></h4>
          <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; margin-bottom: 20px; border: 1px solid #3b82f6;">
            <div id="rpg-player-hp" style="width: 100%; height: 100%; background: #3b82f6; border-radius: 3px; transition: width 0.3s; box-shadow: 0 0 10px #3b82f6;"></div>
          </div>
          
          <div id="player-rig" class="css-char anim-idle">
            <div class="head"></div>
            <div class="torso"></div>
            <div class="arm-l"></div>
            <div class="arm-r"></div>
            <div class="leg-l"></div>
            <div class="leg-r"></div>
          </div>
        </div>

        <!-- Boss (Glitch) Rigged -->
        <div id="rpg-boss" style="text-align: center; width: 150px; margin-top: 50px; position: relative; transition: transform 0.5s;">
          <h4 style="margin: 0 0 5px 0; color: #ef4444; text-shadow: 0 0 10px #ef4444;">${bossName}</h4>
          <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; margin-bottom: 20px; border: 1px solid #ef4444;">
            <div id="rpg-boss-hp" style="width: 100%; height: 100%; background: #ef4444; border-radius: 3px; transition: width 0.3s; box-shadow: 0 0 10px #ef4444;"></div>
          </div>
          
          <div id="boss-rig" class="css-char enemy anim-idle">
            <div class="head"></div>
            <div class="torso"></div>
            <div class="arm-l"></div>
            <div class="arm-r"></div>
            <div class="leg-l"></div>
            <div class="leg-r"></div>
          </div>
        </div>
        
        <!-- Attack Animations Layer -->
        <div id="rpg-fx" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; display: flex; justify-content: center; align-items: center; font-size: 40px; font-weight: bold; text-shadow: 0 0 10px #000; z-index: 10;"></div>

      </div>

      <!-- Bottom: Command Menu / Question Box -->
      <div style="height: 200px; background: var(--bg-dashboard); border-top: 4px solid var(--border-color); padding: 15px;">
        <div id="rpg-action-area">
          <p id="rpg-q-text" style="margin: 0 0 15px 0; font-size: 1.1rem; font-weight: bold;"></p>
          <div id="rpg-q-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"></div>
        </div>
      </div>
    </div>
  `;

  let playerHp = 100;
  let bossHp = 100;
  let playerAp = 0;
  let currentQIdx = 0;

  const playerHpBar = document.getElementById('rpg-player-hp');
  const bossHpBar = document.getElementById('rpg-boss-hp');
  const apDisp = document.getElementById('rpg-ap-disp');
  const qText = document.getElementById('rpg-q-text');
  const qOptions = document.getElementById('rpg-q-options');
  const fxLayer = document.getElementById('rpg-fx');
  const playerCont = document.getElementById('rpg-player');
  const bossCont = document.getElementById('rpg-boss');
  const playerRig = document.getElementById('player-rig');
  const bossRig = document.getElementById('boss-rig');
  const arena = document.getElementById('rpg-battle-screen');

  function showFx(text, color, duration) {
    fxLayer.innerHTML = `<span style="color: ${color}; animation: zoomOut 1s forwards;">${text}</span>`;
    setTimeout(() => fxLayer.innerHTML = '', duration);
  }
  
  function updateHp() {
    if(playerHp > 100) playerHp = 100;
    if(bossHp > 100) bossHp = 100;
    if(playerHp < 0) playerHp = 0;
    if(bossHp < 0) bossHp = 0;
    playerHpBar.style.width = playerHp + '%';
    bossHpBar.style.width = bossHp + '%';
    apDisp.textContent = `(${playerAp} AP)`;
  }

  function loadTurn() {
    updateHp();
    if (bossHp <= 0) {
      setTimeout(() => finishUltimateGame(container, true, 50, "System Overridden!", `You slayed the ${bossName}!`), 1000);
      return;
    }
    if (playerHp <= 0) {
      setTimeout(() => finishUltimateGame(container, false, 0, "Access Denied!", `The ${bossName} terminated your connection.`), 1000);
      return;
    }

    if (playerAp > 0) {
      showCommandMenu();
    } else {
      showQuestion();
    }
  }

  function showQuestion() {
    if (currentQIdx >= questions.length) currentQIdx = 0;
    const q = questions[currentQIdx];
    qText.textContent = "Answer to generate Action Points (AP): " + q.question;
    qOptions.innerHTML = '';

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.textAlign = 'left';
      btn.textContent = opt;
      btn.onclick = () => handleAnswer(idx === q.answer);
      qOptions.appendChild(btn);
    });
  }

  function handleAnswer(isCorrect) {
    qOptions.innerHTML = '';
    currentQIdx++;

    if (isCorrect) {
      qText.textContent = "Bypass Successful! +1 AP";
      showFx("+1 AP", "#fbbf24", 1000);
      playerAp++;
      updateHp();
      setTimeout(loadTurn, 1000);
    } else {
      qText.textContent = "Access Denied! The System attacks!";
      bossRig.className = 'css-char enemy anim-run';
      bossCont.style.transform = 'translateX(-300px)';
      
      setTimeout(() => {
        bossRig.className = 'css-char enemy anim-punch-enemy';
        arena.classList.add('cyber-shake');
        playerRig.classList.add('cyber-glitch');
        showFx("SYSTEM SHOCK", "#ef4444", 1000);
        playerHp -= 25;
        updateHp();
        
        setTimeout(() => {
          bossCont.style.transform = 'translateX(0)';
          bossRig.className = 'css-char enemy anim-run';
          arena.classList.remove('cyber-shake');
          playerRig.classList.remove('cyber-glitch');
          
          setTimeout(() => {
            bossRig.className = 'css-char enemy anim-idle';
            loadTurn();
          }, 500);
        }, 500);
      }, 500);
    }
  }

  function showCommandMenu() {
    qText.textContent = `Command Menu (${playerAp} AP Available). Choose an action or answer more questions to save AP!`;
    qOptions.innerHTML = '';

    const moves = [
      { name: "🗡️ Data Slash (1 AP)", cost: 1, action: () => performSlash() },
      { name: "💥 Plasma Cannon (2 AP)", cost: 2, action: () => performLaser() },
      { name: "💖 Firewall Heal (2 AP)", cost: 2, action: () => performHeal() },
      { name: "🧠 Answer Question (Save AP)", cost: 0, action: () => showQuestion() }
    ];

    moves.forEach(m => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.style.background = playerAp >= m.cost ? (m.cost===0 ? '#3b82f6' : '#10b981') : '#64748b';
      btn.disabled = playerAp < m.cost;
      btn.textContent = m.name;
      btn.onclick = () => {
        if(m.cost > 0) { playerAp -= m.cost; updateHp(); }
        m.action();
      };
      qOptions.appendChild(btn);
    });
  }

  function performSlash() {
    qOptions.innerHTML = '';
    qText.textContent = "Executing Data Slash...";
    playerRig.className = 'css-char anim-run';
    playerCont.style.transform = 'translateX(300px)';
    
    setTimeout(() => {
      playerRig.className = 'css-char anim-punch';
      arena.classList.add('cyber-shake');
      bossRig.classList.add('cyber-glitch');
      showFx("SLASH!", "#3b82f6", 1000);
      bossHp -= 20;
      updateHp();
      
      setTimeout(() => {
        playerCont.style.transform = 'translateX(0)';
        playerRig.className = 'css-char anim-run';
        arena.classList.remove('cyber-shake');
        bossRig.classList.remove('cyber-glitch');
        
        setTimeout(() => {
          playerRig.className = 'css-char anim-idle';
          loadTurn();
        }, 500);
      }, 500);
    }, 500);
  }

  function performLaser() {
    qOptions.innerHTML = '';
    qText.textContent = "Charging Plasma Cannon...";
    playerRig.className = 'css-char anim-cast';
    
    setTimeout(() => {
      const laser = document.createElement('div');
      laser.style.position = 'absolute';
      laser.style.left = '120px';
      laser.style.top = '140px';
      laser.style.height = '15px';
      laser.style.background = '#10b981';
      laser.style.boxShadow = '0 0 15px #10b981, 0 0 30px #10b981';
      laser.style.borderRadius = '3px';
      laser.style.zIndex = '5';
      fxLayer.appendChild(laser);
      
      laser.animate([
        { width: '0px', opacity: 1 },
        { width: '500px', opacity: 1 },
        { width: '500px', opacity: 0 }
      ], { duration: 500, easing: 'ease-out' });
      
      setTimeout(() => {
        laser.remove();
        showFx("CRITICAL OVERRIDE!", "#10b981", 1000);
        arena.classList.add('cyber-shake');
        bossRig.classList.add('cyber-glitch');
        bossHp -= 45;
        updateHp();
        
        setTimeout(() => {
          playerRig.className = 'css-char anim-idle';
          arena.classList.remove('cyber-shake');
          bossRig.classList.remove('cyber-glitch');
          loadTurn();
        }, 800);
      }, 300);
    }, 500);
  }

  function performHeal() {
    qOptions.innerHTML = '';
    qText.textContent = "Deploying Firewall Heal...";
    playerRig.className = 'css-char anim-heal';
    
    setTimeout(() => {
      showFx("+30 HP", "#10b981", 1000);
      playerHp += 30;
      updateHp();
      setTimeout(() => {
        playerRig.className = 'css-char anim-idle';
        loadTurn();
      }, 1000);
    }, 500);
  }

  loadTurn();
}

// ==========================================
// GAME 2: TYPING DEFENSE
// ==========================================
function launchTypingDefense(container, courseData) {
  let keywords = extractCourseKeywords(courseData);
  if (keywords.length < 5) {
    keywords = ["variable", "function", "compile", "syntax", "array", "object", "string", "number", "boolean"]; // Fallback
  }

  container.innerHTML = `
    <div style="width: 100%; max-width: 800px; margin: 0 auto; background: #0f172a; border: 4px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative;">
      
      <!-- Top HUD -->
      <div style="position: absolute; top: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between; color: #fff; z-index: 10; font-family: monospace;">
        <div>Base HP: <span id="td-hp" style="color: #10b981;">100</span></div>
        <div>Words Destroyed: <span id="td-score" style="color: #3b82f6;">0</span> / 15</div>
      </div>

      <!-- Game Area -->
      <div id="td-area" style="position: relative; width: 100%; height: 400px; overflow: hidden;">
        <!-- Base / Laser Cannon -->
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 20px; background: #1e293b; border-top: 2px solid #334155;"></div>
        <div id="td-cannon" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 40px; height: 30px; background: var(--accent); border-radius: 10px 10px 0 0; text-align: center; color: #fff; font-size: 20px;"><i class="fa-solid fa-satellite-dish"></i></div>
      </div>

      <!-- Input Area -->
      <div style="padding: 15px; background: #1e293b; border-top: 2px solid var(--border-color);">
        <input type="text" id="td-input" placeholder="Type the falling words here and hit ENTER!" style="width: 100%; padding: 15px; border-radius: 5px; border: none; font-size: 1.2rem; font-family: monospace; text-align: center; background: #334155; color: #fff; outline: none;" autocomplete="off" spellcheck="false">
      </div>
    </div>
  `;

  const inputEl = document.getElementById('td-input');
  const areaEl = document.getElementById('td-area');
  const hpEl = document.getElementById('td-hp');
  const scoreEl = document.getElementById('td-score');
  const cannon = document.getElementById('td-cannon');

  inputEl.focus();

  let hp = 100;
  let score = 0;
  let activeWords = []; // { id, word, el, y, speed }
  let gameLoop;
  let spawnLoop;
  let isGameOver = false;

  function spawnWord() {
    if (isGameOver) return;
    const word = keywords[Math.floor(Math.random() * keywords.length)];
    const el = document.createElement('div');
    el.textContent = word;
    el.style.position = 'absolute';
    el.style.top = '-30px';
    // Random X between 10% and 80% to avoid edges
    const startX = 10 + Math.random() * 70;
    el.style.left = startX + '%';
    el.style.padding = '5px 10px';
    el.style.background = '#334155';
    el.style.color = '#fff';
    el.style.border = '1px solid #ef4444';
    el.style.borderRadius = '5px';
    el.style.fontFamily = 'monospace';
    el.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)';
    
    areaEl.appendChild(el);
    
    activeWords.push({
      id: Date.now() + Math.random(),
      word: word,
      el: el,
      y: -30,
      x: startX,
      speed: 0.5 + Math.random() * 0.8 // pixels per frame
    });
  }

  function shootLaser(targetX) {
    const laser = document.createElement('div');
    laser.style.position = 'absolute';
    laser.style.bottom = '50px';
    laser.style.left = '50%'; // Cannon center
    laser.style.width = '4px';
    laser.style.height = '100px';
    laser.style.background = '#3b82f6';
    laser.style.boxShadow = '0 0 10px #3b82f6, 0 0 20px #3b82f6';
    laser.style.transformOrigin = 'bottom center';
    
    // Math to point laser
    const deltaX = targetX - 50; // percentages
    const angle = Math.atan2(deltaX, 100) * (180 / Math.PI); // rough angle
    laser.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    
    areaEl.appendChild(laser);
    
    // Animate up
    laser.animate([
      { bottom: '50px', opacity: 1 },
      { bottom: '400px', opacity: 0 }
    ], { duration: 300, easing: 'ease-out' });
    
    setTimeout(() => laser.remove(), 300);
  }

  function update() {
    if (isGameOver) return;
    
    // Move words
    for (let i = activeWords.length - 1; i >= 0; i--) {
      let w = activeWords[i];
      w.y += w.speed;
      w.el.style.top = w.y + 'px';
      
      // Collision with bottom (approx 350px)
      if (w.y > 350) {
        // Hit base!
        w.el.remove();
        activeWords.splice(i, 1);
        hp -= 15;
        hpEl.textContent = hp;
        
        // Flash screen red
        areaEl.style.background = 'rgba(239, 68, 68, 0.3)';
        setTimeout(() => areaEl.style.background = 'transparent', 150);
        
        if (hp <= 0) {
          endGame(false);
        }
      }
    }
    
    gameLoop = requestAnimationFrame(update);
  }

  function endGame(won) {
    isGameOver = true;
    cancelAnimationFrame(gameLoop);
    clearInterval(spawnLoop);
    
    if (won) {
      finishUltimateGame(container, true, 50, "Server Defended!", `You shot down 15 incoming concepts!`);
    } else {
      finishUltimateGame(container, false, 0, "Base Destroyed", `The concepts overwhelmed your server.`);
    }
  }

  // Handle Input
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const typed = inputEl.value.trim().toLowerCase();
      inputEl.value = ''; // clear
      if (!typed) return;
      
      // Find matching word
      const matchIndex = activeWords.findIndex(w => w.word === typed);
      if (matchIndex > -1) {
        // Match found!
        const w = activeWords[matchIndex];
        shootLaser(w.x);
        
        // Explosion effect
        w.el.style.background = '#10b981';
        w.el.style.border = '1px solid #10b981';
        w.el.style.transform = 'scale(1.5)';
        w.el.style.opacity = '0';
        w.el.style.transition = 'all 0.2s';
        
        setTimeout(() => w.el.remove(), 200);
        
        activeWords.splice(matchIndex, 1);
        score++;
        scoreEl.textContent = score;
        
        if (score >= 15) {
          endGame(true);
        }
      }
    }
  });

  // Start Loops
  spawnLoop = setInterval(spawnWord, 2000);
  spawnWord(); // spawn first immediately
  gameLoop = requestAnimationFrame(update);
}

// ==========================================
// GAME 3: CONCEPT CATCHER
// ==========================================
function launchConceptCatcher(container, courseData) {
  let keywords = extractCourseKeywords(courseData);
  if (keywords.length < 3) keywords = ["Code", "Logic", "Data", "App"];
  const badWords = ["SyntaxError", "Bug", "Null", "Crash", "Lag", "Error", "Undefined"];

  container.innerHTML = `
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background: #e0f2fe; border: 4px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative;">
      
      <!-- Top HUD -->
      <div style="position: absolute; top: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between; font-weight: bold; color: #0f172a; z-index: 10;">
        <div>HP: <span id="cc-hp" style="color: #ef4444;">100</span></div>
        <div>Score: <span id="cc-score" style="color: #3b82f6;">0</span> / 15</div>
      </div>

      <!-- Game Area -->
      <div id="cc-area" style="position: relative; width: 100%; height: 500px; overflow: hidden;" tabindex="0">
        <!-- Catcher Basket -->
        <div id="cc-basket" style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 80px; height: 30px; background: var(--accent); border-radius: 10px 10px 30px 30px; text-align: center; color: #fff; font-size: 20px; display: flex; justify-content: center; align-items: center; box-shadow: 0 5px 0 rgba(0,0,0,0.2);"><i class="fa-solid fa-basket-shopping"></i></div>
      </div>
      
      <p style="text-align: center; font-size: 0.9rem; padding: 10px; margin: 0; background: #fff; color: #64748b;">Use Left/Right arrow keys or drag the basket.</p>
    </div>
  `;

  const areaEl = document.getElementById('cc-area');
  const basketEl = document.getElementById('cc-basket');
  const hpEl = document.getElementById('cc-hp');
  const scoreEl = document.getElementById('cc-score');
  
  areaEl.focus(); // for keyboard

  let hp = 100;
  let score = 0;
  let basketX = 50; // percentage 0 to 100
  let items = []; // { id, el, y, x, isBad }
  let gameLoop;
  let spawnLoop;
  let isGameOver = false;

  // Basket movement (Keyboard)
  areaEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') basketX -= 5;
    if (e.key === 'ArrowRight') basketX += 5;
    if (basketX < 5) basketX = 5; // keep in bounds
    if (basketX > 95) basketX = 95;
    basketEl.style.left = basketX + '%';
  });

  // Basket movement (Mouse/Touch drag)
  let isDragging = false;
  areaEl.addEventListener('mousedown', () => isDragging = true);
  areaEl.addEventListener('mouseup', () => isDragging = false);
  areaEl.addEventListener('mouseleave', () => isDragging = false);
  areaEl.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const rect = areaEl.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    if (x < 5) x = 5;
    if (x > 95) x = 95;
    basketX = x;
    basketEl.style.left = basketX + '%';
  });

  function spawnItem() {
    if (isGameOver) return;
    
    // 70% chance good, 30% bad
    const isBad = Math.random() < 0.3;
    const text = isBad ? badWords[Math.floor(Math.random() * badWords.length)] : keywords[Math.floor(Math.random() * keywords.length)];
    
    const el = document.createElement('div');
    el.textContent = text;
    el.style.position = 'absolute';
    el.style.top = '-40px';
    const startX = 5 + Math.random() * 90;
    el.style.left = startX + '%';
    el.style.transform = 'translateX(-50%)';
    el.style.padding = '5px 10px';
    el.style.borderRadius = '20px';
    el.style.fontWeight = 'bold';
    el.style.fontSize = '0.9rem';
    el.style.boxShadow = '0 3px 5px rgba(0,0,0,0.1)';
    
    if (isBad) {
      el.style.background = '#ef4444';
      el.style.color = '#fff';
    } else {
      el.style.background = '#10b981';
      el.style.color = '#fff';
    }
    
    areaEl.appendChild(el);
    
    items.push({
      el: el,
      y: -40,
      x: startX,
      isBad: isBad,
      speed: 1.5 + Math.random() * 2 // pixels per frame
    });
  }

  function update() {
    if (isGameOver) return;
    
    for (let i = items.length - 1; i >= 0; i--) {
      let item = items[i];
      item.y += item.speed;
      item.el.style.top = item.y + 'px';
      
      // Check collision
      // Basket is at bottom: 10px from bottom, height 30px -> y ~ 460px
      if (item.y > 440 && item.y < 480) {
        // Check X overlap
        // basketX is center. width is 80px. So +/- ~40px. 
        // area is max 600px, 40px is ~6.6%. Let's say +/- 8% tolerance.
        if (Math.abs(item.x - basketX) < 10) {
          // CAUGHT!
          item.el.remove();
          items.splice(i, 1);
          
          if (item.isBad) {
            hp -= 25;
            hpEl.textContent = hp;
            basketEl.style.background = '#ef4444';
            setTimeout(() => basketEl.style.background = 'var(--accent)', 200);
            if (hp <= 0) endGame(false);
          } else {
            score++;
            scoreEl.textContent = score;
            basketEl.style.background = '#10b981';
            setTimeout(() => basketEl.style.background = 'var(--accent)', 200);
            if (score >= 15) endGame(true);
          }
          continue; // item handled
        }
      }
      
      // Remove if falls out of bounds
      if (item.y > 520) {
        item.el.remove();
        items.splice(i, 1);
      }
    }
    
    gameLoop = requestAnimationFrame(update);
  }

  function endGame(won) {
    isGameOver = true;
    cancelAnimationFrame(gameLoop);
    clearInterval(spawnLoop);
    
    if (won) {
      finishUltimateGame(container, true, 50, "Catcher Champion!", `You collected 15 course concepts!`);
    } else {
      finishUltimateGame(container, false, 0, "Bugs Overwhelmed You", `You caught too many syntax errors.`);
    }
  }

  spawnLoop = setInterval(spawnItem, 1200);
  spawnItem();
  gameLoop = requestAnimationFrame(update);
}
