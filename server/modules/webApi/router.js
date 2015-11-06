/**
 * Created by hewnbiao on 2015/11/6.
 */
var express = require('express');
var router = express.Router();
var nocache = require('../../components/helpers/nocache');
var webApiController = require('./webApiController');

//get projects version list
router.get("/versionlist",  nocache.noCache(), webApiController.getVersionList);
router.get("/detail",  nocache.noCache(), webApiController.getWebApiDetail);

//add projects
//router.post("/",  webApiController.saveProject);

module.exports = router;