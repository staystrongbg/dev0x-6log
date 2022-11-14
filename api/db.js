import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'blog',
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
