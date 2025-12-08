USE dbmt;

-- Cria a tabela logs se não existir
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

-- Cria os índices pra ficar rápido
CREATE INDEX idx_logs_usuario_id ON logs(usuario_id);
CREATE INDEX idx_logs_data_hora ON logs(data_hora);
CREATE INDEX idx_logs_rota ON logs(rota);
CREATE INDEX idx_logs_metodo ON logs(metodo);
CREATE INDEX idx_logs_status_code ON logs(status_code);


ALTER TABLE chamado 
MODIFY COLUMN status_code ENUM('Criado','Aceito','Avaliado','Orçamento','Concluido','VISITA') 
NOT NULL DEFAULT 'Criado';
UPDATE chamado SET status_code = 'VISITA' WHERE chamado_id IN (1,2,3); 