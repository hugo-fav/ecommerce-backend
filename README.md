# 🛒 E-Commerce Backend API

A full-featured e-commerce backend built with **Node.js, Express, and MongoDB**, designed with a scalable modular architecture.

This project implements real-world backend concepts including authentication, role-based access control, product management, cart system, order processing, and payment integration.

---

## 🚀 Features

- 🔐 JWT Authentication (Register/Login)
- 👑 Role-Based Authorization (Admin & Users)
- 📦 Product Management (CRUD)
- 🛒 Cart System (Add, Update, Remove items)
- 📦 Order System (Checkout from cart)
- 💳 Payment Integration (Paystack Checkout + Webhooks)
- 🔄 Automatic order updates after payment
- 🧠 Modular architecture (feature-based structure)

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (Authentication)
- bcryptjs (Password hashing)
- Axios (API requests)
- Crypto (Webhook verification)
- Paystack API

---

## 📁 Project Structure

src/
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   ├── Order.js
│
├── modules/
│   ├── auth/
│   ├── product/
│   ├── cart/
│   ├── order/
│   ├── payment/
│
├── middleware/
│   ├── auth.middleware.js
│   ├── admin.middleware.js
│
├── utils/
│   ├── token.js
│
├── server.js

---

## 🔐 Authentication

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

**Protected Routes Header:**

Authorization: Bearer YOUR_TOKEN

---

## 📦 Product APIs

| Method | Endpoint | Description |
|------|----------|-------------|
| GET | /api/products | Get all products |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

---

## 🛒 Cart System

| Method | Endpoint | Description |
|------|----------|-------------|
| GET | /api/cart | Get user cart |
| POST | /api/cart/add | Add item to cart |
| PUT | /api/cart/update | Update cart item |
| DELETE | /api/cart/remove | Remove item |

---

## 📦 Order System

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | /api/orders | Create order from cart |
| GET | /api/orders/myorders | Get user orders |
| GET | /api/orders | Get all orders (Admin) |
| PUT | /api/orders/:id/deliver | Mark as delivered |

---

## 💳 Payment System

Payment is powered by Paystack.

---

### 🔄 Payment Flow

- User creates order from cart  
- Payment is initialized via Paystack  
- User is redirected to checkout page  
- Payment is completed  
- Paystack sends webhook to backend  
- Order is automatically updated  

---

### 📡 Payment Endpoints

| Method | Endpoint | Description |
|------|----------|-------------|
| POST | /api/payment/initialize | Initialize payment |
| POST | /api/payment/verify | Verify payment |
| POST | /api/payment/webhook | Handle webhook |

---

### 💡 Payment Response

{
  "message": "Payment initialized successfully",
  "paymentUrl": "https://checkout.paystack.com/xxxx",
  "reference": "abc123xyz"
}

---

### 🔐 Webhook Features

- HMAC SHA512 signature verification  
- Secure raw body handling  
- Order lookup via payment reference  
- Automatic payment confirmation  
- Timestamped order updates  

---

## ⚙️ Installation

### 1. Clone repository

git clone https://github.com/YOUR_USERNAME/ecommerce-backend.git
cd ecommerce-backend

---

### 2. Install dependencies

npm install

---

### 3. Create .env file

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_BASE_URL=https://api.paystack.co

---

### 4. Run server

npm run dev

---

## 🧠 Key Concepts Implemented

- Authentication vs Authorization  
- Middleware chaining  
- Modular backend architecture  
- Payment gateway integration  
- Webhook event handling  
- Secure API design  
- Real-time order updates  

---

## 🚀 Future Improvements

- Email notifications after payment  
- Refund system  
- Inventory management  
- Order tracking system  
- Frontend integration (React)  
- Multi-payment gateway support  

---

## 👨‍💻 Author

Favour  
GitHub: https://github.com/hugo-fav  
Portfolio: https://portfolio-z8kd.vercel.app/projects  

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!