import { db } from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// *REGISTER
export const register = (req, res) => {
  //* check if user already exists in db
  const query = 'SELECT * FROM users WHERE email = ? OR username = ?';

  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json('User already exists');

    //* encrypt password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //* insert user into db
    const q =
      'INSERT INTO users(`username`, `email`, `password`,`img`) VALUES (?)';
    const values = [req.body.username, req.body.email, hash, req.body.img];
    console.log(values);

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json('User has been created!');
    });
  });
};

// *LOGIN
export const login = (req, res) => {
  const query = 'SELECT * FROM users WHERE username = ?';

  //* CHECK IF USERNAME EXISTS
  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found');

    //* check password
    const isPassCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPassCorrect)
      return res.status(400).json('Wrong username or password!');

    const token = jwt.sign({ id: data[0].id }, 'jwtkey');

    const { password, ...other } = data[0];
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};

// *LOGOUT
export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.');
};

//TODO to encrypt pass instead of storing it as a plain text, we use bcryptjs library
