module.exports = function (express) {
    'use strict';
    const productController = require('./../controller/productController'),
        ejs = require('ejs'),
        route = express.Router();
    route.route('/product')
        .get((req, res) => {
            // check if login => about else render login
            ejs.renderFile("./api/view/product.ejs", {}, (err, html) => {
                res.end(html);
            })
        })
        .post(productController.createAProduct);

    route.route('/product/list')
        .get(productController.readAllProduct)
        .post(productController.addProductsToCart);
    return route
};