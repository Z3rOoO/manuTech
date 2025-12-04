import db from '../config/database.js';

class CarrinhoModel {
    static async adicionar(dados) {
        const sql = 'insert into chamado set ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }


    static async listarPorCliente(clienteId) { //busca cliente
        const sql = 'selecT * from chamado where cliente_id = ?';
        const [linhas] = await db.query(sql, [clienteId]);
        return linhas;
    }
    
    static async atualizarQuantidade(produto_id, quantidade) {
        const sql = `
            UPDATE carrinho
            SET quantidade = ?
            WHERE produto_id = ?
        `;

        const [result] = await db.query(sql, [quantidade, produto_id]);
        return result;
    }
}

export default CarrinhoModel;