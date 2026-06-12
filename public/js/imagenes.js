document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".star").forEach(star => {

    star.onclick = async () => {

      try {
        const id_imagen = star.dataset.id;
        const puntaje = star.dataset.value;

        const res = await fetch(`/valoraciones/${id_imagen}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ puntaje })
        });

        const data = await res.json();

        if (!res.ok) {
          console.log("error rating:", data);
          return;
        }

        window.dispatchEvent(new Event("rating-updated"));
        location.reload();

      } catch (err) {
        console.error("Error rating:", err);
      }
    };

  });

});