-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE carrinho (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    cliente_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 1,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem VARCHAR(255), 
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id),
    FOREIGN KEY (produto_id) REFERENCES produto (produto_id)
);





