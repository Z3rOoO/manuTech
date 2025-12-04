import db from '../config/database.js';

class MensagemModel {
    // Salvar mensagem
    static async criar(remetente_id, textoMensagem, destinatario_id = null) {
       
        const sql = 'INSERT INTO mensagem (remetente_id, destinatario_id, mensagem) VALUES (?, ?, ?)';
        
        const [result] = await db.execute(sql, [remetente_id, destinatario_id, textoMensagem]);
        return result.insertId;
    }

    // Listar mensagens
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
}

export default MensagemModel;