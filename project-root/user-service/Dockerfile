# Use an OpenJDK image for Java applications
FROM openjdk:20
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose the port the service runs on
EXPOSE 8082

# Command to run the application
CMD ["java", "-jar", "app.jar"]
