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
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Senai@123",
  database: process.env.DB_DATABASE || "dbmt",
  port: process.env.DB_PORT ?? 3308
});

// exportar o banco
export default db;