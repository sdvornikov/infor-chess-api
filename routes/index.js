const playerRoutes = require('./player');
const gameRoutes = require('./game');
const adminRoutes = require('./admin');


module.exports = function(app, db) {
  playerRoutes(app, db);
  gameRoutes(app, db);
  adminRoutes(app, db);
};