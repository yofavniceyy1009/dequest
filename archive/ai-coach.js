/*
 * Financial Coach AI - Simulated AI Mentor
 * Context-aware educational engine. Blocks investment/tax/legal advice.
 */

const AICoach = {
  // Check if query targets restricted advice
  isRestrictedQuery(message) {
    const restrictedKeywords = [
      /\b(buy|sell|trade|invest in)\b.*\b(stock|crypto|bitcoin|ethereum|solana|coin|nft|option|futures|btc|eth|doge)\b/i,
      /\b(should i buy|is it a buy)\b.*\b(tesla|tsla|apple|aapl|nvidia|nvda|gamestop|gme|amc|crypto|doge)\b/i,
      /\b(tax structure|incorporate|llc|s-corp|c-corp|evade tax|tax shelter|offshore)\b/i,
      /\b(legal representation|sue|lawsuit|contract lawyer|court case)\b/i,
      /\b(financial advisor|portfolio recommendation|mutual fund pick|stock pick)\b/i
    ];

    return restrictedKeywords.some(regex => regex.test(message));
  },

  // Generate response based on user message and their current financial state
  generateResponse(message, financials) {
    const cleanMsg = message.toLowerCase().trim();
    const summary = FinancialCalculator.summary(financials);
    const health = FinancialCalculator.calculateHealthScore(financials);

    // 1. Blocked Advice Check
    if (this.isRestrictedQuery(cleanMsg)) {
      return {
        text: `⚠️ **REGULATORY & SECURITY NOTICE**\n\nAs FinancePilot, I am programmed to explain financial concepts, general strategies, and analyze your budgeting data. However, **I cannot provide specific investment, tax, or legal advice.**\n\nI must avoid making recommendations for specific securities (like individual stocks or cryptocurrencies), tax loopholes, or legal structures.\n\n* **What I can do instead:** We can discuss the general concept of stock market diversification, how index funds differ from individual stocks, the math behind compound interest, or the general mechanics of marginal tax brackets. Let me know if you'd like to explore those principles!`,
        isWarning: true
      };
    }

    // 2. Financial Health Score
    if (cleanMsg.includes('health') || cleanMsg.includes('score') || cleanMsg.includes('how am i doing')) {
      const breakdown = health.factors.map(f => {
        const dot = f.status === 'excellent' ? '🟢' : f.status === 'moderate' ? '🟡' : '🔴';
        return `* ${dot} **${f.name}**: ${f.score}/${f.max} points — *${f.desc}*`;
      }).join('\n');

      return {
        text: `📊 **Your Financial Health Assessment**\n\nYour current overall Financial Health Score is **${health.score}/100**.\n\nHere is how that is transparently calculated:\n${breakdown}\n\n* **Coach Recommendation:** To boost your score, look at your lowest-rated factors. For instance, if your emergency fund covers less than 3 months of basic needs, let's focus on setting up a small monthly savings rule to build that buffer first.`
      };
    }

    // 3. Purchase Affordability questions
    if (cleanMsg.includes('afford a vacation') || cleanMsg.includes('buy a car') || cleanMsg.includes('afford a purchase') || cleanMsg.includes('can i buy') || cleanMsg.includes('can i afford')) {
      // Look for numbers in the prompt as a cost
      const costMatch = cleanMsg.match(/\$?([0-9,]+)/);
      let cost = 5000; // default vacation cost
      if (costMatch) {
        cost = Number(costMatch[1].replace(/,/g, ''));
      }

      // Check if timeline is stated (e.g. "in 6 months" or "next year")
      let months = 10;
      const monthMatch = cleanMsg.match(/in\s+(\d+)\s+month/);
      if (monthMatch) {
        months = Number(monthMatch[1]);
      } else if (cleanMsg.includes('this year') || cleanMsg.includes('next year')) {
        months = 12;
      }

      const evalResult = FinancialCalculator.evaluateAffordability(financials, cost, months, 0);

      if (!evalResult) {
        return {
          text: `💰 **Affordability Analysis**\n\nI'd love to help you calculate if a purchase is affordable! It looks like you haven't filled out your income and expense profile yet. Please set up your details in the Dashboard or Profile page first so I can analyze your numbers.`
        };
      }

      const formattedCost = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cost);
      const formattedMonthly = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(evalResult.monthlyGoalSavingsNeeded);
      const formattedCashFlow = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(summary.netCashFlow);

      let responseText = `🛒 **Affordability Analysis: Purchase of ${formattedCost} in ${months} Months**\n\nTo hit this goal, you need to save **${formattedMonthly}/month**.\n\n* **Cash Flow Check:** Your current monthly net cash flow is **${formattedCashFlow}**.\n`;

      if (evalResult.isAffordable) {
        responseText += `* **Verdict:** ✅ **Yes, this is mathematically affordable!** Your monthly cash flow covers this saving target with **${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(evalResult.remainingCashFlow)}** left over.\n\n`;
      } else {
        responseText += `* **Verdict:** ⚠️ **This will squeeze your monthly cash flow!** Your savings goal of ${formattedMonthly}/month exceeds your net cash flow by **${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.abs(evalResult.remainingCashFlow))}**.\n\n`;
      }

      if (evalResult.impactedGoals.length > 0) {
        responseText += `⚠️ **Goal Conflict Alert:** Adding this expense means you may have to scale back existing contributions. Here are the estimated impacts on your other goals:\n`;
        evalResult.impactedGoals.forEach(g => {
          responseText += `  - **${g.name}**: Delayed by **${g.delayMonths} months** (Will take ${g.newMonths} months instead of ${g.originalMonths}).\n`;
        });
        responseText += `\n* **Coach Tip:** Consider stretching the timeline (e.g. saving over 18 months instead of ${months}) or identifying a budget category to trim down to free up space. Let's use the 'What-If' tab to model these expense cuts!`;
      } else {
        responseText += `* **Goal Impact:** You can comfortably afford this without delaying any of your active savings goals.`;
      }

      return { text: responseText };
    }

    // 4. Budget Questions
    if (cleanMsg.includes('budget') || cleanMsg.includes('expense') || cleanMsg.includes('spend')) {
      const budgetLimitText = financials.budgets.map(b => {
        const spent = summary.categoryBreakdown[b.category] || 0;
        const pct = b.limit > 0 ? (spent / b.limit) * 100 : 0;
        return `* **${b.category}**: Limit: $${b.limit} | Spent: $${spent} (${pct.toFixed(0)}% used)`;
      }).join('\n');

      return {
        text: `📝 **Budget Analysis & Money Rules**\n\nHere is your current budget utilization:\n${budgetLimitText}\n\n* **The 50/30/20 Guideline:** A standard educational model suggests allocating:\n  - **50% Needs**: Essential bills, rent, loans (${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(summary.recurringExpenses)} for you).\n  - **30% Wants**: Entertainment, dining out, lifestyle.\n  - **20% Savings**: Building buffers and paying down debt principal.\n\n* **Coach Tip:** If you're over budget on "Wants" categories (like Dining Out or Entertainment), look at setting a weekly cap instead of a monthly one. It makes it easier to track day-to-day spending.`
      };
    }

    // 5. Debt Questions
    if (cleanMsg.includes('debt') || cleanMsg.includes('loan') || cleanMsg.includes('credit card') || cleanMsg.includes('payoff')) {
      if (summary.totalDebtBalance === 0) {
        return {
          text: `🎉 **Debt Analysis**\n\nYou currently have zero debt balances entered. That's a solid foundation! Focus on investing in your savings and emergency fund.`
        };
      }

      const listDebts = financials.debts.map(d => `* **${d.name}**: $${d.balance} at ${d.interestRate}% (Min pay: $${d.minPayment}/mo)`).join('\n');

      return {
        text: `💸 **Debt Management & Acceleration strategies**\n\nYou have **${financials.debts.length} active debts** totaling **$${summary.totalDebtBalance}**:\n${listDebts}\n\n* **Educational Concept - Debt Snowball vs. Avalanche:**\n  - **Debt Avalanche (Highest Interest First):** Mathematically optimal. You pay off debts in order of interest rate (highest first), saving you the most money in interest charges over time.\n  - **Debt Snowball (Smallest Balance First):** Psychologically powerful. You focus on paying the smallest balance first, giving you quick wins that keep you motivated.\n\n* **Coach Action:** If you allocate an extra $100/month, applying it to your **${financials.debts[0] ? financials.debts[0].name : 'debts'}** would reduce your payoff time. Let's look at the Savings and Payoff charts to see your timelines!`
      };
    }

    // 6. Savings Questions
    if (cleanMsg.includes('save') || cleanMsg.includes('savings') || cleanMsg.includes('emergency fund')) {
      const balance = financials.savings || 0;
      return {
        text: `🐷 **Savings Growth & High-Yield Accounts**\n\nYou have **$${balance}** in current savings. Your monthly cash surplus is **$${summary.netCashFlow}**.\n\n* **Concept: High-Yield Savings Accounts (HYSA):** Many traditional brick-and-mortar banks pay 0.01% interest. A High-Yield Savings Account (often paying 4-5% APY in modern environments) compounds your savings much faster.\n  - *Example:* On $10,000, 0.01% gets you $1 a year. 4.5% APY earns you **$450 a year** for the exact same level of risk.\n\n* **Coach Tip:** Automate your savings transfer to occur the day after you get paid. This is known as "paying yourself first" — you save before you have a chance to spend the surplus.`
      };
    }

    // 7. General Financial Terms & Explanations (Fallback)
    if (cleanMsg.includes('inflation')) {
      return {
        text: `🎈 **What is Inflation?**\n\nInflation is the general increase in prices and fall in the purchasing value of money over time. If inflation is 3% annually, a basket of groceries that costs $100 today will cost $103 next year.\n\n* **How it affects you:** Saving cash in a zero-interest account means you are actually "losing" purchasing power. That's why emergency funds belong in high-yield accounts, and long-term funds (beyond emergencies) are often placed in diversified assets to beat inflation over decades.`
      };
    }

    if (cleanMsg.includes('compound interest') || cleanMsg.includes('compounding')) {
      return {
        text: `📈 **The Magic of Compound Interest**\n\nCompound interest is earning interest on your interest, creating an exponential growth curve. Albert Einstein famously called it the "eighth wonder of the world."\n\n* **How it works:** If you invest $1,000 at a 10% annual return:\n  - Year 1: You earn $100 (Balance: $1,100)\n  - Year 2: You earn 10% on $1,100, which is $110 (Balance: $1,210)\n  - Year 3: You earn 10% on $1,210, which is $121 (Balance: $1,331)\n\nOver 30 years, that $1,000 turns into over **$17,449** without adding another penny, thanks to compounding.`
      };
    }

    // Default Fallback Response
    return {
      text: `👋 **Welcome to FinancePilot!**\n\nI am your interactive money guide. I can help you evaluate budgets, run purchase affordability checks, explain complex jargon, and compare what-if financial choices.\n\nHere are some things you can ask me:\n* *Can I afford to buy a $15,000 car in 12 months?*\n* *How is my financial health score computed?*\n* *Explain the difference between a debt snowball and a debt avalanche.*\n* *How much should I save each month under the 50/30/20 rule?*\n\n*Reminder: I cannot recommend specific stocks, crypto, or legal structures, but I can teach you the core principles of personal finance!*`
    };
  },

  // Simulates text streaming to UI for premium feels
  streamText(text, containerElement, onComplete) {
    containerElement.innerHTML = '';
    let i = 0;
    
    // Parse basic markdown-like syntax for bold, lists, alerts
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');

    // We stream the HTML characters by chunks to prevent breaking tags
    // A simple approach is using a temporary hidden element and moving nodes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = formattedText;
    
    const nodes = Array.from(tempDiv.childNodes);
    let currentNodeIndex = 0;
    let currentCharIndex = 0;

    function renderNext() {
      if (currentNodeIndex >= nodes.length) {
        if (onComplete) onComplete();
        return;
      }

      const node = nodes[currentNodeIndex];
      if (node.nodeType === Node.TEXT_NODE) {
        const textVal = node.nodeValue;
        if (currentCharIndex < textVal.length) {
          // Add next character
          const lastChild = containerElement.lastChild;
          if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
            lastChild.nodeValue += textVal[currentCharIndex];
          } else {
            containerElement.appendChild(document.createTextNode(textVal[currentCharIndex]));
          }
          currentCharIndex++;
          setTimeout(renderNext, 3 + Math.random() * 8); // fast dynamic typing
        } else {
          currentNodeIndex++;
          currentCharIndex = 0;
          renderNext();
        }
      } else {
        // Element node (e.g. <strong>, <br>, etc.)
        // For simple elements, we can append it directly, but let's make it stream inside if it has text
        const clonedNode = node.cloneNode(false); // shallow clone
        containerElement.appendChild(clonedNode);
        
        if (node.childNodes.length > 0) {
          // Stream inside the cloned node
          let subIndex = 0;
          const subText = node.textContent;
          function renderSub() {
            if (subIndex < subText.length) {
              clonedNode.textContent += subText[subIndex];
              subIndex++;
              setTimeout(renderSub, 3 + Math.random() * 8);
            } else {
              currentNodeIndex++;
              renderNext();
            }
          }
          renderSub();
        } else {
          currentNodeIndex++;
          renderNext();
        }
      }
    }
    
    renderNext();
  }
};
