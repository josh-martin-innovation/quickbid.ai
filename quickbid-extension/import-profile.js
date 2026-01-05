// Import Profile Logic

const BACKEND_URL = 'http://localhost:3000';

const linkedinCard = document.getElementById('linkedin-card');
const uploadCard = document.getElementById('upload-card');
const pasteCard = document.getElementById('paste-card');

const linkedinForm = document.getElementById('linkedin-form');
const uploadForm = document.getElementById('upload-form');
const pasteForm = document.getElementById('paste-form');

const linkedinUrlInput = document.getElementById('linkedin-url');
const fileInput = document.getElementById('file-input');
const fileUploadArea = document.getElementById('file-upload-area');
const filenameDisplay = document.getElementById('filename-display');
const resumeTextarea = document.getElementById('resume-text');

const importLinkedinBtn = document.getElementById('import-linkedin');
const uploadResumeBtn = document.getElementById('upload-resume');
const parseTextBtn = document.getElementById('parse-text');

const previewSection = document.getElementById('preview-section');
const saveProfileBtn = document.getElementById('save-profile');
const editBeforeSaveBtn = document.getElementById('edit-before-save');
const backBtn = document.getElementById('back-btn');
const statusDiv = document.getElementById('status');

let extractedProfile = null;

// Toggle import method
function selectMethod(method) {
  // Deactivate all
  [linkedinCard, uploadCard, pasteCard].forEach(card => card.classList.remove('active'));
  [linkedinForm, uploadForm, pasteForm].forEach(form => form.classList.remove('show'));
  
  // Activate selected
  if (method === 'linkedin') {
    linkedinCard.classList.add('active');
    linkedinForm.classList.add('show');
  } else if (method === 'upload') {
    uploadCard.classList.add('active');
    uploadForm.classList.add('show');
  } else if (method === 'paste') {
    pasteCard.classList.add('active');
    pasteForm.classList.add('show');
  }
  
  previewSection.classList.remove('show');
}

// Event listeners for cards
linkedinCard.addEventListener('click', () => selectMethod('linkedin'));
uploadCard.addEventListener('click', () => selectMethod('upload'));
pasteCard.addEventListener('click', () => selectMethod('paste'));

// File upload handling
fileUploadArea.addEventListener('click', () => fileInput.click());

fileUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUploadArea.classList.add('dragover');
});

fileUploadArea.addEventListener('dragleave', () => {
  fileUploadArea.classList.remove('dragover');
});

fileUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileUploadArea.classList.remove('dragover');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleFileSelect(files[0]);
  }
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFileSelect(e.target.files[0]);
  }
});

function handleFileSelect(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (file.size > maxSize) {
    showStatus('❌ File too large. Maximum size is 5MB.', 'error');
    return;
  }
  
  const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
  
  if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|docx?|txt)$/i)) {
    showStatus('❌ Invalid file type. Please upload PDF, DOCX, or TXT.', 'error');
    return;
  }
  
  filenameDisplay.textContent = `✅ Selected: ${file.name}`;
  filenameDisplay.classList.add('show');
  uploadResumeBtn.disabled = false;
}

// Show status
function showStatus(message, type) {
  statusDiv.textContent = message;
  statusDiv.className = type;
  statusDiv.style.display = 'block';
}

// LinkedIn Import
importLinkedinBtn.addEventListener('click', async () => {
  const url = linkedinUrlInput.value.trim();
  
  if (!url) {
    showStatus('❌ Please enter a LinkedIn URL', 'error');
    return;
  }
  
  if (!url.includes('linkedin.com/in/')) {
    showStatus('❌ Invalid LinkedIn URL. Should be: linkedin.com/in/yourname', 'error');
    return;
  }
  
  try {
    importLinkedinBtn.disabled = true;
    showStatus('🔍 Fetching LinkedIn profile...', 'loading');
    
    const response = await fetch(`${BACKEND_URL}/api/parse-linkedin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn profile. Make sure your profile is public.');
    }
    
    const data = await response.json();
    extractedProfile = data.profile;
    
    displayPreview(extractedProfile);
    showStatus('✅ LinkedIn profile imported successfully!', 'success');
    
  } catch (error) {
    console.error('LinkedIn import error:', error);
    showStatus(`❌ ${error.message}`, 'error');
  } finally {
    importLinkedinBtn.disabled = false;
  }
});

// Resume Upload
uploadResumeBtn.addEventListener('click', async () => {
  const file = fileInput.files[0];
  if (!file) return;
  
  try {
    uploadResumeBtn.disabled = true;
    showStatus('📄 Reading and parsing resume...', 'loading');
    
    const formData = new FormData();
    formData.append('resume', file);
    
    const response = await fetch(`${BACKEND_URL}/api/parse-resume`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to parse resume. Please try pasting text instead.');
    }
    
    const data = await response.json();
    extractedProfile = data.profile;
    
    displayPreview(extractedProfile);
    showStatus('✅ Resume parsed successfully!', 'success');
    
  } catch (error) {
    console.error('Resume upload error:', error);
    showStatus(`❌ ${error.message}`, 'error');
  } finally {
    uploadResumeBtn.disabled = false;
  }
});

// Parse Text
parseTextBtn.addEventListener('click', async () => {
  const text = resumeTextarea.value.trim();
  
  if (!text || text.length < 100) {
    showStatus('❌ Please paste at least 100 characters of resume text', 'error');
    return;
  }
  
  try {
    parseTextBtn.disabled = true;
    showStatus('🤖 AI is analyzing your resume...', 'loading');
    
    const response = await fetch(`${BACKEND_URL}/api/parse-resume-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    if (!response.ok) {
      throw new Error('Failed to parse resume text. Please try again.');
    }
    
    const data = await response.json();
    extractedProfile = data.profile;
    
    displayPreview(extractedProfile);
    showStatus('✅ Resume parsed successfully!', 'success');
    
  } catch (error) {
    console.error('Parse text error:', error);
    showStatus(`❌ ${error.message}`, 'error');
  } finally {
    parseTextBtn.disabled = false;
  }
});

// Display preview
function displayPreview(profile) {
  document.getElementById('preview-name').textContent = profile.fullName || 'Not found';
  document.getElementById('preview-title').textContent = profile.title || 'Not found';
  document.getElementById('preview-email').textContent = profile.email || 'Not found';
  document.getElementById('preview-skills').textContent = profile.skills || 'Not found';
  document.getElementById('preview-experience').textContent = profile.experience || 'Not found';
  document.getElementById('preview-summary').textContent = profile.summary ? 
    (profile.summary.substring(0, 200) + (profile.summary.length > 200 ? '...' : '')) : 
    'Not found';
  
  previewSection.classList.add('show');
  previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Save to profile
saveProfileBtn.addEventListener('click', async () => {
  if (!extractedProfile) return;
  
  try {
    saveProfileBtn.disabled = true;
    showStatus('💾 Saving to your profile...', 'loading');
    
    // Add timestamp
    extractedProfile.lastUpdated = new Date().toISOString();
    
    await chrome.storage.sync.set({ userProfile: extractedProfile });
    
    showStatus('✅ Profile saved successfully!', 'success');
    
    setTimeout(() => {
      window.location.href = 'settings.html';
    }, 1500);
    
  } catch (error) {
    console.error('Save error:', error);
    showStatus('❌ Failed to save profile. Please try again.', 'error');
    saveProfileBtn.disabled = false;
  }
});

// Edit before save
editBeforeSaveBtn.addEventListener('click', async () => {
  if (!extractedProfile) return;
  
  try {
    // Save as draft to settings page
    await chrome.storage.local.set({ profileDraft: extractedProfile });
    window.location.href = 'settings.html';
  } catch (error) {
    console.error('Edit error:', error);
    showStatus('❌ Failed to transfer data. Please try again.', 'error');
  }
});

// Back button
backBtn.addEventListener('click', () => {
  window.location.href = 'settings.html';
});
