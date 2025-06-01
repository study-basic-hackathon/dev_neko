import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: 'db',
  user: 'noder',
  password: 'secret',
  database: 'dev_neko',
  port: 3306,
});
