# JP Multiservices — Full-Stack Marketing Website

A responsive, full-stack marketing website and management portal for JP Multiservices, an interior work services company.

## Tech Stack
- **Frontend**: React.js + Vite + Tailwind CSS v3
- **Backend**: Node.js + Express.js
- **Database**: MySQL
- **Auth**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL Server

### 1. Database Setup
```bash
cd server
npm install
npm run seed
```
This creates the `jp_multiservices` database, tables, and seeds initial data.

### 2. Start Backend
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

### 3. Start Frontend
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

### Default Admin Login
- **Username**: admin
- **Password**: JPMulty@2026

## Project Structure
```
JP_MARKETING/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Public + Admin pages
│   │   ├── context/      # Auth context
│   │   └── utils/        # API utility
│   └── ...
├── server/          # Express.js backend
│   ├── config/      # Database config
│   ├── middleware/   # Auth + Upload middleware
│   ├── routes/      # API routes
│   └── seeds/       # Database seeder
└── README.md
```

## Contact
- **Business**: JP Multiservices
- **Contact Person**: Pashu Pathan
- **Phone**: 9665715190
- **Address**: Nagapur Fata, Shendurwada, Tal. Gangapur, Dist. Aurangabad, Maharashtra
