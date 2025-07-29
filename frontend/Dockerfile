FROM node:18-alpine AS builder
WORKDIR /app

# Copy only package.json first to optimize layer caching
COPY frontend/package.json .
RUN npm install

# Copy only the frontend directory contents into /app
COPY frontend . 

# Verify paths (debugging)
RUN echo "Contents of /app:" && ls -la
RUN echo "HTML files:" && ls -la public/*.html || echo "No HTML files"

RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]