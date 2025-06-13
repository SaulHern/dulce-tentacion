// ----------- CONFIGURACIÓN ----------- //
const preguntasFrecuentes = [
    {
        pregunta: "¿Cuál es el horario de atención?",
        respuesta: "Mi horario es de 7:00 a 14:20 de lunes a viernes."
    },
    {
        pregunta: "¿Cuánto tiempo tarda en llegar mi pedido?",
        respuesta: "¡Menos de 10 minutos!"
    },
    {
        pregunta: "¿Se aceptan pagos con efectivo?",
        respuesta: "Sí, solo aceptamos efectivo."
    },
    {
        pregunta: "¿Puedo hacer pedidos anticipados?",
        respuesta: "Sí, puedes hacer pedidos anticipados."
    },
    {
        pregunta: "¿Hacen envíos a domicilio?",
        respuesta: "No, no hacemos envíos a domicilio."
    },
    {
        pregunta: "¿Tienen promociones?",
        respuesta: "Las promociones se empezarán a agregar a la página."
    },
    {
        pregunta: "¿Cómo hago mi pedido?",
        respuesta: "Solo agrégalo al carrito y haz clic en “Enviar pedido por WhatsApp”."
    },
    {
        pregunta: "¿Puedo hacer varias compras al día?",
        respuesta: "Sí, puedes pedir cuantas veces quieras durante el horario."
    },
    {
        pregunta: "¿Dónde veo mi carrito?",
        respuesta: "Puedes ver tu carrito en la página principal y también desde el botón en la sección de dudas frecuentes."
    }
];

// ------------------- Login y sesión ---------------------
function obtenerUsuario() {
    return sessionStorage.getItem('username') || '';
}

function mostrarNombreUsuario() {
    const nombre = obtenerUsuario();
    if (document.getElementById('nombreUsuarioHeader'))
        document.getElementById('nombreUsuarioHeader').textContent = nombre ? `Hola, ${nombre}!` : '';
    if (document.getElementById('nombreUsuarioFAQ'))
        document.getElementById('nombreUsuarioFAQ').textContent = nombre ? `Cuenta: ${nombre}` : '';
}

function loginCheck() {
    if (!obtenerUsuario()) {
        if (document.getElementById('loginModal')) {
            document.getElementById('loginModal').style.display = 'flex';
        }
    } else {
        mostrarNombreUsuario();
        if (document.getElementById('loginModal')) {
            document.getElementById('loginModal').style.display = 'none';
        }
        mostrarElementosProtegidos();
    }
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('loggedIn');
    location.href = "index.html";
}

// ------------------- Carrito ---------------------
function obtenerCarrito() {
    const carrito = sessionStorage.getItem('cart');
    return carrito ? JSON.parse(carrito) : [];
}
function guardarCarrito(carrito) {
    sessionStorage.setItem('cart', JSON.stringify(carrito));
}

function agregarAlCarrito(producto, precio) {
    let carrito = obtenerCarrito();
    const idx = carrito.findIndex(p => p.producto === producto);
    if (idx >= 0) {
        carrito[idx].cantidad += 1;
    } else {
        carrito.push({ producto, precio, cantidad: 1 });
    }
    guardarCarrito(carrito);
    mostrarCarrito();
}

function quitarDelCarrito(producto) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(p => p.producto !== producto);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    if (!document.getElementById('cartItems')) return;
    const cartItemsList = document.getElementById('cartItems');
    cartItemsList.innerHTML = '';
    let total = 0;
    carrito.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} (${item.cantidad}) - $${item.precio * item.cantidad}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => quitarDelCarrito(item.producto);
        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
        total += item.precio * item.cantidad;
    });
    // Muestra el total antes del botón de WhatsApp
    let totalDiv = document.getElementById('carritoTotal');
    if (!totalDiv) {
        totalDiv = document.createElement('div');
        totalDiv.id = 'carritoTotal';
        totalDiv.style.margin = "15px 0 5px 0";
        cartItemsList.parentElement.insertBefore(totalDiv, document.getElementById('sendWhatsappButton'));
    }
    totalDiv.innerHTML = `<strong>Total: $${total}</strong>`;
}

function enviarPedidoWhatsApp() {
    const carrito = obtenerCarrito();
    if (!carrito.length) {
        alert("¡Tu carrito está vacío!");
        return;
    }
    let msg = "🛒 *Pedido para Candy Lul* 🛒\n\n";
    carrito.forEach(item => {
        msg += `- ${item.producto}: $${item.precio * item.cantidad}\n`;
    });
    let total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    msg += `\n*Total:* $${total}\n\n_Solo efectivo_\n\nEnviado desde https://candylul.github.io/dulce-tentacion/`;
    const url = `https://wa.me/525520708423?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

// ------------------- Productos y botones ---------------------
function prepararBotonesProductos() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.classList.remove('hidden');
        btn.onclick = function() {
            const card = this.closest('.producto');
            const producto = card.querySelector('h3').textContent.trim();
            const precio = parseFloat(card.querySelector('.precio').textContent.replace(/[^0-9.]/g, ''));
            agregarAlCarrito(producto, precio);
        }
    });
}

// ------------------- Dudas Frecuentes (FAQ) ---------------------
function mostrarPreguntasFrecuentes() {
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    faqList.innerHTML = '';
    preguntasFrecuentes.forEach(item => {
        const li = document.createElement('li');
        li.className = "faq-item";
        li.innerHTML = `<strong>${item.pregunta}</strong><br><span>${item.respuesta}</span>`;
        faqList.appendChild(li);
    });
}
function buscarPreguntasFrecuentes() {
    const val = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const faqList = document.getElementById('faqList');
    if (!faqList) return;
    faqList.innerHTML = '';
    preguntasFrecuentes.forEach(item => {
        if (
            item.pregunta.toLowerCase().includes(val) ||
            item.respuesta.toLowerCase().includes(val)
        ) {
            const li = document.createElement('li');
            li.className = "faq-item";
            li.innerHTML = `<strong>${item.pregunta}</strong><br><span>${item.respuesta}</span>`;
            faqList.appendChild(li);
        }
    });
}

// ------------------- Mostrar/Ocultar elementos protegidos ---------------------
function mostrarElementosProtegidos() {
    document.querySelectorAll('.add-cart-btn, #logoutButton, aside#carrito').forEach(el => {
        el.classList.remove('hidden');
    });
}

// ------------------- Listeners globales ---------------------
window.onload = function() {
    loginCheck();
    prepararBotonesProductos();
    mostrarCarrito();
    mostrarNombreUsuario();
    if (document.getElementById('sendWhatsappButton')) {
        document.getElementById('sendWhatsappButton').onclick = enviarPedidoWhatsApp;
    }
    // FAQ
    if (document.getElementById('faqList')) mostrarPreguntasFrecuentes();
    if (document.getElementById('searchInput')) {
        document.getElementById('searchInput').addEventListener('input', buscarPreguntasFrecuentes);
    }
    // Volver a inicio (en FAQ)
    if (document.getElementById('volverInicioBtn')) {
        document.getElementById('volverInicioBtn').onclick = () => window.location.href = "index.html";
    }
    // Carrito botón en FAQ
    if (document.getElementById('verCarritoBtn')) {
        document.getElementById('verCarritoBtn').onclick = () => window.location.href = "index.html#carrito";
    }
};
// Login modal
if (document.getElementById('loginButton')) {
    document.getElementById('loginButton').onclick = function() {
        const val = document.getElementById('usernameInput').value.trim();
        if (!val) return alert("Escribe tu nombre para continuar");
        sessionStorage.setItem('username', val);
        sessionStorage.setItem('loggedIn', 'true');
        loginCheck();
        location.reload();
    };
}
// Logout
if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').onclick = logout;
}

// ----------- Reseñas de estrellas y comentarios -------------
// URL de tu Google Apps Script
const RESEÑAS_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxOfGF9HiN1C23jSAh7-GhzseL4BvQJMud3OICCc5bF6CLn7AVechcuLHrbMSknzhiu/exec";

function renderEstrellas(rating) {
    const estrellasDiv = document.getElementById('estrellasRating');
    estrellasDiv.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.className = 'estrella' + (i <= rating ? ' seleccionada' : '');
        star.textContent = '★';
        star.onclick = () => {
            document.getElementById('calificacion').value = i;
            renderEstrellas(i);
        };
        estrellasDiv.appendChild(star);
    }
}
function cargarReseñas() {
    const lista = document.getElementById('reseñasList');
    if (!lista) return;
    const reseñas = JSON.parse(localStorage.getItem('reseñasCandyLul') || '[]');
    lista.innerHTML = '';
    reseñas.slice().reverse().forEach(res => {
        const div = document.createElement('div');
        div.className = "reseña-item";
        div.innerHTML = `<div>${'★'.repeat(res.estrellas)}${'☆'.repeat(5-res.estrellas)}</div>
        <div>${res.comentario.replace(/</g, '&lt;')}</div>`;
        lista.appendChild(div);
    });
}
if (document.getElementById('reseñaForm')) {
    renderEstrellas(0);
    cargarReseñas();
    document.getElementById('reseñaForm').onsubmit = function(e) {
        e.preventDefault();
        const estrellas = +document.getElementById('calificacion').value;
        const comentario = document.getElementById('comentario').value.trim();
        if (!estrellas) return alert("Selecciona una calificación en estrellas");
        if (!comentario) return alert("Escribe tu comentario");

        // Si usas login: obtener nombre del usuario
        const nombre = sessionStorage.getItem('username') || '';

        // Guarda la reseña en el navegador (para mostrar al usuario)
        const reseñas = JSON.parse(localStorage.getItem('reseñasCandyLul') || '[]');
        reseñas.push({ estrellas, comentario });
        localStorage.setItem('reseñasCandyLul', JSON.stringify(reseñas));
        cargarReseñas();

        // ENVÍA A GOOGLE SHEETS
        fetch(RESEÑAS_WEBAPP_URL, {
            method: "POST",
            body: JSON.stringify({
                nombre: nombre,
                estrellas: estrellas,
                comentario: comentario
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => {
            if (r.ok) {
                alert("¡Gracias por tu opinión!");
                document.getElementById('comentario').value = '';
                document.getElementById('calificacion').value = 0;
                renderEstrellas(0);
            } else {
                alert("No se pudo enviar la reseña. Intenta de nuevo.");
            }
        }).catch(() => {
            alert("No se pudo enviar la reseña. Intenta de nuevo.");
        });
    }
}
