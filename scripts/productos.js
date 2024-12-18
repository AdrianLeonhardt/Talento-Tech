document.addEventListener("DOMContentLoaded", () => {

    // Función de renderizado
    function renderProductos(container, datos) {
        container.innerHTML = ""; 
        container.classList.remove("cards-flexbox");  
        container.classList.add("container-cards"); 


        datos.forEach((recipe) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "cards-flexbox"; 

            cardDiv.innerHTML = `
                <h2>${recipe.name}</h2>
                <img src="${recipe.image}" alt="${recipe.name}"> 
                <p>Ingredientes: ${recipe.ingredients}</p>
                <p>Dificultad: ${recipe.difficulty}</p>
                <h3>Precio: $35</h3>
            `;


            container.appendChild(cardDiv);
        });
    }

    // Función para traer los datos de los productos
    function fetchProductos() {
        fetch("https://dummyjson.com/recipes?limit=21")
            .then((response) => response.json())  
            .then((data) => {
                const productos = data.recipes; 
                const productosContainer = document.getElementById("productos-container");
                renderProductos(productosContainer, productos); 
            })
            .catch((error) => console.error("Error al cargar los productos:", error));
    }

    fetchProductos(); 
});
