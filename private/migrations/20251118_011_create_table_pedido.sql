-- Migration: Criar tabela logs
-- Data: 2025-10-28
-- Descrição: Tabela para registrar logs de acesso às rotas da API
USE dbmt;


CREATE TABLE pedido (
    pedido_id INTEGER PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    quantidade INTEGER NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES Produto (produto_id),
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
);