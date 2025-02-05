@echo off

cd /d "%~dp0"
set folder=%CD%
echo %folder%
::start "" msedge.exe -tab "file://%folder%/../../Content/Pages/Index.htm"
npm start
pause
::exit