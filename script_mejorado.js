let pedido = [];
let total = 0;

function agregarProducto(nombre, precio, qtyId) {
  const qty = parseInt(document.getElementById(qtyId).value);
  for (let i = 0; i < qty; i++) {
    const item = { nombre, precio };
    pedido.push(item);
    total += precio;
  }
  actualizarPedido();
  actualizarMensajeInstagram();
  // Animación botón agregar
  const btnAgregar = document.querySelector(`button[onclick*="${nombre}"]`);
  if(btnAgregar) {
    btnAgregar.classList.add("agregado");
    setTimeout(()=>btnAgregar.classList.remove("agregado"), 500);
  }
}

function actualizarPedido() {
  const listaPedido = document.getElementById('listaPedido');
  listaPedido.innerHTML = '';
  pedido.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '❌';
    btnEliminar.onclick = () => {
      pedido.splice(index, 1);
      total -= item.precio;
      actualizarPedido();
      actualizarMensajeInstagram();
    };
    li.appendChild(btnEliminar);
    listaPedido.appendChild(li);
  });
  document.getElementById('total').textContent = `$${total}`;
}

function actualizarMensajeInstagram() {
  const mensajeDiv = document.getElementById('mensajeInstagram');
  if (pedido.length === 0) {
    mensajeDiv.textContent = '(Tu pedido aparecerá aquí cuando agregues productos)';
    document.getElementById('total').textContent = '$0';
    return;
  }
  let mensaje = '🛒 *Pedido para Candy Lul* 🛒\n\n';
  pedido.forEach(item => {
    mensaje += `- ${item.nombre}: $${item.precio}\n`;
  });
  mensaje += `\n*Total:* $${total}\n\nEnviado desde https://candylul.github.io/dulce-tentacion/`;
  mensajeDiv.textContent = mensaje;
}

function copiarMensaje() {
  const mensaje = document.getElementById('mensajeInstagram').textContent;
  navigator.clipboard.writeText(mensaje).then(() => {
    alert('¡Mensaje copiado!');
  }).catch(() => {
    alert('No se pudo copiar el mensaje');
  });
}

function enviarInstagram() {
  const mensaje = encodeURIComponent(document.getElementById('mensajeInstagram').textContent);
  window.open('https://www.instagram.com/_candy_lul_/', '_blank');
}

function enviarWhatsApp() {
  const mensaje = encodeURIComponent(document.getElementById('mensajeInstagram').textContent);
  window.open(`https://wa.me/525520708423?text=${mensaje}`, '_blank');
}

function mostrarDudas() {
  const dudasDiv = document.getElementById('dudas');
  dudasDiv.style.display = dudasDiv.style.display === 'none' ? 'block' : 'none';
}
