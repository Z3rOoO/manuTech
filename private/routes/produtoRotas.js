import { Router } from 'express';
import ProdutoController from '../controllers/ProdutoController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
// Se der erro de "Module not found" aqui, é porque falta criar esse arquivo:
import { uploadImagens, handleUploadError } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Rotas Públicas
router.get('/', ProdutoController.listarTodos);
router.get('/:id', ProdutoController.buscarPorId);
router.get('/categoria/:id', ProdutoController.buscarPorCategoria);

// Rotas Protegidas + Upload
router.post('/', verificarToken, uploadImagens.single('imagem'), handleUploadError, ProdutoController.criar);
router.post('/upload', verificarToken, uploadImagens.single('imagem'), handleUploadError, ProdutoController.uploadImagem);
router.put('/:id', verificarToken, uploadImagens.single('imagem'), handleUploadError, ProdutoController.atualizar);
router.delete('/:id', verificarToken, ProdutoController.excluir);


export default router;