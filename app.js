let saldo = 1000;

let opcao = 0;

function consultarSaldo() {
  return saldo;
}

function depositar(saldo, depositoFeito) {
  return saldo + depositoFeito;
}

function sacar(saldo, saqueFeito) {
  return saldo - saqueFeito;
}

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
    alert(`Seu saldo disponivel é de R$${consultarSaldo()}`);
  } else if (opcao == 2) {
    let depositoFeito = Number(prompt("Qual o valor deseja depositar?"));
    saldo = depositar(saldo, depositoFeito);
    alert(`Depósito realizado!
Novo saldo: R$ ${saldo} `);
  } else if (opcao == 3) {
    let saqueFeito = Number(prompt("Quanto você deseja sacar?"));

    if (saqueFeito <= saldo) {
      saldo = sacar(saldo, saqueFeito);

      alert(`Saque realizado!
Novo saldo disponível: R$ ${saldo}`);
    } else {
      alert("Saldo insuficiente para realizar o saque.");
    }
  } else if (opcao == 4) {
    alert("Obrigado por utilizar nosso banco!");
  }
}
