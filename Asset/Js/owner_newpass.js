const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");

const eyeNew = document.getElementById("eye-new");
const eyeConfirm = document.getElementById("eye-confirm");

function togglePassword(input, icon) {
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

eyeNew.onclick = () => togglePassword(newPassword, eyeNew);
eyeConfirm.onclick = () => togglePassword(confirmPassword, eyeConfirm);