console.log("JS funcionando");

document.addEventListener("DOMContentLoaded", () => {

    const carpetas = document.querySelectorAll(".carpeta");
    const archivos = document.querySelectorAll(".archivo");

    carpetas.forEach(carpeta => {
        carpeta.addEventListener("click", () => {

            // Quitar activo a todos
            archivos.forEach(a => a.classList.remove("activo"));
            carpetas.forEach(c => c.classList.remove("activa"));
            carpeta.classList.add("activa");

            // Obtener ID
            const id = carpeta.dataset.id;

            // Activar el correcto
            const contenido = document.getElementById(id);

            if (contenido) {
                contenido.classList.add("activo");
            }
        });
    });

});