function verificarLogin() {
    // Exemplo: dados salvos no login
    const token = localStorage.getItem('token');
    const headerPublico = document.getElementById('header-publico');
    const headerLogado = document.getElementById('header-logado');

    if (!token) {
        headerPublico.style.display = 'none';
        headerLogado.style.display = 'block';
    } else {
        headerPublico.style.display = 'block';
        headerLogado.style.display = 'none';
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);