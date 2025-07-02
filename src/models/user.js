const db = require("./db");

const create = (name, callback) => {
  const sql = `INSERT INTO users (name, lastname, email, password) VALUES (?,?,?,?)`;

  db.run(sql, [name], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.lastID);
  });
};

module.exports = {
  create
};