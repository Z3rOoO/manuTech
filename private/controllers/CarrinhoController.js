import CarrinhoModel from '../models/ChamadoModel.js';

class CarrinhoController {

    static async criar(req, res) {
        try {
            
            const {
                cliente_id,
                produto_id,
                quantidade,
                nome,
                descricao,
                preco,
                imagem
            } = req.body;

            // Token

            const adicionar = {
                cliente_id, 
                produto_id,
                quantidade,
                nome,
                descricao,
                preco,
                imagem
            }
            console.log(adicionar);
            

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
            
            res.status(200).json({ sucesso: true, carrinho });

            if (!carrinho) {
                return res.status(404).json({ sucesso: false, erro: 'item não encontrado.' });
            }

            res.json({ sucesso: true, dados: carrinho });

        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao listar chamados." });
        }
    }

    
// GET /api/chamados/pendentes
    static async listarPendentes(req, res) {
        try {
            // Busca apenas os que estão como 'VISITA' (ou o status inicial do seu sistema)
            const chamados = await ChamadoModel.listarPorStatus('VISITA');
            res.json({ sucesso: true, chamados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar serviços." });
        }
    }

    // PUT /api/chamados/:id/status
    static async alterarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body; // Ex: 'AVALIACAO' ou 'CANCELADO'
            
            const atualizou = await ChamadoModel.atualizarStatus(id, status);
            
            if (atualizou) {
                res.json({ sucesso: true, mensagem: "Status atualizado!" });
            } else {
                res.status(400).json({ erro: "Erro ao atualizar." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro interno." });
        }
    }
    
    // ATUALIZAR QUANTIDADE
    static async atualizarQuantidade(req, res) {
        try {
            const { produto_id, quantidade } = req.body;

            if (!produto_id || !quantidade) {
                return res.json({
                    sucesso: false,
                    erro: "Dados incompletos."
                });
            }

            const resultado = await CarrinhoModel.atualizarQuantidade(produto_id, quantidade);

            return res.json({
                sucesso: true,
                mensagem: "Quantidade atualizada com sucesso!",
                resultado
            });

        } catch (erro) {
            console.error("Erro ao atualizar quantidade:", erro);
            return res.json({
                sucesso: false,
                erro: "Erro ao atualizar quantidade."
            });
        }
    }



    
}



export default CarrinhoController;