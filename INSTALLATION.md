# 📦 QuickBid AI v1.1.0 - Installation Guide

## Quick Install (5 Minutes)

### Prerequisites
- Google Chrome browser
- Node.js 18+ (for backend)
- Kindo AI API key

---

## Option 1: Fresh Installation

### Step 1: Clone/Download Repository

```bash
# If using Git
git clone <your-repo-url>
cd quickbid-ai

# Or download and extract ZIP file
```

### Step 2: Set Up Backend

```bash
cd quickbid-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your Kindo API key
nano .env  # or use any text editor
# Add: KINDO_API_KEY=your_api_key_here

# Start backend
npm start
```

You should see:
```
🚀 QuickBid AI Backend running on port 3000
📡 API endpoint: http://localhost:3000/api/generate-proposal
```

### Step 3: Install Chrome Extension

1. Open Chrome and navigate to: `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `quickbid-extension` folder
5. Extension should appear in toolbar with ⚡ icon

### Step 4: Set Up Your Profile

1. Click the QuickBid AI icon in Chrome toolbar
2. Click the ⚙️ settings button
3. Fill in your professional information:
   - **Required:** Full Name, Title, Summary (100+ chars)
   - **Recommended:** Skills, Experience, Achievements
4. Click **💾 Save Profile**
5. Click **← Back** to return to main popup

### Step 5: Test It!

1. Navigate to any Upwork or Fiverr job posting
2. Click the extension icon
3. Verify profile status shows: "✅ Profile: Your Name"
4. Click **🚀 Analyze Job & Generate Proposal**
5. Wait 5-10 seconds
6. Paste (Ctrl+V) into a text editor to see your proposal

**Done! 🎉**

---

## Option 2: Update from v1.0.0

Already have v1.0.0 installed? See [UPDATE_GUIDE.md](UPDATE_GUIDE.md)

```bash
# 1. Pull latest changes
git pull origin main

# 2. Restart backend (no npm install needed)
cd quickbid-backend
npm start

# 3. Reload extension in Chrome
# Go to chrome://extensions/ → Find QuickBid AI → Click reload icon
```

---

## Option 3: Production Deployment

### Deploy Backend to Render.com (Free Tier)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [render.com](https://render.com)
   - Sign up/login
   - Click **New +** → **Web Service**
   - Connect your GitHub repo
   - Settings:
     - **Name:** quickbid-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free
   - Add environment variable:
     - Key: `KINDO_API_KEY`
     - Value: `your_api_key_here`
   - Click **Create Web Service**

3. **Update Extension**
   - Wait for deployment to complete
   - Copy your Render URL (e.g., `https://quickbid-backend.onrender.com`)
   - Edit `quickbid-extension/popup.js`
   - Change line 2:
     ```javascript
     const BACKEND_URL = 'https://your-render-url.onrender.com';
     ```
   - Reload extension in Chrome

4. **Update Manifest for Production** (Optional but recommended)
   - Edit `quickbid-extension/manifest.json`
   - Remove localhost from host_permissions:
     ```json
     "host_permissions": [
       "https://*.upwork.com/*",
       "https://*.fiverr.com/*",
       "https://*.freelancer.com/*",
       "https://your-render-url.onrender.com/*"
     ]
     ```

---

## Verification Checklist

After installation, verify:

- [ ] Backend responds at `http://localhost:3000` (or your deployed URL)
- [ ] Extension appears in Chrome toolbar
- [ ] Extension version shows **1.1.0** in popup footer
- [ ] Settings button (⚙️) visible in extension popup
- [ ] Can open settings page
- [ ] Can save profile successfully
- [ ] Profile persists after closing/reopening extension
- [ ] Proposal generation works
- [ ] Generated proposals include your profile info

---

## Troubleshooting

### Backend won't start

**Error:** `Module not found: express`
```bash
cd quickbid-backend
npm install
```

**Error:** `KINDO_API_KEY is not defined`
- Create `.env` file in `quickbid-backend` folder
- Add: `KINDO_API_KEY=your_key_here`
- Restart backend

### Extension won't load

**Error:** Manifest file is missing or unreadable
- Make sure you selected the `quickbid-extension` folder
- Check that `manifest.json` exists in that folder

**Error:** Permissions warnings
- These are normal for Chrome extensions
- Click "Continue" to proceed

### Settings page blank

1. Reload extension: `chrome://extensions/` → Find extension → Click reload
2. Check browser console (F12) for errors
3. Verify `settings.html` and `settings.js` exist in extension folder

### Profile not saving

1. Check Chrome storage permissions in `chrome://extensions/`
2. Try reloading extension
3. Check browser console for errors
4. Verify required fields are filled (Name, Title, Summary 100+ chars)

### Proposals don't include profile

1. Verify profile saved: Check main popup shows "✅ Profile: Name"
2. If not, re-save profile in settings
3. Check backend is running
4. Verify `BACKEND_URL` in `popup.js` is correct

### Backend connection error

**Message:** "⚠️ Backend not connected"

Local development:
```bash
# Check if backend is running
curl http://localhost:3000

# If not, start it
cd quickbid-backend
npm start
```

Production:
- Verify Render deployment is active
- Check `BACKEND_URL` in `popup.js` matches your Render URL
- Test backend: `curl https://your-backend.onrender.com`

---

## File Structure After Installation

```
quickbid-ai/
├── quickbid-backend/
│   ├── node_modules/          ← Created after npm install
│   ├── .env                   ← You create this
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── render.yaml
│   ├── server.js
│   └── test-api.sh
│
├── quickbid-extension/
│   ├── icon.png
│   ├── manifest.json          ← Version 1.1.0
│   ├── popup.html             ← Updated with settings button
│   ├── popup.js               ← Updated with profile logic
│   ├── settings.html          ← NEW in v1.1.0
│   ├── settings.js            ← NEW in v1.1.0
│   └── ...
│
├── README.md
├── CHANGELOG.md               ← NEW in v1.1.0
├── PROFILE_FEATURE.md         ← NEW in v1.1.0
├── UPDATE_GUIDE.md            ← NEW in v1.1.0
├── INSTALLATION.md            ← This file
└── ...
```

---

## Next Steps After Installation

1. **Set up your profile** (if not done yet)
   - Click ⚙️ in extension
   - Fill in all required fields
   - Save profile

2. **Test on real job postings**
   - Visit Upwork or Fiverr
   - Generate 2-3 proposals
   - Compare quality vs. generic proposals

3. **Refine your profile**
   - Update based on which info appears most in proposals
   - Add more specific achievements
   - Include keywords from jobs you want

4. **Optional: Publish to Chrome Web Store**
   - See [Chrome Web Store Developer Documentation](https://developer.chrome.com/docs/webstore/publish/)
   - $5 one-time registration fee
   - 3-5 day review process

---

## Support Resources

- **Documentation:**
  - [PROFILE_FEATURE.md](PROFILE_FEATURE.md) - Profile system guide
  - [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup
  - [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Architecture
  - [QUICKSTART.md](QUICKSTART.md) - Quick reference

- **Testing:**
  - [TEST_CHECKLIST.md](TEST_CHECKLIST.md) - Verify everything works

- **Help:**
  - GitHub Issues
  - Email: support@quickbidai.com
  - Documentation: All .md files in project root

---

## Uninstall

### Remove Extension
1. Go to `chrome://extensions/`
2. Find QuickBid AI
3. Click **Remove**
4. Confirm removal

### Stop Backend
```bash
# If running locally, press Ctrl+C in terminal

# If deployed on Render, delete the service from dashboard
```

### Delete Data
```bash
# Delete entire project
rm -rf quickbid-ai/

# Profile data in Chrome is automatically removed when extension is uninstalled
```

---

## Security Notes

### What Gets Installed
- **Backend:** Local Node.js server on port 3000
- **Extension:** Files in Chrome's extension directory
- **Profile:** Stored in Chrome's sync storage (encrypted)

### What Data is Collected
- **None by default** - All data stays on your machine
- **During proposal generation:** Job description + profile sent to your backend → Kindo AI
- **Your API key:** Only stored in backend `.env` file or Render environment

### Permissions Required
- **activeTab:** Read job description from current page
- **storage:** Save your profile locally
- **scripting:** Extract text from webpage
- **clipboardWrite:** Copy proposal to clipboard

All permissions are standard for this type of extension and comply with Chrome Web Store policies.

---

## FAQ

**Q: Do I need to keep the backend running?**
A: Yes, if using localhost. Or deploy to Render (free) for always-on access.

**Q: Will my profile sync across computers?**
A: Yes, if Chrome Sync is enabled in your browser settings.

**Q: Can I use this without setting up a profile?**
A: Yes! It works without a profile but proposals will be more generic.

**Q: How much does Kindo AI cost?**
A: Check [Kindo AI pricing](https://kindo.ai/pricing) - they offer free tier.

**Q: Can I sell this or modify it?**
A: Yes, it's MIT licensed. See LICENSE file.

**Q: Does it work on Firefox/Edge?**
A: Currently Chrome only. Firefox/Edge support planned for future versions.

**Q: Is my data secure?**
A: Yes. Profile stored locally, API key on your backend. See [Security Notes](#security-notes).

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

**Current Version:** 1.1.0  
**Release Date:** January 5, 2026  
**Major Feature:** User Profile Management System

---

**Questions?** Open an issue on GitHub or check the documentation files!

**Enjoy QuickBid AI! 🚀**
