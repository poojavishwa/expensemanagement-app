import SQLite from 'react-native-sqlite-storage';


// const db = SQLite.openDatabase({ name: 'expenses.db', location: 'default' });

const db = SQLite.openDatabase(
  { name: 'expenses.db', location: 'default' }, // Change 'transactions.db' to 'transactions_v2.db'
  () => console.log('New income1 opened successfully'),
  error => console.error('Database error:', error)
);

const defaultCategories = [
  { name: 'Salary', type: 'income' },
  { name: 'Freelancing', type: 'income' },
  { name: 'Investments', type: 'income' },
  { name: 'Bonus', type: 'income' },
  { name: 'Groceries', type: 'expense' },
  { name: 'Rent', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
  { name: 'Food', type: 'expense' },
  { name: 'Education', type: 'expense' }
];

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
      );`
    );

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

    // Check if categories table is empty before inserting default categories
    tx.executeSql(
      'SELECT COUNT(*) AS count FROM categories;',
      [],
      (_, { rows }) => {
        const count = rows.item(0).count;
        console.log('Category count:', count);
        if (count === 0) {
          insertDefaultCategories();
        }
      },
      (_, error) => console.log('Error checking category count:', error)
    );
  });
};


// Function to insert default categories
const insertDefaultCategories = () => {
  db.transaction(tx => {
    defaultCategories.forEach(category => {
      tx.executeSql(
        'INSERT INTO categories (name, type) VALUES (?, ?);',
        [category.name, category.type],
        () => console.log(`Inserted category: ${category.name}`),
        (_, error) => console.log('Error inserting default category:', error)
      );
    });
  }, 
  (error) => console.log('Transaction error inserting default categories:', error),
  () => console.log('Default categories inserted successfully'));
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

export const deleteCategory = (id: number, callback: () => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      'DELETE FROM categories WHERE id = ?;',
      [id],
      (_, result) => {
        console.log('Category deleted:', result);
        callback();
      },
      (_, error) => {
        console.error('Error deleting category:', error);
      }
    );
  });
};


