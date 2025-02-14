import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'expenses_V2.db', location: 'default' }, // Change 'transactions.db' to 'transactions_v2.db'
  () => console.log('New database opened successfully'),
  error => console.error('Database error:', error)
);

// Create transactions table if it does not exist
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        amount REAL,
        date TEXT,
        category TEXT
      );`,
      [],
      () => console.log('Transactions table created'),
      error => console.error('Error creating table:', error)
    );
  });
};

// Insert transaction into database
export const addTransaction = (
  title: string,
  amount: string,
  date: string,
  category: string,
  callback: () => void
) => {
  console.log("Inserting into DB -> Title:", title, "Amount:", amount, "Date:", date, "Category:", category);

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO transactions (title, amount, date, category) VALUES (?, ?, ?, ?);`,
      [title, amount, date, category],
      (_, result) => {
        console.log("Transaction added successfully with ID:", result.insertId);
        callback();
      },
      (_, error) => console.error("Error adding transaction:", error)
    );
  });
};


// Fetch transactions
export const getTransactions = (callback: (data: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM transactions;`,
      [],
      (_, result) => {
        const rows = result.rows;
        let transactions: any[] = [];
        for (let i = 0; i < rows.length; i++) {
          transactions.push(rows.item(i));
        }
        callback(transactions);
      },
      error => console.error('Error retrieving transactions:', error)
    );
  });
};

export const getTotalExpenses = (callback: (total: number) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT SUM(amount) AS total FROM transactions;`,
      [],
      (_, result) => {
        const total = result.rows.item(0).total || 0; // Default to 0 if no data
        callback(total);
      },
      error => console.error('Error fetching total expenses:', error)
    );
  });
};

// Delete transaction by ID
export const deleteTransactionFromDB = (id: number, callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM transactions WHERE id = ?;`,
      [id],
      (_, result) => {
        console.log('Transaction deleted successfully');
        callback(); // Refresh transactions after deletion
      },
      error => console.error('Error deleting transaction:', error)
    );
  });
};
