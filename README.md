# 🏦 Sistema Bancário em JavaScript

Sistema bancário desenvolvido para praticar lógica de programação e fundamentos de JavaScript.

O projeto começou com operações bancárias simples e vem sendo atualizado conforme avanço nos estudos. Atualmente, o sistema permite consultar o saldo, realizar depósitos e saques, visualizar o histórico das transações e acompanhar um resumo completo da conta.

As operações são realizadas pelo navegador utilizando `prompt` e `alert`.

---

## 📌 Status do projeto

🚧 Projeto em desenvolvimento

**Versão atual: `v2.1.0`**

O projeto continuará recebendo novas funcionalidades conforme novos conteúdos de JavaScript forem estudados.

---

## 🎯 Objetivo do projeto

O principal objetivo deste projeto é aplicar os conteúdos estudados em JavaScript dentro de uma aplicação que possa evoluir ao longo do tempo.

Durante o desenvolvimento, também são praticados:

- Organização de código;
- Validação de dados;
- Git e GitHub;
- Criação de branches;
- Commits organizados;
- Pull Requests;
- Tags;
- Releases;
- Versionamento semântico.

---

## ✨ Funcionalidades

### Operações bancárias

- Consultar o saldo disponível;
- Realizar depósitos;
- Realizar saques;
- Verificar se existe saldo suficiente;
- Encerrar o sistema pelo menu.

### Validações

- Impedir depósitos menores ou iguais a zero;
- Impedir saques menores ou iguais a zero;
- Impedir saques maiores que o saldo;
- Impedir o uso de letras no lugar de valores;
- Identificar campos vazios;
- Identificar quando uma operação é cancelada;
- Tratar opções inválidas no menu;
- Impedir que operações inválidas sejam registradas no histórico.

### Histórico e extrato

- Registrar depósitos realizados;
- Registrar saques realizados;
- Exibir todas as transações;
- Numerar as operações;
- Informar quando o histórico estiver vazio;
- Exibir a quantidade total de operações;
- Calcular o total depositado;
- Calcular o total sacado;
- Exibir o saldo atual;
- Mostrar um resumo completo da conta.

---

## 🆕 Novidades da v2.1.0

A versão `v2.1.0` trouxe melhorias para o extrato bancário e adicionou um resumo da conta.

### Funcionalidades adicionadas

- Numeração das transações;
- Exibição do saldo atual no extrato;
- Contagem da quantidade de operações;
- Cálculo do total depositado;
- Cálculo do total sacado;
- Criação da seção “Resumo da conta”;
- Melhorias na apresentação do extrato.

## 🧠 Conceitos praticados

Durante o desenvolvimento do projeto, foram utilizados os seguintes conceitos:

- Declaração de variáveis com `let`;
- Tipos de dados;
- Conversão de valores com `Number()`;
- Validação com `Number.isNaN()`;
- Condicionais com `if`, `else if` e `else`;
- Operadores de comparação;
- Operadores lógicos;
- Laço de repetição `while`;
- Laço de repetição `for`;
- Funções;
- Parâmetros;
- Retorno com `return`;
- Escopo de variáveis;
- Arrays;
- Método `push()`;
- Propriedade `length`;
- Acesso a elementos pelo índice;
- Variáveis acumuladoras;
- Template strings;
- Formatação numérica com `toFixed()`;
- Manipulação de strings;
- Quebra de linha com `\n`.

---

## ▶️ Como executar o projeto

### 1. Clone o repositório

```bash
git clone LINK-DO-SEU-REPOSITORIO
```

### 2. Acesse a pasta

```bash
cd NOME-DA-PASTA
```

### 3. Abra o projeto

Abra o arquivo `index.html` no navegador.

Também é possível utilizar a extensão **Live Server** no Visual Studio Code.

### 4. Utilize o menu

As opções serão exibidas por meio de caixas de diálogo no navegador.

---

## 🧪 Testes realizados

Antes do lançamento da versão, foram testados os seguintes cenários:

- Depósito válido;
- Depósito com valor zero;
- Depósito negativo;
- Depósito com letras;
- Depósito com campo vazio;
- Cancelamento de depósito;
- Saque válido;
- Saque com valor zero;
- Saque negativo;
- Saque com letras;
- Saque maior que o saldo;
- Saque com campo vazio;
- Cancelamento de saque;
- Consulta de saldo;
- Extrato sem operações;
- Extrato com apenas depósitos;
- Extrato com apenas saques;
- Extrato com depósitos e saques;
- Numeração das transações;
- Cálculo do total depositado;
- Cálculo do total sacado;
- Contagem da quantidade de operações;
- Verificação do saldo final;
- Opções inválidas no menu.

---

## 📋 Histórico de versões

### v2.1.0 — Resumo da conta

- Numeração das transações;
- Exibição do saldo atual no extrato;
- Quantidade total de operações;
- Cálculo do total depositado;
- Cálculo do total sacado;
- Criação do resumo da conta;
- Melhorias na apresentação do extrato.

### v2.0.1 — Correções e melhorias

- Tratamento de operações canceladas;
- Tratamento de campos vazios;
- Validação de valores não numéricos;
- Melhor diferenciação entre valor inválido e saldo insuficiente;
- Melhorias nas mensagens;
- Ajustes de organização e formatação.

### v2.0.0 — Histórico e extrato

- Criação do histórico de transações;
- Registro de depósitos;
- Registro de saques;
- Implementação da opção “Ver extrato”;
- Utilização de Arrays;
- Tratamento de histórico vazio.

### v1.1.0 — Validações

- Bloqueio de depósitos inválidos;
- Bloqueio de saques inválidos;
- Verificação de saldo insuficiente;
- Tratamento de opções inválidas;
- Formatação dos valores com duas casas decimais.

### v1.0.0 — Primeira versão

- Consulta de saldo;
- Depósito;
- Saque;
- Menu interativo;
- Laço de repetição `while`;
- Separação das operações em funções.

---

## 🛠️ Tecnologias utilizadas

- HTML;
- JavaScript;
- Git;
- GitHub;
- Visual Studio Code.

---

## 🌿 Fluxo de desenvolvimento

O projeto utiliza um fluxo organizado com Git e GitHub:

1. Criação de uma branch para a nova versão;
2. Desenvolvimento das funcionalidades;
3. Commits separados por alteração;
4. Envio da branch para o GitHub;
5. Abertura de Pull Request;
6. Merge na branch `main`;
7. Criação da tag da versão;
8. Publicação da Release;
9. Exclusão da branch concluída.

---

## 📖 Natureza do projeto

Este é um projeto educacional criado para acompanhar minha evolução nos estudos de programação.

O sistema não possui conexão com bancos reais, não utiliza dados financeiros verdadeiros e não deve ser utilizado para operações bancárias reais.

---

## 👨‍💻 Autor

Desenvolvido por **Kherlysson Ryann** durante os estudos de lógica de programação e JavaScript.
