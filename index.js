// SPA Navigation
// ===============================
const links = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll(".section");

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        sections.forEach(s => s.classList.remove("active"));
        links.forEach(l => l.classList.remove("active"));
        document.getElementById(link.dataset.section).classList.add("active");
        link.classList.add("active");
    });
});

// ===============================
// MODULE 1 : PRODUITS (CRUD COMPLET)
// ===============================
let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

const productList = document.getElementById("productList");

openProductForm.onclick = () => productForm.classList.toggle("hidden");

saveProduct.onclick = () => {
    const name = pName.value.trim();
    const price = pPrice.value;
    const stock = pStock.value;

    if (!name || price <= 0 || stock < 0) return alert("Formulaire invalide");

    const product = { name, price, stock };

    editIndex === null ? products.push(product) : products[editIndex] = product;
    editIndex = null;

    localStorage.setItem("products", JSON.stringify(products));
    productForm.reset();
    productForm.classList.add("hidden");
    displayProducts();
};

function displayProducts(list = products) {
    productList.innerHTML = "";
    list.forEach((p, i) => {
        productList.innerHTML += `
        <div class="card">
            <h4>${p.name}</h4>
            <p>💰 ${p.price} DH</p>
            <p>📦 ${p.stock}</p>
            <button onclick="editProduct(${i})">✏️</button>
            <button onclick="deleteProduct(${i})">🗑️</button>
        </div>`;
    });
    document.getElementById("kpiProducts").innerText = products.length;
}

function deleteProduct(i) {
    if (confirm("Supprimer ?")) {
        products.splice(i, 1);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

function editProduct(i) {
    const p = products[i];
    pName.value = p.name;
    pPrice.value = p.price;
    pStock.value = p.stock;
    editIndex = i;
    productForm.classList.remove("hidden");
}

searchProduct.oninput = () => {
    displayProducts(products.filter(p =>
        p.name.toLowerCase().includes(searchProduct.value.toLowerCase())
    ));
};

sortProduct.onchange = () => {
    if (sortProduct.value === "name") products.sort((a,b)=>a.name.localeCompare(b.name));
    if (sortProduct.value === "price") products.sort((a,b)=>a.price-b.price);
    displayProducts();
};

displayProducts();

// ===============================
// MODULE 2 : CATÉGORIES (CRUD SIMPLE)
// ===============================
let categories = JSON.parse(localStorage.getItem("categories")) || [];

addCategory.onclick = () => {
    if (!catName.value.trim()) return;
    categories.push(catName.value);
    localStorage.setItem("categories", JSON.stringify(categories));
    catName.value = "";
    displayCategories();
};

function displayCategories() {
    categoryList.innerHTML = "";
    categories.forEach((c, i) => {
        categoryList.innerHTML += `
        <li>${c} <button onclick="removeCategory(${i})">❌</button></li>`;
    });
}

function removeCategory(i) {
    categories.splice(i, 1);
    localStorage.setItem("categories", JSON.stringify(categories));
    displayCategories();
}

displayCategories();

// ===============================
// MODULE 3 : API Fake Store (INTRO)
// ===============================
loadApi.onclick = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            apiProducts.innerHTML = "";
            document.getElementById("kpiApi").innerText = data.length;
            data.slice(0,6).forEach(p => {
                apiProducts.innerHTML += `
                <div class="card">
                    <img src="${p.image}" style="width:100px;height:100px;object-fit:contain">
                    <h4>${p.title}</h4>
                    <p>💰 ${p.price} $</p>
                </div>`;
            });
        })
        .catch(() => apiProducts.innerHTML = "Erreur API");
};