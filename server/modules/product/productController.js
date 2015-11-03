/**
 * Created by qinghaibo on 2015/9/22.
 */
var productService = require('./productService');
var actionResult = require('../../components/services/actionResult');
var productController = {};

productController.saveProduct = function (req, res) {
    var _product = productService.getProductFromReq(req);
    productService.saveProduct(_product)
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
};

productController.deleteProduct = function (req, res) {
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    productService.deleteProductById(id)
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

productController.getProductInfoById = function (req, res) {
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    var id = req.params.id;
    productService.getProductInfoById(id)
        .then(function (product) {
            res.statusCode = 200;
            actionResult.successInfo(product);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

productController.getProductList = function (req, res) {
    productService.getProductList(req.query.start, req.query.limit, req.query.tag)
        .then(function (products, count) {
            res.statusCode = 200;
            actionResult.successList(count, products);
            res.json(actionResult);
            res.end();
        }, function (err) {
            res.status(500);
            actionResult.failure(err && err.message);
            res.json(actionResult);
            res.end();
        })
};

productController.updateProduct = function (req, res) {
    var _product = req.body;
    if(req.params.id === undefined){
        res.status(500);
        actionResult.failure("must pass the _id");
        res.json(actionResult);
        res.end();
        return;
    }
    _product._id = req.params.id;
    _product.updateTime = new Date();
    productService.updateProduct(_product)
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

module.exports = productController;