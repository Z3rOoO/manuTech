// Classe de erro customizada para a API
export class ApiError extends Error {
    constructor(mensagem, statusCode = 500, detalhes = null) {
        super(mensagem);
        this.statusCode = statusCode;
        this.detalhes = detalhes;
        this.timestamp = new Date().toISOString();
        this.name = 'ApiError';
        
        // Mantém o stack trace -- strack trace ( linha onde o erro ocorreu)
        Error.captureStackTrace(this, this.constructor);
    }
    
//lembrar de imxportar - import { ApiError } from '../utils/ApiError.js';
// exemplo - throw ApiError.naoEncontrado("Usuário");

    // Método estático para erros de validação        métodos estaticos sao pra adiantar erros,
    static validacao(mensagem, detalhes = null) {    //  deixar de forma automatica
        return new ApiError(mensagem, 400, detalhes);
    }
    
    // Método estático para erros não encontrados
    static naoEncontrado(recurso = 'Recurso') {
        return new ApiError(`${recurso} não encontrado`, 404);
    }
    
    // Método estático para erros de autenticação
    static naoAutorizado(mensagem = 'Não autorizado') {
        return new ApiError(mensagem, 401);
    }
    
    // Método estático para erros de acesso negado
    static acessoNegado(mensagem = 'Acesso negado') {
        return new ApiError(mensagem, 403);
    }
    
    // Método estático para erros internos
    static erroInterno(mensagem = 'Erro interno do servidor') {
        return new ApiError(mensagem, 500);
    }
    
    // Converter para formato JSON de resposta
    toJSON() {
        return {
            sucesso: false,
            erro: this.name,
            mensagem: this.message,
            statusCode: this.statusCode,
            timestamp: this.timestamp,
            ...(this.detalhes && { detalhes: this.detalhes })
        };
    }
}

