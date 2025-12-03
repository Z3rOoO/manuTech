import UsuarioModel from '../models/UsuarioModel.js';
 //crud basicao
class UsuarioController {

    // GET /api/usuarios/buscar?email=...
    static async buscarPorEmail(req, res) {
        try {
            const { email } = req.query;
            if(!email) return res.status(400).json({erro: "Email obrigatório"});

            const usuario = await UsuarioModel.buscarPorEmail(email);
            
            if(usuario) {
                // Remove a senha antes de enviar 
                delete usuario.senha;
                res.json({ sucesso: true, usuario });
            } else {
                res.json({ sucesso: false, erro: "Usuário não encontrado" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, erro: "Erro no servidor" });
        }
    }

   
    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;
            
            const atualizou = await UsuarioModel.atualizar(id, dados);
            
            if(atualizou) {
                res.json({ sucesso: true, mensagem: "Atualizado com sucesso" });
            } else {
                res.status(400).json({ sucesso: false, erro: "Falha ao atualizar" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, erro: "Erro ao atualizar" });
        }
    }


    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const excluiu = await UsuarioModel.excluir(id);
            
            if(excluiu) {
                res.json({ sucesso: true, mensagem: "Excluído com sucesso" });
            } else {
                res.status(400).json({ sucesso: false, erro: "Falha ao excluir" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ sucesso: false, erro: "Erro ao excluir" });
        }
    }
}

export default UsuarioController;