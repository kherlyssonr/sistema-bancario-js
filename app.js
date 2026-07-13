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
while (opcao !== 4) {
  opcao = Number(
    prompt(`
Escolha uma opção:

1 - Consultar saldo
2 - Depositar
3 - Sacar
4 - Sair`),
  );

  if (opcao == 1) {
    alert(`Seu saldo disponível é:
R$ ${consultarSaldo().toFixed(2)}`);
  } else if (opcao == 2) {
    let depositoFeito = Number(prompt("Qual o valor deseja depositar?"));

    if (depositoFeito > 0) {
      saldo = depositar(saldo, depositoFeito);
      alert(`Depósito realizado!
Novo saldo: R$ ${saldo.toFixed(2)} `);
      historico.push(depositoFeito);
    } else {
      alert("Depósito inválido! Digite um valor maior que R$ 0,00.");
    }
  } else if (opcao == 3) {
    let saqueFeito = Number(prompt("Quanto você deseja sacar?"));

    if (saqueFeito <= saldo && saqueFeito > 0) {
      saldo = sacar(saldo, saqueFeito);
      alert(`Saque realizado!
Novo saldo disponível: R$ ${saldo.toFixed(2)}`);
    } else if (saqueFeito <= 0) {
      alert("Valor de saque inválido.");
    } else {
      alert("Saldo insuficiente");
    }
  } else if (opcao == 4) {
    alert("Obrigado por utilizar nosso banco!");
  } else {
    alert(`❌ Opção inválida!

Escolha uma opção entre 1 e 4.`);
  }
}
