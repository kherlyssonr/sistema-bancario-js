/*
  K2 Banco Digital — versão 4.1.0

  O cadastro e o menu antigos foram desativados porque utilizam:
  - prompt()
  - alert()
  - while

  O código permanece comentado para consulta durante os estudos.
*/

/* ==========================================================
   CADASTRO ANTIGO — DESATIVADO
   ==========================================================

function cadastrarNome() {
  while (true) {
    let entradaNome = prompt("Digite o nome do cliente:");

    if (entradaNome === null) {
      return null;
    }

    let nome = entradaNome.trim();

    if (nome === "") {
      alert("Nome inválido. Digite o nome do cliente.");
    } else if (/\d/.test(nome)) {
      alert("Nome inválido. Não utilize números.");
    } else {
      return nome;
    }
  }
}

function cadastrarIdade() {
  while (true) {
    let entradaIdade = prompt("Digite a idade do cliente:");

    if (entradaIdade === null) {
      return null;
    }

    if (entradaIdade.trim() === "") {
      alert("Idade inválida. Digite a idade do cliente.");
    } else {
      let idade = Number(entradaIdade);

      if (!Number.isFinite(idade)) {
        alert("Idade inválida. Digite apenas números.");
      } else if (!Number.isInteger(idade)) {
        alert("Idade inválida. Digite um número inteiro.");
      } else if (idade <= 0) {
        alert("Idade inválida. Digite um valor maior que zero.");
      } else {
        return idade;
      }
    }
  }
}

function cadastrarTipoConta() {
  while (true) {
    let entradaTipo = prompt(`Escolha o tipo da conta:

1 - Conta corrente
2 - Conta poupança`);

    if (entradaTipo === null) {
      return null;
    }

    entradaTipo = entradaTipo.trim();

    if (entradaTipo === "1") {
      return "Conta corrente";
    } else if (entradaTipo === "2") {
      return "Conta poupança";
    } else {
      alert("Tipo de conta inválido. Escolha a opção 1 ou 2.");
    }
  }
}

*/

/* ==========================================================
   FUNÇÕES QUE CONTINUAM ATIVAS
   ========================================================== */

// Formata valores no padrão monetário brasileiro
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/* ==========================================================
   CHAMADAS DO CADASTRO ANTIGO — DESATIVADAS
   ==========================================================

let nomeCliente = cadastrarNome();
let idadeCliente = null;
let tipoConta = null;

if (nomeCliente !== null) {
  idadeCliente = cadastrarIdade();
}

if (nomeCliente !== null && idadeCliente !== null) {
  tipoConta = cadastrarTipoConta();
}

if (nomeCliente === null || idadeCliente === null || tipoConta === null) {
  alert("Cadastro cancelado. O sistema não foi iniciado.");
} else {

*/

/*
  Dados temporários.

  Futuramente, esses dados poderão vir do cadastro,
  backend ou banco de dados.
*/
let cliente = {
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

// Retorna o saldo atual da conta
function consultarSaldo() {
  return cliente.conta.saldo;
}

// Soma o depósito ao saldo atual
function depositar(saldoAtual, depositoFeito) {
  return saldoAtual + depositoFeito;
}

// Subtrai o saque do saldo atual
function sacar(saldoAtual, saqueFeito) {
  return saldoAtual - saqueFeito;
}

// Formata uma transação para exibição
function formatarTransacao(transacao) {
  let horarioFormatado = transacao.momento.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  let dataFormatada = transacao.momento.toLocaleDateString("pt-BR");

  let tipoFormatado = transacao.tipo === "deposito" ? "Depósito" : "Saque";

  return `${transacao.id} - ${tipoFormatado}: ${formatarMoeda(
    transacao.valor,
  )} - ${dataFormatada} às ${horarioFormatado}`;
}

// Monta uma lista de transações
function montarListaTransacoes(listaTransacoes) {
  let listaFormatada = "";

  for (let i = 0; i < listaTransacoes.length; i++) {
    listaFormatada =
      listaFormatada + formatarTransacao(listaTransacoes[i]) + "\n";
  }

  return listaFormatada;
}

// Soma os valores das transações com reduce()
function calcularTotalTransacoes(listaTransacoes) {
  return listaTransacoes.reduce(function (total, transacao) {
    return total + transacao.valor;
  }, 0);
}

function renderizarTransacoes(lista) {
  // Limpa as linhas atuais da tabela
  listaTransacoes.innerHTML = "";

  // Verifica se o Array está vazio
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

/* ==========================================================
   MENU ANTIGO — DESATIVADO DURANTE A MIGRAÇÃO PARA O DOM
   ==========================================================

let opcao = 0;

while (opcao !== 8) {
  let entradaMenu = prompt(`
Escolha uma opção:

1 - Consultar saldo
2 - Depositar
3 - Sacar
4 - Ver extrato completo
5 - Filtrar transações
6 - Buscar transação por ID
7 - Ver dados da conta
8 - Sair
`);

  // Trata o cancelamento do menu principal
  if (entradaMenu === null) {
    alert("Operação cancelada. O sistema foi encerrado.");
    break;
  }

  // Trata o campo vazio no menu
  if (entradaMenu.trim() === "") {
    alert("Nenhuma opção foi informada.");
    continue;
  }

  opcao = Number(entradaMenu);

  // Consultar saldo
  if (opcao === 1) {
    alert(`Seu saldo disponível é:
${formatarMoeda(consultarSaldo())}`);
  }

  // Realizar depósito
  else if (opcao === 2) {
    let entrada = prompt("Qual valor você deseja depositar?");

    if (entrada === null) {
      alert("Operação de depósito cancelada.");
    } else if (entrada.trim() === "") {
      alert("Nenhum valor foi informado.");
    } else {
      let depositoFeito = Number(entrada);

      if (!Number.isFinite(depositoFeito)) {
        alert("Valor inválido. Digite apenas números.");
      } else if (depositoFeito <= 0) {
        alert(
          "Depósito inválido. Digite um valor maior que zero.",
        );
      } else {
        cliente.conta.saldo = depositar(
          cliente.conta.saldo,
          depositoFeito,
        );

        cliente.conta.transacoes.push({
          id: proximoId,
          tipo: "deposito",
          valor: depositoFeito,
          momento: new Date(),
        });

        proximoId++;

        alert(`Depósito realizado com sucesso!
Novo saldo: ${formatarMoeda(cliente.conta.saldo)}`);
      }
    }
  }

  // Realizar saque
  else if (opcao === 3) {
    let saida = prompt("Quanto você deseja sacar?");

    if (saida === null) {
      alert("Operação de saque cancelada.");
    } else if (saida.trim() === "") {
      alert("Nenhum valor foi informado.");
    } else {
      let saqueFeito = Number(saida);

      if (!Number.isFinite(saqueFeito)) {
        alert("Valor inválido. Digite apenas números.");
      } else if (saqueFeito <= 0) {
        alert(
          "Saque inválido. Digite um valor maior que zero.",
        );
      } else if (saqueFeito > cliente.conta.saldo) {
        alert("Saldo insuficiente para realizar o saque.");
      } else {
        cliente.conta.saldo = sacar(
          cliente.conta.saldo,
          saqueFeito,
        );

        cliente.conta.transacoes.push({
          id: proximoId,
          tipo: "saque",
          valor: saqueFeito,
          momento: new Date(),
        });

        proximoId++;

        alert(`Saque realizado com sucesso!
Novo saldo: ${formatarMoeda(cliente.conta.saldo)}`);
      }
    }
  }

  // Ver extrato completo
  else if (opcao === 4) {
    if (cliente.conta.transacoes.length > 0) {
      let depositos = cliente.conta.transacoes.filter(
        function (transacao) {
          return transacao.tipo === "deposito";
        },
      );

      let saques = cliente.conta.transacoes.filter(
        function (transacao) {
          return transacao.tipo === "saque";
        },
      );

      let totalDepositado =
        calcularTotalTransacoes(depositos);

      let totalSacado =
        calcularTotalTransacoes(saques);

      let extrato = montarListaTransacoes(
        cliente.conta.transacoes,
      );

      alert(`📄 EXTRATO BANCÁRIO

=============================

${extrato}=============================

📊 RESUMO DA CONTA

Total depositado: ${formatarMoeda(totalDepositado)}
Total sacado: ${formatarMoeda(totalSacado)}
Quantidade de depósitos: ${depositos.length}
Quantidade de saques: ${saques.length}
Quantidade de operações: ${cliente.conta.transacoes.length}
Saldo atual: ${formatarMoeda(cliente.conta.saldo)}

=============================`);
    } else {
      alert("Nenhuma operação foi realizada.");
    }
  }

  // Filtrar transações
  else if (opcao === 5) {
    if (cliente.conta.transacoes.length === 0) {
      alert("Nenhuma operação foi realizada.");
    } else {
      let opcaoFiltro = prompt(`
Escolha um filtro:

1 - Mostrar depósitos
2 - Mostrar saques
`);

      if (opcaoFiltro === null) {
        alert("Filtro cancelado.");
      } else {
        opcaoFiltro = opcaoFiltro.trim();

        if (opcaoFiltro === "") {
          alert("Nenhum filtro foi informado.");
        } else if (
          opcaoFiltro === "1" ||
          opcaoFiltro === "2"
        ) {
          let tipoEscolhido =
            opcaoFiltro === "1" ? "deposito" : "saque";

          let transacoesFiltradas =
            cliente.conta.transacoes.filter(
              function (transacao) {
                return transacao.tipo === tipoEscolhido;
              },
            );

          if (transacoesFiltradas.length === 0) {
            let nomeOperacao =
              tipoEscolhido === "deposito"
                ? "depósito"
                : "saque";

            alert(
              `Nenhuma operação de ${nomeOperacao} foi realizada.`,
            );
          } else {
            let titulo =
              tipoEscolhido === "deposito"
                ? "📥 DEPÓSITOS"
                : "📤 SAQUES";

            alert(`${titulo}

=============================

${montarListaTransacoes(
  transacoesFiltradas,
)}=============================`);
          }
        } else {
          alert(
            "Filtro inválido. Escolha a opção 1 ou 2.",
          );
        }
      }
    }
  }

  // Buscar transação pelo ID
  else if (opcao === 6) {
    if (cliente.conta.transacoes.length === 0) {
      alert("Nenhuma operação foi realizada.");
    } else {
      let entradaId = prompt(
        "Digite o ID da transação:",
      );

      if (entradaId === null) {
        alert("Busca cancelada.");
      } else if (entradaId.trim() === "") {
        alert("Nenhum ID foi informado.");
      } else {
        let idProcurado = Number(entradaId);

        if (!Number.isFinite(idProcurado)) {
          alert(
            "ID inválido. Digite apenas números.",
          );
        } else if (!Number.isInteger(idProcurado)) {
          alert(
            "ID inválido. Digite um número inteiro.",
          );
        } else if (idProcurado <= 0) {
          alert(
            "ID inválido. Digite um número maior que zero.",
          );
        } else {
          let transacaoEncontrada =
            cliente.conta.transacoes.find(
              function (transacao) {
                return transacao.id === idProcurado;
              },
            );

          if (transacaoEncontrada === undefined) {
            alert(
              "Nenhuma transação foi encontrada com esse ID.",
            );
          } else {
            alert(`🔎 TRANSAÇÃO ENCONTRADA

=============================

${formatarTransacao(transacaoEncontrada)}

=============================`);
          }
        }
      }
    }
  }

  // Ver dados do cliente e da conta
  else if (opcao === 7) {
    alert(`👤 DADOS DO CLIENTE
=============================

Nome: ${cliente.nome}
Idade: ${cliente.idade} anos

=============================
🏦 DADOS DA CONTA

Agência: ${cliente.conta.agencia}
Número: ${cliente.conta.numero}
Tipo: ${cliente.conta.tipo}
Saldo: ${formatarMoeda(cliente.conta.saldo)}

=============================`);
  }

  // Sair
  else if (opcao === 8) {
    alert("Obrigado por utilizar nosso banco!");
  }

  // Opção inválida
  else {
    alert(`❌ Opção inválida!

Escolha uma opção entre 1 e 8.`);
  }
}

*/

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

  /* Atualizar todo o extrato */

  renderizarTransacoes(cliente.conta.transacoes);

  /* Mostrar mensagem de sucesso */

  mensagemDeposito.textContent = "Depósito realizado com sucesso.";

  /* Limpar o campo */

  valorDepositado.value = "";
});

/* Elementos do saque */

const formSaque = document.getElementById("form-saque");
const valorSaque = document.getElementById("valor-saque");
const mensagemSaque = document.getElementById("mensagem-saque");
const totalSacadoElemento = document.getElementById("total-sacado");

/* Realizar saque */

formSaque.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaSaque = valorSaque.value;
  const saqueFeito = Number(entradaSaque);

  /* Validar campo vazio */

  if (entradaSaque.trim() === "") {
    mensagemSaque.textContent = "Informe um valor para o saque.";

    return;
  }

  /* Validar valor não numérico */

  if (!Number.isFinite(saqueFeito)) {
    mensagemSaque.textContent = "Digite um valor válido.";

    return;
  }

  /* Bloquear zero e valores negativos */

  if (saqueFeito <= 0) {
    mensagemSaque.textContent = "O saque deve ser maior que zero.";

    return;
  }

  /* Verificar saldo suficiente */

  if (saqueFeito > cliente.conta.saldo) {
    mensagemSaque.textContent = "Saldo insuficiente para realizar o saque.";

    return;
  }

  /* Atualizar o saldo do objeto */

  cliente.conta.saldo = sacar(cliente.conta.saldo, saqueFeito);

  /* Criar a transação */

  const novaTransacao = {
    id: proximoId,
    tipo: "saque",
    valor: saqueFeito,
    momento: new Date(),
  };

  /* Registrar a transação no Array */

  cliente.conta.transacoes.push(novaTransacao);

  /* Preparar o próximo ID */

  proximoId++;

  /* Atualizar o saldo no painel */

  if (saldoVisivel) {
    saldoValor.textContent = formatarMoeda(cliente.conta.saldo);
  } else {
    saldoValor.textContent = "••••••";
  }

  /* Atualizar a quantidade de operações */

  quantidadeOperacoes.textContent = cliente.conta.transacoes.length;

  /* Filtrar somente os saques */

  const saques = cliente.conta.transacoes.filter(function (transacao) {
    return transacao.tipo === "saque";
  });

  /* Calcular o total sacado */

  const totalSacado = calcularTotalTransacoes(saques);

  /* Atualizar o total sacado no painel */

  totalSacadoElemento.textContent = formatarMoeda(totalSacado);

  /* Atualizar todo o extrato */

  renderizarTransacoes(cliente.conta.transacoes);

  /* Mostrar mensagem de sucesso */

  mensagemSaque.textContent = "Saque realizado com sucesso.";

  /* Limpar o campo */

  valorSaque.value = "";
});

/* Filtro do extrato */

const filtroTransacoes = document.getElementById("filtro-transacoes");

filtroTransacoes.addEventListener("change", function () {
  const filtroSelecionado = filtroTransacoes.value;

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

/* Elementos da busca por ID */

const formBuscaTransacao = document.getElementById("form-busca-transacao");

const buscaTransacaoId = document.getElementById("busca-transacao-id");

const mensagemExtrato = document.getElementById("mensagem-extrato");

/* Buscar transação pelo ID */

formBuscaTransacao.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaId = buscaTransacaoId.value;
  const idProcurado = Number(entradaId);

  /* Validar campo vazio */

  if (entradaId.trim() === "") {
    mensagemExtrato.textContent = "Informe o ID da transação.";

    return;
  }

  /* Validar valor não numérico */

  if (!Number.isFinite(idProcurado)) {
    mensagemExtrato.textContent = "Digite um ID válido.";

    return;
  }

  /* Validar número inteiro */

  if (!Number.isInteger(idProcurado)) {
    mensagemExtrato.textContent = "O ID deve ser um número inteiro.";

    return;
  }

  /* Bloquear zero e números negativos */

  if (idProcurado <= 0) {
    mensagemExtrato.textContent = "O ID deve ser maior que zero.";

    return;
  }

  /* Procurar a transação pelo ID */

  const transacaoEncontrada = cliente.conta.transacoes.find(
    function (transacao) {
      return transacao.id === idProcurado;
    },
  );

  /* Verificar se a transação existe */

  if (transacaoEncontrada === undefined) {
    mensagemExtrato.textContent = "Nenhuma transação encontrada com esse ID.";

    renderizarTransacoes([]);

    return;
  }

  /* Mostrar somente a transação encontrada */

  renderizarTransacoes([transacaoEncontrada]);

  mensagemExtrato.textContent = "Transação encontrada com sucesso.";

  buscaTransacaoId.value = "";
});
