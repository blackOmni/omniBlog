# Blackomni

A full-stack application built with React and Node.js.

---

## Installation

1. **Clone the repository:**

```bash
   git clone https://github.com/your-username/blackomni.git
   cd blackomni
```

2. **Install Client Dependencies:**

```bash
   cd client
   npm install
```

3. **Install Server Dependencies:**

```bash
   cd ../server
   npm install
```

## 💻 Development Workflow

Run both applications concurrently in separate terminal windows or tabs:

**Start Backend Server**

```bash
cd server
npm run dev
# Server running at http://localhost:3000
```

**Start Frontend Application**

```bash
cd client
npm run dev
# Client running at http://localhost:5173
```

## 🛠️ Code Quality & Formatting

Both client and server utilize ESLint Flat Config (`eslint.config.js`) integrated with Prettier.

To run linting checks across either directory:

```bash
# Inside /client or /server
npm run lint
```

To automatically fix formatting and syntax issues:

```bash
# Inside /client or /server
npx eslint . --fix
```
