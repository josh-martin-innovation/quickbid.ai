# ✅ Testing Checklist for v1.1.0

Use this checklist to verify the profile feature works correctly.

---

## 📋 Pre-Test Setup

- [ ] Backend is running (local or deployed)
- [ ] Extension loaded in Chrome (`chrome://extensions/`)
- [ ] Extension version shows **1.1.0** in popup
- [ ] No console errors in extension (Right-click → Inspect → Console)

---

## 🧪 Test 1: Settings Page Access

### Steps:
1. Click QuickBid AI extension icon
2. Look for ⚙️ icon in top-right corner
3. Click the ⚙️ icon

### Expected Results:
- [ ] Settings page opens
- [ ] Page shows "⚙️ Profile Settings" header
- [ ] Blue info box visible at top
- [ ] All form fields are empty (first time)
- [ ] "← Back" button visible
- [ ] Character counter shows "0 characters" in red

---

## 🧪 Test 2: Profile Creation

### Steps:
1. In settings page, fill in:
   - **Full Name:** "John Smith"
   - **Professional Title:** "Full-Stack Developer"
   - **Professional Summary:** (Type at least 200 characters)
     > "I'm a full-stack developer with 6 years of experience building scalable web applications. I specialize in React, Node.js, and cloud architecture. Recently completed projects include an e-commerce platform handling 10K+ daily users and a SaaS dashboard with real-time analytics."
   - **Skills:** "React, Node.js, Python, AWS"
   - **Experience:** "6+ years"

2. Watch character counter while typing summary
3. Click "💾 Save Profile"

### Expected Results:
- [ ] Character counter updates in real-time
- [ ] Counter turns **red** when < 200 chars
- [ ] Counter turns **green** when 200-500 chars
- [ ] Success message appears: "✅ Profile saved successfully!"
- [ ] Message auto-hides after 3 seconds

---

## 🧪 Test 3: Profile Persistence

### Steps:
1. Click "← Back" button
2. Close extension popup
3. Open extension popup again
4. Note the profile status message

### Expected Results:
- [ ] Profile status shows: "✅ Profile: John Smith"
- [ ] "Edit →" link is visible next to profile name
- [ ] No "No profile set up" message

---

## 🧪 Test 4: Profile Editing

### Steps:
1. Click "Edit →" or ⚙️ icon
2. Verify all previously entered data is loaded
3. Change Professional Title to: "Senior Full-Stack Developer"
4. Add to Achievements: "- Built e-commerce platform with 10K+ users"
5. Click "💾 Save Profile"

### Expected Results:
- [ ] Settings page loads with saved data
- [ ] All fields show previously entered information
- [ ] Changes save successfully
- [ ] Main popup shows updated title when you return

---

## 🧪 Test 5: Profile in Proposals

### Steps:
1. Navigate to a test URL (any Upwork job or create a dummy page with text)
2. Open extension popup
3. Verify profile status shows "✅ Profile: John Smith"
4. Click "🚀 Analyze Job & Generate Proposal"
5. Wait for proposal generation
6. Paste clipboard content (Ctrl+V) into a text editor

### Expected Results:
- [ ] Status shows: "📖 Reading job description..."
- [ ] Status changes to: "🤖 Analyzing job and generating personalized proposal..."
- [ ] Status shows: "✅ Proposal copied to clipboard!"
- [ ] Pasted proposal mentions:
  - [ ] Your name ("John Smith")
  - [ ] Your title ("Senior Full-Stack Developer")
  - [ ] Your skills (React, Node.js, etc.)
  - [ ] Relevant experience from your summary
  - [ ] Specific achievements you listed

---

## 🧪 Test 6: Backend Integration

### Steps:
1. Open browser console (F12 → Console tab)
2. Keep console open while generating proposal
3. Check for any errors
4. (Optional) Check backend logs

### Expected Results:
- [ ] No errors in browser console
- [ ] No errors in backend console
- [ ] Backend receives `userResume` field
- [ ] Backend logs show successful Kindo AI call

### Sample Backend Request (check logs):
```json
{
  "jobDescription": "Looking for React developer...",
  "userResume": "Name: John Smith\nTitle: Senior Full-Stack Developer\n..."
}
```

---

## 🧪 Test 7: Clear Profile

### Steps:
1. Open settings page (⚙️ icon)
2. Scroll to bottom
3. Click "🗑️ Clear All" button
4. Confirm deletion in popup
5. Go back to main popup

### Expected Results:
- [ ] Confirmation dialog appears
- [ ] After confirming, success message: "🗑️ Profile cleared"
- [ ] All form fields are empty
- [ ] Main popup shows: "📝 No profile set up"
- [ ] "Set up now →" link visible

---

## 🧪 Test 8: Validation

### Steps:
1. Open settings page
2. Try to save with only name filled
3. Note error message
4. Try to save with summary < 100 characters
5. Note error message

### Expected Results:
- [ ] Error: "Please fill in at least: Name, Title, and Summary"
- [ ] Error: "Professional summary should be at least 100 characters"
- [ ] Profile does NOT save when validation fails

---

## 🧪 Test 9: Character Counter

### Steps:
1. Open settings page
2. Click in Professional Summary field
3. Type slowly and watch counter

### Expected Results:
- [ ] Counter at 0 chars: **Red**
- [ ] Counter at 150 chars: Still **Red**
- [ ] Counter at 200 chars: Changes to **Green**
- [ ] Counter at 500 chars: Changes to **Gray**
- [ ] Counter updates instantly as you type

---

## 🧪 Test 10: Navigation

### Steps:
1. From main popup, click ⚙️
2. From settings, click "← Back"
3. From main popup (no profile), click "Set up now →"
4. From settings, click "← Back"

### Expected Results:
- [ ] ⚙️ button opens settings
- [ ] "← Back" returns to main popup
- [ ] "Set up now →" opens settings
- [ ] All navigation is smooth, no errors

---

## 🧪 Test 11: Cross-Device Sync (Optional)

**Requirements:** Chrome Sync enabled, multiple devices

### Steps:
1. Save profile on Device A
2. Wait 1-2 minutes
3. Open extension on Device B
4. Check if profile appears

### Expected Results:
- [ ] Profile syncs to Device B
- [ ] All data matches Device A
- [ ] Changes on either device sync to the other

**Note:** This requires Chrome Sync to be enabled in browser settings.

---

## 🧪 Test 12: Without Profile (Backward Compatibility)

### Steps:
1. Clear profile (if exists)
2. Verify main popup shows "📝 No profile set up"
3. Navigate to a job posting
4. Click "🚀 Generate Proposal"
5. Check generated proposal

### Expected Results:
- [ ] Extension still works without profile
- [ ] Proposal generated successfully
- [ ] Proposal is more generic (no personal info)
- [ ] No errors or crashes
- [ ] Backend handles empty `userResume` gracefully

---

## 🎯 Critical Bugs (Stop and Fix Immediately)

If any of these occur, there's a critical issue:

- [ ] Extension crashes when opening settings
- [ ] Profile doesn't save at all
- [ ] Backend returns 500 error with profile
- [ ] Proposals no longer generate
- [ ] Console shows continuous errors
- [ ] Can't navigate back from settings

---

## ✅ Success Criteria

To pass testing, you must have:

- [ ] All 12 tests completed
- [ ] No critical bugs found
- [ ] Profile saves and loads correctly
- [ ] Proposals include profile information
- [ ] All navigation works smoothly
- [ ] No console errors
- [ ] Backward compatible (works without profile)

---

## 🐛 Common Issues & Solutions

### Issue: Settings page blank
**Solution:** Reload extension in `chrome://extensions/`

### Issue: Profile not saving
**Solution:** Check Chrome storage quota, try clearing browser cache

### Issue: Profile not in proposals
**Solution:** Verify profile status shows "✅ Profile: Name" on main popup

### Issue: Backend error
**Solution:** Check backend logs, verify .env file has KINDO_API_KEY

### Issue: Character counter not updating
**Solution:** Check browser console for JavaScript errors

---

## 📊 Test Results Template

Copy this to track your testing:

```
Date: _______________
Tester: _______________
Version: 1.1.0

Test 1 (Settings Access):        [ ] PASS  [ ] FAIL
Test 2 (Profile Creation):        [ ] PASS  [ ] FAIL
Test 3 (Profile Persistence):     [ ] PASS  [ ] FAIL
Test 4 (Profile Editing):         [ ] PASS  [ ] FAIL
Test 5 (Profile in Proposals):    [ ] PASS  [ ] FAIL
Test 6 (Backend Integration):     [ ] PASS  [ ] FAIL
Test 7 (Clear Profile):           [ ] PASS  [ ] FAIL
Test 8 (Validation):              [ ] PASS  [ ] FAIL
Test 9 (Character Counter):       [ ] PASS  [ ] FAIL
Test 10 (Navigation):             [ ] PASS  [ ] FAIL
Test 11 (Cross-Device Sync):      [ ] PASS  [ ] FAIL  [ ] SKIP
Test 12 (Without Profile):        [ ] PASS  [ ] FAIL

Critical Bugs Found: _______________
Notes: _____________________________
_____________________________________
_____________________________________

Overall Result: [ ] APPROVED  [ ] NEEDS FIXES
```

---

## 🎉 Next Steps After Testing

If all tests pass:
1. Tag release as v1.1.0
2. Update deployment
3. Create release notes
4. Announce to users
5. Monitor for feedback

If tests fail:
1. Document failing tests
2. Fix issues
3. Re-run tests
4. Repeat until all pass

---

**Remember:** Testing is crucial for user trust. Take your time and be thorough! 🔍
