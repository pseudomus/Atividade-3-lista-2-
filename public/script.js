document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const formData = new FormData(this);
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    };

    fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Perfil atualizado com sucesso!');
            window.location.href = '/'; // Redireciona para a página de início
        } else {
            alert('Erro ao atualizar perfil: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

