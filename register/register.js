const toast = document.getElementById("toast-box");
const form = document.getElementById("registerForm");

const campos = {
  nome: document.getElementById("nome"),
  nomeMaterno: document.getElementById("nomeMaterno"),
  usuario: document.getElementById("usuario"),
  email: document.getElementById("email"),
  telefone: document.getElementById("telefone"),
  genero: document.getElementById("genero"),
  cep: document.getElementById("cep"),
  rua: document.getElementById("rua"),
  numero: document.getElementById("numero"),
  cidade: document.getElementById("cidade"),
  estado: document.getElementById("estado"),
  senha: document.getElementById("senha"),
  confirmarSenha: document.getElementById("confirmarSenha")
};

function showToast(msg, type = "error") {
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  toast.textContent = msg;
  switch(type) {
    case "success": toast.style.backgroundColor = "var(--success-color)"; break;
    case "empty": toast.style.backgroundColor = "#f59e0b"; break;
    default: toast.style.backgroundColor = "var(--error-color)";
  }
  toast.classList.add("show");
  toast.timeoutId = setTimeout(() => toast.classList.remove("show"), 3000);
}

// Máscaras
campos.cep.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g,'').replace(/^(\d{5})(\d)/,'$1-$2');
});

campos.telefone.addEventListener("input", e => {
  let v = e.target.value.replace(/\D/g,'');
  if(v.length>10) v = v.replace(/^(\d{2})(\d{5})(\d)/,'($1) $2-$3');
  else v = v.replace(/^(\d{2})(\d{4})(\d)/,'($1) $2-$3');
  e.target.value = v;
});

// Bloquear números no nome
["nome","nomeMaterno"].forEach(id => {
  campos[id].addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g,'');
  });
});

// Apenas números
["numero"].forEach(id => {
  campos[id].addEventListener("input", e => e.target.value = e.target.value.replace(/\D/g,''));
});

// CEP preenchimento automático
let cepPreenchidoAutomatico = false;
campos.cep.addEventListener("blur", () => {
  const cepLimpo = campos.cep.value.replace(/\D/g, "");
  if (cepLimpo.length !== 8) return;
  fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) { showToast("CEP não encontrado"); return; }
      campos.rua.value = data.logradouro;
      campos.cidade.value = data.localidade;
      campos.estado.value = data.uf;
      if (!cepPreenchidoAutomatico) {
        showToast("Endereço preenchido!", "success");
        cepPreenchidoAutomatico = true;
      }
    });
});
campos.cep.addEventListener("input", () => cepPreenchidoAutomatico = false);

// Submissão do formulário
form.addEventListener("submit", e => {
  e.preventDefault();
  for (let key in campos) {
    if (!campos[key].value) { showToast("Preencha todos os campos!", "empty"); return; }
  }
  if (campos.senha.value !== campos.confirmarSenha.value) { showToast("Senhas não coincidem!"); return; }
  const dados = {};
  for (let key in campos) dados[key] = campos[key].value;
  localStorage.setItem("cadastroFioForte", JSON.stringify(dados));
  showToast("Cadastro realizado com sucesso!", "success");
  form.reset();
});