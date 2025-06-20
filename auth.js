document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita o recarregamento da página

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulação de login: aceita qualquer preenchimento
             if (username.trim() !== '' && password.trim() !== '') { // Verifica se os campos não estão vazios
                localStorage.setItem('loggedIn', 'true'); // Marca o usuário como logado
                 window.location.href = 'pacientes.html'; // Redireciona para a página de pacientes
            } else {
                     loginMessage.textContent = 'Por favor, preencha usuário e senha.';
                    loginMessage.style.color = 'var(--danger-color)';
                }
        });
    }

    // Lógica para logout (pode ser incluída em main.js ou em um módulo de auth mais completo)
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html'; // Redireciona para a página de login
        });
    }

    // Verificar se o usuário está logado ao carregar outras páginas
    // (Esta verificação é mais robusta se feita em um script global como main.js)
    if (!localStorage.getItem('loggedIn') && window.location.pathname !== '/index.html') {
        // Redireciona para o login se não estiver logado e não for a página de login
        window.location.href = 'index.html';
    }
});