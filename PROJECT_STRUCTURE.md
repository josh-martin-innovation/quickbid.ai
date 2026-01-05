# 📁 QuickBid AI - Project Structure

Complete file organization and architecture overview.

## 🗂️ File Tree

```
quickbid-ai/
├── SETUP_GUIDE.md                 # Complete setup instructions
├── PROJECT_STRUCTURE.md           # This file
│
├── quickbid-backend/              # Node.js backend server
│   ├── server.js                  # Main Express server
│   ├── package.json               # Dependencies
│   ├── .env.example               # Environment template
│   ├── .env                       # Your actual API key (DO NOT COMMIT)
│   ├── .gitignore                 # Git ignore rules
│   ├── README.md                  # Backend documentation
│   ├── render.yaml                # Render.com deployment config
│   └── test-api.sh                # API testing script
│
└── quickbid-extension/            # Chrome Extension
    ├── manifest.json              # Extension configuration
    ├── popup.html                 # Extension UI
    ├── popup.js                   # Extension logic
    ├── icon.png                   # Extension icon (128x128)
    ├── create_icon.py             # Script to generate icon
    └── README.md                  # Extension documentation
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Upwork / Fiverr Job Page                 │  │
│  │                                                   │  │
│  │  "Looking for a React developer to build..."    │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          │ Extract job description      │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │       QuickBid AI Chrome Extension               │  │
│  │                                                   │  │
│  │  [🚀 Analyze Job & Generate Proposal]           │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
└──────────────────────────┼──────────────────────────────┘
                           │
                           │ HTTPS POST Request
                           │ { jobDescription: "..." }
                           ▼
         ┌─────────────────────────────────────────┐
         │      Backend Server (Node.js)           │
         │      https://your-backend.com           │
         │                                          │
         │  ┌────────────────────────────────────┐ │
         │  │  1. Receive job description        │ │
         │  │  2. Retrieve KINDO_API_KEY         │ │
         │  │  3. Build AI prompt                │ │
         │  └────────────────────────────────────┘ │
         └─────────────────┬───────────────────────┘
                           │
                           │ HTTPS POST Request
                           │ + API Key in header
                           ▼
              ┌─────────────────────────────┐
              │      Kindo AI API           │
              │   api.kindo.ai/v1/chat      │
              │                             │
              │  - Analyzes job description │
              │  - Generates proposal       │
              │  - Returns structured text  │
              └─────────────────────────────┘
                           │
                           │ JSON Response
                           │ { proposal: "Dear Hiring Manager..." }
                           ▼
         ┌─────────────────────────────────────────┐
         │      Backend Server                     │
         │                                          │
         │  ┌────────────────────────────────────┐ │
         │  │  1. Receive AI response            │ │
         │  │  2. Extract proposal text          │ │
         │  │  3. Return to extension            │ │
         │  └────────────────────────────────────┘ │
         └─────────────────┬───────────────────────┘
                           │
                           │ JSON Response
                           │ { proposal: "...", success: true }
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     USER BROWSER                        │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │       QuickBid AI Chrome Extension               │  │
│  │                                                   │  │
│  │  ✅ Proposal copied to clipboard!               │  │
│  │                                                   │  │
│  │  Preview: "I noticed you need React expertise   │  │
│  │  for your e-commerce project. With 5+ years..." │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│                          │ User pastes (Ctrl+V)         │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Upwork Proposal Box                      │  │
│  │                                                   │  │
│  │  "I noticed you need React expertise for..."    │  │
│  │  [Submit Proposal]                               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Security Flow

### Why We Need a Backend

```
❌ INSECURE (Don't do this):
Chrome Extension → (with API key) → Kindo AI
Problem: Anyone can extract the API key from extension code

✅ SECURE (Our approach):
Chrome Extension → Backend Server → (with API key) → Kindo AI
                    ^
                    |
              API key stays here,
              never sent to browser
```

---

## 📦 Key Files Explained

### Backend Files

#### `server.js`
- **Purpose:** Main Express server that handles API requests
- **Key Functions:**
  - `POST /api/generate-proposal` - Main endpoint
  - Validates job description input
  - Calls Kindo AI with proper authentication
  - Returns formatted proposal
- **Dependencies:** Express, CORS, dotenv

#### `package.json`
- **Purpose:** Defines Node.js dependencies and scripts
- **Key Dependencies:**
  - `express` - Web server framework
  - `cors` - Allow Chrome extension to call API
  - `dotenv` - Load environment variables

#### `.env`
- **Purpose:** Stores sensitive configuration (NEVER commit to Git)
- **Contains:**
  ```
  KINDO_API_KEY=your_secret_key_here
  PORT=3000
  ```

#### `render.yaml`
- **Purpose:** Configuration for deploying to Render.com
- **Defines:** Build commands, start commands, environment

### Extension Files

#### `manifest.json`
- **Purpose:** Chrome Extension configuration file
- **Defines:**
  - Extension name, version, description
  - Permissions (activeTab, storage, scripting, clipboardWrite)
  - Which websites it can access (Upwork, Fiverr, localhost)
  - Popup HTML file and icon

#### `popup.html`
- **Purpose:** The UI that appears when clicking the extension icon
- **Contains:**
  - Button to trigger proposal generation
  - Status message display
  - Styled with inline CSS for modern look

#### `popup.js`
- **Purpose:** All the extension logic
- **Key Functions:**
  - `getJobDescription()` - Extracts text from current webpage
  - `generateProposal()` - Calls backend API
  - `copyToClipboard()` - Copies result to clipboard
  - `checkBackendConnection()` - Verifies backend is reachable

#### `icon.png`
- **Purpose:** Visual identifier for the extension
- **Size:** 128x128 pixels
- **Format:** PNG with transparency
- **Generated by:** `create_icon.py` script

---

## 🔄 Data Flow Step-by-Step

1. **User visits job page:**
   - Opens Upwork/Fiverr job description
   - Clicks QuickBid AI extension icon

2. **Extension extracts text:**
   - `popup.js` injects code into the webpage
   - Searches for job description using CSS selectors
   - Returns extracted text

3. **Extension calls backend:**
   - Sends POST request to `BACKEND_URL/api/generate-proposal`
   - Includes job description in JSON body
   - Backend URL configured in `popup.js` line 2

4. **Backend processes request:**
   - Validates job description exists
   - Loads `KINDO_API_KEY` from environment
   - Constructs AI prompt with system instructions

5. **Backend calls Kindo AI:**
   - POST to `https://api.kindo.ai/v1/chat/completions`
   - Includes API key in headers
   - Sends job description + prompt

6. **Kindo AI generates proposal:**
   - Analyzes job requirements
   - Creates personalized proposal
   - Returns structured JSON response

7. **Backend returns to extension:**
   - Extracts proposal text from AI response
   - Sends back to Chrome extension

8. **Extension shows result:**
   - Copies proposal to clipboard automatically
   - Shows success message
   - Displays preview in popup

9. **User pastes proposal:**
   - Opens proposal box on job platform
   - Presses Ctrl+V (or Cmd+V)
   - Reviews and submits

---

## 🌐 Environment Variables

### Backend (.env file)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `KINDO_API_KEY` | ✅ Yes | Your Kindo AI API key | `kindo_abc123...` |
| `PORT` | ❌ No | Server port (defaults to 3000) | `3000` |
| `NODE_ENV` | ❌ No | Environment (production/development) | `production` |

### Extension (popup.js)

| Variable | Line | Description | Example |
|----------|------|-------------|---------|
| `BACKEND_URL` | 2 | URL of your backend server | `https://quickbid.onrender.com` |

---

## 🚀 Deployment Checklist

### Local Testing
- [ ] Backend: `npm install` → create `.env` → `npm start`
- [ ] Extension: Load unpacked in `chrome://extensions/`
- [ ] Test on real job posting
- [ ] Verify proposal copied to clipboard

### Production Deployment
- [ ] Push backend code to GitHub (without `.env`)
- [ ] Deploy to Render/Railway/Vercel
- [ ] Add `KINDO_API_KEY` environment variable
- [ ] Copy deployed URL
- [ ] Update `BACKEND_URL` in `popup.js`
- [ ] Reload extension in Chrome
- [ ] Test with production backend

### Optional: Chrome Web Store
- [ ] Create developer account ($5 one-time fee)
- [ ] Prepare store listing (screenshots, description)
- [ ] Zip extension folder
- [ ] Submit for review (3-5 days)
- [ ] Publish!

---

## 🔧 Customization Points

### 1. Change AI Model
**File:** `quickbid-backend/server.js`  
**Line:** 29  
```javascript
model: 'claude-3-5-sonnet-20241022', // or 'gpt-4o', 'gemini-pro'
```

### 2. Modify Proposal Style
**File:** `quickbid-backend/server.js`  
**Lines:** 32-39 (system prompt)  
```javascript
content: `Your custom instructions here...`
```

### 3. Adjust Proposal Length
**File:** `quickbid-backend/server.js`  
**Line:** 47  
```javascript
max_tokens: 800, // Increase for longer proposals
```

### 4. Add More Job Platforms
**File:** `quickbid-extension/manifest.json`  
**Lines:** 10-14 (host_permissions)  
```json
"host_permissions": [
  "https://*.upwork.com/*",
  "https://*.freelancer.com/*",
  "https://*.guru.com/*"
]
```

### 5. Change Extension Appearance
**File:** `quickbid-extension/popup.html`  
**Lines:** 5-60 (CSS styles)

---

## 📊 File Size Reference

| File | Size | Purpose |
|------|------|---------|
| `server.js` | ~4KB | Backend logic |
| `popup.js` | ~5KB | Extension logic |
| `popup.html` | ~2KB | Extension UI |
| `manifest.json` | ~500B | Extension config |
| `icon.png` | ~10KB | Extension icon |
| `.env` | ~50B | API key storage |

**Total Extension:** ~17KB  
**Total Backend:** ~5KB (code only, node_modules adds ~30MB)

---

## 🎓 Learning Resources

- **Chrome Extensions:** https://developer.chrome.com/docs/extensions/
- **Express.js:** https://expressjs.com/
- **Kindo AI API:** https://docs.kindo.ai/apidocs/introduction
- **Manifest V3:** https://developer.chrome.com/docs/extensions/mv3/intro/

---

## 🐛 Common Issues & Solutions

### "Module not found: express"
**Solution:** Run `npm install` in backend folder

### "KINDO_API_KEY is not defined"
**Solution:** Create `.env` file with your API key

### "Failed to fetch"
**Solution:** Check backend is running and CORS is enabled

### "Could not find job description"
**Solution:** Make sure you're on the job description page, not search results

---

## 📈 Version History

- **v1.0.0** (2026-01-02)
  - Initial release
  - Support for Upwork and Fiverr
  - Kindo AI integration
  - Clipboard copy functionality

---

## 🤝 Contributing

Want to improve this project? Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ for freelancers everywhere**
