
const avatarPreview = document.getElementById("previewAvatar");
const avatarInput = document.getElementById("avatarInput");

const avatarOriginal = avatarPreview ? avatarPreview.src : "";

function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        avatarPreview.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function cancelPreview() {
    avatarPreview.src = avatarOriginal;
    avatarInput.value = "";
}

window.previewImage = previewImage;
window.cancelPreview = cancelPreview;