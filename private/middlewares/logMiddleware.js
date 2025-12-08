import db from '../config/database.js';

export const logMiddleware = async (req, res, next) => {
    const startTime = Date.now();

    const logData = {
        rota: req.originalUrl,
        metodo: req.method,
        ip_address: req.ip || req.connection.remoteAddress || req.socket.remoteAddress,
        user_agent: req.get('User-Agent'),
        dados_requisicao: JSON.stringify({
            headers: {
                'content-type': req.get('Content-Type'),
                'authorization': req.get('Authorization') ? 'Bearer [REDACTED]' : null,
                'user-agent': req.get('User-Agent')
            },
            body: req.method !== 'GET' ? sanitizeRequestBody(req.body) : null,
            query: Object.keys(req.query).length > 0 ? req.query : null
        })
    };

    const originalSend = res.send;
    const originalJson = res.json;

    res.send = function(data) {

        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime,
            dados_resposta: JSON.stringify(data || {})
        };

        if (req.usuario && req.usuario.id) {
            finalLogData.usuario_id = req.usuario.id;
        }

        saveLog(finalLogData).catch(err => {
            console.error("Erro ao salvar log:", err.message);
        });

        return originalSend.call(this, data);
    };

    res.json = function(data) {

        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime,
            dados_resposta: JSON.stringify(data || {})
        };

        if (req.usuario && req.usuario.id) {
            finalLogData.usuario_id = req.usuario.id;
        }

        saveLog(finalLogData).catch(err => {
            console.error("Erro ao salvar log:", err.message);
        });

        return originalJson.call(this, data);
    };

    next();
};

function sanitizeRequestBody(body) {
    if (!body || typeof body !== 'object') return body;

    const sanitized = { ...body };
    const sensitiveFields = ['senha', 'password', 'token', 'authorization'];

    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[Dado oculto por motivos de segurança]';
        }
    });

    return sanitized;
}

async function saveLog(logData) {
    try {
        const sql = "INSERT INTO logs SET ?";
        await db.query(sql, [logData]);
        console.log("Log salvo no banco com sucesso");
    } catch (err) {
        console.error("Erro ao inserir log (saveLog):", err.message);
    }
}
