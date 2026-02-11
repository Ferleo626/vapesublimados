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
// SERVICE WORKER REGISTRATION
// ================================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => console.log("✅ Service Worker registrado"))
      .catch(err => console.error("❌ SW error:", err));
  });
}

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
