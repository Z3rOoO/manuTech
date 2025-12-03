import MensagemModel from '../models/MensagemModel.js';

class MensagemController {
    
    //enviar
    static async enviar(req, res) {
        try {
            const { texto } = req.body;
            const usuario = req.usuario; 

            if (!texto) return res.status(400).json({ erro: "Texto vazio" });

            await MensagemModel.criar(usuario.id, texto);
            res.json({ sucesso: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao enviar" });
        }
    }

    // Listar pelo chat do funcinario
    static async listar(req, res) {
        try {
            const mensagens = await MensagemModel.listar();
            res.json({ sucesso: true, mensagens });
        } catch (error) {
            res.status(500).json({ erro: "Erro ao listar" });
        }
    }
}

export default MensagemController;