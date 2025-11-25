// import { create } from '../config/database.js';
import db from '../config/database.js';

// middlewae para registrar logs de acesso
export const logMiddleware = async (req, res, next) => {
    const startTime = Date.now();
    
    //pegar dados da requisição
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

    // pegar a resposta e deixar para json ou send
    const originalSend = res.send;
    const originalJson = res.json;
    
    res.send = function(data) {
        // Capturar dados atualizados no momento da resposta (após todos os middlewares executarem)
        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime
        };
        
        // pegar usuário se autenticado 
        if (req.usuario && req.usuario.id) {
            finalLogData.usuario_id = req.usuario.id;
        }
        
        // resposta
        if (res.statusCode >= 400) {
            finalLogData.dados_resposta = JSON.stringify({
                error: true,
                status: res.statusCode,
                message: typeof data === 'string' ? data.substring(0, 500) : data
            });
        }
        
        //impedir de bloquear a resposta
        saveLog(finalLogData).catch(error => {
            console.error('Erro ao salvar log:', error);
        });
        
        return originalSend.call(this, data);
    };
    
    res.json = function(data) {
       
        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime
        };
        
        
        if (req.usuario && req.usuario.id) {
            finalLogData.usuario_id = req.usuario.id;
        }
        
       
        if (res.statusCode >= 400) {
            finalLogData.dados_resposta = {
                error: true,
                status: res.statusCode,
                message: typeof data === 'object' ? JSON.stringify(data).substring(0, 500) : data
            };
        }
        
       
        saveLog(finalLogData).catch(error => {
            console.error('Erro ao salvar log:', error);
        });
        
        return originalJson.call(this, data);
    };

    next();
};

// funcao para censurar certas palavras quando pega algo do boddy,
function sanitizeRequestBody(body) {
    if (!body || typeof body !== 'object') return body;
    
    const sanitized = { ...body };
    
   
    const sensitiveFields = ['senha', 'password', 'token', 'authorization'];// se tiver essas palavras
    sensitiveFields.forEach(field => {                                     //troca por REDACTED
        if (sanitized[field]) {
            sanitized[field] = '[Dado oculto por motivos de segurança]'; //readcted
        }
    });
    
    return sanitized;
}

//guarda as informcão no mysql
async function saveLog(logData) {
    try {
        // pega uma variavel do js e ja trasnforma automaticamente em um insert into
        const sql = "INSERT INTO logs SET ?";
        await db.query(sql, [logData]); // Executa a query com o db

        console.log('Log salvo no banco com sucesso');

    } catch (dbError) {
        // caso ocorra erro, o site continua funiconando
        console.error('Erro ao inserir log no banco (dentAF da saveLog):', dbError.message);
    }
}

// middleare para log basico, mostrando a data, o usuario, o ip, etc, mas sem mostrar a senha e coisas privadas
export const simpleLogMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString(); 
    const usuario = req.usuario ? `[${req.usuario.email}]` : '[Anônimo]';
    
    console.log(`${timestamp} - ${req.method} ${req.originalUrl} ${usuario} - IP: ${req.ip || 'N/A'}`);
    
    next();
};
