console.log("¡Distrito está conectado a JavaScript!");

// 1. Buscamos todos los enlaces que están dentro del <nav>
const enlaces = document.querySelectorAll("nav a");

// 2. Averiguamos en qué página estamos ahora mismo
const paginaActual = window.location.pathname.split("/").pop();

// 3. Revisamos cada enlace uno por uno
enlaces.forEach(function (enlace) {
    // ¿El "href" de este enlace coincide con la página donde estoy?
    if (new URL(enlace.href).pathname.split("/").pop() === paginaActual) {
        enlace.classList.add("activo");
    }
});

const boton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-enlaces");

if (boton && menu) {
    boton.addEventListener("click", function () {
        const abierto = menu.classList.toggle("abierto");
        boton.setAttribute("aria-expanded", String(abierto));
        boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
}

document.querySelectorAll(".carrusel").forEach(function (carrusel) {
    const ventana = carrusel.querySelector(".carrusel-ventana");
    const pista = carrusel.querySelector(".carrusel-pista");
    const anterior = carrusel.querySelector(".carrusel-control.anterior");
    const siguiente = carrusel.querySelector(".carrusel-control.siguiente");
    const estado = carrusel.querySelector(".carrusel-estado");
    const fotosCarrusel = Array.from(pista.children);

    function actualizarCarrusel() {
        const primeraFoto = fotosCarrusel[0];
        const estilosPista = window.getComputedStyle(pista);
        const espacio = parseFloat(estilosPista.columnGap || estilosPista.gap) || 0;
        const paso = primeraFoto.getBoundingClientRect().width + espacio;
        const indiceInicial = Math.round(ventana.scrollLeft / paso);
        const fotosVisibles = Math.max(1, Math.floor((ventana.clientWidth + espacio) / paso));
        const indiceFinal = Math.min(fotosCarrusel.length, indiceInicial + fotosVisibles);

        anterior.disabled = ventana.scrollLeft <= 1;
        siguiente.disabled = ventana.scrollLeft + ventana.clientWidth >= ventana.scrollWidth - 1;
        estado.textContent = `Mostrando fotos ${indiceInicial + 1}–${indiceFinal} de ${fotosCarrusel.length}`;
    }

    function desplazar(direccion) {
        const primeraFoto = fotosCarrusel[0];
        const espacio = parseFloat(window.getComputedStyle(pista).columnGap) || 0;
        const paso = primeraFoto.getBoundingClientRect().width + espacio;
        const movimiento = Math.max(paso, ventana.clientWidth * 0.85) * direccion;
        const comportamiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

        ventana.scrollBy({ left: movimiento, behavior: comportamiento });
    }

    anterior.addEventListener("click", function () { desplazar(-1); });
    siguiente.addEventListener("click", function () { desplazar(1); });
    ventana.addEventListener("scroll", actualizarCarrusel, { passive: true });
    window.addEventListener("resize", actualizarCarrusel);
    actualizarCarrusel();
});

const fotos = document.querySelectorAll(".foto-actividades");
const juegos = document.querySelectorAll(".imagen-juegos");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const lightboxCerrar = document.getElementById("lightbox-cerrar");
let fotoActiva = null;

function abrirLightbox(foto) {
    if (!lightbox || !lightboxImg) return;
    fotoActiva = foto;
    lightboxImg.src = foto.src;
    lightboxImg.alt = foto.alt;
    lightbox.classList.add("abierto");
    lightbox.setAttribute("aria-hidden", "false");
    if (lightboxCerrar) lightboxCerrar.focus();
}

function cerrarLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("abierto");
    lightbox.setAttribute("aria-hidden", "true");
    if (fotoActiva) fotoActiva.focus();
}

[...fotos, ...juegos].forEach(function (foto) {
    foto.setAttribute("loading", "lazy");
    foto.setAttribute("decoding", "async");
    foto.setAttribute("tabindex", "0");
    foto.setAttribute("role", "button");
    foto.setAttribute("aria-label", `Ampliar imagen: ${foto.alt}`);
    foto.addEventListener("click", function () { abrirLightbox(foto); });
    foto.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            abrirLightbox(foto);
        }
    });
});

if (lightbox) {
    lightbox.addEventListener("click", function (evento) {
        if (evento.target === lightbox || evento.target === lightboxCerrar) cerrarLightbox();
    });
    document.addEventListener("keydown", function (evento) {
        if (!lightbox.classList.contains("abierto")) return;
        if (evento.key === "Escape") cerrarLightbox();
        if (evento.key === "Tab" && lightboxCerrar) {
            evento.preventDefault();
            lightboxCerrar.focus();
        }
    });
}
const noticias = document.querySelectorAll("[data-fecha]");
const hoy = new Date();

noticias.forEach(function (noticia) {
    const [anio, mes, dia] = noticia.getAttribute("data-fecha").split("-").map(Number);
    const fechaPublicacion = new Date(anio, mes - 1, dia);
    const hoyLocal = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
    const diferenciaDias = Math.floor((hoyLocal - fechaPublicacion) / (1000 * 60 * 60 * 24));
    const badge = noticia.querySelector(".badge");

    if (badge && diferenciaDias >= 0 && diferenciaDias <= 7) {
        badge.hidden = false;
    }
});
