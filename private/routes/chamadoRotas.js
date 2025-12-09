import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', verificarToken, ChamadoController.criar);

router.get('/pendentes', verificarToken, ChamadoController.listarPendentes);
router.get('/:id', ChamadoController.buscarPorId);

router.put('/:id/status', verificarToken, ChamadoController.alterarStatus);

// Enviar relatório
router.post('/:id/relatorio', verificarToken, ChamadoController.enviarRelatorio);


router.put('/:id/finalizar', verificarToken, ChamadoController.finalizar);

export default router;