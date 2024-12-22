// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    const producto = productos.find(item => item.id === id);

    if (producto) {
        const productoExistente = carrito.findIndex(item => item.id === producto.id);

        if (productoExistente === -1) {
            carrito.push({ ...producto, cantidad: 1 });
        } else {
            carrito[productoExistente].cantidad = (carrito[productoExistente].cantidad || 1) + 1;
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    let sumaCantidad = 0;

    for (let i = 0; i < carrito.length; i++) {
        sumaCantidad += carrito[i].cantidad;
    }

    const contador = document.getElementById("contador-carrito");

    if (sumaCantidad > 0) {
        contador.style.display = "block";
        contador.textContent = sumaCantidad;
    } else {
        contador.style.display = "none";
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    localStorage.removeItem("total");
    mostrarCarrito();
    actualizarContadorCarrito();

    Swal.fire({
        icon: 'success',
        title: '¡Carrito Vaciado!',
        text: '',
        confirmButtonColor: '#000000',
        confirmButtonText: 'Aceptar',
        background: '#28a745',
        color: '#fff'
    });
}

// Función para cargar la página del carrito
function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const carritoHTML = document.getElementById("carrito-productos");

    if (carrito.length > 0) {
        carritoHTML.innerHTML = "";
        let total = 0;

        carrito.forEach(producto => {
            const productoDiv = document.createElement("div");
            productoDiv.className = "carrito-div";

            let subtotal = producto.price * producto.cantidad;
            subtotal = subtotal.toFixed(2);

            productoDiv.innerHTML = `
                <div class="card-carrito">
                    <img src="${producto.images}" alt="${producto.name}">
                    <div class="card-productos-carrito">
                        <h5>${producto.title}</h5>
                        <p>Cantidad:<br> 
                            <button id="disminuir-cantidad-${producto.id}" class="disminuir-cantidad">-</button>
                            ${producto.cantidad}
                            <button id="aumentar-cantidad-${producto.id}" class="aumentar-cantidad">+</button>
                        </p>
                        <p>Precio: $${producto.price}</p>
                        <p>Subtotal: $${subtotal}</p>
                    </div>
                </div>
            `;

            carritoHTML.appendChild(productoDiv);
            total += producto.price * producto.cantidad;
        });

        total = total.toFixed(2);

        localStorage.setItem("total", total);

        const totalElemento = document.getElementById("total-carrito");
        totalElemento.innerHTML = `
            <h2>Total: $${total}</h2>
            <button id="vaciar-carrito">Vaciar Carrito</button>
            <button id="comprar-carrito">Comprar</button>
        `;

        // Eventos Listeners para que los botones funcionen

        const botonVaciar = document.getElementById("vaciar-carrito");
        botonVaciar.addEventListener("click", vaciarCarrito);

        const botonComprar = document.getElementById("comprar-carrito");
        botonComprar.addEventListener("click", comprarCarrito);

        carrito.forEach(producto => {
            const botonDisminuirCantidad = document.getElementById(`disminuir-cantidad-${producto.id}`);
            if (botonDisminuirCantidad) {
                botonDisminuirCantidad.addEventListener("click", function () {
                    disminuirCantidad(producto.id);
                });
            }

            const botonAumentarCantidad = document.getElementById(`aumentar-cantidad-${producto.id}`);
            if (botonAumentarCantidad) {
                botonAumentarCantidad.addEventListener("click", function () {
                    aumentarCantidad(producto.id);
                });
            }
        });

    } else {
        carritoHTML.innerHTML = "<p>No hay productos en el carrito.</p>";
        const totalElemento = document.getElementById("total-carrito");
        totalElemento.innerHTML = "";
    }
}

// Función de compra
function comprarCarrito() {

    const total = localStorage.getItem("total");

    vaciarCarrito();

    const carritoHTML = document.getElementById("carrito-productos");
    const totalElemento = document.getElementById("total-carrito");


    carritoHTML.innerHTML = "<h3>¡Compra realizada con éxito!</h3><br><br>";
    totalElemento.innerHTML = `<br><br><h2>Total: $${total}</h2>`;

    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada con éxito!',
        text: 'Gracias por tu compra.',
        text: 'Total: $' + total,
        confirmButtonColor: '#000000',
        confirmButtonText: 'Aceptar',
        background: '#28a745',
        color: '#fff'
    });
}

// Función para disminuir cantidad 
function disminuirCantidad(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    const producto = carrito.find(item => item.id == idProducto);

    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para aumentar cantidad
function aumentarCantidad(idProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

    const producto = carrito.find(item => item.id == idProducto);

    if (producto) {
        producto.cantidad += 1;
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}


// Evento para cargar el carrito
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    mostrarCarrito();
});


