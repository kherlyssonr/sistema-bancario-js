const formLogin = document.getElementById("form-login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const checkboxMostraSenha = document.getElementById("checkbox-mostrar-senha");
const mensagemLogin = document.getElementById("mensagem-login");
const botaoEntrar = document.getElementById("botao-entrar");

const emailCorreto = "cliente@k2banco.com";
const senhaCorreta = "jovemtech";

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const emailDigitado = email.value.trim();
  const senhaDigitada = senha.value;

  if (emailDigitado === "" || senhaDigitada === "") {
    mensagemLogin.textContent = "Preencha todos os campos.";
    return;
  }
  if (emailDigitado === emailCorreto && senhaDigitada === senhaCorreta) {
    window.location.href = "painel.html";
  } else {
    mensagemLogin.textContent = "E-mail ou senha incorretos.";
  }
});

checkboxMostraSenha.addEventListener("change", function () {
  if (checkboxMostraSenha.checked) {
    senha.type = "text";
  } else {
    senha.type = "password";
  }
});

email.addEventListener("input", function () {
  mensagemLogin.textContent = "";
});

senha.addEventListener("input", function () {
  mensagemLogin.textContent = "";
});
