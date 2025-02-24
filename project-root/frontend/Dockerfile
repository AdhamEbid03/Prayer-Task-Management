FROM nginx:alpine

# Copy all your frontend files directly to nginx's default directory
COPY . /usr/share/nginx/html

# Expose port 80 (default nginx port)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
