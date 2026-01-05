# 🔄 Switch to OpenAI API (Alternative)

If you're having trouble with Kindo API keys, you can use OpenAI directly instead.

---

## ✅ Quick Setup

### Step 1: Get OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)
5. **Save it somewhere safe** - you can only see it once!

### Step 2: Update Backend

```bash
cd quickbid-backend

# Backup current server.js
cp server.js server-kindo.js.backup

# Copy OpenAI version
cp server-openai.js server.js

# Update .env file
notepad .env
# Or: code .env
```

### Step 3: Configure .env

Replace the contents with:
```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

### Step 4: Restart Backend

```bash
npm start
```

You should see:
```
🚀 QuickBid AI Backend running on port 3000
📡 API endpoint: http://localhost:3000/api/generate-proposal
Using OpenAI API directly
✅ OPENAI_API_KEY loaded successfully
   Key starts with: sk-proj-...
```

---

## 💰 OpenAI Pricing

OpenAI charges per token:

### gpt-4o-mini (Recommended for testing)
- **Input:** $0.15 per 1M tokens (~$0.0002 per proposal)
- **Output:** $0.60 per 1M tokens (~$0.0003 per proposal)
- **Total per proposal:** ~$0.0005 (half a cent)

### gpt-4o (Best quality)
- **Input:** $2.50 per 1M tokens (~$0.003 per proposal)
- **Output:** $10.00 per 1M tokens (~$0.005 per proposal)
- **Total per proposal:** ~$0.008 (less than 1 cent)

**Example:** 100 proposals with gpt-4o-mini = ~$0.05 (5 cents)

---

## 🔄 Switching Back to Kindo

If you get a Kindo API key later:

```bash
cd quickbid-backend

# Restore Kindo version
cp server-kindo.js.backup server.js

# Update .env
KINDO_API_KEY=your-kindo-key
PORT=3000

# Restart
npm start
```

---

## ⚙️ Model Options

Edit `server.js` line 43 to change models:

### For OpenAI:
```javascript
model: 'gpt-4o-mini',        // Cheapest, fast, good quality
model: 'gpt-4o',             // Best quality, more expensive
model: 'gpt-4-turbo',        // Balanced
```

### For Kindo (when you have correct key):
```javascript
model: 'gpt-4o',             // OpenAI GPT-4o
model: 'claude-3-5-sonnet',  // Anthropic Claude
model: 'gemini-pro',         // Google Gemini
```

---

## 🎯 Comparison

| Feature | Kindo AI | OpenAI Direct |
|---------|----------|---------------|
| Setup difficulty | Medium (need correct key) | Easy (clear documentation) |
| Cost | Varies by plan | Pay-as-you-go |
| Models | Multiple (GPT, Claude, Gemini) | OpenAI only (GPT) |
| Rate limits | Depends on plan | Depends on tier |
| Best for | Multi-model access | Simple, proven setup |

---

## 🐛 Troubleshooting

### "OPENAI_API_KEY is not set"
- Check .env file exists in quickbid-backend folder
- Verify key starts with `sk-`
- No quotes around the key
- Restart backend after changing .env

### "Invalid API key"
- Key must start with `sk-` (not `c8f0fe2c-9...`)
- Copy the full key from OpenAI dashboard
- Make sure you created a "secret key" not "API key ID"

### "Rate limit exceeded"
- Free tier has lower limits
- Add payment method to OpenAI account
- Wait a few minutes and try again

---

## 📞 Support

- **OpenAI Docs:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **API Keys:** [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- **Pricing:** [openai.com/pricing](https://openai.com/pricing)

---

**This is a temporary workaround. Once you find your Kindo API key, you can switch back!**
