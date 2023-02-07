# PruebaTecnicaV3

# Tecnologias Utilizadas

Base de datos: MySQL

Backend: NodeJS, express, express-validator, jsonwebtoken, mysql2, n-digit-token, node-schedule, node-fetch, sequelize, socket.io, cors, dotenv  

Frontend: ReactJS

Css Framework: Tailwindcss

# Estructura de carpetas

backend: Contiene toda la lógica del servidor y el consumo de las Api.

frontend: Contiene la lógica del cliente y muestra los datos requeridos.

# Pasos para el funcionamiento del proyecto

1) Crear base de datos con las tablas users y tokens

2) La tabla user contiene las columnas: id,name,email,password,createdAT,updatedAT. La tabla tokens contiene las columnas : idToken,Token,User_id,createdAT,updatedAT.

3) Instalar las dependencias tanto en el backend como en el frontend con el comando npm install

4) Para levantar el servidor utilizar el comando nodemon app

5) Para levantar el cliente utilizar el comando npm run dev

