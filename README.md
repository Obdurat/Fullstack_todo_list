# Boas-vindas ao repositório do Projeto Fullstack Todo List! 

## ATENÇÃO

A pasta Raiz do projeto e a pasta backend tem arquivos .env, Faça a ultilização do example.env para configurar a aplicação.<br />

É recomendado rodar a aplicação ultilizando as variaveis que ja tem valor declarado no example.env, Mas será nescessário configurar as que ainda estão sem valores.

# Passo a passo

<details>
  <summary><strong>Setup da aplicação</strong></summary><br />
  Navegue para a pasta backend e execute o comando:<br />

  ```npm install```

  Faça a mesmo para a pasta frontend antes de seguir em frente

   <br />
</details>

<details>
  <summary><strong>Como rodar a aplicação</strong></summary><br />
  Estando na raiz ultilize o commando

  ```docker-compose up -d```<br />

  Agora foram criados os containers da API e do Banco de dados !
  Logo em seguida é nescessário rodar os seguintes commandos

  ```docker exec -it fullstack_todo_api sh```<br />

  Esse commando irá lhe colocar dentro do container da api
  Dentro do container da API execute os comandos

  ```npx sequelize-cli db:migrate```<br />
  ```npx sequelize-cli db:seed:all```<br />

  Execute um de cada vez. (Nota: commandos npx podem demorar na primeira vez que vc cria o container pos ele irá instalar o npx dentro do container)
  Logo após ainda dentro do container da API você tem 2 opções 

  ```npm run prod```<br />
  ```npm start```<br />

  "npm start" irá executar a API com o uso do nodemon.
  "npm run prod" irá executar a API com o uso do node.

  Se você ver a mensagem:

  ```Back-end Running at 4000, DB connection estabilished```<br />

  Significa que está tudo certo !!<br />
  Para visualizar a documentação completa da api no seu navegar digite na barra de endereço:<br />

  ```localhost:4000```<br />

  Agora que está tudo certo com a API e o banco de dados é só abrir outro terminal e navegar para a pasta frontend e executar o comando:

  ```npm start```

  <br />
</details>

<details>
  <summary><strong>Testando o nodemailler com o mailtrap.io</strong></summary><br />
  No arquivo backend/helpers/nodemailler.js existe a logica para o transporte de emails.

  ```const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASS,
  },
});
```
<br />

  Para configurar essas variaveis é nescessário criar uma conta em <a href="https://mailtrap.io/register/signup" target="_blank">Mailtrap.io</a><br />
  Após a criação da sua conta ele lhe dara a porta, seu usuario e sua senha<br />
  Preencha as Variaveis 

  ```MAILER_HOST```<br />
  ```MAILER_PORT```<br />
  ```MAILER_USER```<br />
  ```MAILER_PASS```<br />
  
  De acordo com as informações que o mailtrap.io disponibilizou após a criação da sua conta.<br />

  Após de tudo isso configurado você pode testar a feature de reset da senha de um usuario. <br />

  <br />
</details>

<details>
  <summary><strong>Usuarios de teste gerados pelo seed</strong></summary><br />
  Existem 10 usuarios gerados pelo seed, As credenciais podem ser vistas no arquivo em /backend/Database/seeders.<br />

  E existem 50 tarefas que são relacionadas aleatóriamente a cada um desses usúarios.<br />

  A senha desses usúarios é 12345678 para todos eles.<br />
  
  Para um reset total desses usúarios vc precisa entrar no caontainer da API.<br />

  ```docker exec -it fullstack_todo_api sh```

  E executar os seguintes comandos:<br />

  ```npx sequelize-cli db:seed:undo:all```
  ```npx sequelize-cli db:seed:all```

  <br />
</details>
