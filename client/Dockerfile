# Use an official Node.js runtime as a parent image
FROM node:19

# Set the working directory to /app/client
WORKDIR /app/client

# Copy the package.json and package-lock.json files
COPY ./client/package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g react-native-cli

# Copy the client directory contents into the container at /app/client
COPY ./client/ .

# Set the command to run the client
CMD ["npx", "react-native", "start"]