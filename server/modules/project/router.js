/**
 * Created by qinghaibo on 2015/9/21.
 */
var express = require('express');
var router = express.Router();
var nocache = require('../../components/helpers/nocache');
var projectController = require('./projectController');

//get projects
router.get("/",  nocache.noCache(), projectController.getProjectList);

//add projects
router.post("/",  projectController.saveProject);

module.exports = router;