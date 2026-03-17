# 🚀 CP Analyzer – AI-Powered Codeforces Assistant

A Chrome Extension that analyzes competitive programming problems and user solutions using **GenAI**, providing insights like **time complexity, space complexity, correctness, and optimal solutions**.

Built with **Manifest V3**, **Vanilla JavaScript**, and a scalable backend powered by **Node.js, Redis, and Groq API (LLaMA models)**.

---

## ✨ Features

* 🧠 AI-powered code analysis (correctness + optimization)
* ⚡ Time & Space Complexity detection
* 🧩 Suggests optimal solution if code is inefficient
* 🔍 Works directly on problem pages (e.g., Codeforces)
* 🚀 Fast responses using Redis caching
* 🔒 Secure API with rate limiting & validation
* 📄 Clean and lightweight UI

---

## 🧱 Tech Stack

### 🖥️ Chrome Extension

* Manifest V3
* Vanilla JavaScript (`content.js`, `background.js`)
* HTML + CSS (UI)
* Chrome Extension APIs

### ⚙️ Backend

* Node.js + Express.js
* Redis (Caching Layer)
* Zod (Schema Validation)
* Groq API (LLaMA 3 Models)
* Rate Limiting Middleware

---

## 📁 Project Structure

```id="cz9u42"
cp-analyzer-extension/
│
├── manifest.json
├── content.js        # Extracts problem + user code
├── background.js     # Handles API communication
├── popup.html        # UI
├── popup.js
├── styles.css
│
├── server/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   │   └── ai.js     # Groq + Zod logic
│   │   └── caching.js   

│   
│   └── server.js
```

---

## ⚙️ How It Works

1. **Content Script**

   * Extracts problem title, description, and user code from the webpage

2. **Background Script**

   * Sends data to backend API

3. **Backend Processing**

   * Validates input using Zod
   * Applies rate limiting
   * Checks Redis cache
   * Calls Groq API if needed

4. **AI Response**

   * Returns:

     * Time Complexity
     * Space Complexity
     * Code correctness
     * Optimal solution (if needed)
     * Explanation

---

## 🔄 Data Flow

```id="mgbn3i"
User → Chrome Extension → Background Script → Express API
→ Redis Cache → Groq API → Response → UI
```

---

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash id="ivfpo5"
git clone https://github.com/your-username/cp-analyzer-extension.git
cd cp-analyzer-extension
```

---

### 2. Setup Backend

```bash id="jdmj77"
cd server
npm install
```

Create `.env` file:

```id="8ahp05"
PORT=3000
GROQ_API_KEY=your_api_key
REDIS_URL=your_redis_url
```

Run server:

```bash id="j29z0a"
npm run dev
```

---

### 3. Load Extension in Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the extension folder

---

## 🔐 Security & Performance

* ✅ Zod validation for safe API inputs
* ✅ Rate limiting to prevent abuse
* ✅ Redis caching to reduce API calls
* ✅ Structured JSON schema for reliable AI output

---

## 📌 Use Cases

* Competitive programming practice
* Code review & optimization
* Learning data structures & algorithms
* Interview preparation

---





