/**
 * Created by qinghaibo on 2015/9/21.
 * Main application routes
 *
 */

'use strict';

var express = require('express');
var router = express.Router();

router.use('/projects', require('./modules/project/router'));
router.use('/webapi', require('./modules/webApi/router'));

module.exports = router;