document.addEventListener("DOMContentLoaded", () => {
    
    // Escuchamos los clics en todo el documento
    document.addEventListener("click", async (e) => {
        
        //  Comprobamos si el elemento clickeado es nuestro botón
        const boton = e.target.closest(".btn-seguir");
        if (!boton) return; 
       
        //  Obtenemos el ID del usuario desde el atributo data-id
        const idUsuario = boton.dataset.id;
        
        //  Determinamos si es para seguir o dejar de seguir
        const esParaSeguir = boton.innerText.trim() === "Seguir";
        
        
        // Pasamos el ID del usuario directamente en la URL dinámica
        const url = esParaSeguir ? `/seguir/${idUsuario}` : `/seguir/unfollow/${idUsuario}`;

        try {
            //  Enviamos la petición al servidor
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
               
            });

            if (response.ok) {
                //  Cambiamos el aspecto visual del botón
                if (esParaSeguir) {
                    boton.innerText = "Dejar de seguir";
                    boton.classList.remove("btn-primary");
                    boton.classList.add("btn-outline-secondary");
                } else {
                    boton.innerText = "Seguir";
                    boton.classList.remove("btn-outline-secondary");
                    boton.classList.add("btn-primary");
                }
            } else {
                alert("Hubo un error al procesar la solicitud en el servidor.");
            }

        } catch (error) {
            console.error("Error en la petición fetch:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});