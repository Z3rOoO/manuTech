import db from '../config/database.js';

class MensagemModel {
    // Salva mensagem
    static async criar(remetente_id, textoMensagem, destinatario_id = null) {
        const sql = 'INSERT INTO mensagem (remetente_id, destinatario_id, mensagem) VALUES (?, ?, ?)';
        const [result] = await db.execute(sql, [remetente_id, destinatario_id, textoMensagem]);
        return result.insertId;
    }

   
    static async listar() {
        const sql = `
            SELECT m.*, u.nome as nome_remetente 
            FROM mensagem m 
            JOIN usuarios u ON m.remetente_id = u.id 
            ORDER BY m.criado_em ASC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    
    static async listarContatos() {
        
        const sql = `
            SELECT DISTINCT u.id, u.nome, u.email
            FROM usuarios u
            JOIN mensagem m ON u.id = m.remetente_id
            WHERE u.tipo = 'USER' 
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }

    // Buscar conversa Específica 
    static async buscarConversa(idUsuario) {
        const sql = `
            SELECT m.*, u.nome as nome_remetente
            FROM mensagem m
            JOIN usuarios u ON m.remetente_id = u.id
            WHERE 
                (m.remetente_id = ? AND m.destinatario_id IS NULL) -- Cliente falou pro Suporte
                OR 
                (m.remetente_id = ? AND m.destinatario_id IS NOT NULL) -- Cliente falou pra alguém específico
                OR
                (m.destinatario_id = ?) -- Suporte respondeu pro Cliente
            ORDER BY m.criado_em ASC
        `;
        // Passamos o ID 3 vezes para cobrir os casos de ida e volta
        const [rows] = await db.execute(sql, [idUsuario, idUsuario, idUsuario]);
        return rows;
    }
}

export default MensagemModel;