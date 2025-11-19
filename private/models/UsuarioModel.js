import db from '../config/database.js';
import bcrypt from 'bcrypt';

class UsuarioModel {

    // 1. Criar Usuário (Usado no Cadastro)
    static async criar(dados) {
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(dados.senha, salt);

        const dadosFinais = {
            ...dados,
            senha: senhaHash
        };

        const sql = 'INSERT INTO usuarios SET ?';
        const [resultado] = await db.query(sql, [dadosFinais]);
        return resultado.insertId;
    }

    // 2. Buscar por Email (A função que está dando erro agora!)
    static async buscarPorEmail(email) {
        const sql = 'SELECT * FROM usuarios WHERE email = ?';
        const [linhas] = await db.query(sql, [email]);
        return linhas[0]; // Retorna o usuário ou undefined
    }

    // 3. Buscar por ID
    static async buscarPorId(id) {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        const [linhas] = await db.query(sql, [id]);
        return linhas[0];
    }

    // 4. Verificar Credenciais (Usado no Login)
    static async verificarCredenciais(email, senha) {
        const usuario = await this.buscarPorEmail(email);

        if (!usuario) {
            return null;
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        return senhaCorreta ? usuario : null;
    }
    
    // 5. Listar Todos
    static async listarTodos(pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;
        const sql = 'SELECT id, nome, email, tipo, criado_em FROM usuarios LIMIT ? OFFSET ?';
        const [usuarios] = await db.query(sql, [limite, offset]);
        const [totalResult] = await db.query('SELECT COUNT(*) as total FROM usuarios');
        return { usuarios, total: totalResult[0].total };
    }

    // 6. Atualizar
    static async atualizar(id, dados) {
        if (dados.senha) {
            const salt = await bcrypt.genSalt(10);
            dados.senha = await bcrypt.hash(dados.senha, salt);
        }
        const sql = 'UPDATE usuarios SET ? WHERE id = ?';
        const [resultado] = await db.query(sql, [dados, id]);
        return resultado.affectedRows;
    }

    // 7. Excluir
    static async excluir(id) {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        const [resultado] = await db.query(sql, [id]);
        return resultado.affectedRows;
    }
}

export default UsuarioModel;