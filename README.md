# 🛒 E-Commerce Backend API

A full-featured e-commerce backend built with **Node.js, Express, and MongoDB**, designed with a scalable modular architecture.

This project implements real-world backend concepts including authentication, role-based access control, product management, cart system, and order processing.

---

## 🚀 Features

* 🔐 JWT Authentication (Login/Register)
* 👑 Role-Based Authorization (Admin & Users)
* 📦 Product Management (CRUD)
* 🛒 Cart System (Add, Update, Remove)
* 💳 Order System (Checkout flow)
* 🧠 Modular Architecture (feature-based structure)

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT (jsonwebtoken)**
* **bcryptjs**
* **Nodemon**

---

## 📁 Project Structure

```
src/
 ├── models/
 │     ├── User.js
 │     ├── Product.js
 │     ├── Cart.js
 │     ├── Order.js
 │
 ├── modules/
 │     ├── auth/
 │     ├── product/
 │     ├── cart/
 │     ├── order/
 │
 ├── middlewares/
 │     ├── auth.middleware.js
 │     ├── admin.middleware.js
 │
 ├── utils/
 │     ├── token.js
 │
 ├── server.js
```

---

## 📦 API Endpoints

### 🔐 Auth

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register user |
| POST   | `/api/auth/login`    | Login user    |

---

### 📦 Products

| Method | Endpoint            | Description            |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/products`     | Get all products       |
| POST   | `/api/products`     | Create product (Admin) |
| PUT    | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

---

### 🛒 Cart

| Method | Endpoint    | Description   |
| ------ | ----------- | ------------- |
| GET    | `/api/cart` | Get user cart |
| POST   | `/api/cart` | Add to cart   |
| PUT    | `/api/cart` | Update item   |
| DELETE | `/api/cart` | Remove item   |

---

### 💳 Orders

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | `/api/orders`             | Create order           |
| GET    | `/api/orders/myorders`          | Get user orders        |
| GET    | `/api/allorders`             | Get all orders (Admin) |
| PUT    | `/api/orders/:id/deliver` | Mark delivered (Admin) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-backend.git
cd ecommerce-backend
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Run the server

```bash
npm run dev
```

---

### 5️⃣ Server runs at:

```
http://localhost:5000
```

---

## 🔐 Authentication Example

Add token to headers:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 🧠 Key Concepts Implemented

* Authentication vs Authorization
* Middleware chaining (`protect → isAdmin`)
* Database relationships (User, Product, Cart, Order)
* Persistent cart system
* Order creation from cart
* Modular backend architecture

---

## 🚀 Future Improvements

* 💳 Payment Integration (Paystack / Stripe)
* 📍 Shipping Address
* 📦 Order Status Tracking
* 🔍 Search & Pagination
* 🌐 Frontend Integration (React)

---

## 👨‍💻 Author

**Favour**

* GitHub: https://github.com/hugo-fav
* Portfolio: https://portfolio-z8kd.vercel.app/projects

---

## ⭐️ Support

If you like this project, give it a ⭐ on GitHub!
