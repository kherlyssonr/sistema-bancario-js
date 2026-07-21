# 🏦 Sistema Bancário em JavaScript

Projeto educacional desenvolvido para praticar lógica de programação e fundamentos de JavaScript por meio da evolução contínua de um sistema bancário.

O sistema funciona no navegador utilizando `prompt()` e `alert()`. Atualmente, permite cadastrar um cliente, consultar o saldo, realizar depósitos e saques, visualizar o extrato, filtrar transações, buscar uma operação pelo ID e consultar os dados da conta.

---

## 📌 Status do projeto

🚧 Projeto em desenvolvimento

**Versão atual: `v3.1.1`**

A versão `v3.1.1` é uma atualização de correção que melhora as validações, as mensagens e a formatação dos valores exibidos pelo sistema.

---

## 🎯 Objetivo

O objetivo deste projeto é aplicar os conteúdos estudados em uma aplicação que evolui por versões.

Além de JavaScript, o projeto também é utilizado para praticar:

- Git e GitHub;
- criação e exclusão de branches;
- commits organizados;
- Pull Requests;
- tags e releases;
- versionamento semântico.

---

## ✨ Funcionalidades

### Cadastro do cliente

- Cadastro do nome;
- Cadastro da idade;
- Escolha do tipo da conta;
- Validação de nome vazio;
- Bloqueio de números no nome;
- Validação de idade vazia;
- Validação de idade não numérica;
- Bloqueio de idade decimal;
- Bloqueio de idade menor ou igual a zero;
- Validação do tipo da conta;
- Tratamento do cancelamento durante o cadastro.

### Dados da conta

- Dados do cliente organizados em um objeto;
- Conta armazenada como objeto interno;
- Exibição do nome e da idade;
- Exibição da agência;
- Exibição do número da conta;
- Exibição do tipo da conta;
- Exibição do saldo atual.

### Operações bancárias

- Consulta de saldo;
- Realização de depósitos;
- Realização de saques;
- Verificação de saldo insuficiente;
- Bloqueio de depósitos e saques menores ou iguais a zero;
- Tratamento de campos vazios;
- Tratamento de operações canceladas;
- Validação de valores não numéricos;
- Encerramento do sistema pelo menu.

### Histórico e extrato

- Registro de depósitos e saques;
- Transações armazenadas como objetos;
- Identificador único para cada transação;
- Registro de data e horário;
- Exibição do extrato completo;
- Total depositado;
- Total sacado;
- Quantidade de depósitos;
- Quantidade de saques;
- Quantidade total de operações;
- Saldo atual no resumo da conta.

### Filtros e busca

- Filtro para visualizar somente depósitos;
- Filtro para visualizar somente saques;
- Busca de uma transação pelo ID;
- Validação de ID vazio;
- Validação de ID não numérico;
- Bloqueio de ID decimal;
- Bloqueio de ID menor ou igual a zero;
- Mensagem quando o ID não é encontrado.

## 🧠 Conceitos praticados

- Variáveis com `let`;
- Tipos de dados;
- Conversão com `Number()`;
- Condicionais;
- Operadores de comparação;
- Operadores lógicos;
- Laço `while`;
- Laço `for`;
- Funções;
- Parâmetros e retorno;
- Arrays;
- Objetos;
- Objetos aninhados;
- Arrays de objetos;
- Método `push()`;
- Método `filter()`;
- Método `find()`;
- Método `reduce()`;
- Propriedade `length`;
- `Number.isFinite()`;
- `Number.isInteger()`;
- Método `trim()`;
- Expressão regular com `/\d/`;
- Template strings;
- Objeto `Date`;
- `toLocaleDateString()`;
- `toLocaleTimeString()`;
- `toLocaleString()`;
- Valor `null`;
- Valor `undefined`;
- Comandos `break` e `continue`.

---

## 📋 Histórico de versões

### v3.1.1 — Validações e correções

- Validação do cadastro;
- Tratamento do cancelamento do cadastro;
- Tratamento de campos com espaços;
- Tratamento do cancelamento do menu;
- Validação aprimorada de depósitos e saques;
- Validação aprimorada da busca por ID;
- Formatação monetária no padrão brasileiro;
- Padronização de mensagens;
- Exibição do saldo nos dados da conta.

### v3.1.0 — Filtros, busca e cálculos

- Implementação de `filter()`;
- Implementação de `find()`;
- Implementação de `reduce()`;
- Filtro de depósitos;
- Filtro de saques;
- Busca de transação por ID;
- Totais calculados com `reduce()`;
- Quantidade de depósitos e saques;
- Novo menu com oito opções.

### v3.0.0 — Objetos e dados da conta

- Cadastro básico do cliente;
- Dados do cliente organizados em objeto;
- Conta como objeto interno;
- Saldo armazenado dentro da conta;
- Transações armazenadas como objetos;
- Um único Array de transações;
- IDs únicos;
- Data e horário das operações;
- Nova opção para visualizar os dados da conta;
- Extrato adaptado para Arrays de Objetos.

### v2.1.0 — Resumo da conta

- Numeração das transações;
- Exibição do saldo atual;
- Quantidade de operações;
- Total depositado;
- Total sacado;
- Resumo da conta.

### v2.0.1 — Correções e melhorias

- Tratamento de operações canceladas;
- Tratamento de campos vazios;
- Validação de valores não numéricos;
- Melhorias nas mensagens;
- Ajustes de organização e formatação.

### v2.0.0 — Histórico e extrato

- Criação do histórico de transações;
- Registro de depósitos;
- Registro de saques;
- Implementação do extrato;
- Utilização de Arrays.

### v1.1.0 — Validações

- Bloqueio de depósitos inválidos;
- Bloqueio de saques inválidos;
- Verificação de saldo insuficiente;
- Tratamento de opções inválidas.

### v1.0.0 — Primeira versão

- Consulta de saldo;
- Depósito;
- Saque;
- Menu interativo;
- Funções para operações bancárias.

---

## 🛠️ Tecnologias utilizadas

- HTML;
- JavaScript;
- Git;
- GitHub;
- Visual Studio Code.

---

## 🌿 Fluxo de desenvolvimento

1. Criar uma branch;
2. Desenvolver as alterações;
3. Fazer commits organizados;
4. Enviar a branch para o GitHub;
5. Abrir um Pull Request;
6. Fazer o merge na `main`;
7. Criar a tag da versão;
8. Publicar a Release;
9. Apagar a branch concluída.

---

## 📖 Aviso

Este é um projeto educacional.

O sistema não possui conexão com bancos reais, não utiliza dados financeiros verdadeiros e não deve ser utilizado para operações bancárias reais.

---

## 👨‍💻 Autor

Desenvolvido por **Kherlysson Ryann** durante os estudos de lógica de programação e JavaScript.
