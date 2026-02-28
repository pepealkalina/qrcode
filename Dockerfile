# Usamos la imagen oficial de Nginx basada en Alpine (más ligera)
FROM nginx:alpine

# Opcional: Metadatos sobre quién mantiene la imagen
LABEL maintainer="pepe@pepe.com"

# Eliminamos los archivos por defecto de Nginx para evitar conflictos
RUN rm -rf /usr/share/nginx/html/*

# Copiamos el contenido de nuestra carpeta local 'src' 
# al directorio donde Nginx busca los archivos para servir
COPY ./src /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Nginx se inicia automáticamente por defecto, no hace falta CMD