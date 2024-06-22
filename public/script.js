document.getElementById('saveButton').addEventListener('click', function () {

    console.log('Botão Salvar clicado');
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = { username, email, password };

    fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar perfil: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
