# AI Workflow Automation System (React + n8n)

## 🚀 Overview
This project is a form-based web application that collects user input and triggers automated workflows using n8n.  
It demonstrates integration between frontend UI and backend automation pipelines.

---

## ⚙️ Tech Stack
- Frontend: React
- Backend Automation: n8n
- API Communication: Webhooks
- Deployment:Localhost (frontend)

---

## 🔄 How It Works
1. User fills out a form in the React app  
2. Data is sent via webhook  
3. n8n workflow processes the data  
4. Response is generated and returned to frontend  

---

## 🌐 Live Demo
The frontend is deployed and accessible.

⚠️ Note:
The live demo uses a mocked response due to webhook limitations.
The complete workflow (including backend automation) can be tested locally using the provided workflow.json.

🎥 A full working demonstration is available in the demo video.
https://www.loom.com/share/77647c507db24cd38b59ecc5d0839cfb


---

## 📂 n8n Workflow
- Import the provided `Workflow.json` and `Data from notion.json` into n8n  
- Configure webhook URL if needed  

---

## 🛠️ Setup Instructions

### Frontend
```bash
npm install
npm start
