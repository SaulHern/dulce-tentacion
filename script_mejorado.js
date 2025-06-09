function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

let pedido = [];
let total = 0;

function agregarProducto(nombre, precio, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    for (let i = 0; i < qty; i++) {
        const item = { nombre: nombre, precio: precio };
        pedido.push(item);
        total += precio;

        const li = document.createElement('li');
        li.textContent = `${nombre} - $${precio}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '🗑️ Quitar';
        btnEliminar.style.marginLeft = '10px';
        btnEliminar.style.backgroundColor = '#ff4d4d';
        btnEliminar.style.color = 'white';
        btnEliminar.style.border = 'none';
        btnEliminar.style.borderRadius = '5px';
        btnEliminar.style.cursor = 'pointer';

        btnEliminar.onclick = function() {
            const index = pedido.indexOf(item);
            if (index > -1) {
                pedido.splice(index, 1);
                total -= precio;
                li.remove();
                actualizarMensajeInstagram();
            }
        };

        li.appendChild(btnEliminar);
        document.getElementById('listaPedido').appendChild(li);
    }

    actualizarMensajeInstagram();

    // ANIMACIÓN BOTÓN
    const btnAgregar = document.querySelector(`button[onclick="agregarProducto('${nombre}', ${precio}, '${qtyId}')"]`);
    btnAgregar.classList.add('agregado');
    setTimeout(() => {
        btnAgregar.classList.remove('agregado');
    }, 500);
}

function actualizarMensajeInstagram() {
    const mensajeDiv = document.getElementById('mensajeInstagram');
    if (pedido.length === 0) {
        mensajeDiv.textContent = '(Tu pedido aparecerá aquí cuando agregues productos)';
        document.getElementById('total').textContent = '$0';
        return;
    }

    let mensaje = '📦 *Pedido para Candy Lul* 📦\n\n';
    pedido.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio}\n`;
    });
    mensaje += `\n*Total:* $${total}\n\nEnviado desde https://candylul.github.io/dulce-tentacion/`;

    mensajeDiv.textContent = mensaje;
    document.getElementById('total').textContent = `$${total}`;
}

function copiarMensaje() {
    const mensaje = document.getElementById('mensajeInstagram').textContent;
    navigator.clipboard.writeText(mensaje).then(() => {
        alert('Mensaje copiado al portapapeles ✅');
    }).catch(err => {
        alert('Error al copiar el mensaje ❌');
    });
}

function enviarInstagram() {
    const mensaje = encodeURIComponent(document.getElementById('mensajeInstagram').textContent);
    const url = `https://www.instagram.com/_candy_lul_/`;
    window.open(url, '_blank');
}

function mostrarDudas() {
    const dudasDiv = document.getElementById('dudas');
    dudasDiv.style.display = (dudasDiv.style.display === 'none') ? 'block' : 'none';
}
