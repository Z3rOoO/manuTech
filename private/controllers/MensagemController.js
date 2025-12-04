import MensagemModel from '../models/MensagemModel.js';

class MensagemController {
    
    // 1. Enviar Mensagem (Serve tanto pro Cliente quanto pro Suporte)
    static async enviar(req, res) {
        try {
            // O front manda { texto: "Olá", destinatario_id: 5 }
            // Se vier do Index (Cliente), destinatario_id vem vazio/null
            // Se vier do Chat (Suporte), destinatario_id é o ID do cliente que ele está respondendo
            const { texto, destinatario_id } = req.body; 
            const usuario = req.usuario; // Dados de quem está logado (vem do Token)

            if (!texto) return res.status(400).json({ erro: "Texto vazio" });

            // Chama o Model passando (Quem Mandou, O Texto, Para Quem)
            await MensagemModel.criar(usuario.id, texto, destinatario_id || null);
            
            res.json({ sucesso: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao enviar mensagem" });
        }
    }

    // 2. Listar Contatos (Para a barra lateral esquerda do Suporte)
    static async listarContatos(req, res) {
        try {
            // Busca apenas usuários que enviaram mensagens
            const contatos = await MensagemModel.listarContatos();
            res.json({ sucesso: true, contatos });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar contatos" });
        }
    }

    // 3. Buscar Conversa Específica (Quando o Suporte clica num nome)
    static async buscarPorUsuario(req, res) {
        try {
            const { idUsuario } = req.params; // ID do cliente que foi clicado
            
            const mensagens = await MensagemModel.buscarConversa(idUsuario);
            
            res.json({ sucesso: true, mensagens });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar conversa" });
        }
    }
}

export default MensagemController;