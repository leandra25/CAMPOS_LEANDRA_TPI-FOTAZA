const imagenInput = document.getElementById("imagenInput");
const imagenesInput = document.getElementById("imagenes");

imagenInput.addEventListener("change", function () {

    const archivos = Array.from(this.files);

    if (!archivos.length) return;

    const imagenes = [];
    let procesadas = 0;

    archivos.forEach((archivo) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            imagenes.push({
                nombre: archivo.name,
                tipoMime: archivo.type,
                base64: e.target.result
            });

            procesadas++;

            if (procesadas === archivos.length) {
                imagenesInput.value =
                    JSON.stringify(imagenes);
            }
        };

        reader.readAsDataURL(archivo);
    });
});