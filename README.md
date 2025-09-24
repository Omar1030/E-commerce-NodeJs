# 📦 E-commerce Backend (Node.js + Express + MongoDB)

This project is a simple **E-commerce backend API** built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.
It supports **users, sellers, products, carts, and orders** with role-based access (user, seller, admin).
Authentication is handled with **JWT tokens**.

---

## ✨ Features

- **Authentication**

  - Register, Login, Change Password
  - Role-based access control: `user`, `seller`, `admin`

- **User**

  - Update profile (name, email)

- **Seller**

  - CRUD products (restricted to own products)
  - View seller profile

- **Product**

  - Public: view products
  - Authenticated users: search by name, seller, price range

- **Cart**
  - Add, update, remove items
  - Each user has their own cart
- **Order**
  - Create orders from cart or custom items
  - Cash on delivery only (no online payment)
  - Users: view own orders
  - Admin: view all orders

---

## 📂 Project Structure

```
ecommerce-backend/
├─ package.json
├─ .env.example
├─ src/
│  ├─ index.js
│  ├─ config/db.js
│  ├─ models/ (User, Seller, Product, Cart, Order)
│  ├─ controllers/ (auth, seller, product, cart, order)
│  ├─ routes/ (auth, seller, product, cart, order)
│  ├─ middlewares/ (auth, role, optionalAuth)
│  └─ utils/errorHandler.js
```

---

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Omar1030/E-commerce-NodeJs.git
   cd ecommerce-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env`

   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   ```

4. Run the server:

   ```bash
   npm run dev   # development (nodemon)
   npm start     # production
   ```

---

## 🔑 Authentication

- JWT-based authentication.
- Send token in headers:

  ```
  Authorization: Bearer <token>
  ```

---

## 📘 API Endpoints

### **Auth**

- `POST /auth/register` → Register (user or seller)
- `POST /auth/login` → Login
- `PUT /auth/change-password` → Change password (authenticated)
- `PUT /auth/profile` → Update profile

---

### **Seller**

- `GET /seller/profile` → Get seller profile
- `GET /seller/my-products` → Get seller’s products
- `POST /seller/products` → Create product
- `PUT /seller/products/:productId` → Update product
- `DELETE /seller/products/:productId` → Delete product

---

### **Products**

- `GET /api/products` → List products

  - Anonymous: view all
  - Authenticated: search with filters (`?name=..&sellerName=..&price_gte=..&price_lte=..`)

- `GET /api/products/:productId` → Get product by ID

---

### **Cart** (requires auth)

- `GET /api/cart` → Get user’s cart
- `POST /api/cart` → Create or replace cart
- `PUT /api/cart/:userId/item` → Update a single cart item (owner/admin only)
- `DELETE /api/cart` → Clear cart

---

### **Orders** (requires auth)

- `POST /api/orders` → Create new order (from cart or custom items)
- `GET /api/orders/my-orders` → Get logged-in user’s orders
- `GET /api/orders` → Admin only: Get all orders

---

## 🛠️ Tech Stack

- **Node.js** (v18+)
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Bcrypt.js** for password hashing
- **CORS** for cross-origin requests
