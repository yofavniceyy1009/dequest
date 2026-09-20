/*
 * Financial Coach AI - Local State Manager & Encryption Simulation
 * Handles local user authentication and state persistence.
 */

const STATE_KEY_PREFIX = 'fin_coach_';
const SESSION_USER_KEY = 'fin_coach_current_user';

// Simple encryption helper to satisfy security and privacy constraints on client side
const Encryption = {
  encrypt(data) {
    try {
      const jsonStr = JSON.stringify(data);
      // UTF-8 base64 encoding as a simple privacy layer
      return btoa(encodeURIComponent(jsonStr));
    } catch (e) {
      console.error('Encryption error:', e);
      return '';
    }
  },

  decrypt(cipherText) {
    try {
      if (!cipherText) return null;
      const decodedStr = decodeURIComponent(atob(cipherText));
      return JSON.parse(decodedStr);
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  }
};

const DefaultSeedData = {
  income: {
    salary: 5800,
    other: 350
  },
  savings: 14200,
  debts: [
    { id: 'debt_1', name: 'Student Loan', balance: 14500, minPayment: 180, interestRate: 4.5 },
    { id: 'debt_2', name: 'Auto Loan', balance: 8200, minPayment: 240, interestRate: 3.8 }
  ],
  expenses: [
    { id: 'exp_1', name: 'Rent', amount: 1650, category: 'Housing', isRecurring: true },
    { id: 'exp_2', name: 'Electricity & Gas', amount: 180, category: 'Utilities', isRecurring: true },
    { id: 'exp_3', name: 'Groceries', amount: 450, category: 'Food', isRecurring: false },
    { id: 'exp_4', name: 'Car Payment', amount: 240, category: 'Transportation', isRecurring: true },
    { id: 'exp_5', name: 'Auto Insurance', amount: 130, category: 'Transportation', isRecurring: true },
    { id: 'exp_6', name: 'Gym Membership', amount: 65, category: 'Health & Wellness', isRecurring: true },
    { id: 'exp_7', name: 'Dining Out & Delivery', amount: 290, category: 'Food', isRecurring: false },
    { id: 'exp_8', name: 'Subscriptions', amount: 55, category: 'Entertainment', isRecurring: true },
    { id: 'exp_9', name: 'Shopping & Clothes', amount: 320, category: 'Shopping', isRecurring: false },
    { id: 'exp_10', name: 'Concert & Cinema', amount: 140, category: 'Entertainment', isRecurring: false }
  ],
  budgets: [
    { category: 'Housing', limit: 1700 },
    { category: 'Utilities', limit: 250 },
    { category: 'Food', limit: 800 },
    { category: 'Transportation', limit: 450 },
    { category: 'Health & Wellness', limit: 150 },
    { category: 'Entertainment', limit: 300 },
    { category: 'Shopping', limit: 400 }
  ],
  goals: [
    { id: 'goal_1', name: 'Emergency Fund', target: 20000, current: 10000, monthlyContribution: 400, targetDate: '2027-08-31' },
    { id: 'goal_2', name: 'Hawaiian Vacation', target: 6000, current: 3000, monthlyContribution: 250, targetDate: '2026-12-15' },
    { id: 'goal_3', name: 'Pay Off Student Loan', target: 14500, current: 0, monthlyContribution: 150, targetDate: '2029-05-30' }
  ]
};

const DefaultBlankData = {
  income: {
    salary: 0,
    other: 0
  },
  savings: 0,
  debts: [],
  expenses: [],
  budgets: [
    { category: 'Housing', limit: 0 },
    { category: 'Utilities', limit: 0 },
    { category: 'Food', limit: 0 },
    { category: 'Transportation', limit: 0 },
    { category: 'Health & Wellness', limit: 0 },
    { category: 'Entertainment', limit: 0 },
    { category: 'Shopping', limit: 0 }
  ],
  goals: []
};

const StateManager = {
  // Authentication methods
  register(username, password) {
    const users = this._getUsersList();
    if (users.includes(username.toLowerCase())) {
      return { success: false, message: 'Username already exists' };
    }

    // Add user and save initial profile
    users.push(username.toLowerCase());
    localStorage.setItem(STATE_KEY_PREFIX + 'users', JSON.stringify(users));

    const userHash = this._hashPassword(password);
    const userState = {
      username: username,
      passwordHash: userHash,
      createdAt: new Date().toISOString(),
      financials: JSON.parse(JSON.stringify(DefaultBlankData)) // Starts empty for new accounts!
    };

    this._saveUserState(username, userState);
    return { success: true };
  },

  login(username, password) {
    const users = this._getUsersList();
    const cleanUser = username.toLowerCase();
    if (!users.includes(cleanUser)) {
      return { success: false, message: 'User not found' };
    }

    const userState = this._getUserState(cleanUser);
    if (!userState) {
      return { success: false, message: 'Invalid profile data' };
    }

    const inputHash = this._hashPassword(password);
    if (userState.passwordHash !== inputHash) {
      return { success: false, message: 'Incorrect password' };
    }

    // Set active session
    localStorage.setItem(SESSION_USER_KEY, cleanUser);
    return { success: true, user: userState.username };
  },

  logout() {
    localStorage.removeItem(SESSION_USER_KEY);
  },

  getCurrentUser() {
    return localStorage.getItem(SESSION_USER_KEY);
  },

  getFinancials() {
    const activeUser = this.getCurrentUser();
    if (!activeUser) return null;

    const userState = this._getUserState(activeUser);
    return userState ? userState.financials : null;
  },

  updateFinancials(newFinancials) {
    const activeUser = this.getCurrentUser();
    if (!activeUser) return false;

    const userState = this._getUserState(activeUser);
    if (!userState) return false;

    userState.financials = newFinancials;
    this._saveUserState(activeUser, userState);
    return true;
  },

  loadDemoData() {
    const activeUser = this.getCurrentUser();
    if (!activeUser) return false;

    const userState = this._getUserState(activeUser);
    if (!userState) return false;

    userState.financials = JSON.parse(JSON.stringify(DefaultSeedData));
    this._saveUserState(activeUser, userState);
    return true;
  },

  // Helper storage management
  _getUsersList() {
    const raw = localStorage.getItem(STATE_KEY_PREFIX + 'users');
    return raw ? JSON.parse(raw) : [];
  },

  _hashPassword(password) {
    // Simple mock hash function (for local use only)
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return 'h_' + hash;
  },

  _getUserState(username) {
    const cipher = localStorage.getItem(STATE_KEY_PREFIX + 'profile_' + username.toLowerCase());
    return Encryption.decrypt(cipher);
  },

  _saveUserState(username, stateObj) {
    const cipher = Encryption.encrypt(stateObj);
    localStorage.setItem(STATE_KEY_PREFIX + 'profile_' + username.toLowerCase(), cipher);
  }
};
