'use strict';
const express = require('express'),
    User = require('./../model/userModel'),
    ejs = require('ejs'),
    app = express();

module.exports.createNewUser = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;
    var errMes = "";
    //regex

    if (!name) {
        errMes += " Need enter user name.";
    }
    if (!email) {
        errMes += " Need enter user email.";
    }
    if (!passwd) {
        errMes += " Need enter user passwd.";
    }
    if (errMes) {
        ejs.renderFile('./api/view/register.ejs', {
            errMes: errMes
        }, (err, html) => {
            res.end(html);
        });
    } else {
        var newUser = User({
            name: name,
            email: email,
            passwd: passwd
        });
        newUser.save(function (err, user) {
            if (!err) {
                res.redirect('/login');
            } else {
                errMes = " Failed!";
                ejs.renderFile('./api/view/register.ejs', {
                    errMes: errMes
                }, (err, html) => {
                    res.end(html);
                });
            }
        });
    }
};

module.exports.readAUser = (req, res) => {
    const name = req.body.name;
    const passwd = req.body.passwd;
    var errMes = "";
    //regex

    if (!name) {
        errMes += " Need enter user name.";
    }
    if (!passwd) {
        errMes += " Need enter user passwd.";
    }
    if (errMes) {
        req.session.name = null;
        ejs.renderFile('./api/view/login.ejs', {
            errMes: errMes
        }, (err, html) => {
            res.end(html);
        });
    } else {

        User.findOne({
            name: name,
            passwd: passwd
        }, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                req.session.name = user.name;
                res.redirect('/about');
            }
        });
    }
};
