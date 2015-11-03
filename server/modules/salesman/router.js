/**
 * Created by qinghaibo on 2015/9/25.
 */
var express = require('express');
var router = express.Router();
var nocache = require('../../components/helpers/nocache');
var salesmanController = require('./salesmanController');

//add
router.post("/", salesmanController.saveSalesman);

//delete product
router.delete("/:id", salesmanController.deleteSalesman);

//get productInfo by id
router.get("/:id",  nocache.noCache(), salesmanController.getSalesmanInfoById);

//get productList
router.get("/",  nocache.noCache(), salesmanController.getSalesmanList);

//update productInfo by id
router.patch("/:id", salesmanController.updateSalesman);


module.exports = router;