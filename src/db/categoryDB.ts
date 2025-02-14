import SQLite from 'react-native-sqlite-storage';


// const db = SQLite.openDatabase({ name: 'expenses.db', location: 'default' });

const db = SQLite.openDatabase(
  { name: 'expenses.db', location: 'default' }, // Change 'transactions.db' to 'transactions_v2.db'
  () => console.log('New income1 opened successfully'),
  error => console.error('Database error:', error)
);

export const createTables = () => {
  db.transaction(tx => {
    // Create categories table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
      );`
    );

    // Create transactions table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        category TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
      );`
    );
  });
};

// Insert category
export const addCategory = (name: string, type: 'income' | 'expense', callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO categories (name, type) VALUES (?, ?);',
      [name, type],
      (_, result) => callback(),
      (_, error) => console.log('Error adding category:', error)
    );
  });
};

// Get categories
export const getCategories = (callback: (categories: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM categories;',
      [],
      (_, { rows }) => callback(rows.raw()),
      (_, error) => console.log('Error fetching categories:', error)
    );
  });
};

export const clearCategories = (callback: () => void) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM categories;`, // Deletes all rows in the categories table
      [],
      () => {
        console.log('All categories deleted successfully');
        callback(); // Callback function to refresh data
      },
      (_, error) => console.log('Error deleting categories:', error)
    );
  });
};


