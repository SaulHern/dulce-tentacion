document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('usernameInput');
    const logoutButton = document.getElementById('logoutButton');
    const pedidoButtons = document.querySelectorAll('.pedido-btn');
    const contactoSection = document.getElementById('contacto');

    // Revisar si ya está logueado
    if (sessionStorage.getItem('loggedIn')) {
        showProtectedContent();
        loginModal.style.display = 'none';
    } else {
        loginModal.style.display = 'flex';
    }

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username !== '') {
            sessionStorage.setItem('loggedIn', 'true');
            showProtectedContent();
            loginModal.style.display = 'none';
        } else {
            alert('Por favor ingresa tu nombre.');
        }
    });

    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedIn');
        location.reload();
    });

    function showProtectedContent() {
        pedidoButtons.forEach(btn => btn.classList.remove('hidden'));
        contactoSection.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
    }
});
