# ⚡ QuickBid AI - 5-Minute Quick Start

Get your AI proposal generator running in 5 minutes!

## 🎯 Prerequisites

- ✅ Kindo AI API key
- ✅ Node.js 18+ installed
- ✅ Chrome browser

---

## 🚀 3 Commands to Get Started

### 1. Set Up Backend (2 minutes)

```bash
cd quickbid-backend
npm install
cp .env.example .env
```

Now edit `.env` and paste your Kindo API key:
```
KINDO_API_KEY=your_key_here
```

Start the server:
```bash
npm start
```

✅ You should see: "🚀 QuickBid AI Backend running on port 3000"

---

### 2. Install Extension (2 minutes)

1. Open Chrome → `chrome://extensions/`
2. Toggle "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `quickbid-extension` folder
5. Pin the extension to your toolbar

✅ You should see the QuickBid AI icon in your toolbar

---

### 3. Test It! (1 minute)

1. Go to any Upwork job: https://www.upwork.com/nx/search/jobs/
2. Open a job description
3. Click the QuickBid AI extension icon
4. Click "🚀 Analyze Job & Generate Proposal"
5. Wait 5-10 seconds
6. Press Ctrl+V anywhere to paste your AI-generated proposal!

✅ Done! You just created your first AI-powered proposal!

---

## 🌐 Want to Deploy? (Optional)

**Deploy backend to Render.com (Free):**

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect repo → Add env var `KINDO_API_KEY`
4. Deploy!
5. Update `popup.js` line 2 with your Render URL
6. Reload extension in Chrome

---

## 📚 Need More Details?

- **Full setup guide:** See `SETUP_GUIDE.md`
- **Architecture:** See `PROJECT_STRUCTURE.md`
- **Troubleshooting:** See backend `README.md`

---

## 💡 Pro Tips

- Keep proposals under 250 words for best results
- Customize the AI prompt in `server.js` for your niche
- Test on 10 jobs and refine the prompt
- Add your resume context in `popup.js` for better personalization

---

**Happy freelancing! 🎉**
