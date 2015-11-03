'use strict';

// Test specific configuration
// ===========================
module.exports = {
    // Server port
    port: process.env.PORT ||
    10019,

    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost:27017/emigration',
        reconnected_time: 5000
    },

    // Redis connection options
    redis: {
        port: 6379,
        host: '127.0.0.1'
    },


    // Identity service url
    identityService: {
        url: {
            host: '127.0.0.1',
            port: 10006
        }
    },
    s3: {
        port: 10007,
        host: '127.0.0.1'
    },
    search: {
        port: 10009,
        host: '127.0.0.1'
    },
    user: {
        port: 10000,
        host: '127.0.0.1'
    },

    // Whether enable notify feature to fetch notifications from outside
    notify: true
};