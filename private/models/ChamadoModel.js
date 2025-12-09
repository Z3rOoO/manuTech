import db from '../config/database.js';

class ChamadoModel {
    
    // Criar chamado
    static async criar(dados) {
        const sql = 'INSERT INTO chamado SET ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }

    // Listar chamados por cliente
    static async listarPorCliente(clienteId) {
        const sql = 'SELECT * FROM chamado WHERE cliente_id = ? ORDER BY data_chamado DESC';
        const [rows] = await db.query(sql, [clienteId]);
        return rows;
    }

    // Listar por status
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

    // Buscar por ID
    static async buscarPorId(id) {
        const sql = `SELECT * FROM chamado WHERE chamado_id = ?`;
        const [rows] = await db.query(sql, [id]);
        return rows[0];
    }

    // Atualizar status
    static async atualizarStatus(id, novoStatus) {
        const sql = 'UPDATE chamado SET status_code = ? WHERE chamado_id = ?';
        const [result] = await db.query(sql, [novoStatus, id]);
        return result.affectedRows > 0;
    }

    // Listar todos
    static async listarTodos() {
        const sql = `
            SELECT c.*, u.nome as nome_cliente 
            FROM chamado c
            JOIN usuarios u ON c.cliente_id = u.id
            ORDER BY c.data_chamado DESC
        `;
        const [rows] = await db.query(sql);
        return rows;
    }

    // ✅ ADICIONA ESSA FUNÇÃO AQUI
    static async atualizarRelatorio(chamado_id, tecnico_id, dadosRelatorio) {
        const { relatorio, pecas, ferramentas, orcamento } = dadosRelatorio;
        
        // 1. Insere o relatório na tabela relatorios_tecnicos
        const sqlRelatorio = `
            INSERT INTO relatorios_tecnicos 
            (chamado_id, tecnico_id, relatorio, pecas, ferramentas, orcamento)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        await db.query(sqlRelatorio, [
            chamado_id, 
            tecnico_id, 
            relatorio, 
            pecas, 
            ferramentas, 
            orcamento
        ]);
        
        // 2. Atualiza o status do chamado
        const sqlStatus = 'UPDATE chamado SET status_code = ? WHERE chamado_id = ?';
        const [result] = await db.query(sqlStatus, ['Avaliado', chamado_id]);
        
        return result.affectedRows > 0;
    }
}

export default ChamadoModel;