# api-javascript-mocha-supertest

## Objetivo

Este projeto realiza testes automatizados na API REST do [banco-api](https://github.com/juliodelimas/banco-api), validando suas funcionalidades e contribuindo a qualidade de suas operações.

## Stack utilizada

- **Linguagem:** JavaScript (Node.js)
- **Framework de testes:** [Mocha](https://mochajs.org/) 
- **Biblioteca de requisições HTTP:** [Supertest](https://github.com/ladjs/supertest)
- **Biblioteca de asserções:** [Chai](https://www.chaijs.com/)
- **Relatórios de testes:** [Mochawesome](https://github.com/adamgruber/mochawesome)
- **Gerenciamento de variáveis de ambiente:** [dotenv](https://github.com/motdotla/dotenv)

## Estrutura de diretórios

```
api-javascript-mocha-supertest/
├── screenshots/        # Evidencias de testes
├── test/               # Testes organizados por funcionalidades
│   ├── login.test.js
│   └── transferencias.test.js
├── mochawesome-report/ # Diretório gerado automaticamente com o relatório HTML dos testes
├── .env                # Arquivo para configuração da variável BASE_URL
├── .gitignore
├── package.json
└── README.md
```

## Formato do arquivo `.env`

Antes de rodar os testes, crie um arquivo chamado `.env` na raiz do projeto com o seguinte conteúdo:

```
BASE_URL=http://localhost:3000
```

Substitua `http://localhost:3000` pela URL onde a API `banco-api` está rodando.

## Comandos para execução

Instale as dependências:

```bash
npm install
```

Execute todos os testes:

```bash
npm test
```

Geração automática do relatório HTML:

- Após executar `npm test`, o relatório será gerado dentro da pasta `mochawesome-report/`.

Sugestão: para executar os testes e abrir o relatório HTML automaticamente, adicione um script no `package.json`:

```json
"scripts": {
    "test": "mocha ./test/**/*.test.js --timeout 10000 --reporter mochawesome",
    "test:debug": "node --inspect-brk ./node_modules/mocha/bin/_mocha --timeout 60000 ./test/**/*.test.js"
  },
```

## ScreenShots
<img src="https://github.com/cremope/api-javascript-mocha-supertest/blob/master/screenshots/overview_mochawesome.png" width="400" /> 
<img src="https://github.com/cremope/api-javascript-mocha-supertest/blob/master/screenshots/overview_mochawesome_OK.png" width="400" /> 
<img src="https://github.com/cremope/api-javascript-mocha-supertest/blob/master/screenshots/overview_mochawesome_NOK.png" width="400" /> 