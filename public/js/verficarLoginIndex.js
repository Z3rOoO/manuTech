function verificarLogin() {
    // Exemplo: dados salvos no login
    // const lStorage = JSON.parse(localStorage);

    const token = localStorage.getItem('token');
    const tipoUser = JSON.parse(localStorage.getItem('usuario'));
    const headerFunc = document.getElementById('header-funcionario');
    const headerPublico = document.getElementById('header-publico');
    const headerLogado = document.getElementById('header-logado');
    const headerAdm = document.getElementById('header-admin');

    // se o usuario estiver deslogado
    if (!token || tipoUser.tipo == 'none') {
        headerPublico.style.display = 'block';
        headerLogado.style.display = 'none';
        headerFunc.style.display = 'none';
        headerAdm.style.display = 'none';
    }
    // se o usuario estiver logado como CLIENTE
    else {
        headerPublico.style.display = 'none';
        headerLogado.style.display = 'block';
        headerFunc.style.display = 'none';
        headerAdm.style.display = 'none';
    }
    // se o usuario estiver logado como FUNCIONARIO
    if (tipoUser.tipo == "FUNC") {
        headerFunc.style.display = 'block';
        headerLogado.style.display = 'none';
        headerPublico.style.display = 'none';
        headerAdm.style.display = 'none';
    }
    // se o usuario estiver logado como ADMIN
    if (tipoUser.tipo == "ADMIN") {
        headerAdm.style.display = 'block';
        headerLogado.style.display = 'none';
        headerPublico.style.display = 'none';
        headerFunc.style.display = 'none';
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);