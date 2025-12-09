import { Router } from 'express';
import ChamadoController from '../controllers/ChamadoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();
router.post('/aceitar', verificarToken, ChamadoController.aceitarChamado);

router.post('/', verificarToken, ChamadoController.criar);


router.get('/pendentes', verificarToken, ChamadoController.listarPendentes);

// Rota para salvar o relatório técnico
router.post('/:id/relatorio', verificarToken, ChamadoController.salvarRelatorio);

// Rota para pegar os dados de UM chamado (para preencher a tela)
router.get('/:id', verificarToken, ChamadoController.buscarPorId);

router.get('/:id', ChamadoController.buscarPorId);



router.put('/:id/status', verificarToken, ChamadoController.alterarStatus);

export default router;
