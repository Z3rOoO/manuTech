import ChamadoModel from '../models/ChamadoModel.js';

class ChamadoController {

    static async criar(req, res) {
        try {
            const {
                descricao,
                modelo_maquina,
                numero_serie,
                numero_patrimonio,
                setor,
                responsavel,
                endereco_manutencao,
                data_manutencao,
                hora_manutencao
            } = req.body;

            // Token
            const cliente_id = req.usuario.id;
            const data_chamado = new Date(); // Data de hoje

            const novoChamado = {
                cliente_id,
                data_chamado,
                descricao,
                modelo_maquina,
                numero_serie,
                numero_patrimonio,
                setor,
                responsavel,
                endereco_manutencao,
                data_manutencao,
                hora_manutencao,
                status_code: 'criacao' // Status inicial
            };

            const id = await ChamadoModel.criar(novoChamado);

            res.status(201).json({ sucesso: true, mensagem: "Chamado aberto!", id });

        } catch (error) {
            console.error('Erro ao abrir chamado:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao abrir chamado." });
        }
    }
    static async listar(req, res) {
        try {
            const cliente_id = req.usuario.id; // Pega o ID do cliente do token
            const chamados = await ChamadoModel.listarPorCliente(cliente_id);
            res.status(200).json({ sucesso: true, chamados });
            

        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            res.status(500).json({ sucesso: false, erro: "Erro ao listar chamados." });
        }
    }
}

export default ChamadoController;