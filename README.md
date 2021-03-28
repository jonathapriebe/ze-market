# cash-machine

Aplicação criada para simular o funcionamento de um sistema de pedidos, com fila de atualização de estoque e automatização do processo de população do estoque via arquivo csv. Mediante o estoque disponível é possível ou não realizar o pedido. Também é possível visualizar os pedidos aprovados, bem como os produtos previamente carregados.

Tecnologias utilizadas:

- NodeJs
- Typescript
- MongoDB
- Jest
- Swagger UI Express
- ESLint

## Para rodar a aplicação:

Na raiz do projeto é possível verificar que existe um arquivo docker-compose.yml, nele se encontra os serviços que foram passados no enunciado do desafio bem como o banco de dados utilizado (MongoDB) e também a aplicação que gere os serviços.
Para roda-lós juntos em ambiente de 'produção' basta rodar o comando:

```sh
$ docker-compose up
```

### Para rodar a aplicação em modo de desenvolvimento:

No arquivo docker-compose.yml comentar o sevice de web, para que somente os serviços entrem em execução já que a aplicação vai rodar em modo de desenvolvimento.
Após isso rodar o comando:

```sh
$ yarn start:local
```

### Para rodar a aplicação localmente:

No arquivo docker-compose.yml comentar o sevice de web, para que somente os serviços entrem em execução já que a aplicação vai rodar local.
Após isso rodar o comando:

```sh
$ yarn start
```

### Para rodar os testes:

No arquivo docker-compose.yml comentar o sevice de web, para que somente os serviços entrem em execução já que vamos precisar deles para os testes.
Após isso rodar o comando:

```sh
$ yarn test
```

### Para executar somente o build do projeto:

```sh
$ yarn build
```

### Para executar verificação de código:

```sh
$ yarn lint
```

### Para executar verificação de código e corrigir problemas (quando possível):

```sh
$ yarn lint:fix
```

### Para validação de estilo de código com prettier:

```sh
$ yarn style:check
```

### Para validação de estilo de código com prettier e corrigir problemas:

```sh
$ yarn style:fix
```
