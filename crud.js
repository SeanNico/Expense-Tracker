// Load saved data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Display data when page loads
displayTransactions();
updateBalance();

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

    document.getElementById("income").textContent = `₱${totalIncome}`;
    document.getElementById("expense").textContent = `₱${totalExpense}`;
    document.getElementById("dashboard-balance").textContent = `₱${totalIncome - totalExpense}`;
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
    updateBalance();
    updateDashboard();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

// display data
function displayTransactions() {
    const list = document.getElementById("transaction-list");
    list.innerHTML = "";

    transactions.forEach(transaction => { const li = document.createElement("li");
        li.innerHTML = `${transaction.description}
                        (${transaction.type})
                        ₱${transaction.amount}
                        <button onclick="deleteTransaction(${transaction.id})">
                            Delete
                        </button>`;
        list.appendChild(li);
        });
}

// Delete data
function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);

    saveData();
    displayTransactions();
    updateBalance();
}

// Update data
function updateBalance() {
    let balance = 0;

    transactions.forEach(transaction => { 
        if (transaction.type === "income") {
            balance += transaction.amount;
        } else {
            balance -= transaction.amount;
        }
    });

    document.getElementById("tracker-balance").textContent = balance;
}

function saveData() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}
