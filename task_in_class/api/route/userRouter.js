'use strict';
const express = require('express'),
    userController = require('./../controller/userController'),
    ejs = require('ejs'),
    route = express.Router();

route.route('/login')
    .get((req, res) => {
        // check if login => about else render login
        if (typeof req.session === 'undefined' || !req.session.name) {
            ejs.renderFile('./api/view/login.ejs', {}, (err, html) => {
                res.end(html);
            });
        } else {
            res.redirect('/about');
        }
    })
    .post(userController.readAUser);

route.route('/register')
    .get((req, res) => {
        ejs.renderFile('./api/view/register.ejs', {}, (err, html) => {
            res.end(html);
        });
    })
    .post(userController.createNewUser);

route.route('/about')
    .get((req, res) => {
        // check if login => render about else forward login
        if (typeof req.session !== 'undefined' && req.session.name) {
            var item = {};
            item.name = req.session.name;
            item.age = "21";
            ejs.renderFile('./api/view/about.ejs', item, (err, html) => {
                res.end(html);
            });
        } else {
            res.redirect('/login');
        }
    });

route.get('/logout', (req, res) => {
    if (typeof req.session !== 'undefined')
        req.session.destroy((err) => {
            console.log('session was destroyed');
            // req.session.reload();
            // req.logout();
            res.clearCookie('my.connect.sid');
            res.redirect('/about');
        });
    else {
        res.redirect('/login');
    }
});

module.exports = route;
