import { Router } from 'express';
// 1. IMPORTAÇÃO CORRETA (default)
import AuthController from '../controllers/AuthController.js'; 
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// 2. Aponta para os métodos ESTÁTICOS da classe
router.post("/login", AuthController.login);
router.post("/registrar", AuthController.registrar);
router.get("/perfil", verificarToken, AuthController.obterPerfil);

export default router;