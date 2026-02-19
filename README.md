# Habit Tracker API

**A Beginner's Toolkit for Backend Development with Node.js and Express**

## Overview

This project documents my journey of learning backend development using Node.js. It demonstrates how to build a REST API for managing daily habits with CRUD operations.

## Objectives

- Set up a Node.js development environment
-  Understand async/await and the event loop
-  Build a REST API using Express
- Implement database operations (Create, Read, Update, Delete)
-  Write unit tests with Jest

## Technology Stack

| Technology     | Version | Purpose                |
| -------------- | ------- | ---------------------- |
| **Node.js**    | Latest  | JavaScript runtime     |
| **Express.js** | ^4.18.2 | Web framework          |
| **Jest**       | ^29.7.0 | Testing framework      |
| **Supertest**  | ^6.3.3  | HTTP assertion library |

## Why Node.js?

- JavaScript on the backend
- Event-driven, non-blocking I/O architecture
- Widely used in modern backend systems
- Supports my career path as a backend developer

## Project Deliverables

### MVP 1: CLI Habit Logger

A command-line script that accepts user input and stores habits persistently.

### MVP 2: REST API Habit Tracker

A full REST API with the following capabilities:

- Create habits
- List all habits
- Mark habits as complete
- Delete habits

---

## System Requirements

| Requirement         | Details               |
| ------------------- | --------------------- |
| **OS**              | Windows / Linux / Mac |
| **Node.js**         | v14.0.0 or higher     |
| **Package Manager** | npm or yarn           |
| **IDE**             | VS Code (recommended) |
| **API Testing**     | Postman or curl       |

### Verify Installation

```bash
node -v      # Check Node.js version
npm -v       # Check npm version
```

---

## Installation & Setup

### Step 1: Clone/Create Project Directory

```bash
mkdir habit-tracker-api
cd habit-tracker-api
```

### Step 2: Initialize Node Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install express uuid
npm install --save-dev jest supertest
```

### Step 4: Project Structure

Create the following file structure:

```
habit-tracker/
├── src/
│   ├── index.js
│   ├── data/
│   │   └── store.js
│   ├── models/
│   │   └── Habit.js
│   └── routes/
│       └── habitRoutes.js
├── tests/
│   └── habitRoutes.test.js
├── package.json
├── jest.config.js
└── README.md
```

### Step 5: Initialize Habits File

Create an empty `habits.json` file in the project root:

```json
[]
```

---

## Quick Start

### Run Development Server

```bash
npm run dev
```

Server will start on `http://localhost:3000`

### Run Tests

```bash
npm test              # Run all tests
npm test -- --coverage  # With coverage report
```

### Start Production Server

```bash
npm start
```

---

## API Endpoints

| Method     | Endpoint      | Description            |
| ---------- | ------------- | ---------------------- |
| **GET**    | `/habits`     | Retrieve all habits    |
| **POST**   | `/habits`     | Create a new habit     |
| **PATCH**  | `/habits/:id` | Mark habit as complete |
| **DELETE** | `/habits/:id` | Delete a habit         |

### Example Requests

**GET All Habits**

```bash
curl http://localhost:3000/habits
```

**Create New Habit**

```bash
curl -X POST http://localhost:3000/habits \
  -H "Content-Type: application/json" \
  -d '{"title": "Read 10 pages"}'
```

**Mark Habit Complete**

```bash
curl -X PATCH http://localhost:3000/habits/1707768000000
```

**Delete Habit**

```bash
curl -X DELETE http://localhost:3000/habits/1707768000000
```

---

## Core Code References

| File                                                   | Purpose                   |
| ------------------------------------------------------ | ------------------------- |
| [src/models/Habit.js](src/models/Habit.js)             | Habit data model          |
| [src/routes/habitRoutes.js](src/routes/habitRoutes.js) | API route handlers        |
| [src/data/store.js](src/data/store.js)                 | Data persistence layer    |
| [src/index.js](src/index.js)                           | Express application setup |
| [tests/habitRoutes.test.js](tests/habitRoutes.test.js) | Unit tests                |

---

## Common Issues & Solutions

| Issue                          | Cause                      | Solution                                                  |
| ------------------------------ | -------------------------- | --------------------------------------------------------- |
| `Cannot find module 'express'` | Package not installed      | Run `npm install express`                                 |
| `JSON parse error`             | Invalid JSON in file       | Ensure `habits.json` contains valid JSON                  |
| `Port 3000 already in use`     | Another process using port | Change port in code or kill process using `lsof -i :3000` |
| `Tests failing`                | Dependencies missing       | Run `npm install --save-dev jest supertest`               |

---

## Testing

### Run Tests

```bash
npm test
```

### Generate Coverage Report

```bash
npm test -- --coverage
```

View the report in `coverage/lcov-report/index.html`

---

## Key Concepts Learned

- **async/await**: Non-blocking I/O operations
- **Express.js**: Web framework and routing
- **File Operations**: Reading/writing JSON data
- **RESTful API Design**: HTTP methods and status codes
- **Unit Testing**: Jest and Supertest
- **Error Handling**: Try-catch blocks and middleware

---

## References

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MDN: async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises)
- [Jest Testing](https://jestjs.io/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## AI Prompt Evolution

This project demonstrates how AI assistance evolved through different learning phases:

| Phase                        | Prompt                                                                                       | Focus Area                | AI Contribution                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------- |
| **Phase 1: Conceptual**      | "Explain how Node.js event loop works compared to traditional threaded servers."             | Event-driven architecture | Understanding non-blocking I/O and async patterns |
| **Phase 2: CLI Development** | "Show me how to create a simple Node.js CLI app that accepts user input from terminal."      | CLI scaffolding           | Implemented `process.argv` handling and file I/O  |
| **Phase 3: REST API**        | "Guide me step-by-step to build a beginner-friendly REST API using Express and async/await." | Full API development      | Complete CRUD operations and error handling       |
| **Phase 4: Testing**         | "How do I write unit tests for Express APIs using Jest and Supertest?"                       | Test coverage             | Test structure and assertions                     |

### Key Learnings from Each Phase

**Conceptual Phase**

- Understanding event-driven, non-blocking I/O
- Difference between sync and async operations
- The role of the event loop in Node.js

**CLI Phase**

- Parsing command-line arguments
- Working with file systems asynchronously
- Error handling in CLI applications

**REST API Phase**

- Building REST endpoints with Express
- Implementing CRUD operations
- Async/await patterns for data persistence
- HTTP status codes and error responses

**Testing Phase**

- Writing testable code
- Mocking and assertions
- Coverage-driven development

---

## Author Notes

This project was built following AI-assisted learning to understand:

1. How Node.js event loops work
2. Building scalable REST APIs
3. Testing best practices
4. Error handling and debugging
5. The evolution from conceptual understanding to practical implementation

---

**Last Updated:** February 2026
