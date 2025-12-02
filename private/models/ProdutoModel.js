// import { create, read, update, deleteRecord, getConnection } from '../config/database.js';
import db from '../config/database.js';

// Model para operações com produtos
class ProdutoModel {
    // Listar todos os produtos 
    static async listarTodos(limite, offset) {


        try {
            const sql = 'SELECT * FROM produto ORDER BY produto_id DESC LIMIT ? OFFSET ?';

            const [produtos] = await db.query(sql, [limite, offset]);

            const [totalResult] = await db.execute('SELECT COUNT(*) as total FROM produto');
            const total = totalResult[0].total;

            const paginaAtual = (offset / limite) + 1;
            const totalPaginas = Math.ceil(total / limite);

            return {
                produtos,
                total,
                pagina: paginaAtual,
                limite,
                totalPaginas
            };
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }

    // Buscar produto por ID
    static async buscarPorId(id) {
        try {
            const rows = await read('produtos', `id = ${id}`);
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar produto por ID:', error);
            throw error;
        }
    }

    // Criar novo produto
    static async criar(dadosProduto) {
        try {
            return await create('produtos', dadosProduto);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            throw error;
        }
    }

    // Atualizar produto
    static async atualizar(id, dadosProduto) {
        try {
            return await update('produtos', dadosProduto, `id = ${id}`);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            throw error;
        }
    }

    // Excluir produto
    static async excluir(id) {
        try {
            return await deleteRecord('produtos', `id = ${id}`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            throw error;
        }
    }

    // Buscar produtos por categoria
    static async buscarPorCategoria(id) {
        try {
            const sql = 'SELECT * FROM produto WHERE categoria_id = ? ORDER BY produto_id';

            const [produtos] = await db.query(sql, [Number(id)]);
            
            return produtos;
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            throw error;
        }
    }
}


export default ProdutoModel;
