# ⚡ QuickBid AI v1.3.0 - Quick Install Guide

## 📥 Download

**[Download QuickBid AI v1.3.0](https://usable-prod.s3-accelerate.amazonaws.com/sandbox_artifacts/cm9a89dty03b18o018iialhpo/1767638200437-154486-quickbid-ai-v1.3.0-complete.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUZM7R2KBGF6Y4KXS%2F20260105%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260105T183640Z&X-Amz-Expires=172800&X-Amz-Signature=b951c09275b78fd008bd7e63a1d48fe8ca2efa1f3fcc14653ad6f51f94124558&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22quickbid-ai-v1.3.0-complete.zip%22&x-amz-checksum-mode=ENABLED&x-id=GetObject)**

---

## 🚀 5-Minute Setup

### Step 1: Extract Files
```powershell
# Extract to your Projects folder
# Result: C:\Users\jlmar\Projects\quickbid-ai\
```

### Step 2: Setup Backend
```powershell
# Navigate to backend
cd C:\Users\jlmar\Projects\quickbid-ai\quickbid-backend

# Install dependencies
npm install

# Configure API key
notepad .env
# Add this line:
# KINDO_API_KEY=c8f0fe2c-9...  (your actual key)

# Start backend
npm start
```

**You should see:**
```
🚀 QuickBid AI Backend running on port 3000
🔗 Using Kindo LLM API: https://llm.kindo.ai
🤖 Model: azure/gpt-4o
📄 Resume parsing: http://localhost:3000/api/parse-resume
🔗 LinkedIn import: http://localhost:3000/api/parse-linkedin
✅ KINDO_API_KEY loaded successfully
```

### Step 3: Install Extension
```
1. Open Chrome: chrome://extensions/
2. Turn ON "Developer mode" (top-right)
3. Click "Load unpacked"
4. Select folder: C:\Users\jlmar\Projects\quickbid-ai\quickbid-extension
5. Extension appears with ⚡ icon
```

### Step 4: Setup Profile (Choose One Method)

#### Option A: Upload Resume (Fastest!)
```
1. Click extension icon
2. Click ⚙️ settings
3. Click "📄 Upload Resume" tab
4. Drop your resume PDF
5. Click "🤖 Parse Resume with AI"
6. Wait 10 seconds
7. Switch to "✏️ Manual Entry" tab
8. Review/edit extracted data
9. Click "💾 Save Profile"
```

#### Option B: Import from LinkedIn
```
1. Go to your LinkedIn profile
2. Copy URL (e.g., linkedin.com/in/yourname)
3. Open QuickBid settings
4. Click "🔗 LinkedIn Import" tab
5. Paste URL
6. Click "🔗 Extract"
7. Wait 15 seconds
8. Switch to "✏️ Manual Entry" tab
9. Review/edit
10. Save!
```

#### Option C: Manual Entry
```
1. Click ⚙️ settings
2. Click "✏️ Manual Entry" tab
3. Fill in all fields
4. Save
```

### Step 5: Generate Your First Proposal!
```
1. Go to any Upwork/Fiverr job
2. Click QuickBid AI icon
3. Click "🚀 Analyze Job & Generate Proposal"
4. Watch the progress bar
5. See the preview
6. Paste (Ctrl+V)!
```

---

## ✅ Verification Checklist

Backend:
- [ ] npm install completed
- [ ] .env file has your API key
- [ ] Backend starts without errors
- [ ] Shows "azure/gpt-4o" model
- [ ] Shows resume/LinkedIn endpoints

Extension:
- [ ] Loaded in Chrome
- [ ] Version shows 1.3.0
- [ ] Settings has 3 tabs
- [ ] Upload tab has drag & drop area
- [ ] LinkedIn tab has URL input

Profile Setup:
- [ ] Chose a setup method
- [ ] Data extracted (if using upload/LinkedIn)
- [ ] Reviewed all fields
- [ ] Saved successfully
- [ ] Main popup shows "✅ Profile: Your Name"

Testing:
- [ ] Visited Upwork job
- [ ] Generated proposal
- [ ] Proposal matches the job
- [ ] Copied to clipboard
- [ ] Preview shows stats

---

## 🎯 What's Fixed

### Major Issues Resolved:
1. ✅ **Kindo API authentication** - Now works!
2. ✅ **Correct endpoint** - llm.kindo.ai
3. ✅ **Correct model** - azure/gpt-4o
4. ✅ **Better job matching** - Proposals more relevant
5. ✅ **Improved extraction** - Better Upwork selectors

### New Capabilities:
1. ✅ **Resume upload** - 1-minute profile setup
2. ✅ **LinkedIn import** - 2-minute profile setup
3. ✅ **AI parsing** - Automatic data extraction
4. ✅ **Tabbed interface** - Clean, organized settings

---

## 💡 Pro Tips

### For Resume Upload:
- Use your most recent resume
- PDF format works best
- Make sure resume has clear sections
- Review AI extraction - edit if needed

### For LinkedIn:
- Update LinkedIn profile first
- Make profile public temporarily
- Add detailed About section
- List all relevant skills

### For Best Proposals:
- Tailor your profile to jobs you want
- Use keywords from target jobs
- Quantify achievements with numbers
- Keep summary 200-500 characters

---

## 🐛 Troubleshooting

### "Failed to parse resume"
- Check file format (PDF, DOCX, TXT only)
- Make sure file isn't corrupted
- Try converting to plain text
- Use manual entry as fallback

### "Could not access LinkedIn profile"
- Make sure profile is public
- Try logging into LinkedIn first
- LinkedIn may block automated access
- **Workaround:** Copy LinkedIn text, paste as TXT, upload as resume

### "Backend not connected"
- Make sure you're in quickbid-backend folder
- Run: `npm start`
- Check .env file has API key

### "Model not supported"
- Make sure model is `azure/gpt-4o`
- Check endpoint is `llm.kindo.ai`
- Verify API key is correct

---

## 🎉 What You Can Do Now

1. ✅ Upload resume for instant profile setup
2. ✅ Import from LinkedIn in one click
3. ✅ Generate job-relevant proposals
4. ✅ See proposal preview with stats
5. ✅ Copy again without regenerating
6. ✅ Use keyboard shortcuts
7. ✅ Auto-retry on network issues
8. ✅ Smooth animations everywhere

---

## 📞 Need Help?

**Documentation:**
- RESUME_IMPORT_FEATURE.md - New features guide
- INSTALLATION.md - Detailed setup
- PROFILE_FEATURE.md - Profile system

**Support:**
- GitHub Issues
- Email: support@quickbidai.com

---

**Enjoy QuickBid AI v1.3.0!** 🚀

**Setup time:** 5 minutes  
**First proposal:** 30 seconds after setup  
**Time saved per proposal:** 15 minutes  
**ROI:** Immediate! 💰
