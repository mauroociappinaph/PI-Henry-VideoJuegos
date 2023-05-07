const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getController = require('../controllers/getController')
const postController = require('../controllers/postControllers')



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/videogames", getController.getAllVideogames);
router.get('/db/videogames', getController.getDbVideogames); 
router.get('/videogames/:id', getController.getVideogameById);
router.get('/videogames', getController.getVideogamesByName);
router.get('/genres' , getController.getGenres)
router.post('/videogames', postController.createVideogame);


module.exports = router;

/* 

*/