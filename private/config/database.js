import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Descobre onde este arquivo (database.js) está
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Aponta para o arquivo .env que está na pasta 'private' (uma pasta acima de config)
// Caminho: private/config/../.env -> private/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 3. Debug para garantir
console.log("---- DEBUG DO BANCO ----");
console.log("Caminho do .env:", path.resolve(__dirname, '../.env'));
console.log("User:", process.env.DB_USER);
console.log("Database:", process.env.DB_NAME);
console.log("------------------------");

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dbmt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default db;