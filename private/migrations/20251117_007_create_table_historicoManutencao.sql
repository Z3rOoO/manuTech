-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE Historico_Manutencao (
    historico_id INTEGER PRIMARY KEY,
    chamado_id INTEGER NOT NULL,
    manutentor_id INTEGER NOT NULL,
    data_manutencao DATE NOT NULL,
    FOREIGN KEY (chamado_id) REFERENCES Chamado (chamado_id),
    FOREIGN KEY (manutentor_id) REFERENCES Manutentor (manutentor_id)
);