const config = require('../config/config');

module.exports = function(app, db) {
    app.post('/admin', (req, res) => {
        if(req.body.passcode == config.adminPasscode) {
            res.send();
        }
        res.status(401).send();
    });
};