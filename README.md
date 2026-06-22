# Danylo Todo

Aplicação To-Do desenvolvida como projeto de formação full-stack. Cada utilizador pode criar uma conta e gerir apenas as suas próprias tarefas através de uma interface Angular e de uma API REST Laravel.

## Stack

- Angular 19 com NgModule, Reactive Forms, Router e HttpClient
- Laravel 13 e PHP 8.3
- MySQL
- Laravel Sanctum com Bearer tokens
- CSS próprio, sem bibliotecas de componentes

Docker não é usado nesta fase do projeto.

## Funcionalidades

- Registo, login e logout
- Rotas frontend protegidas
- Criação, listagem, edição e eliminação de tarefas
- Marcação de tarefas como pendentes ou concluídas
- Filtros por estado
- Isolamento das tarefas por utilizador
- Validação no frontend e backend

## Requisitos

- PHP 8.3 ou superior
- Composer
- MySQL 8 ou compatível
- Extensão PHP `pdo_sqlite` para executar a suite padrão em memória
- Node.js compatível com Angular 19
- npm
- Chrome/Chromium apenas para executar os testes Karma

## Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Confirma a configuração MySQL no ficheiro `backend/.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=danylo_todo
DB_USERNAME=root
DB_PASSWORD=
```

Cria a base de dados `danylo_todo` no MySQL e executa:

```bash
php artisan migrate
php artisan serve
```

A API fica disponível em `http://127.0.0.1:8000/api`.

Se uma base de desenvolvimento ainda tiver a estrutura antiga de tarefas, pode ser reconstruída com o comando abaixo. Este comando elimina todos os dados existentes:

```bash
php artisan migrate:fresh
```

Testes e inspeção das rotas:

```bash
php artisan test
php artisan route:list --path=api
```

Por omissão, o `phpunit.xml` executa os testes numa base SQLite em memória. Instala/ativa `pdo_sqlite` no PHP CLI antes de usar `php artisan test`. A aplicação continua a usar MySQL em desenvolvimento.

## Frontend

Noutro terminal:

```bash
cd frontend
npm install
npm start
```

Abre `http://localhost:4200`. A base da API está configurada em `frontend/src/environments/environmentApi.ts`.

Build de produção:

```bash
npm run build
python3 -m http.server 8080 --directory dist/frontend/browser
```

Depois, abre `http://127.0.0.1:8080` pela raiz. Este servidor simples não faz fallback de rotas SPA; para este teste, abre `/` e navega pela aplicação.

Testes Angular:

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## API

Rotas públicas:

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/api/register` | Registar e receber token |
| POST | `/api/login` | Autenticar e receber token |

Rotas protegidas por `auth:sanctum`:

| Método | Endpoint | Descrição |
| --- | --- | --- |
| POST | `/api/logout` | Revogar o token atual |
| GET | `/api/user` | Obter o utilizador autenticado |
| GET | `/api/todos?status=all\|pending\|completed` | Listar e filtrar tarefas |
| POST | `/api/todos` | Criar tarefa |
| GET | `/api/todos/{id}` | Consultar tarefa |
| PUT/PATCH | `/api/todos/{id}` | Atualizar tarefa |
| DELETE | `/api/todos/{id}` | Eliminar tarefa |

As rotas protegidas esperam:

```http
Authorization: Bearer TOKEN
Accept: application/json
```

O cliente nunca define `user_id`; o backend associa a tarefa ao utilizador autenticado. Tentativas de acesso a tarefas de outro utilizador devolvem `404`.

## Fluxo de Utilização

1. Criar uma conta em `/register` ou entrar em `/login`.
2. Criar e gerir tarefas em `/todos`.
3. Usar os filtros Todas, Pendentes e Concluídas.
4. Terminar a sessão pelo botão Logout.

O token Sanctum é guardado em `sessionStorage` e enviado automaticamente pelo `AuthInterceptor`.

## CORS

Durante o desenvolvimento, o Laravel permite origens HTTP em `localhost` e `127.0.0.1`, incluindo portas locais diferentes para testar o build. Não abras o `index.html` diretamente com `file://`; serve sempre o build através de HTTP.

## Segurança e Configuração

- `backend/.env` contém configuração local e não deve ser versionado.
- Apenas `backend/.env.example`, sem credenciais reais, faz parte do repositório.
- Passwords são guardadas com hashing pelo Laravel.
- Tokens são revogados no logout.
