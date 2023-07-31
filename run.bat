@echo off

rem Start mvn spring-boot:run in the background
start /B mvn spring-boot:run

rem Change the directory to src/main/ui and run npm start
cd src/main/ui
start /B npm install
npm start

rem The batch file continues executing here...
