/**
 * Created by qinghaibo on 2015/9/28.
 */
var orderService = require('./orderService');
var actionResult = require('../../components/services/actionResult');
var orderController = {};

orderController.saveOrder = function (req, res) {
    var _order = orderService.getOrderFromReq(req);
    //保存订单
    orderService.saveOrder(_order)
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
        });

    ////发送短消息
    //orderService.sendMessageToSalesman(_order)
    //    .then(function () {
    //        console.log("send message success!");
    //    }, function (err) {
    //        console.log(err);
    //    });

    //发送邮件
    orderService.sendEmailToSalesman(_order)
        .then(function () {
            console.log("send email message success!");
        }, function (err) {
            console.log(err)
        });
};

orderController.deleteOrder = function (req, res) {
    if (req.params.id === undefined) {
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    orderService.deleteOrderById(id)
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

orderController.getOrderInfoById = function (req, res) {
    if (req.params.id === undefined) {
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    orderService.getOrderInfoById(id)
        .then(function (order) {
            res.statusCode = 200;
            actionResult.successInfo(order);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

orderController.getOrderList = function (req, res) {
    orderService.getOrderList(req.query.start, req.query.limit)
        .then(function (orders, count) {
            res.statusCode = 200;
            actionResult.successList(count, orders);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

orderController.updateOrder = function (req, res) {
    var _order = req.body;
    if (req.params.id === undefined) {
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    _order._id = req.params.id;
    _order.updateTime = new Date();
    orderService.updateOrder(_order)
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

module.exports = orderController;