import db from '../config/database.js';

class MensagemModel {
    //salva a msg
    static async criar(remetente_id, texto) {
        const sql = 'INSERT INTO mensagens (remetente_id, texto) VALUES (?, ?)';
        const [result] = await db.execute(sql, [remetente_id, texto]);
        return result.insertId;
    }

   
    static async listar() {
        
        const sql = `
            SELECT m.*, u.nome as nome_remetente 
            FROM mensagens m 
            JOIN usuarios u ON m.remetente_id = u.id 
            ORDER BY m.data_hora ASC
        `;
        const [rows] = await db.execute(sql);
        return rows;
    }
}

export default MensagemModel;