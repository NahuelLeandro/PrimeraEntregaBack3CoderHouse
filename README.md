# 🐾 API de Adopción de Mascotas

Proyecto Final — Backend Coderhouse  
Autor: Nahuel Leandro Mendarte

---

## 📌 Descripción

API REST para gestionar un sistema de adopción de mascotas.

La aplicación permite:

- Crear y administrar usuarios
- Registrar mascotas
- Gestionar adopciones
- Marcar mascotas como adoptadas o devueltas
- Mantener historial de adopciones

Stack tecnológico:

- Node.js
- Express
- MongoDB + Mongoose
- Arquitectura en capas (DAO / Service / Controller)
- Swagger para documentación

---

## ⚙️ Instalación

### 1. Clonar repositorio

git clone <repo>
cd proyecto

### 2. Instalar dependencias

npm install

### 3. Variables de entorno

Crear archivo `.env`:

PORT=8080  
MONGO_URI=mongodb://localhost:27017/adoption

### 4. Ejecutar servidor

npm run dev

Servidor disponible en:

http://localhost:8080

---

## 🧪 Cómo probar la API

Podés usar:

- Postman
- Thunder Client
- Swagger UI

Todas las rutas trabajan con JSON.

Header requerido:

Content-Type: application/json

---

## 👤 Usuarios

POST /api/users

{
  "first_name": "Juan",
  "last_name": "Perez",
  "email": "juan@mail.com",
  "password": "1234"
}

---

## 🐶 Mascotas

POST /api/pets

{
  "name": "Firulais",
  "species": "Dog",
  "age": 3
}

---

## ❤️ Adopciones

POST /api/adoptions

{
  "owner": "USER_ID",
  "pet": "PET_ID"
}

Esto automáticamente:

- Marca la mascota como adoptada
- La asigna al usuario
- Crea registro de adopción

PUT /api/adoptions/:aid/return

Revierte la adopción:

- mascota → adopted: false
- se elimina del usuario
- adopción pasa a "returned"

DELETE /api/adoptions/:aid

Elimina la adopción y sincroniza datos.

---

## 🧠 Arquitectura

Routes → Controllers → Services → DAO → MongoDB

Separación clara de responsabilidades:

- Controllers: capa HTTP
- Services: lógica de negocio
- DAO: acceso a base de datos
- Models: schemas

---

## 📚 Swagger

Documentación definida en:

/docs/users.yaml  
/docs/pets.yaml  
/docs/adoptions.yaml

Swagger permite:

- Explorar endpoints
- Ver schemas
- Probar requests en vivo

---

## 🚀 Conclusión

Este proyecto simula un sistema real de gestión de adopciones:

- mantiene integridad entre entidades
- evita adopciones duplicadas
- conserva historial
- arquitectura escalable

Entrega final Backend — Coderhouse
