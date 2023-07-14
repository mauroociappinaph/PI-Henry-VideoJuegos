
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3002, () => {
    console.log('Is listening at 3002'); // eslint-disable-line no-console
  });
});
