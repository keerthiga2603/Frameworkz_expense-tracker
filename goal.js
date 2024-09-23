document.addEventListener('DOMContentLoaded', function() {
  const savingsGoal = 500.00; // Savings goal
  const currentSavingsElem = document.getElementById('current-savings');
  const progressElem = document.getElementById('progress');
  const expensesList = document.getElementById('expensesList'); // Element to display expenses

  // Check if the page is being loaded due to a refresh
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      sessionStorage.removeItem('transactions'); // Clear stored transactions on refresh
  }

  // Get transactions from sessionStorage
  const transactions = JSON.parse(sessionStorage.getItem('transactions')) || [];
  
  // Calculate total savings
  const totalSavings = transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
          return total + transaction.amount;
      }
      return total;
  }, 0);
  
  // Update the display
  currentSavingsElem.textContent = `Current Savings: $${totalSavings.toFixed(2)}`;
  const progress = (totalSavings / savingsGoal) * 100;
  progressElem.textContent = `Progress: ${progress.toFixed(2)}%`;
  
  // Display expenses
  if (expensesList) {
      transactions.forEach(transaction => {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

          listItem.innerHTML = `
              <div>
                  <strong>${transaction.description}</strong><br>
                  <small>${transaction.category} - ${transaction.date}</small>
              </div>
              <span class="${transaction.type === 'income' ? 'text-success' : 'text-danger'}">
                  ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
              </span>
          `;
          expensesList.appendChild(listItem);
      });
  } else {
      console.error('Expenses list element not found.');
  }

  // Handle back to dashboard
  document.getElementById('backToDashboard').addEventListener('click', function() {
      window.location.href = 'transaction.html'; // Redirect to transaction page
  });
});
  
