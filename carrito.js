let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const lista = document.getElementById("lista-carrito");
const totalElemento = document.getElementById("total");
const vaciarBtn = document.getElementById("vaciar-carrito");
const finalizarBtn = document.getElementById("finalizar-compra");

function renderCarrito() {
  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += parseInt(producto.precio);

    const item = document.createElement("div");
    item.classList.add("item-carrito");

    item.innerHTML = `
      <div class="item-info">
        <strong>${producto.nombre}</strong>
        <span>$${producto.precio}</span>
      </div>
      <button class="btn-eliminar" data-index="${index}">
        Eliminar
      </button>
    `;

    lista.appendChild(item);
  });

  totalElemento.textContent = total.toLocaleString("es-AR");
}

renderCarrito();

// ELIMINAR PRODUCTO
lista.addEventListener("click", e => {
  if (e.target.classList.contains("btn-eliminar")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
  }
});

// VACIAR CARRITO
vaciarBtn.addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  renderCarrito();
});

// FINALIZAR POR WHATSAPP
finalizarBtn.addEventListener("click", () => {
  if (carrito.length === 0) return;

  let mensaje = "Hola! Quiero comprar:%0A";

  carrito.forEach(producto => {
    mensaje += `- ${producto.nombre} ($${producto.precio})%0A`;
  });

  const total = carrito.reduce((acc, p) => acc + parseInt(p.precio), 0);
  mensaje += `%0ATotal: $${total}`;

  const url = `https://wa.me/5491126783018?text=${mensaje}`;
  finalizarBtn.href = url;
});
