import db, { create, read, update, deleteRecord } from '../config/database.js';

class ProdutoModel {
    static async listarTodos(limite, offset) {
        try {
            const sql = 'SELECT * FROM produto ORDER BY produto_id DESC LIMIT ? OFFSET ?';
            const [produtos] = await db.query(sql, [limite, offset]);

            const [totalResult] = await db.execute('SELECT COUNT(*) AS total FROM produto');
            const total = totalResult[0].total;

            const paginaAtual = (offset / limite) + 1;
            const totalPaginas = Math.ceil(total / limite);

            return { produtos, total, pagina: paginaAtual, limite, totalPaginas };
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        try {
            const rows = await read('produto', `produto_id = ${id}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar por ID:', error);
            throw error;
        }
    }

    static async criar(dadosProduto) {
        try {
            return await create('produto', dadosProduto);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    static async atualizar(id, dadosProduto) {
        try {
            return await update('produto', dadosProduto, `produto_id = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    static async excluir(id) {
        try {
            return await deleteRecord('produto', `produto_id = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    static async buscarPorCategoria(id) {
        try {
            
            return await read('produto', `categoria_id = '${id}'`);
        } catch (error) {
            console.error('Erro ao buscar produtos por categoria:', error);
            throw error;
        }
    }
}

export default ProdutoModel;