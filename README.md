```markdown
# Full-Stack Standalone Login & Registration Application

A modern, responsive, and secure authentication application built using **Angular (v22+)** Standalone Components on the frontend, and a **Node.js/Express** backend paired with a **PostgreSQL** database. 

Passwords are encrypted using industry-standard **bcrypt** hashing, and critical system keys are securely managed via environment variables.

---

## 🛠️ Project Architecture & Features
- **Frontend**: Angular Standalone Architecture, Template-Driven Form Handling with optimized autofill lifecycle synchronization, custom Glassmorphic UI, and animated toast notifications.
- **Backend**: RESTful API endpoints managed via Node.js and Express.
- **Security**: Database credential encapsulation, secure password hashing, and Git-protected configuration.

---

## 🚀 Getting Started

### 📋 Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) database

---

### 📡 1. Backend Server Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

```

2. Install dependencies:
```bash
npm install

```


3. **Configure Secrets**:
Copy the example environment file:
```bash
cp .env.example .env

```


*Note: On Windows CMD, use `copy .env.example .env*`
Open the `.env` file and update your database credentials:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=login_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432

```


4. Launch the server:
```bash
node server.js

```



---

### 💻 2. Frontend Angular Setup

1. Open a new terminal in the root project folder.
2. Install dependencies:
```bash
npm install

```


3. Start the Angular development server:
```bash
ng serve

```


4. Navigate to `http://localhost:4200/` in your browser.

---

## 📂 Key Repository Structure

```text
├── backend/
│   ├── .env              # Secure connection parameters (Ignored by Git)
│   ├── .env.example      # Configuration template
│   └── server.js         # API Route definitions & database logic
├── src/
│   ├── app/
│   │   ├── login/        # Login component logic & UI
│   │   ├── register/     # Registration component logic & UI
│   │   └── home/         # Home dashboard
│   └── styles.css        # Global animated gradient styles
├── .gitignore            # Excludes node_modules and .env
└── README.md             # Project documentation

```

```

```
