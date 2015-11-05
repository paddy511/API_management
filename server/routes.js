/**
 * Created by qinghaibo on 2015/9/21.
 * Main application routes
 *
 */

'use strict';

var express = require('express');
var router = express.Router();

router.use('/projects', require('./modules/project/router'));

module.exports = router;