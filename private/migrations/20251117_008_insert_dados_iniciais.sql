-- Migration: Inserir dados iniciais
-- Data: 2025-01-15
-- Descrição: Dados iniciais para teste do sistema

USE dbmt;

-- Inserir usuários iniciais (senha: 12345678)
-- Hash gerado com bcrypt para a senha "12345678" (validado)
INSERT INTO usuarios (nome, email, senha, empresa, cargo, cnpj, tipo) VALUES
('Administrador', 'admin@produtos.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'manutech', 'administrado', '1212121212121212', 'ADMIN'),
('FUNCIONARIO Silva', 'func@email.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'manutech', 'estagiario', '1212121212121212','FUNC'),
('USUARIO Souza', 'user@email.com', '$2b$10$MPYBVCBAPOdcQgPrr1wyDeMggsTArUL1pkvHGOPIi5W6OC363HHle', 'mercedes-benz', 'supervisor', '1212121212121212','USER');

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
('RPMX 060400-SM 1205', 'descrição', 17.30 , 1, 'RPMX060400-SM1205.png'),
('SNGN120708T01020 675', 'descrição', 47.10, 1, 'SNGN120708T01020675.png'),
('TPGN160312T01020 675', 'descrição', 39.95, 1, 'TPGN160312T01020675.png'),
('CCET 06 02 01-UM 1205', 'descrição', 28.15, 1, 'CCET060201-UM1205.png'),
('CCGX 06 02 04-AL 1205', 'descrição', 24.30, 1, 'CCGX060204-AL1205.png'),
('DNGN150412T01020 675', 'descrição', 49.65, 1, 'DNGN150412T01020675.png'),
('RCHT 10 T3 M0-PL 1230', 'descrição', 18.40, 1, 'RCHT10T3M0-PL1230.png'),
('RNGN120700T01020 675', 'descrição', 47.10, 1, 'RNGN120700T01020675.png'),
('VBMT 16 04 08-PM 1625', 'descrição', 22.70, 1, 'VBMT160408-PM1625.png'),
('WNMG 06 04 04-PF 1625', 'descrição', 15.35, 1, 'WNMG060404-PF1625.png'),
('CNGN120416T01020 675', 'descrição', 42.25, 1, 'CNGN120416T01020675.png'),
('TNMG 16 04 04-PF 1625', 'descrição', 15.35, 1, 'TNMG160404-PF1625.png'),
('VBMT 11 02 08-UF 1625', 'descrição', 20.45, 1, 'VBMT110208-UF1625.png'),
('SNMG 12 04 08-PF 1625', 'descrição', 17.45, 1, 'SNMG120408-PF1625.png'),
('TCGT 09 02 04L-K 1625', 'descrição', 21.40, 1, 'TCGT090204L-K1625.png'),
('TCMX 09 02 04-WF 1625', 'descrição', 13.20, 1, 'TCMX090204-WF1625.png'),
('CCMT 09 T3 08-PF 1625', 'descrição', 14.05, 1, 'CCMT09T308-PF1625.png'),
('DCMT 07 02 08-PM 1625', 'descrição', 12.10, 1, 'DCMT070208-PM1625.png'),
('DCMX 11 T3 08-WF 1625', 'descrição', 18.65, 1, 'DCMX11T308-WF1625.png'),
('DCMT 11 T3 04-PF 1625', 'descrição', 16.20, 1, 'DCMT11T304-PF1625.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('DE10-D0900-090A12-3', 'descrição', 337.00 , 2, 'DE10-D0900-090A12-3.png'),
('DE10-D0900-090A12-8', 'descrição', 442.00, 2, 'DE10-D0900-090A12-8.png'),
('DE10-D0950-095A12-3', 'descrição', 339.00, 2, 'DE10-D0950-095A12-3.png'),
('DE10-D0950-095A12-8', 'descrição', 452.00, 2, 'DE10-D0950-095A12-8.png'),
('DE10-D1000-100LX16-3', 'descrição', 341.00, 2, 'DE10-D1000-100LX16-3.png'),
('DE10-D1000-100LX16-8', 'descrição', 447.00, 2, 'DE10-D1000-100LX16-8.png'),
('DE10-D1050-105L16-8', 'descrição', 475.00, 2, 'DE10-D1050-105L16-8.png'),
('DE10-D1050-105LX16-8', 'descrição', 475.00, 2, 'DE10-D1050-105LX16-8.png'),
('DE10-D1100-110L16-8', 'descrição', 475.00, 2, 'DE10-D1100-110L16-8.png'),
('DE10-D1100-110LX16-8', 'descrição', 475.00, 2, 'DE10-D1100-110LX16-8.png'),
('462.1-0003-000A0-XM X0BU', 'descrição', 43.15, 2, '462.1-0003-000A0-XMX0BU.png'),
('462.1-0009-000A0-XM X0BU', 'descrição', 44.85, 2, '462.1-0009-000A0-XMX0BU.png'),
('462.1-0022-001A0-XM X0BM', 'descrição', 51.70, 2, '462.1-0022-001A0-XMX0BM.png'),
('462.1-0037-001A0-XM X0BM', 'descrição', 52.90, 2, '462.1-0037-001A0-XMX0BM.png'),
('462.1-0053-002A0-XM X0BM', 'descrição', 56.00, 2, '462.1-0053-002A0-XMX0BM.png'),
('462.1-0086-004A0-XM X0BU', 'descrição', 53.20, 2, '462.1-0086-004A0-XMX0BU.png'),
('462.1-0116-006A0-XM X0BU', 'descrição', 56.00, 2, '462.1-0116-006A0-XMX0BU.png'),
('462.1-0124-006A0-XM X0BM', 'descrição', 62.30, 2, '462.1-0124-006A0-XMX0BM.png'),
('462.1-0200-008A0-XM X0BU', 'descrição', 58.80, 2, '462.1-0200-008A0-XMX0BU.png'),
('462.1-0212-009A0-XM X0BU', 'descrição', 58.80, 2, '462.1-0212-009A0-XMX0BU.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('1K212-0575-XA 1730', 'descrição', 66.70, 3, '1K212-0575-XA1730.png'),
('1K212-1370-XB 1730', 'descrição', 164.00, 3, '1K212-1370-XB1730.png'),
('1K313-1400-XB 1730', 'descrição', 173.00, 3, '1K313-1400-XB1730.png'),
('1K344-0650-XD 1730', 'descrição', 115.00, 3, '1K344-0650-XD1730.png'),
('1K344-1800-XD 1730', 'descrição', 361.00, 3, '1K344-1800-XD1730.png'),
('1K354-0800-XD 1730', 'descrição', 122.00, 3, '1K354-0800-XD1730.png'),
('1K365-0300-XC 1730', 'descrição', 99.00, 3, '1K365-0300-XC1730.png'),
('1K377-0600-XD 1730', 'descrição', 139.00, 3, '1K377-0600-XD1730.png'),
('1K377-1200-XD 1730', 'descrição', 253.00, 3, '1K377-1200-XD1730.png'),
('A316-25SL442-10008P 1730', 'descrição', 381.00, 3, 'A316-25SL442-10008P1730.png'),
('MS40-AR051R19-34M', 'descrição', 778.00, 3, 'MS40-AR051R19-34M.png'),
('MS40-R080Q32-56M', 'descrição', 986.00, 3, 'MS40-R080Q32-56M.png'),
('2F366-0953-038-TD 1745', 'descrição', 253.00, 3, '2F366-0953-038-TD1745.png'),
('2A146-0600A012-RCMH R2AH', 'descrição', 364.00, 3, '2A146-0600A012-RCMHR2AH.png'),
('MS20D-R020A20-10L', 'descrição', 935.00, 3, 'MS20D-R020A20-10L.png'),
('MS20D-R032A32-10H', 'descrição', 817.00, 3, 'MS20D-R032A32-10H.png'),
('MS60-AR038R19-11H', 'descrição', 647.00, 3, 'MS60-AR038R19-11H.png'),
('MS60-AR051R19-11H', 'descrição', 917.00, 3, 'MS60-AR051R19-11H.png'),
('MS60-R025A25-11M', 'descrição', 473.00, 3, 'MS60-R025A25-11M.png'),
('MS60-R032A32-11M', 'descrição', 560.00, 3, 'MS60-R032A32-11M.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('HT06-DDMNL-00130-15C', 'descrição', 1027.00, 4, 'HT06-DDMNL-00130-15C.png'),
('HT06-TR-D13MCL-00130C', 'descrição', 733.00, 4, 'HT06-TR-D13MCL-00130C.png'),
('HT10-CP70BL00130-12B', 'descrição', 1393.00, 4, 'HT10-CP70BL00130-12B.png'),
('HT10-CP75AL00130-11C', 'descrição', 1393.00, 4, 'HT10-CP75AL00130-11C.png'),
('C2A-CC5-LFJ18B-120CB', 'descrição', 799.00, 4, 'C2A-CC5-LFJ18B-120CB.png'),
('C2R-CC3-LD15GB', 'descrição', 394.00, 4, 'C2R-CC3-LD15GB.png'),
('C2R-QSM16-LE17AD', 'descrição', 218.00, 4, 'C2R-QSM16-LE17AD.png'),
('C2R-QSM16-RE17AD', 'descrição', 218.00, 4, 'C2R-QSM16-RE17AD.png'),
('C2T-CC6-NG20BB', 'descrição', 509.00, 4, 'C2T-CC6-NG20BB.png'),
('C2T-CF40-RX20J25GB', 'descrição', 500.00, 4, 'C2T-CF40-RX20J25GB.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('T100-PM104AA-M10 P1PL', 'descrição', 145.00 , 5, 'T100-PM104AA-M10P1PL.png'),
('T100-PM104AE-5/16 P1PL', 'descrição', 119.00, 5, 'T100-PM104AE-516P1PL.png'),
('T100-PM105AA-M16 P1PL', 'descrição', 268.00, 5, 'T100-PM105AA-M16P1PL.png'),
('T100-PM105DA-M16 P1PL', 'descrição', 268.00, 5, 'T100-PM105DA-M16 P1PL.png'),
('T200-PD101DA-M24 D110', 'descrição', 339.00, 5, 'T200-PD101DA-M24D110.png'),
('T100-NM100DA-M4 N1PR', 'descrição', 65.90, 5, 'T100-NM100DA-M4N1PR.png'),
('T100-NM102AA-M3 N1PR', 'descrição', 65.90, 5, 'T100-NM102AA-M3N1PR.png'),
('T100-NM102JA-M5 N1PR', 'descrição', 69.40, 5, 'T100-NM102JA-M5N1PR.png'),
('T100-NM103DB-M5X050 N1PR', 'descrição', 74.30, 5, 'T100-NM103DB-M5X050N1PR.png'),
('T100-NM105DB-M10X125N1PR', 'descrição', 140.00, 5, 'T100-NM105DB-M10X125N1PR.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('HA06-SH06Q-S-200', 'descrição', 558.00 , 6, 'HA06-SH06Q-S-200.png'),
('HA06-SH20Q-S-160', 'descrição', 558.00, 6, 'HA06-SH20Q-S-160.png'),
('HT06-131-00118-25', 'descrição', 958.00, 6, 'HT06-131-00118-25.png'),
('970-HA06-25-128A', 'descrição', 1573.00, 6, '970-HA06-25-128A.png'),
('970-HA10-20-115A', 'descrição', 1529.00, 6, '970-HA10-20-115A.png'),
('970-HA10-32-138A', 'descrição', 2001.00, 6, '970-HA10-32-138A.png'),
('A392.54514-4016067', 'descrição', 453.00, 6, 'A392.54514-4016067.png'),
('A392.54514-4016105', 'descrição', 475.00, 6, 'A392.54514-4016105.png'),
('HA04-EH10-10-040', 'descrição', 418.00, 6, 'HA04-EH10-10-040.png'),
('HA04-EH20-20-045', 'descrição', 574.00, 6, 'HA04-EH20-20-045.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('RPMX 060400-SM 1205', 'descrição', 17.30 , 7, ' RPMX060400-SM1205.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png'),
('nome', 'descrição', preço, 7, 'imagem.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('RPMX 060400-SM 1205', 'descrição', 17.30 , 8, ' RPMX060400-SM1205.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png'),
('nome', 'descrição', preço, 8, 'imagem.png');

INSERT INTO produto (nome, descricao, preco, categoria_id, imagem) VALUES
('RPMX 060400-SM 1205', 'descrição', 17.30 , 9, ' RPMX060400-SM1205.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png'),
('nome', 'descrição', preço, 9, 'imagem.png');

-- Inserir chamados iniciais
INSERT INTO chamado (cliente_id, data_chamado, descricao, modelo_maquina, numero_serie, numero_patrimonio, setor, responsavel, endereco_manutencao, data_manutencao, hora_manutencao, status_code) VALUES
(3, '2025-01-10', 'Problema na tela do smartphone', 'Galaxy S21', 'SN123451', 'PAT001', 'TI', 'João Silva', 'Rua A, 123', '2025-01-12', '10:00:00', 'Criado'),
(3, '2025-01-11', 'Notebook não liga', 'Dell Inspiron 15', 'SN123452', 'PAT002', 'TI', 'Maria Souza', 'Avenida B, 456', '2025-01-13', '14:00:00', 'Aceito'),
(3, '2025-01-12', 'Notebook não liga', 'Dell Inspiron 15', 'SN123453', 'PAT003', 'TI', 'Maria Souza', 'Avenida B, 456', '2025-01-13', '14:00:00', 'Avaliado'),
(3, '2025-01-13', 'Notebook não liga', 'Dell Inspiron 15', 'SN123454', 'PAT004', 'TI', 'Maria Souza', 'Avenida B, 456', '2025-01-13', '14:00:00', 'Orçamento'),
(3, '2025-01-14', 'Notebook não liga', 'Dell Inspiron 15', 'SN123455', 'PAT00', 'TI', 'Maria Souza', 'Avenida B, 456', '2025-01-13', '14:00:00', 'Concluido');


