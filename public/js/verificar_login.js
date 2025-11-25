(function() {
    const token = localStorage.getItem('token');
    
   
    if (!token) {
       
        alert("Acesso restrito! Faça login");
        window.location.href = '/manutech/login';
    }
})();
//cod pra se nn tiver com token nn permitir acesso