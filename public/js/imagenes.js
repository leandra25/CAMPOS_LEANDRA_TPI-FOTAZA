document.addEventListener("click", async (e) => {
  const star = e.target.closest(".star");
  if (!star) return;

  const id_imagen = star.dataset.id;
  const puntaje = Number(star.dataset.value);

  const res = await fetch(`/valoraciones/${id_imagen}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ puntaje })
  });

  const data = await res.json();

  if (!data.ok) return;

  const stars = document.querySelectorAll(`.star[data-id="${id_imagen}"]`);

  stars.forEach(s => {
    const value = Number(s.dataset.value);

    s.classList.toggle("bi-star-fill", value <= puntaje);
    s.classList.toggle("bi-star", value > puntaje);
    s.classList.toggle("text-warning", value <= puntaje);
  });
});


if (res.status === 403) {
  console.log("No puedes votar tu propia publicación");
  return;
}