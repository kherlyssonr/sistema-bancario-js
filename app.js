let saldo = 200;

let cliente = {
  nome: "Ryann",
  idade: 23,
  conta: {
    agencia: "0001",
    numero: "12345-6",
    tipo: "Conta corrente",
    saldo: 100,
  },
};

let opcao = 0;
let historico = [];
let historicoDepositos = [];
let historicoSaques = [];

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
while (opcao !== 5) {
  opcao = Number(
    prompt(`
Escolha uma opção:

1 - Consultar saldo
2 - Depositar
3 - Sacar
4 - Ver extrato
5 - Sair
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
        historicoDepositos.push(depositoFeito);
        alert(`Depósito realizado!
Novo saldo: R$ ${cliente.conta.saldo.toFixed(2)}`);
        historico.push(`Depósito: R$ ${depositoFeito.toFixed(2)}`);
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
        historicoSaques.push(saqueFeito);
        alert(`Saque realizado!
Novo saldo disponível: R$ ${cliente.conta.saldo.toFixed(2)}`);
        historico.push(`Saque: R$ ${saqueFeito.toFixed(2)}`);
      } else if (saqueFeito <= 0) {
        alert("Valor de saque inválido! Digite um valor maior que R$ 0,00.");
      } else {
        alert("Saldo insuficiente para realizar o saque.");
      }
    }
  }

  // Ver extrato
  else if (opcao === 4) {
    if (historico.length > 0) {
      let extrato = "";
      for (let i = 0; i < historico.length; i++) {
        extrato = extrato + `${i + 1} - ${historico[i]}\n`;
      }
      let totalDepositado = 0;
      for (let i = 0; i < historicoDepositos.length; i++) {
        totalDepositado = totalDepositado + historicoDepositos[i];
      }

      let totalSacado = 0;
      for (let i = 0; i < historicoSaques.length; i++) {
        totalSacado = totalSacado + historicoSaques[i];
      }
      alert(`📄 EXTRATO BANCÁRIO

=============================

${extrato}
=============================

📊 RESUMO DA CONTA

Total depositado: R$ ${totalDepositado.toFixed(2)}
Total sacado: R$ ${totalSacado.toFixed(2)}
Quantidade de operações: ${historico.length}
Saldo atual: R$ ${saldo.toFixed(2)}

=============================`);
    } else {
      alert("Nenhuma operação foi realizada.");
    }
  } else if (opcao === 5) {
    alert("Obrigado por utilizar nosso banco!");
  } else {
    alert(`❌ Opção inválida!

Escolha uma opção entre 1 e 5.`);
  }
}
