# GitHub PR Creation Script (PowerShell)
# This script creates a PR if GitHub CLI is configured

Write-Host "🚀 Attempting to create GitHub PR..." -ForegroundColor Green
Write-Host ""

# Check if GitHub CLI is installed
if (Get-Command gh -ErrorAction SilentlyContinue) {
    Write-Host "✅ GitHub CLI found!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Creating PR..." -ForegroundColor Cyan
    Write-Host ""
    
    # Create the PR using GitHub CLI
    $description = "Complete Blood Bank Management System with 28 API endpoints. Full MongoDB integration, JWT authentication, Bruno documentation. Production-ready code."
    
    & gh pr create --base main --head feature/complete-api-endpoints --title "feat: Complete Blood Bank API with 28 endpoints and Bruno documentation" --body $description
    
    Write-Host ""
    Write-Host "✅ Check your GitHub browser for the new PR!" -ForegroundColor Green
}
else {
    Write-Host "⚠️  GitHub CLI not found" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Follow these steps:" -ForegroundColor Cyan
    Write-Host "1. Open: CREATE_PR_MANUAL.md for step-by-step instructions"
    Write-Host "2. Or install GitHub CLI with: winget install GitHub.cli"
    Write-Host "  Then restart terminal and run this script again"
}
