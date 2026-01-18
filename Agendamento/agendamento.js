// Configurações de data
    const dateInput = document.getElementById('dateInput');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Validação em tempo real - Nome Completo (só letras)
    const nomeCompleto = document.getElementById('nomeCompleto');
    nomeCompleto.addEventListener('input', function() {
      this.value = this.value.replace(/[^A-Za-zÀ-ú\s]/g, '');
    });

    // Validação WhatsApp - apenas números, máximo 11 dígitos
    const whatsapp = document.getElementById('whatsapp');
    whatsapp.addEventListener('input', function() {
      this.value = this.value.replace(/\D/g, '');
      if (this.value.length > 11) this.value = this.value.slice(0, 11);
    });


    const form = document.querySelector("form");
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeCompleto").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const servico = document.querySelector("select").value;
    const data = document.getElementById("dateInput").value;
    const hora = document.querySelector('input[type="time"]').value;

    if (nome === "") {
      showToast("⚠️ Preencha o nome completo.");
      return;
    }

    if (whatsapp.length !== 11) {
      showToast("⚠️ Informe um WhatsApp válido com 11 números.");
      return;
    }

    if (email === "") {
      showToast("⚠️ Preencha o e-mail.");
      return;
    }

    if (servico === "") {
      showToast("⚠️ Selecione um tipo de serviço.");
      return;
    }

    if (data === "") {
      showToast("⚠️ Escolha uma data.");
      return;
    }

    if (hora === "") {
      showToast("⚠️ Escolha um horário.");
      return;
    }

    // Se tudo estiver correto
    showToast("✅ Solicitação enviada com sucesso!");
    
    // Aqui você pode enviar para backend depois
    form.reset();
  });