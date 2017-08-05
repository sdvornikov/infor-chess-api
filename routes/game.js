module.exports = function(app, db) {

	app.get('/games', (req, res) => {
		db.collection('games').find().limit(100).toArray().then(result => {
			res.send(result);
		})
	});

};