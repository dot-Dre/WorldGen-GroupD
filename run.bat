@echo off

rem Find the process ID (PID) of the processes using ports 3000 and 8080
for /f "tokens=2 delims= " %%a in ('netstat -ano ^| find "LISTENING" ^| find ":3000 "') do set "REACT_PORT=%%a"
for /f "tokens=2 delims= " %%a in ('netstat -ano ^| find "LISTENING" ^| find ":8080 "') do set "SPRING_PORT=%%a"

rem Terminate the processes using the identified ports (SIGINT equivalent)
taskkill /PID %REACT_PORT% /F
taskkill /PID %SPRING_PORT% /F

rem Change directory to src/main/ui
cd src\main\ui

rem Install npm dependencies
npm install

rem Start the npm application in the background
start npm start

rem Change directory back to the root directory of the project
cd ..\..\..

rem Run Maven spring-boot:run command
mvn spring-boot:run
