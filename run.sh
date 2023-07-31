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

cd src/main/ui
npm install
npm start &

cd ../../..

mvn spring-boot:run
    


