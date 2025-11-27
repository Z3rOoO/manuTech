import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', ChamadoController.listar);
router.post('/', verificarToken, ChamadoController.criar);

export default router;