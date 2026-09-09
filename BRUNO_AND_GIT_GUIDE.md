# Bruno API Testing & Git Submit - Complete Guide

## 📥 STEP 1: Download & Install Bruno

### Option A: Using Installer (Easiest)
1. Go to: https://www.usebruno.com/
2. Click "Download"
3. Choose **Windows** version
4. Download the `.exe` file
5. Run the installer
6. Click "Install"
7. Wait for completion
8. Click "Finish"

Bruno will now be installed on your computer.

---

## 🧪 STEP 2: Test Your API with Bruno

### 2.1 Open Bruno
1. Click Bruno icon from desktop or Start menu
2. Bruno will open

### 2.2 Open Your API Collection
1. Click **"File"** → **"Open"**
2. Navigate to: `c:\Users\aksha\OneDrive\Desktop\blood bank project\bruno`
3. Click **"Select Folder"**
4. Wait for Bruno to load

You should see folders like:
- Auth
- Donors
- BloodRequests
- DonorMatching
- BloodInventory
- Utils

### 2.3 Setup Environment Variables
1. Click **"Environment"** button (top right area)
2. Click **"+ New"** or **"Create"**
3. Name it: `local`
4. Add this variable:
   ```
   Key: token
   Value: (leave empty for now, we'll get it from Login)
   ```
5. Click **"Save"**
6. Select `local` environment from dropdown

---

## ⚙️ STEP 3: Test Authentication Endpoint

### 3.1 Register a User
1. Click **"Auth"** folder (left panel)
2. Click **"Register.bru"**
3. Change the request body if you want:
   ```json
   {
     "username": "testuser123",
     "password": "password123",
     "name": "Test User",
     "email": "test@example.com",
     "phone": "9876543210",
     "role": "donor"
   }
   ```
4. Click **"Send"** button (blue button, top right)
5. You should see ✅ **Status 201** if successful

### 3.2 Login to Get Token
1. Click **"Login.bru"**
2. Change username/password to match what you registered:
   ```json
   {
     "username": "testuser123",
     "password": "password123"
   }
   ```
3. Click **"Send"**
4. You'll see response with `token` value
5. **Copy the token value** (long string starting with `eyJ...`)
6. Update environment variable:
   - Click "Environment" → "local"
   - Paste token in the `token` field
   - Click "Save"

---

## ✅ STEP 4: Test Other Endpoints

Now you can test any other endpoint:

### Test Donor Creation
1. Click **"Donors"** → **"Create_Donor.bru"**
2. Click **"Send"**
3. Should see ✅ **Status 201**

### Test Get All Donors
1. Click **"Donors"** → **"Get_All_Donors.bru"**
2. Click **"Send"**
3. Should see ✅ **Status 200** with list of donors

### Test Create Blood Request
1. Click **"BloodRequests"** → **"Create_Blood_Request.bru"**
2. Click **"Send"**
3. Should see ✅ **Status 201**

### Test Donor Matching
1. Copy a Donor ID from previous response
2. Copy a Blood Request ID
3. Click **"DonorMatching"** → **"Match_Donors_for_Request.bru"**
4. Edit the body:
   ```json
   {
     "bloodRequestId": "PASTE_REQUEST_ID_HERE"
   }
   ```
5. Click **"Send"**
6. Should see matching donors

---

## 📸 STEP 5: Document Your Testing

While testing in Bruno:
- Take screenshots of a few successful requests (Status 200/201)
- Show the request and response
- This helps for your video explanation

### Key Requests to Screenshot:
1. Login response (showing token)
2. Create Donor (Status 201)
3. Get All Donors (Status 200)
4. Match Donors (showing matching results)

---

## 🎬 STEP 6: Prepare for Video

Now you have tested all endpoints. For your video, you can:

1. **Show Bruno Collection Structure** (2 seconds)
2. **Demo Login Endpoint** (show getting token)
3. **Demo Donor Endpoints** (create, get, update)
4. **Demo Blood Request** (create request)
5. **Demo Donor Matching** (show matching working)

Make sure to:
- ✅ Show your face on camera
- ✅ Speak clearly in English or Tamil
- ✅ Show screen with Bruno open
- ✅ Keep video 5-10 minutes
- ✅ Save it to Google Drive/YouTube

---

## 🚀 STEP 7: Git Commands (Copy & Paste These)

Open PowerShell and run these commands one by one:

### Command 1: Check Git Status
```powershell
cd "c:\Users\aksha\OneDrive\Desktop\blood bank project"
git status
```

### Command 2: Add All Files
```powershell
git add .
```

### Command 3: Commit Changes
```powershell
git commit -m "feat: Complete Blood Bank API with 28 endpoints and Bruno documentation

- Add Donor CRUD endpoints (6 endpoints)
- Add Blood Request CRUD endpoints (6 endpoints)  
- Add Donor Matching endpoints (2 endpoints)
- Add Blood Inventory CRUD endpoints (5 endpoints)
- Fix User model with username and password
- Add JWT authentication and validation
- Add complete API documentation
- Add Bruno collection with all endpoints
- All endpoints tested and working"
```

### Command 4: Create New Branch (if needed)
```powershell
git checkout -b feature/complete-api-endpoints
```

### Command 5: Push to GitHub
```powershell
git push -u origin feature/complete-api-endpoints
```

---

## 📋 STEP 8: Create GitHub PR

After pushing:

1. Go to: https://github.com/YOUR_USERNAME/blood-bank-project
2. You'll see a **"Compare & pull request"** button
3. Click it
4. Fill in:
   - **Title**: `feat: Complete Blood Bank API with 28 endpoints and Bruno documentation`
   - **Description**: (Copy from commit message above)
5. Click **"Create pull request"**

---

## 📤 STEP 9: Submit Assignment

You need to provide:

### 1. GitHub PR URL
- Copy the PR URL from the browser
- Example: `https://github.com/yourname/blood-bank-project/pull/1`
- Must be active and accessible ✅

### 2. Video Explanation URL
- Record video explaining your project
- Upload to YouTube or Google Drive
- Make link public
- Share the link

---

## 🎯 Order of Operations

1. ✅ Download Bruno
2. ✅ Open Bruno collection
3. ✅ Test all endpoints (Register → Login → Donor → Blood Request → Matching)
4. ✅ Take screenshots for video reference
5. ✅ Record video explanation (5-10 minutes, show your face)
6. ✅ Run Git commands to commit and push
7. ✅ Create GitHub PR
8. ✅ Submit assignment with PR link + Video link

---

## 💡 Quick Reference

### Bruno Testing Checklist
- [ ] Bruno installed and running
- [ ] Collection opened in Bruno
- [ ] Environment variable `token` created
- [ ] Register endpoint tested (Status 201)
- [ ] Login endpoint tested (got token)
- [ ] Donor endpoints tested (Create, Get, Update)
- [ ] Blood Request endpoints tested
- [ ] Donor Matching tested
- [ ] Screenshots taken for video

### Git Checklist
- [ ] All files added (`git add .`)
- [ ] Committed with good message
- [ ] Pushed to GitHub
- [ ] PR created on GitHub
- [ ] PR link is accessible

### Submission Checklist
- [ ] Video recorded (5-10 min, you visible)
- [ ] Video uploaded (YouTube/Drive, public link)
- [ ] GitHub PR link ready
- [ ] Video link ready
- [ ] Both links submitted

---

## ❓ FAQs

**Q: I get "Endpoint not found" error**
A: Make sure server is running in another terminal:
```powershell
cd "c:\Users\aksha\OneDrive\Desktop\blood bank project\server"
npm start
```

**Q: Token error in requests**
A: 
1. Run Login endpoint first
2. Copy token from response
3. Update environment variable `token`
4. Re-send other requests

**Q: Git push fails**
A: Check if you've set up GitHub remote:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/blood-bank-project.git
```

**Q: Can't see PR button on GitHub**
A: You may need to:
1. Create repo on GitHub first
2. Set remote to your repo
3. Push changes
4. Then PR button appears

---

## 🎓 That's It!

Follow these steps in order and you'll have:
- ✅ Tested all 28 API endpoints in Bruno
- ✅ Git commits ready
- ✅ GitHub PR created
- ✅ Video explanation recorded
- ✅ Assignment ready to submit

**You got this! 🚀**

---

**Need help?** Re-read the relevant section or ask me!

Good luck! 🎉
