/**
 * Created by qinghaibo on 2015/9/24.
 */

var productModelService = require('./productModelService');

var productService = {};

//=========== save =========
productService.getProductFromReq = function(req){
    var product = {
        productName: req.body.productName,
        salesmanId: req.body.salesmanId,
        tags: req.body.tags,
        isTop: req.body.isTop,
        countryCode: req.body.countryCode,
        listPicId: req.body.listPicId,
        infoPicId: req.body.infoPicId,
        MB_listPicId: req.body.MB_listPicId,
        MB_infoPicId: req.body.MB_infoPicId
    };
    return product;
};

productService.saveProduct = function(product){
    return identityService.applyForIdentity()
        .then(function(id){
            product._id = id;
            product.addTime = new Date();
            product.updateTime = new Date();
            return product;
        })
        .then(productModelService.saveProduct);
};

productService.updateProduct = function(product){
    return productModelService.updateProduct(product);
};

//========== delete ==========
productService.deleteProductById = function (id){
   return  productModelService.deleteProductById(id);
};

//========== query ==========
productService.getProductInfoById = function (id){
    return  productModelService.getProductInfoById(id);
};

productService.getProductList = function (start, limit, tag){
    return productModelService.getProductCount(start, limit, tag)
        .then(productModelService.getProductList);
};

module.exports = productService;