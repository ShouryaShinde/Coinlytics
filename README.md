# 💰 Coinlytics — Real-Time Cryptocurrency Dashboard

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-4B32C3?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**Coinlytics** is a real-time cryptocurrency dashboard that allows users to **track live coin prices, market trends, and latest news**. Built with Node.js, Express, and EJS, this dashboard provides a sleek and responsive UI for crypto enthusiasts.

---

## 🚀 Features
✅ **Global Crypto Stats** — Total Market Cap, 24h Volume, BTC Dominance, and Fear & Greed Index  
✅ **Top 10 Cryptocurrencies** — Real-time price, 24h % change, market cap, and trading volume  
✅ **Coin Search** — Search for any cryptocurrency and view detailed info  
✅ **News Updates** — Latest cryptocurrency news headlines  
✅ **Modern UI** — Clean, responsive, and interactive dashboard using Bootstrap  
✅ **API-Driven** — Real-time data from CoinGecko and NewsData.io  

---

## 🧩 Tech Stack

| Layer | Technologies |
|:------|:--------------|
| **Frontend** | EJS / HTML / CSS / JavaScript / Bootstrap |
| **Backend** | Node.js / Express.js |
| **APIs** | CoinGecko API, NewsData.io API |
| **Deployment** | Render |

---

## 📂 Project Structure
```
Coinlytics/
│
├── public/ # Static assets (CSS, JS, images)
│ ├── styles/
│ └── images/
├── views/ # EJS templates
│ ├── index.ejs
│ ├── coin.ejs
│ ├── news.ejs
│ ├── coinsearch.ejs
│ └── partials/ # Header & Footer includes
├── app.js # Main server file
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YourUsername/Coinlytics.git
cd Coinlytics
```

### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Set up environment variables
```bash
Create a .env file in the root directory:
NEWS_API_KEY=your_newsdata_api_key
```

4️⃣ Run the app locally
```bash
npm start
```
Visit: http://localhost:3000

---

## 🧠 How It Works

1. **Fetch Global & Coin Data** 📊  
   Uses **CoinGecko API** to retrieve top cryptocurrencies and global stats.

2. **Search & Details** 🔍  
   Search any coin to view its logo, symbol, name, market cap, price, and trends.

3. **Latest News** 📰  
   Fetches cryptocurrency news headlines using **NewsData.io API**, displaying only the first 150 characters for readability.

4. **Interactive Dashboard** 🎨  
   Responsive tables and cards with trend indicators, hover effects, and visual enhancements.

---

## ⚡ Notes

- The deployed app may occasionally show “Data Unavailable” due to API rate limits.  
- Local deployment provides full functionality and faster updates.

---

## 🧑‍💻 Author

**Shourya Anil Shinde** — Full Stack Developer & Designer

---

## 🔗 Connect With Me

- [Instagram](https://www.instagram.com/shourya_shinde_96k)  
- [LinkedIn](https://www.linkedin.com/in/shourya-shinde/)

---

## 🛡️ License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⭐ Support
If you find **Coinlytics** helpful, give it a ⭐ star on GitHub and share it with your network!

> “Track cryptocurrency markets efficiently — one dashboard at a time.”
