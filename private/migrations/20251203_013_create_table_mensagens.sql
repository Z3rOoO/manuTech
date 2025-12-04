-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE mensagem (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    remetente_id INTEGER NOT NULL,
    destinatario_id INT,
    mensagem TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remetente_id) REFERENCES usuarios (id),
    FOREIGN KEY (destinatario_id) REFERENCES usuarios (id)
);





