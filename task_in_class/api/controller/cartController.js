'use strict';
const express = require('express'),
    ejs = require('ejs'),
    CartModel = require('./../model/cartModel');

module.exports.readAllCart = (req, res) => {
    const cart = new CartModel(req.session.cart ? req.session.cart : {});
    var _array = cart.getItems();
    return res.status(200).json(_array);
    // ejs.renderFile('./api/view/cartList.ejs', { carts: _array }, (err, html) => {
    //     res.end(html);
    // })
};

module.exports.deleteCartItem = (req, res) => {
    const cart = new CartModel(req.session.cart ? req.session.cart : {});
    const _id   = req.params.productId;
    cart.remove(_id);
    var _array = cart.getItems();
    return res.status(200).json({ carts: _array });
    // ejs.renderFile('./api/view/cartList.ejs', { carts: _array }, (err, html) => {
    //     res.end(html);
    // })
};

module.exports.readCartItem = (req, res) => {
  const cart = new CartModel(req.session.cart ? req.session.cart : {});
    const _id   = req.params.productId;
    return res.status(200).json({ cart: cart.items[_id] });
    // res.json(cart.items[_id]);
};
