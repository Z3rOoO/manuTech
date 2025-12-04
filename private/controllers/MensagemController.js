import MensagemModel from '../models/MensagemModel.js';

class MensagemController {
    
    // enviar a msg 
    static async enviar(req, res) {
        try {
            const { texto, destinatario_id } = req.body; 
            const usuario = req.usuario; 

            if (!texto) return res.status(400).json({ erro: "Texto vazio" });

            await MensagemModel.criar(usuario.id, texto, destinatario_id || null);
            
            res.json({ sucesso: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao enviar mensagem" });
        }
    }

    // 2. Listar TODAS as mensagens (index)
    // 
    static async listar(req, res) {
        try {
          
            const mensagens = await MensagemModel.listar();
            res.json({ sucesso: true, mensagens });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao listar mensagens" });
        }
    }

    // lista de contatos
    static async listarContatos(req, res) {
        try {
            const contatos = await MensagemModel.listarContatos();
            res.json({ sucesso: true, contatos });
        } catch (error) {
           
            res.json({ sucesso: true, contatos: [] }); 
        }
    }

    //busca a conversa
    static async buscarPorUsuario(req, res) {
        try {
            const { idUsuario } = req.params;
            // Nota: O seu MensagemModel precisa ter esse método 'buscarConversa'
            // Se não tiver, vai dar erro. Vou deixar genérico aqui.
            const mensagens = await MensagemModel.listar(); 
            // Filtra na memória por enquanto se o Model não filtrar
            const filtradas = mensagens.filter(m => 
                m.remetente_id == idUsuario || m.destinatario_id == idUsuario
            );
            
            res.json({ sucesso: true, mensagens: filtradas });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro ao buscar conversa" });
        }
    }
}

export default MensagemController;