import CarrinhoModel from '../models/ChamadoModel.js';

class CarrinhoControler {

    static async criar(req, res) {
        try {
            const {
                produto_id,
                quantidade,
                nome,
                descricao,
                preco,
                imagem
            } = req.body;

            // Token
            const cliente_id = req.usuario.id;

            const adicionar = {
                cliente_id,
                produto_id,
                quantidade,
                nome,
                descricao,
                preco,
                imagem
            };

            const id = await CarrinhoModel.criar(adicionar);

            res.status(201).json({ sucesso: true, mensagem: "Produto adicionado ao carrinho", id });

        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao adicionar ao carrinho." });
        }
    }
    static async listar(req, res) {
        try {
            console.log(req.usuario);
            
            const { id } = req.params; // Pega o ID do cliente do token
            const carrinho = await CarrinhoModel.listarPorCliente(id);
            res.status(200).json({ sucesso: true, chamados });

            if (!carrinho) {
                return res.status(404).json({ sucesso: false, erro: 'item não encontrado.' });
            }

            res.json({ sucesso: true, dados: carrinho });

        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao listar chamados." });
        }
    }
}



export default CarrinhoControler;