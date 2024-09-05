const productsContainer = document.getElementById("products-container");
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

const getProducts = async () => {
    const response = await fetch("data.json");
    const data = await response.json();
    data.forEach((product) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
          <h3>${product.nombre}</h3>
          <p class="precio">${product.precio} $</p>
        `;

        productsContainer.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";
        comprar.className = "comprar";
        content.append(comprar);

        comprar.addEventListener("click", () => {
            const repeat = cartProducts.some(repeatProduct => repeatProduct.id === product.id);
            if (repeat) {
                cartProducts = cartProducts.map(prod => {
                    if (prod.id === product.id) {
                        prod.cantidad++;
                    }
                    return prod;
                });
            } else {
                cartProducts.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    cantidad: 1,
                });
            }
            saveLocal();
            carritoCounter();
        });
    });
};

getProducts();

function saveLocal() {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function carritoCounter() {
    const cantidadCarrito = document.getElementById("cantidadCarrito");
    if (cantidadCarrito) {
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        const cartProductsLength = cartProducts.length;
        localStorage.setItem("cartProductsLength", JSON.stringify(cartProductsLength));
        cantidadCarrito.innerText = cartProductsLength;
        cantidadCarrito.style.display = cartProductsLength > 0 ? "block" : "none";
    }
}

carritoCounter();

