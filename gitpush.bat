@echo off
cd /d %~dp0
git add .
git commit -m "UPDATE"
git push origin main