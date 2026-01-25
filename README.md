# 🚀 CRUD Backend API with Prisma & TypeScript

> A scalable and production-ready backend API built using Node.js, TypeScript, and Prisma ORM.  
> This project implements complete CRUD functionality with clean architecture and database integration.

---

## 📌 Overview

This project is a backend REST API that demonstrates how to build a modern server-side application using Prisma ORM and TypeScript.  
It follows a modular architecture and supports database-driven CRUD operations.

---

## ✨ Key Features

- ✅ Full CRUD Operations (Create, Read, Update, Delete)
- 🧬 Prisma ORM for database management
- 🔷 TypeScript for type safety
- ⚙️ RESTful API architecture
- 🗄️ Database integration (MySQL / PostgreSQL / SQLite)
- 📁 File upload handling
- 🛡️ Environment-based configuration
- 🧩 Modular & scalable folder structure
- 🚀 Production-ready backend

---

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Prisma ORM
- Express.js
- MySQL / PostgreSQL / SQLite
- npm

---

## 📂 Project Structure

```bash
crud-with-prisma/
│
├── prisma/           # Prisma schema & migrations
├── src/
│   ├── controllers/  # API controllers
│   ├── routes/       # API routes
│   ├── services/     # Business logic
│   ├── middlewares/  # Middleware functions
│   └── utils/        # Utility functions
│
├── uploads/          # Uploaded files
├── .env              # Environment variables
├── package.json      # Dependencies & scripts
├── tsconfig.json     # TypeScript configuration
└── README.md
```
---

## Example Endpoints (Users)

| Method | Endpoint           | Description        |
|--------|-------------------|-------------------|
| GET    | /api/users        | Get all users     |
| GET    | /api/users/:id    | Get user by ID    |
| POST   | /api/users        | Create new user   |
| PUT    | /api/users/:id    | Update user       |
| DELETE | /api/users/:id    | Delete user       |

---

## 🧪 Testing

Run the server and test APIs using:

- Postman
- Thunder Client
- Swagger (if integrated)

---

## 📊 Database Schema (Example)

Example User Model (Prisma):

model User {
id Int @id @default(autoincrement())
name String
email String @unique
createdAt DateTime @default(now())
}

---

## ⚙️ Environment Variables

| Variable       | Description              |
|---------------|--------------------------|
| DATABASE_URL  | Database connection URL  |
| PORT          | Server port              |

---

## 🌍 Deployment

You can deploy this backend on:

- 🚀 Render
- ☁️ Railway
- 🌐 Vercel (API)
- 🖥️ VPS / DigitalOcean
- 🐳 Docker

Build for production:
npm run build
npm start

---

## 👨‍💻 Developer

**Aakash Jaiswal**  
🌐 GitHub: https://github.com/Aakash-Ja

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐ Why This Project?

This project helps you understand:

- Backend architecture
- Prisma ORM usage
- TypeScript in backend
- Real-world CRUD API design
- Database integration

---

## 🎉 Credits

Built with ❤️ to practice modern backend development using Prisma and TypeScript.
