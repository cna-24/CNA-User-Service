import { Database } from "bun:sqlite";

// Initialize and export the database connection
const db = new Database("mydb.sqlite");

// Function to initialize the database schema
function initializeDatabase() {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
      );
  `);

    console.log("Database initialized successfully");
}

export { db, initializeDatabase };
