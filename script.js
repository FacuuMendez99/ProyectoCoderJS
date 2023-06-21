const comidas = [
    { nombre: 'Pizza', region: 'Italiana', precio: 2000},
    { nombre: 'Hamburguesa', region: 'Americana', precio: 1000},
    { nombre: 'Sushi', region: 'China', precio: 1500},
    { nombre: 'Tacos', region: 'Mexicana', precio: 500},
    { nombre: 'Pasta', region: 'Italiana', precio: 1800},
    { nombre: 'Hot Dog', region: 'Americana', precio: 800},
    { nombre: 'Ramen', region: 'China', precio: 1200},
    { nombre: 'Burrito', region: 'Mexicana', precio: 600},
];
let carrito = [];

// Funciones
//--------------------------------------------------------------------------------
function ejecutarMenu() {
    let salir = false;
    while (!salir) {
        const opcion = prompt("Bienvenido a la tienda de comida. Por favor, elige una de las siguientes opciones:\n1. Ver menú\n2. Realizar pedido\n3. Ver carrito\n4. Finalizar compra");
            switch (opcion) {
                case "1":
                    mostrarMenu();
                    break;
                case "2":
                    realizarPedido(carrito,comidas);
                    break;
                case "3":
                    verCarrito(carrito);
                    break;
                case "4":
                    finalizarCompra();
                    salir = true;
                    break;
                default:
                    alert("Opción inválida");
                    break;
            }       
        }
}
//--------------------------------------------------------------------------------
function mostrarMenu() {
    const opcion = prompt("Elige una opción:\n1. Orden de precio (menor a mayor)\n2. Filtrar por región");
    let listado = "Menú:\n";
    switch (opcion) {
        case "1":
            comidas.sort((comida1, comida2) => comida1.precio - comida2.precio);
            break;
        case "2":
            const region = prompt("Ingresa la región para filtrar el menú:"+ "\n" +"-Americana\n"+"-Italiana\n"+"-China\n"+"-Mexicana\n");
            const comidasFiltradas = comidas.filter((comida) => comida.region.toLowerCase() === region.toLowerCase());
            if (comidasFiltradas.length === 0) {
                alert("No se encontraron comidas para la región especificada.");
                return;
            }
            listado += "Comidas de la región " + region + ":\n";
            for (const comida of comidasFiltradas) {
            listado += "-" + comida.nombre + " => " + "Precio:" + "$" + comida.precio + "\n";
            }
            alert(listado);
            return;
        default:
            alert("Opción inválida");
            return;
    }
    for (const comida of comidas) {
        listado += "-" + comida.nombre + " => " + "Precio:" + "$" + comida.precio + "\n";
    }
    alert(listado);
}
//--------------------------------------------------------------------------------
function mostrarMenuSimple(lista) {
    let menu = "";
    for(let comida of lista) {
        menu += "-" + comida.nombre + "\n";
    }
    return menu;
}
//--------------------------------------------------------------------------------
function buscarComida(opcion, menu) {
    let eleccion = menu.find((comida) => comida.nombre.toLowerCase() === opcion.toLowerCase());
    return eleccion;
}
//--------------------------------------------------------------------------------
function realizarPedido(carrito,lista) {
    let opcion = prompt("Ingrese su pedido" + "\n" + mostrarMenuSimple(lista));
    let comidaEncontrada = buscarComida(opcion, comidas);
    if (comidaEncontrada) {
    carrito.push(comidaEncontrada);
    alert("Comida agregada al carrito: " + comidaEncontrada.nombre);
} else {
    alert("No se encontró la comida en el menú.");
}
}
//--------------------------------------------------------------------------------
function verCarrito(carrito) {
    let listaCarrito = "Carrito de compras:\n";
    let total = 0;
    for (let comida of carrito) {
    listaCarrito += "-" + comida.nombre + "\n";
    total += parseInt(comida.precio);
}
    alert(listaCarrito + "\n" + "Total:$"+total);
}
//--------------------------------------------------------------------------------
function finalizarCompra() {
alert("Compra finalizada. Gracias por su visita.");
}
//--------------------------------------------------------------------------------
ejecutarMenu();

