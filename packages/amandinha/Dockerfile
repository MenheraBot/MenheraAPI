FROM maven:3.6.0-jdk-11-slim AS build

COPY src /home/app/src

COPY pom.xml /home/app

RUN mvn -f /home/app/pom.xml clean compile assembly:single 

FROM openjdk:16-alpine3.13

WORKDIR /home/app

COPY --from=build /home/app/target/Amandinha.jar Amandinha.jar
COPY .env .env

ENTRYPOINT ["java", "-jar", "/home/app/Amandinha.jar"]