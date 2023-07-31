
const server = require('./src/app.js');
//! Importar la conexión a la base de datos desde el archivo db.js
const { conn } = require('./src/db.js');
const PORT = 3001;

//! Sincronizar todos los modelos de la base de datos a la vez.
conn.sync({ alter: true }).then(() => {
  server.listen(PORT, () => {
    console.log('Is listening at 3001'); 
  });
});
