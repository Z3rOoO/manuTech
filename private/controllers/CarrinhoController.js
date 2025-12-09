import CarrinhoModel from '../models/CarrinhoModel.js';

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






            const id = await CarrinhoModel.adicionar(adicionar);

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
    // ATUALIZAR QUANTIDADE
    static async atualizarQuantidade(req, res) {
        try {
            const { cliente_id, produto_id, quantidade } = req.body;

            if (!cliente_id || !produto_id || !quantidade) {
                return res.json({
                    sucesso: false,
                    erro: "Dados incompletos (cliente_id, produto_id, quantidade necessários)."
                });
            }

            const resultado = await CarrinhoModel.atualizarQuantidade(
                cliente_id,
                produto_id,
                quantidade
            );

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
    static async finalizarCompra(req, res) {
        try {
            const { cliente_id } = req.body;

            if (!cliente_id) {
                return res.status(400).json({ sucesso: false, erro: 'Cliente_id é obrigatório.' });
            }

            // Aqui você poderia colocar a lógica de registro da compra (ex: salvar pedido), se houver

            // Limpa o carrinho após a compra
            await CarrinhoModel.limparCarrinho(cliente_id);

            res.status(200).json({ sucesso: true, mensagem: 'Compra finalizada e carrinho limpo.' });
        } catch (error) {
            console.error('Erro ao finalizar compra:', error);
            res.status(500).json({ sucesso: false, erro: 'Erro ao finalizar compra.' });
        }
    }
    static async removerItem(req, res) {
        try {
            const { produto_id, cliente_id } = req.body;
            console.log(produto_id);
            console.log(cliente_id);
            console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);console.log(produto_id);
            console.log(cliente_id);
            
            

            if (!produto_id || !cliente_id) {
                return res.status(400).json({ sucesso: false, erro: 'Dados incompletos.' });
            }

            await CarrinhoModel.removerItem(produto_id, cliente_id);

            res.status(200).json({ sucesso: true, mensagem: 'Item removido do carrinho.' });
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
            res.status(500).json({ sucesso: false, erro: 'Erro ao remover item do carrinho.' });
        }
    }

}



export default CarrinhoController;