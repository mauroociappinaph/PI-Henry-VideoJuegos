const { Videogame, Genre } = require("../db.js");

const createVideogame = async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    background_image,
    genres,
  } = req.body;

  // Validar que se estén pasando los campos requeridos y que tengan el tipo y longitud correctos
  const validFields = [
    { field: "name", type: "string", minLength: 1 },
    { field: "description", type: "string", minLength: 1 },
    {
      field: "released",
      type: "string",
      minLength: 1,
      isValid: (value) => !isNaN(new Date(value).getTime()),
    },
    {
      field: "rating",
      type: "number",
      isValid: (value) => value >= 0 && value <= 5,
    },
    {
      field: "platforms",
      type: "array",
      isValid: (value) =>
        value.every((platform) => typeof platform === "string"),
    },
    { field: "background_image", type: "string", minLength: 1 },
    {
      field: "genres",
      type: "array",
      isValid: (value) =>
        value.every(
          (genre) => typeof genre === "string" && genre.trim().length <= 50
        ),
    },
  ];

  const invalidFields = validFields
    .filter(({ field, type, minLength, isValid }) => {
      const value = req.body[field];
      return (
        typeof value !== type ||
        (minLength && value.trim().length < minLength) ||
        (isValid && !isValid(value))
      );
    })
    .map(({ field }) => field);

  if (invalidFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Invalid fields: ${invalidFields.join(", ")}` });
  }

  try {
    // Buscar o crear los géneros en la base de datos y validar que sean válidos
    const genresDB = await Promise.all(
      genres.map(async (genre) => {
        const [dbGenre, created] = await Genre.findOrCreate({
          where: { name: genre },
          defaults: { name: genre },
        });
        return dbGenre;
      })
    );

    // Crear el videojuego en la base de datos y asociarlo con los géneros en la base de datos
    const videogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      background_image,
      genres: genresDB,
    }, {
      include: Genre
    });

    res.status(201).json(videogame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createVideogame,
};
