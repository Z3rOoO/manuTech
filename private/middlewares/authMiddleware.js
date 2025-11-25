import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

export const verificarToken = (req, res, next) => {
    // 
    const authHeader = req.headers.authorization;

    // ve se ta logado e tem token
    if (!authHeader) {
        return res.status(401).json({ 
            sucesso: false, 
            erro: 'Token não fornecido',
            mensagem: 'Você precisa estar logado para acessar este recurso.'
        });
    }

    // 3. Separa o Bearer
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            sucesso: false, 
            erro: 'Token mal formatado' 
        });
    }

    try {
        // token
        const decoded = jwt.verify(token, JWT_CONFIG.secret);

      
        //  Controlle racessa 'req.usuario.id'
        req.usuario = decoded; 

        
        next();

    } catch (error) {
        return res.status(401).json({ 
            sucesso: false, 
            erro: 'Token inválido ou expirado',
            mensagem: 'Faça login novamente.'
        });
    }
};