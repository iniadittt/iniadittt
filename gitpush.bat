@echo off
cd /d %~dp0
git add .
git commit -m "Auto update README"
git push origin main