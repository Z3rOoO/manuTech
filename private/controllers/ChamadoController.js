import ChamadoModel from '../models/ChamadoModel.js';

class ChamadoController {
    
    // 1. Criar Chamado (Já existia)
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


    static async listarPendentes(req, res) {
        try {
            // Busca apenas os que estão como 'VISITA'
            const chamados = await ChamadoModel.listarPorStatus('Criado');
            res.json({ sucesso: true, chamados });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar serviços." });
        }
    }



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

        return res.json({
            sucesso: true,
            chamado
        });

    } catch (error) {
        console.error("Erro ao buscar chamado por ID:", error);
        return res.status(500).json({
            sucesso: false,
            erro: "Erro interno ao buscar chamado"
        });
    }
}


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