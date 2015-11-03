/**
 * Created by qinghaibo on 2015/9/28.
 */
var express = require('express');
var router = express.Router();
var nocache = require('../../components/helpers/nocache');
var orderController = require('./orderController');

//add product
router.post("/", orderController.saveOrder);

//delete product
router.delete("/:id", orderController.deleteOrder);

//get productInfo by id
router.get("/:id",  nocache.noCache(), orderController.getOrderInfoById);

//get productList
router.get("/",  nocache.noCache(), orderController.getOrderList);

//update productInfo by id
router.patch("/:id", orderController.updateOrder);

module.exports = router;