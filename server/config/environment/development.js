'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost:27017/emigration',
        reconnected_time: 5000
    },

    // Redis connection options
    redis: {
        port: 6379,
        host: '192.168.80.129'
    },

    // Identity service url
    identityService: {
        url: {
            host: '192.168.80.129',
            port: 10006
        }
    },
    s3: {
        port: 10007,
        host: '192.168.80.129'
    },
    search:{
        port:10009,
        host:'127.0.0.1'
    },
    user:{
        port:10000,
        host:'192.168.80.129'
    },
    notify: true,

    zookeeper: '192.168.80.129:2181'

    // Whether enable notify feature to fetch notifications from outside
};
