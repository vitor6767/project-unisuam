
  const form = document.getElementById("contactForm");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");
  const toast = document.getElementById("toast");

  // Função do Toast
  function showToast(text, type) {
    toast.textContent = text;
    toast.className = "";
    toast.classList.add("show", type);

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Bloquear números no nome
  nome.addEventListener("input", () => {
    nome.value = nome.value.replace(/[0-9]/g, "");
  });

  // Validação do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (nome.value.trim() === "" || email.value.trim() === "" || mensagem.value.trim() === "") {
      showToast("Preencha todos os campos obrigatórios!", "error");
      return;
    }

    showToast("Mensagem enviada com sucesso!", "success");

    // Limpa o formulário
    form.reset();
  });

