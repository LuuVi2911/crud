# CRUD Project

## Description

This project is a simple **CRUD application** where users can register, log in, and create posts.

We will use a **relational database (SQL)** for data storage, with the following stack:

- **Database**: SQLite
- **Schema design tool**: [dbdiagram.io](https://dbdiagram.io) (DBML – Database Markup Language)
- **ORM**: [Prisma](https://www.prisma.io/)

---

## Features

- **User registration**: Email, name, password (with password confirmation).
- **User login**: Email and password.
- **Create post**: Title and content.
- **JWT Authentication**:
  - Access Token: stateless, not stored in DB.
  - Refresh Token: stateful, stored in DB to allow multiple logins per user/device.

---

## Database Analysis

### Functional Requirements

1. A user can register an account.
2. A user can log in.
3. A user can create posts.
4. A user can log in from multiple devices (→ multiple refresh tokens).
5. When a user is deleted, all their posts and refresh tokens should also be deleted.

### Entity Relationships

- **One-to-Many**: User → Posts
- **One-to-Many**: User → RefreshTokens

### Database Schema (DBML)

```dbml
Project CRUD {
  database_type: 'SQLite'
  Note: 'Using Prisma ORM. Column types follow Prisma conventions'
}

Table User {
  id        Int      [pk, increment]
  email     String   [unique]
  name      String
  password  String
  createdAt DateTime [default: `now()`]
  updatedAt DateTime [note: '@updatedAt']
}

Table Post {
  id        Int      [pk, increment]
  title     String
  content   String
  authorId  Int
  createdAt DateTime [default: `now()`]
  updatedAt DateTime [note: '@updatedAt']
}

Ref: Post.authorId > User.id [delete: cascade, update: no action]

Table RefreshToken {
  token     String   [unique]
  userId    Int
  expiresAt DateTime
  createdAt DateTime [default: `now()`]
}

Ref: RefreshToken.userId > User.id [delete: cascade, update: no action]
```
