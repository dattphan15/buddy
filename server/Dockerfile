# Use an official Node.js runtime as a parent image
FROM node:19

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY server/package*.json ./

# Install dependencies
RUN npm install

# Copy the server directory contents into the container at /app
COPY server/ .

# Set the command to run the server
CMD ["node", "server.js"]