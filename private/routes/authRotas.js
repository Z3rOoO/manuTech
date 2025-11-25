import { Router } from 'express';
//importacao
import AuthController from '../controllers/AuthController.js'; 
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// aponta para os métodos estaticoS da classe
router.post("/login", AuthController.login);
router.post("/registrar", AuthController.registrar);
router.get("/perfil", verificarToken, AuthController.obterPerfil);

export default router;