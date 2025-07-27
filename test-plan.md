**QA Test Strategy Document**

### 1. Objective
To verify the correctness and reliability of a simple full-stack application consisting of a React frontend and a Node.js/Express backend. The application supports login and CRUD operations for a list of items (name + email). This document outlines the QA automation plan for both UI and API testing.

### 2. Scope of Testing
- Functional UI Testing (Login + CRUD operations)
- API Testing for key endpoints
- Validation of both positive and negative test cases

### 3. Tools Used
| Tool       | Purpose                       |
| ---------- | ----------------------------- |
| Cypress    | UI + API automation           |
| React      | Frontend                      |
| Express.js | Backend API                   |
| Nodemon    | Auto-restart Node server      |

### 4. Test Coverage
#### UI Tests (Cypress):
- Login with valid and invalid credentials
- Add item
- Edit item
- Delete item
- Check item listing

#### API Tests (Cypress):
- POST /api/items
- GET /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

### 5. How to Run Tests
#### Prerequisites:
- Node.js and npm installed

#### Setup:
```bash
npm install
```

#### Start Backend:
```bash
nodemon server.js
```

#### Start Frontend:
```bash
npm start
```

#### Run Cypress:
```bash
npx cypress open
```

### 6. Assumptions & Limitations
- No persistent database (in-memory only)
- Email validation is basic (`@` and `.` check)
- Login uses hardcoded credentials
- Visual testing

### 7. Optional Enhancements
- Integrate Cypress
- Add code coverage reporting
