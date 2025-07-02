const db = require("./db");

const create = (name, callback) => {
  const sql = `INSERT INTO giftcards (title,amount,currency,expirationDate,balance) VALUES (?,?,?,?,?)`;

  db.run(sql, [name], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.lastID);
  });
};

const findAll = (callback) => {
  const sql = `SELECT * FROM giftcards`;

  db.all(sql, (error, rows) => {
    if (error) {
      return callback(error);
    }

    callback(null, rows);
  });
};

const findById = (id, callback) => {
  const sql = `SELECT * FROM giftcards WHERE id = ?`;

  db.get(sql, [id], (error, row) => {
    if (error) {
      return callback(error);
    }

    callback(null, row);
  });
};

const update = (id, balance, expirationDate, callback) => {
  const sql = `UPDATE giftcards SET (balance = ?, expirationDate = ?) WHERE id = ?`;

  db.run(sql, [balance,expirationDate, id], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.changes);
  });
};

const destroy = (id, callback) => {
  const sql = `DELETE FROM giftcards WHERE id = ?`;

  db.run(sql, [id], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.changes);
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};