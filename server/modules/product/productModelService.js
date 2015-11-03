/**
 * Created by qinghaibo on 2015/9/22.
 */
Product = require('./productModel');
var Promise = require("mpromise");
var productModelService = {};

productModelService.saveProduct = function (product) {
    var promise = new Promise();
    var db_product = new Product(product);
    db_product.save(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has saved a product successful !")
        }
        promise.fulfill();
    });
    return promise;
};

productModelService.updateProduct = function (product) {
    var promise = new Promise();
    console.log(product);
    Product.update({_id: product._id}, {$set: product},  {upsert: true})
        .exec(function (err) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: has updated a product successful !")
            }
            promise.fulfill();
        });
    return promise;
};

productModelService.deleteProductById = function (id) {
    var promise = new Promise();
    Product.findOne({_id: id}).remove(function (err) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else {
            console.log("mongo: has delete a product( id: " + id + ")  successful !")
        }
        promise.fulfill();
    });
    return promise;
};

productModelService.getProductInfoById = function (id) {
    var promise = new Promise();
    Product.findOne({_id: id}, function (err, product) {
        if (err) {
            console.log(err);
            promise.reject(err);
        } else if (product === null) {
            promise.reject({message: "the product not existed!"});
            console.log("mongo: the product( id: " + id + ") is not existed !")
        } else {
            console.log("mongo: has got a product( id: " + id + ")  successful !")
        }
        promise.fulfill(product);
    });
    return promise;
};

productModelService.getProductList = function (_start, _limit, tag, count) {
    var promise = new Promise();
    var _skip = (_start - 1) * _limit;
    if (tag === 'All') {
        Product.find({}).limit(_limit).skip(_skip).sort({isTop: -1 , updateTime: -1})
            .exec(function (err, products) {
                if (err) {
                    console.log(err);
                    promise.reject(err);
                } else {
                    console.log("mongo: get the product list >>> start: " + _start + " limit:" + _limit + "  tag:" + tag);
                }
                promise.fulfill(products, count);
            });
    } else {
        Product.find({tags: {$in: [tag]}}).limit(_limit).skip(_skip).sort({isTop: -1 , updateTime: -1})
            .exec(function (err, products) {
                if (err) {
                    console.log(err);
                    promise.reject(err);
                } else {
                    console.log("mongo: get the product list >>> start: " + _start + " limit:" + _limit + "  tag:" + tag);
                }
                promise.fulfill(products, count);
            });
    }
    return promise;
};

productModelService.getProductCount = function (_start, _limit, tag) {
    var promise = new Promise();
    if (tag === 'All') {
        Product.count({}, function (err, count) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: the totalCount of product( tag: " + tag + ") is " + count + "  !")
            }
            promise.fulfill(_start, _limit, tag, count);
        });
    } else {
        Product.count({tags: {$in: [tag]}}, function (err, count) {
            if (err) {
                console.log(err);
                promise.reject(err);
            } else {
                console.log("mongo: the totalCount of product( tag: " + tag + ") is " + count + "  !")
            }
            promise.fulfill(_start, _limit, tag, count);
        });
    }
    return promise;
};

module.exports = productModelService;