import db from '../config/database.js';

class ChamadoModel {

    // Criar chamado
    static async criar(dados) {
        // Certifica que os campos existem na tabela
        const sql = `
            INSERT INTO chamado 
            (cliente_id, data_chamado, descricao, modelo_maquina, numero_serie, 
             numero_patrimonio, setor, responsavel, endereco_manutencao, 
             data_manutencao, hora_manutencao, status_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            dados.cliente_id,
            dados.data_chamado,
            dados.descricao,
            dados.modelo_maquina,
            dados.numero_serie,
            dados.numero_patrimonio,
            dados.setor,
            dados.responsavel,
            dados.endereco_manutencao,
            dados.data_manutencao,
            dados.hora_manutencao,
            dados.status_code
        ];
        const [resultado] = await db.query(sql, params);
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
            SELECT c.*, u.nome AS nome_cliente
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
        const sql = 'SELECT * FROM chamado WHERE chamado_id = ?';
        const [rows] = await db.query(sql, [id]);
        return rows[0] || null;
    }

    // Atualizar status
    static async atualizarStatus(id, novoStatus) {
        const sql = 'UPDATE chamado SET status_code = ? WHERE chamado_id = ?';
        const [result] = await db.query(sql, [novoStatus, id]);
        return result.affectedRows > 0;
    }

    static async criarRelatorio(dados) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // 1. Salva o relatório na tabela nova
            const sqlRelatorio = `
                INSERT INTO relatorios_tecnicos (chamado_id, tecnico_id, relatorio, pecas, ferramentas, orcamento)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            await connection.execute(sqlRelatorio, [
                dados.chamado_id, dados.tecnico_id, dados.relatorio, 
                dados.pecas, dados.ferramentas, dados.orcamento
            ]);

            // 2. Atualiza o status do chamado para 'ORCAMENTO' (ou AVALIADO)
            const sqlUpdate = 'UPDATE chamado SET status_code = ? WHERE chamado_id = ?';
            await connection.execute(sqlUpdate, ['ORCAMENTO', dados.chamado_id]);

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    // Listar todos
    static async listarTodos() {
        const sql = `
            SELECT c.*, u.nome AS nome_cliente
            FROM chamado c
            JOIN usuarios u ON c.cliente_id = u.id
            ORDER BY c.data_chamado DESC
        `;
        const [rows] = await db.query(sql);
        return rows;
    }
}

export default ChamadoModel;
