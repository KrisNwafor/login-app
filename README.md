### Simple React + Node App with QA Automation

#### Project Overview
A basic login and CRUD interface built with React + Node, tested using Cypress for both UI and API flows.

### Setup Instructions

#### 1. Clone the repo
```bash
git clone https://github.com/yourname/qa-test-app.git
cd qa-test-app
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Start the backend
```bash
nodemon server.js
```

#### 4. Start the frontend
```bash
npm start
```

### Test Login Credentials
```
Username: admin
Password: password123
```

### Running Cypress Tests
```bash
npx cypress open
```

Then select the test files for UI flow and API.

### Available Scripts
- `npm start` – start React frontend
- `nodemon server.js` – start backend with auto-reload
- `npx cypress open` – open Cypress test runner
