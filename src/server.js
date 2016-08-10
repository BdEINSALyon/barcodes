'use strict';

const usage = "Usage : /{number} where number is an integer between 1 and 1000";

const utils = require('./utils');
const config = require('./config');

const app = require('express')();
module.exports = app;

const expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb(config.db.url));

app.get('/:number', function (req, res) {
    let uniques = new Set();
    let added  = [];
    let codes = req.db.collection('codes').find();

    let number = Number(req.params.number);

    if (number > 0 && number <= 1000) {
        codes.forEach(function (item) {
            uniques.add(item.value);
        }, function () {
            let size = uniques.size;
            while (uniques.size < size + number) {
                let rand = utils.random();
                if (!uniques.has(rand)) {
                    uniques.add(rand);
                    added.push({
                        value: rand
                    });
                }
            }
            req.db.collection('codes').insertMany(added);
            res.send(added.map(function (item) {
                return "c" + item.value;
            }));
        });
    }
    else {
        res.send(usage);
    }

});

app.get('/', function (req, res) {
    res.send(usage);
});
