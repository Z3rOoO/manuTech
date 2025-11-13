// techtech
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

//conectar com mysql
const db = await mysql.createConnection({ 
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "dbmt"
});

// exportar o banco
export default db;