# 🎯 QUICK START - Do This Now

## 📥 PART 1: BRUNO SETUP (5 minutes)

### STEP 1️⃣ - Download Bruno
```
Go to: https://www.usebruno.com/
Click: Download → Windows → Run .exe file → Install
```

### STEP 2️⃣ - Open Your API Collection  
```
1. Open Bruno
2. Click: File → Open
3. Select: c:\Users\aksha\OneDrive\Desktop\blood bank project\bruno
4. Click: Select Folder
5. Wait for loading... ✅
```

### STEP 3️⃣ - Create Environment
```
1. Click: Environment (top right)
2. Click: + New
3. Name: local
4. Add Variable:
   Key: token
   Value: (empty for now)
5. Save ✅
```

### STEP 4️⃣ - Test Register
```
1. Click: Auth → Register.bru
2. Click: Send (blue button)
3. See: Status 201 ✅
```

### STEP 5️⃣ - Get Token from Login
```
1. Click: Auth → Login.bru
2. Change username/password to match registration
3. Click: Send
4. Copy: token value from response (long string)
5. Go to Environment → local
6. Paste: token value
7. Save ✅
```

### STEP 6️⃣ - Test Other Endpoints
```
Click these and test (all should show Status 200/201):
- Donors → Create_Donor.bru → Send ✅
- Donors → Get_All_Donors.bru → Send ✅
- BloodRequests → Create_Blood_Request.bru → Send ✅
- DonorMatching → Match_Donors_for_Request.bru → Send ✅
```

### STEP 7️⃣ - Take Screenshots
```
Screenshot these for your video:
✓ Login response (with token)
✓ Create Donor (Status 201)
✓ Get All Donors (Status 200)
✓ Create Blood Request (Status 201)
✓ Donor Matching result
```

---

## 🎬 PART 2: RECORD VIDEO (10 minutes)

### What to Show (5-10 minutes total)
```
1. Project Overview (30 sec)
   - Show folder structure
   - Explain Blood Bank system

2. Bruno Collection (1 min)
   - Show all folders
   - Explain organization

3. Demo Authentication (1 min)
   - Show Register.bru → Send → Status 201
   - Show Login.bru → Send → Get token

4. Demo Donors (1 min)
   - Show Create_Donor → Send
   - Show Get_All_Donors → Send

5. Demo Blood Request (1 min)
   - Show Create_Blood_Request → Send
   - Show Donor Matching → Send

6. Explain API (1 min)
   - Show API_DOCUMENTATION.md
   - Explain endpoints

7. Technical Summary (1 min)
   - Show server.js structure
   - Explain security & validation
```

### Recording Tool (Pick One)
```
✓ OBS Studio (Free) - https://obsproject.com/
✓ Screencastify (Chrome extension) - https://www.screencastify.com/
✓ Loom (Free) - https://www.loom.com/
✓ Windows Built-in (Settings → Recording) - Easiest!
```

### Upload Video
```
Option 1: YouTube
- Sign in to youtube.com
- Click: Create → Upload video
- Upload your video
- Set to: PUBLIC
- Copy link

Option 2: Google Drive
- Sign in to drive.google.com
- Upload video file
- Right click → Share
- Set to: Anyone with link
- Copy link
```

---

## 🚀 PART 3: GIT COMMANDS (5 minutes)

### COPY & PASTE These Commands One By One

#### Command 1 - Go to Project
```powershell
cd "c:\Users\aksha\OneDrive\Desktop\blood bank project"
```
Press: ENTER

#### Command 2 - Check Status
```powershell
git status
```
Press: ENTER

#### Command 3 - Add All Files
```powershell
git add .
```
Press: ENTER

#### Command 4 - Create Branch
```powershell
git checkout -b feature/complete-api-endpoints
```
Press: ENTER

#### Command 5 - Commit
```powershell
git commit -m "feat: Complete Blood Bank API with 28 endpoints and Bruno documentation

- Add Donor CRUD endpoints (6 endpoints)
- Add Blood Request CRUD endpoints (6 endpoints)  
- Add Donor Matching endpoints (2 endpoints)
- Add Blood Inventory CRUD endpoints (5 endpoints)
- Fix User model with username and password
- Add JWT authentication and validation
- Add complete API documentation
- Add Bruno collection with all endpoints"
```
Press: ENTER

#### Command 6 - Push to GitHub
```powershell
git push -u origin feature/complete-api-endpoints
```
Press: ENTER

---

## 📋 PART 4: GITHUB PR

### AFTER Git Push (GitHub will show a button)

```
1. Go to: https://github.com/YOUR_USERNAME/blood-bank-project
2. Look for: "Compare & pull request" button (yellow/green)
3. Click it
4. Fill Title: feat: Complete Blood Bank API with 28 endpoints
5. Fill Description: (copy from commit message above)
6. Click: "Create pull request"
7. Wait for it to be created
8. Copy the PR URL (example: https://github.com/user/repo/pull/1)
```

---

## ✅ SUBMISSION CHECKLIST

### Before Submitting Fill This:

```
✓ Bruno installed? YES / NO
✓ All endpoints tested? YES / NO  
✓ Screenshots taken? YES / NO
✓ Video recorded (5-10 min)? YES / NO
✓ Video uploaded (YouTube/Drive)? YES / NO
✓ Git pushed to GitHub? YES / NO
✓ PR created on GitHub? YES / NO

FINAL SUBMISSION NEEDS:
[ ] GitHub PR URL: _________________________________
[ ] Video Link (public): ____________________________
```

---

## 📞 QUICK HELP

| Problem | Solution |
|---------|----------|
| Bruno won't open | Reinstall from usebruno.com |
| Endpoints show error | Start server: `npm start` in server folder |
| Token not working | Run Login first, copy token to environment |
| Git command fails | Make sure you're in correct folder (cd command) |
| Can't find PR button | Might need to create GitHub repo first |

---

## 🎉 YOU'RE READY!

Follow these 4 parts in order:
1. ✅ Bruno Setup (test all endpoints)
2. ✅ Record Video (5-10 minutes) 
3. ✅ Git Commands (push to GitHub)
4. ✅ Create PR & Submit

**Estimated Total Time: 30-45 minutes**

**Let's Go! 🚀**
