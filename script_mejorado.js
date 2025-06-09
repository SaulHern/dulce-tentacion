
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
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

        // Aquí hacemos que cuando elimine, se quite del array y actualice todo:
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
    function actualizarMensajeInstagram() {
    const mensajeDiv = document.getElementById('mensajeInstagram');
    if (pedido.length === 0) {
        mensajeDiv.textContent = '(Tu pedido aparecerá aquí cuando agregues productos)';
        // También actualiza el total en pantalla
        document.getElementById('total').textContent = '$0';
        return;
    }

    let mensaje = '🛍️ *Pedido para Candy Lul* 🛍️\n\n';
    pedido.forEach(item => {
        mensaje += `- ${item.nombre}: $${item.precio}\n`;
    });
    mensaje += `\n*Total:* $${total}\n\nEnviado desde https://candylul.github.io/dulce-tentacion/`;

    // Actualiza el div del mensaje de Instagram
    mensajeDiv.textContent = mensaje;

    // Actualiza también el total en la pantalla
    document.getElementById('total').textContent = `$${total}`;
    }

    actualizarMensajeInstagram();
}
    }
}
function copiarMensaje() {
    alert('Mensaje copiado (simulado).');
}
function enviarInstagram() {
    alert('Se abriría Instagram (simulado).');
}
