-- Migration: Alterar tablea chamado
-- Data: 2025-12-08
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;


UPDATE chamado 
SET status_code = 'CRIACAO'
WHERE status_code = '' AND chamado_id > 0;



SET SQL_SAFE_UPDATES = 0;

-- 2. Corrige todos os status quebrados que alguém colocou como 'CRIACAO'
UPDATE chamado 
SET status_code = 'VISITA' 
WHERE status_code = 'CRIACAO';

-- 3. Adiciona os status que você realmente usa no seu sistema
ALTER TABLE chamado 
MODIFY COLUMN status_code ENUM('Criado','Aceito','Avaliado','Orçamento','Concluido','CRIACAO','VISITA') 
NOT NULL DEFAULT 'Criado';

-- 4. Reativa o modo seguro (pra não fazer merda depois)
SET SQL_SAFE_UPDATES = 1;
