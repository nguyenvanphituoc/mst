'use strict';
const express = require('express'),
    ejs = require('ejs'),
    {NecJarModel} = require('./../model/test');

module.exports.createTest = (req, res) => {
    var newJar = NecJarModel.findById("59d79e24f001340bfc5ccc8f", (err, res) => {
        console.dir(res);
        res.tasks["02"] = {
            name: "hello"
        };
        res.save((err, affectedRow) => {

        });
    });
};
