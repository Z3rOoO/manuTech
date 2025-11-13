import jwt from "jsonwebtoken";
import { ApiError } from '../utils/ApiError.js'

export function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];// separar baerer

  if (!token) {
    throw ApiError.naoAutorizado("Token não fornecido")
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ve se o token é valido, se foi gerado no servidor e se nao
    req.user = decoded;                                        // da erro
    next();
  } catch (err) {
    throw ApiError.acessoNegado("Token inválido")
  }
}