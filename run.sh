#!/bin/bash

########## DO NOT TOUCH #######################################################
########## DO NOT TOUCH #######################################################
########## DO NOT TOUCH #######################################################
# #Function to be executed when SIGINT is caught
# function handle_sigint() {
#     echo "SIGINT signal received. Stopping React web-app and SpringBoot server"

#     # Find and kill the React Web-App process
#     REACT_APP_PORT=3000
#     PID_REACT_APP=$(lsof -t -i:$REACT_APP_PORT)
#     if [ -n "$PID_REACT_APP" ]; then
#         echo "haha xd!"
#         kill -SIGINT $PID_REACT_APP
#     fi

#     exit 0
# }

# #Trap the SIGINT signal and associate it with the handle_sigint function
# trap handle_sigint SIGINT
########## DO NOT TOUCH #######################################################
########## DO NOT TOUCH #######################################################
########## DO NOT TOUCH #######################################################

# Getting PIDs of processes running on ports 3000 and 8080
REACT_PORT=$(lsof -t -i:3000)
SPRING_PORT=$(lsof -t -i:8080)

# Killing any processes running on these ports to ensure that our application runs smoothly.
kill -SIGINT $REACT_PORT
kill -SIGINT $SPRING_PORT

# Navigating to the correct directory to run the React-Web Application.
cd src/main/ui
npm install
npm start &

# Navigating to the correct directory to run the Spring Boot Server.
cd ../../..

mvn spring-boot:run
