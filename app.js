let saldo = 1000;
let opcao = 0;
let historico = [];

// Exibe o saldo atual da conta
function consultarSaldo() {
  return saldo;
}

// Soma o valor do depósito ao saldo atual
function depositar(saldo, depositoFeito) {
  return saldo + depositoFeito;
}

// Subtrai o valor do saque do saldo
function sacar(saldo, saqueFeito) {
  return saldo - saqueFeito;
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
  // Ver saldo disponivel
  if (opcao === 1) {
    alert(`Seu saldo disponível é:
R$ ${consultarSaldo().toFixed(2)}`);
  }
  // Depositar
  else if (opcao === 2) {
    let depositoFeito = Number(prompt("Qual o valor deseja depositar?"));
    if (Number.isNaN(depositoFeito)) {
      alert("Valor inválido. Digite apenas números.");
    } else if (depositoFeito > 0) {
      saldo = depositar(saldo, depositoFeito);
      alert(`Depósito realizado!
Novo saldo: R$ ${saldo.toFixed(2)}`);
      historico.push(`Depósito: R$ ${depositoFeito.toFixed(2)}`);
    } else {
      alert("Depósito inválido! Digite um valor maior que R$ 0,00.");
    }
  }
  // Sacar
  else if (opcao === 3) {
    let saqueFeito = Number(prompt("Quanto você deseja sacar?"));
    if (Number.isNaN(saqueFeito)) {
      alert("Valor inválido. Digite apenas números.");
    } else if (saqueFeito <= saldo && saqueFeito > 0) {
      saldo = sacar(saldo, saqueFeito);
      alert(`Saque realizado!
Novo saldo disponível: R$ ${saldo.toFixed(2)}`);
      historico.push(`Saque: R$ ${saqueFeito.toFixed(2)}`);
    } else if (saqueFeito <= 0) {
      alert("Valor de saque inválido! Digite um valor maior que R$ 0,00.");
    } else {
      alert("Saldo insuficiente.");
    }
  }
  // Ver extrato
  else if (opcao === 4) {
    if (historico.length > 0) {
      let extrato = "";
      for (let i = 0; i < historico.length; i++) {
        extrato = extrato + historico[i] + "\n";
      }
      alert(`📄 EXTRATO BANCÁRIO

=============================

${extrato}
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
