import db from '../config/database.js';

class ChamadoModel {
    static async criar(dados) {
        const sql = 'insert into chamado set ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }

   
    static async listarPorCliente(clienteId) { //busca cliente
        const sql = 'selecT * from chamado where cliente_id = ?';
        const [linhas] = await db.query(sql, [clienteId]);
        return linhas;
    }
}

export default ChamadoModel;