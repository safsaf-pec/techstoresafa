// Navigation SPA (sidebar)
// ===============================
const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll(".section");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        // cacher toutes les sections
        sections.forEach(section => {
            section.classList.remove("active");
        });

        // retirer active de tous les liens
        links.forEach(l => {
            l.classList.remove("active");
        });

        // afficher la section cliquée
        const targetId = this.dataset.section;
        document.getElementById(targetId).classList.add("active");

        // activer le lien
        this.classList.add("active");
    });
});

// ===============================
// Bouton Ajouter Produit
// ===============================
const openBtn = document.getElementById("openProductForm");
const productForm = document.getElementById("productForm");

if (openBtn && productForm) {
    openBtn.addEventListener("click", () => {
        productForm.classList.toggle("hidden");
    });
}