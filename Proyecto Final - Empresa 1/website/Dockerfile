# Usa una imagen ligera de Nginx
FROM nginx:alpine

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos compilados de la web a la carpeta de Nginx
COPY dist/ /usr/share/nginx/html/

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
