-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE Categoria (
    categoria_id INTEGER PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);