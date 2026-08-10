# Kirana Platform

![Banner](https://via.placeholder.com/800x200.png?text=Kirana+Platform)

## About

Kirana Platform is a lightweight, modern point-of-sale and inventory management system built for small grocery stores (kirana). It combines a fast React-based billing interface with a robust Node.js backend, real-time stock tracking, and simple deployment via Docker.

## Features

- **Quick Billing** — Search products, build carts, and complete sales in seconds
- **Inventory Management** — Track stock levels and update quantities automatically on sale
- **Supabase Integration** — Reliable data persistence with PostgreSQL-backed storage
- **Docker Ready** — One-command deployment for both backend and frontend

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (via Supabase)
- **DevOps:** Docker, GitHub Actions CI

## Installation

### Using Docker (Recommended)

```bash
docker-compose up --build
```

### Manual Setup

**Backend**
```bash
cd backend
npm install
npm run dev
```

**Frontend**
```bash
cd frontend-web
npm install
npm run dev
```

## Usage

1. Start the backend server (`npm run dev` in `backend/`).
2. Launch the frontend (`npm run dev` in `frontend-web/`).
3. Open the billing screen to search products, add items to the cart, and complete a sale.
4. Inventory updates and sales records are handled automatically via the backend API.

## Project Structure

```
backend/           # Express API, controllers, SQL schema
frontend-web/      # React billing & inventory UI
```

## License

MIT