import ChamadoModel from '../models/ChamadoModel.js';

class ChamadoController {
    
    // Criar chamado
    static async criar(req, res) {
        try {
            const { 
                descricao, modelo_maquina, numero_serie, numero_patrimonio, 
                setor, responsavel, endereco_manutencao, data_manutencao, hora_manutencao
            } = req.body;

            const cliente_id = req.usuario.id; 
            const data_chamado = new Date();

            const novoChamado = {
                cliente_id, data_chamado, descricao, modelo_maquina, 
                numero_serie, numero_patrimonio, setor, responsavel, 
                endereco_manutencao, data_manutencao, hora_manutencao,
                status_code: 'Criado'
            };

            const id = await ChamadoModel.criar(novoChamado);
            res.status(201).json({ sucesso: true, mensagem: "Chamado aberto!", id });

        } catch (error) {
            console.error('Erro ao abrir chamado:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao abrir chamado." });
        }
    }

    // Listar chamados pendentes
    static async listarPendentes(req, res) {
        try {
            const chamados = await ChamadoModel.listarPorStatus('Criado');
            res.json({ sucesso: true, chamados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar serviços." });
        }
    }

    // Aceitar chamado (adicionar relatório, orçamento, funcionário e atualizar status)
    static async aceitarChamado(req, res) {
        try {
            const { chamado_id, descricao, orcamento, func_id } = req.body;

            const atualizado = await ChamadoModel.aceitar({ chamado_id, descricao, orcamento, func_id });

            if (atualizado) {
                res.json({ sucesso: true, mensagem: "Chamado aceito e atualizado!" });
            } else {
                res.status(400).json({ sucesso: false, erro: "Erro ao aceitar chamado." });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ sucesso: false, erro: "Erro interno." });
        }
    }

   static async salvarRelatorio(req, res) {
        try {
            const { id } = req.params; // ID do Chamado
            const { relatorio, pecas, ferramentas, orcamento } = req.body;
            const tecnico_id = req.usuario.id; // ID do Funcionário logado

            await ChamadoModel.criarRelatorio({
                chamado_id: id,
                tecnico_id,
                relatorio,
                pecas,
                ferramentas,
                orcamento
            });

            res.json({ sucesso: true, mensagem: "Relatório salvo e enviado para orçamento!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao salvar relatório." });
        }
    }
    
    // GET /api/chamados/:id (Para preencher os dados na tela antes de preencher o form)
    static async buscarPorId(req, res) {
         try {
            const { id } = req.params;
            // Reutiliza o buscarPorId do model (talvez precise ajustar se ele retorna array)
            const chamado = await ChamadoModel.buscarPorId(id); 
            if(chamado) res.json({ sucesso: true, chamado });
            else res.status(404).json({ sucesso: false, erro: "Não encontrado" });
         } catch (error) {
             res.status(500).json({ erro: "Erro interno" });
         }
    }

    // Alterar status
    static async alterarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status_code } = req.body; 
                    
            const atualizou = await ChamadoModel.atualizarStatus(id, status_code);
                    
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

}

export default ChamadoController;
