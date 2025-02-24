# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 3001

# Start the service
CMD ["node", "src/index.js"]