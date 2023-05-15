const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

//!SECTION Get all Video Game de la API
const getAllVideogames = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page_size=100`
    );
    const videogames = response.data.results.map(
      ({ name, genres, platforms, background_image, released, rating }) => ({
        name,
        genres: genres.map((genres) => genres.name),
        platforms: platforms.map((platform) => platform.platform.name),
        background_image,
        released,
        rating,
      })
    );
    res.status(200).send(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "No encontró videogames" });
  }
};

//!SECTION get DB
const getDbVideogames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

//!SECTION obtiene info de la API y de la BD
const getVideogameById = async (req, res) => {
  try {
    const { id } = req.params;
    const api = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
    const response = await axios.get(api);
    const game = response.data;
    const gameDetail = {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      description: game.description,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map((element) => element.platform.name),
      genres: game.genres.map((genres) => genres.name),
    };
    res.status(200).json(gameDetail);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

//!SECTION obtiene info por nombre.
const getVideogamesByName = async (req, res) => {
  const name = req.query.name;
  const videogamesTotal = await getDbVideogames(); // <-- Se cambia la llamada de función aquí

  if (name) {
    const videogamesName = videogamesTotal.filter(({ name: gameName }) =>
      gameName.toLowerCase().includes(name.toLowerCase())
    );

    return videogamesName.length
      ? res.status(200).send(videogamesName)
      : res.status(404).send("No se encontró el videojuego");
  }

  res.status(200).send(videogamesTotal);
};

//!SECTION Obtiene info de genres
const getGenres = async (req, res) => {
  try {
    // Busca los géneros en la base de datos
    const genresFromDB = await Genre.findAll();

    // Si hay géneros en la base de datos, los envía como respuesta
    if (genresFromDB.length > 0) {
      return res.json(genresFromDB);
    }

    // Si no hay géneros en la base de datos, los obtiene de la API y los guarda
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresFromAPI = response.data.results.map(({ name }) => ({ name }));

    await Genre.bulkCreate(genresFromAPI);

    res.json(genresFromAPI);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inesperado" });
  }
};

module.exports = {
  getAllVideogames,
  getDbVideogames,
  getVideogameById,
  getVideogamesByName,
  getGenres,
};
