
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
function agregarProducto(nombre, precio, qtyId) {
    const qty = parseInt(document.getElementById(qtyId).value);
    for (let i = 0; i < qty; i++) {
        const li = document.createElement('li');
        li.textContent = nombre + ' - $' + precio;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '❌';
        btnEliminar.onclick = () => li.remove();
        li.appendChild(btnEliminar);
        document.getElementById('listaPedido').appendChild(li);
    }
}
function copiarMensaje() {
    alert('Mensaje copiado (simulado).');
}
function enviarInstagram() {
    alert('Se abriría Instagram (simulado).');
}
