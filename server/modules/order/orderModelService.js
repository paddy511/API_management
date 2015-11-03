/**
 * Created by qinghaibo on 2015/9/28.
 */
Order = require('./orderModel');
var Promise = require("mpromise");
var orderModelService = {};

orderModelService.saveOrder = function (order) {
    var promise = new Promise();
    var db_order = new Order(order);
    db_order.save(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has saved a order successful !")
        }
        promise.fulfill();
    });
    return promise;
};

orderModelService.updateOrder = function (order) {
    var promise = new Promise();
    console.log(order);
    Order.update({_id: order._id}, {$set: order}, {upsert: true})
        .exec(function (err) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: has updated a order successful !")
            }
            promise.fulfill();
        });
    return promise;
};

orderModelService.deleteOrderById = function (id) {
    var promise = new Promise();
    Order.findOne({_id: id}).remove(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has delete a order( id: " + id + ")  successful !")
        }
        promise.fulfill();
    });
    return promise;
};

orderModelService.getOrderInfoById = function (id) {
    var promise = new Promise();
    Order.findOne({_id: id}, function (err, order) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else if (order === null) {
            promise.reject({message: "the order not existed!"});
            console.log("mongo: the order( id: " + id + ") is not existed !")
        } else {
            console.log("mongo: has got a order( id: " + id + ")  successful !")
        }
        promise.fulfill(order);
    });
    return promise;
};

orderModelService.getOrderList = function (_start, _limit, count) {
    var promise = new Promise();
    var _skip = (_start - 1) * _limit;
    Order.find({}).limit(_limit).skip(_skip).sort({updateTime: -1})
        .exec(function (err, order) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: get the order list >>> start: " + _start + " limit:" + _limit);
            }
            promise.fulfill(order, count);
        });
    return promise;
};

orderModelService.getOrderCount = function (_start, _limit) {
    var promise = new Promise();
    Order.count({}, function (err, count) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: the totalCount of order is " + count + "  !")
        }
        promise.fulfill(_start, _limit, count);
    });
    return promise;
};

module.exports = orderModelService;