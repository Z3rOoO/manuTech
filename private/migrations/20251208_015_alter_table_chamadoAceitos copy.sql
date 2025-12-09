-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE chamadoAceitos (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    cliente_id INTEGER NOT NULL,
    chamado_id INTEGER NOT NULL,
    func_id INTEGER NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    orcamento DECIMAL(10, 2) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id),
    FOREIGN KEY (func_id) REFERENCES usuarios (id),
    FOREIGN KEY (chamado_id) REFERENCES chamado (chamado_id)
);





