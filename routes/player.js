const config = require('../config/config');

module.exports = function(app, db) {
	function tokenValid(req) {
		return req.body.token == config.adminPasscode;
	}

  app.post('/players', (req, res) => {
	  if(!tokenValid(req)) {
		  res.status(401).send();
		  return;
	  }
  	// input validation
	req.check('name', 'Name is required').notEmpty();
  	req.check('name', 'Name should contain only letters and be 1 to 100 characters long')
			.isAlpha().isLength({min:1, max:100});
  	req.check('initRating', 'Initial rating should be an integer between 500 and 1000')
  		.optional().isInt({min:500, max:1000});

  	req.getValidationResult().then(result => {
			if (!result.isEmpty()) {
				throw result.array();
			}
			// adding a record to DB
			const player = { name: req.body.name, rating: req.body.initRating || 1000 };
			// TODO: check if a Player with this name already in DB
			return db.collection('players').insert(player);
		}).then(result => {
			// return the inserted record
			res.send(result.ops[0]);
		}).catch(err => {
				res.status(400).send(err);
		});
  });

	app.get('/players', (req, res) => {
		// TODO: think about pagination of the output
		db.collection('players').find().limit(100).toArray().then(result => {
			res.send(result);
		})
	});

};