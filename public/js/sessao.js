//logout
function fazerLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index';
}

document.addEventListener('DOMContentLoaded', () => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
        const usuario = JSON.parse(usuarioSalvo);

        // MENU
        const spanNome = document.getElementById('nome-usuario-menu');
        if (spanNome) spanNome.innerText = `Olá, ${usuario.nome}`;

        const spanCargo = document.getElementById('cargo-usuario-menu');
        if (spanCargo) {
            if (usuario.cargo) {
                spanCargo.innerText = `${usuario.empresa || 'Empresa'}`;
            } else {
                spanCargo.style.display = 'none';
            }
        }

        // MODAL
        const spanNome2 = document.getElementById('nome-usuario-menuCEL');
        if (spanNome2) spanNome2.innerText = `Olá, ${usuario.nome}`;

        const spanCargo2 = document.getElementById('cargo-usuario-menuCEL');
        if (spanCargo2) {
            if (usuario.cargo) {
                spanCargo2.innerText = `${usuario.empresa || 'Empresa'}`;
            } else {
                spanCargo2.style.display = 'none';
            }
        }
    }
});

async function obterUsuarioLogado() {
    const usuarioSalvo = localStorage.getItem('usuario');
    if (usuarioSalvo) {
        return JSON.parse(usuarioSalvo);
    }
    return null;
}

export { obterUsuarioLogado };


// Torna o logout global para funcionar no onclick
window.fazerLogout = fazerLogout;