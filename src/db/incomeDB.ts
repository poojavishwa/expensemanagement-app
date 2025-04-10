import SQLite from 'react-native-sqlite-storage';

// Open or create database

const db = SQLite.openDatabase(
  { name: 'income1.db', location: 'default' }, // Change 'transactions.db' to 'transactions_v2.db'
  () => console.log('New income1 opened successfully'),
  error => console.error('Database error:', error)
);

// Create transactions table if it does not exist
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        amount REAL,
        date TEXT,
        category TEXT
      );`,
      [],
      () => console.log('income table created'),
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
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO income (title, amount, date, category) VALUES (?, ?, ?, ?);`,
      [title, amount, date, category],
      (_, result) => {
        console.log('income added successfully');
        callback(); // Callback function to refresh data
      },
      error => console.error('Error adding transaction:', error)
    );
  });
};

// Fetch transactions
export const getTransactions1 = (callback: (data: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM income;`,
      [],
      (_, result) => {
        const rows = result.rows;
        let transactions: any[] = [];
        for (let i = 0; i < rows.length; i++) {
          transactions.push(rows.item(i));
        }
        callback(transactions.reverse()); // Reverse the array before passing to callback
      },
      error => console.error('Error retrieving transactions:', error)
    );
  });
};


export const getTotalIncome = (callback: (total: number) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT SUM(amount) AS total FROM income;`,
      [],
      (_, result) => {
        const total = result.rows.item(0).total || 0; // Default to 0 if no data
        callback(total);
      },
      error => console.error('Error fetching total income:', error)
    );
  });
};

export const getTotalIncome1 = (callback: (total: number) => void, startDate: Date, endDate: Date) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT SUM(amount) AS total FROM income WHERE date BETWEEN ? AND ?;`,
      [startDate.toISOString(), endDate.toISOString()], // Pass dates as parameters
      (_, result) => {
        const total = result.rows.item(0)?.total || 0; // Default to 0 if no data
        callback(total);
      },
      error => console.error('Error fetching total income:', error)
    );
  });
};

export const deleteTransactionFromDB1 = (id: number, callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM income WHERE id = ?;`,
      [id],
      (_, result) => {
        console.log('Transaction deleted successfully');
        callback(); // Refresh transactions after deletion
      },
      error => console.error('Error deleting transaction:', error)
    );
  });
};

// Get total amount for a specific category
export const getTotalByCategory = (category: string, callback: (total: number) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT SUM(amount) AS total FROM income WHERE category = ?;`,
      [category], // Category passed as parameter
      (_, result) => {
        const total = result.rows.item(0).total || 0; // Default to 0 if no data
        callback(total);
      },
      error => console.error('Error fetching total for category:', error)
    );
  });
};
