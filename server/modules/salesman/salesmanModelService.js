/**
 * Created by qinghaibo on 2015/9/25.
 */
Salesman = require('./salesmanModel');
var Promise = require("mpromise");
var salesmanModelService = {};

salesmanModelService.saveSalesman = function (salesman) {
    var promise = new Promise();
    var db_salesman = new Salesman(salesman);
    db_salesman.save(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has saved a salesman successful !")
        }
        promise.fulfill();
    });
    return promise;
};

salesmanModelService.updateSalesman = function (salesman) {
    var promise = new Promise();
    console.log(salesman);
    Salesman.update({_id: salesman._id}, {$set: salesman}, {upsert: true})
        .exec(function (err) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: has updated a salesman successful !")
            }
            promise.fulfill();
        });
    return promise;
};

salesmanModelService.deleteSalesmanById = function (id) {
    var promise = new Promise();
    Salesman.findOne({_id: id}).remove(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has delete a salesman( id: " + id + ")  successful !")
        }
        promise.fulfill();
    });
    return promise;
};

salesmanModelService.getSalesmanInfoById = function (id) {
    var promise = new Promise();
    Salesman.findOne({_id: id}, function (err, salesman) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else if (salesman === null) {
            promise.reject({message: "the salesman not existed!"});
            console.log("mongo: the salesman( id: " + id + ") is not existed !")
        } else {
            console.log("mongo: has got a salesman( id: " + id + ")  successful !")
        }
        promise.fulfill(salesman);
    });
    return promise;
};

salesmanModelService.getSalesmanList = function (_start, _limit, count) {
    var promise = new Promise();
    var _skip = (_start - 1) * _limit;
    Salesman.find({}).limit(_limit).skip(_skip).sort({updateTime: -1})
        .exec(function (err, salesmen) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: get the salesman list >>> start: " + _start + " limit:" + _limit);
            }
            promise.fulfill(salesmen, count);
        });
    return promise;
};

salesmanModelService.getSalesmanCount = function (_start, _limit) {
    var promise = new Promise();
        Salesman.count({}, function (err, count) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: the totalCount of salesman  is " + count + "  !")
            }
            promise.fulfill(_start, _limit, count);
        });
    return promise;
};

module.exports = salesmanModelService;