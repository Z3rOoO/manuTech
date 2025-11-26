import ProdutoModel from '../models/ProdutoModel.js';

class ProdutoController {

    // GET /api/produtos
    static async listarTodos(req, res) {
        try {
            const limite = Number(req.query.limite) || 50;
            const pagina = Number(req.query.pagina) || 1;
            const offset = (pagina - 1) * limite;
    
            const resultado = await ProdutoModel.listarTodos(limite, offset);
    
            resultado.produtos = resultado.produtos.map(p => ({
                ...p,
                imagemUrl: p.imagem ? `/upload/${p.imagem}` : null
            }));
    
            res.json({ sucesso: true, ...resultado });
    
        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ sucesso: false, erro: 'Erro ao buscar produtos.' });
        }
    }

    // GET /api/produtos/:id
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.buscarPorId(id);

            if (!produto) {
                return res.status(404).json({ sucesso: false, erro: 'Produto não encontrado.' });
            }
            if (produto.imagem) {
                produto.imagemUrl = `/uploads/imagens/${produto.imagem}`;
            }

            res.json({ sucesso: true, dados: produto });
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            res.status(500).json({ sucesso: false, erro: 'Erro interno.' });
        }
    }

    // POST /api/produtos/upload
    static async uploadImagem(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ sucesso: false, erro: 'Nenhuma imagem enviada.' });
            }
            res.json({ 
                sucesso: true, 
                mensagem: 'Upload realizado',
                arquivo: req.file.filename,
                url: `/uploads/imagens/${req.file.filename}`
            });
        } catch (error) {
            console.error('Erro no upload:', error);
            res.status(500).json({ sucesso: false, erro: 'Falha no upload.' });
        }
    }

    // POST /api/produtos
    static async criar(req, res) {
        try {
            const { nome, descricao, preco, estoque } = req.body;
            // Se veio arquivo no upload, usa o nome dele. Se não, null.
            const imagem = req.file ? req.file.filename : null;

            if (!nome || !preco) {
                return res.status(400).json({ sucesso: false, erro: 'Nome e Preço obrigatórios.' });
            }

            const novoProduto = { nome, descricao, preco, estoque, imagem };
            const id = await ProdutoModel.criar(novoProduto);

            res.status(201).json({ 
                sucesso: true, 
                mensagem: 'Produto criado!', 
                dados: { id, ...novoProduto } 
            });
        } catch (error) {
            console.error('Erro ao criar:', error);
            res.status(500).json({ sucesso: false, erro: 'Erro ao criar produto.' });
        }
    }

    // PUT /api/produtos/:id
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            if (req.file) {
                dados.imagem = req.file.filename;
            }
            const linhas = await ProdutoModel.atualizar(id, dados);
            if (!linhas) return res.status(404).json({ erro: 'Produto não encontrado' });
            res.json({ sucesso: true, mensagem: 'Produto atualizado!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar' });
        }
    }

    // DELETE /api/produtos/:id
    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const linhas = await ProdutoModel.excluir(id);
            if (!linhas) return res.status(404).json({ erro: 'Produto não encontrado' });
            res.json({ sucesso: true, mensagem: 'Produto excluído!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao excluir' });
        }
    }
}

export default ProdutoController;