let saldo = 1000;
let opcao = 0;

function consultarSaldo() {
  return saldo;
}

function depositar() {}

function sacar() {}

while (opcao !== 4) {
  opcao = Number(
    prompt(`
Escolha uma opção:

1 - Consultar saldo
2 - Depositar
3 - Sacar
4 - Sair
`),
  );

  if (opcao == 1) {
    alert(`Seu saldo disponivel é de R$${consultarSaldo()}`);
  } else {
    console.log("testeee");
  }
}
