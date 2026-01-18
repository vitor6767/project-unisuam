const loginForm = document.getElementById('loginForm');
const userInput = document.getElementById('username');
const passInput = document.getElementById('password');
const togglePass = document.getElementById('togglePassword');
const toast = document.getElementById('toast-box');
const rememberCheck = document.getElementById('rememberMe');

// Mostrar / esconder senha
togglePass.addEventListener('click', () => {
  const type = passInput.type === 'password' ? 'text' : 'password';
  passInput.type = type;
  togglePass.classList.toggle('bx-show');
  togglePass.classList.toggle('bx-hide');
});

// Carregar usuário salvo
window.onload = () => {
  const savedUser = localStorage.getItem('fioForteUsername');
  if (savedUser) {
    userInput.value = savedUser;
    rememberCheck.checked = true;
  }
};

// Função Toast
function showToast(message, isError = true) {
  toast.textContent = message;
  toast.style.backgroundColor = isError
    ? 'var(--error-color)'
    : 'var(--success-color)';

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Submit login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const savedUser = JSON.parse(localStorage.getItem('cadastroFioForte'));

  if (!savedUser) {
    showToast("❌ Nenhum usuário cadastrado!");
    return;
  }

  if (
    userInput.value === savedUser.usuario &&
    passInput.value === savedUser.senha
  ) {
    if (rememberCheck.checked) {
      localStorage.setItem('fioForteUsername', userInput.value);
    } else {
      localStorage.removeItem('fioForteUsername');
    }

    showToast("✅ Login realizado com sucesso!", false);

    setTimeout(() => {
      window.location.href = "../"./index.html".html";
    }, 1000);

  } else {
    showToast("❌ Usuário ou senha incorretos");
    passInput.style.borderColor = 'var(--error-color)';

    setTimeout(() => {
      passInput.style.borderColor = '#e2e8f0';
    }, 2000);
  }
});
