import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

export const verificarToken = (req, res, next) => {
    // ← LINHA CORRIGIDA (ESSA É A SALVAÇÃO)
    const authHeader = req.get('Authorization') || req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            sucesso: false, 
            erro: 'Token não fornecido ou mal formatado',
            mensagem: 'Você precisa estar logado para acessar este recurso.'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            sucesso: false, 
            erro: 'Token mal formatado' 
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_CONFIG.secret);
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