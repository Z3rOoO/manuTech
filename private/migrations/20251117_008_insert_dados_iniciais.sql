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
INSERT INTO usuarios (nome, email, senha, telefone, cargo, tipo) VALUES
('Administrador', 'manutentor@email.com', '$2a$10$BLAcJu1irAzg06WbtoLoPe0RA.hkfZ0oJ25KYARPkHWRweJuWBALy', '11955978209', 'administrado', 'ADMIN');
-- Inserir produtos iniciais
INSERT INTO produtos (nome, descricao, preco, categoria, imagem) VALUES
('Smartphone Galaxy', 'Celular Samsung Galaxy com 128GB', 1299.99, 'Eletrônicos', 'smartphone.jpg'),
('Notebook Dell', 'Notebook Dell Inspiron 15 polegadas', 2499.99, 'Eletrônicos', 'notebook.jpg'),
('Camiseta Polo', 'Camiseta polo masculina azul', 89.90, 'Roupas', 'camiseta.jpg'),
('Livro JavaScript', 'Livro sobre programação JavaScript', 79.90, 'Livros', 'livro.jpg');

