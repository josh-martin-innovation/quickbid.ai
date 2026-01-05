@echo off
echo ========================================
echo QuickBid AI v1.3.0 - Push to GitHub
echo ========================================
echo.

REM Navigate to the script directory
cd /d %~dp0

echo [1/7] Initializing git repository...
git init
git branch -m main

echo [2/7] Configuring git...
git config user.email "josh@martin-innovation.com"
git config user.name "Josh Martin"

echo [3/7] Adding all files...
git add .

echo [4/7] Committing changes...
git commit -m "QuickBid AI v1.3.0 - Resume Upload, LinkedIn Import, All Fixes"

echo [5/7] Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/josh-martin-innovation/quickbid.ai.git

echo [6/7] Pushing to GitHub...
echo.
echo NOTE: If prompted for credentials:
echo - Username: josh-martin-innovation
echo - Password: Use your GitHub Personal Access Token
echo   (Get one at: github.com/settings/tokens)
echo.
git push -u origin main --force

echo.
echo [7/7] Done!
echo.
echo ========================================
echo Successfully pushed to GitHub!
echo View at: https://github.com/josh-martin-innovation/quickbid.ai
echo ========================================
echo.
pause
