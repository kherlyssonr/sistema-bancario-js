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

   A partir daqui, construiremos o funcionamento do painel
   visual por etapas.
   ========================================================== */

const nomeClienteCabecalho = document.getElementById("nome-cliente-cabecalho");
nomeClienteCabecalho.textContent = cliente.nome;

const nomeClienteMenu = document.getElementById("nome-cliente-menu");
nomeClienteMenu.textContent = cliente.nome;

const nomeClientePerfil = document.getElementById("nome-cliente-perfil");
nomeClientePerfil.textContent = cliente.nome;

const tipoContaPerfil = document.getElementById("tipo-conta-perfil");
tipoContaPerfil.textContent = cliente.conta.tipo;

const contaAgencia = document.getElementById("conta-agencia");
const contaNumero = document.getElementById("conta-numero");
const contaTipo = document.getElementById("conta-tipo");

contaAgencia.textContent = cliente.conta.agencia;
contaNumero.textContent = cliente.conta.numero;
contaTipo.textContent = cliente.conta.tipo;

const saldoValor = document.getElementById("saldo-valor");
saldoValor.textContent = formatarMoeda(cliente.conta.saldo);

const botaoMostrarSaldo = document.getElementById("botao-mostrar-saldo");
let saldoVisivel = true;

botaoMostrarSaldo.addEventListener("click", function () {
  if (saldoVisivel) {
    saldoValor.textContent = "****";
  } else {
    saldoValor.textContent = formatarMoeda(cliente.conta.saldo);
  }
  saldoVisivel = !saldoVisivel;
});

const formDeposito = document.getElementById("form-deposito");
const valorDepositado = document.getElementById("valor-deposito");
const mensagemDeposito = document.getElementById("mensagem-deposito");

formDeposito.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const entradaDeposito = valorDepositado.value;
  const depositoFeito = Number(entradaDeposito);

  if (entradaDeposito.trim() === "") {
    mensagemDeposito.textContent = "Informe um valor para o depósito.";
    return;
  }
  if (!Number.isFinite(depositoFeito)) {
    mensagemDeposito.textContent = "Digite um valor válido.";
    return;
  }
  if (depositoFeito <= 0) {
    mensagemDeposito.textContent = "O depósito deve ser maior que zero.";
    return;
  }
  mensagemDeposito.textContent = "";
  console.log("Valor válido:", depositoFeito);
});

cliente.conta.saldo = depositar(cliente.conta.saldo, depositoFeito);
console.log(cliente.conta.saldo);
saldoValor.textContent = formatarMoeda(cliente.conta.saldo);
mensagemDeposito.textContent = "Depósito realizado com sucesso.";
valorDepositado.value = "";

cliente.conta.transacoes.push({
  id: proximoId,
  tipo: "deposito",
  valor: depositoFeito,
  momento: new Date(),
});
proximoId++;
console.log(cliente.conta.transacoes);

const quantidadeOperacacoes = document.getElementById("quantidade-operacoes");
quantidadeOperacacoes.textContent = cliente.conta.transacoes.length;

const totalDepositadoElemento = document.getElementById("total-depositado");

const depositos = cliente.conta.transacoes.filter(function (transacao) {
  return transacao.tipo === "deposito";
});

const totalDepositado = calcularTotalTransacoes(depositos);
totalDepositadoElemento.textContent = formatarMoeda(totalDepositado);
