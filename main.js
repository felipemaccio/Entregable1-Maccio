const productos = [
    {nombre: "mesa comedor", precio: 8000},
    {nombre: "mesa ratona", precio: 5000},
    {nombre: "sillon dos plazas", precio: 4500},
    {nombre: "sillon una plaza", precio: 2500},
    {nombre: "smart tv 42", precio: 7500},
];
let carrito = []

let seleccion = prompt("Desea comprar articulos para su living (si) o (no)") 

while(seleccion != "si" && seleccion != "no"){
    alert("respuesta incorrecta")
    seleccion = prompt("Desea comprar articulos para su living (si) o (no)") 
}

if (seleccion == "si"){
    let totalproductos = productos.map((productos) => productos.nombre + " " + productos.precio + " pesos ");
    alert(totalproductos)
} else if (seleccion == "no"){
    alert("Haz abandonado la compra")
}

while(seleccion != "no"){
    let producto = prompt("Agrega un articulo")

    if(producto == "mesa comedor" || "mesa ratona" || "sillon dos plazas" || "sillon una plaza" || "smart tv 42"){
        switch(producto) {
            case "mesa comedor":
            precio = 8000;
            break
            case "mesa ratona":
            precio = 5000;
            break
            case "sillon dos plazas":
            precio = 4500;
            break
            case "sillon una plaza":
            precio = 2500;
            break
            case "smart tv 42":
            precio = 7500;
            break
            default:
            break;
        }
    carrito.push({producto, precio}) 
    } else {
        alert("producto no existente")
    }
    seleccion = prompt("desea agregar algo mas?")

    while(seleccion === "no"){
        let totalcarrito = carrito.map((carrito) => " . " + carrito.producgeto + " " + carrito.precio + " pesos ");
        alert(totalcarrito)
    break;
    }
}