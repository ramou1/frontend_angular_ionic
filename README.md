
# Teste Frontend Angular Ionic - Ramon Oliveira

O projeto TaskTrack foi gerado com a [Angular CLI](https://github.com/angular/angular-cli) versão 18.1.4 e utiliza o Nebular 14.0.0 para estilização e componentes de UI. 

![Painel TaskTrack](https://imgur.com/a/6MBAjdR)
![Painel TaskTrack](https://i.imgur.com/a/6MBAjdR.png)

## O Projeto
É um sistema web onde o usuário pode criar, editar, excluir e listar usuários e tarefas. Na hora da criação da tarefa será possível delegá-la a algum usuário previamente cadastrado no sistema. Foram criados serviços de tarefas e de usuários usando dados mockados, assim permitindo a simulação das operações de CRUD como uma interação de BD real. Filtros e ordenações também estão presentes nas páginas.

## Servidor de Desenvolvimento

Execute `ng serve` para iniciar um servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## Build

Execute `ng build` para compilar o projeto. Os arquivos de build serão armazenados na pasta `dist/`.

## Executando Testes Unitários

Execute `ng test` para rodar os testes unitários usando o [Karma](https://karma-runner.github.io).

## Executando Testes de Ponta a Ponta

Execute `ng e2e` para rodar os testes de ponta a ponta em uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente as capacidades de teste de ponta a ponta.