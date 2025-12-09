import db from '../config/database.js';

class CarrinhoModel {
    static async adicionar(dados) {
        const sql = 'insert into carrinho set ?';
        const [resultado] = await db.query(sql, [dados]);
        return resultado.insertId;
    }


    static async listarPorCliente(clienteId) { //busca cliente
        const sql = 'selecT * from carrinho where cliente_id = ?';
        const [linhas] = await db.query(sql, [clienteId]);
        return linhas;
    }

    static async atualizarQuantidade(cliente_id, produto_id, quantidade) {
        const sql = `
        UPDATE carrinho
        SET quantidade = ?
        WHERE produto_id = ? AND cliente_id = ?
    `;

        const [result] = await db.query(sql, [quantidade, produto_id, cliente_id]);
        return result;
    }
    static async limparCarrinho(cliente_id) {
        const sql = 'DELETE FROM carrinho WHERE cliente_id = ?';
        const [result] = await db.query(sql, [cliente_id]);
        return result;
    }
    static async removerItem(produto_id, cliente_id) {
        const sql = 'DELETE FROM carrinho WHERE produto_id = ? AND cliente_id = ?';
        const [result] = await db.query(sql, [produto_id, cliente_id]);
        return result;
    }
}

export default CarrinhoModel;