/*
 * Financial Coach AI - Calculation Engine
 * Contains financial formulas, projection engines, and score calculators.
 */

const FinancialCalculator = {
  // Aggregate financial metrics
  summary(financials) {
    if (!financials) return null;

    const salary = Number(financials.income.salary || 0);
    const otherIncome = Number(financials.income.other || 0);
    const totalIncome = salary + otherIncome;

    let totalExpenses = 0;
    let recurringExpenses = 0;
    const categoryBreakdown = {};

    financials.expenses.forEach(exp => {
      const amt = Number(exp.amount || 0);
      totalExpenses += amt;
      if (exp.isRecurring) {
        recurringExpenses += amt;
      }
      
      const cat = exp.category || 'Uncategorized';
      categoryBreakdown[cat] = (categoryBreakdown[cat] || 0) + amt;
    });

    const netCashFlow = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0;

    let totalDebtPayments = 0;
    let totalDebtBalance = 0;
    financials.debts.forEach(debt => {
      totalDebtPayments += Number(debt.minPayment || 0);
      totalDebtBalance += Number(debt.balance || 0);
    });

    return {
      totalIncome,
      totalExpenses,
      recurringExpenses,
      netCashFlow,
      savingsRate: Math.max(0, savingsRate),
      totalDebtPayments,
      totalDebtBalance,
      categoryBreakdown
    };
  },

  // Compute Financial Health Score
  calculateHealthScore(financials) {
    const sum = this.summary(financials);
    if (!sum) return { score: 0, factors: [] };

    let score = 0;
    const factors = [];

    // Factor 1: Savings Rate (30 Points Max)
    // Target: >= 20% savings rate gives full points.
    const savingsPct = sum.savingsRate;
    let savingsScore = 0;
    if (savingsPct >= 20) {
      savingsScore = 30;
      factors.push({ name: 'Savings Rate', score: 30, max: 30, status: 'excellent', desc: `Saving ${savingsPct.toFixed(1)}% of your income. Excellent!` });
    } else if (savingsPct > 0) {
      savingsScore = Math.round((savingsPct / 20) * 30);
      factors.push({ name: 'Savings Rate', score: savingsScore, max: 30, status: 'moderate', desc: `Saving ${savingsPct.toFixed(1)}%. Aim for 20% to build security.` });
    } else {
      factors.push({ name: 'Savings Rate', score: 0, max: 30, status: 'poor', desc: 'No net positive savings. Expenses exceed or equal income.' });
    }
    score += savingsScore;

    // Factor 2: Emergency Fund Coverage (30 Points Max)
    // Target: 6 months of recurring expenses in savings.
    const emergencyBalance = Number(financials.savings || 0);
    const monthlyNeeds = sum.recurringExpenses > 0 ? sum.recurringExpenses : 1500; // fallback if no expenses
    const coverageMonths = emergencyBalance / monthlyNeeds;
    let emergencyScore = 0;

    if (coverageMonths >= 6) {
      emergencyScore = 30;
      factors.push({ name: 'Emergency Fund', score: 30, max: 30, status: 'excellent', desc: `Covering ${coverageMonths.toFixed(1)} months of basic needs. Strong buffer!` });
    } else if (coverageMonths >= 3) {
      emergencyScore = 20;
      factors.push({ name: 'Emergency Fund', score: 20, max: 30, status: 'moderate', desc: `Covering ${coverageMonths.toFixed(1)} months. Good starter buffer; aim for 6.` });
    } else if (coverageMonths > 0) {
      emergencyScore = Math.round((coverageMonths / 3) * 15);
      factors.push({ name: 'Emergency Fund', score: emergencyScore, max: 30, status: 'poor', desc: `Covering only ${coverageMonths.toFixed(1)} months. Vulnerable to disruptions.` });
    } else {
      factors.push({ name: 'Emergency Fund', score: 0, max: 30, status: 'poor', desc: 'No savings set aside for emergencies.' });
    }
    score += emergencyScore;

    // Factor 3: Budget Adherence (20 Points Max)
    // Verify spending does not exceed limits.
    let overBudgetCategories = 0;
    let totalBudgeted = 0;
    
    financials.budgets.forEach(b => {
      const limit = Number(b.limit || 0);
      totalBudgeted += limit;
      const spent = sum.categoryBreakdown[b.category] || 0;
      if (spent > limit) {
        overBudgetCategories++;
      }
    });

    let budgetScore = 20;
    if (overBudgetCategories === 0) {
      factors.push({ name: 'Budget Adherence', score: 20, max: 20, status: 'excellent', desc: 'All categories are within budgeted limits.' });
    } else {
      budgetScore = Math.max(0, 20 - (overBudgetCategories * 5));
      factors.push({ name: 'Budget Adherence', score: budgetScore, max: 20, status: budgetScore >= 10 ? 'moderate' : 'poor', desc: `${overBudgetCategories} budget category limits exceeded.` });
    }
    score += budgetScore;

    // Factor 4: Debt-to-Income (DTI) Ratio (20 Points Max)
    // Target: Debt payments < 15% of income. 0 points if > 40%.
    const dti = sum.totalIncome > 0 ? (sum.totalDebtPayments / sum.totalIncome) * 100 : 0;
    let debtScore = 0;

    if (sum.totalDebtPayments === 0) {
      debtScore = 20;
      factors.push({ name: 'Debt Control', score: 20, max: 20, status: 'excellent', desc: 'No monthly debt obligations.' });
    } else if (dti <= 15) {
      debtScore = 15;
      factors.push({ name: 'Debt Control', score: 15, max: 20, status: 'excellent', desc: `Healthy debt load representing ${dti.toFixed(1)}% of income.` });
    } else if (dti <= 35) {
      debtScore = 10;
      factors.push({ name: 'Debt Control', score: 10, max: 20, status: 'moderate', desc: `Moderate debt burden (${dti.toFixed(1)}% DTI). Avoid adding new debt.` });
    } else {
      debtScore = Math.max(0, Math.round(5 - ((dti - 35) / 10) * 5));
      factors.push({ name: 'Debt Control', score: debtScore, max: 20, status: 'poor', desc: `High debt load representing ${dti.toFixed(1)}% of income.` });
    }
    score += debtScore;

    return { score, factors };
  },

  // Vacation / Major Purchase Affordability
  evaluateAffordability(financials, purchaseCost, monthsToTarget, recurringCost = 0) {
    const sum = this.summary(financials);
    if (!sum) return null;

    const monthlyGoalSavingsNeeded = monthsToTarget > 0 ? (purchaseCost / monthsToTarget) : purchaseCost;
    const totalAdditionalMonthly = monthlyGoalSavingsNeeded + recurringCost;
    const remainingCashFlow = sum.netCashFlow - totalAdditionalMonthly;
    const isAffordable = remainingCashFlow >= 0;

    // Tradeoffs: how it impacts existing goals
    // We check other goals contributions and see if cashflow is squeezed
    const activeContributions = financials.goals.reduce((acc, goal) => acc + Number(goal.monthlyContribution || 0), 0);
    const potentialDeficit = remainingCashFlow - activeContributions;

    let goalImpactText = '';
    const impactedGoals = [];
    
    if (potentialDeficit < 0) {
      // Squeezes goal contributions
      const factor = Math.abs(potentialDeficit) / activeContributions;
      financials.goals.forEach(goal => {
        const currentMC = Number(goal.monthlyContribution || 0);
        if (currentMC > 0) {
          const neededRemaining = goal.target - goal.current;
          if (neededRemaining > 0) {
            const originalMonths = neededRemaining / currentMC;
            // scale down the contribution due to deficit
            const newMC = currentMC * (1 - Math.min(1, Math.abs(potentialDeficit) / activeContributions));
            const newMonths = newMC > 0 ? (neededRemaining / newMC) : Infinity;
            const delayMonths = isFinite(newMonths) ? Math.round(newMonths - originalMonths) : 999;
            
            impactedGoals.push({
              name: goal.name,
              delayMonths: delayMonths,
              originalMonths: Math.round(originalMonths),
              newMonths: isFinite(newMonths) ? Math.round(newMonths) : 'Infinite'
            });
          }
        }
      });
    }

    return {
      monthlyGoalSavingsNeeded,
      recurringCost,
      totalAdditionalMonthly,
      remainingCashFlow,
      isAffordable,
      impactedGoals,
      potentialDeficit
    };
  },

  // Play 'What-If' Scenario against a baseline
  compareScenario(financials, changes) {
    // changes is an object e.g. { incomeChange: 500, expenseChange: -200, savingsChange: 100 }
    const baseline = this.summary(financials);
    if (!baseline) return null;

    const scenarioIncome = baseline.totalIncome + (Number(changes.incomeChange) || 0);
    const scenarioExpenses = baseline.totalExpenses + (Number(changes.expenseChange) || 0);
    const scenarioNetCashFlow = scenarioIncome - scenarioExpenses;
    const scenarioSavingsRate = scenarioIncome > 0 ? (scenarioNetCashFlow / scenarioIncome) * 100 : 0;

    return {
      baseline: {
        income: baseline.totalIncome,
        expenses: baseline.totalExpenses,
        netCashFlow: baseline.netCashFlow,
        savingsRate: baseline.savingsRate
      },
      scenario: {
        income: scenarioIncome,
        expenses: scenarioExpenses,
        netCashFlow: scenarioNetCashFlow,
        savingsRate: Math.max(0, scenarioSavingsRate)
      }
    };
  },

  // Projections: Savings Growth & Debt Payoff timelines
  getProjections(financials, months = 36) {
    const sum = this.summary(financials);
    if (!sum) return null;

    // Savings projection
    const savingsData = [];
    let currentSavings = Number(financials.savings || 0);
    const savingsInterestRate = 0.04; // Assume 4% APY (simulated high-yield savings)
    const monthlyRate = savingsInterestRate / 12;
    
    // Find active goals monthly savings contribution
    const monthlySavingsContribution = sum.netCashFlow > 0 ? sum.netCashFlow : 0;

    // Debt payoff projection
    const debtData = [];
    const activeDebts = financials.debts.map(d => ({
      ...d,
      currentBalance: Number(d.balance || 0),
      minPay: Number(d.minPayment || 0),
      rate: Number(d.interestRate || 0) / 100 / 12
    }));

    for (let m = 0; m <= months; m++) {
      // Savings compound math
      if (m > 0) {
        currentSavings = currentSavings * (1 + monthlyRate) + monthlySavingsContribution;
      }
      savingsData.push(Math.round(currentSavings));

      // Debt balance calculation
      let monthDebtTotal = 0;
      activeDebts.forEach(debt => {
        if (m > 0 && debt.currentBalance > 0) {
          const interest = debt.currentBalance * debt.rate;
          // Apply min payment, but reduce balance
          let payAmt = Math.min(debt.minPay, debt.currentBalance + interest);
          debt.currentBalance = debt.currentBalance + interest - payAmt;
        }
        monthDebtTotal += debt.currentBalance;
      });
      debtData.push(Math.round(monthDebtTotal));
    }

    return {
      monthsList: Array.from({ length: months + 1 }, (_, i) => `Month ${i}`),
      savingsData,
      debtData
    };
  }
};
