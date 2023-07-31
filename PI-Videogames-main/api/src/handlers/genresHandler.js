const { getApiGenres } = require("../controllers/genresController");
const { Genre } = require("../db.js");

const genresHandler = async (req, res) => {
  try {
    let genresFromApi = await getApiGenres();

    const createdGenres = [];

    //! Iterar sobre los géneros de la API
    for (const genre of genresFromApi) {
      //! Buscar el género en la base de datos por nombre
      const existingGenre = await Genre.findOne({
        where: { name: genre },
      });
      //! Si el género no existe en la base de datos, crearlo
      if (!existingGenre) {
        const newGenre = await Genre.create({ name: genre });
        createdGenres.push(newGenre); //? Agregar el género creado al array
      } else {
        createdGenres.push(existingGenre); //? Agregar el género existente al array
      }
    }
    res.status(200).json(createdGenres); //? Enviar la lista de géneros creados o existentes
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = genresHandler;
