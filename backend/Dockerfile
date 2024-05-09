# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory
COPY . .

# Build the TypeScript project
# RUN npm run start

# Expose the port on which the server will run
EXPOSE 3000

# Set the environment variable for MongoDB connection
ENV MONGODB_URL=mongodb://mongodb:27017/myapp

# Start the server
CMD ["npm", "start"]