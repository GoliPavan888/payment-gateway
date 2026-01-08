# 💳 Payment Gateway

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📝 Overview
A fully functional **payment gateway system** that supports **merchant onboarding, order creation, multi-method payments (UPI & Card), hosted checkout**, and a **merchant dashboard** with real-time transaction statistics.

---

## ✨ Features
* **Merchant Authentication:** API Key & Secret based authentication
* **Order Management:** Create and retrieve orders with proper lifecycle
* **Multi-Method Payments:** Support for UPI & Card payments
* **Hosted Checkout:** Public checkout flow with payment simulation
* **Real-time Dashboard:** Merchant dashboard with transaction statistics
* **Deterministic Testing:** TEST_MODE for evaluation consistency
* **Dockerized:** Single-command deployment with Docker Compose

---

## 🏗 Architecture

### Backend Services
* **API Server:** Node.js + Express for payment processing
* **Database:** PostgreSQL for persistent storage
* **Authentication:** API Key/Secret with middleware validation

### Frontend Components
* **Merchant Dashboard:** React-based dashboard for analytics
* **Checkout Page:** Hosted payment page with UPI/Card options

### Design Decisions
* **Simulation-Based:** No real payment processing, focused on architecture
* **RESTful API:** Clean API design following payment industry standards
* **Test Mode:** Configurable success rates for evaluation
* **Health Monitoring:** Comprehensive health check endpoints

---

## 🛠 Setup Instructions

### Prerequisites
* Docker & Docker Compose
* Git

### Installation
1. **Clone and navigate:**
   ```bash
   git clone <your-repo-url>
   cd payment-gateway

2. **Start Docker Environment:**
   ```bash
   docker-compose up -d --build

### 📱 API Reference

## Test Merchant Credentials
* **API Key:** key_test_abc123

* **API Secret:** secret_test_xyz789

### Execution
1. **Health Check:**
   ```bash
   GET http://localhost:8000/health

2. **Create Order:**
   ```bash
   POST /api/v1/orders
   Headers: X-Api-Key: key_test_abc123, X-Api-Secret: secret_test_xyz789
   Body: {"amount": 50000}

3. **Create Payment:**
   ```bash
   POST /api/v1/payments
   Body: {"order_id": "order_xxx", "method": "upi", "vpa": "user@paytm"}

### 🌐 Frontend Access
1. **Merchant Dashboard**
   ```bash
   http://localhost:3000/dashboard
2. **Checkout Page**
   ```bash
   http://localhost:3001/checkout?order_id=ORDER_ID

3. **⚙️ Test Mode Configuration**
   ```bash
   TEST_MODE=true
   TEST_PAYMENT_SUCCESS=true
   TEST_PROCESSING_DELAY=500

## 🔒 Security Considerations
* **MNo Real Data:** All payments are simulated
* **API Security:** Key/Secret authentication
* **Input Validation:** Comprehensive validation on all endpoints