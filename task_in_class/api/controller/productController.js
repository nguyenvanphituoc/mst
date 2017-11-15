"use strict";
const express = require("express"),
  mongoose = require("mongoose"),
  ProductModel = require("./../model/productModel")(mongoose),
  CartModel = require("./../model/cartModel"),
  ejs = require("ejs"),
  app = express();

module.exports.createAProduct = (req, res) => {
  var newPro = ProductModel(req.body);
  newPro.save(function(err, produtc) {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send(produtc);
  });
};

module.exports.readAllProduct = (req, res) => {
  //
  let txtQuery = req.query.q ? { $text: { $search: req.query.q } } : null;
  //
  let fromValue = req.query.from ? req.query.from : null;
  let toValue = req.query.to ? req.query.to : null;
  let priceQuery = fromValue
    ? toValue
      ? {
          price: { $gte: fromValue, $lte: toValue }
        }
      : {
          price: { $gte: fromValue }
        }
    : toValue
      ? {
          price: { $lte: toValue }
        }
      : null;
  //
  let builderQuery = txtQuery
    ? priceQuery
      ? {
          $text: txtQuery.$text,
          price: priceQuery.price
        }
      : {
          $text: txtQuery.$text
        }
    : priceQuery
      ? {
          price: priceQuery.price
        }
      : {};
  //
  ProductModel.find(builderQuery, function(err, products) {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send(products);
  });
};

module.exports.addProductsToCart = (req, res) => {
  if (req.body.products.length > 0) {
    let products = req.body.products;
    let cart = new CartModel(req.session.cart ? req.session.cart : {});
    let length = products.length;
    let currentTotalItems = cart.totalItems;
    let traceProductId = [];
    for (var i = 0; i < length; i++) {
      var productId = products[i];
      ProductModel.findById(productId, function(err, product) {
        if (err) {
          for (
            let j = 0, addedLength = traceProductId.length;
            j < addedLength;
            i++
          ) {
            cart.remove(traceProductId[j]);
          }
          return res.status(500).send(err.message);
        }
        cart.add(product, product._id);
        traceProductId.push(productId);
        if (cart.totalItems === length + currentTotalItems) {
          req.session.save(function(err) {
            // session saved
            req.session.reload(function(err) {
              // session updated
              res.status(200).json(cart.getItems());
            });
          });
        }
      });
    }
  } else if (req.body.products.length === 0) {
           res.status(404).json("Empty");
  } else {
    res.status(400).json("Error");
  }
};
