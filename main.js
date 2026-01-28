// ================================
// CONFIRMACIÓN DE CARGA JS
// ================================
console.log("✅ JavaScript correctamente linkeado");

// ================================
// TODO SE EJECUTA CUANDO CARGA EL DOM
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // BADGE VISUAL (DEBUG)
  // ================================
  const badge = document.createElement("div");
  badge.textContent = "JS OK";
  Object.assign(badge.style, {
    position: "fixed",
    bottom: "10px",
    left: "10px",
    padding: "6px 12px",
    background: "#7c4dff",
    color: "#fff",
    fontSize: "12px",
    borderRadius: "12px",
    zIndex: "9999",
    boxShadow: "0 6px 15px rgba(0,0,0,.3)"
  });
  document.body.appendChild(badge);

  // ================================
  // ANIMACIONES REVEAL
  // ================================
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // anima una sola vez
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(el => observer.observe(el));

  // ================================
  // GALERÍA CON MODAL
  // ================================
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalClose = document.querySelector(".modal-close");
  const galleryImages = document.querySelectorAll(".galeria-grid img");

  if (modal && modalImg) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
      });
    });

    modalClose?.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // ================================
  // TOOLTIP WHATSAPP AUTOMÁTICO
  // ================================
  const tooltip = document.querySelector(".whatsapp-tooltip");

  if (tooltip) {
    setTimeout(() => {
      tooltip.style.opacity = "1";
      tooltip.style.transform = "translateY(0)";
    }, 2000);

    setTimeout(() => {
      tooltip.style.opacity = "0";
    }, 6000);
  }

});

// ================================
// LAZY LOADING REAL (IMÁGENES)
// ================================
const lazyImages = document.querySelectorAll("img.lazy");

const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  },
  { rootMargin: "100px" }
);

lazyImages.forEach(img => lazyObserver.observe(img));
