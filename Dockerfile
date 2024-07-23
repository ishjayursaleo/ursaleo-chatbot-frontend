# Use an official Node.js runtime as a base image
FROM node:20.2.0-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# # Install dependencies using Yarn
# RUN yarn install

# Copy the entire application to the container
COPY . .

# # Build the React app
# RUN yarn build

# Use Nginx for serving the production build
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built files from the previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the running application
EXPOSE 80

# Nginx is configured to automatically start and serve the built files

