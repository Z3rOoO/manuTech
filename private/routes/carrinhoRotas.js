import { Router } from 'express';
//importacao
import CarrinhoController from '../controllers/CarrinhoController.js'; 
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// aponta para os métodos estaticoS da classe

router.get('/:id', CarrinhoController.listar);
router.put("/atualizar", CarrinhoController.atualizarQuantidade);  // <-- Corrigido aqui
router.post('/', CarrinhoController.criar);
router.post('/finalizar', CarrinhoController.finalizarCompra);
router.delete('/remover', CarrinhoController.removerItem);

export default router;