document.addEventListener('DOMContentLoaded', function() {
  const savingsGoal = 500.00; 
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
  
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
      
      transactions.push({ type, description, amount, category, date });
      localStorage.setItem('transactions', JSON.stringify(transactions));
    } else {
      console.error('Expenses list element not found.');
    }
  }


  const transactionForm = document.getElementById('transactionForm');
  if (transactionForm) {
    transactionForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const type = document.getElementById('type').value;
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;

      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
      }

      updateDashboard(amount, category, type);
      addTransactionToList(type, description, amount, category, date);

      alert(`Transaction added!\nType: ${type}\nDescription: ${description}\nAmount: $${amount.toFixed(2)}\nCategory: ${category}\nDate: ${date}`);

      transactionForm.reset();
    });
  }

  document.getElementById('exportPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("Expenses Report", 10, 10);
    let y = 20;

    const expensesListItems = document.querySelectorAll('#expensesList li');
    expensesListItems.forEach((item) => {
      doc.text(item.textContent, 10, y);
      y += 10;
    });

    doc.save('expenses-report.pdf');
  });

  const currentSavingsElem = document.getElementById('current-savings');
  const progressElem = document.getElementById('progress');
  const totalSavings = transactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + transaction.amount;
    }
    return total;
  }, 0);

  if (currentSavingsElem && progressElem) {
    currentSavingsElem.textContent = `Current Savings: $${totalSavings.toFixed(2)}`;
    const progress = (totalSavings / savingsGoal) * 100;
    progressElem.textContent = `Progress: ${progress.toFixed(2)}%`;
  }
});
    

     
  
