'use strict';
require('dotenv').config({silent: true});

const throng = require('throng');
const WORKERS = process.env.WEB_CONCURRENCY || 1;


function start() {
    const app = require('../server');
    // Specify listen port
    app.set('port', process.env.PORT || 3000);

    // Start listening
    const server = app.listen(app.get('port'), function () {
        const port = server.address().port;
        console.log('Listening on %s', port);
    });
}

throng({
    workers: WORKERS,
    lifetime: Infinity,
    start: start
});
