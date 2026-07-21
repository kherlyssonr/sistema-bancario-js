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

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

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
  let cliente = {
    nome: nomeCliente,
    idade: idadeCliente,
    conta: {
      agencia: "0001",
      numero: "12345-6",
      tipo: tipoConta,
      saldo: 100,
      transacoes: [],
    },
  };

  let proximoId = 1;
  let opcao = 0;

  // Exibe o saldo atual da conta
  function consultarSaldo() {
    return cliente.conta.saldo;
  }

  // Soma o valor do depósito ao saldo atual
  function depositar(saldoAtual, depositoFeito) {
    return saldoAtual + depositoFeito;
  }

  // Subtrai o valor do saque do saldo atual
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

  // Monta uma lista de transações para exibição
  function montarListaTransacoes(listaTransacoes) {
    let listaFormatada = "";

    for (let i = 0; i < listaTransacoes.length; i++) {
      listaFormatada =
        listaFormatada + formatarTransacao(listaTransacoes[i]) + "\n";
    }

    return listaFormatada;
  }

  // Soma os valores das transações usando reduce()
  function calcularTotalTransacoes(listaTransacoes) {
    return listaTransacoes.reduce(function (total, transacao) {
      return total + transacao.valor;
    }, 0);
  }

  // Mantém o sistema em execução até o usuário sair
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

    // Consultar saldo disponível
    if (opcao === 1) {
      alert(`Seu saldo disponível é:
${formatarMoeda(consultarSaldo())}`);
    }

    // Realiza um depósito
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
          alert("Depósito inválido. Digite um valor maior que zero.");
        } else {
          cliente.conta.saldo = depositar(cliente.conta.saldo, depositoFeito);

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

    // Realiza um saque
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
          alert("Saque inválido. Digite um valor maior que zero.");
        } else if (saqueFeito > cliente.conta.saldo) {
          alert("Saldo insuficiente para realizar o saque.");
        } else {
          cliente.conta.saldo = sacar(cliente.conta.saldo, saqueFeito);

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
        let depositos = cliente.conta.transacoes.filter(function (transacao) {
          return transacao.tipo === "deposito";
        });

        let saques = cliente.conta.transacoes.filter(function (transacao) {
          return transacao.tipo === "saque";
        });

        let totalDepositado = calcularTotalTransacoes(depositos);

        let totalSacado = calcularTotalTransacoes(saques);

        let extrato = montarListaTransacoes(cliente.conta.transacoes);

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

    // Filtrar transações usando filter()
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
          } else if (opcaoFiltro === "1" || opcaoFiltro === "2") {
            let tipoEscolhido = opcaoFiltro === "1" ? "deposito" : "saque";

            let transacoesFiltradas = cliente.conta.transacoes.filter(
              function (transacao) {
                return transacao.tipo === tipoEscolhido;
              },
            );

            if (transacoesFiltradas.length === 0) {
              let nomeOperacao =
                tipoEscolhido === "deposito" ? "depósito" : "saque";

              alert(`Nenhuma operação de ${nomeOperacao} foi realizada.`);
            } else {
              let titulo =
                tipoEscolhido === "deposito" ? "📥 DEPÓSITOS" : "📤 SAQUES";

              alert(`${titulo}

=============================

${montarListaTransacoes(transacoesFiltradas)}=============================`);
            }
          } else {
            alert("Filtro inválido. Escolha a opção 1 ou 2.");
          }
        }
      }
    }

    // Buscar uma transação pelo ID usando find()
    else if (opcao === 6) {
      if (cliente.conta.transacoes.length === 0) {
        alert("Nenhuma operação foi realizada.");
      } else {
        let entradaId = prompt("Digite o ID da transação:");

        if (entradaId === null) {
          alert("Busca cancelada.");
        } else if (entradaId.trim() === "") {
          alert("Nenhum ID foi informado.");
        } else {
          let idProcurado = Number(entradaId);

          if (!Number.isFinite(idProcurado)) {
            alert("ID inválido. Digite apenas números.");
          } else if (!Number.isInteger(idProcurado)) {
            alert("ID inválido. Digite um número inteiro.");
          } else if (idProcurado <= 0) {
            alert("ID inválido. Digite um número maior que zero.");
          } else {
            let transacaoEncontrada = cliente.conta.transacoes.find(
              function (transacao) {
                return transacao.id === idProcurado;
              },
            );

            if (transacaoEncontrada === undefined) {
              alert("Nenhuma transação foi encontrada com esse ID.");
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
}
