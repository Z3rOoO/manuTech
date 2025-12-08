
(function protegerPagina() {
    if (typeof window !== 'undefined') {

    
        const token = localStorage.getItem('token');
        const usuarioJson = localStorage.getItem('usuario');

       
        const caminhoAtual = window.location.pathname.toLowerCase();
        const parametros = new URLSearchParams(window.location.search);
        const idAcomp = parametros.get("id"); // agora reconhece /acompanhar?id=123

      
        const paginasPublicas = ['login', 'cadastro', 'index', '/'];
        const ehPublica = paginasPublicas.some(pagina => caminhoAtual.includes(pagina));

       
        if (!token && !ehPublica) {
            alert("É necessário efetuar login para acessar esta página.");
            window.location.href = '/login';
            return;
        }

       
        if (token && usuarioJson) {
            const usuario = JSON.parse(usuarioJson);
            const tipo = usuario.tipo ? usuario.tipo.toUpperCase() : 'USER';

           
            if (caminhoAtual.includes('paineladmin') && tipo !== 'ADMIN') {
                alert("Acesso negado! Área exclusiva para Administradores.");
                window.location.href = '/index';
                return;
            }

            
            const paginasRestritas = ['/chat', '/servicos', '/paineladmin'];

            if (paginasRestritas.some(p => caminhoAtual.startsWith(p))) {
                if (tipo === 'USER') {
                    alert("Acesso restrito a funcionários.");
                    window.location.href = '/index';
                    return;
                }
            }

          
            if (caminhoAtual.includes('acompanhar')) {
                if (!idAcomp) {
                    alert("ID de acompanhamento inválido.");
                    window.location.href = '/index';
                    return;
                }
            }
        }
    }
})();



function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index';
}
window.fazerLogout = fazerLogout;



document.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        const preencher = (id, valor) => {
            document.querySelectorAll(`#${id}`).forEach(el => el.innerText = valor);
        };

        preencher('nome-usuario-menu', `Olá, ${usuario.nome.toUpperCase()}`);
        preencher('empresa-usuario-menu', usuario.empresa.charAt(0).toUpperCase() + usuario.empresa.slice(1));

        if (usuario.cargo) {
            preencher('cargo-usuario-menu', usuario.cargo.charAt(0).toUpperCase() + usuario.cargo.slice(1));
        } else {
            document.querySelectorAll('#cargo-usuario-menu').forEach(el => el.style.display = 'none');
        }
    }
});



async function obterUsuarioLogado() {
    const usuarioSalvo = localStorage.getItem('usuario');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
}

async function logadoBoleana() {
    const dados = localStorage.getItem("usuarioLogado");
    if (!dados) return null;

    try {
        return JSON.parse(dados);
    } catch (e) {
        console.error("Erro ao ler usuário do localStorage:", e);
        return null;
    }
}

window.obterUsuarioLogado = obterUsuarioLogado;
window.logadoBoleana = logadoBoleana;
