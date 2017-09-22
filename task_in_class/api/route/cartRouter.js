module.exports = function (express) {
    'use strict';
    const cartController = require('./../controller/cartController'),
        ejs = require('ejs'),
        route = express.Router();
    route.route('/cart')
        .get(cartController.readAllCart);
    
    
    route.route('/cart/:productId')
        .get(cartController.readCartItem)
        .delete(cartController.deleteCartItem);

    return route
};