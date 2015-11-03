/**
 * 从远端的identityy服务获取ID
 */
'use strict';

var http = require('http');
var config = require('../../config/environment');

var Promise = require('mpromise');

var IdentityService = function () {

    //可用identity本地缓存
    this.identity_pool = [];

    this.identity_url = config.identityService.url;
    this.identity_path = config.identityService.path;
};

IdentityService.prototype.getIdentityFromRemote = function (promise) {
    var onIdentityData = this._identityApplied;
    var _this = this;
    http.get({
        host: this.identity_url.host,
        port: this.identity_url.port || 7080,
        path: this.identity_path
    }, function (response) {
        var body = '';

        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {

            onIdentityData.call(_this, body, null, promise);
        });

        response.on('error', function (error) {
            onIdentityData.call(_this, null, error, promise);
        })
    }).on('error', function (error) {
        onIdentityData.call(_this, null, error, promise);
    });
};

IdentityService.prototype._identityApplied = function (data, error, promise) {
    if (error) {
        promise.reject(error);
        return;
    }

    var identity_resources = null;
    try {
        identity_resources = JSON.parse(data);
    }
    catch (err) {
        promise.reject(err);
        return promise;
    }

    if (!identity_resources.success) {
        promise.reject('Can not get identity from remote identity service');
        return;
    }

    var start_identity = identity_resources.result.info.id;
    var identity_size = identity_resources.result.info.count;

    for (var i = 0; i < identity_size; i++) {
        this.identity_pool.push(start_identity + i);
    }
    promise.fulfill(this.identity_pool.shift());

};

IdentityService.prototype.applyForIdentity = function () {
    var promise = new Promise();

    if (this.identity_pool.length > 0) {
        promise.fulfill(this.identity_pool.shift());//.shift()取数组第一个元素，并删除数组第一个元素
        return promise;
    }

    //从远端的identity服务申请identity资源
    this.getIdentityFromRemote(promise);


    return promise;
};

module.exports = new IdentityService();

