(function () {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("É necessário efetuar login para acessar esta página.");
        window.location.href = '/login';
    }
})();
//cod pra se nn tiver com token nn permitir acesso