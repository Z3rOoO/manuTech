-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE chamado (
    chamado_id INTEGER PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    data_chamado DATE NOT NULL,
    descricao TEXT NOT NULL,
    status_code ENUM('VISITA','AVALIACAO', 'ORCAMENTO', 'MANUTENCAO') NOT NULL DEFAULT 'VISITA',
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
);

