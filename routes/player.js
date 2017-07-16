module.exports = function(app, db) {

  app.post('/players', (req, res) => {
  	// input validation
  	req.check('name', 'Name is required').notEmpty();
  	req.check('name', 'Name should contain only letters and be 1 to 100 characters long')
			.isAlpha().isLength({min:1, max:100});
  	req.check('initRating', 'Initial rating should be an integer between 500 and 1000')
  		.optional().isInt({min:500, max:1000});

		var errors = req.getValidationResult().then(result => {
			if (!result.isEmpty()) {
				res.status(400).send(result.array());
				return;
			}
			// adding a record to DB
			const player = { name: req.body.name, rating: req.body.initRating || 1000 };
			db.collection('players').insert(player, (err, result) => {
				if (err) { 
					res.send({ 'error': 'Error adding a player' }); 
				} else {
					// return the inserted record
					res.send(result.ops[0]);
				}
			});
		});
  });

};