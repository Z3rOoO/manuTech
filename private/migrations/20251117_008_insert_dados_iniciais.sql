-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE dbmt;

-- Inserir usuários iniciais (senha: 123456)
-- Hash gerado com bcrypt para a senha "123456" (validado)
INSERT INTO usuarios (nome, email, senha, empresa, cargo, tipo) VALUES
('Administrador', 'admin@produtos.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'manutech', 'administrado', 'ADMIN'),
('FUNCIONARIO Silva', 'func@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'manutech', 'estagiario', 'FUNC'),
('USUARIO Souza', 'user@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', 'mercedes-benz', 'supervisor', 'USER');

-- Inserir manutentor iniciais
INSERT INTO manutentor (nome, email, senha, telefone) VALUES
('manutenor gomes', 'manutentor@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', '11955978209');

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
INSERT INTO chamado (cliente_id, data_chamado, descricao, status_code) VALUES
( 1, '2025-01-10', 'testando algo agora', 'VISITA'),
( 2, '2025-01-11', 'Problema com o sistema de pagamento.', 'ORCAMENTO'),
( 3, '2025-01-12', 'Falha na geração de relatórios.', 'MANUTENCAO');

