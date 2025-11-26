import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; //seguranca
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

//rotas (importar)
import produtoRotas from './routes/produtoRotas.js';
import authRotas from './routes/authRotas.js';
import criptografiaRotas from './routes/criptografiaRotas.js';
import usuarioRotas from './routes/usuarioRotas.js';
import chamadoRotas from './routes/chamadoRotas.js';

import { logMiddleware } from './middlewares/logMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url); //pega o caminho do app.js
const __dirname = path.dirname(__filename); //pega a pasta do app.js

app.use(express.json());
app.use(logMiddleware);


//  acessa localhost:3000/style/style.css direto
app.use(express.static(path.join(__dirname, '../public')));
app.use('/upload', express.static(path.join(__dirname, 'uploads')));

// rotas backend
app.use('/api/auth', authRotas);
app.use('/api/produtos', produtoRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/usuarios', usuarioRotas);
app.use('/api/chamados', chamadoRotas);


const siteRouter = express.Router();


const htmlPath = path.join(__dirname, '../public/html');

siteRouter.get('/login', (req, res) => res.sendFile(path.join(htmlPath, 'login.html')));
siteRouter.get('/cadastro', (req, res) => res.sendFile(path.join(htmlPath, 'cadastro.html')));
siteRouter.get('/home', (req, res) => res.sendFile(path.join(htmlPath, 'home.html')));
siteRouter.get('/index', (req, res) => res.sendFile(path.join(htmlPath, 'index.html'))); // Opcional se já tem redirect na raiz
siteRouter.get('/chat', (req, res) => res.sendFile(path.join(htmlPath, 'chat.html')));
siteRouter.get('/chamado', (req, res) => res.sendFile(path.join(htmlPath, 'chamado.html')));
siteRouter.get('/carrinho', (req, res) => res.sendFile(path.join(htmlPath, 'carrinho.html')));
siteRouter.get('/produto', (req, res) => res.sendFile(path.join(htmlPath, 'produto.html')));
siteRouter.get('/produtos', (req, res) => res.sendFile(path.join(htmlPath, 'produtos.html')));
siteRouter.get('/catalogo', (req, res) => res.sendFile(path.join(htmlPath, 'catalogo.html')));
siteRouter.get('/painelAdmin', (req, res) => res.sendFile(path.join(htmlPath, 'painelAdmin.html')));
siteRouter.get('/teste', (req, res) => res.sendFile(path.join(htmlPath, 'teste.html')));
siteRouter.get('/acompanhamento', (req, res) => res.sendFile(path.join(htmlPath, 'acompanhamento.html')));

// deixa padrao ( tirando o manutech q tava antes)
app.use('/', siteRouter); 

// caminho padrao é o index
app.get('/', (req, res) => {
    res.redirect('/index'); 
});

// (404 e 500) 
app.use('*', (req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: `Página não encontrada`,
        mensagem: `A rota ${req.originalUrl} não existe.`
    });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;