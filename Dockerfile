# Use Node.js for building the React app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app
RUN npm run build 

EXPOSE 5174

# Use Nginx for serving the static files
FROM nginx:alpine

# Copy the built files to Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 5174

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]