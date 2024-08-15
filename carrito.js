

const pintarcarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = ""
    modalHeader.innerHTML = `
       <h2 class="modal-header-title">Carrito</h2>
    `;
    modalcontainer.append(modalHeader);

    const modalbutton = document.createElement("h3");
    modalbutton.className = "modal-button"
    modalbutton.innerText = "ocultar";  

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    }); 

    modalcontainer.append(modalbutton);

    cartProducts.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <p>Unid ${product.cantidad}</p>
        <p>Total: ${product.cantidad * product.precio}</p>
        `;

        modalcontainer.append(carritoContent);

        let eliminar = document.createElement("span");
        eliminar.innerText = "X";
        eliminar.className = "delete-product";
        carritoContent.append(eliminar); 

        eliminar.addEventListener("click", eliminarProducto)
    });

    const total = cartProducts.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div")
    totalBuying.className = "price"
    totalBuying.innerHTML = `<h3>Total a pagar: ${total} $`  
    modalcontainer.append(totalBuying);

}

IralCarrito.addEventListener("click", pintarcarrito)

const saveLocal = () => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};

JSON.parse(localStorage.getItem("cartProducts"));

const eliminarProducto = () => {
    const foundId = cartProducts.find((element)=> element.id);

    cartProducts = cartProducts.filter((cartId) => {
        return cartId !== foundId;
    });

    pintarcarrito();

};