# Projeto

Este projeto tem como objetivo treinar capacidades relacionadas ao BackEnd e o Prisma para multiplas funções do a dia a dia, seguindo um guia de instruções predeterminado para garantir que se aproxime mais da realidade.


- [X] Prisma configurado para criar um modelo de view e do banco de dados
- [X] Uso do adapter do mariaDB para fazer a conexão
- [X] Criação das pastas organizadas controllers, data e routes
- [X] Montando o CRUD pedido nas instruções
- [X] Revisando o código em busca de pequenos erros
- [X] Criação do modelo do README para documentar o processo
- [X] Projeto Finalizado


## Como Iniciar

É bem simples, basta executar os seguintes comandos.

Comando para baixar o node

```bash
npm i
```

Depois disso basta configurar o arquivo .env.example disponibilizado, faça um copia dele e nomeie como apenas .env, depois coloque todos os dados que está sendo pedido, para conseguir fazer que a programação acesse a sua maquina e consiga exportar e conectar o banco local da sua maquina com o código, fazendo isso vai ser possível dar continuidade para os próximos passos.

Comando para iniciar o prisma e exportar o banco de dados para sua maquina

```bash

npx prisma init

npx prisma generate

npx prisma db push

npx prisma generate

```

Por fim execute o comando do arquivo .env.example para criar o modelo da view de forma local, para garantir de forma segura e eficiente que o código vá funcionar, mas caso não queria o código consegue executar praticamente todas as funções sem problema, só utilize para garantir o sucesso e funcionamento sem nenhum erro no código.


## Extras

O prisma se encontra na versão 7.8.0, caso você abaixe uma versão superior ou menor, pode acabar ocasionando alguns problemas, sem contar que ele está configurando para o modelo mysql do mariaDB, então planeje o seu banco local com cuidado, para não dar conflito com o código.

O código disponibilizado no .env.example e só uma garantia caso o modelo do código esteja dando problema na hora de criar ele simultaneamente no ambiente.

O foco em si do projeto foi para treinar as minhas capacidades para ambientes voltados ao cotidiano, então, caso também queria usar ele para esse objetivo, vai acabar sendo muito útil, pois aborda diferentes temáticas e regras de negócio a respeito do modelo criado, logo um prójeto legal para treinar esses aspectos.

## Regra de negócios

As regras foram baseadas em uma prova da vida real

- O script do banco de dados deverá conter, no mínimo, três registros em cada uma das tabelas criadas, respeitando os tipos de dados definidos, bem como as restrições de chaves primárias e estrangeiras. 

- O banco de dados deverá disponibilizar uma view denominada vw_estoque, responsável por calcular e - apresentar o valor total por item de produto, considerando a quantidade registrada e o respectivo valor unitário. 

- A codificação Back-End deverá ser apresentada via Terminal/console (logs de execução), Endpoints (API) via ferramentas como Postman/Insomnia (requisição + resposta) ou Retorno/saída de função exibida no console. 

- A entrega deverá permitir: 
    - listar o valor total por categoria do produto, considerando a quantidade registrada e o valor unitário. 
    - listar todos os produtos cadastrados. 
    - cadastrar novos produtos, contendo validações para os seguintes campos: valor unitário, quantidade e categoria. 
    - listar todas as saídas de produtos, apresentadas em ordem decrescente por data. 
    - registrar entradas de produtos no estoque. 
    - listar movimentações de entrada e saída no período informado (conforme data inicial e data final), para cada um dos 7 campos obrigatórios, conforme ordem: nome do produto, unidade de medida, total de entradas, total de saídas, saldo no período, valor total financeiro das entradas e valor total financeiro das saídas. 
    - listar os produtos com maior volume de saída no período informado (conforme data inicial e data final) com os 3 campos obrigatórios, conforme ordem: nome do produto, quantidade total de saída e valor total financeiro das saídas. 
    - identificar produtos que tenham atingido os limites mínimos (valor: 0) e máximo (valor: 100) estabelecidos para o estoque com identificação do percentual de nível atingido. 


### Esse foi o projeto, espero que te ajude a aprender mais sobre as funções do prisma e como conectar ele com o código ao mesmo tempo resolvendo desafios da vida real."# TreinandoPrisma_Prova" 
