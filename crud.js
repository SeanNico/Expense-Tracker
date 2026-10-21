// Load saved data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Display data when page loads
displayTransactions();
updateDashboard();

// Update Dashboard
function updateDashboard(){
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if(transaction.type === "income"){
            totalIncome += transaction.amount;
        }
        else{
            totalExpense += transaction.amount;
        }
    }); 

    const balance = totalIncome - totalExpense;
    document.getElementById("income").textContent = `₱${totalIncome.toFixed(2)}`;
    document.getElementById("expense").textContent = `₱${totalExpense.toFixed(2)}`;
    document.getElementById("dashboard-balance").textContent = `₱${balance.toFixed(2)}`;
}

// Add data
function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || amount <= 0) {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type
    };

    transactions.push(transaction);
    
    saveData();
    displayTransactions();
    updateDashboard();
}

// display data
function displayTransactions() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach(transaction => {
        const li = document.createElement("li");

        li.className = `transaction-card ${transaction.type === "income" ? "income-card": "expense-card"}`;
        li.innerHTML = `<div class="transaction-info">
                            <h6>${transaction.description}</h6>
                            <small>${transaction.type}</small>
                        </div>
                        <div class="transaction-amount">
                            ${transaction.type === "income" ? "+" : "-"}
                            ₱${transaction.amount}
                        </div>
                        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">&#10060</button>`;
        list.appendChild(li);
    });
}

// Delete data
function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);

    saveData();
    displayTransactions();
    updateDashboard();
}

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}
