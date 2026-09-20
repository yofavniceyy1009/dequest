/*
 * Financial Coach AI - Front-End Controller
 * Manages view routing, DOM bindings, form validation, and Chart.js dashboards.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- View States & DOM Elements ---
  const authScreen = document.getElementById('auth-screen');
  const appRoot = document.getElementById('app-root');
  const appSidebar = document.getElementById('app-sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  
  // Navigation
  const navItems = document.querySelectorAll('.nav-item');
  const viewSections = document.querySelectorAll('.view-section');
  const headerViewTitle = document.getElementById('header-view-title');
  
  // Auth Elements
  const authForm = document.getElementById('auth-form');
  const authUsernameInput = document.getElementById('auth-username');
  const authPasswordInput = document.getElementById('auth-password');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authTitleText = document.getElementById('auth-title-text');
  const authSubtitleText = document.getElementById('auth-subtitle-text');
  const authToggleAction = document.getElementById('auth-toggle-action');
  const authToggleMsg = document.getElementById('auth-toggle-msg');
  let isRegisterMode = false;

  // Chart instances
  let projectionChartInstance = null;
  let categoryChartInstance = null;
  let scenarioChartInstance = null;

  // --- Session Check ---
  function initSession() {
    const currentUser = StateManager.getCurrentUser();
    if (currentUser) {
      showApplication(currentUser);
    } else {
      showAuthScreen();
    }
  }

  // --- Auth Screen Switcher ---
  authToggleAction.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {
      authTitleText.textContent = 'Create Account';
      authSubtitleText.textContent = 'Get started with Financial Coach AI';
      authSubmitBtn.textContent = 'Register & Setup';
      authToggleMsg.textContent = 'Already have an account?';
      authToggleAction.textContent = 'Sign in here';
    } else {
      authTitleText.textContent = 'Financial Coach AI';
      authSubtitleText.textContent = 'Master your money through educational guidance';
      authSubmitBtn.textContent = 'Sign In';
      authToggleMsg.textContent = "Don't have an account?";
      authToggleAction.textContent = 'Create one now';
    }
    authForm.reset();
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = authUsernameInput.value.trim();
    const password = authPasswordInput.value;

    if (isRegisterMode) {
      const regRes = StateManager.register(username, password);
      if (regRes.success) {
        // Automatically log in
        StateManager.login(username, password);
        showApplication(username);
      } else {
        alert(regRes.message);
      }
    } else {
      const loginRes = StateManager.login(username, password);
      if (loginRes.success) {
        showApplication(username);
      } else {
        alert(loginRes.message);
      }
    }
  });

  // Logout Click
  document.getElementById('logout-action-btn').addEventListener('click', () => {
    StateManager.logout();
    showAuthScreen();
  });

  // --- Application Transitions ---
  function showAuthScreen() {
    authScreen.style.display = 'flex';
    appRoot.style.display = 'none';
  }

  function showApplication(username) {
    authScreen.style.display = 'none';
    appRoot.style.display = 'flex';
    document.getElementById('display-username').textContent = username;
    document.getElementById('avatar-letters').textContent = username.substring(0, 2).toUpperCase();
    
    // Load fresh financials and sync displays
    refreshAppState();
    switchView('dashboard');
  }

  // --- SPA View Routing ---
  function switchView(viewName) {
    // Hide all views, display target
    viewSections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === `view-${viewName}`) {
        sec.classList.add('active');
      }
    });

    // Update Nav bar highlights
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      }
    });

    // Mobile sidebar auto-closing
    appSidebar.classList.remove('mobile-open');

    // Header Title and Chart Triggers
    const titles = {
      dashboard: 'Dashboard Overview',
      budget: 'Budget Planner',
      goals: 'Goal & Debt Tracker',
      calculator: 'Major Purchase Affordability',
      scenario: 'What-If Scenario Planner',
      chat: 'AI Coach Chat Interface',
      profile: 'Financial Profile Settings'
    };
    headerViewTitle.textContent = titles[viewName] || 'FinancePilot';
    
    // Render specific view assets
    if (viewName === 'dashboard') {
      renderDashboardCharts();
    } else if (viewName === 'scenario') {
      triggerScenarioUpdate();
    }
  }

  // Sidebar toggle for mobile devices
  sidebarToggle.addEventListener('click', () => {
    appSidebar.classList.toggle('mobile-open');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const dest = item.getAttribute('data-view');
      switchView(dest);
    });
  });

  // Connect health score widget header clicks to switch to profile or dashboard view
  document.getElementById('header-health-badge').addEventListener('click', () => {
    switchView('dashboard');
    document.getElementById('dashboard-health-detail-btn').scrollIntoView({ behavior: 'smooth' });
  });

  // --- App State Syncer & DOM Drawer ---
  function refreshAppState() {
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const summary = FinancialCalculator.summary(financials);
    const health = FinancialCalculator.calculateHealthScore(financials);

    // Toggle Onboarding Banner
    const showOnboarding = (summary.totalIncome === 0 && financials.savings === 0 && financials.expenses.length === 0);
    const onboardingBanner = document.getElementById('dashboard-onboarding-banner');
    if (onboardingBanner) {
      onboardingBanner.style.display = showOnboarding ? 'flex' : 'none';
    }

    // Update Header Health
    document.getElementById('health-score-val-header').textContent = health.score;
    const ringOffsetHeader = 88 - (88 * health.score) / 100;
    document.getElementById('health-ring-fill-header').style.strokeDashoffset = ringOffsetHeader;
    
    let label = 'Good';
    if (health.score >= 80) label = 'Excellent';
    else if (health.score >= 55) label = 'Good';
    else if (health.score >= 35) label = 'Fair';
    else label = 'Needs Attention';
    document.getElementById('health-label-header').textContent = label;

    // --- Dashboard Metrics ---
    document.getElementById('dash-income-val').textContent = formatUSD(summary.totalIncome);
    document.getElementById('dash-expenses-val').textContent = formatUSD(summary.totalExpenses);
    
    const expensePct = summary.totalIncome > 0 ? (summary.totalExpenses / summary.totalIncome) * 100 : 0;
    document.getElementById('dash-expense-pct-sub').textContent = `${expensePct.toFixed(0)}% of monthly income`;
    
    document.getElementById('dash-cashflow-val').textContent = formatUSD(summary.netCashFlow);
    if (summary.netCashFlow < 0) {
      document.getElementById('dash-cashflow-val').style.color = 'var(--danger)';
    } else {
      document.getElementById('dash-cashflow-val').style.color = 'var(--text-primary)';
    }
    
    document.getElementById('dash-savings-rate-sub').innerHTML = `<i class="fa-solid fa-piggy-bank"></i> ${summary.savingsRate.toFixed(1)}% savings rate`;
    document.getElementById('dash-savings-val').textContent = formatUSD(financials.savings);
    
    const emergencyCoverage = summary.recurringExpenses > 0 ? (financials.savings / summary.recurringExpenses) : 0;
    document.getElementById('dash-emergency-months-sub').textContent = `${emergencyCoverage.toFixed(1)} months recurring costs`;

    // --- Dashboard Health Card ---
    document.getElementById('health-score-val-main').textContent = health.score;
    const ringOffsetMain = 88 - (88 * health.score) / 100;
    document.getElementById('health-ring-fill-main').style.strokeDashoffset = ringOffsetMain;
    document.getElementById('health-label-main').textContent = label;
    
    // Set descriptive text from lowest factor
    const factorsSorted = [...health.factors].sort((a, b) => a.score - b.score);
    if (factorsSorted.length > 0 && factorsSorted[0].score < factorsSorted[0].max) {
      document.getElementById('health-desc-main').textContent = `Lowest Factor: ${factorsSorted[0].name}. ${factorsSorted[0].desc}`;
    } else {
      document.getElementById('health-desc-main').textContent = "Excellent setup! All financial variables are highly balanced.";
    }

    // --- Dashboard Goals Progress list ---
    const dashGoalsList = document.getElementById('dash-goals-list');
    dashGoalsList.innerHTML = '';
    
    if (financials.goals.length === 0) {
      dashGoalsList.innerHTML = '<div style="font-size: 0.85rem; color: var(--text-secondary); text-align: center; padding: 20px 0;">No active savings goals. Add one in the Goal Tracker.</div>';
    } else {
      financials.goals.slice(0, 3).forEach(g => {
        const pct = g.target > 0 ? Math.min(100, (g.current / g.target) * 100) : 0;
        const div = document.createElement('div');
        div.className = 'budget-progress-item';
        div.innerHTML = `
          <div class="budget-progress-header">
            <div class="budget-category-info">
              <div class="budget-category-dot" style="background-color: var(--info);"></div>
              <span>${g.name}</span>
            </div>
            <div class="budget-values">
              <span>${formatUSD(g.current)}</span> / ${formatUSD(g.target)} (${pct.toFixed(0)}%)
            </div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--info), var(--primary));"></div>
          </div>
        `;
        dashGoalsList.appendChild(div);
      });
    }

    // --- Profile Forms Population ---
    document.getElementById('prof-salary').value = financials.income.salary;
    document.getElementById('prof-other').value = financials.income.other;
    document.getElementById('prof-savings').value = financials.savings;

    // --- Populate Budget Limits selectors and table ---
    const budgetPlannerList = document.getElementById('budget-planner-list');
    budgetPlannerList.innerHTML = '';
    
    financials.budgets.forEach(b => {
      const spent = summary.categoryBreakdown[b.category] || 0;
      const pct = b.limit > 0 ? (spent / b.limit) * 100 : 0;
      let barClass = '';
      if (pct >= 100) barClass = 'danger';
      else if (pct >= 85) barClass = 'warning';

      const div = document.createElement('div');
      div.className = 'budget-progress-item';
      div.innerHTML = `
        <div class="budget-progress-header">
          <div class="budget-category-info">
            <div class="budget-category-dot" style="background-color: ${getCategoryColor(b.category)};"></div>
            <strong>${b.category}</strong>
          </div>
          <div class="budget-values">
            <span>${formatUSD(spent)}</span> of ${formatUSD(b.limit)} (${pct.toFixed(0)}%)
          </div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill ${barClass}" style="width: ${Math.min(100, pct)}%; background-color: ${getCategoryColor(b.category)};"></div>
        </div>
      `;
      budgetPlannerList.appendChild(div);
    });

    // --- Populate Transactions Table ---
    const trList = document.getElementById('transactions-list');
    trList.innerHTML = '';
    
    if (financials.expenses.length === 0) {
      trList.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-secondary);">No expenses logged yet. Add one above!</td></tr>`;
    } else {
      // Show newest first
      [...financials.expenses].reverse().forEach(exp => {
        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid var(--border-color)';
        tr.innerHTML = `
          <td style="padding: 12px; font-weight: 500;">${exp.name}</td>
          <td style="padding: 12px;"><span style="display:inline-flex; align-items:center; gap:6px; font-size: 0.8rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 4px 8px; border-radius: 12px;"><span style="width:6px; height:6px; border-radius:50%; background:${getCategoryColor(exp.category)}"></span>${exp.category}</span></td>
          <td style="padding: 12px; font-size: 0.8rem; color: var(--text-secondary);">${exp.isRecurring ? '<i class="fa-solid fa-arrows-spin"></i> Monthly Bill' : 'One-time'}</td>
          <td style="padding: 12px; text-align: right; font-weight: 600;">${formatUSD(exp.amount)}</td>
          <td style="padding: 12px; text-align: center;">
            <button class="delete-trans-btn logout-btn" data-id="${exp.id}" title="Remove Transaction" style="font-size: 0.95rem;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        `;
        trList.appendChild(tr);
      });
      
      // Bind delete buttons
      document.querySelectorAll('.delete-trans-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-id');
          financials.expenses = financials.expenses.filter(x => x.id !== id);
          StateManager.updateFinancials(financials);
          refreshAppState();
        });
      });
    }

    // --- Populate Goals Tracker Page ---
    const activeGoalsGrid = document.getElementById('active-goals-grid');
    activeGoalsGrid.innerHTML = '';
    
    if (financials.goals.length === 0) {
      activeGoalsGrid.innerHTML = `
        <div class="card" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
          <i class="fa-solid fa-bullseye" style="font-size: 3rem; margin-bottom: 16px; color: var(--text-muted);"></i>
          <p>You haven't defined any savings or debt payoff goals yet.</p>
        </div>`;
    } else {
      financials.goals.forEach((g, idx) => {
        const pct = g.target > 0 ? Math.min(100, (g.current / g.target) * 100) : 0;
        const color = idx % 2 === 0 ? 'var(--info)' : 'var(--primary)';
        
        const card = document.createElement('div');
        card.className = 'card goal-card';
        card.style.setProperty('--accent', color);
        card.innerHTML = `
          <div class="goal-card-header">
            <div>
              <h4 class="goal-title">${g.name}</h4>
              <span class="goal-target">Target: ${formatUSD(g.target)}</span>
            </div>
            <span style="font-size: 0.8rem; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 8px; font-weight:600; color: ${color};">${pct.toFixed(0)}%</span>
          </div>
          <div class="progress-bar-container goal-progress-bar">
            <div class="progress-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${color}, var(--primary));"></div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin: 10px 0;">
            <div class="goal-details-row"><span>Saved:</span> <span>${formatUSD(g.current)}</span></div>
            <div class="goal-details-row"><span>Monthly Save:</span> <span>${formatUSD(g.monthlyContribution)}/mo</span></div>
            <div class="goal-details-row"><span>Target Date:</span> <span>${g.targetDate}</span></div>
          </div>
          <div class="goal-actions">
            <button class="btn btn-secondary add-funds-goal-btn" data-id="${g.id}" style="padding: 6px 12px; font-size: 0.8rem;">Add Funds</button>
            <button class="delete-goal-btn logout-btn" data-id="${g.id}" title="Remove Goal"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        activeGoalsGrid.appendChild(card);
      });

      // Bind actions
      document.querySelectorAll('.delete-goal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          financials.goals = financials.goals.filter(x => x.id !== id);
          StateManager.updateFinancials(financials);
          refreshAppState();
        });
      });

      document.querySelectorAll('.add-funds-goal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const amtStr = prompt('Enter deposit amount ($):');
          const amt = parseFloat(amtStr);
          if (isNaN(amt) || amt <= 0) return;

          const gIdx = financials.goals.findIndex(x => x.id === id);
          if (gIdx !== -1) {
            financials.goals[gIdx].current += amt;
            // Also deduct from general savings pool
            financials.savings = Math.max(0, financials.savings - amt);
            StateManager.updateFinancials(financials);
            refreshAppState();
          }
        });
      });
    }

    // --- Populate Debts Tracker Page ---
    const activeDebtsList = document.getElementById('active-debts-list');
    activeDebtsList.innerHTML = '';
    
    if (financials.debts.length === 0) {
      activeDebtsList.innerHTML = `<div style="text-align: center; color: var(--text-secondary); padding: 20px 0;">No active debts logged.</div>`;
    } else {
      financials.debts.forEach(d => {
        const div = document.createElement('div');
        div.className = 'budget-progress-item';
        div.innerHTML = `
          <div class="budget-progress-header">
            <div class="budget-category-info">
              <div class="budget-category-dot" style="background-color: var(--danger);"></div>
              <strong>${d.name}</strong> <span style="font-size: 0.8rem; color: var(--text-secondary); margin-left: 6px;">(${d.interestRate}% Interest)</span>
            </div>
            <div class="budget-values">
              Balance: <span>${formatUSD(d.balance)}</span> | Min pay: $${d.minPayment}/mo
            </div>
          </div>
          <div style="display:flex; justify-content: flex-end; gap: 8px; margin-top: 6px;">
            <button class="btn btn-secondary pay-off-debt-btn" data-id="${d.id}" style="padding: 4px 10px; font-size: 0.75rem;">Make Extra Payment</button>
            <button class="delete-debt-btn logout-btn" data-id="${d.id}" title="Remove Debt" style="padding:4px;"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        activeDebtsList.appendChild(div);
      });

      // Bind debt actions
      document.querySelectorAll('.delete-debt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          financials.debts = financials.debts.filter(x => x.id !== id);
          StateManager.updateFinancials(financials);
          refreshAppState();
        });
      });

      document.querySelectorAll('.pay-off-debt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const amtStr = prompt('Enter payment amount ($):');
          const amt = parseFloat(amtStr);
          if (isNaN(amt) || amt <= 0) return;

          const dIdx = financials.debts.findIndex(x => x.id === id);
          if (dIdx !== -1) {
            // Deduct from balance
            financials.debts[dIdx].balance = Math.max(0, financials.debts[dIdx].balance - amt);
            // Deduct from savings pool
            financials.savings = Math.max(0, financials.savings - amt);
            // Remove if paid off
            if (financials.debts[dIdx].balance === 0) {
              alert(`Congratulations! You paid off the ${financials.debts[dIdx].name}!`);
              financials.debts.splice(dIdx, 1);
            }
            StateManager.updateFinancials(financials);
            refreshAppState();
          }
        });
      });
    }
  }

  // Quick redirect to goals from dashboard button
  document.getElementById('dash-add-goal-btn').addEventListener('click', () => {
    switchView('goals');
  });

  // Onboarding links bindings
  const onboardingProfileLink = document.getElementById('onboarding-profile-link');
  if (onboardingProfileLink) {
    onboardingProfileLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchView('profile');
    });
  }

  const onboardingDemoLink = document.getElementById('onboarding-demo-link');
  if (onboardingDemoLink) {
    onboardingDemoLink.addEventListener('click', (e) => {
      e.preventDefault();
      if (StateManager.loadDemoData()) {
        refreshAppState();
        renderDashboardCharts();
        alert('Demo data loaded successfully! Feel free to explore all tabs.');
      }
    });
  }

  // Health Detail Dialog
  document.getElementById('dashboard-health-detail-btn').addEventListener('click', () => {
    const financials = StateManager.getFinancials();
    const health = FinancialCalculator.calculateHealthScore(financials);
    
    let text = `Financial Health Score Summary (${health.score}/100):\n\n`;
    health.factors.forEach(f => {
      text += `- ${f.name}: ${f.score}/${f.max} points\n  * ${f.desc}\n\n`;
    });
    alert(text);
  });

  // --- Profile Page Form Submit ---
  document.getElementById('profile-earnings-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    financials.income.salary = parseFloat(document.getElementById('prof-salary').value) || 0;
    financials.income.other = parseFloat(document.getElementById('prof-other').value) || 0;
    financials.savings = parseFloat(document.getElementById('prof-savings').value) || 0;

    StateManager.updateFinancials(financials);
    refreshAppState();
    alert('Income profile updated successfully!');
    switchView('dashboard');
  });

  // Reset Data action
  document.getElementById('reset-all-data-btn').addEventListener('click', () => {
    if (confirm('Are you absolutely sure you want to delete all financial records and settings? This cannot be undone.')) {
      const activeUser = StateManager.getCurrentUser();
      localStorage.removeItem(STATE_KEY_PREFIX + 'profile_' + activeUser);
      StateManager.logout();
      showAuthScreen();
    }
  });

  // --- Budget Page Forms ---
  document.getElementById('budget-limit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const cat = document.getElementById('budget-category-select').value;
    const limit = parseFloat(document.getElementById('budget-limit-amt').value) || 0;

    const idx = financials.budgets.findIndex(b => b.category === cat);
    if (idx !== -1) {
      financials.budgets[idx].limit = limit;
    } else {
      financials.budgets.push({ category: cat, limit });
    }

    StateManager.updateFinancials(financials);
    refreshAppState();
    document.getElementById('budget-limit-form').reset();
    alert(`Updated spending limit for ${cat} to $${limit}!`);
  });

  document.getElementById('add-expense-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const name = document.getElementById('exp-name').value.trim();
    const amount = parseFloat(document.getElementById('exp-amount').value) || 0;
    const category = document.getElementById('exp-category').value;
    const isRecurring = document.getElementById('exp-recurring').checked;

    const newExp = {
      id: 'exp_' + Date.now(),
      name,
      amount,
      category,
      isRecurring
    };

    financials.expenses.push(newExp);
    StateManager.updateFinancials(financials);
    refreshAppState();
    document.getElementById('add-expense-form').reset();
    alert(`Logged expense of $${amount} for ${name}!`);
  });

  // --- Goal Tracker Forms ---
  document.getElementById('add-goal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const name = document.getElementById('goal-name').value.trim();
    const target = parseFloat(document.getElementById('goal-target').value) || 0;
    const current = parseFloat(document.getElementById('goal-current').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('goal-contribution').value) || 0;
    const targetDate = document.getElementById('goal-date').value;

    const newGoal = {
      id: 'goal_' + Date.now(),
      name,
      target,
      current,
      monthlyContribution,
      targetDate
    };

    financials.goals.push(newGoal);
    StateManager.updateFinancials(financials);
    refreshAppState();
    document.getElementById('add-goal-form').reset();
    alert(`Set savings goal for "${name}"!`);
  });

  document.getElementById('add-debt-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const name = document.getElementById('debt-name').value.trim();
    const balance = parseFloat(document.getElementById('debt-balance').value) || 0;
    const minPayment = parseFloat(document.getElementById('debt-payment').value) || 0;
    const interestRate = parseFloat(document.getElementById('debt-rate').value) || 0;

    const newDebt = {
      id: 'debt_' + Date.now(),
      name,
      balance,
      minPayment,
      interestRate
    };

    financials.debts.push(newDebt);
    StateManager.updateFinancials(financials);
    refreshAppState();
    document.getElementById('add-debt-form').reset();
    alert(`Recorded debt balance of $${balance} for ${name}!`);
  });

  // --- Affordability Calculator Page ---
  document.getElementById('affordability-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const name = document.getElementById('calc-name').value.trim();
    const cost = parseFloat(document.getElementById('calc-cost').value) || 0;
    const months = parseFloat(document.getElementById('calc-months').value) || 0;
    const recurring = parseFloat(document.getElementById('calc-recurring').value) || 0;

    const analysis = FinancialCalculator.evaluateAffordability(financials, cost, months, recurring);

    if (!analysis) return;

    // Display elements
    document.getElementById('calc-results-placeholder').style.display = 'none';
    const reportCard = document.getElementById('calc-results-card');
    reportCard.style.display = 'block';

    const verdictDiv = document.getElementById('calc-verdict');
    const verdictTitle = document.getElementById('calc-verdict-title');
    const verdictDesc = document.getElementById('calc-verdict-desc');

    if (analysis.isAffordable) {
      verdictDiv.className = 'affordability-verdict yes';
      verdictTitle.innerHTML = `<i class="fa-solid fa-circle-check"></i> Mathematically Affordable!`;
      verdictDesc.textContent = `Your net monthly cash flow covers this expense with room to spare.`;
    } else {
      verdictDiv.className = 'affordability-verdict no';
      verdictTitle.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Squeezes Monthly Surplus!`;
      verdictDesc.textContent = `Goal monthly saving demands exceed your net cash flow by ${formatUSD(Math.abs(analysis.remainingCashFlow))}.`;
    }

    document.getElementById('calc-result-monthly-savings').textContent = formatUSD(analysis.monthlyGoalSavingsNeeded);
    document.getElementById('calc-result-recurring').textContent = formatUSD(analysis.recurringCost);
    document.getElementById('calc-result-total-monthly').textContent = formatUSD(analysis.totalAdditionalMonthly);
    
    const remainingCF = document.getElementById('calc-result-remaining-cashflow');
    remainingCF.textContent = formatUSD(analysis.remainingCashFlow);
    if (analysis.remainingCashFlow < 0) {
      remainingCF.style.color = 'var(--danger)';
    } else {
      remainingCF.style.color = 'var(--success)';
    }

    // Goal Impacts list
    const impactsArea = document.getElementById('calc-goal-impacts-area');
    const impactsList = document.getElementById('calc-impacted-goals-list');
    impactsList.innerHTML = '';

    if (analysis.impactedGoals.length > 0) {
      impactsArea.style.display = 'block';
      analysis.impactedGoals.forEach(g => {
        const item = document.createElement('div');
        item.className = 'budget-progress-item';
        item.innerHTML = `
          <div class="budget-progress-header">
            <span><strong>${g.name}</strong></span>
            <span style="color: var(--warning); font-weight:600;">Delayed by +${g.delayMonths} Months</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">
            Will complete in ${g.newMonths} months (previously ${g.originalMonths} months)
          </div>
        `;
        impactsList.appendChild(item);
      });
    } else {
      impactsArea.style.display = 'none';
    }
  });

  // --- Scenario Planner Page ---
  const incomeSlider = document.getElementById('slider-income');
  const spendingSlider = document.getElementById('slider-spending');
  const valIncomeSlider = document.getElementById('val-income-slider');
  const valSpendingSlider = document.getElementById('val-spending-slider');

  function updateSliderDisplay() {
    const incVal = parseInt(incomeSlider.value);
    const spdVal = parseInt(spendingSlider.value);

    valIncomeSlider.textContent = incVal >= 0 ? `+$${incVal}` : `-$${Math.abs(incVal)}`;
    valSpendingSlider.textContent = spdVal >= 0 ? `+$${spdVal}` : `-$${Math.abs(spdVal)}`;
  }

  function triggerScenarioUpdate() {
    updateSliderDisplay();

    const financials = StateManager.getFinancials();
    if (!financials) return;

    const changes = {
      incomeChange: parseInt(incomeSlider.value),
      expenseChange: parseInt(spendingSlider.value)
    };

    const comparison = FinancialCalculator.compareScenario(financials, changes);
    if (!comparison) return;

    // Fill numbers
    document.getElementById('scenario-base-income').textContent = formatUSD(comparison.baseline.income);
    document.getElementById('scenario-base-expenses').textContent = formatUSD(comparison.baseline.expenses);
    document.getElementById('scenario-base-net').textContent = formatUSD(comparison.baseline.netCashFlow);

    document.getElementById('scenario-proj-income').textContent = formatUSD(comparison.scenario.income);
    document.getElementById('scenario-proj-expenses').textContent = formatUSD(comparison.scenario.expenses);
    
    const projNet = document.getElementById('scenario-proj-net');
    projNet.textContent = formatUSD(comparison.scenario.netCashFlow);
    if (comparison.scenario.netCashFlow < 0) {
      projNet.style.color = 'var(--danger)';
    } else {
      projNet.style.color = 'var(--success)';
    }

    // Charting Scenario Comparison
    renderScenarioChart(comparison);
  }

  // Bind slider events
  incomeSlider.addEventListener('input', triggerScenarioUpdate);
  spendingSlider.addEventListener('input', triggerScenarioUpdate);

  // --- AI Coach Chat UI ---
  const chatConversation = document.getElementById('chat-conversation');
  const chatInputForm = document.getElementById('chat-input-form');
  const chatTextInput = document.getElementById('chat-text-input');

  chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = chatTextInput.value.trim();
    if (!messageText) return;

    // Add user bubble
    appendChatBubble(messageText, 'user');
    chatTextInput.value = '';

    // Typing effect logic
    const typingIndicator = appendTypingIndicator();
    chatConversation.scrollTop = chatConversation.scrollHeight;

    setTimeout(() => {
      // Fetch response
      const financials = StateManager.getFinancials();
      const response = AICoach.generateResponse(messageText, financials);

      // Remove typing bubble
      typingIndicator.remove();

      // Append assistant streaming bubble
      const bubble = appendChatBubble('', 'assistant');
      AICoach.streamText(response.text, bubble, () => {
        chatConversation.scrollTop = chatConversation.scrollHeight;
      });
      
      if (response.isWarning) {
        bubble.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        bubble.style.background = 'rgba(239, 68, 68, 0.05)';
      }
    }, 1200);
  });

  // Pre-defined question chips
  document.querySelectorAll('.suggested-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt');
      chatTextInput.value = promptText;
      chatInputForm.dispatchEvent(new Event('submit'));
    });
  });

  function appendChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    // For human messages, display text immediately. Assistant will stream
    if (sender === 'user') {
      bubble.textContent = text;
    }
    chatConversation.appendChild(bubble);
    chatConversation.scrollTop = chatConversation.scrollHeight;
    return bubble;
  }

  function appendTypingIndicator() {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble assistant';
    bubble.innerHTML = `
      <div class="typing-indicator">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatConversation.appendChild(bubble);
    return bubble;
  }

  // --- Data Visualizations (Chart.js) ---
  function renderDashboardCharts() {
    const financials = StateManager.getFinancials();
    if (!financials) return;

    const summary = FinancialCalculator.summary(financials);
    const projections = FinancialCalculator.getProjections(financials, 36);

    // 1. Line/Projection Chart
    if (projectionChartInstance) {
      projectionChartInstance.destroy();
    }

    const ctxProj = document.getElementById('projectionChart').getContext('2d');
    projectionChartInstance = new Chart(ctxProj, {
      type: 'line',
      data: {
        labels: projections.monthsList,
        datasets: [
          {
            label: 'Projected Net Savings ($)',
            data: projections.savingsData,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderWidth: 3,
            tension: 0.15,
            fill: true
          },
          {
            label: 'Total Outstanding Debts ($)',
            data: projections.debtData,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderWidth: 3,
            tension: 0.1,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'Inter' } }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });

    // 2. Spending Category Doughnut Chart
    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }

    const categories = Object.keys(summary.categoryBreakdown);
    const spentAmts = Object.values(summary.categoryBreakdown);
    const bgColors = categories.map(cat => getCategoryColor(cat));

    const ctxCat = document.getElementById('categoryChart').getContext('2d');
    
    if (categories.length === 0) {
      // Empty placeholder state for chart
      categoryChartInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: ['No logged expenditures'],
          datasets: [{
            data: [1],
            backgroundColor: ['rgba(255,255,255,0.05)'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } }
        }
      });
    } else {
      categoryChartInstance = new Chart(ctxCat, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            data: spentAmts,
            backgroundColor: bgColors,
            borderColor: '#0c111e',
            borderWidth: 2,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: '#94a3b8', font: { size: 11, family: 'Inter' } }
            }
          }
        }
      });
    }
  }

  function renderScenarioChart(comparison) {
    const ctxScenario = document.getElementById('scenarioComparisonChart').getContext('2d');
    
    if (scenarioChartInstance) {
      scenarioChartInstance.destroy();
    }

    scenarioChartInstance = new Chart(ctxScenario, {
      type: 'bar',
      data: {
        labels: ['Monthly Income', 'Monthly Expenses', 'Monthly Surplus (Cash Flow)'],
        datasets: [
          {
            label: 'Current Baseline',
            data: [comparison.baseline.income, comparison.baseline.expenses, comparison.baseline.netCashFlow],
            backgroundColor: 'rgba(99, 102, 241, 0.4)',
            borderColor: 'var(--primary)',
            borderWidth: 1.5,
            borderRadius: 6
          },
          {
            label: 'Projected Scenario',
            data: [comparison.scenario.income, comparison.scenario.expenses, comparison.scenario.netCashFlow],
            backgroundColor: 'rgba(6, 182, 212, 0.5)',
            borderColor: 'var(--info)',
            borderWidth: 1.5,
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'Inter' } }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.03)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }

  // --- UI Helpers ---
  function formatUSD(num) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  }

  function getCategoryColor(category) {
    const colors = {
      Housing: '#6366f1',          // Indigo
      Utilities: '#06b6d4',        // Cyan
      Food: '#10b981',             // Emerald
      Transportation: '#f59e0b',   // Amber
      'Health & Wellness': '#ec4899', // Pink
      Entertainment: '#8b5cf6',    // Violet
      Shopping: '#f43f5e'          // Rose
    };
    return colors[category] || '#64748b'; // Slate fallback
  }

  // --- Kick Off ---
  initSession();
});
