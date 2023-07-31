#!/bin/bash

# Start mvn spring-boot:run in the background
mvn spring-boot:run &

# Change the directory to src/main/ui and run npm start
cd src/main/ui
npm install
npm start

# The script continues executing here...
