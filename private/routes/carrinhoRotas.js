import { Router } from 'express';
//importacao
import CarrinhoController from '../controllers/CarrinhoController.js'; 
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// aponta para os métodos estaticoS da classe

router.get('/:id', CarrinhoController.listar);
router.post('/', CarrinhoController.criar);

export default router;