/* ==========================================================
   MANIPULAÇÃO DO DOM
   ========================================================== */

/* Dados do cliente no painel */

const nomeClienteCabecalho = document.getElementById("nome-cliente-cabecalho");

const nomeClienteMenu = document.getElementById("nome-cliente-menu");

const nomeClientePerfil = document.getElementById("nome-cliente-perfil");

const tipoContaPerfil = document.getElementById("tipo-conta-perfil");

nomeClienteCabecalho.textContent = cliente.nome;
nomeClienteMenu.textContent = cliente.nome;
nomeClientePerfil.textContent = cliente.nome;
tipoContaPerfil.textContent = cliente.conta.tipo;

/* Dados da conta */

const contaAgencia = document.getElementById("conta-agencia");
const contaNumero = document.getElementById("conta-numero");
const contaTipo = document.getElementById("conta-tipo");

contaAgencia.textContent = cliente.conta.agencia;
contaNumero.textContent = cliente.conta.numero;
contaTipo.textContent = cliente.conta.tipo;

/* Saldo */

const saldoValor = document.getElementById("saldo-valor");

saldoValor.textContent = formatarMoeda(cliente.conta.saldo);

/* Mostrar e esconder saldo */

const botaoMostrarSaldo = document.getElementById("botao-mostrar-saldo");

let saldoVisivel = true;

botaoMostrarSaldo.addEventListener("click", function () {
  if (saldoVisivel) {
    saldoValor.textContent = "••••••";
  } else {
    saldoValor.textContent = formatarMoeda(cliente.conta.saldo);
  }

  saldoVisivel = !saldoVisivel;
});

/* Elementos do depósito */

const formDeposito = document.getElementById("form-deposito");

const valorDepositado = document.getElementById("valor-deposito");

const mensagemDeposito = document.getElementById("mensagem-deposito");

/* Elementos do resumo */

const quantidadeOperacoes = document.getElementById("quantidade-operacoes");

const totalDepositadoElemento = document.getElementById("total-depositado");

/* Elementos do extrato */

const listaTransacoes = document.getElementById("lista-transacoes");

const linhaSemTransacoes = document.getElementById("linha-sem-transacoes");

/* Realizar depósito */

formDeposito.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaDeposito = valorDepositado.value;
  const depositoFeito = Number(entradaDeposito);

  /* Validar campo vazio */

  if (entradaDeposito.trim() === "") {
    mensagemDeposito.textContent = "Informe um valor para o depósito.";

    return;
  }

  /* Validar valor não numérico */

  if (!Number.isFinite(depositoFeito)) {
    mensagemDeposito.textContent = "Digite um valor válido.";

    return;
  }

  /* Bloquear zero e valores negativos */

  if (depositoFeito <= 0) {
    mensagemDeposito.textContent = "O depósito deve ser maior que zero.";

    return;
  }

  /* Atualizar saldo do objeto */

  cliente.conta.saldo = depositar(cliente.conta.saldo, depositoFeito);

  /* Criar a transação */

  const novaTransacao = {
    id: proximoId,
    tipo: "deposito",
    valor: depositoFeito,
    momento: new Date(),
  };

  /* Registrar no Array */

  cliente.conta.transacoes.push(novaTransacao);

  /* Preparar o próximo ID */

  proximoId++;

  /* Atualizar saldo na tela */

  if (saldoVisivel) {
    saldoValor.textContent = formatarMoeda(cliente.conta.saldo);
  } else {
    saldoValor.textContent = "••••••";
  }

  /* Atualizar quantidade de operações */

  quantidadeOperacoes.textContent = cliente.conta.transacoes.length;

  /* Filtrar somente depósitos */

  const depositos = cliente.conta.transacoes.filter(function (transacao) {
    return transacao.tipo === "deposito";
  });

  /* Calcular o total depositado */

  const totalDepositado = calcularTotalTransacoes(depositos);

  /* Atualizar o total depositado na tela */

  totalDepositadoElemento.textContent = formatarMoeda(totalDepositado);

  /* Remover mensagem de extrato vazio */

  if (linhaSemTransacoes && linhaSemTransacoes.isConnected) {
    linhaSemTransacoes.remove();
  }

  /* Formatar data e horário */

  const dataFormatada = novaTransacao.momento.toLocaleDateString("pt-BR");

  const horarioFormatado = novaTransacao.momento.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* Criar uma nova linha no extrato */

  const novaLinha = document.createElement("tr");
  const novaCelula = document.createElement("td");

  novaCelula.colSpan = 5;

  novaCelula.textContent =
    `${novaTransacao.id} - Depósito: ` +
    `${formatarMoeda(novaTransacao.valor)} - ` +
    `${dataFormatada} às ${horarioFormatado}`;

  novaLinha.appendChild(novaCelula);
  listaTransacoes.appendChild(novaLinha);

  /* Mostrar mensagem de sucesso */

  mensagemDeposito.textContent = "Depósito realizado com sucesso.";

  /* Limpar o campo */

  valorDepositado.value = "";
});
