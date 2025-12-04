import db from '../config/database.js';

class ChamadoModel {
    static async criar(dados) {
        const sql = 'insert into carrinho set ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }

   
    static async listarPorCliente(clienteId) { //busca cliente
        const sql = 'selecT * from carrinho where cliente_id = ?';
        const [linhas] = await db.query(sql, [clienteId]);
        return linhas;
    }
}

export default ChamadoModel;