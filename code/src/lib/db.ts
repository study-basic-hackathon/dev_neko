import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'noder',
  password: process.env.MYSQL_PASSWORD || 'secret',
  database: process.env.MYSQL_DB || 'dev_neko',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
});
