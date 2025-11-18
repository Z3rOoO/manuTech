-- Migration: Criar tabela logs
-- Data: 2025-10-28
-- Descrição: Tabela para registrar logs de acesso às rotas da API

USE dbmt;

-- Criação da tabela Mensagens
CREATE TABLE mensagens (
    id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    lida BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (remetente_id) REFERENCES Usuarios(id),
    FOREIGN KEY (destinatario_id) REFERENCES Usuarios(id)
);