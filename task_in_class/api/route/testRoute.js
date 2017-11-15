module.exports = function (express) {
    'use strict';
    const testController = require('./../controller/testController'),
        ejs = require('ejs'),
        route = express.Router();
    route.route('/test')
        .get((req, res) => {
            // check if login => about else render login
            res.send('hello')
        })
        .post(testController.createTest);
    return route
};