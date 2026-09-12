# 🔐 GitHub Token Setup - Safe & Easy (2 minutes)

## Why a Token is Safe
- ✅ More secure than password (password is not needed)
- ✅ Can be revoked anytime
- ✅ Can set expiration date
- ✅ Only has access to `repo` scope (not your whole account)

## How to Get Your Token (Step-by-Step)

### Step 1: Go to GitHub Settings
```
https://github.com/settings/tokens
```

### Step 2: Click "Generate new token (classic)"
- Button is green at top right

### Step 3: Configure Token
- **Note**: "Blood Bank PR Creation"
- **Expiration**: 90 days (or more)
- **Select scopes**: Check only ✅ `repo`

### Step 4: Generate & Copy
- Click "Generate token" (green button at bottom)
- Copy the token (looks like: `ghp_1a2b3c4d5e6f...`)
- ⚠️ GitHub only shows it ONCE - save it!

### Step 5: Run This Command
Paste your token in the command below (replace YOUR_TOKEN):

```powershell
cd "c:\Users\aksha\OneDrive\Desktop\blood bank project"
$env:GITHUB_TOKEN = "YOUR_TOKEN"
. .\create_pr_api.ps1
```

---

## Complete Example:
```powershell
$env:GITHUB_TOKEN = "ghp_abc123xyz789..."
. .\create_pr_api.ps1
```

---

## 🚀 Once You Run It:
1. Script validates token with GitHub
2. Creates PR automatically
3. Prints your new PR URL
4. You're done!

---

## ❓ What if you can't get a token?
Then manually create PR in browser:
1. Go: https://github.com/akshayas92-lab/S92_Akshaya_Capstone_Blood_Bank-/pull/new/feature/complete-api-endpoints
2. Log in to GitHub
3. Scroll down
4. Click "Create pull request" button
5. Copy the PR URL from the next page

---

## Security Notes
- Token is only used for this PR
- You can delete token anytime from GitHub settings
- Token is NOT stored anywhere - only in this session
- Each token is unique and can be revoked individually

**Ready to proceed?** Get your token and paste it above! 🔐
