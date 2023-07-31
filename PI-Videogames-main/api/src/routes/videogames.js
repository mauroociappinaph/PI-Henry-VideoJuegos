const { Router } = require("express");

//! Importar las funciones manejadoras de las solicitudes relacionadas con videojuegos.
const {
  videogamesHandler,         // Función para obtener todos los videojuegos o filtrarlos por nombre.
  videogamesHandlerById,     // Función para obtener un videojuego por su ID.
  videogamesPosts,           // Función para crear un nuevo videojuego.
} = require("../handlers/videogameHandler");


const videogamesRouter = Router();

//! Definir la ruta para obtener todos los videojuegos o filtrarlos por nombre.
videogamesRouter.get("/", videogamesHandler);

//! Definir la ruta para obtener un videojuego por su ID.
videogamesRouter.get("/:id", videogamesHandlerById);

//! Definir la ruta para crear un nuevo videojuego.
videogamesRouter.post("/", videogamesPosts);

module.exports = videogamesRouter;
