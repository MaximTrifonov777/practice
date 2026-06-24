# Todo TDD API

## Что это

API для списка задач. Можно создавать, смотреть, редачить и удалять задачи. Проект делался в рамках практики ПМ.02 и ПМ.11.

## Что использовал

- Node.js и Express (сервер)
- PostgreSQL (база данных)
- Knex.js (чтобы не писать SQL руками)
- Mocha и Chai (тесты)
- ESLint и Prettier (чтобы код был чистый)

## Как запустить у себя

1. Склонировать репозиторий
2. npm install
3. Создать .env файл из .env.example и прописать свои данные от БД
4. npm run migrate (создаст таблицы)
5. npm run seed (заполнит тестовыми данными)
6. npm start

Сервер будет висеть на http://localhost:3000

## Какие запросы можно делать

GET / — проверка что сервер жив
GET /todos — список всех задач
GET /todos/1 — одна задача по id
POST /todos — создать задачу (нужен title и description)
PUT /todos/1 — обновить задачу
DELETE /todos/1 — удалить задачу

## Тесты

npm test — прогонит все тесты

## Деплой

todo-tdd-practice.onrender.com