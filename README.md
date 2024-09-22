## Descrição
Esse projeto visa criar os motoristas e os outomoveis alem de criar monitorar o uso dos automoveis.
O banco de dados escolhido foi o `postgres` ele é bem estavel oferece uma grande variedade de recursos alem de ser bastante utilizado.

## Rotas 
as rotas estão disponiveis no link abaixo

https://documenter.getpostman.com/view/8201685/2sAXqtc2LT

## Requisitos:
É necessario ter instalado o `Docker` e ter acesso a `internet`.
### Primeiros passos:

1. Rodar o comando `docker compose up -d` para criar os containers do postgres.
2. Rodar o comando `npm run dev` para rodar o projeto, iniciar o banco de dados e rodar as migrations

## Dependencias utilizadas

1. express 
2. TypeORM 
3. Jest
4. tsyringe 

### Testes

Para executar os testes é necessário rodar o seguinte comando:
rodar o comando `npm run test`
