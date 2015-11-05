#!/usr/bin/env node
var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');
var config = require('../config/environment');
var server;

//connect to mangodb
function connectMongDB() {
    require('../components/database/mongodb')();
}

//output logs
function outPutLog() {
    require('../components/console_log')();
}

//create a server
function createServer(){
    var port = config.port;
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}

//Normalize a port into a number, string, or false.
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

//Event listener for HTTP server "error" event.
function onError(error) {
    var port = config.port;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Event listener for HTTP server "listening" event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

//=========== main =========
//start program
(function () {
    outPutLog();
    connectMongDB();
    createServer();
})();





// -------------------text-----------------
var projectService = require('../modules/project/projectService');
projectService.saveProject("ra_session_management");