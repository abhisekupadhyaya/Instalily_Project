# Use an official Node.js runtime as the base image for the build stage
FROM node:18-alpine as builder 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application (e.g., transpile TypeScript, bundle assets)
RUN npm run build

# Start a new stage for the production image
FROM node:18-alpine 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built assets from the builder stage to the production image
COPY --from=builder /usr/src/app/dist ./dist

# Add a .env file to the container during the build process
COPY .env /usr/src/app/.env

# Expose port 80 for the application
EXPOSE 8000

# Specify the command to run the application directly using Node.js
CMD [ "node", "dist/main" ]