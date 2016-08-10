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

    /*
        If :number parameter contains characters other than digits,
        number will contain NaN and thus will fail the following test.
        Therefore, we fall into the else case.
     */
    let number = Number(req.params.number);

    if (number > 0 && number <= 1000) {
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

            // Send them
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
