# 🎓 SM Dev Academy

O **SM Dev Academy** é uma plataforma Full Stack de cursos de programação desenvolvida com Angular e NestJS. A aplicação utiliza a YouTube Data API para importar playlists de cursos e oferece recursos como autenticação, favoritos, avaliações, trilhas de aprendizagem, controle de progresso, notificações em tempo real e painel administrativo.

## 🚀 Tecnologias

### Frontend

- Angular
- TypeScript
- SCSS
- Angular Material

### Backend

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Socket.IO

### Serviços

- Supabase
- YouTube Data API v3
- Vercel
- Render

## 📁 Estrutura do Projeto

```text
sm-dev-academy/
├── backend/
│   └── sm-dev-academy-api/
└── frontend/
    └── sm-dev-academy-web/
```

## ⚙️ Executando o projeto

### Backend

```bash
cd backend/sm-dev-academy-api

npm install

npx prisma migrate deploy

npm run start:dev
```

O backend será iniciado em:

```text
http://localhost:3000
```

### Frontend

Em outro terminal:

```bash
cd frontend/sm-dev-academy-web

npm install

npm start
```

O frontend será iniciado em:

```text
http://localhost:4200
```

## 👨‍💻 Autor

**Sávio Moreira de Moraes**