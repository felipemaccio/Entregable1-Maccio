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
          <img src="${product.imagen}"> 
          <p class="precio">${product.precio} $</p>
        `;

        productsContainer.append(content);

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        let restar = document.createElement("button");
        restar.innerText = "-";
        restar.className = "restar";

        let cantidadInput = document.createElement("input");
        cantidadInput.type = "text";
        cantidadInput.value = 1;
        cantidadInput.className = "cantidad-producto";
        cantidadInput.readOnly = true;

        let sumar = document.createElement("button");
        sumar.innerText = "+";
        sumar.className = "sumar";

        let comprar = document.createElement("button");
        comprar.innerText = "Comprar";
        comprar.className = "comprar";

        buttonContainer.append(restar, cantidadInput, sumar, comprar);
        content.append(buttonContainer)

        sumar.addEventListener("click", () => {
            cantidadInput.value = parseInt(cantidadInput.value) + 1;
        });

        restar.addEventListener("click", () => {
            if (cantidadInput.value > 1) {cantidadInput.value = parseInt(cantidadInput.value) - 1;}
        });

        comprar.addEventListener("click", () => {
            const cantidadSeleccionada = parseInt(cantidadInput.value);
            const repeat = cartProducts.some(repeatProduct => repeatProduct.id === product.id);
            if (repeat) {
                cartProducts = cartProducts.map(prod => {
                    if (prod.id === product.id) {
                        prod.cantidad += cantidadSeleccionada;
                    }
                    return prod;
                });
            } else {
                cartProducts.push({
                    id: product.id,
                    nombre: product.nombre,
                    precio: product.precio,
                    imagen: product.imagen,
                    cantidad: cantidadSeleccionada,
                });
            }
            saveLocal();
            carritoCounter();
            cantidadInput.value =1;
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

