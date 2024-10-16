# Bước 1: Build ứng dụng bằng Vite
FROM node:16-alpine as build-stage

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Vue 3
RUN npm run build

# Bước 2: Thiết lập Nginx để phục vụ ứng dụng
FROM nginx:alpine as production-stage

# Copy các file đã build từ bước trước vào thư mục phục vụ của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx từ project của bạn vào Nginx container
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 để phục vụ ứng dụng qua HTTP
EXPOSE 80

# Chạy Nginx trong chế độ foreground
CMD ["nginx", "-g", "daemon off;"]
