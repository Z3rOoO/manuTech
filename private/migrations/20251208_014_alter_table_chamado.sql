-- Migration: Alterar tablea chamado
-- Data: 2025-12-08
-- Descrição: Tabela para armazenar produtos do sistema
USE dbmt;


UPDATE chamado 
SET status_code = 'CRIACAO'
WHERE status_code = '' AND chamado_id > 0;



