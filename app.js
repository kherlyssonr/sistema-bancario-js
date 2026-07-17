let nomeCliente = prompt("Digite o nome do cliente:");
let idadeCliente = Number(prompt("Digite a idade do cliente:"));
let tipoConta = prompt("Digite o tipo da conta:");

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

// Subtrai o valor do saque do saldo
function sacar(saldoAtual, saqueFeito) {
  return saldoAtual - saqueFeito;
}

// Mantém o sistema em execução até o usuário escolher a opção "Sair"
while (opcao !== 6) {
  opcao = Number(
    prompt(`
Escolha uma opção:

1 - Consultar saldo
2 - Depositar
3 - Sacar
4 - Ver extrato
5 - Ver dados da conta
6 - Sair
`),
  );
  // Consultar saldo disponível
  if (opcao === 1) {
    alert(`Seu saldo disponível é:
R$ ${consultarSaldo().toFixed(2)}`);
  }
  // Realiza um depósito
  else if (opcao === 2) {
    let entrada = prompt("Qual o valor deseja depositar?");
    if (entrada === null) {
      alert("Operação de depósito cancelada!");
    } else if (entrada === "") {
      alert("Nenhum valor foi informado.");
    } else {
      let depositoFeito = Number(entrada);
      if (Number.isNaN(depositoFeito)) {
        alert("Valor inválido. Digite apenas números.");
      } else if (depositoFeito > 0) {
        cliente.conta.saldo = depositar(cliente.conta.saldo, depositoFeito);
        let momentoDaTransacao = new Date();
        cliente.conta.transacoes.push({
          id: proximoId,
          tipo: "deposito",
          valor: depositoFeito,
          momento: momentoDaTransacao,
        });
        proximoId++;
        alert(`Depósito realizado!
Novo saldo: R$ ${cliente.conta.saldo.toFixed(2)}`);
      } else {
        alert("Depósito inválido! Digite um valor maior que R$ 0,00.");
      }
    }
  }
  // Realiza um saque
  else if (opcao === 3) {
    let saida = prompt("Quanto você deseja sacar?");
    if (saida === null) {
      alert("Operação de saque cancelada!");
    } else if (saida === "") {
      alert("Nenhum valor foi informado.");
    } else {
      let saqueFeito = Number(saida);
      if (Number.isNaN(saqueFeito)) {
        alert("Valor inválido. Digite apenas números.");
      } else if (saqueFeito > 0 && saqueFeito <= cliente.conta.saldo) {
        cliente.conta.saldo = sacar(cliente.conta.saldo, saqueFeito);
        let momentoDaTransacao = new Date();
        cliente.conta.transacoes.push({
          id: proximoId,
          tipo: "saque",
          valor: saqueFeito,
          momento: momentoDaTransacao,
        });

        proximoId++;
        alert(`Saque realizado!
Novo saldo disponível: R$ ${cliente.conta.saldo.toFixed(2)}`);
      } else if (saqueFeito <= 0) {
        alert("Valor de saque inválido! Digite um valor maior que R$ 0,00.");
      } else {
        alert("Saldo insuficiente para realizar o saque.");
      }
    }
  }

  // Ver extrato
  else if (opcao === 4) {
    if (cliente.conta.transacoes.length > 0) {
      let extrato = "";

      for (let i = 0; i < cliente.conta.transacoes.length; i++) {
        let horarioFormatado = cliente.conta.transacoes[
          i
        ].momento.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        let dataFormatada =
          cliente.conta.transacoes[i].momento.toLocaleDateString("pt-BR");
        extrato =
          extrato +
          `${cliente.conta.transacoes[i].id} - ${cliente.conta.transacoes[i].tipo}: R$ ${cliente.conta.transacoes[i].valor.toFixed(2)} - ${dataFormatada} às ${horarioFormatado}\n`;
      }

      let totalDepositado = 0;

      for (let i = 0; i < cliente.conta.transacoes.length; i++) {
        if (cliente.conta.transacoes[i].tipo === "deposito") {
          totalDepositado = totalDepositado + cliente.conta.transacoes[i].valor;
        }
      }

      let totalSacado = 0;

      for (let i = 0; i < cliente.conta.transacoes.length; i++) {
        if (cliente.conta.transacoes[i].tipo === "saque") {
          totalSacado = totalSacado + cliente.conta.transacoes[i].valor;
        }
      }

      alert(`📄 EXTRATO BANCÁRIO

=============================

${extrato}
=============================

📊 RESUMO DA CONTA

Total depositado: R$ ${totalDepositado.toFixed(2)}
Total sacado: R$ ${totalSacado.toFixed(2)}
Quantidade de operações: ${cliente.conta.transacoes.length}
Saldo atual: R$ ${cliente.conta.saldo.toFixed(2)}

=============================`);
    } else {
      alert("Nenhuma operação foi realizada.");
    }
  } else if (opcao === 5) {
    alert(` 👤 DADOS DO CLIENTE
=============================

Nome: ${cliente.nome}
Idade: ${cliente.idade} anos

=============================
🏦 DADOS DA CONTA

Agência: ${cliente.conta.agencia}
Número: ${cliente.conta.numero}
Tipo: ${cliente.conta.tipo}

=============================`);
  }

  // Sair
  else if (opcao === 6) {
    alert("Obrigado por utilizar nosso banco!");
  }

  // Opção inválida
  else {
    alert(`❌ Opção inválida!

Escolha uma opção entre 1 e 6.`);
  }
}
