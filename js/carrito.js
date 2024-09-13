
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
    
    const continuarCompra = document.createElement("button");
    continuarCompra.className = "finalizar-compra";
    continuarCompra.innerText = "Continuar a Datos de Facturacion";
    continuarCompra.addEventListener("click", mostrarModalFacturacion);
    modalcontainer.append(continuarCompra);
}

function mostrarModalFacturacion() {
    modalcontainer.innerHTML = "";
    const facturacionHeader = document.createElement("div");
    facturacionHeader.className = "modal-header";
    facturacionHeader.innerHTML = `<h2 class="modal-header-title">Datos de Facturación</h2>`;
    modalcontainer.append(facturacionHeader);

    const facturacionContent = document.createElement("div");
    facturacionContent.className = "facturacion-content"
    facturacionContent.innerHTML = `
        <label>Nombre: <input type="text" id="nombre" required></label>
        <label>Apellido: <input type="text" id="apellido" required></label>
        <label>Ciudad: <input type="text" id="ciudad" required></label>
        <label>Domicilio: <input type="text" id="domicilio" required></label>
    `;
    modalcontainer.append(facturacionContent);

    const finalizarCompra = document.createElement("button");
    finalizarCompra.className = "finalizar-compra";
    finalizarCompra.innerText = "Finalizar Compra";
    finalizarCompra.addEventListener("click", validarDatosFacturacion);
    modalcontainer.append(finalizarCompra);
}

function validarDatosFacturacion() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const ciudad = document.getElementById("ciudad").value;
    const domicilio = document.getElementById("domicilio").value;

    if (nombre && apellido && ciudad && domicilio) {
        mostrarResumenCompra();
    } else {
        alert("Por favor, completa todos los campos de facturación.");
    }
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
        cartProducts = [];
        localStorage.removeItem("cartProducts");
        carritoCounter();
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
