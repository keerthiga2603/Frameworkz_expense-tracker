document.addEventListener('DOMContentLoaded', function() {
  const savingsGoal = 500.00; 
  const transactions = JSON.parse(sessionStorage.getItem('transactions')) || [];

  function updateDashboard(amount, category, type) {
      const totalIncomeElem = document.getElementById('total-income');
      const totalExpenseElem = document.getElementById('total-expense');
      const balanceElem = document.getElementById('balance');

      if (totalIncomeElem && totalExpenseElem && balanceElem) {
          let totalIncome = parseFloat(totalIncomeElem.textContent.slice(1)) || 0;
          let totalExpense = parseFloat(totalExpenseElem.textContent.slice(1)) || 0;
          let balance = parseFloat(balanceElem.textContent.slice(1)) || 0;

          if (type === 'income') {
              totalIncome += amount;
          } else if (type === 'expense') {
              totalExpense += amount;
          }

          balance = totalIncome - totalExpense;

          totalIncomeElem.textContent = `$${totalIncome.toFixed(2)}`;
          totalExpenseElem.textContent = `$${totalExpense.toFixed(2)}`;
          balanceElem.textContent = `$${balance.toFixed(2)}`;
      } else {
          console.error('Dashboard elements not found.');
      }
  }

  function addTransactionToList(type, description, amount, category, date) {
      const expensesList = document.getElementById('expensesList');

      if (expensesList) {
          const listItem = document.createElement('li');
          listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
          
          listItem.innerHTML = `
              <div>
                  <strong>${description}</strong><br>
                  <small>${category} - ${date}</small>
              </div>
              <span class="${type === 'income' ? 'text-success' : 'text-danger'}">
                  ${type === 'income' ? '+' : '-'}$${amount.toFixed(2)}
              </span>
          `;

          expensesList.appendChild(listItem);
      } else {
          console.error('Expenses list element not found.');
      }
  }

});
