import db from '../config/database.js';

class ChamadoModel {
    

    static async criar(dados) {
        const sql = 'INSERT INTO chamado SET ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }


    static async listarPorCliente(clienteId) {
        const sql = 'SELECT * FROM chamado WHERE cliente_id = ? ORDER BY data_chamado DESC';
        const [rows] = await db.query(sql, [clienteId]);
        return rows;
    }


    static async listarPorStatus(status) {
        const sql = `
            SELECT c.*, u.nome as nome_cliente 
            FROM chamado c
            JOIN usuarios u ON c.cliente_id = u.id
            WHERE c.status_code = ?
            ORDER BY c.data_chamado DESC
        `;
        const [rows] = await db.query(sql, [status]);
        return rows;
    }

    // 4. Atualizar Status (Aceitar/Recusar)
    // --- ESSA TAMBÉM FALTAVA ---
    static async atualizarStatus(id, novoStatus) {
        const sql = 'UPDATE chamado SET status_code = ? WHERE chamado_id = ?';
        const [result] = await db.query(sql, [novoStatus, id]);
        return result.affectedRows > 0;
    }
}

export default ChamadoModel;