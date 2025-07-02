const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const register = (req, res) => {
  const { name, lastname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  userModel.create(name, lastname, email, hashedPassword, function (err) {
    if (err) return res.status(400).json({ error: 'Usuario ya existe' });
    res.json({ message: 'Usuario registrado' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, function (err, user) {
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
};

module.exports = {
  register,
  login
};