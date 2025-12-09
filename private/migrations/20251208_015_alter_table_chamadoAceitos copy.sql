
USE dbmt;

CREATE TABLE relatorios_tecnicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chamado_id INT NOT NULL,
    tecnico_id INT NOT NULL, -- ID do funcionário que preencheu
    relatorio TEXT NOT NULL,
    pecas TEXT,              -- Lista de peças
    ferramentas TEXT,        -- Lista de ferramentas
    orcamento DECIMAL(10, 2),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamado (chamado_id),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios (id)
);











USE dbmt;

-- 1. Cria tabela logs
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

-- 2. Cria tabela relatorios_tecnicos
CREATE TABLE IF NOT EXISTS relatorios_tecnicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chamado_id INT NOT NULL,
    tecnico_id INT NOT NULL,
    relatorio TEXT NOT NULL,
    pecas TEXT,
    ferramentas TEXT,
    orcamento DECIMAL(10, 2),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chamado_id) REFERENCES chamado (chamado_id),
    FOREIGN KEY (tecnico_id) REFERENCES usuarios (id)
);

-- 3. Confirma que criou
SHOW TABLES;

-- 4. Verifica se as tabelas existem
SELECT 'logs' as tabela FROM logs LIMIT 0;
SELECT 'relatorios_tecnicos' as tabela FROM relatorios_tecnicos LIMIT 0;