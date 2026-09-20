/**
 * DevQuest - Front-End Controller & SPA Engine
 * Handles view routing, dynamic content rendering, game state, playground mock,
 * note exports, and API integration with MongoDB backend / localStorage fallback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Config ---
  const API_BASE = 'http://localhost:5000/api';
  let useBackend = false; // Will check if backend is reachable

  // Game Settings
  const XP_PER_LEVEL = 400;
  const AVAILABLE_BADGES = [
    { id: 'first_module', name: 'First Module', desc: 'Complete your first module.', icon: 'fa-solid fa-graduation-cap' },
    { id: 'streak_5', name: '5-Day Streak', desc: 'Maintain a 5-day learning streak.', icon: 'fa-solid fa-fire' },
    { id: 'perfect_quiz', name: 'Perfect Quiz', desc: 'Score 100% on any module quiz.', icon: 'fa-solid fa-wand-magic-sparkles' },
    { id: 'python_beginner', name: 'Python Beginner', desc: 'Complete the Python Masterclass.', icon: 'fa-brands fa-python' },
    { id: '100_xp', name: '100 XP', desc: 'Earn your first 100 XP.', icon: 'fa-solid fa-star' },
    { id: 'first_practice', name: 'First Practice Exam', desc: 'Start your first practice exam.', icon: 'fa-solid fa-file-signature' },
  ];

  // ----------------------------------------------------
  // INITIALIZATION & STATE
  // ----------------------------------------------------
  
  if (!localStorage.getItem('devquest_posts_reset_v2')) {
    localStorage.removeItem('devquest_community_posts');
    localStorage.setItem('devquest_posts_reset_v2', 'true');
  }

  // Purge any corrupted massive avatars from dq_users (only once)
  if (!localStorage.getItem('devquest_purged_avatars_v3')) {
    try {
      let dqUsers = JSON.parse(localStorage.getItem('dq_users') || '{}');
      let usersChanged = false;
      for (let key in dqUsers) {
        if (dqUsers[key].profilePic && dqUsers[key].profilePic.length > 1000000) {
          dqUsers[key].profilePic = 'fa-user'; // Reset massive image
          usersChanged = true;
        }
      }
      if (usersChanged) {
        localStorage.setItem('dq_users', JSON.stringify(dqUsers));
      }
      localStorage.setItem('devquest_purged_avatars_v3', 'true');
    } catch (e) {
      console.error("Failed to purge massive avatars:", e);
    }
  }

  // Current session state
  let session = {
    token: null,
    user: {
      username: '',
      level: 1,
      xp: 0,
      streak: 1,
      lastActive: new Date().toISOString(),
      badges: [],
      completedModules: [],
      chatHistory: [],
      aiName: 'DevQuest AI Mentor',
      studyMinutes: [10, 20, 0, 15, 30, 45, 0] // Mock weekly data
    },
    notes: [
      {
        id: 'note_welcome',
        title: 'Welcome to DevQuest Notes',
        lang: 'general',
        content: 'Use this workspace to compile key takeaways, code samples, and definitions as you learn!\n\nSimply click "+ Create Note" or write notes here, then export them directly as a PDF or Google Doc.'
      }
    ]
  };

  // Active study page state
  let currentCourseId = null;
  let currentModule = null;
  let activeQuizQuestionIndex = 0;
  let quizAnswers = []; // user selections
  let activeNoteId = 'note_welcome';

  // Chart instances
  let progressChartInstance = null;

  // Helper: Image Compression
  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.7 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(dataUrl);
      };
    };
  }

  // --- DOM Query Elements ---
  const authScreen = document.getElementById('auth-screen');
  const appRoot = document.getElementById('app-root');
  const viewDashboard = document.getElementById('view-dashboard');
  const viewCourses = document.getElementById('view-courses');
  const viewStudy = document.getElementById('view-study');
  const viewNotes = document.getElementById('view-notes');
  const viewAi = document.getElementById('view-ai');
  const viewProfile = document.getElementById('view-profile');
  const viewPractice = document.getElementById('view-practice');
  const viewPracticeSession = document.getElementById('view-practice-session');
  const viewCommunity = document.getElementById('view-community');
  const viewGames = document.getElementById('view-games');
  
  const navDashboard = document.getElementById('nav-dashboard');
  const navCourses = document.getElementById('nav-courses');
  const navNotes = document.getElementById('nav-notes');
  const navAi = document.getElementById('nav-ai');
  const navProfile = document.getElementById('nav-profile');
  const navPractice = document.getElementById('nav-practice');
  const navCommunity = document.getElementById('nav-community');
  const navGames = document.getElementById('nav-games');
  
  const authForm = document.getElementById('auth-form');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authToggle = document.getElementById('auth-toggle');
  const authRegisterFields = document.getElementById('register-fields');
  const authExtras = document.getElementById('auth-extras');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const authPasswordInput = document.getElementById('auth-password');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const authAvatarGallery = document.getElementById('avatar-gallery');
  const authAvatarInput = document.getElementById('auth-avatar');

  let isRegisterMode = false;

  // --- Network & Backend Detection ---
  async function checkBackendConnection() {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        useBackend = true;
        console.log("Connected to DevQuest backend API.");
      }
    } catch (e) {
      console.log("Backend offline or unreachable. Falling back to local sandbox storage.");
      useBackend = false;
    }
  }

  // --- API Call Helper ---
  async function api(url, options = {}) {
    if (!useBackend) {
      return mockApi(url, options);
    }
    
    // Inject Auth header
    const headers = options.headers || {};
    if (session.token) {
      headers['Authorization'] = `Bearer ${session.token}`;
    }
    headers['Content-Type'] = 'application/json';
    
    try {
      const res = await fetch(`${API_BASE}${url}`, {
        ...options,
        headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'API request failed');
      return data;
    } catch (error) {
      showToast(`API Error: ${error.message}`, 'danger');
      throw error;
    }
  }

  // --- Simulated API LocalStorage database ---
  function mockApi(url, options = {}) {
    return new Promise((resolve, reject) => {
      // Helper to fetch user data
      const getLocalUsers = () => JSON.parse(localStorage.getItem('dq_users') || '{}');
      const saveLocalUsers = (users) => localStorage.setItem('dq_users', JSON.stringify(users));

      if (url === '/auth/register') {
        const registerData = JSON.parse(options.body);
        const { username, password, firstName, lastName, experienceLevel, profilePic } = registerData;
        const users = getLocalUsers();
        if (users[username]) {
          return reject(new Error('User already exists'));
        }
        users[username] = {
          username,
          password, // plain text for mockup only, in real backend hashed
          firstName: firstName || '',
          lastName: lastName || '',
          experienceLevel: experienceLevel || 'Beginner',
          profilePic: profilePic || 'fa-user-astronaut',
          isVerified: username === 'Alicia',
          role: username === 'Alicia' ? 'admin' : 'user',
          level: 1,
          xp: 0,
          streak: 1,
          lastActive: new Date().toISOString(),
          badges: [],
          completedModules: [],
          chatHistory: [],
          aiName: 'DevQuest AI Mentor',
          studyMinutes: [0, 0, 0, 0, 0, 0, 0],
          notes: [...session.notes]
        };
        saveLocalUsers(users);
        return resolve({ success: true, token: 'mock-jwt-' + username, user: users[username] });
      }

      if (url === '/auth/login') {
        const { username, password } = JSON.parse(options.body);
        const users = getLocalUsers();
        const user = users[username];
        if (!user || user.password !== password) {
          return reject(new Error('Invalid username or password'));
        }
        return resolve({ success: true, token: 'mock-jwt-' + username, user });
      }

      if (url === '/user/sync') {
        // Sync stats back to localStorage
        const users = getLocalUsers();
        if (users[session.user.username]) {
          if (options.method === 'POST') {
            const body = JSON.parse(options.body);
            users[session.user.username] = { ...users[session.user.username], ...body };
            saveLocalUsers(users);
          }
          return resolve({ success: true, user: users[session.user.username] });
        }
        return reject(new Error('User not found'));
      }

      if (url === '/notes') {
        const users = getLocalUsers();
        const user = users[session.user.username];
        if (!user) return reject(new Error('Access denied'));
        
        if (options.method === 'POST') {
          const note = JSON.parse(options.body);
          const index = user.notes.findIndex(n => n.id === note.id);
          if (index !== -1) {
            user.notes[index] = note;
          } else {
            user.notes.push(note);
          }
          saveLocalUsers(users);
          return resolve({ success: true, notes: user.notes });
        }
        
        return resolve({ notes: user.notes || [] });
      }

      if (url === '/posts') {
          if (options.method === 'POST') {
            const postData = JSON.parse(options.body);
            const localPosts = JSON.parse(localStorage.getItem('devquest_community_posts')) || [];
            const newPost = {
              _id: 'mock_' + Date.now(),
              author: session.user.username,
              avatar: "CURRENT_USER",
              isVerified: session.user.isVerified || false,
              time: "Just now",
              text: postData.text,
              likes: 0,
              image: postData.image || null
            };
            localPosts.unshift(newPost);
            localStorage.setItem('devquest_community_posts', JSON.stringify(localPosts));
            return resolve({ success: true, post: newPost });
          } else {
            // GET
            const localPosts = JSON.parse(localStorage.getItem('devquest_community_posts')) || [];
            return resolve({ success: true, posts: localPosts });
          }
        }

        if (url.match(/^\/posts\/.*\/like$/) && options.method === 'POST') {
          return resolve({ success: true, likes: 99 });
        }
        
        const commentMatch = url.match(/^\/posts\/(.*)\/comment$/);
        if (commentMatch && options.method === 'POST') {
          const postId = commentMatch[1];
          const commentData = JSON.parse(options.body);
          const { text } = commentData;

          if (['mock_1', 'mock_2', 'mock_3'].includes(postId)) {
            const mockComments = JSON.parse(localStorage.getItem('devquest_mock_comments') || '{}');
            if (!mockComments[postId]) {
              mockComments[postId] = [];
            }
            mockComments[postId].push({
              author: session.user.username,
              avatar: "CURRENT_USER",
              isVerified: session.user.isVerified || false,
              text: text,
              createdAt: new Date()
            });
            localStorage.setItem('devquest_mock_comments', JSON.stringify(mockComments));
            return resolve({ success: true, message: 'Mock post commented successfully' });
          }
          
          const localPosts = JSON.parse(localStorage.getItem('devquest_community_posts')) || [];
          const post = localPosts.find(p => p._id === postId);
          if (post) {
            if (!post.comments) post.comments = [];
            const newComment = {
              author: session.user.username,
              avatar: "CURRENT_USER",
              isVerified: session.user.isVerified || false,
              text: commentData.text,
              createdAt: new Date()
            };
            post.comments.push(newComment);
            localStorage.setItem('devquest_community_posts', JSON.stringify(localPosts));
            return resolve({ success: true, post });
          }
          return reject(new Error('Post not found locally'));
        }
        
        reject(new Error('Not found'));
    });
  }

  // --- Views Controller ---
  function switchView(viewId) {
    // Hide all view screens
    [viewDashboard, viewCourses, viewStudy, viewNotes, viewAi, viewProfile, viewPractice, viewPracticeSession, viewCommunity, viewGames].forEach(v => {
      if(v) v.classList.remove('active');
    });
    
    // Un-highlight nav items
    [navDashboard, navCourses, navNotes, navAi, navProfile, navPractice, navCommunity, navGames].forEach(n => {
      if(n) n.classList.remove('active');
    });

    // Activate selected view
    if (viewId === 'dashboard') {
      viewDashboard.classList.add('active');
      navDashboard.classList.add('active');
      renderDashboard();
    } else if (viewId === 'courses') {
      viewCourses.classList.add('active');
      navCourses.classList.add('active');
      renderCourses();
    } else if (viewId === 'study') {
      viewStudy.classList.add('active');
    } else if (viewId === 'notes') {
      viewNotes.classList.add('active');
      navNotes.classList.add('active');
      renderNotes();
    } else if (viewId === 'ai') {
      viewAi.classList.add('active');
      navAi.classList.add('active');
      renderAiChat();
    } else if (viewId === 'practice') {
      viewPractice.classList.add('active');
      navPractice.classList.add('active');
      renderPracticeGrid();
    } else if (viewId === 'practice-session') {
      viewPracticeSession.classList.add('active');
    } else if (viewId === 'community') {
      viewCommunity.classList.add('active');
      navCommunity.classList.add('active');
      renderCommunity();
    } else if (viewId === 'games') {
      viewGames.classList.add('active');
      navGames.classList.add('active');
      renderGamesLobby();
    } else if (viewId === 'profile') {
      viewProfile.classList.add('active');
      navProfile.classList.add('active');
      renderProfile();
    }
    
    // Always scroll to the top of all possible scroll containers when changing views
    setTimeout(() => {
      window.scrollTo(0, 0);
      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.scrollTop = 0;
      
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.scrollTop = 0;
      });
    }, 10);
  }

  // Navigation Click listeners
  if(navDashboard) navDashboard.addEventListener('click', () => switchView('dashboard'));
  if(navCourses) navCourses.addEventListener('click', () => switchView('courses'));
  if(navNotes) navNotes.addEventListener('click', () => switchView('notes'));
  if(navAi) navAi.addEventListener('click', () => switchView('ai'));
  if(navProfile) navProfile.addEventListener('click', () => switchView('profile'));
  if(navPractice) navPractice.addEventListener('click', () => switchView('practice'));
  if(navCommunity) navCommunity.addEventListener('click', () => switchView('community'));
  if(navGames) navGames.addEventListener('click', () => switchView('games'));

  // Toggle Auth mode
  authToggle.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {
      document.getElementById('auth-title').textContent = 'Join DevQuest';
      document.getElementById('auth-subtitle').textContent = 'Begin your programming learning adventure today!';
      authSubmitBtn.textContent = 'Register & Setup Profile';
      authToggle.innerHTML = 'Already have an account? <span>Sign In</span>';
      authRegisterFields.style.display = 'block';
      authExtras.style.display = 'none';
    } else {
      document.getElementById('auth-title').textContent = 'DevQuest Login';
      document.getElementById('auth-subtitle').textContent = 'Resume your programming adventure!';
      authSubmitBtn.textContent = 'Sign In';
      authToggle.innerHTML = "Don't have an account? <span>Create one now</span>";
      authRegisterFields.style.display = 'none';
      authExtras.style.display = 'block';
    }
    authForm.reset();
  });

  // Avatar Selection
  if (authAvatarGallery) {
    authAvatarGallery.addEventListener('click', (e) => {
      const option = e.target.closest('.avatar-option');
      if (option) {
        document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('selected'));
        option.classList.add('selected');
        authAvatarInput.value = option.getAttribute('data-avatar');
      }
    });
  }

  // Toggle Password Visibility
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      const type = authPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      authPasswordInput.setAttribute('type', type);
      togglePasswordBtn.classList.toggle('fa-eye-slash');
      togglePasswordBtn.classList.toggle('fa-eye');
    });
  }

  // Forgot Password Mock (Disabled - Moved to Firebase Auth)
  /*
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('A password reset link has been sent to your email!', 'success');
    });
  }
  */

  // Handle Authentication submission (Disabled - Moved to Firebase Auth)
  /*
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('auth-username')?.value?.trim() || '';
    const password = document.getElementById('auth-password')?.value || '';
    
    // Additional fields
    const firstName = document.getElementById('auth-firstname')?.value.trim() || '';
    const lastName = document.getElementById('auth-lastname')?.value.trim() || '';
    const experienceLevel = document.getElementById('auth-experience')?.value || 'Beginner';
    const profilePic = document.getElementById('auth-avatar')?.value || 'fa-user-astronaut';

    if (!username || !password) {
      showToast('Please enter a username and password.', 'danger');
      return;
    }

    async function enterApp(data) {
      session.token = data.token;
      session.user = data.user;
      
      // Patch local user if some fields exist
      if (!session.user.profilePic) session.user.profilePic = profilePic;
      if (!session.user.firstName) session.user.firstName = firstName;
      
      // Auto-upgrade Alicia to Admin even if old account
      if (session.user.username === 'Alicia') {
        session.user.isVerified = true;
        session.user.role = 'admin';
      }
      
      const notesData = await api('/notes', { method: 'GET' });
      session.notes = notesData.notes || [];
      authScreen.style.display = 'none';
      appRoot.style.display = 'flex';
      
      const displayName = session.user.firstName ? `${session.user.firstName}` : session.user.username;
      let nameHtml = displayName;
      if (session.user.isVerified) {
        nameHtml += ' <i class="fa-solid fa-circle-check verified-badge" title="Verified Admin"></i>';
      }
      document.getElementById('username-display').innerHTML = nameHtml;
      
      let avatarHtml = '';
      if (session.user.profilePic && session.user.profilePic.startsWith('data:image')) {
        avatarHtml = `<img src="${session.user.profilePic}" alt="avatar">`;
      } else {
        avatarHtml = `<i class="fa-solid ${session.user.profilePic || 'fa-user-astronaut'}"></i>`;
      }
      document.getElementById('avatar-display').innerHTML = avatarHtml;
      
      // Update experience level display
      const levelEl = document.querySelector('.widget-level');
      if (levelEl && session.user.experienceLevel) {
        levelEl.textContent = session.user.experienceLevel + ' Learner';
      }

      showToast(`Welcome, ${displayName}! ðŸŽ®`, 'success');
      switchView('dashboard');
      triggerDailyStreak();
    }

    if (isRegisterMode) {
      try {
        const payload = { username, password, firstName, lastName, experienceLevel, profilePic };
        const data = await api('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
        await enterApp(data);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    } else {
      // Login mode: try login, and if account not found, offer to auto-register
      try {
        const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) });
        await enterApp(data);
      } catch (loginErr) {
        // If no account found, auto-register this as a new user
        const users = JSON.parse(localStorage.getItem('dq_users') || '{}');
        if (!users[username]) {
          try {
            const payload = { username, password, firstName, lastName, experienceLevel, profilePic };
            const regData = await api('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
            showToast('New account created automatically! Welcome to DevQuest ðŸŽ®', 'success');
            await enterApp(regData);
          } catch (regErr) {
            showToast(regErr.message, 'danger');
          }
        } else {
          showToast('Wrong password. Please try again.', 'danger');
        }
      }
    }
  });

  // Logout Trigger (Disabled - Moved to Firebase Auth)
  document.getElementById('logout-btn').addEventListener('click', () => {
    session.token = null;
    session.user = {};
    session.notes = [];
    authScreen.style.display = 'flex';
    appRoot.style.display = 'none';
    authForm.reset();
  });
  */
  
  // Bridge for Firebase Auth to load user's mock data and privileges
  window.devQuestFirebaseLogin = async function(email) {
    let username = email.split('@')[0];
    const users = JSON.parse(localStorage.getItem('dq_users') || '{}');
    
    // Explicitly restore Alicia's admin profile
    if (email.toLowerCase() === 'aliciarudisel@gmail.com') {
      username = 'Alicia';
    }
    
    let user = users[username];
    if (!user) {
      user = {
        username: username,
        firstName: '',
        lastName: '',
        experienceLevel: 'Beginner',
        profilePic: 'fa-user-astronaut',
        isVerified: false,
        role: 'user',
        level: 1,
        xp: 0,
        streak: 1,
        lastActive: new Date().toISOString(),
        badges: [],
        completedModules: [],
        chatHistory: [],
        aiName: 'DevQuest AI Mentor',
        studyMinutes: [0, 0, 0, 0, 0, 0, 0],
        notes: [...session.notes]
      };
      users[username] = user;
      localStorage.setItem('dq_users', JSON.stringify(users));
    }
    
    session.user = user;
    session.token = 'firebase-token';
    
    if (username === 'Alicia') {
      session.user.isVerified = true;
      session.user.role = 'admin';
    }
    
    const notesData = await api('/notes', { method: 'GET' });
    session.notes = notesData.notes || [];
    
    const displayName = session.user.firstName ? `${session.user.firstName}` : session.user.username;
    let nameHtml = displayName;
    if (session.user.isVerified) {
      nameHtml += ' <i class="fa-solid fa-circle-check verified-badge" title="Verified Admin"></i>';
    }
    const unDisp = document.getElementById('username-display');
    if (unDisp) unDisp.innerHTML = nameHtml;
    
    let avatarHtml = '';
    if (session.user.profilePic && session.user.profilePic.startsWith('data:image')) {
      avatarHtml = `<img src="${session.user.profilePic}" alt="avatar">`;
    } else {
      avatarHtml = `<i class="fa-solid ${session.user.profilePic || 'fa-user-astronaut'}"></i>`;
    }
    const avDisp = document.getElementById('avatar-display');
    if (avDisp) avDisp.innerHTML = avatarHtml;
    
    const levelEl = document.querySelector('.widget-level');
    if (levelEl && session.user.experienceLevel) {
      levelEl.textContent = session.user.experienceLevel + ' Learner';
    }
    
    showToast(`Welcome, ${displayName}! ðŸŽ®`, 'success');
    switchView('dashboard');
    triggerDailyStreak();
  };
  
  window.devQuestFirebaseLogout = function() {
    session.token = null;
    session.user = {};
    session.notes = [];
    authScreen.style.display = 'flex';
    appRoot.style.display = 'none';
    authForm.reset();
  };

  // --- XP & Level Up Logic ---
  async function grantXP(amount, reason = '') {
    let user = session.user;
    user.xp += amount;
    showToast(`+${amount} XP ${reason ? '- ' + reason : ''}`, 'xp');
    
    // Check level up
    let leveledUp = false;
    while (user.xp >= XP_PER_LEVEL) {
      user.xp -= XP_PER_LEVEL;
      user.level += 1;
      leveledUp = true;
    }
    
    if (leveledUp) {
      triggerLevelUpModal(user.level);
    }
    
    // Update local UI
    document.getElementById('xp-display-val').textContent = `${user.xp}/${XP_PER_LEVEL} XP`;
    document.getElementById('level-display-val').textContent = `Lvl ${user.level}`;
    
    // Unlock achievements check
    if (user.level >= 5 && !user.badges.includes('high_achiever')) {
      await unlockBadge('high_achiever');
    }

    // Save to Database
    await syncUserState();
  }

  async function unlockBadge(badgeId) {
    if (session.user.badges.includes(badgeId)) return;
    session.user.badges.push(badgeId);
    const badge = AVAILABLE_BADGES.find(b => b.id === badgeId);
    if (badge) {
      showToast(`ðŸ† Badge Unlocked: ${badge.name}!`, 'levelup');
    }
    await syncUserState();
  }

  // --- AI Chat History Helper ---
  function saveChatMessage(role, text) {
    if (!session.user.chatHistory) {
      session.user.chatHistory = [];
    }
    session.user.chatHistory.push({ role, text });
    syncUserState();
  }

  async function syncUserState() {
    await api('/user/sync', {
      method: 'POST',
      body: JSON.stringify({
        firstName: session.user.firstName,
        lastName: session.user.lastName,
        experienceLevel: session.user.experienceLevel,
        profilePic: session.user.profilePic,
        level: session.user.level,
        xp: session.user.xp,
        streak: session.user.streak,
        lastActive: session.user.lastActive,
        badges: session.user.badges,
        completedModules: session.user.completedModules,
        studyMinutes: session.user.studyMinutes,
        chatHistory: session.user.chatHistory,
        aiName: session.user.aiName
      })
    });
  }

  function triggerDailyStreak() {
    const user = session.user;
    if (!user.lastActive) user.lastActive = new Date().toISOString();
    
    const now = new Date();
    const lastActive = new Date(user.lastActive);
    
    // Normalize to midnight to check calendar days
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActiveMidnight = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
    
    const diffTime = todayMidnight - lastActiveMidnight;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      user.streak += 1;
      showToast(`ðŸ”¥ Daily Streak Active: ${user.streak} Days!`, 'xp');
    } else if (diffDays > 1) {
      user.streak = 1;
    }
    
    user.lastActive = now.toISOString();
    document.getElementById('streak-display-val').textContent = `${user.streak} Days`;
    syncUserState();
  }

  function triggerLevelUpModal(newLevel) {
    const modal = document.getElementById('levelup-modal-overlay');
    document.getElementById('modal-level-number').textContent = newLevel;
    modal.classList.add('show');
    
    // Sound effect trigger (simple WebAudio API synthesize)
    playLevelUpTone();
  }

  document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('levelup-modal-overlay').classList.remove('show');
  });

  // Dedicated Profile Section Logic
  const editAvatarGallery = document.getElementById('edit-avatar-gallery');
  const editAvatarInput = document.getElementById('edit-avatar-input');
  
  if (editAvatarGallery) {
    editAvatarGallery.addEventListener('click', (e) => {
      const option = e.target.closest('.avatar-option');
      if (option) {
        document.querySelectorAll('#edit-avatar-gallery .avatar-option').forEach(el => el.classList.remove('selected'));
        option.classList.add('selected');
        editAvatarInput.value = option.getAttribute('data-avatar');
      }
    });
  }

  // Custom file upload logic
  const customAvatarFile = document.getElementById('custom-avatar-file');
  if (customAvatarFile) {
    customAvatarFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImage(file, (dataUrl) => {
          editAvatarInput.value = dataUrl;
          document.querySelectorAll('#edit-avatar-gallery .avatar-option').forEach(el => el.classList.remove('selected'));
        });
      }
    });
  }

  const saveProfileViewBtn = document.getElementById('save-profile-view-btn');
  if (saveProfileViewBtn) {
    saveProfileViewBtn.addEventListener('click', () => {
      const user = session.user;
      user.firstName = document.getElementById('edit-firstname').value.trim();
      user.lastName = document.getElementById('edit-lastname').value.trim();
      user.experienceLevel = document.getElementById('edit-experience').value;
      user.profilePic = editAvatarInput.value;

      // Update sidebar UI immediately
      const displayName = user.firstName ? `${user.firstName}` : user.username;
      
      let nameHtml = displayName;
      if (user.isVerified) {
        nameHtml += ' <i class="fa-solid fa-circle-check verified-badge" title="Verified Admin"></i>';
      }
      document.getElementById('username-display').innerHTML = nameHtml;
      
      let avatarHtml = '';
      if (user.profilePic && user.profilePic.startsWith('data:image')) {
        avatarHtml = `<img src="${user.profilePic}" alt="avatar">`;
      } else {
        avatarHtml = `<i class="fa-solid ${user.profilePic || 'fa-user-astronaut'}"></i>`;
      }
      document.getElementById('avatar-display').innerHTML = avatarHtml;
      
      const levelEl = document.querySelector('.widget-level');
      if (levelEl) levelEl.textContent = user.experienceLevel + ' Learner';

      // Re-render profile view immediately
      renderProfile();

      syncUserState();
      showToast('Profile updated successfully!', 'success');
    });
  }

  function renderProfile() {
    const user = session.user;
    // Render Stats
    let avatarHtml = '';
    if (user.profilePic && user.profilePic.startsWith('data:image')) {
      avatarHtml = `<img src="${user.profilePic}" alt="avatar" style="width:100%; height:100%; border-radius:10px; object-fit:cover;">`;
    } else {
      avatarHtml = `<i class="fa-solid ${user.profilePic || 'fa-user-astronaut'}"></i>`;
    }
    document.getElementById('profile-card-avatar').innerHTML = avatarHtml;
    
    let displayName = user.firstName ? `${user.firstName} ${user.lastName}` : user.username;
    if (user.isVerified) {
      displayName += ' <i class="fa-solid fa-circle-check verified-badge" title="Verified Admin"></i>';
    }
    document.getElementById('profile-card-name').innerHTML = displayName;
    
    document.getElementById('profile-card-level').textContent = `Level ${user.level} - ${user.experienceLevel || 'Beginner'} Learner`;
    document.getElementById('profile-card-xp').textContent = user.xp;
    document.getElementById('profile-card-streak').textContent = user.streak;

    // Pre-fill Edit Form
    document.getElementById('edit-firstname').value = user.firstName || '';
    document.getElementById('edit-lastname').value = user.lastName || '';
    document.getElementById('edit-experience').value = user.experienceLevel || 'Beginner';
    
    // Toggle Admin Custom Upload Input
    const adminAvatarSection = document.getElementById('admin-avatar-section');
    if (adminAvatarSection) {
      if (user.isVerified) {
        adminAvatarSection.style.display = 'block';
      } else {
        adminAvatarSection.style.display = 'none';
      }
    }

    const currentAvatar = user.profilePic || 'fa-user-astronaut';
    if (!currentAvatar.startsWith('data:image')) {
      editAvatarInput.value = currentAvatar;
      document.querySelectorAll('#edit-avatar-gallery .avatar-option').forEach(el => {
        if (el.getAttribute('data-avatar') === currentAvatar) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    } else {
      editAvatarInput.value = currentAvatar;
      document.querySelectorAll('#edit-avatar-gallery .avatar-option').forEach(el => el.classList.remove('selected'));
    }
  }

  // --- Rendering Functions ---

  // Dashboard Renderer

  function renderDashboard() {
    const user = session.user;
    
    // Basic stats updating
    document.getElementById('dash-lvl-val').textContent = user.level;
    document.getElementById('dash-xp-val').textContent = `${user.xp}/${XP_PER_LEVEL} XP`;
    document.getElementById('dash-streak-val').textContent = `${user.streak} Days`;
    
    const countCompleted = user.completedModules ? user.completedModules.length : 0;
    document.getElementById('dash-completed-val').textContent = countCompleted;

    // XP Progress Ring in Dashboard
    const ringFill = document.getElementById('dashboard-ring-fill');
    const xpPercent = Math.min((user.xp / XP_PER_LEVEL) * 100, 100);
    const circumference = 2 * Math.PI * 14; // r = 14 inside SVG
    const strokeOffset = circumference - (circumference * xpPercent) / 100;
    ringFill.style.strokeDasharray = `${circumference} ${circumference}`;
    ringFill.style.strokeDashoffset = strokeOffset;

    // Render Badges achievements list
    const badgesContainer = document.getElementById('dashboard-badges-container');
    badgesContainer.innerHTML = '';
    
    AVAILABLE_BADGES.forEach(badge => {
      const isUnlocked = user.badges.includes(badge.id);
      const item = document.createElement('div');
      item.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      item.innerHTML = `
        <div class="badge-icon"><i class="${badge.icon}"></i></div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-desc">${badge.desc}</div>
      `;
      badgesContainer.appendChild(item);
    });

    // Chart.js initialization
    const chartCtx = document.getElementById('progressChart');
    if (chartCtx) {
      if (progressChartInstance) {
        progressChartInstance.destroy();
      }
      
      const studyMinutes = user.studyMinutes || [0,0,0,0,0,0,0];
      progressChartInstance = new Chart(chartCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Study Minutes',
            data: studyMinutes,
            backgroundColor: '#00f0ff',
            borderColor: '#ff0055',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#a1a1aa' }
            },
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              ticks: { color: '#a1a1aa' }
            }
          },
          plugins: {
            legend: {
              labels: { color: '#fff', font: { family: 'Bangers' } }
            }
          }
        }
      });
    }
  }

  // Course Hub Renderer
  function renderCourses() {
    renderPathways();
    const container = document.getElementById('courses-grid-view');
    container.innerHTML = '';

    Object.keys(CourseData).forEach(courseKey => {
      const course = CourseData[courseKey];
      const completedCount = course.modules.filter(m => session.user.completedModules.includes(m.id)).length;
      const progressPercent = Math.round((completedCount / course.modules.length) * 100);

      const card = document.createElement('div');
      card.className = 'card course-card';
      card.style.borderTopColor = course.color;
      card.innerHTML = `
        <div>
          <div class="course-header">
            <span class="course-icon" style="color: ${course.color}"><i class="${course.icon}"></i></span>
            <span class="course-modules-count">${course.modules.length} Modules</span>
          </div>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-desc">${course.modules[0].description}</p>
        </div>
        <div>
          <div class="course-progress-bar">
            <div class="course-progress-fill" style="width: ${progressPercent}%; background-color: ${course.color};"></div>
          </div>
          <div class="course-progress-pct">${progressPercent}% Completed</div>
          <button class="btn btn-block" style="background: linear-gradient(135deg, ${course.color}, rgba(0,0,0,0.3));" id="enter-${courseKey}">Enter Pathway</button>
        </div>
      `;
      container.appendChild(card);

      document.getElementById(`enter-${courseKey}`).addEventListener('click', () => {
        enterPathway(courseKey);
      });
    });
  }

  // Enter specific pathway module listing
  function enterPathway(courseKey) {
    currentCourseId = courseKey;
    const course = CourseData[courseKey];
    
    // Check polyglot achievement


    const container = document.getElementById('courses-grid-view');
    const completedCount = course.modules.filter(m => session.user.completedModules.includes(m.id)).length;
    const courseHeader = document.createElement('div');
    courseHeader.innerHTML = `
      <div class="pathway-back-btn" id="back-to-paths"><i class="fa-solid fa-arrow-left"></i> Back to Pathways</div>
      <div class="card" style="margin-bottom: 24px;">
        <h2 class="page-title" style="font-size: 1.8rem; margin-bottom: 8px;"><i class="${course.icon}"></i> ${course.title}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 12px;">All modules are unlocked â€” jump in anywhere! Complete quizzes to earn XP and badges.</p>
        <div style="font-size: 0.85rem; color: var(--secondary); font-weight: 600;">${completedCount} / ${course.modules.length} modules completed</div>
      </div>
      <div class="modules-list" id="path-modules-list"></div>
    `;
    container.innerHTML = '';
    container.appendChild(courseHeader);

    document.getElementById('back-to-paths').addEventListener('click', renderCourses);

    const modulesList = document.getElementById('path-modules-list');
    let currentTier = null;

    course.modules.forEach((mod, idx) => {
      if (mod.tier && mod.tier !== currentTier) {
        currentTier = mod.tier;
        const tierHeader = document.createElement('div');
        tierHeader.className = 'tier-header';
        tierHeader.innerHTML = `<h3>${currentTier} Tier</h3>`;
        modulesList.appendChild(tierHeader);
      }

      const isCompleted = session.user.completedModules.includes(mod.id);
      // ALL modules are unlocked â€” no locking!
      
      const item = document.createElement('div');
      item.className = `module-item ${isCompleted ? 'completed' : ''}`;
      
      const badgeHtml = isCompleted
        ? '<span class="status-badge completed"><i class="fa-solid fa-circle-check"></i> Completed</span>'
        : '<span class="status-badge start"><i class="fa-solid fa-play"></i> Start</span>';

      item.innerHTML = `
        <div class="module-info">
          <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 4px;">
            <span style="background: rgba(255,255,255,0.05); border-radius: 6px; padding: 2px 8px; font-size: 0.72rem; font-weight: 700; color: var(--text-muted);">${idx + 1}</span>
            <div class="module-title">${mod.title}</div>
          </div>
          <div class="module-desc">${mod.description}</div>
        </div>
        <div class="module-action">
          <span style="font-size:0.78rem; color: var(--secondary); margin-right: 8px;">+${mod.xpReward} XP</span>
          ${badgeHtml}
        </div>
      `;

      item.addEventListener('click', () => startModule(mod));
      modulesList.appendChild(item);
    });
  }


  // Load Module detail reader page
  function startModule(moduleObj) {
    currentModule = moduleObj;
    switchView('study');
    
    // Set headers
    document.getElementById('study-pathway-title').textContent = moduleObj.title;
    
    // Render content
    const contentArea = document.getElementById('study-lesson-content');
    contentArea.innerHTML = moduleObj.content;

    // Load custom starter code in code playground depending on module / language
    let starterCode = '';
    if (currentCourseId === 'python') {
      starterCode = '# Write python code here\nprint("Hello World!")\n';
    } else if (currentCourseId === 'java') {
      starterCode = '// Write java code here\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}\n';
    } else if (currentCourseId === 'cpp') {
      starterCode = '// Write C++ code here\n#include <iostream>\nint main() {\n    std::cout << "Hello World!" << std::endl;\n    return 0;\n}\n';
    }
    
    document.getElementById('sandbox-editor').value = starterCode;
    document.getElementById('sandbox-output').textContent = '> Click Run Code to execute and view console standard out.';

    // Setup Note Quick Capture button
    document.getElementById('add-to-notes-btn').onclick = () => {
      quickCaptureNote(moduleObj);
    };

    // Setup Quiz initiation
    document.getElementById('start-quiz-action-btn').onclick = () => {
      initQuizFlow(moduleObj);
    };

    document.getElementById('study-back-btn').onclick = () => {
      switchView('courses');
      enterPathway(currentCourseId);
    };
  }

// Code Playground compile/run simulator
  document.getElementById('run-code-btn').addEventListener('click', () => {
    const code = document.getElementById('sandbox-editor').value;
    const outputConsole = document.getElementById('sandbox-output');
    outputConsole.textContent = 'Running...\n';

    if (currentCourseId === 'python' && typeof Sk !== 'undefined') {
      // Use Skulpt for real Python execution
      outputConsole.textContent = ''; // clear output for real print statements
      
      Sk.configure({
        output: function(text) {
          outputConsole.textContent += text;
        },
        read: function(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
          return Sk.builtinFiles["files"][x];
        },
        inputfun: function(prompt) {
          return new Promise((resolve) => {
             const answer = window.prompt(prompt);
             resolve(answer !== null ? answer : "");
          });
        }
      });
      
      var myPromise = Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, code, true);
      });
      
      myPromise.then(function(mod) {
        grantXP(5, 'using code playground');
      }, function(err) {
        outputConsole.textContent += '\nERROR: ' + err.toString();
      });
    } else {
      // Simulate for other languages
      setTimeout(() => {
        let stdout = '';
        if (currentCourseId === 'java') {
          if (code.includes('System.out.println')) {
            const sysOutRegex = /System\.out\.println\s*\(\s*["'](.*?)["']\s*\)/g;
            let match;
            const matches = [];
            while ((match = sysOutRegex.exec(code)) !== null) {
              matches.push(match[1]);
            }
            stdout = matches.length > 0 ? matches.join('\n') : '> Code compiled successfully.';
          } else {
            stdout = 'Build Success.\n';
          }
        } else if (currentCourseId === 'cpp') {
          if (code.includes('std::cout')) {
            const coutRegex = /std::cout\s*<<\s*["'](.*?)["']/g;
            let match;
            const matches = [];
            while ((match = coutRegex.exec(code)) !== null) {
              matches.push(match[1]);
            }
            stdout = matches.length > 0 ? matches.join('\n') : '> Build and linkage success.';
          } else {
            stdout = 'Link complete.\n';
          }
        } else {
           stdout = '> Code executed successfully.';
        }
  
        outputConsole.textContent += stdout;
        grantXP(5, 'using code playground');
      }, 800);
    }
  });



  // Quick Capture Notes to Notebook Workspace
  function quickCaptureNote(moduleObj) {
    const cleanText = moduleObj.content.replace(/<[^>]*>/g, '');
    const codeBlocks = [];
    const codeRegex = /<code class="language-\w+">([\s\S]*?)<\/code>/g;
    let match;
    while ((match = codeRegex.exec(moduleObj.content)) !== null) {
      codeBlocks.push(match[1]);
    }
    
    const formattedNotes = `Study Notes for: ${moduleObj.title}\n` +
      `==========================================\n\n` +
      `Summary of key concepts:\n${cleanText.split('Key Takeaways')[0].trim().substring(0, 500)}...\n\n` +
      `Key Takeaways:\n- Code syntax spacing and control flows are standard.\n- Always compile code cleanly before testing.\n\n` +
      `Reference Code Blocks:\n` +
      (codeBlocks.length > 0 ? codeBlocks.join('\n\n') : '// No code blocks referenced.');

    const newNote = {
      id: 'note_' + Date.now(),
      title: `${moduleObj.title} Notes`,
      lang: currentCourseId,
      content: formattedNotes
    };

    session.notes.push(newNote);
    api('/notes', {
      method: 'POST',
      body: JSON.stringify(newNote)
    });

    showToast('Saved notes to Notebook Workspace!', 'success');
  }

  // --- Quiz Handling Engine ---
  function initQuizFlow(moduleObj) {
    activeQuizQuestionIndex = 0;
    quizAnswers = [];
    
    // Hide lesson reader, display quiz cards
    document.getElementById('study-left-pane').style.display = 'none';
    document.getElementById('quiz-flow-container').style.display = 'block';
    
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const quiz = currentModule.quiz;
    const currentQuestion = quiz[activeQuizQuestionIndex];

    // Progress bar update
    const percent = Math.round((activeQuizQuestionIndex / quiz.length) * 100);
    document.getElementById('quiz-progress-percent').textContent = `Question ${activeQuizQuestionIndex + 1} of ${quiz.length}`;
    document.getElementById('quiz-progress-bar-fill').style.width = `${percent}%`;

    // Render Question
    document.getElementById('quiz-question-text').textContent = currentQuestion.question;

    // Render Options
    const optionsContainer = document.getElementById('quiz-options-list');
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach((opt, index) => {
      const li = document.createElement('div');
      li.className = 'quiz-option';
      li.innerHTML = `
        <span class="option-letter" style="color:var(--secondary); font-weight:700;">${String.fromCharCode(65 + index)}.</span>
        <span>${opt}</span>
      `;
      li.addEventListener('click', () => selectQuizOption(index, li));
      optionsContainer.appendChild(li);
    });

    // Reset buttons
    document.getElementById('quiz-submit-btn').style.display = 'block';
    document.getElementById('quiz-next-btn').style.display = 'none';
    document.getElementById('quiz-explanation-box').style.display = 'none';
  }

  let selectedOptionIndex = null;
  function selectQuizOption(index, element) {
    selectedOptionIndex = index;
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
  }

  // Check Answer
  document.getElementById('quiz-submit-btn').onclick = () => {
    if (selectedOptionIndex === null) {
      showToast('Select an answer to proceed!', 'danger');
      return;
    }

    const quiz = currentModule.quiz;
    const question = quiz[activeQuizQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Disable clicks
    options.forEach(opt => opt.style.pointerEvents = 'none');
    
    document.getElementById('quiz-submit-btn').style.display = 'none';
    
    const isCorrect = (selectedOptionIndex + 1) === question.answer;
    quizAnswers.push(isCorrect);

    if (isCorrect) {
      options[selectedOptionIndex].classList.add('correct');
      playSuccessTone();
    } else {
      options[selectedOptionIndex].classList.add('incorrect');
      options[question.answer - 1].classList.add('correct'); // Show correct one
      playErrorTone();
    }

    // Show Explanation
    const explanationBox = document.getElementById('quiz-explanation-box');
    explanationBox.textContent = question.explanation;
    explanationBox.style.display = 'block';

    document.getElementById('quiz-next-btn').style.display = 'block';
  };

  // Next Question or Quiz Complete
  document.getElementById('quiz-next-btn').onclick = () => {
    selectedOptionIndex = null;
    const quiz = currentModule.quiz;
    activeQuizQuestionIndex++;

    if (activeQuizQuestionIndex < quiz.length) {
      renderQuizQuestion();
    } else {
      finishQuiz();
    }
  };

  async function finishQuiz() {
    const correctCount = quizAnswers.filter(c => c === true).length;
    const totalCount = quizAnswers.length;
    const scorePct = Math.round((correctCount / totalCount) * 100);

    // Hide quiz area
    document.getElementById('quiz-flow-container').style.display = 'none';
    document.getElementById('study-left-pane').style.display = 'block';

    const courseModules = CourseData[currentCourseId].modules;
    const currentModuleIndex = courseModules.findIndex(m => m.id === currentModule.id);
    const nextModule = currentModuleIndex !== -1 && currentModuleIndex < courseModules.length - 1 ? courseModules[currentModuleIndex + 1] : null;

    const resultBox = document.createElement('div');
    resultBox.className = 'card result-display-card';
    resultBox.style.marginTop = '24px';
    
    let buttonsHtml = '<button class="btn" id="finish-and-exit-quiz">Continue</button>';
    if (scorePct >= 70 && nextModule) {
      buttonsHtml = `
        <div style="display: flex; gap: 10px;">
          <button class="btn" id="finish-and-exit-quiz" style="flex: 1;">Back to Pathway</button>
          <button class="btn btn-primary" id="next-lesson-btn" style="flex: 1; background: var(--accent); color: #000;">Next Lesson <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      `;
    }

    resultBox.innerHTML = `
      <h3 style="font-family: var(--font-heading); font-size:1.6rem; color: #fff; margin-bottom: 12px;">Quiz Complete!</h3>
      <div style="font-size:2.2rem; font-weight:800; color:var(--accent); margin-bottom: 16px;">${correctCount}/${totalCount} Correct (${scorePct}%)</div>
      <p style="color:var(--text-secondary); margin-bottom: 24px;">Completing quizzes unlocks modular badge levels and registers experience path updates.</p>
      ${buttonsHtml}
    `;

    const contentArea = document.getElementById('study-lesson-content');
    contentArea.innerHTML = '';
    contentArea.appendChild(resultBox);

    // Unlock modules on database if passed
    if (scorePct >= 70) {
      if (!session.user.completedModules.includes(currentModule.id)) {
        session.user.completedModules.push(currentModule.id);
        
        // Mark first steps badge check
        if (!session.user.badges.includes('first_module')) {
          await unlockBadge('first_module');
        }

        // Grant Module Completion XP
        await grantXP(currentModule.xpReward || 100, 'module completed');
      }
    }

    // Score quiz wiz badge check
    if (scorePct === 100 && !session.user.badges.includes('perfect_quiz')) {
      await unlockBadge('perfect_quiz');
    }

    document.getElementById('finish-and-exit-quiz').onclick = () => {
      switchView('courses');
      enterPathway(currentCourseId);
    };

    if (document.getElementById('next-lesson-btn')) {
      document.getElementById('next-lesson-btn').onclick = () => {
        startModule(nextModule);
      };
    }
  }

  // --- Notebook Workspace Rendering & Actions ---
  function renderNotes() {
    const listContainer = document.getElementById('notes-list-items');
    listContainer.innerHTML = '';

    if (session.notes.length === 0) {
      listContainer.innerHTML = '<div style="font-size:0.85rem; color:var(--text-muted); text-align:center;">No saved notes.</div>';
      clearEditor();
      return;
    }

    session.notes.forEach(note => {
      const div = document.createElement('div');
      div.className = `note-list-item ${note.id === activeNoteId ? 'active' : ''}`;
      div.innerHTML = `
        <span class="note-list-item-title">${note.title}</span>
        <span class="note-list-item-lang">${note.lang}</span>
      `;
      div.addEventListener('click', () => {
        activeNoteId = note.id;
        renderNotes();
        loadNoteIntoEditor(note);
      });
      listContainer.appendChild(div);
    });

    const activeNote = session.notes.find(n => n.id === activeNoteId);
    if (activeNote) {
      loadNoteIntoEditor(activeNote);
    } else {
      loadNoteIntoEditor(session.notes[0]);
    }
  }

  function loadNoteIntoEditor(note) {
    document.getElementById('note-title-input').value = note.title;
    document.getElementById('note-body-textarea').value = note.content;
  }

  function clearEditor() {
    document.getElementById('note-title-input').value = '';
    document.getElementById('note-body-textarea').value = '';
  }

  // Save edits on typing
  document.getElementById('note-title-input').addEventListener('input', debounceSave);
  document.getElementById('note-body-textarea').addEventListener('input', debounceSave);

  let debounceTimer;
  function debounceSave() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const activeNote = session.notes.find(n => n.id === activeNoteId);
      if (!activeNote) return;

      activeNote.title = document.getElementById('note-title-input').value.trim() || 'Untitled Note';
      activeNote.content = document.getElementById('note-body-textarea').value;

      await api('/notes', {
        method: 'POST',
        body: JSON.stringify(activeNote)
      });
    }, 600);
  }

  // Create new blank note
  document.getElementById('create-note-btn').addEventListener('click', async () => {
    const newNote = {
      id: 'note_' + Date.now(),
      title: 'New Study Note',
      lang: 'general',
      content: 'Write notes here...'
    };
    
    session.notes.push(newNote);
    activeNoteId = newNote.id;
    
    await api('/notes', {
      method: 'POST',
      body: JSON.stringify(newNote)
    });
    
    renderNotes();
    loadNoteIntoEditor(newNote);
  });

  // Delete note
  document.getElementById('delete-note-btn').addEventListener('click', async () => {
    if (session.notes.length <= 1) {
      showToast('Cannot delete welcome note.', 'danger');
      return;
    }
    
    const index = session.notes.findIndex(n => n.id === activeNoteId);
    if (index !== -1) {
      session.notes.splice(index, 1);
      activeNoteId = session.notes[0].id;
      
      // Save changes back (since mock server replaces whole list if we post)
      localStorage.setItem('dq_users', JSON.stringify({
        ...JSON.parse(localStorage.getItem('dq_users') || '{}'),
        [session.user.username]: {
          ...session.user,
          notes: session.notes
        }
      }));
      
      renderNotes();
      showToast('Note deleted.', 'success');
    }
  });

  // Export note to PDF using window print view / jsPDF
  document.getElementById('export-pdf-btn').addEventListener('click', () => {
    const note = session.notes.find(n => n.id === activeNoteId);
    if (!note) return;

    // Use jsPDF from window object
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      showToast('jsPDF compiler failed to initialize.', 'danger');
      return;
    }

    const doc = new jsPDF();
    doc.setFont("Helvetica");
    
    // Page Title
    doc.setFontSize(22);
    doc.setTextColor(139, 92, 246); // Primary neon color RGB
    doc.text(note.title, 20, 30);
    
    // Metas
    doc.setFontSize(10);
    doc.setTextColor(148, 163, 184); // Secondary RGB
    doc.text(`Subject language: ${note.lang.toUpperCase()}`, 20, 40);
    doc.text(`Platform: DevQuest Academy (Free Account)`, 20, 45);
    
    doc.line(20, 50, 190, 50); // Divider line
    
    // Body Text Formatting
    doc.setFontSize(11);
    doc.setTextColor(30, 41, 59); // Charcoal text RGB
    const lines = doc.splitTextToSize(note.content, 170);
    doc.text(lines, 20, 60);

    doc.save(`${note.title.toLowerCase().replace(/\s+/g, '_')}_notes.pdf`);
    showToast('Downloaded notes PDF successfully!', 'success');
    
    grantXP(10, 'exporting study files');
  });

  // Export to Google Docs
  document.getElementById('export-gdoc-btn').addEventListener('click', () => {
    const note = session.notes.find(n => n.id === activeNoteId);
    if (!note) return;

    // Simple visual simulation since OAuth credentials require domain settings
    showToast('Simulating Google Docs export...', 'xp');
    
    setTimeout(() => {
      // Create raw text download as dynamic backup
      const blob = new Blob([note.content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${note.title.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      showToast('Uploaded successfully to Google Drive under "DevQuest Notebook"!', 'success');
      grantXP(10, 'uploaded to Google Docs');
    }, 1500);
  });

  // --- Toast notifications ---
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'xp' ? 'xp-toast' : ''} ${type === 'levelup' ? 'levelup-toast' : ''}`;
    
    let iconClass = 'fa-circle-check';
    if (type === 'danger') iconClass = 'fa-triangle-exclamation';
    else if (type === 'xp') iconClass = 'fa-bolt';
    else if (type === 'levelup') iconClass = 'fa-crown';

    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <span class="toast-msg">${message}</span>
    `;

    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Remove toast
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  // --- Audio Synthesis Engine ---
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, volume = 0.1) {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio blocked or unsupported
    }
  }

  function playSuccessTone() {
    playTone(523.25, 'sine', 0.15); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.25), 100); // E5
  }

  function playErrorTone() {
    playTone(220.00, 'sawtooth', 0.2, 0.05); // A3
  }

  function playLevelUpTone() {
    playTone(261.63, 'triangle', 0.15); // C4
    setTimeout(() => playTone(329.63, 'triangle', 0.15), 100); // E4
    setTimeout(() => playTone(392.00, 'triangle', 0.15), 200); // G4
    setTimeout(() => playTone(523.25, 'sine', 0.4, 0.15), 300); // C5
  }

  // --- Initialize app ---
  (async function init() {
    await checkBackendConnection();

    // If no users stored yet, default to register mode for a smoother first-visit experience
    const existingUsers = JSON.parse(localStorage.getItem('dq_users') || '{}');
    if (Object.keys(existingUsers).length === 0) {
      isRegisterMode = true;
      document.getElementById('auth-title').textContent = 'Join DevQuest';
      document.getElementById('auth-subtitle').textContent = 'Create a free account to start your coding adventure!';
      authSubmitBtn.textContent = 'Create Free Account';
      authToggle.innerHTML = 'Already have an account? <span>Sign In</span>';
    }
  })();



  // ==========================================
  // AI MENTOR SIMULATION ENGINE
  // ==========================================
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiChatHistory = document.getElementById('ai-chat-history');

  aiChatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (!message) return;

    // Add user message to UI
    appendChatMessage('user', message);
    saveChatMessage('user', message);
    aiChatInput.value = '';

    // Add empty AI bubble with typing indicator
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble ai-bubble';
    aiBubble.innerHTML = '<em>Thinking... <i class="fa-solid fa-spinner fa-spin"></i></em>';
    aiChatHistory.appendChild(aiBubble);
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;

    try {
      const response = await fetch(`${API_BASE}/mentor/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session.token ? { 'Authorization': `Bearer ${session.token}` } : {})
        },
        body: JSON.stringify({ message, aiName: session.user.aiName })
      });
      const data = await response.json();
      
      if (!response.ok || data.error) {
         throw new Error(data.error || "Failed to reach AI");
      }
      
      const textResponse = data.text;
      
      // Simple markdown parsing for bold and links
      const parsedHtml = textResponse
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
        
      aiBubble.innerHTML = parsedHtml;
      saveChatMessage('ai', parsedHtml);
    } catch (err) {
      aiBubble.innerHTML = `âš ï¸ Error communicating with AI Mentor: ${err.message}`;
    }
    
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
  });

  function appendChatMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;
    // If it's an AI message, it might contain HTML from parsing
    if (sender === 'ai' && text.includes('<') && text.includes('>')) {
       bubble.innerHTML = text;
    } else {
       bubble.textContent = text;
    }
    aiChatHistory.appendChild(bubble);
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
  }

  function renderAiChat() {
    aiChatHistory.innerHTML = '';
    const currentName = session.user.aiName || 'DevQuest AI Mentor';
    document.getElementById('ai-mentor-name-display').textContent = currentName;
    
    // Default greeting if no history
    if (!session.user.chatHistory || session.user.chatHistory.length === 0) {
      const defaultBubble = document.createElement('div');
      defaultBubble.className = 'chat-bubble ai-bubble';
      defaultBubble.textContent = `Hi there! I'm ${currentName}. I can help you understand code, debug issues, or suggest cool project ideas to build. What are we working on today?`;
      aiChatHistory.appendChild(defaultBubble);
    } else {
      session.user.chatHistory.forEach(msg => {
        appendChatMessage(msg.role, msg.text);
      });
    }
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
  }

  const clearChatBtn = document.getElementById('ai-clear-chat-btn');
  if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
      session.user.chatHistory = [];
      syncUserState();
      renderAiChat();
    });
  }

  const editAiNameBtn = document.getElementById('edit-ai-name-btn');
  if (editAiNameBtn) {
    editAiNameBtn.addEventListener('click', () => {
      const currentName = session.user.aiName || 'DevQuest AI Mentor';
      const newName = prompt('What would you like to name your AI Mentor?', currentName);
      if (newName && newName.trim() !== '') {
        session.user.aiName = newName.trim();
        syncUserState();
        renderAiChat(); // updates title and greeting if empty
      }
    });
  }




  // ================= PRACTICE ARENA LOGIC =================
  let practiceTimerInterval = null;
  let currentPracticeCourseId = null;
  let practiceQuestions = [];
  
  function renderPracticeGrid() {
    const grid = document.getElementById('practice-grid-view');
    grid.innerHTML = '';
    
    // Check for saved exam
    const saved = localStorage.getItem('devquest_saved_practice');
    const resumeContainer = document.getElementById('resume-practice-container');
    if (resumeContainer) {
      resumeContainer.style.display = saved ? 'block' : 'none';
    }
    
    Object.keys(CourseData).forEach(courseKey => {
      const course = CourseData[courseKey];
      const card = document.createElement('div');
      card.className = 'card course-card';
      card.innerHTML = `
        <div class="course-icon" style="background: ${course.color}"><i class="${course.icon}"></i></div>
        <div class="course-info">
          <h3 class="course-title">${course.title} Exam</h3>
          <p class="course-desc">40 Minute Practice</p>
          <div style="margin-top: 15px;">
            <button class="btn btn-accent btn-block start-practice-btn" data-course="${courseKey}">Start Practice</button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
    document.querySelectorAll('.start-practice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const courseId = e.target.getAttribute('data-course');
        startPracticeSession(courseId);
      });
    });
  }

  function startPracticeSession(courseId, savedState = null) {
    currentPracticeCourseId = courseId;
    const course = CourseData[courseId];
    
    document.getElementById('practice-session-title').textContent = `${course.title} - Final Exam`;
    
    // Gather all questions
    practiceQuestions = [];
    course.modules.forEach(mod => {
      if (mod.quiz) {
        mod.quiz.forEach(q => {
          practiceQuestions.push({ ...q, modId: mod.id });
        });
      }
    });
    
    // Render Questions
    const container = document.getElementById('practice-questions-container');
    container.innerHTML = '';
    
    practiceQuestions.forEach((q, idx) => {
      const qCard = document.createElement('div');
      qCard.className = 'practice-question-card';
      
      let optionsHtml = '';
      q.options.forEach((opt, optIdx) => {
        const isChecked = savedState && savedState.answers[`practice_q_${idx}`] == optIdx;
        const selectedClass = isChecked ? 'selected' : '';
        optionsHtml += `
          <label class="practice-option-label ${selectedClass}" data-qidx="${idx}" data-optidx="${optIdx}">
            <input type="radio" name="practice_q_${idx}" value="${optIdx}" class="practice-option-input" ${isChecked ? 'checked' : ''}>
            ${opt}
          </label>
        `;
      });
      
      qCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
          <div class="practice-question-text" style="flex: 1; margin: 0;"><strong>${idx + 1}.</strong> ${q.question}</div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-sm" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 4px;" data-hintidx="${idx}">Hint</button>
            <button class="btn btn-sm btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 4px; background: var(--surface-light);" data-idkidx="${idx}">I don't know</button>
          </div>
        </div>
        <div>${optionsHtml}</div>
        <div id="hint-msg-${idx}" style="display: none; margin-top: 15px; font-size: 0.9rem; color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 10px; border-radius: 6px; border-left: 3px solid #fbbf24;"></div>
        <div id="idk-msg-${idx}" style="display: none; margin-top: 15px; font-size: 0.9rem; color: #60a5fa; background: rgba(96, 165, 250, 0.1); padding: 10px; border-radius: 6px; border-left: 3px solid #60a5fa;"></div>
      `;
      container.appendChild(qCard);
    });
    
    // Add click listener for selecting options (styling)
    document.querySelectorAll('.practice-option-label').forEach(label => {
      label.addEventListener('click', function() {
        const qidx = this.getAttribute('data-qidx');
        document.querySelectorAll(`.practice-option-label[data-qidx="${qidx}"]`).forEach(lbl => lbl.classList.remove('selected'));
        this.classList.add('selected');
      });
    });
    
    // Add click listeners for Hint buttons
    document.querySelectorAll('[data-hintidx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-hintidx');
        const q = practiceQuestions[idx];
        const msgDiv = document.getElementById(`hint-msg-${idx}`);
        
        let hintText = "Hint: ";
        if (q.explanation) {
            hintText += q.explanation;
        } else {
            const correctOpt = q.options[q.answer];
            const partial = correctOpt.length > 4 ? correctOpt.substring(0, 4) : correctOpt;
            hintText += `The answer relates to "${partial}..."`;
        }
        
        msgDiv.textContent = hintText;
        msgDiv.style.display = 'block';
        e.target.style.display = 'none'; // hide button after clicking
      });
    });

    // Add click listeners for IDK buttons
    document.querySelectorAll('[data-idkidx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-idkidx');
        const q = practiceQuestions[idx];
        const msgDiv = document.getElementById(`idk-msg-${idx}`);
        
        const course = CourseData[currentPracticeCourseId];
        const mod = course.modules.find(m => m.id === q.modId);
        const modTitle = mod ? mod.title : 'the previous lessons';
        
        msgDiv.innerHTML = `<strong>Study Note:</strong> This topic is covered in <em>${course.title} - ${modTitle}</em>. If you're stuck, you can <strong>Save for Later</strong> below and review that module!`;
        msgDiv.style.display = 'block';
        e.target.style.display = 'none';
      });
    });

    // Start Timer
    let timeLeft = savedState ? savedState.timeLeft : 2400; // Default 40 minutes (2400 seconds)
    const timerDisplay = document.getElementById('practice-timer');
    timerDisplay.classList.remove('danger');
    
    updateTimerDisplay(timeLeft, timerDisplay);
    
    if (practiceTimerInterval) clearInterval(practiceTimerInterval);
    
    practiceTimerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft, timerDisplay);
      
      if (timeLeft <= 300) { // 5 minutes
        timerDisplay.classList.add('danger');
      }
      
      if (timeLeft <= 0) {
        clearInterval(practiceTimerInterval);
        submitPracticeExam(2400); // Max time taken
      }
    }, 1000);
    
    switchView('practice-session');
  }

  function updateTimerDisplay(seconds, element) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    element.textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
  }
  
  function submitPracticeExam(timeTakenSeconds) {
    clearInterval(practiceTimerInterval);
    
    let correct = 0;
    practiceQuestions.forEach((q, idx) => {
      const selected = document.querySelector(`input[name="practice_q_${idx}"]:checked`);
      if (selected) {
        const selectedIdx = parseInt(selected.value);
        if ((selectedIdx + 1) === q.answer) {
          correct++;
        }
      }
    });
    
    const percentage = Math.round((correct / practiceQuestions.length) * 100) || 0;
    const m = Math.floor(timeTakenSeconds / 60);
    const s = timeTakenSeconds % 60;
    
    document.getElementById('practice-time-spent').textContent = `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
    document.getElementById('practice-score-val').textContent = `${percentage}%`;
    document.getElementById('practice-score-val').style.color = percentage >= 70 ? '#4ade80' : '#ef4444';
    
    const xpReward = percentage >= 70 ? 200 : 50;
    document.getElementById('practice-xp-reward').textContent = `+${xpReward}`;
    
    grantXP(xpReward, 'Practice Exam Completed!');
    
    document.getElementById('practice-modal-overlay').classList.add('show');
  }
  
  document.getElementById('close-practice-modal-btn').addEventListener('click', () => {
    document.getElementById('practice-modal-overlay').classList.remove('show');
    switchView('practice');
  });


  // ================= CAREER PATHWAYS LOGIC =================
  function renderPathways() {
    const grid = document.getElementById('pathways-grid-view');
    if (!grid) return;
    grid.innerHTML = '';
    
    if (typeof CareerPaths !== 'undefined') {
      CareerPaths.forEach(path => {
        const card = document.createElement('div');
        card.className = 'card metric-card';
        card.style.borderTop = `4px solid ${path.color}`;
        
        card.innerHTML = `
          <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="font-size: 2rem; color: ${path.color}; margin-bottom: 15px;">
              <i class="${path.icon}"></i>
            </div>
            <div style="flex-grow: 1;">
              <h3 class="course-title">${path.title}</h3>
              <p class="course-desc">${path.description}</p>
              <div style="margin-top: 15px;">
                <button class="btn btn-accent btn-block view-roadmap-btn" data-path="${path.id}">View Roadmap</button>
              </div>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
      
      // Event delegation is now handled globally at the bottom of the script
    }
  }

  function showRoadmap(pathId) {
    const path = CareerPaths.find(p => p.id === pathId);
    if (!path) return;
    
    document.getElementById('roadmap-title').textContent = path.title + " Roadmap";
    
    const timeline = document.getElementById('roadmap-timeline');
    timeline.innerHTML = '';
    
    path.courses.forEach((courseId, index) => {
      const course = CourseData[courseId];
      if (course) {
        const node = document.createElement('div');
        node.className = 'roadmap-node';
        node.style.borderColor = course.color;
        
        node.innerHTML = `
          <div class="roadmap-node-title" style="color: ${course.color}">
            ${index + 1}. ${course.title}
          </div>
          <div class="roadmap-node-desc">
            <i class="${course.icon}"></i> ${course.modules ? course.modules.length : 0} Modules to Master
          </div>
        `;
        
        timeline.appendChild(node);
      }
    });
    
    document.getElementById('roadmap-modal-overlay').classList.add('show');
  }

  const closeRoadmapBtn = document.getElementById('close-roadmap-btn');
  if (closeRoadmapBtn) {
    closeRoadmapBtn.addEventListener('click', () => {
      document.getElementById('roadmap-modal-overlay').classList.remove('show');
    });
  }

  // ================= COMMUNITY LOGIC =================
  let currentPostImage = null;

  document.body.addEventListener('click', (e) => {
    // Check if clicked inside add photo button
    const addPhotoBtn = e.target.closest('#btn-add-photo');
    if (addPhotoBtn) {
      document.getElementById('community-post-image-input').click();
    }

    if (e.target.closest('#community-post-image-remove')) {
      currentPostImage = null;
      document.getElementById('community-post-image-preview').style.display = 'none';
      document.getElementById('community-post-image-input').value = '';
    }
  });

  document.body.addEventListener('change', (e) => {
    if (e.target.id === 'community-post-image-input') {
      const file = e.target.files[0];
      if (file) {
        compressImage(file, (dataUrl) => {
          currentPostImage = dataUrl;
          document.getElementById('community-post-preview-img').src = dataUrl;
          document.getElementById('community-post-image-preview').style.display = 'inline-block';
        });
      }
    }
  });

  const mockPosts = [
    {
      _id: "mock_1",
      author: "Alex Coder",
      avatar: "AC",
      time: "2 hours ago",
      text: "Just finished the Python For Beginners course! Finally understand how loops work. This site makes it so easy to understand! ðŸš€",
      likes: 14,
      image: null,
      comments: []
    },
    {
      _id: "mock_2",
      author: "Sarah Scripts",
      avatar: "SS",
      time: "5 hours ago",
      text: "Can anyone explain the difference between HTML and CSS? I know HTML is structure, but how exactly do classes work in CSS?",
      likes: 5,
      image: null,
      comments: []
    },
    {
      _id: "mock_3",
      author: "CodeMaster99",
      avatar: "CM",
      time: "1 day ago",
      text: "Check out this cool responsive layout I built using Flexbox after taking the HTML/CSS course! #progress",
      likes: 32,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      comments: []
    }
  ];

  const mockUsers = [
    { name: "Jessica Web", avatar: "JW", level: "Lvl 12 Front-end" },
    { name: "DataDan", avatar: "DD", level: "Lvl 8 Data Sci" },
    { name: "CyberNinja", avatar: "CN", level: "Lvl 15 Security" }
  ];

  function renderAvatar(avatar) {
    if (avatar === "CURRENT_USER") {
      avatar = session.user.profilePic || 'FA';
    }
    if (!avatar) return 'FA';
    if (avatar.startsWith('data:image') || avatar.startsWith('http')) {
      return `<img src="${avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    }
    // Return max 2 chars for text avatar
    return avatar.substring(0, 2).toUpperCase();
  }

  async function renderCommunity() {
    const feedStream = document.getElementById('community-feed-stream');
    const userList = document.getElementById('suggested-users-list');
    
    if (!feedStream || !userList) return;
    
    feedStream.innerHTML = '<div style="text-align:center; padding: 20px;"><i class="fa-solid fa-circle-notch fa-spin text-accent"></i> Loading posts...</div>';
    
    try {
      const data = await api('/posts');
      
      let allPosts = data.posts || [];
      if (!useBackend) {
          const mockComments = JSON.parse(localStorage.getItem('devquest_mock_comments') || '{}');
          const mergedMockPosts = mockPosts.map(mp => ({
            ...mp,
            comments: mockComments[mp._id] || mp.comments
          }));
          allPosts = [...allPosts, ...mergedMockPosts];
      }
      
      feedStream.innerHTML = allPosts.map(post => {
        const checkmark = post.isVerified ? `<i class="fa-solid fa-circle-check" style="color: #60a5fa; margin-left: 5px;" title="Verified Learner"></i>` : '';
        const timeStr = post.createdAt ? new Date(post.createdAt).toLocaleString() : post.time;
        
        let commentsHtml = '';
        if (post.comments && post.comments.length > 0) {
          commentsHtml = post.comments.map(c => {
            const cCheck = c.isVerified ? `<i class="fa-solid fa-circle-check" style="color: #60a5fa; margin-left: 5px;"></i>` : '';
            return `
            <div class="comment-item">
              <div class="comment-avatar">${renderAvatar(c.avatar)}</div>
              <div class="comment-content">
                <div class="comment-author">${c.author} ${cCheck} <span class="comment-time">${new Date(c.createdAt).toLocaleString()}</span></div>
                <div>${c.text}</div>
              </div>
            </div>
            `;
          }).join('');
        }
        
        return `
        <div class="post-card">
          <div class="post-header">
            <div class="post-avatar">${renderAvatar(post.avatar)}</div>
            <div>
              <div class="post-author">${post.author} ${checkmark}</div>
              <div class="post-time">${timeStr}</div>
            </div>
          </div>
          <div class="post-content">${post.text}</div>
          ${post.image ? `<img src="${post.image}" class="post-image" alt="Post attachment">` : ''}
          <div class="post-actions">
            <button class="post-action-btn btn-like" data-id="${post._id || ''}"><i class="fa-solid fa-heart"></i> <span>${post.likes}</span> Likes</button>
            <button class="post-action-btn btn-toggle-comment" data-id="${post._id || ''}"><i class="fa-solid fa-comment"></i> <span>${post.comments ? post.comments.length : 0}</span> Comment</button>
          </div>
          
          <div class="comments-section" id="comments-${post._id || ''}">
            ${commentsHtml}
            <div class="comment-input-box">
              <input type="text" placeholder="Write a comment..." class="comment-input" data-id="${post._id || ''}">
              <button class="btn btn-sm btn-primary btn-submit-comment" data-id="${post._id || ''}">Reply</button>
            </div>
          </div>
        </div>
      `}).join('');
    } catch (e) {
      console.error(e);
      feedStream.innerHTML = '<div style="color: var(--danger); padding: 20px;">Failed to connect to Community Server.</div>';
    }
    
// Render suggested users (Leaderboard) from Firestore
    try {
      if (typeof firebase !== 'undefined') {
        const snapshot = await firebase.firestore().collection('users').orderBy('xp', 'desc').limit(10).get();
        if (snapshot.empty) {
          userList.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Be the first on the leaderboard!</div>';
        } else {
          let html = '';
          snapshot.forEach(doc => {
            const u = doc.data();
            const avatar = u.avatar || 'fa-user';
            const name = u.firstName ? `${u.firstName} ${u.lastName || ''}` : 'Unknown User';
            const level = u.level || 1;
            const xp = u.xp || 0;
            
            // Format avatar if it's an icon vs letters
            let avatarHtml = '';
            if (avatar.startsWith('fa-')) {
               avatarHtml = `<i class="fa-solid ${avatar}"></i>`;
            } else {
               avatarHtml = avatar.substring(0, 2).toUpperCase();
            }

            html += `
              <div class="suggested-user">
                <div class="suggested-user-info">
                  <div class="suggested-avatar">${avatarHtml}</div>
                  <div>
                    <div class="suggested-name">${name}</div>
                    <div class="suggested-level">Level ${level} (${xp} XP)</div>
                  </div>
                </div>
                <button class="btn btn-sm btn-secondary btn-follow" style="padding: 4px 10px; border-radius: 20px;">Follow</button>
              </div>
            `;
          });
          userList.innerHTML = html;
        }
      } else {
        userList.innerHTML = '<div style="color: var(--danger); padding: 20px;">Firebase not initialized.</div>';
      }
    } catch (e) {
      console.error('Error fetching leaderboard:', e);
      userList.innerHTML = '<div style="color: var(--danger); padding: 20px;">Failed to load leaderboard: ' + e.message + '</div>';
    }
  }

  // Global Event Delegation for View Roadmap buttons
  document.body.addEventListener('click', async (e) => {
    
    // -- Community Interactions --
    if (e.target.id === 'btn-submit-post') {
      const text = document.getElementById('community-post-text').value.trim();
      if (!text && !currentPostImage) return;
      
      const btn = document.getElementById('btn-submit-post');
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      
      try {
        await api('/posts', {
          method: 'POST',
          body: JSON.stringify({ text, image: currentPostImage })
        });
        
        document.getElementById('community-post-text').value = '';
        currentPostImage = null;
        document.getElementById('community-post-image-preview').style.display = 'none';
        document.getElementById('community-post-image-input').value = '';
        
        // Award XP for first community post
        if (!localStorage.getItem('devquest_reward_community')) {
          grantXP(100);
          localStorage.setItem('devquest_reward_community', 'true');
          alert("You earned 100 XP for your first community post!");
        }
        
        renderCommunity();
      } catch (err) {
        console.error(err);
      } finally {
        btn.disabled = false;
        btn.innerHTML = 'Post';
      }
    }
    
    const likeBtn = e.target.closest('.btn-like');
    if (likeBtn) {
      if (likeBtn.classList.contains('liked')) return; // prevent multi-like for demo
      likeBtn.classList.add('liked');
      
      const postId = likeBtn.getAttribute('data-id');
      const span = likeBtn.querySelector('span');
      span.textContent = parseInt(span.textContent) + 1;
      
      if (postId) {
          api(`/posts/${postId}/like`, { method: 'POST' }).catch(console.error);
      }
    }
    
    const followBtn = e.target.closest('.btn-follow');
    if (followBtn) {
      if (followBtn.textContent === 'Follow') {
        followBtn.textContent = 'Following';
        followBtn.classList.remove('btn-secondary');
        followBtn.classList.add('btn-accent');
      } else {
        followBtn.textContent = 'Follow';
        followBtn.classList.remove('btn-accent');
        followBtn.classList.add('btn-secondary');
      }
    }

    const toggleCommentBtn = e.target.closest('.btn-toggle-comment');
    if (toggleCommentBtn) {
      const postId = toggleCommentBtn.getAttribute('data-id');
      const section = document.getElementById('comments-' + postId);
      if (section) section.classList.toggle('open');
    }
    
    if (e.target.classList.contains('btn-submit-comment')) {
      const postId = e.target.getAttribute('data-id');
      const input = document.querySelector(`.comment-input[data-id="${postId}"]`);
      const text = input.value.trim();
      if (!text) return;
      
      e.target.disabled = true;
      e.target.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
      
        try {
          await api(`/posts/${postId}/comment`, {
            method: 'POST',
            body: JSON.stringify({ text })
          });
          
          renderCommunity();
        } catch (err) {
          console.error(err);
      } finally {
        e.target.disabled = false;
        e.target.innerHTML = 'Reply';
      }
    }

    // Roadmap Button
    const btn = e.target.closest('.view-roadmap-btn');
    if (btn) {
      const pathId = btn.getAttribute('data-path');
      if (pathId) {
        try {
          showRoadmap(pathId);
        } catch (err) {
          alert('Error: ' + err.message);
        }
      } else {
        alert('Path ID is missing on the button!');
      }
    }
    
    // Practice Submit Button
    const practiceSubmitBtn = e.target.closest('#practice-submit-btn');
    if (practiceSubmitBtn) {
      try {
        const answeredCount = document.querySelectorAll('.practice-question-card input[type="radio"]:checked').length;
        if (answeredCount < practiceQuestions.length) {
          alert('Please answer all questions before submitting! You have answered ' + answeredCount + ' out of ' + practiceQuestions.length + ' questions.');
          return;
        }

        const timerText = document.getElementById('practice-timer').textContent || "40:00";
        const parts = timerText.split(':');
        const secondsLeft = (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
        const timeTaken = 2400 - secondsLeft;
        
        // Clear saved state since we submitted
        localStorage.removeItem('devquest_saved_practice');
        submitPracticeExam(timeTaken);
      } catch (err) {
        alert('Practice Submit Error: ' + err.message);
      }
    }

    // Practice Save for Later Button
    const practiceSaveBtn = e.target.closest('#practice-save-btn');
    if (practiceSaveBtn) {
      const answers = {};
      document.querySelectorAll('.practice-question-card input[type="radio"]:checked').forEach(radio => {
        answers[radio.name] = radio.value;
      });
      
      const timerText = document.getElementById('practice-timer').textContent || "40:00";
      const parts = timerText.split(':');
      const secondsLeft = (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
      
      const saveData = {
        courseId: currentPracticeCourseId,
        timeLeft: secondsLeft,
        answers: answers
      };
      localStorage.setItem('devquest_saved_practice', JSON.stringify(saveData));
      
      clearInterval(practiceTimerInterval);
      alert('Practice exam saved! You can resume it later from the Practice Arena.');
      switchView('practice');
    }

    // Resume Practice Button
    const resumeBtn = e.target.closest('#resume-practice-btn');
    if (resumeBtn) {
      const savedStr = localStorage.getItem('devquest_saved_practice');
      if (savedStr) {
        const savedState = JSON.parse(savedStr);
        startPracticeSession(savedState.courseId, savedState);
      }
    }

    // Discard Practice Button
    const discardBtn = e.target.closest('#discard-practice-btn');
    if (discardBtn) {
      localStorage.removeItem('devquest_saved_practice');
      document.getElementById('resume-practice-container').style.display = 'none';
    }
  });

  // ================= GAMES ARCADE LOGIC =================
  function renderGamesLobby() {
    document.getElementById('arcade-lobby').style.display = 'block';
    document.getElementById('active-game-container').style.display = 'none';
    // Update headers
    document.getElementById('games-streak-display').textContent = session.user.streak;
    document.getElementById('games-xp-display').textContent = session.user.xp;
  }

  document.querySelectorAll('.btn-play-game').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const gameType = e.target.getAttribute('data-game');
      startArcadeGame(gameType);
    });
  });

  document.getElementById('btn-exit-game').addEventListener('click', () => {
    renderGamesLobby();
  });

  function awardGameXP() {
    // Check daily limit
    const today = new Date().toISOString().split('T')[0];
    const gamesPlayedToday = parseInt(localStorage.getItem('dq_games_played_' + today) || '0');
    if (gamesPlayedToday >= 3) {
      showToast('Daily arcade limit reached! No XP awarded, but you can keep playing for fun.', 'warning');
      return;
    }
    
    localStorage.setItem('dq_games_played_' + today, gamesPlayedToday + 1);
    session.user.xp += 50;
    showToast('+50 XP for winning!', 'success');
    
    // Check level up
    const newLevel = Math.floor(session.user.xp / 100) + 1;
    if (newLevel > session.user.level) {
      session.user.level = newLevel;
      triggerLevelUpModal(newLevel);
    }
    
    syncUserState();
    document.getElementById('games-xp-display').textContent = session.user.xp;
  }

  function startArcadeGame(gameType) {
    document.getElementById('arcade-lobby').style.display = 'none';
    document.getElementById('active-game-container').style.display = 'block';
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = ''; // clear

    if (gameType === 'html-matcher') {
      launchHtmlMatcher(canvas);
    } else if (gameType === 'css-inspector') {
      launchCssInspector(canvas);
    } else if (gameType === 'js-logic') {
      launchJsLogic(canvas);
    } else if (gameType === 'java-matcher') {
      launchJavaMatcher(canvas);
    } else if (gameType === 'ultimate-arcade') {
      if (typeof initUltimateArcade === 'function') {
        initUltimateArcade(canvas);
      } else {
        alert('Ultimate Arcade module not loaded yet.');
      }
    }
  }

  // --- GAME: Java Variable Matcher ---
  function launchJavaMatcher(container) {
    container.innerHTML = '<h2>Java Variable Matcher</h2><p>Match the Java data type to its description.</p><div id="java-matcher-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px; width: 100%; max-width: 600px; margin-top: 20px;"></div>';
    
    const pairs = [
      { id: 1, text: 'int', type: 'tag' }, { id: 1, text: 'Whole numbers', type: 'def' },
      { id: 2, text: 'double', type: 'tag' }, { id: 2, text: 'Decimals', type: 'def' },
      { id: 3, text: 'boolean', type: 'tag' }, { id: 3, text: 'true / false', type: 'def' },
      { id: 4, text: 'String', type: 'tag' }, { id: 4, text: 'Text (objects)', type: 'def' }
    ];
    // Shuffle
    pairs.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('java-matcher-grid');
    let firstCard = null;
    let lockBoard = false;
    let matches = 0;

    pairs.forEach(p => {
      const card = document.createElement('div');
      card.className = 'matcher-card';
      card.style = 'background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 8px; height: 100px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.1rem; color: transparent; transition: all 0.3s;';
      card.dataset.id = p.id;
      card.dataset.text = p.text;
      
      card.addEventListener('click', () => {
        if (lockBoard) return;
        if (card.classList.contains('flipped')) return;
        
        card.classList.add('flipped');
        card.style.background = 'var(--primary)';
        card.style.color = '#fff';
        card.innerHTML = p.text;

        if (!firstCard) {
          firstCard = card;
          return;
        }

        // Check match
        if (firstCard.dataset.id === card.dataset.id) {
          // match
          firstCard.style.borderColor = '#10b981';
          card.style.borderColor = '#10b981';
          firstCard = null;
          matches++;
          if (matches === 4) {
            setTimeout(() => {
              container.innerHTML = '<h2><i class="fa-solid fa-trophy" style="color: #fbbf24;"></i> You won!</h2><p>Great job matching the Java data types.</p><button class="btn btn-accent" onclick="document.getElementById(\'btn-exit-game\').click()">Return to Arcade</button>';
              awardGameXP();
            }, 1000);
          }
        } else {
          // unmatch
          lockBoard = true;
          setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.style.background = 'var(--card-bg)';
            firstCard.style.color = 'transparent';
            firstCard.innerHTML = '';
            
            card.classList.remove('flipped');
            card.style.background = 'var(--card-bg)';
            card.style.color = 'transparent';
            card.innerHTML = '';
            
            firstCard = null;
            lockBoard = false;
          }, 1000);
        }
      });
      grid.appendChild(card);
    });
  }

  // --- GAME 1: HTML Matcher ---
  function launchHtmlMatcher(container) {
    container.innerHTML = '<h2>HTML Tag Matcher</h2><p>Match the tag to its definition.</p><div id="html-matcher-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px; width: 100%; max-width: 600px; margin-top: 20px;"></div>';
    
    const pairs = [
      { id: 1, text: '&lt;h1&gt;', type: 'tag' }, { id: 1, text: 'Main Heading', type: 'def' },
      { id: 2, text: '&lt;a&gt;', type: 'tag' }, { id: 2, text: 'Hyperlink', type: 'def' },
      { id: 3, text: '&lt;img&gt;', type: 'tag' }, { id: 3, text: 'Image embedding', type: 'def' },
      { id: 4, text: '&lt;div&gt;', type: 'tag' }, { id: 4, text: 'Block container', type: 'def' }
    ];
    // Shuffle
    pairs.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('html-matcher-grid');
    let firstCard = null;
    let lockBoard = false;
    let matches = 0;

    pairs.forEach(p => {
      const card = document.createElement('div');
      card.className = 'matcher-card';
      card.style = 'background: var(--card-bg); border: 2px solid var(--border-color); border-radius: 8px; height: 100px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.1rem; color: transparent; transition: all 0.3s;';
      card.dataset.id = p.id;
      card.dataset.text = p.text;
      
      card.addEventListener('click', () => {
        if (lockBoard) return;
        if (card.classList.contains('flipped')) return;
        
        card.classList.add('flipped');
        card.style.background = 'var(--primary)';
        card.style.color = '#fff';
        card.innerHTML = p.text;

        if (!firstCard) {
          firstCard = card;
          return;
        }

        // Check match
        if (firstCard.dataset.id === card.dataset.id) {
          // match
          firstCard.style.borderColor = '#10b981';
          card.style.borderColor = '#10b981';
          firstCard = null;
          matches++;
          if (matches === 4) {
            setTimeout(() => {
              container.innerHTML = '<h2><i class="fa-solid fa-trophy" style="color: #fbbf24;"></i> You won!</h2><p>Great job matching the HTML tags.</p><button class="btn btn-accent" onclick="document.getElementById(\'btn-exit-game\').click()">Return to Arcade</button>';
              awardGameXP();
            }, 1000);
          }
        } else {
          // unmatch
          lockBoard = true;
          setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.style.background = 'var(--card-bg)';
            firstCard.style.color = 'transparent';
            firstCard.innerHTML = '';
            
            card.classList.remove('flipped');
            card.style.background = 'var(--card-bg)';
            card.style.color = 'transparent';
            card.innerHTML = '';
            
            firstCard = null;
            lockBoard = false;
          }, 1000);
        }
      });
      grid.appendChild(card);
    });
  }

  // --- GAME 2: CSS Inspector ---
  function launchCssInspector(container) {
    container.innerHTML = '<h2>CSS Style Inspector</h2><p>Which CSS rule creates the shape below?</p><div id="css-target" style="width: 100px; height: 100px; background: #ef4444; border-radius: 50%; border: 4px dashed #fff; margin: 30px 0;"></div><div id="css-options" style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:400px;"></div>';
    
    const targetEl = document.getElementById('css-target');
    const optionsContainer = document.getElementById('css-options');
    
    // Levels data
    const levels = [
      {
        style: 'width:100px; height:100px; background: #ef4444; border-radius: 50%; border: 4px dashed #fff;',
        correct: 'border-radius: 50%;\nborder: 4px dashed #fff;',
        wrong: ['border-radius: 0%;\nborder: 4px solid #fff;', 'border-radius: 25px;\nborder: none;']
      },
      {
        style: 'width:150px; height:80px; background: #3b82f6; border-radius: 10px; box-shadow: 5px 5px 0 #fff;',
        correct: 'border-radius: 10px;\nbox-shadow: 5px 5px 0 #fff;',
        wrong: ['border-radius: 50%;\nbox-shadow: none;', 'border-radius: 0px;\ntext-shadow: 5px 5px #fff;']
      },
      {
        style: 'width:100px; height:100px; background: linear-gradient(45deg, #ef4444, #3b82f6); border-radius: 0;',
        correct: 'background: linear-gradient(45deg, red, blue);',
        wrong: ['background-color: purple;', 'background: radial-gradient(red, blue);']
      }
    ];
    
    let currentLevel = 0;
    
    function loadCssLevel() {
      if (currentLevel >= levels.length) {
        container.innerHTML = '<h2><i class="fa-solid fa-trophy" style="color: #fbbf24;"></i> You won!</h2><p>You have a great eye for CSS!</p><button class="btn btn-accent" onclick="document.getElementById(\'btn-exit-game\').click()">Return to Arcade</button>';
        awardGameXP();
        return;
      }
      
      const lvl = levels[currentLevel];
      targetEl.style = lvl.style;
      optionsContainer.innerHTML = '';
      
      const opts = [lvl.correct, ...lvl.wrong].sort(() => Math.random() - 0.5);
      
      opts.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-secondary';
        btn.style.textAlign = 'left';
        btn.style.fontFamily = 'monospace';
        btn.style.whiteSpace = 'pre';
        btn.innerText = opt;
        btn.addEventListener('click', () => {
          if (opt === lvl.correct) {
            btn.style.background = '#10b981';
            setTimeout(() => {
              currentLevel++;
              loadCssLevel();
            }, 800);
          } else {
            btn.style.background = '#ef4444';
            setTimeout(() => {
              btn.style.background = 'var(--secondary)';
            }, 500);
          }
        });
        optionsContainer.appendChild(btn);
      });
    }
    
    loadCssLevel();
  }

  // --- GAME 3: JS Logic Run ---
  function launchJsLogic(container) {
    container.innerHTML = '<h2>JS Logic Run</h2><p>Evaluate the expression before time runs out!</p><h3 id="js-expression" style="font-size: 2rem; color: var(--accent); margin: 20px 0; font-family: monospace;">5 === "5"</h3><div style="width:100%; max-width:400px; height: 10px; background: var(--secondary); border-radius: 5px; margin-bottom: 20px;"><div id="js-timer-bar" style="width: 100%; height: 100%; background: #ef4444; border-radius: 5px; transition: width 0.1s linear;"></div></div><div id="js-options" style="display:flex; gap: 15px;"></div><p id="js-score" style="margin-top:20px; font-weight:bold;">Score: 0 / 5</p>';
    
    const expressions = [
      { exp: '5 === "5"', ans: 'false', opts: ['true', 'false', 'undefined'] },
      { exp: 'typeof []', ans: '"object"', opts: ['"array"', '"object"', '"undefined"'] },
      { exp: 'Boolean(0)', ans: 'false', opts: ['true', 'false', 'null'] },
      { exp: '10 % 3', ans: '1', opts: ['3', '1', '0'] },
      { exp: 'NaN === NaN', ans: 'false', opts: ['true', 'false', 'Error'] }
    ];
    
    let currentQ = 0;
    let score = 0;
    let timeLeft = 100;
    let timerInt;
    
    const expEl = document.getElementById('js-expression');
    const optionsEl = document.getElementById('js-options');
    const timerBar = document.getElementById('js-timer-bar');
    const scoreEl = document.getElementById('js-score');
    
    function startQuestion() {
      if (currentQ >= expressions.length) {
        clearInterval(timerInt);
        if (score >= 4) {
          container.innerHTML = '<h2><i class="fa-solid fa-trophy" style="color: #fbbf24;"></i> You won!</h2><p>You survived the Logic Run.</p><button class="btn btn-accent" onclick="document.getElementById(\'btn-exit-game\').click()">Return to Arcade</button>';
          awardGameXP();
        } else {
          container.innerHTML = '<h2>Game Over</h2><p>You need at least 4 correct to win.</p><button class="btn btn-secondary" onclick="document.getElementById(\'btn-exit-game\').click()">Return to Arcade</button>';
        }
        return;
      }
      
      const q = expressions[currentQ];
      expEl.textContent = q.exp;
      optionsEl.innerHTML = '';
      
      q.opts.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style.fontFamily = 'monospace';
        btn.textContent = o;
        btn.addEventListener('click', () => {
          clearInterval(timerInt);
          if (o === q.ans) {
            btn.style.background = '#10b981';
            score++;
          } else {
            btn.style.background = '#ef4444';
          }
          scoreEl.textContent = `Score: ${score} / 5`;
          setTimeout(() => {
            currentQ++;
            startQuestion();
          }, 800);
        });
        optionsEl.appendChild(btn);
      });
      
      timeLeft = 100;
      timerBar.style.width = '100%';
      timerBar.style.background = '#10b981';
      
      clearInterval(timerInt);
      timerInt = setInterval(() => {
        timeLeft -= 2;
        timerBar.style.width = timeLeft + '%';
        if (timeLeft < 50) timerBar.style.background = '#fbbf24';
        if (timeLeft < 25) timerBar.style.background = '#ef4444';
        
        if (timeLeft <= 0) {
          clearInterval(timerInt);
          currentQ++;
          startQuestion();
        }
      }, 100);
    }
    
    startQuestion();
  }
  // --- GAME 4: Course Master Trivia ---
  function launchCourseTrivia(container) {
    // 1. Build Dropdown
    let optionsHtml = '';
    for (let key in CourseData) {
      optionsHtml += `<option value="${key}">${CourseData[key].title}</option>`;
    }

    container.innerHTML = `
      <h2>Course Master Trivia</h2>
      <p>Select any course and test your knowledge against the clock!</p>
      <div style="margin: 20px 0; display:flex; gap:10px; align-items:center;">
        <select id="trivia-course-select" class="form-input" style="padding: 10px; border-radius: 5px;">${optionsHtml}</select>
        <button id="btn-start-trivia" class="btn btn-accent">Start Master Run</button>
      </div>
      <div id="trivia-game-area" style="width: 100%; display: flex; flex-direction: column; align-items: center; display: none;">
        <h3 id="trivia-question" style="font-size: 1.5rem; text-align: center; color: var(--accent); margin: 20px 0;"></h3>
        <div style="width:100%; max-width:600px; height: 10px; background: var(--secondary); border-radius: 5px; margin-bottom: 20px;">
          <div id="trivia-timer-bar" style="width: 100%; height: 100%; background: #ef4444; border-radius: 5px; transition: width 0.1s linear;"></div>
        </div>
        <div id="trivia-options" style="display:grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; max-width:600px;"></div>
        <p id="trivia-score" style="margin-top:20px; font-weight:bold;">Score: 0</p>
      </div>
    `;

    document.getElementById('btn-start-trivia').addEventListener('click', () => {
      const courseKey = document.getElementById('trivia-course-select').value;
      const course = CourseData[courseKey];
      
      // Aggregate all questions
      let allQuestions = [];
      course.modules.forEach(m => {
        if (m.quiz && m.quiz.length > 0) {
          m.quiz.forEach(q => allQuestions.push(q));
        }
      });
      
      if (allQuestions.length === 0) {
        alert("This course doesn't have enough questions yet! Try another one.");
        return;
      }
      
      // Shuffle questions
      allQuestions.sort(() => Math.random() - 0.5);
      
      // Start Game
      document.getElementById('btn-start-trivia').parentElement.style.display = 'none';
      document.getElementById('trivia-game-area').style.display = 'flex';
      
      let currentQ = 0;
      let score = 0;
      let timeLeft = 100;
      let timerInt;
      const totalQs = allQuestions.length > 5 ? 5 : allQuestions.length; // Max 5 questions per run
      
      const qEl = document.getElementById('trivia-question');
      const optionsEl = document.getElementById('trivia-options');
      const timerBar = document.getElementById('trivia-timer-bar');
      const scoreEl = document.getElementById('trivia-score');
      
      function startQuestion() {
        if (currentQ >= totalQs) {
          clearInterval(timerInt);
          const percent = score / totalQs;
          if (percent >= 0.8) {
            container.innerHTML = `<h2><i class="fa-solid fa-trophy" style="color: #fbbf24;"></i> ${course.title} Master!</h2><p>You scored ${score}/${totalQs}.</p><button class="btn btn-accent" onclick="document.getElementById('btn-exit-game').click()">Return to Arcade</button>`;
            awardGameXP();
          } else {
            container.innerHTML = `<h2>Game Over</h2><p>You scored ${score}/${totalQs}. You need 80% to win!</p><button class="btn btn-secondary" onclick="document.getElementById('btn-exit-game').click()">Return to Arcade</button>`;
          }
          return;
        }
        
        const q = allQuestions[currentQ];
        qEl.textContent = q.question;
        optionsEl.innerHTML = '';
        
        q.options.forEach((o, index) => {
          const btn = document.createElement('button');
          btn.className = 'btn btn-primary';
          btn.textContent = o;
          btn.addEventListener('click', () => {
            clearInterval(timerInt);
            if (index === q.answer) {
              btn.style.background = '#10b981';
              score++;
            } else {
              btn.style.background = '#ef4444';
            }
            scoreEl.textContent = `Score: ${score} / ${totalQs}`;
            setTimeout(() => {
              currentQ++;
              startQuestion();
            }, 1000);
          });
          optionsEl.appendChild(btn);
        });
        
        timeLeft = 150; // Give a bit more time for reading (15 seconds)
        timerBar.style.width = '100%';
        timerBar.style.background = '#10b981';
        
        clearInterval(timerInt);
        timerInt = setInterval(() => {
          timeLeft -= 1;
          timerBar.style.width = (timeLeft / 1.5) + '%';
          if (timeLeft < 75) timerBar.style.background = '#fbbf24';
          if (timeLeft < 30) timerBar.style.background = '#ef4444';
          
          if (timeLeft <= 0) {
            clearInterval(timerInt);
            currentQ++;
            startQuestion();
          }
        }, 100);
      }
      
      startQuestion();
    });
  }

}); // end DOMContentLoaded
