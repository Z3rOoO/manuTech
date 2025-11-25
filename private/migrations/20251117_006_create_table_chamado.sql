-- Migration: Criar tabela produtos
-- Data: 2025-01-15
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;

CREATE TABLE chamado (
    chamado_id INT PRIMARY KEY AUTO_INCREMENT, 
    cliente_id INTEGER NOT NULL,
    data_chamado DATE NOT NULL,
    descricao TEXT NOT NULL,
    modelo_maquina VARCHAR(100) NOT NULL,
    numero_serie VARCHAR(100) NOT NULL,
    numero_patrimonio VARCHAR(100) NOT NULL,
    setor VARCHAR(100) NOT NULL,
    responsavel VARCHAR(100) NOT NULL,
    endereco_manutencao VARCHAR(255) NOT NULL,
    data_manutencao DATE NOT NULL,
    hora_manutencao TIME NOT NULL,
    status_code ENUM('CRIACAO','VISITA','AVALIACAO', 'ORCAMENTO', 'MANUTENCAO') NOT NULL DEFAULT 'VISITA',
    FOREIGN KEY (cliente_id) REFERENCES usuarios (id)
);




