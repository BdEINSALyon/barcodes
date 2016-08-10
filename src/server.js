'use strict';

const utils = require('./utils');

const express = require('express');
const app = express();
module.exports = app;

app.get('/:number', function (req, res) {
    let uniques = new Set();
    while (uniques.size < req.params.number) {
        uniques.add(utils.random());
    }
    console.log([...uniques]);
    res.send([...uniques]);
});
