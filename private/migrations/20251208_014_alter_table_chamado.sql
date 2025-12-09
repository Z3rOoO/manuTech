-- Migration 14/15 organizada
USE dbmt;

-- 1. Corrige status quebrados do chamado
SET SQL_SAFE_UPDATES = 0;

-- Se algum status vazio
UPDATE chamado 
SET status_code = 'CRIACAO'
WHERE status_code = '' AND chamado_id > 0;

-- Atualiza todos 'CRIACAO' para o status que realmente usamos no sistema
UPDATE chamado 
SET status_code = 'VISITA' 
WHERE status_code = 'CRIACAO';

SET SQL_SAFE_UPDATES = 1;

-- 2. Define ENUM correto para o status do chamado
ALTER TABLE chamado 
MODIFY COLUMN status_code ENUM('Criado','Aceito','Avaliado','Orçamento','Concluido','VISITA') 
NOT NULL DEFAULT 'Criado';

-- 3. Ajusta manualmente os chamados que você quiser
UPDATE chamado SET status_code = 'VISITA' WHERE chamado_id IN (1,2,3);

-- 4. Cria tabela logs se não existir
CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    rota VARCHAR(255) NOT NULL,
    metodo VARCHAR(10) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status_code INT,
    tempo_resposta_ms INT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    dados_requisicao JSON,
    dados_resposta JSON,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 5. Cria índices pra melhorar performance
CREATE INDEX idx_logs_usuario_id ON logs(usuario_id);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);
