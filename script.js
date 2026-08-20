console.log("¡Distritro está conectado a JavaScript!");

// 1. Buscamos todos los enlaces que están dentro del <nav>
const enlaces = document.querySelectorAll("nav a");

// 2. Averiguamos en qué página estamos ahora mismo
const paginaActual = window.location.pathname.split("/").pop();

// 3. Revisamos cada enlace uno por uno
enlaces.forEach(function (enlace) {
    // ¿El "href" de este enlace coincide con la página donde estoy?
    if (enlace.getAttribute("href") === paginaActual) {
        enlace.classList.add("activo");
    }
});