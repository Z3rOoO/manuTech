
  
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

                // Nome
                const spanNome = document.getElementById('nome-usuario-menu');
                if (spanNome) spanNome.innerText = `Olá, ${usuario.nome}`;

                //coloca o Cargo
                const spanCargo = document.getElementById('cargo-usuario-menu');
                if (spanCargo) {
                    if (usuario.cargo) {
                        spanCargo.innerText = `${usuario.empresa || 'Empresa'}`;
                    } else {
                        spanCargo.style.display = 'none';
                    }
                }
            } else {
                
            }
        });

