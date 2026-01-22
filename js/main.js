const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".galeria-grid img").forEach(img => {
    img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
