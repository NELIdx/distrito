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

const boton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-enlaces");

boton.addEventListener("click", function () {
    menu.classList.toggle("abierto");
});
const fotos = document.querySelectorAll(".foto-actividades");
const juegos = document.querySelectorAll(".imagen-juegos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

fotos.forEach(function (foto) {
    foto.addEventListener("click", function () {
        lightboxImg.src = foto.src;
        lightbox.classList.add("abierto");
    });
});

juegos.forEach(function (juego) {
    juego.addEventListener("click", function () {
        lightboxImg.src = juego.src;
        lightbox.classList.add("abierto");
    });
});

lightbox.addEventListener("click", function () {
    lightbox.classList.remove("abierto");
});