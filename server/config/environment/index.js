'use strict';

var path = require('path');
var _ = require('lodash');


// Configurations that will be override by environment
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../../'),

    // Server port
    port: process.env.PORT || 10019,


    // MongoDB connection options
    mongo: {
        uri: 'mongodb://192.168.0.26:27017/api_web',
        reconnected_time: 5000,
        options: {
            db: {
                safe: true
            }
        }
    }

};


module.exports = all;
