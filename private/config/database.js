// techtech
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE);
console.log("DB_PORT:", process.env.DB_PORT);

//conectar com mysql
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function create(table, data) {
  const keys = Object.keys(data);
  const placeholders = keys.map(_ => '?').join(',');
  const sql = `INSERT INTO \`${table}\` (${keys.map(k => `\`${k}\``).join(',')}) VALUES (${placeholders})`;
  const values = keys.map(k => data[k]);
  const [result] = await db.execute(sql, values);
  return result; // result.insertId, affectedRows, etc
}

async function read(table, where = null, params = []) {
  console.log(`cheguei aqui '${id}'`)
  let sql = `SELECT * FROM \`${table}\``;
  if (where) sql += ` WHERE ${where}`;
  const [rows] = await db.execute(sql, params);
  return rows;
}

async function update(table, data, where, params = []) {
  const keys = Object.keys(data);
  const set = keys.map(k => `\`${k}\` = ?`).join(', ');
  const values = keys.map(k => data[k]);
  const sql = `UPDATE \`${table}\` SET ${set} WHERE ${where}`;
  const [result] = await db.execute(sql, [...values, ...params]);
  return result; // affectedRows
}

async function deleteRecord(table, where, params = []) {
  const sql = `DELETE FROM \`${table}\` WHERE ${where}`;
  const [result] = await db.execute(sql, params);
  return result;
}


export { create, read, update, deleteRecord };
// exportar o banco
export default db;