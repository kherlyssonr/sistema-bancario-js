/*
  K2 Banco Digital — versão 4.1.0

  Painel bancário desenvolvido com:
  - Objetos
  - Arrays de objetos
  - Métodos filter(), find(), reduce() e forEach()
  - Manipulação do DOM
  - Eventos de formulário
*/

/* ==========================================================
   DADOS DO CLIENTE
   ========================================================== */

const cliente = {
  nome: "Kherlysson Ryann",
  idade: 25,
  conta: {
    agencia: "0001",
    numero: "12345-6",
    tipo: "Conta corrente",
    saldo: 100,
    transacoes: [],
  },
};

let proximoId = 1;

/* ==========================================================
   FUNÇÕES DO SISTEMA
   ========================================================== */

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function consultarSaldo() {
  return cliente.conta.saldo;
}

function depositar(saldoAtual, depositoFeito) {
  return saldoAtual + depositoFeito;
}

function sacar(saldoAtual, saqueFeito) {
  return saldoAtual - saqueFeito;
}

function calcularTotalTransacoes(listaTransacoes) {
  return listaTransacoes.reduce(function (total, transacao) {
    return total + transacao.valor;
  }, 0);
}

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;

  elemento.classList.remove("mensagem-sucesso", "mensagem-erro");

  if (tipo === "sucesso") {
    elemento.classList.add("mensagem-sucesso");
  } else {
    elemento.classList.add("mensagem-erro");
  }
}

function limparMensagem(elemento) {
  elemento.textContent = "";

  elemento.classList.remove("mensagem-sucesso", "mensagem-erro");
}

function registrarTransacao(tipo, valor) {
  const novaTransacao = {
    id: proximoId,
    tipo: tipo,
    valor: valor,
    momento: new Date(),
  };

  cliente.conta.transacoes.push(novaTransacao);
  proximoId++;

  return novaTransacao;
}

/* ==========================================================
   CAPTURA DOS ELEMENTOS DO DOM
   ========================================================== */

/* Dados do cliente */

const nomeClienteCabecalho = document.getElementById("nome-cliente-cabecalho");

const nomeClienteMenu = document.getElementById("nome-cliente-menu");

const nomeClientePerfil = document.getElementById("nome-cliente-perfil");

const tipoContaPerfil = document.getElementById("tipo-conta-perfil");

/* Dados da conta */

const contaAgencia = document.getElementById("conta-agencia");
const contaNumero = document.getElementById("conta-numero");
const contaTipo = document.getElementById("conta-tipo");

/* Saldo */

const saldoValor = document.getElementById("saldo-valor");

const botaoMostrarSaldo = document.getElementById("botao-mostrar-saldo");

/* Resumo */

const quantidadeOperacoes = document.getElementById("quantidade-operacoes");

const totalDepositadoElemento = document.getElementById("total-depositado");

const totalSacadoElemento = document.getElementById("total-sacado");

/* Depósito */

const formDeposito = document.getElementById("form-deposito");
const valorDepositado = document.getElementById("valor-deposito");

const mensagemDeposito = document.getElementById("mensagem-deposito");

/* Saque */

const formSaque = document.getElementById("form-saque");
const valorSaque = document.getElementById("valor-saque");
const mensagemSaque = document.getElementById("mensagem-saque");

/* Extrato */

const listaTransacoes = document.getElementById("lista-transacoes");

const filtroTransacoes = document.getElementById("filtro-transacoes");

const formBuscaTransacao = document.getElementById("form-busca-transacao");

const buscaTransacaoId = document.getElementById("busca-transacao-id");

const mensagemExtrato = document.getElementById("mensagem-extrato");

/* ==========================================================
   FUNÇÕES DA INTERFACE
   ========================================================== */

let saldoVisivel = true;

function atualizarSaldoNaTela() {
  if (saldoVisivel) {
    saldoValor.textContent = formatarMoeda(consultarSaldo());
  } else {
    saldoValor.textContent = "••••••";
  }
}

function atualizarResumo() {
  const depositos = cliente.conta.transacoes.filter(function (transacao) {
    return transacao.tipo === "deposito";
  });

  const saques = cliente.conta.transacoes.filter(function (transacao) {
    return transacao.tipo === "saque";
  });

  const totalDepositado = calcularTotalTransacoes(depositos);
  const totalSacado = calcularTotalTransacoes(saques);

  quantidadeOperacoes.textContent = cliente.conta.transacoes.length;
  totalDepositadoElemento.textContent = formatarMoeda(totalDepositado);
  totalSacadoElemento.textContent = formatarMoeda(totalSacado);
}

function renderizarTransacoes(lista) {
  listaTransacoes.innerHTML = "";

  if (lista.length === 0) {
    const linhaVazia = document.createElement("tr");
    const celulaVazia = document.createElement("td");

    celulaVazia.colSpan = 5;
    celulaVazia.textContent = "Nenhuma transação encontrada.";

    linhaVazia.appendChild(celulaVazia);
    listaTransacoes.appendChild(linhaVazia);

    return;
  }

  lista.forEach(function (transacao) {
    const dataFormatada = transacao.momento.toLocaleDateString("pt-BR");

    const horarioFormatado = transacao.momento.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const novaLinha = document.createElement("tr");

    const celulaId = document.createElement("td");
    const celulaTipo = document.createElement("td");
    const celulaData = document.createElement("td");
    const celulaHorario = document.createElement("td");
    const celulaValor = document.createElement("td");

    celulaId.textContent = transacao.id;
    celulaData.textContent = dataFormatada;
    celulaHorario.textContent = horarioFormatado;
    celulaValor.textContent = formatarMoeda(transacao.valor);

    if (transacao.tipo === "deposito") {
      celulaTipo.textContent = "Depósito";

      celulaTipo.classList.add("tipo-transacao", "tipo-deposito");

      celulaValor.classList.add("valor-deposito");
    } else {
      celulaTipo.textContent = "Saque";

      celulaTipo.classList.add("tipo-transacao", "tipo-saque");

      celulaValor.classList.add("valor-saque");
    }

    novaLinha.appendChild(celulaId);
    novaLinha.appendChild(celulaTipo);
    novaLinha.appendChild(celulaData);
    novaLinha.appendChild(celulaHorario);
    novaLinha.appendChild(celulaValor);

    listaTransacoes.appendChild(novaLinha);
  });
}

function restaurarExtratoCompleto() {
  filtroTransacoes.value = "todos";
  buscaTransacaoId.value = "";
  limparMensagem(mensagemExtrato);

  renderizarTransacoes(cliente.conta.transacoes);
}

/* ==========================================================
   DADOS INICIAIS DO PAINEL
   ========================================================== */

nomeClienteCabecalho.textContent = cliente.nome;
nomeClienteMenu.textContent = cliente.nome;
nomeClientePerfil.textContent = cliente.nome;
tipoContaPerfil.textContent = cliente.conta.tipo;

contaAgencia.textContent = cliente.conta.agencia;
contaNumero.textContent = cliente.conta.numero;
contaTipo.textContent = cliente.conta.tipo;

atualizarSaldoNaTela();
atualizarResumo();
renderizarTransacoes(cliente.conta.transacoes);

/* ==========================================================
   MOSTRAR E ESCONDER SALDO
   ========================================================== */

botaoMostrarSaldo.addEventListener("click", function () {
  saldoVisivel = !saldoVisivel;
  atualizarSaldoNaTela();
});

/* ==========================================================
   REALIZAR DEPÓSITO
   ========================================================== */

formDeposito.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaDeposito = valorDepositado.value.trim();
  const depositoFeito = Number(entradaDeposito);

  if (entradaDeposito === "") {
    mostrarMensagem(
      mensagemDeposito,
      "Informe um valor para o depósito.",
      "erro",
    );

    return;
  }

  if (!Number.isFinite(depositoFeito)) {
    mostrarMensagem(mensagemDeposito, "Digite um valor válido.", "erro");

    return;
  }

  if (depositoFeito <= 0) {
    mostrarMensagem(
      mensagemDeposito,
      "O depósito deve ser maior que zero.",
      "erro",
    );

    return;
  }

  cliente.conta.saldo = depositar(cliente.conta.saldo, depositoFeito);

  registrarTransacao("deposito", depositoFeito);

  atualizarSaldoNaTela();
  atualizarResumo();
  restaurarExtratoCompleto();

  limparMensagem(mensagemSaque);

  mostrarMensagem(
    mensagemDeposito,
    "Depósito realizado com sucesso.",
    "sucesso",
  );

  valorDepositado.value = "";
});

/* ==========================================================
   REALIZAR SAQUE
   ========================================================== */

formSaque.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaSaque = valorSaque.value.trim();
  const saqueFeito = Number(entradaSaque);

  if (entradaSaque === "") {
    mostrarMensagem(mensagemSaque, "Informe um valor para o saque.", "erro");

    return;
  }

  if (!Number.isFinite(saqueFeito)) {
    mostrarMensagem(mensagemSaque, "Digite um valor válido.", "erro");

    return;
  }

  if (saqueFeito <= 0) {
    mostrarMensagem(mensagemSaque, "O saque deve ser maior que zero.", "erro");

    return;
  }

  if (saqueFeito > cliente.conta.saldo) {
    mostrarMensagem(
      mensagemSaque,
      "Saldo insuficiente para realizar o saque.",
      "erro",
    );

    return;
  }

  cliente.conta.saldo = sacar(cliente.conta.saldo, saqueFeito);

  registrarTransacao("saque", saqueFeito);

  atualizarSaldoNaTela();
  atualizarResumo();
  restaurarExtratoCompleto();

  limparMensagem(mensagemDeposito);

  mostrarMensagem(mensagemSaque, "Saque realizado com sucesso.", "sucesso");

  valorSaque.value = "";
});

/* ==========================================================
   FILTRAR TRANSAÇÕES
   ========================================================== */

filtroTransacoes.addEventListener("change", function () {
  const filtroSelecionado = filtroTransacoes.value;

  buscaTransacaoId.value = "";
  limparMensagem(mensagemExtrato);

  if (filtroSelecionado === "todos") {
    renderizarTransacoes(cliente.conta.transacoes);
    return;
  }

  const transacoesFiltradas = cliente.conta.transacoes.filter(
    function (transacao) {
      return transacao.tipo === filtroSelecionado;
    },
  );

  renderizarTransacoes(transacoesFiltradas);
});

/* ==========================================================
   BUSCAR TRANSAÇÃO PELO ID
   ========================================================== */

formBuscaTransacao.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaId = buscaTransacaoId.value.trim();
  const idProcurado = Number(entradaId);

  if (entradaId === "") {
    mostrarMensagem(mensagemExtrato, "Informe o ID da transação.", "erro");

    return;
  }

  if (!Number.isFinite(idProcurado)) {
    mostrarMensagem(mensagemExtrato, "Digite um ID válido.", "erro");

    return;
  }

  if (!Number.isInteger(idProcurado)) {
    mostrarMensagem(
      mensagemExtrato,
      "O ID deve ser um número inteiro.",
      "erro",
    );

    return;
  }

  if (idProcurado <= 0) {
    mostrarMensagem(mensagemExtrato, "O ID deve ser maior que zero.", "erro");

    return;
  }

  const transacaoEncontrada = cliente.conta.transacoes.find(
    function (transacao) {
      return transacao.id === idProcurado;
    },
  );

  if (transacaoEncontrada === undefined) {
    renderizarTransacoes([]);

    mostrarMensagem(
      mensagemExtrato,
      "Nenhuma transação encontrada com esse ID.",
      "erro",
    );

    return;
  }

  filtroTransacoes.value = "todos";
  renderizarTransacoes([transacaoEncontrada]);

  mostrarMensagem(
    mensagemExtrato,
    "Transação encontrada com sucesso.",
    "sucesso",
  );

  buscaTransacaoId.value = "";
});
