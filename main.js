const productsContainer = document.getElementById("products-container");
const IralCarrito = document.getElementById("IralCarrito");
const modalcontainer = document.getElementById("modalcontainer")

 
const productos= [
    {
        id: 1, 
        nombre: "Mesa comedor", 
        precio: 8000,
        cantidad: 1,
    },
    {
        id: 2, 
        nombre: "Mesa ratona", 
        precio: 5000,
        cantidad: 1,
    },
    {
        id: 3, 
        nombre: "Sillon dos plazas", 
        precio: 4500,
        cantidad: 1,
    },
    {
        id: 4, 
        nombre: "Sillon una plaza",  
        precio: 2500,
        cantidad: 1,
    },
    {
        id: 5, 
        nombre: "Smart tv 42", 
        precio: 7500,
        cantidad: 1,
    },
]

let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <h3>${product.nombre}</h3>
      <p class="precio">${product.precio} </p>
    `;

    productsContainer.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
       const repeat = cartProducts.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat === true) {  
            cartProducts.map((prod) => {
              if (prod.id === product.id){
                prod.cantidad++;  
              }
            });
        } else {  
           cartProducts.push({ 
            id : product.id,
            nombre : product.nombre,
            precio : product.precio,
            cantidad: product.cantidad,
           });
        }     
        saveLocal();
    });
});
 
