// --- 1. SISTEMA DE PROTEÇÃO E ACESSO (Roda Imediatamente) ---
(function protegerPagina() {
    if (typeof window !== 'undefined') {
        // 1. PEGAR OS DADOS (Aqui estava faltando o usuarioJson)
        const token = localStorage.getItem('token');
        const usuarioJson = localStorage.getItem('usuario'); // <--- LINHA QUE FALTAVA
        
        const paginasPublicas = ['login', 'cadastro', 'index', '/'];
        const caminhoAtual = window.location.pathname.toLowerCase();
        
        // Verifica se é pública
        const ehPublica = paginasPublicas.some(pagina => caminhoAtual.includes(pagina));

        // BLOQUEIO 1: Não tem token e tenta acessar página privada
        if (!token && !ehPublica) {
            alert("Acesso restrito! Faça login.");
            window.location.href = '/login'; 
            return; // Para tudo
        }

        // BLOQUEIO 2: VERIFICAÇÃO DE CARGO (Se estiver logado)
        if (token && usuarioJson) {
            const usuario = JSON.parse(usuarioJson);
            const tipo = usuario.tipo ? usuario.tipo.toUpperCase() : 'USER'; 

            // REGRA A: Apenas ADMIN entra no painel
            if (caminhoAtual.includes('paineladmin')) {
                if (tipo !== 'ADMIN') {
                    alert("Acesso negado! Área exclusiva para Administradores.");
                    window.location.href = '/home';
                    return;
                }
            }

            // REGRA B: USER (Cliente) não entra no chat nem acompanhamento
            if (caminhoAtual.includes('chat') || caminhoAtual.includes('acompanhamento')) {
                if (tipo === 'USER') {
                    alert("Acesso restrito a funcionários.");
                    window.location.href = '/home';
                    return;
                }
            }
        }
    }
})();

// --- 2. FUNÇÃO DE LOGOUT ---
function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index';
}
// Torna global para o HTML usar onclick="fazerLogout()"
window.fazerLogout = fazerLogout;

// --- 3. PREENCHIMENTO DE DADOS NA TELA ---
document.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        // Função auxiliar para preencher por ID (como no seu código original)
        const preencher = (id, valor) => {
            const elementos = document.querySelectorAll(`#${id}`);
            elementos.forEach(el => el.innerText = valor);
        };

        // Preenche Nome
        preencher('nome-usuario-menu', `Olá, ${usuario.nome}`);

        // Preenche Empresa
        preencher('empresa-usuario-menu', usuario.empresa || '');

        // Preenche Cargo
        if (usuario.cargo) {
            preencher('cargo-usuario-menu', usuario.cargo);
        } else {
            // Esconde se não tiver cargo
            document.querySelectorAll('#cargo-usuario-menu').forEach(el => el.style.display = 'none');
        }
    }
});

// --- 4. EXPORTAÇÃO ---
async function obterUsuarioLogado() {
    const usuarioSalvo = localStorage.getItem('usuario');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}
export { obterUsuarioLogado };