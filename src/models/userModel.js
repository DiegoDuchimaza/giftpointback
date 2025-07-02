const db = require("../configs/db");

const create = (name,lastname,email,password, callback) => {
  const sql = `INSERT INTO users (name, lastname, email, password) VALUES (?,?,?,?)`;

  db.run(sql, [name,lastname,email,password], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.lastID);
  });
};
const findUserByEmail = (email, callback) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], callback);
};
module.exports = {
  create,
  findUserByEmail
};