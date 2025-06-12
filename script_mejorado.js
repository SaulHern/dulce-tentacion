document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById('loginModal');
    const loginButton = document.getElementById('loginButton');
    const usernameInput = document.getElementById('usernameInput');
    const logoutButton = document.getElementById('logoutButton');
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    const carrito = document.getElementById('carrito');
    const cartItemsList = document.getElementById('cartItems');
    const sendWhatsappButton = document.getElementById('sendWhatsappButton');
    const instagramSection = document.querySelector('.instagram-section');

    let cart = [];

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

    addCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const producto = button.parentElement.querySelector('h3').innerText;
            cart.push(producto);
            updateCart();
        });
    });

    sendWhatsappButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }
        const message = `Hola, quiero hacer un pedido:\n- ${cart.join('\n- ')}`;
        const url = `https://wa.me/525520708423?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });

    function updateCart() {
        cartItemsList.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item + ' ';
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remover';
            removeBtn.addEventListener('click', () => {
                cart.splice(index, 1);
                updateCart();
            });
            li.appendChild(removeBtn);
            cartItemsList.appendChild(li);
        });
    }

    function showProtectedContent() {
        addCartButtons.forEach(btn => btn.classList.remove('hidden'));
        carrito.classList.remove('hidden');
        instagramSection.classList.remove('hidden');
        logoutButton.classList.remove('hidden');
    }
});
