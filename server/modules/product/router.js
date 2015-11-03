/**
 * Created by qinghaibo on 2015/9/21.
 */
var express = require('express');
var router = express.Router();
var nocache = require('../../components/helpers/nocache');
var productController = require('./productController');

//add product
router.post("/", productController.saveProduct);

//delete product
router.delete("/:id", productController.deleteProduct);

//get productInfo by id
router.get("/:id",  nocache.noCache(), productController.getProductInfoById);

//get productList
router.get("/",  nocache.noCache(), productController.getProductList);

//update productInfo by id
router.patch("/:id", productController.updateProduct);

module.exports = router;