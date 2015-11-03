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
        uri: 'mongodb://localhost:27017/emigration',
        reconnected_time: 5000,
        options: {
            db: {
                safe: true
            }
        }
    },

    // Redis connection options
    redis: {
        port: 6379,
        host: '127.0.0.1'
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
    // Session properties
    session: {
        cookie: '__GSID__',               // Session id cookie
        user: 'userFrontInfo',           // Current user attribute
        emigration: 'emigration'                       // Attribute node of SNS application
    },

    // Identity service url
    identityService: {
        url: {
            host: '127.0.0.1',
            port: 7080
        },
        path: '/identity/ajax/rw/identity/getId/sns/10'
    },

    // Whether enable notify feature to fetch notifications from outside
    notify: true,

    zookeeper: '127.0.0.1:2181',

    dubbo: {
        interfaces: {
            comment: 'com.rongan.social.service.SocialService',
            user: 'com.rongan.rpc.IUserService',
            sms: 'com.rongan.rpc.sms.service.ISMSService'
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
var _env;
try {
    _env = require('./' + process.env.NODE_ENV + '.js')
} catch (err) {
    console.log(err);
}

module.exports = _.merge(all, _env);
