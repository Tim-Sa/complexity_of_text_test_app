# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

FROM nginx:alpine

# Удаляем стандартный конфигурационный файл
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш собственный конфигурационный файл Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Копируем статические файлы приложения в директорию Nginx
COPY build/ /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
