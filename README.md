# TaskTrack

Sistema web em [Angular](https://angular.dev/) 18 para organizar usuários e tarefas da equipe. A interface usa [Nebular](https://akveo.github.io/nebular/) 14 (tema Cosmic) e os dados são mockados, então o CRUD funciona sem backend.

![Tela de login do TaskTrack](https://i.imgur.com/65Wy5HK.png)

![Dashboard com lista de tarefas](https://i.imgur.com/AK5oS2m.png)

![Página de usuários](https://i.imgur.com/HOqOlrg.png)

## Funcionalidades

- Login com contas de demonstração e sessão persistida no navegador
- Dashboard com resumo (usuários, tarefas, pendentes, em andamento, concluídas e atrasadas)
- Lista de tarefas na própria dashboard, com busca, filtro por responsável/status e ordenação por vencimento
- Clique na tarefa abre uma modal com detalhes, edição e exclusão
- Cadastro de usuários com o mesmo fluxo de modal
- Delegação de tarefas a um usuário já cadastrado
- Perfil e logout no menu do avatar

## Contas mockadas

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Administrador | `admin@tasktrack.com` | `admin123` |
| Usuário | `alice@gmail.com` | `user123` |

Na tela de login, os botões de conta preenchem o formulário automaticamente.

## Stack

- Angular 18 (standalone components)
- Nebular 14 + Eva Icons
- RxJS e Angular Signals
- date-fns (datepicker)
- ngx-pagination

Os serviços `AuthService`, `MockTaskService` e `MockUserService` simulam a persistência em memória. Recarregar a página restaura os dados iniciais das tarefas/usuários; o login permanece até você sair.

## Como executar

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
npm install
npm start
```

Abra [http://localhost:4200/](http://localhost:4200/). A aplicação recarrega ao alterar os arquivos de origem.

Outros comandos:

```bash
npm run build   # build de produção
npm test        # testes unitários (Karma)
```

## Rotas

| Rota | Acesso |
| --- | --- |
| `/login` | Pública (redireciona para a dashboard se já estiver autenticado) |
| `/dashboard` | Autenticado — painel e lista de tarefas |
| `/users` | Autenticado — gestão de usuários |
| `/tasks` | Redireciona para `/dashboard` |

## Observações

Este projeto foi gerado com a [Angular CLI](https://github.com/angular/angular-cli) 18.1.4. Não há API real: alterações de tarefas e usuários valem apenas enquanto a aplicação estiver em execução.
