# QuickBid AI Chrome Extension

AI-powered freelance proposal generator that analyzes job descriptions and creates personalized proposals in seconds.

## 🚀 Features

- ✅ Works on Upwork, Fiverr, Freelancer.com
- ✅ Generates personalized proposals using Kindo AI
- ✅ Copies proposal to clipboard automatically
- ✅ Secure backend architecture (API key never exposed)
- ✅ Beautiful, modern UI

## 📦 Installation

### Step 1: Install the Extension

1. Download or clone this folder
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `quickbid-extension` folder
6. The extension icon should appear in your toolbar

### Step 2: Set Up the Backend

The extension requires a backend server to securely communicate with Kindo AI.

**Choose one option:**

#### Option A: Run Locally (For Testing)
```bash
cd ../quickbid-backend
npm install
cp .env.example .env
# Edit .env and add your Kindo API key
npm start
```

#### Option B: Deploy to Render.com (Free)
1. Push the `quickbid-backend` folder to GitHub
2. Go to [render.com](https://render.com) → "New +" → "Web Service"
3. Connect your repo
4. Add environment variable: `KINDO_API_KEY=your_key`
5. Deploy!
6. Copy your deployed URL (e.g., `https://quickbid-backend.onrender.com`)

#### Option C: Deploy to Railway.app (Free)
1. Visit [railway.app](https://railway.app)
2. "Deploy from GitHub repo"
3. Add environment variable: `KINDO_API_KEY`
4. Copy your deployed URL

### Step 3: Update Extension with Backend URL

1. Open `popup.js` in the extension folder
2. Find line 2: `const BACKEND_URL = 'http://localhost:3000';`
3. Change it to your deployed URL:
   ```javascript
   const BACKEND_URL = 'https://your-backend.onrender.com';
   ```
4. Go back to `chrome://extensions/`
5. Click the refresh icon on your extension

## 🎯 How to Use

1. Navigate to a job posting on Upwork or Fiverr
2. Click the QuickBid AI extension icon in your toolbar
3. Click "🚀 Analyze Job & Generate Proposal"
4. Wait 5-10 seconds
5. Proposal is automatically copied to clipboard!
6. Paste into the proposal box and customize if needed

## 🛠️ Customization

### Change AI Model
Edit `server.js` in the backend:
```javascript
model: 'gpt-4', // Change to 'claude-3-5-sonnet-20241022' or other Kindo models
```

### Adjust Proposal Length
Edit `server.js`:
```javascript
max_tokens: 500, // Increase for longer proposals
```

### Modify Proposal Style
Edit the system prompt in `server.js` to change tone/structure.

## 🔒 Security

- ✅ API key stored server-side only
- ✅ CORS enabled for extension origin
- ✅ No sensitive data in extension code
- ⚠️ Add rate limiting for production use

## 🐛 Troubleshooting

**"Backend not connected" error:**
- Verify backend is running (`curl http://localhost:3000`)
- Check CORS is enabled in `server.js`
- Ensure `BACKEND_URL` in `popup.js` matches your server

**"Could not find job description" error:**
- Try clicking the button while on the actual job description page
- Check browser console for errors (F12 → Console)

**API errors:**
- Verify your Kindo API key is correct
- Check you have sufficient Kindo credits
- Review backend logs for detailed error messages

## 📈 Monetization Ideas

1. **Freemium:** 5 free proposals/month, $15/mo unlimited
2. **White Label:** Sell to freelance agencies for $500-2000
3. **Source Code Sale:** List on SideProjectors/Acquire.com
4. **Upsells:** Resume analyzer, bid tracking, win rate analytics

## 📝 Next Steps

- [ ] Add user resume storage
- [ ] Track proposal success rate
- [ ] Multi-language support
- [ ] Custom templates per industry
- [ ] Analytics dashboard

## 🤝 Support

Need help? Check the backend README for deployment guides and API documentation.

---

**Built with ❤️ using Kindo AI**
