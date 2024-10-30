# 1. Base image
FROM node:20 AS build
# 2. Set working directory inside container
WORKDIR /app
# 3. Copy package.json and package-lock.json (if available)
COPY package*.json ./
# 4. Install dependencies
RUN npm install
# 5. Copy all project files
COPY . .
# 6. Build the project
RUN npm run build
# 7. Nginx to serve built static files
FROM nginx:alpine AS production
# 8. Copy built files from previous stage to Nginx folder
COPY --from=build /app/dist /usr/share/nginx/html
# 9. Expose port 80
EXPOSE 80
# 10. Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
