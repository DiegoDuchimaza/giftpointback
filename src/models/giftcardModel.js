const db = require("../configs/db");

const create = (product, callback) => {
  const { title, amount, currency, expirationDate, balance, user_id } = product;
  const sql = `INSERT INTO giftcards (title,amount,currency,expirationDate,balance,user_id) VALUES (?,?,?,?,?,?)`;
  db.run(sql, [title,amount, currency, expirationDate, balance, user_id], function (error) {
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

const update = (id, balance, expirationDate,user_id , callback) => {
  const sql = `UPDATE giftcards SET balance = ?, expirationDate = ? WHERE id = ? AND user_id = ?`;

  db.run(sql, [balance,expirationDate, id, user_id], function (error) {
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