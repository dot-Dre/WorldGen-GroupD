#!/bin/bash

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

JAVA_17_PATH="/usr/lib/jvm/java-17-openjdk" # ECS java 17 path

# Check if ECS hava 17 path exists and set JAVA_HOME accordingly
if [ -d "$JAVA_17_PATH" ]; then
    export JAVA_HOME="$JAVA_17_PATH"
else
    echo "Java 17 not found at $JAVA_17_PATH. Using default JAVA_HOME."
fi

mvn spring-boot:run
