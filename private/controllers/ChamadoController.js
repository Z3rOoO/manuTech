import ChamadoModel from '../models/ChamadoModel.js';

class ChamadoController {

    // 1. Criar Chamado
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

    // 2. Listar Chamados Pendentes
    static async listarPendentes(req, res) {
        try {
            const chamados = await ChamadoModel.listarPorStatus('Criado');
            res.json({ sucesso: true, chamados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar serviços." });
        }
    }

    // 3. Buscar Chamado por ID
    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const chamado = await ChamadoModel.buscarPorId(id);

            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: "Chamado não encontrado"
                });
            }

            return res.json({ sucesso: true, chamado });

        } catch (error) {
            console.error("Erro ao buscar chamado por ID:", error);
            return res.status(500).json({
                sucesso: false,
                erro: "Erro interno ao buscar chamado"
            });
        }
    }

    // 4. Alterar Status do Chamado
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

   // 5. Enviar Relatório Técnico
static async enviarRelatorio(req, res) {
    try {
        const { id } = req.params;
        const { relatorio, pecas, ferramentas, orcamento } = req.body;
        const tecnico_id = req.usuario.id; // ID do funcionário logado

        await ChamadoModel.atualizarRelatorio(id, tecnico_id, { 
            relatorio, 
            pecas, 
            ferramentas, 
            orcamento
        });

        return res.json({ sucesso: true, mensagem: "Relatório enviado com sucesso!" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ sucesso: false, erro: "Erro ao enviar relatório." });
    }
}

    // Adiciona essa função no final, antes do export default

// 6. Finalizar Chamado
static async finalizar(req, res) {
    try {
        const { id } = req.params;
        
        // Muda o status pra Concluido
        const finalizou = await ChamadoModel.atualizarStatus(id, 'Concluido');
        
        if (finalizou) {
            return res.json({ 
                sucesso: true, 
                mensagem: "Chamado finalizado com sucesso!" 
            });
        } else {
            return res.status(400).json({ 
                sucesso: false, 
                erro: "Erro ao finalizar chamado." 
            });
        }
        
    } catch (error) {
        console.error("Erro ao finalizar chamado:", error);
        return res.status(500).json({ 
            sucesso: false, 
            erro: "Erro interno ao finalizar chamado." 
        });
    }
}

}

export default ChamadoController;
