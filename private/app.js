import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet' //seguranca
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

//rotas (importar)
import produtoRotas from './routes/produtoRotas.js'
import authRotas from './routes/authRotas.js'
import criptografiaRotas from './routes/criptografiaRotas.js'
import usuarioRotas from './routes/usuarioRotas.js'

import { logMiddleware} from './middlewares/logMiddleware.js'
import {errorMiddleware} from './middlewares/errorMiddleware.js'
import path from 'path';

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url) //pega o caminho do app.js
const __dirname = path.dirname(__filename)//pega a pasta do app.js


app.use(express.json()); 

//imagens etc (e public)
app.use('/upload', express.static(path.join(__dirname,'uploads')))// torna os itens do upload visiveis

app.use(express.static(path.join(__dirname, '../public'), {
 index: 'html/index.html' // TORNA A PASTA PUBLIC A RAIZ DO SITE
}));

app.use(logMiddleware)

//rotas (API)
app.use('/api/auth', authRotas);
app.use('/api/produtos', produtoRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/usuarios', usuarioRotas);

//rotas 

//-------------------------------------
//imagens etc (e public)
app.use('/upload', express.static(path.join(__dirname, 'uploads'))); // torna os itens do upload visiveis

// Configura arquivos estáticos para funcionarem na raiz e no prefixo /manutech
app.use(express.static(path.join(__dirname, '../public')));
app.use('/manutech', express.static(path.join(__dirname, '../public')));

app.use(logMiddleware);

//rotas
app.use('/api/auth', authRotas);
app.use('/api/produtos', produtoRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/usuarios', usuarioRotas);

// --- ROTAS DO SITE ( /manutech) ---
const siteRouter = express.Router();

siteRouter.get('/login', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/login.html')); });
siteRouter.get('/cadastro', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/cadastro.html')); });
siteRouter.get('/home', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/home.html')); });
siteRouter.get('/index', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/index.html')); });
siteRouter.get('/chat', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/chat.html')); });
siteRouter.get('/chamado', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/chamado.html')); });
siteRouter.get('/carrinho', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/carrinho.html')); });
siteRouter.get('/produto', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/produto.html')); });
siteRouter.get('/catalogo', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/catalogo.html')); });
siteRouter.get('/painelAdmin', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/painelAdmin.html')); });
siteRouter.get('/teste', (req, res) => { res.sendFile(path.join(__dirname, '../public/html/teste.html')); });


app.use('/manutech', siteRouter); //pega as rotas anteriores e coloca manutech na frente

// Redireciona o localhost sem nada para a home
app.get('/', (req, res) => {
    res.redirect('/manutech/home');
});
//---------------------------------
app.use('*', (req,res)=>{
 res.status(404).json({
 sucesso:false,
 erro: `Página não encontrada`, mensagem: `A página/rota ${req.method} ${req.originalUrl} não foi encontrada` //${req.method} ${req.originalUrl}  - pega a rota/pag do usuario
 })
})


app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
 console.log(`Servidor rodando em http:localhost:${PORT}`)
})

export default app;
//express-async-error mostra erros no express sem usar try catch ou next / facilita