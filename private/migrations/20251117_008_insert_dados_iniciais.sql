-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE dbmt;

-- Inserir usuários iniciais (senha: 12345678)
-- Hash gerado com bcrypt para a senha "12345678" (validado)
INSERT INTO usuarios (nome, email, senha, empresa, cargo, tipo) VALUES
('Administrador', 'admin@produtos.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'manutech', 'administrado', 'ADMIN'),
('FUNCIONARIO Silva', 'func@email.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'manutech', 'estagiario', 'FUNC'),
('USUARIO Souza', 'user@email.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'mercedes-benz', 'supervisor', 'USER');

-- Inserir manutentor iniciais
INSERT INTO manutentor (nome, email, senha, telefone) VALUES
('manutenor gomes', 'manutentor@email.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', '11955978209');

-- Inserir categorias iniciais
INSERT INTO categoria (nome) VALUES
('Pastilhas'),
('Furação'),
('Fresamento'),
('Torneamento'),
('Rosqueamento'),
('Motores'),
('Polias'),
('Correias'),
('Engrenagens');


-- Inserir produtos iniciais
INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('Smartphone Galaxy', 'Celular Samsung Galaxy com 128GB', 1299.99, 1, 'smartphone.jpg'),
('Notebook Dell', 'Notebook Dell Inspiron 15 polegadas', 2499.99, 2, 'notebook.jpg'),
('Camiseta Polo', 'Camiseta polo masculina azul', 89.90, 3, 'camiseta.jpg'),
('Livro JavaScript', 'Livro sobre programação JavaScript', 79.90, 4, 'livro.jpg');


-- Inserir chamados iniciais
INSERT INTO chamado (cliente_id, data_chamado, descricao, modelo_maquina, numero_serie, numero_patrimonio, setor, responsavel, endereco_manutencao, data_manutencao, hora_manutencao, status_code) VALUES
(3, '2025-01-10', 'Problema na tela do smartphone', 'Galaxy S21', 'SN123456', 'PAT001', 'TI', 'João Silva', 'Rua A, 123', '2025-01-12', '10:00:00', 'CRIACAO'),
(3, '2025-01-11', 'Notebook não liga', 'Dell Inspiron 15', 'SN654321', 'PAT002', 'TI', 'Maria Souza', 'Avenida B, 456', '2025-01-13', '14:00:00', 'VISITA');



