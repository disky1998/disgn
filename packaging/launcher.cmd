@echo off
setlocal
set "APP_DIR=%LOCALAPPDATA%\DesignHistoryAtlas"
if not exist "%APP_DIR%" mkdir "%APP_DIR%"
rem IExpress removes its temporary extraction folder as soon as this script exits.
rem Copy the static site to a stable per-user folder before opening the browser.
xcopy "%~dp0*" "%APP_DIR%\" /E /I /Y >nul
copy /Y "%~dp0server.ps1" "%APP_DIR%\atlas-server-v3.ps1" >nul
start "" powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File "%APP_DIR%\atlas-server-v3.ps1"
timeout /t 1 /nobreak >nul
start "Design History Atlas" "http://127.0.0.1:48767/"
endlocal
