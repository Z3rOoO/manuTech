// Importa a conexão do banco (Passo 3)
import db from "../config/database.js"; 

/**
 * coloca um novo usuário no banco de dados.
 * //sistema inserir um novo user no db, mas db.query pode servir para mexer no db pelo vsc
 */
export async function criarUsuario(username, email, hash) {

  return db.query(
    "INSERT INTO usuarios (username, email, senha_hash) VALUES (?, ?, ?)", //?,?,? pegar dados do input em ordem
    [username, email, hash]
  );
}

/**
 * Busca um usuário pelo email.
 * //? = email igual ao do user
 */
export async function buscarPorEmail(email) {
  const [row] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  //row = resultado -- row0 = priimeira linha
  return row[0]; // Retorna o usuário encontrado (ou 'undefined' se não achar)
}

/**
 * Busca um usuário pelo ID (para a rota de perfil).
 */
export async function buscarPorId(id) {
  const [rows] = await db.query(
    // S
    //seleciona só os dados seguros, sem o hash da senha
    "SELECT id, username, email, criado_em FROM usuarios WHERE id = ?",
    [id]
  );
  return rows[0]; // Retorna o usuário encontrado (ou 'undefined')
}