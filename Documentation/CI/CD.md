# **Explanation of `gitlab-ci.yml`**

This `.gitlab-ci.yml` file is a configuration file used by GitLab CI/CD to define the stages and jobs for building, testing, and deploying the back-end Spring Boot application. It consists of four stages: `lint`, `build`, `test`, and `deploy`, each with its own set of jobs. Below is a breakdown of each section:

**Stages:**

The `stages` section defines the order in which the stages will be executed in the CI/CD pipeline. The available stages are: `lint`, `build`, `test`, and `deploy`. These stages are executed sequentially, and each stage must complete successfully before the next stage starts.

**Variables:**

The `variables` section allows you to define environment variables that will be used across all jobs in the pipeline. In this case, the `MAVEN_OPTS` variable is set to speed up Maven builds by reusing cached dependencies. It points to the local Maven repository location using `-Dmaven.repo.local=.m2/repository`.

### **Lint Stage:**

The `lint` stage is responsible for running linting checks on the codebase. It uses the `python:3.9` Docker image as the base image for the job. The script installs `pre-commit` using `pip` and then runs `pre-commit run --all-files`. `pre-commit` is a tool that enforces code style and standards by running various linters, formatters, and code quality tools.

### **Build Stage:**

The `build` stage is responsible for building the Java Spring Boot application. It uses the `maven:3.8.3-openjdk-17` Docker image for building the application. The script runs `mvn $MAVEN_OPTS clean package` to clean the project, compile the source code, and package it into an executable JAR. The generated JAR file is then saved as an artifact using the `artifacts` section, which allows it to be passed to subsequent stages.

### **Test Stage:**

The `test` stage is responsible for running the test suite of the Java Spring Boot application. It uses the `maven:latest` Docker image, which typically points to the latest Maven version available. The script runs `mvn $MAVEN_OPTS test` to execute the test suite.

### **Deploy Stage:**

The `deploy` stage is responsible for deploying the Java Spring Boot application. It uses the `openjdk:17.0.1-jdk-slim` Docker image, which provides the Java Development Kit (JDK) for Java 17. The script performs the following actions:
1. Copies the previously built JAR file (`DNDMapGen-0.0.1-SNAPSHOT.jar`) to `app.jar`.
2. Executes the Java application in the background using the `java -jar` command with the `-Dspring.profiles.active=production` flag to specify the active Spring profile during deployment.
3. Obtains the process ID (PID) of the running Java application and stores it in the `APP_PID` variable.
4. Optionally, waits for 10 seconds before stopping the application (this can be adjusted based on your application's requirements).
5. Stops the Java application gracefully using the `kill` command with the stored PID.

The `only` section limits the `deploy` stage to run only when there are changes in the `main` branch. This ensures that the deployment is triggered only for the main branch.

The entire pipeline provides continuous integration for the Java Spring Boot application, including linting, building, testing, and automatic deployment to a production environment when changes are made to the main branch.


---
