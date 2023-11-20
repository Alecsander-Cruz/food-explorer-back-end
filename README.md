# food-explorer-back-end

Back-end do Flood Explorer, aplicação desenvolvida no desafio final do curso Explorer da Rocketseat

## Requisitos do Back-end:

-   [x] Desenvolvimento de uma API que suporte as operações de CRUD (criar, ler, atualizar, e apagar) para os pratos do restaurante.
-   [x] Implementação de autenticação JWT para usuários e admin.
-   [x] Armazenamento de dados do admin, do restaurante e dos usuários em um banco de dados.
-   [x] Implementação de funcionalidades de busca por nome e ingredientes para pratos.
-   [x] Desenvolvimento de _endpoints_ para manipulação de pratos, autenticação e outras operações necessárias.
-   [x] Implementação de validações de entrada e saída de dados.

## Dependências do projeto:
  - [bcrypt.js](https://www.npmjs.com/package/bcryptjs) versão 2.4.3
    
  - [cookie-parser](https://www.npmjs.com/package/cookie-parser) versão 1.4.6
    
  - [cors](https://www.npmjs.com/package/cors) versão 2.8.5
    
  - [dotenv](https://www.npmjs.com/package/dotenv) versão 16.3.1
    
  - [express](https://www.npmjs.com/package/express) versão 4.18.2
    
  - [express-async-errors](https://www.npmjs.com/package/express-async-errors) versão 3.1.1
    
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) versão 9.0.2
    
  - [knex](https://www.npmjs.com/package/knex) versão 3.0.1 (Para fazer o deploy desta aplicação com essa versão do KNEX no [Render.com](https://render.com/) foi necessário setar uma variável de ambiente no Render "NODE_VERSION" com o valor de uma versão do Node.js maior ou igual a v16

    ![render knex node version](https://github.com/Alecsander-Cruz/food-explorer-back-end/assets/17745018/e602ab61-fed6-4452-b1f2-5033004d2d5a)

    
  - [multer](https://www.npmjs.com/package/multer) versão 1.4.5-lts.1
    
  - [pm2](https://www.npmjs.com/package/pm2) versão 5.3.0
    
  - [sqlite](https://www.npmjs.com/package/sqlite) versão 5.1.1
    
  - [sqlite3](https://www.npmjs.com/package/sqlite3) versão 5.1.6
    

#### Dependências de dev:
  - [nodemon](https://www.npmjs.com/package/nodemon) versão 3.0.1

## Instruções para execução do projeto:

  - Clonar o repositório.
  - Para instalar as dependências rode o comando
    ```
    npm install
    ```
  - Para executar no modo DEV, com nodemon, rode o comando
    ```
    npm run dev
    ```
  - Para executar no modo Normal, rode o comando
    ```
    npm start
    ```
  - Configurar o arquivo .env com base no [.env.example](.env.example) preenchendo os valores do SERVER_PORT, com a porta na qual será executada o back-end, e o AUTH_SECRET com uma chave hash para o secret do JWT, usado no [auth.js](src/configs/auth.js).

    - Obs.: para rodar localmente troque a origin do cors no arquivo [server.js](src/server.js) para a url em que o front-end usará. A url usada no desenvolvimento foi a "http://localhost:5173"



## :link:[Deploy do projeto](https://alecsander-cruz-food-explorer.onrender.com)
