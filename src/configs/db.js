const path = require("path");
const sqlite = require("sqlite3");

const db = new sqlite.Database(
  path.resolve(__dirname, "database.db"),
  (error) => {
    if (error) {
      return console.error(error);
    }

    const users = `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(20) NOT NULL
        )`;

        const giftcards = `CREATE TABLE IF NOT EXISTS giftcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title VARCHAR(100) NOT NULL,
            amount INTEGER,
            currency VARCHAR(100) NOT NULL,
            expirationDate VARCHAR(100) NOT NULL,
            balance REAL,
            user_id INTEGER
        )`;

    db.run(users, (error) => {
      if (error) {
        return console.error(error);
      }
    });

    db.run(giftcards, (error) => {
      if (error) {
        return console.error(error);
      }
    });
  }
);

module.exports = db;