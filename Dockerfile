#usamos una imagen base ligera de node.js
FROM node:alpine

#Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

#Copiamos el archibo package.json y package-Lock.json
COPY package*.json ./

#Instalamos las dependencias
RUN npm install

#Copiamos el resto de los archivos del proyecto
COPY . .

#Exponemos el puerto 8080 para la app
EXPOSE 8080

#Eefinimos el comando que se ejecurara al iniciar el contenedor
CMD ["npm", "start"]