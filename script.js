
let productos = [
    {id: 2, nombre: "Bufanda", categoria: ["Otoño","Invierno","cuello"], precio: 4500, stock: 2, rutaImagen: "Imagenes/bufandon.jpg"},
    {id: 3, nombre: "Gorro", categoria: ["Otoño","Invierno","gorro"], precio: 3000, stock: 2, rutaImagen: "Imagenes/gorroAz.jpg"},
    {id: 5, nombre: "Gorro lunares", categoria: ["Otoño","Invierno","gorro"], precio: 3500, stock: 2, rutaImagen: "Imagenes/gorroLunarNg.jpg"},
    {id: 6, nombre: "Cuello", categoria: ["Otoño","Invierno","cuello"], precio: 2000, stock: 2, rutaImagen: "Imagenes/cuelloGr.jpg"},
    {id: 1, nombre: "Saco", categoria: ["Otoño","Invierno","saco"], precio: 10000, stock: 2, rutaImagen: "Imagenes/saco.jpg"},
    {id: 7, nombre: "Bebe", categoria: ["Otoño","Invierno","bebe"], precio: 7000, stock: 2, rutaImagen: "Imagenes/bebeRj.jpg"},
    {id: 4, nombre: "Manta", categoria: ["Otoño","Invierno","manta"], precio: 9500, stock: 2, rutaImagen: "Imagenes/sirena.jpg"},
    {id: 8, nombre: "Top crochet", categoria: ["Primavera","Verano","top"], precio: 4000, stock: 2, rutaImagen: "Imagenes/top.jpg"}
]

let contenedor = document.getElementById("productos")
let contenedorCarrito = document.getElementById("contenedorCarrito")

let buscador = document.getElementById("buscador")

let carritoC = document.getElementById("carritoCant")


let checkboxGorro = document.getElementById("checkGorro")
let checkboxBufanda = document.getElementById("checkBufanda")
let checkboxManta = document.getElementById("checkManta")
let checkboxSaco = document.getElementById("checkSaco")
let checkboxBebe = document.getElementById("checkBebe")
let checkboxTop = document.getElementById("checkTop")

let oPmayorMenor = document.getElementById("mayorMenor")
let oPmenorMayor = document.getElementById("menorMayor")
let oPordenAz = document.getElementById("ordenAz")
let oPordenZa = document.getElementById("ordenZa")
let select = document.getElementById("filtroLista")


checkboxGorro.addEventListener("change", filtratCategorias)
checkboxBufanda.addEventListener("change", filtratCategorias)
checkboxManta.addEventListener("change", filtratCategorias)
checkboxSaco.addEventListener("change", filtratCategorias)
checkboxBebe.addEventListener("change", filtratCategorias)
checkboxTop.addEventListener("change", filtratCategorias)

buscador.addEventListener("input",filtrarBuscador)
crearProductos(productos)
let carritoCompras = []

select.addEventListener("change", filtrarSegun)


function limpiarProductos() {
    let contenedor = document.getElementById("contenedorCarrito");
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}


function crearProductos(listaProductos) {
    contenedor.innerHTML = ""
    listaProductos.forEach(producto => {
        let divProducto = document.createElement('div')
        divProducto.innerHTML = `
        <div class="pt-3">
            <div class="card shadow-lg rounded border-4">
                <img class="card-img-top " src=${producto.rutaImagen} alt="${producto.nombre}">
                <div class="card-body d-flex flex-column justify-content-center">
                    <p class="card-title text-center">${producto.nombre}</p>
                    <p class="card-title text-center">3 cuotas sin interes de <b>$${(producto.precio / 3).toFixed(2)}</b></p>
                    <p class="text-center"><b>$${producto.precio}</b></p>
                    <button id="${producto.id}" class="compra p-2">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div> 
        `     
        contenedor.appendChild(divProducto)
        let botonAgregarCarrito = document.getElementById(producto.id) 
        botonAgregarCarrito.addEventListener("click",agregarCarrito)          
    }    )
}


function agregarCarrito(e) {
    let num = parseInt(carritoC.innerText);
    num += 1;
    carritoC.innerText = num;
    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    let indiceProducto = carritoCompras.findIndex(item => item.id === productoBuscado.id);
    if (indiceProducto !== -1) {
        carritoCompras[indiceProducto].cantidad += 1;
    }else {
        carritoCompras.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precio: productoBuscado.precio,
            cantidad: 1,
            rutaImagen:productoBuscado.rutaImagen
        })
    }
    limpiarProductos()
    crearCarrito()
}

function crearCarrito() {
    let carrito = document.getElementById("contenedorCarrito")
    carritoCompras.forEach(producto => {
        let divCarrito = document.createElement('div')
        divCarrito.innerHTML = `
            <div class="p-2 d-flex justify-content-between productoEnCarrito border-bottom">
                <img class="h-100 me-2 rounded-3" src=${producto.rutaImagen} alt=${producto.nombre}>
                <div class="me-auto d-flex flex-column justify-content-between">
                    <p class="m-0">${producto.nombre}</p>
                    <div class="botonera d-flex justify-content-between">
                        <button id="restar-${producto.id}" >-</button>
                        <span id="cantidad-${producto.id}">${producto.cantidad}</span>
                        <button id="sumar-${producto.id}" >+</button>
                    </div>
                    <p class="m-0 text-start">Total:</p>
                </div>
                <div class="d-flex flex-column justify-content-between">
                    <button id="eliminar-${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </button>
                    <p class="m-0"><b>${producto.precio}</b></p>
                </div>
            </div>
        `
        carrito.appendChild(divCarrito)
        let restar = document.getElementById(`restar-${producto.id}`)
        restar.addEventListener("click",() => restarUnidad(producto.id))
        let sumar = document.getElementById(`sumar-${producto.id}`)
        sumar.addEventListener("click",() => sumarUnidad(producto.id))
        let eliminar = document.getElementById(`eliminar-${producto.id}`)
        eliminar.addEventListener("click",() => eliminarProducto(producto.id))
    })
}


function eliminarProducto(id) {
    let carritoNuevo = carritoCompras.filter(producto => producto.id != id)
    carritoCompras = carritoNuevo
    limpiarProductos()
    crearCarrito()
}

function sumarUnidad(id) {
    let num = parseInt(carritoC.innerText);
    num += 1;
    carritoC.innerText = num;
    let productoSeleccionado = carritoCompras.find(producto => producto.id == id)
    productoSeleccionado.cantidad += 1
    let contador = document.getElementById(`cantidad-${id}`);
    contador.innerText = productoSeleccionado.cantidad
    
}

function restarUnidad(id) {
    let num = parseInt(carritoC.innerText);
    num -= 1;
    carritoC.innerText = num;
    let productoSeleccionado = carritoCompras.find(producto => producto.id == id)
    if (productoSeleccionado.cantidad > 1){
        productoSeleccionado.cantidad -= 1
    }else {
        eliminarProducto(id)
    }
    let contador = document.getElementById(`cantidad-${id}`);
    contador.innerText = productoSeleccionado.cantidad
}


function filtrarBuscador() {
    let valorBuscador = buscador.value.toLowerCase();
    let arrayFiltrado = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(valorBuscador) ||
        producto.categoria.some(categoria => categoria.toLowerCase().includes(valorBuscador))
    );
    crearProductos(arrayFiltrado);
}

function filtratCategorias() {
    let categoriasSeleccionadas = [];
    if (checkboxGorro.checked) {
        categoriasSeleccionadas.push("gorro");
    }
    if (checkboxBufanda.checked) {
        categoriasSeleccionadas.push("cuello");
    }
    if (checkboxManta.checked) {
        categoriasSeleccionadas.push("manta");
    }
    if (checkboxSaco.checked) {
        categoriasSeleccionadas.push("saco");
    }
    if (checkboxBebe.checked) {
        categoriasSeleccionadas.push("bebe");
    }
    if (checkboxTop.checked) {
        categoriasSeleccionadas.push("top");
    }
    let arrayFiltrado = [];
    if (categoriasSeleccionadas.length === 0) {
        arrayFiltrado = productos;
    } else {
        arrayFiltrado = productos.filter(producto =>
            producto.categoria.some(categoria =>
                categoriasSeleccionadas.includes(categoria.toLowerCase())
                )
                );
            }
            crearProductos(arrayFiltrado);
}



function filtrarSegun() {
    let opcionSeleccionada = select.value;
    switch (opcionSeleccionada) {
    case "1":
        mayorMenor(productos)
        break;
    case "2":
        menorMayor(productos)
        break;
    case "3":
        ordenAz(productos)
        break;
    case "4":
        ordenZa(productos)
        break;
    }
}

function mayorMenor (array) {
    return crearProductos(array.sort((a, b) => b.precio - a.precio))
}

function menorMayor (array) {
    return crearProductos(array.sort((a, b) => a.precio - b.precio))
}

function ordenAz (array) {
    return crearProductos(array.sort((a, b) => a.nombre.localeCompare(b.nombre)))
}

function ordenZa (array) {
    return crearProductos(array.sort((a, b) => b.nombre.localeCompare(a.nombre)))
}


