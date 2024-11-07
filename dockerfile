# Stage 1: Build the Angular application
FROM node:21 AS build

# Set the working directory
WORKDIR /app/runefx-website

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/runefx-website/dist/runefx-website /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
