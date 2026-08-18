# 📝 OmniBlog

A full-stack blogging platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Follows an MVC architecture on the backend with standardized API responses, password hashing, and relational integrity between users and blogs — paired with a responsive, theme-aware React frontend.

---

## 🚀 Features

- **User Management** — signup and login with `bcryptjs` password hashing
- **Full Blog CRUD** — create, read, update, and delete blog posts
- **Auto-Increment Views** — view count increments automatically when a blog is fetched
- **Like / Unlike Posts** — toggle likes per user
- **Author Relations** — Users and Blogs linked via Mongoose references and MongoDB transactions
- **Standardized API Responses** — consistent success (`ApiResponse`) and error (`ApiError`) handling via `asyncHandler`
- **Responsive UI** — grid-based card layout with breakpoints for desktop, tablet, and mobile
- **Dynamic Theming** — CSS custom variables for light/dark mode

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React.js (Vite / Create React App)
- **UI Components**: Material UI (MUI)
- **State Management**: Redux Toolkit / React-Redux
- **Routing**: React Router DOM (`v6`)
- **HTTP Client**: Axios
- **Styling**: Modular CSS3 with custom variables

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Security**: bcryptjs (password hashing)
- **Environment Management**: dotenv

---

## 📁 Project Structure

```text
omniblog/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── api/                 # Axios instance configuration
│   │   ├── components/          # Reusable components (BlogCard, etc.)
│   │   │   └── css/             # Component-specific stylesheets
│   │   ├── pages/                # Page views (Auth, AllBlogs, BlogDetail, AddBlog)
│   │   └── store/                # Redux state configuration
│   └── package.json
│
└── server/                      # Express Backend API
    ├── config.env               # Environment variables
    ├── server.js                # Entry point (DB connection & HTTP server)
    ├── app.js                   # Express app & middleware setup
    ├── package.json
    └── src/
        ├── controllers/
        │   ├── user.controller.js
        │   └── blog.controller.js
        ├── models/
        │   ├── User.js
        │   └── Blog.js
        ├── routes/
        │   ├── userRoutes.js
        │   └── blogRoutes.js
        └── utils/
            ├── ApiError.js
            ├── ApiResponse.js
            └── asyncHandler.js
```

---

## 🏁 Getting Started Locally

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn
- A running MongoDB instance (local server or a MongoDB Atlas cluster)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/omniblog.git
cd omniblog
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `config.env` file in the root of the `server` directory:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/postBlog?retryWrites=true&w=majority
```

> ⚠️ Replace `<username>` and `<password>` with your actual MongoDB Atlas credentials, and never commit `config.env` to version control.

Start the backend:

```bash
npm run dev    # development, with nodemon auto-reload
# or
npm start      # production
```

The server runs on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the root of the `client` directory (optional, if pointing to a custom backend URL):

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Start the frontend:

```bash
npm run dev     # Vite
# or
npm start       # Create React App
```

The client runs on `http://localhost:5173` (Vite) or `http://localhost:3000` (CRA — use a different port than the backend in that case).

---

## 📡 Standard API Response Format

**Success:**

```json
{
  "statusCode": 200,
  "data": { ... },
  "message": "Operation description",
  "success": true
}
```

**Error:**

```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error description",
  "success": false,
  "errors": []
}
```

---

## 🔌 API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

### User Endpoints (`/users`)

| Method | Endpoint        | Description                | Request Body                      |
| ------ | --------------- | -------------------------- | --------------------------------- |
| POST   | `/users/signup` | Register a new user        | `{ "name", "email", "password" }` |
| POST   | `/users/login`  | Authenticate existing user | `{ "email", "password" }`         |

### Blog Endpoints (`/blogs`)

| Method | Endpoint            | Description                               | Request Body                                                         |
| ------ | ------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/blogs`            | Fetch all blogs (sorted by newest)        | —                                                                    |
| POST   | `/blogs/add`        | Create a new blog post                    | `{ "title", "description", "content", "image", "category", "user" }` |
| GET    | `/blogs/:id`        | Fetch single blog (increments view count) | —                                                                    |
| PUT    | `/blogs/update/:id` | Update an existing blog post              | `{ "title", "description", "content", "image", "category" }`         |
| DELETE | `/blogs/:id`        | Delete a blog and detach from user        | —                                                                    |
| GET    | `/blogs/user/:id`   | Fetch all blogs by a specific user        | —                                                                    |
| PUT    | `/blogs/like/:id`   | Toggle like/unlike on a post              | `{ "userId" }`                                                       |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
