'use strict';
const express = require('express'),
    User = require('./../model/userModel'),
    ejs = require('ejs'),
    bcrypt = require('bcrypt-nodejs'),
    app = express();

module.exports.createNewUser = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;
    //regex
    var newUser = User({
        name: name,
        email: email,
        passwd: passwd
    });
    newUser.save(function (err, user) {
        if (!err) {
            res.redirect('/login');
        } else {
            ejs.renderFile('./api/view/register.ejs', {
                errMes: err
            }, (err, html) => {
                res.end(html);
            });
        }
    });
};

module.exports.readAUser = (req, res) => {
    const name = req.body.name;
    const passwd = bcrypt.hashSync(req.body.passwd);
    //regex
    User.findOne({
        name: name,
        passwd: passwd
    }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                req.session.name = user.name;
                res.redirect('/about');
            } else {
                req.session.name = null;
                ejs.renderFile('./api/view/login.ejs', {
                    errMes: "passwd or user not correct"
                }, (err, html) => {
                    res.end(html);
                });
            }
        }
    });
};
