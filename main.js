const reveals = document.querySelectorAll(".reveal");

  if (reveals.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));
  }

  // ================================
  // GALERÍA MODAL
  // ================================
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.querySelector(".modal-close");
  const galleryImages = document.querySelectorAll(".galeria-grid img");

  if (modal && modalImg && galleryImages.length) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
      });
    });

    modalClose?.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", e => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }

  // ================================
  // WHATSAPP TOOLTIP AUTO
  // ================================
  const tooltip = document.querySelector(".whatsapp-tooltip");

  if (tooltip) {
    setTimeout(() => tooltip.style.opacity = "1", 2000);
    setTimeout(() => tooltip.style.opacity = "0", 6000);
  }

  // ================================
  // LAZY LOADING IMÁGENES + SKELETON
  // ================================
  const lazyImages = document.querySelectorAll("img.lazy");

  if (lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const skeleton = img.previousElementSibling;

          img.src = img.dataset.src;

          img.onload = () => {
            img.classList.add("loaded");
            if (skeleton?.classList.contains("skeleton")) {
              skeleton.style.display = "none";
            }
          };

          observer.unobserve(img);
        }
      });
    }, { rootMargin: "150px" });

    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // ================================
  // EVENTOS GA4
  // ================================
  document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener("click", () => {
      gtag("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: "WhatsApp"
      });
    });
  });

  document.querySelectorAll(".presupuesto-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      gtag("event", "click_presupuesto", {
        event_category: "conversion",
        event_label: "Presupuesto"
      });
    });
  });

  document.querySelectorAll(".producto").forEach(prod => {
    prod.addEventListener("click", () => {
      const nombre = prod.querySelector("h3")?.innerText || "Producto";
      gtag("event", "click_producto", {
        event_category: "engagement",
        event_label: nombre
      });
    });
  });


// ================================
// SCROLL DEPTH 90% (GA4)
// ================================
let scrollTracked = false;

window.addEventListener("scroll", () => {
  const scrollPercent =
    ((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100;

  if (scrollPercent > 90 && !scrollTracked) {
    scrollTracked = true;
    gtag("event", "scroll_90", {
      event_category: "engagement",
      event_label: "Scroll 90%"
    });
  }
});
// ================================
// SERVICE WORKER DESACTIVADO TEMPORALMENTE
// ================================

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("sw.js")
//       .then(() => console.log("✅ Service Worker registrado"))
//       .catch(err => console.error("❌ SW error:", err));
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("vs-menu-btn");
  const menu = document.getElementById("vs-side-menu");
  const overlay = document.getElementById("vs-menu-overlay");
  const toggles = document.querySelectorAll(".vs-toggle");

  // ABRIR MENÚ
  btn.addEventListener("click", () => {
    menu.classList.add("vs-active");
    overlay.classList.add("vs-active");
    btn.classList.add("vs-hide");
  });

  // CERRAR MENÚ
  overlay.addEventListener("click", () => {
    menu.classList.remove("vs-active");
    overlay.classList.remove("vs-active");
    btn.classList.remove("vs-hide");
  });

  // SUBMENÚS
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const item = toggle.closest(".vs-item");
      item.classList.toggle("active");
    });
  });
});
 // FILTRADO POR CATEGORÍA
  document.querySelectorAll(".vs-submenu li").forEach(sub => {
    sub.addEventListener("click", () => {
      const filtro = sub.innerText.toLowerCase();
      const productos = document.querySelectorAll(".producto");

      productos.forEach(prod => {
        const categorias = prod.dataset.categorias.split(",");
        if (categorias.includes(filtro)) {
          prod.style.display = "block";
        } else {
          prod.style.display = "none";
        }
      });

      // Cerrar menú
      document.getElementById("vs-side-menu").classList.remove("vs-active");
      document.getElementById("vs-menu-overlay").classList.remove("vs-active");
      document.getElementById("vs-menu-btn").classList.remove("vs-hide");
    });
  });
  // BOTÓN WHATSAPP AUTOMÁTICO
document.querySelectorAll(".producto").forEach(producto => {
  const nombre = producto.querySelector("h3").textContent;
  const boton = producto.querySelector(".btn-whatsapp");

  const mensaje = `Hola! Quiero consultar por ${nombre}`;
  const url = `https://wa.me/5491126783018?text=${encodeURIComponent(mensaje)}`;

  boton.setAttribute("href", url);
  boton.setAttribute("target", "_blank");
});
// FAVORITO
document.querySelectorAll(".btn-favorito").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("activo");
    btn.textContent = btn.classList.contains("activo") ? "❤️" : "♡";
  });
});
// ==========================
// CARRITO REAL
// ==========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contador = document.getElementById("contador-carrito");

// ==========================
// ACTUALIZAR CONTADOR
// ==========================
function actualizarContador() {
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// ==========================
// ANIMACIÓN PRODUCTO VOLANDO
// ==========================
function animarVuelo(imagenElemento) {

  const carritoIcono = document.querySelector(".carrito-icono");

  if (!imagenElemento || !carritoIcono) return;

  const imgRect = imagenElemento.getBoundingClientRect();
  const carritoRect = carritoIcono.getBoundingClientRect();

  const imgClon = imagenElemento.cloneNode(true);
  imgClon.classList.add("img-voladora");

  imgClon.style.top = imgRect.top + "px";
  imgClon.style.left = imgRect.left + "px";

  document.body.appendChild(imgClon);

  setTimeout(() => {
    imgClon.style.top = carritoRect.top + "px";
    imgClon.style.left = carritoRect.left + "px";
    imgClon.style.width = "30px";
    imgClon.style.opacity = "0.5";
  }, 10);

  setTimeout(() => {
    imgClon.remove();
  }, 800);
}

// ==========================
// ACTIVAR BOTONES CARRITO
// ==========================
function activarBotonesCarrito() {

  document.querySelectorAll(".btn-carrito").forEach(boton => {

    boton.addEventListener("click", function(e) {

      e.preventDefault();

      const id = parseInt(this.dataset.id);
      const producto = productos.find(p => p.id === id);

      if (!producto) {
        console.log("Producto no encontrado:", id);
        return;
      }

      // Obtener imagen del producto
      const card = this.closest(".producto");
      const imagen = card ? card.querySelector("img") : null;

      // Animación vuelo
      animarVuelo(imagen);

      // Agregar al carrito
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      actualizarContador();

      // Rebote contador
      contador.classList.add("rebote");
      setTimeout(() => {
        contador.classList.remove("rebote");
      }, 400);

      // Pulse carrito
      const carritoIcono = document.querySelector(".carrito-icono");
      carritoIcono.classList.add("animar");
      setTimeout(() => {
        carritoIcono.classList.remove("animar");
      }, 300);

      console.log("Producto agregado:", producto.nombre);

    });

  });

}

actualizarContador();



// ==========================
// LISTA DE PRODUCTOS
// ==========================

const productos = [
  {
    id: 1,
    nombre: "Bolso Jardín",
    precio: 18500,
    imagen: "assets/img/productos/Bolso-jardin.jpg",
    categorias: ["jardin", "bolsos"],
    nuevo: true,
    masVendido: true
  },
  {
    id: 2,
    nombre: "Bolso Blanco Jardín",
    precio: 18500,
    imagen: "assets/img/productos/BolsaBlanca.png",
    categorias: ["jardin", "bolsos"],
    nuevo: true,
    masVendido: false
  },
  {
    id: 3,
    nombre: "Mochila Roja",
    precio: 18500,
    imagen: "assets/img/productos/Mochila-roja.png",
    categorias: ["jardin", "mochilas"],
    nuevo: true,
    masVendido: false
  },
{    
    id: 4,
    nombre: "Mochila Azul",
    precio: 18500,
    imagen: "assets/img/productos/Mochila-azul.png",
    categorias: ["jardin", "mochilas"],
    nuevo: true,
    masVendido: false

},
{    
    id: 5,
    nombre: "Mochila Rosa",
    precio: 18500,
    imagen: "assets/img/productos/Mochila-rosa.png",
    categorias: ["jardin", "mochilas"],
    nuevo: true,
    masVendido: false},
{    
    id: 6,
    nombre: "Cartuchera Slim",
    precio: 18500,
    imagen: "assets/img/productos/Cartuchera-slim.png",
    categorias: ["jardin", "cartucheras"],
    nuevo: true,
    masVendido: false},
{    
    id: 7,
    nombre: "Cartuchera Multicapa",
    precio: 18500,
    imagen: "assets/img/productos/Cartuchera-Multicapa.png",
    categorias: ["jardin", "cartucheras"],
    nuevo: true,
    masVendido: false},
{    
    id: 8,
    nombre: "Cartuchera Solapa",
    precio: 18500,
    imagen: "assets/img/productos/Cartuchera-de-Solapa.png",
    categorias: ["jardin", "cartucheras"],
    nuevo: true,
    masVendido: false},
{    
    id: 9,
    nombre: "Botella ",
    precio: 18500,
    imagen: "assets/img/productos/Botella-blanca.png",
    categorias: ["jardin", "botellas"],
    nuevo: true,
    masVendido: false},
{    
    id: 10,
    nombre: "Botella",
    precio: 18500,
    imagen: "assets/img/productos/Botella.jpeg",
    categorias: ["jardin", "botellas"],
    nuevo: true,
    masVendido: false},
{    
     id: 11,
     nombre: "Taza de Plástico",
     precio: 18500,
     imagen: "assets/img/productos/Taza-de-plastico.png",
     categorias: ["jardin", "tazas de plástico"],
     nuevo: true,
     masVendido: false},
{    
     id: 12,
     nombre: "Taza de Ceramica",
     precio: 18500,
     imagen: "assets/img/productos/Taza-blanca.png",
     categorias: ["Souvenirs & Regalos", "tazas de cerámica"],
     nuevo: true,
     masVendido: false}, 
{    
     id: 13,
     nombre: "Taza Magica",
     precio: 18500,
     imagen: "assets/img/productos/Taza-magicaEjem.png",
     categorias: ["Souvenirs & Regalos", "tazas de cerámica"],
     nuevo: true,
     masVendido: false},
{    
     id: 14,
     nombre: "Taza Magica 3D",
     precio: 18500,
     imagen: "assets/img/productos/Taza-magica3D.png",
     categorias: ["Souvenirs & Regalos", "tazas de cerámica"],
     nuevo: true,
     masVendido: false},
{    
     id: 15,
     nombre: "Mate",
     precio: 18500,
     imagen: "assets/img/productos/MateBlanco.png",
     categorias: ["Souvenirs & Regalos", "mates & termos"],
     nuevo: true,
     masVendido: false},
{    
     id: 16,
     nombre: "Termo",
     precio: 18500,
     imagen: "assets/img/productos/TermoBlanco.png",
     categorias: ["Souvenirs & Regalos", "mates & termos"],
     nuevo: true,
     masVendido: false},
{    
     id: 17,
     nombre: "Mate & Termo",
     precio: 18500,
     imagen: "assets/img/productos/MateyTermo.png",
     categorias: ["Souvenirs & Regalos", "mates & termos"],
     nuevo: true,
     masVendido: false},
{    
     id: 18,
  nombre: "Remeras Negras",
  precio: 0,
  imagen: "assets/img/productos/Remera-negra.jpeg",
  categorias: ["indumentaria", "remeras"],
  nuevo: true,
  masVendido: true
},
{
  id: 19,
  nombre: "Remeras Blancas",
  precio: 0,
  imagen: "assets/img/productos/Remera-blanca.png",
  categorias: ["indumentaria", "remeras"],
  nuevo: true,
  masVendido: true
},
{ id: 20,
  nombre: "Remeras Grises",
  precio: 0,
  imagen: "assets/img/productos/Remera-gris.png",
  categorias: ["indumentaria", "remeras"],
  nuevo: true,
  masVendido: true
},
{
  id: 21,
  nombre: "Buzos Blancos",
  precio: 0,
  imagen: "assets/img/productos/Buzo-blanco.png",
  categorias: ["indumentaria", "buzos"],
  nuevo: false,
  masVendido: true
},
{
  id: 22,
  nombre: "Buzos Negros",
  precio: 0,
  imagen: "assets/img/productos/Buzo-negro.png",
  categorias: ["indumentaria" ,"buzos"],
  nuevo: false,
  masVendido: true
},{
  id: 23,
  nombre: "Buzos Grises",
  precio: 0,
  imagen: "assets/img/productos/Buzo-gris.png",
  categorias: ["indumentaria" ,"buzos"],
  nuevo: false,
  masVendido: true
},
{
  id: 24,
  nombre: "Camperas Blancas",
  precio: 0,
  imagen: "assets/img/productos/Campera-blanca.png",
  categorias: ["indumentaria", "camperas"],
  nuevo: false,
  masVendido: false
},
{
  id: 25,
  nombre: "Camperas Negras",
  precio: 0,
  imagen: "assets/img/productos/Campera-negra.png",
  categorias: ["indumentaria", "camperas"],
  nuevo: false,
  masVendido: false
},{
  id: 26,
  nombre: "Camperas Grises",
  precio: 0,
  imagen: "assets/img/productos/Campera-gris.png",
  categorias: ["indumentaria", "camperas"],
  nuevo: false,
  masVendido: false
},
{
  id: 27,
  nombre: "Chalecos Blancos",
  precio: 0,
  imagen: "assets/img/productos/chaleco-blanco.png",
  categorias: ["indumentaria" , "chalecos"],
  nuevo: false,
  masVendido: false
},
{
  id: 28,
  nombre: "Chalecos Grises",
  precio: 0,
  imagen: "assets/img/productos/chaleco-gris.png",
  categorias: ["indumentaria" , "chalecos"],
  nuevo: false,
  masVendido: false
},{
  id: 29,
  nombre: "Chalecos Negros",
  precio: 0,
  imagen: "assets/img/productos/chaleco-negro.png",
  categorias: ["indumentaria" , "chalecos"],
  nuevo: false,
  masVendido: false
},
{
  id: 30,
  nombre: "Chombas Blancas",
  precio: 0,
  imagen: "assets/img/productos/chomba-blanca.png",
  categorias: ["indumentaria" , "chombas"],
  nuevo: true,
  masVendido: false
},
{
  id: 31,
  nombre: "Chombas Negras",
  precio: 0,
  imagen: "assets/img/productos/chomba-negra.png",
  categorias: ["indumentaria" , "chombas"],
  nuevo: true,
  masVendido: false
},{
  id: 32,
  nombre: "Chombas Azules",
  precio: 0,
  imagen: "assets/img/productos/chomba-azul.png",
  categorias: ["indumentaria" , "chombas"],
  nuevo: true,
  masVendido: false
},
{
  id: 33,
  nombre: "Gorros Azules",
  precio: 0,
  imagen: "assets/img/productos/gorro-azul.png",
  categorias: ["indumentaria", "gorros"],
  nuevo: false,
  masVendido: false
},
{
  id: 34,
  nombre: "Gorros Negros",
  precio: 0,
  imagen: "assets/img/productos/gorro-negro.png",
  categorias: ["indumentaria", "gorros"],
  nuevo: false,
  masVendido: false
},{
  id: 35,
  nombre: "Gorros Rojos",
  precio: 0,
  imagen: "assets/img/productos/gorro-rojo.png",
  categorias: ["indumentaria", "gorros"],
  nuevo: false,
  masVendido: false
},
{
  id: 36,
  nombre: "Uniformes Jardin Maternal Azul",
  precio: 0,
  imagen: "assets/img/productos/delantal-azul.png",
  categorias: ["indumentaria", "uniformes"],
  nuevo: true,
  masVendido: true
},
{
  id: 37,
  nombre: "Uniformes Jardin Maternal Rosa",
  precio: 0,
  imagen: "assets/img/productos/delantal-rosa.png",
  categorias: ["indumentaria", "uniformes"],
  nuevo: true,
  masVendido: true
},
{
  id: 38,
  nombre: "Uniformes Jardin Maternal Naranja",
  precio: 0,
  imagen: "assets/img/productos/delantal-naranja.png",
  categorias: ["indumentaria", "uniformes"],
  nuevo: true,
  masVendido: true
}

];
const container = document.getElementById("productos-container");

function renderProductos() {
  container.innerHTML = "";

  productos.forEach(producto => {

    const badgesHTML = `
      <div class="badges">
        ${producto.nuevo ? `<span class="badge nuevo">Nuevo</span>` : ""}
        ${producto.masVendido ? `<span class="badge vendido">Más vendido</span>` : ""}
      </div>
    `;

    const card = document.createElement("article");
    card.classList.add("producto");
    card.setAttribute("data-categorias", producto.categorias.join(","));

    card.innerHTML = `
      ${badgesHTML}

      <button class="btn-favorito">♡</button>

      <div class="producto-img">
        <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
      </div>

      <div class="producto-info">
        <h3>${producto.nombre}</h3>
        <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
        <p class="cuotas">Hasta 3 cuotas sin interés</p>

        <a href="#"
           class="btn-carrito"
           data-id="${producto.id}">
           🛒 Agregar al carrito
        </a>

        <a href="#" class="btn-whatsapp">
          Consultar por WhatsApp
        </a>
      </div>
    `;

    container.appendChild(card);
  });

  activarBotonesCarrito();
}

renderProductos();

// =============================
// ANIMACIÓN SCROLL
// =============================

const faders = document.querySelectorAll('.fade-up');

const appearOnScroll = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// =============================
// LIGHTBOX
// =============================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

document.querySelectorAll(".trabajo-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

let index = 0;
const totalSlides = slide.length;

function nextSlide() {
  index++;

  if (index >= totalSlides) {
    index = 0;
  }

  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Cambia cada 4 segundos
setInterval(nextSlide, 4000);
