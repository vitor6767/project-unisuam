document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.slide-menu a').forEach(function (link) {
        link.addEventListener('click', function () {
            var toggle = document.getElementById('menu-toggle');
            if (toggle) {
                toggle.checked = false;
            }
        });
    });
});

const form = document.getElementById("contactForm");
const nomeInput = document.getElementById("nome");
const toast = document.getElementById("toast");

// Permite apenas letras e acentos no campo nome
nomeInput.addEventListener("input", function() {
    // Remove qualquer caractere que não seja letra, espaço ou acento
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Verifica campos vazios
    if (!nome || !email || !mensagem) {
        showToast("Por favor, preencha todos os campos!", false);
        return;
    }

    // Tudo certo
    showToast("Mensagem enviada com sucesso!", true);

    // Limpa campos
    form.reset();
});

function showToast(msg, success) {
    toast.textContent = msg;
    toast.style.backgroundColor = success ? "#4caf50" : "#f44336";
    toast.className = "show";

    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}
