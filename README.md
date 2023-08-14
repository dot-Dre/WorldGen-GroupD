# ENGR302 Project 
# Group D - DnD World Generator

## Team members and Role Assignments

- Ninos Awas (Backend)
- Luke Juriss (Backend)
- Onil Mamo (Backend)
- Sooraj Raja (Frontend)
- Finn McKeefry (Frontend)
- Andre Lepardo (Frontend)

# Setting up the Project
## Prerequisites: node, npm, java, and maven
To check if these are already installed on your system run the commands: 
1. `node -v`
1. `npm -v`
1. `java -version`
1. `mvn -v`

While in the directory you want the cloned project to be in

Run the command `git clone <repo's clone url>`

# Running the Entire Application using a Script

## Windows
While in the project's root directory (where `run.bat` is)

Run the command `./run.bat`

## Linux
While in the project's root directory (where `run.sh` is)

Run the command `./run.sh`

## Known Issues

The environmental variable for JAVA_HOME may need to be set manually. This is due to the possibility that the script could
be executed from a terminal that has an incorrect JAVA_HOME variable set. This will cause compatibility issues with the
maven build.

To correct this, set the JAVA_HOME variable to point to JDK with version 17.

# Application User Manual
Click the button on the webpage and an image will be displayed. 
