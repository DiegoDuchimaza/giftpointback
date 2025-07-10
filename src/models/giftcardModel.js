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

const findAll = (user_id,callback) => {
  const sql = `SELECT * FROM giftcards where user_id = ?`;

  db.all(sql,[user_id], (error, rows) => {
    if (error) {
      return callback(error);
    }

    callback(null, rows);
  });
};

const findAllWithout = (id, user_id,callback) => {
  const sql = `SELECT * FROM giftcards where id != ? AND user_id = ?`;

  db.all(sql,[id, user_id], (error, rows) => {
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
const transfer = (fromId, toId, balance, callback) => {
  db.serialize(() => {
    db.get('SELECT * FROM giftcards WHERE id = ?', [fromId], (err, fromCard) => {
      if (err || !fromCard) return callback(new Error('Tarjeta origen no encontrada'));

      db.get('SELECT * FROM giftcards WHERE id = ?', [toId], (err, toCard) => {
        if (err || !toCard) return callback(new Error('Tarjeta destino no encontrada'));

        if (fromCard.balance < balance) {
          return callback(new Error('Saldo insuficiente en la tarjeta origen'));
        }

        db.run('BEGIN TRANSACTION');

        db.run('UPDATE giftcards SET balance = balance - ? WHERE id = ?', [balance, fromId], function (err) {
          if (err) {
            db.run('ROLLBACK');
            return callback(err);
          }

          db.run('UPDATE giftcards SET balance = balance + ? WHERE id = ?', [balance, toId], function (err) {
            if (err) {
              db.run('ROLLBACK');
              return callback(err);
            }

            db.run('COMMIT', (err) => {
              if (err) return callback(err);
              callback(null, { fromId, toId, balance });
            });
          });
        });
      });
    });
  });
};
module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
  transfer,
  findAllWithout
};