
const modalcontainer = document.getElementById("modalcontainer");
const cantidadCarrito = document.getElementById("cantidadCarrito");
const IralCarrito = document.getElementById("IralCarrito");


function pintarcarrito() {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h2 class="modal-header-title">Carrito</h2>`;
    modalcontainer.append(modalHeader);

    const modalbutton = document.createElement("h3");
    modalbutton.innerText = "Cerrar";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    });

    modalHeader.append(modalbutton);

    cartProducts.forEach((product) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <p>Unid ${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio}</p>
        <span class="delete-product material-symbols-outlined" style="color: red;"> delete </span>`;
        modalcontainer.append(carritoContent);
    
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if (product.cantidad > 1) {
                product.cantidad--;
                saveLocal();
                pintarcarrito();
            }
        });
    
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            product.cantidad++;
            saveLocal();
            pintarcarrito();
        });
    
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(product.id);
        });
    });
    
    const total = cartProducts.reduce((acc, elem) => acc + elem.precio * elem.cantidad, 0);
    const totalBuying = document.createElement("div");
    totalBuying.className = "price";
    totalBuying.innerHTML = `<h3>Total a pagar: ${total} $</h3>`; 
    modalcontainer.append(totalBuying);
    
    const finalizarCompra = document.createElement("button");
    finalizarCompra.className = "finalizar-compra";
    finalizarCompra.innerText = "Finalizar Compra";
    finalizarCompra.addEventListener("click", mostrarResumenCompra);
    modalcontainer.append(finalizarCompra);
}


function mostrarResumenCompra() {
    modalcontainer.innerHTML = ""; 
    const resumenHeader = document.createElement("div");
    resumenHeader.className = "modal-header";
    resumenHeader.innerHTML = `<h2 class="modal-header-title">Resumen de Compra</h2>`;
    modalcontainer.append(resumenHeader);

    const resumenContent = document.createElement("div");
    resumenContent.className = "resumen-content";
    
    
    let resumenHTML = `<h3>Resumen de Compra</h3>`;
    cartProducts.forEach((product) => {
        resumenHTML += `
        <p>${product.nombre} : ${product.cantidad} x ${product.precio} $ = ${product.cantidad * product.precio} $</p>
        `;
    });

    const total = cartProducts.reduce((acc, elem) => acc + elem.precio * elem.cantidad, 0);
    resumenHTML += `<h3>Total a pagar: ${total} $</h3>`;
    
    resumenContent.innerHTML = resumenHTML;
    modalcontainer.append(resumenContent);

    
    const cerrarResumen = document.createElement("button");
    cerrarResumen.className = "cerrar-resumen";
    cerrarResumen.innerText = "Cerrar";
    cerrarResumen.addEventListener("click", () => {
        modalcontainer.style.display = "none";
    });

    modalcontainer.append(cerrarResumen);

    modalcontainer.style.display = "flex"; 
}


function eliminarProducto(id) {
    cartProducts = cartProducts.filter((cartId) => cartId.id !== id);
    saveLocal();
    pintarcarrito();
    carritoCounter();
}


function toggleModal() {
    if (modalcontainer.style.display === "flex") {
        modalcontainer.style.display = "none";
    } else {
        pintarcarrito();
    }
}


IralCarrito.addEventListener("click", toggleModal);
