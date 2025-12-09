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