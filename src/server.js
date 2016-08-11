'use strict';

const upLimit = 5000;

const path = require('path');
const utils = require('./utils');
const config = require('./config');

const csv = require('express-csv');
const express = require('express');
const app = express();
module.exports = app;

const expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(config.db.url));

const staticDir = path.join(__dirname, 'static');
const staticOptions = {root: staticDir};

app.get('/:number', function (req, res) {
    getRandoms(req, function (err, randoms) {
        if (err) {
            res.sendFile('usage.html', staticOptions);
        }
        else {
            res.send(randoms);
        }
    })
});

app.get('/csv/:number', function (req, res) {
    getRandoms(req, function (err, randoms) {
        if (err) {
            res.sendFile('usage.html', staticOptions);
        }
        else {
            // Format for CSV : one array for each line
            let result = randoms.map(function (item) {
                return [item];
            });
            res.csv(result);
        }
    })
});

app.get('*', function (req, res) {
    res.sendFile('usage.html', staticOptions);
});


function getRandoms(req, callback) {
    let uniques = new Set();
    let added = [];

    /*
     If :number parameter contains characters other than digits,
     number will contain NaN and thus will fail the following test.
     Therefore, we fall into the else case.
     */
    let number = Number(req.params.number);

    if (number > 0 && number <= upLimit) {
        let codes = req.db.collection('codes').find();

        codes.forEach(function (item) {
            // Fetch data
            uniques.add(item.value);
        }, function () {
            let size = uniques.size;
            while (uniques.size < size + number) {
                // Generate random numbers and store them
                let rand = utils.random();
                if (!uniques.has(rand)) {
                    uniques.add(rand);
                    added.push({
                        value: rand
                    });
                }
            }

            // Save generated codes
            req.db.collection('codes').insertMany(added);

            callback(null, added.map(function (item) {
                return "c" +  utils.zeroPad(item.value);
            }));
        });
    }
    else {
        callback(new Error("Invalid parameter"));
    }
}
