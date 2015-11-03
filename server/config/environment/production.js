'use strict';

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.IP ||
    undefined,

    // Server port
    port: process.env.PORT ||
    10019,

    // MongoDB connection options
    mongo: {
        uri: process.env.EMIGRATION_MONGOLAB_URI ||
        'mongodb://localhost:27017/emigration',
        reconnected_time: 5000
    },

    // Redis connection options
    redis: {
        port: process.env.EMIGRATION_REDIS_PORT || 6379,
        host: process.env.EMIGRATION_REDIS_HOST || 'localhost'
    },
    s3: {
        port: process.env.EMIGRATION_S3_PORT || 10007,
        host: process.env.EMIGRATION_S3_HOST || '127.0.0.1'
    },
    search: {
        port: process.env.EMIGRATION_SEARCH_PORT || 10009,
        host: process.env.EMIGRATION_SEARCH_HOST || '127.0.0.1'
    },
    user: {
        port: process.env.EMIGRATION_USER_PORT || 10000,
        host: process.env.EMIGRATION_USER_HOST || '127.0.0.1'
    },
    identityService: {
        url: {
            host: process.env.EMIGRATION_IDENTITY_HOST || '127.0.0.1',
            port: process.env.EMIGRATION_IDENTITY_PORT || 7080
        },
        path: '/identity/ajax/rw/identity/getId/emigration/10'
    },

    zookeeper: process.env.ZOOKEEPER || "127.0.0.1:2181",
    // Whether enable notify feature to fetch notifications from outside
    notify: true
};