# ✊✋✌️ Piedra, Papel o Tijera – Multijugador

Proyecto **full-stack** de un juego multijugador de **Piedra, Papel o Tijera**, desarrollado con **Node.js, Express y Sequelize** en el backend, y **HTML, CSS y JavaScript (Vite)** en el frontend.

---

## 🚀 Tecnologías utilizadas

### Backend

- Node.js
- Express
- Sequelize ORM
- MySQL
- JWT (JSON Web Tokens)
- bcrypt
- dotenv

### Frontend

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite

---

## 🔐 Autenticación

El sistema utiliza **JWT** para la autenticación:

- En el login se genera un token
- El token se guarda en `sessionStorage`
- Las rutas protegidas usan un middleware de autenticación
- El backend identifica al usuario a través de `req.user`

---

## 👤 Usuarios

Cada usuario puede:

- Registrarse
- Iniciar sesión
- Crear **una sola partida activa** (en espera o en progreso)
- Unirse a partidas creadas por otros usuarios
- Abandonar partidas

---

## 🎮 Partidas

### Tipos de partida

- **Contra humano**
  - La partida queda en estado `espera`
  - El creador espera a que otro usuario se una
- **Contra máquina**
  - La partida comienza inmediatamente

### Estados de la partida

- `espera`
- `en_progreso`
- `finalizada`

---

## 🕹️ Lógica del juego

- Juego al **mejor de 5 rondas**
- Gana el primer jugador que llega a **3 victorias**
- Cada ronda:
  - Ambos jugadores eligen simultáneamente
  - El backend resuelve la ronda
  - Se actualiza el marcador
- Al finalizar la partida:
  - Se guarda el ganador
  - El estado pasa a `finalizada`

---

## 🔄 Sincronización entre jugadores

No se utilizan WebSockets.La sincronización se realiza mediante **polling** desde el frontend:

- El cliente consulta periódicamente el estado de la partida
- Cuando ambos jugadores han elegido, se resuelve la ronda
- Cuando la partida cambia de estado, ambos clientes reaccionan

---

## 🖥️ Interfaz de juego

- Iconos visuales de:
  - ✊ Piedra
  - ✋ Papel
  - ✌️ Tijeras
- Marcador visible durante la partida
- Alert final al terminar el juego

---

## ⚙️ Configuración del entorno

Ejemplo de archivo `.env`:

```env
PORT=9090

DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_DEV=piedrapapeltijeras_dev

JWT_SECRET=clave_secreta


```
