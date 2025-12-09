const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pega os valores
    const relatorio = inputs[0].value;
    const pecas = inputs[1].value;
    const ferramentas = inputs[2].value;
    const orcamento = parseFloat(inputs[3].value);

    // Dados fictícios, você pode pegar cliente_id e func_id do localStorage ou do token
    const data = {
        cliente_id: 1,        // id do cliente do chamado
        chamado_id: 1,        // id do chamado
        func_id: 2,           // id do funcionário logado
        nome: 'Fresa ferramenteira Lagun ISO 30', // ou pegar do HTML
        descricao: `Relatório: ${relatorio}, Peças: ${pecas}, Ferramentas: ${ferramentas}`,
        orcamento
    };

    try {
        const res = await fetch('/api/chamados/aceitar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(result.sucesso){
            alert('Chamado aceito com sucesso!');
            form.reset();
        } else {
            alert('Erro: ' + (result.erro || 'Não foi possível aceitar o chamado.'));
        }

    } catch (err) {
        console.error(err);
        alert('Erro na requisição.');
    }
});
