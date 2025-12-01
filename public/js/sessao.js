
(function protegerPagina() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const paginasPublicas = ['login', 'cadastro', 'index', '/'];
        const caminhoAtual = window.location.pathname.toLowerCase();
        const ehPublica = paginasPublicas.some(pagina => caminhoAtual.includes(pagina));

        if (!token && !ehPublica) {
            alert("Acesso restrito! Faça login.");
            window.location.href = '/login'; 
        }
    }
})();

// logout
function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index';
}
window.fazerLogout = fazerLogout;

// --- 3. PREENCHIMENTO DE DADOS (CORREÇÃO AQUI) ---
document.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        // funcao pra preencher no mobile e no pc
        const preencher = (id, valor) => {
            const elementos = document.querySelectorAll(`#${id}`);
            elementos.forEach(el => el.innerText = valor);
        };

        // nome
        preencher('nome-usuario-menu', `Olá, ${usuario.nome}`);

        //empresa
        preencher('empresa-usuario-menu', usuario.empresa || '');

        // cargo
        if (usuario.cargo) {
            preencher('cargo-usuario-menu', usuario.cargo);
        } else {
            // Esconde se não tiver cargo
            document.querySelectorAll('#cargo-usuario-menu').forEach(el => el.style.display = 'none');
        }
    }
});

async function obterUsuarioLogado() {
    const usuarioSalvo = localStorage.getItem('usuario');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}
export { obterUsuarioLogado };