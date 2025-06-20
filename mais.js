document.addEventListener('DOMContentLoaded', () => {
    // Verificação de autenticação para todas as páginas (exceto login)
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'index.html') {
        if (!localStorage.getItem('loggedIn')) {
            window.location.href = 'index.html';
        }
    }

    // Lógica de logout global
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Exemplo de interatividade para a sidebar (mostrar qual item está ativo)
    const sidebarLinks = document.querySelectorAll('.sidebar nav ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});