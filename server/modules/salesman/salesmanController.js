/**
 * Created by qinghaibo on 2015/9/25.
 */
var salesmanService = require('./salesmanService');
var actionResult = require('../../components/services/actionResult');
var salesmanController = {};

salesmanController.saveSalesman = function (req, res) {
    var _salesman = salesmanService.getSalesmanFromReq(req);
    salesmanService.saveSalesman(_salesman)
        .then(function () {
            res.statusCode = 200;
            actionResult.successInfo();
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

salesmanController.deleteSalesman = function (req, res) {
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    salesmanService.deleteSalesmanById(id)
        .then(function () {
            res.statusCode = 200;
            actionResult.successInfo();
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

salesmanController.getSalesmanInfoById = function (req, res) {
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    salesmanService.getSalesmanInfoById(id)
        .then(function (salesman) {
            res.statusCode = 200;
            actionResult.successInfo(salesman);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

salesmanController.getSalesmanList = function (req, res) {
    salesmanService.getSalesmanList(req.query.start, req.query.limit)
        .then(function (salesmen, count) {
            res.statusCode = 200;
            actionResult.successList(count, salesmen);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

salesmanController.updateSalesman = function (req, res) {
    var _salesman = req.body;
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    _salesman._id = req.params.id;
    _salesman.updateTime = new Date();
    salesmanService.updateSalesman(_salesman)
        .then(function () {
            res.statusCode = 200;
            actionResult.successInfo();
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

module.exports = salesmanController;