const playerRoutes = require('./player');

module.exports = function(app, db) {
  playerRoutes(app, db);
};