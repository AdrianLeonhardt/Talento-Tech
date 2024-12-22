document.addEventListener("DOMContentLoaded", () => {

    // Función de renderizado
    function renderProductos(container, datos) {
        container.innerHTML = "";
        container.classList.remove("cards-flexbox");
        container.classList.add("container-cards");


        datos.forEach((products) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "cards-flexbox";

            cardDiv.innerHTML = `
                <h2>${products.title}</h2>
                <img src="${products.images}" alt="${products.name}"> 
                <p>Descripción: ${products.description}</p>
                <p>Categoria: ${products.category}</p>
                <h3>Precio: ${products.price}</h3>
                <button onclick="agregarAlCarrito(${products.id})" class="btn-agregar-carrito">Agregar al carrito</button>
            `;


            container.appendChild(cardDiv);
        });
    }

    // Función para traer los datos de los productos
    function fetchProductos() {
        fetch("https://dummyjson.com/products?limit=21")
            .then((response) => response.json())
            .then((data) => {
                //Usamos la variable global "window" para usar la variable productos en la función agregarAlCarrito
                window.productos = data.products;
                const productosContainer = document.getElementById("productos-container");
                renderProductos(productosContainer, productos);
            })
            .catch((error) => console.error("Error al cargar los productos:", error));
    }

    fetchProductos();
});