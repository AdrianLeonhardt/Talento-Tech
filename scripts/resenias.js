// Se ejecuta cuando el DOM se cargo completamente
document.addEventListener("DOMContentLoaded", () => {

    // Función de renderizado
    function renderResenias(container, datos) {
        container.classList.add("resenias-grid");
        container.innerHTML = ""; 

        datos.forEach((comment) => {
            const cardDiv = document.createElement("div");
            cardDiv.className = "card-resenia";

            cardDiv.innerHTML = `
                <h3>${comment.user.fullName}</h3>
                <p>"${comment.body}"</p>
            `;

            container.appendChild(cardDiv);
        });
    }

    // Función traer datos
    function fetchResenias() {
        fetch("https://dummyjson.com/comments?limit=10")
            .then((response) => response.json())
            .then((data) => {
                const resenias = data.comments;
                const reseniasContainer = document.getElementById("resenias-container");
                renderResenias(reseniasContainer, resenias);
            })
            .catch((error) => console.error("Error al cargar las reseñas:", error));
    }

    fetchResenias();
});





