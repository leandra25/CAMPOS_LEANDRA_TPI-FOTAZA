document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const liveResults = document.getElementById("liveSearchResults");
    let timeoutId = null;

    if (!searchInput) return;

    // Escucha cuando el usuario escribe en el buscador
    searchInput.addEventListener("input", () => {
        clearTimeout(timeoutId);
        const query = searchInput.value.trim();
        
        // Obtiene cuál radio button está seleccionado (titulo o etiqueta)
        const filterType = document.querySelector('input[name="type"]:checked').value;

        // Si borró todo el texto, oculta la cajita de sugerencias
        if (query.length < 2) {
            liveResults.classList.add("d-none");
            liveResults.innerHTML = "";
            return;
        }

        // Espera 300ms antes de hacer la petición a la base de datos (Debounce)
        timeoutId = setTimeout(async () => {
            try {
                // Hacemos la consulta asíncrona pasando 'q' y 'type'
                // Agregamos las cabeceras necesarias para que Express detecte 'req.xhr'
                const response = await fetch(`/buscar?q=${encodeURIComponent(query)}&type=${filterType}`, {
                    headers: { "X-Requested-With": "XMLHttpRequest" }
                });
                
                const publicaciones = await response.json();

                // Si no hay resultados, ocultamos el panel
                if (publicaciones.length === 0) {
                    liveResults.innerHTML = '<div class="list-group-item text-muted">No se encontraron coincidencias</div>';
                    liveResults.classList.remove("d-none");
                    return;
                }

                // Dibujamos las sugerencias en el HTML dinámicamente
                liveResults.innerHTML = publicaciones.map(post => `
                    <a href="/publicaciones/${post.id_publicacion}" class="list-group-item list-group-item-action d-flex align-items-center gap-2">
                        <img src="${post.imagenUrl}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px;" />
                        <div>
                            <div class="fw-bold text-dark">${post.titulo}</div>
                            <small class="text-muted">por @${post.autor}</small>
                        </div>
                    </a>
                `).join("");

                liveResults.classList.remove("d-none");

            } catch (error) {
                console.error("Error en la búsqueda en tiempo real:", error);
            }
        }, 300);
    });

    // Ocultar los resultados flotantes si el usuario hace click afuera del buscador
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !liveResults.contains(e.target)) {
            liveResults.classList.add("d-none");
        }
    });
});