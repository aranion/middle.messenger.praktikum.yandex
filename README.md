# Веб-приложение "Мессенджер YaPracticum"
## Описание
Приложение для отправки сообщений(курс от Яндекс Практикума).

### Технологии:
* Шаблонизатор: Handlebars;
* Препроцессор: Sass;
* Сборщик: Parcel;
* Сервер: Express;
* TypeScript;
* ESLint;
* Stylelint;
* Mocha и Chai;
* HTTP API и WebSocket;
* Хостинг: Netlify.

## Scripts:
### Установка зависимостей
```bash
npm install
```
### Запустить проект в режиме development
```bash
npm start
```
### Создать build проекта
```bash
npm run build
```
### Запуск сервера на 3000 порту OS-Windows
```bash
npm run server
```
### Запуск сервера на 3000 порту OS-Linux
```bash
npm run serverLinux
```
### Проверка кода через ESlint
```bash
npm run eslint
```
### Проверка стилей в коде
```bash
npm run lint
```
### Fix стилей в коде
```bash
npm run lint:fix
```
### Запуск тестов
```bash
npm run test
```

### Макет в Figma
[самостоятельно нарисованный дизайн](https://www.figma.com/file/AvcR3moKwnmEuGiKW3h3vb/YA?node-id=0%3A1)
[реализуемый в приложении дизайн](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

### Приложение на Netlify
[https://deploy--gleeful-florentine-3e81be.netlify.app/](https://deploy--gleeful-florentine-3e81be.netlify.app/)
[https://gleeful-florentine-3e81be.netlify.app/](https://gleeful-florentine-3e81be.netlify.app/)

## Спринт №1
Подготовлен дизайн веб-приложения
### Git pull
[sprint_1](https://github.com/aranion/middle.messenger.praktikum.yandex/pull/1)

## Спринт №2
Реализация минимального функционала, переходы на страницу, валидация.
### Git pull
[sprint_2](https://github.com/aranion/middle.messenger.praktikum.yandex/pull/5)

## Спринт №3
Компонентный подход, реализация Store, работа с запросами, роутинг.
### Git pull
[sprint_3](https://github.com/aranion/middle.messenger.praktikum.yandex/pull/7)

## Спринт №4
Тестирование проекта Mocha и Chai, сборка на Webpack, настроена Docker-сборка, проект размещен на Heroku с Docker-сборкой,
настроен precommit, произведен аудит пакетов.
### Git pull
[sprint_4](https://github.com/aranion/middle.messenger.praktikum.yandex/pull/8)