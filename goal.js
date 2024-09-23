document.addEventListener('DOMContentLoaded', function() {
  const savingsGoal = 500.00; 
  const currentSavingsElem = document.getElementById('current-savings');
  const progressElem = document.getElementById('progress');

  const transactions = JSON.parse(sessionStorage.getItem('transactions')) || [];

  
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
  } else {
      console.error('Elements for displaying savings and progress not found.');
  }


  const backToDashboardBtn = document.getElementById('backToDashboard');
  if (backToDashboardBtn) {
      backToDashboardBtn.addEventListener('click', function() {
          window.location.href = 'transaction.html'; 
      });
  } else {
      console.error('Back to Dashboard button not found.');
  }
});

  
