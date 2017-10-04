'use strict';
const express = require('express'),
    mongoose = require('mongoose'),
    ProductModel = require('./../model/productModel')(mongoose),
    CartModel = require('./../model/cartModel'),
    ejs = require('ejs'),
    app = express();

module.exports.createAProduct = (req, res) => {
    var newPro = ProductModel(req.body);
    newPro.save(function (err, produtc) {
        ejs.renderFile('./api/view/product.ejs', {
            errMes: err ? err : "Successful!"
        }, (err, html) => {
            res.end(html);
        });
    });
};

module.exports.readAllProduct = (req, res) => {
    //
    let txtQuery =  req.query.q ? {$text: {$search: req.query.q}} : null;
    //
    let fromValue = req.query.from ? req.query.from : null;
    let toValue =  req.query.to ?  req.query.to : null;
    let priceQuery = fromValue ? 
                    (toValue ? 
                        {
                            price: {$gte: fromValue, $lte: toValue}
                        } :
                        {
                            price: {$gte: fromValue}
                        }
                    ) : 
                    (toValue ? 
                        {
                            price: {$lte: toValue}
                        } : 
                        null
                    )
    //
    let builderQuery = txtQuery ? 
                    (priceQuery ? 
                        {
                            $text: txtQuery.$text,
                            price: priceQuery.price
                        } :
                        {
                            $text: txtQuery.$text
                        }
                    ) : 
                    (priceQuery ? 
                        {
                            price: priceQuery.price
                        } : 
                        {}
                    )
    //
    ProductModel.find( builderQuery, function (err, products) {
        if (err)
            res.send(err);
        ejs.renderFile('./api/view/productList.ejs', { products: products ? products : [] }, (err, html) => {
            if (err) {
                res.send(err);
            }
            res.end(html);
        });
    });
};

module.exports.addProductsToCart = (req, res) => {
    if (req.body.products.length > 0) {
        let products = req.body.products.split(',');
        let cart = new CartModel(req.session.cart ? req.session.cart : {});
        let length = products.length;
        let currentTotalItems = cart.totalItems;
        for (var i = 0; i < length; i++) {
            var productId = products[i];
            ProductModel.findById(productId, function (err, product) {
                if (err)
                    res.send(err);
                cart.add(product, product._id);
                if (cart.totalItems === length + currentTotalItems) {
                    req.session.cart = cart;
                    req.session.save(function (err) {
                        // session saved
                        req.session.reload(function (err) {
                            // session updated
                            res.redirect('/cart');
                        })
                    })
                }
            });
        }
    } else {
        res.redirect('/cart');
    }
};

