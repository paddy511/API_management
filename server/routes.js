/**
 * Created by qinghaibo on 2015/9/21.
 * Main application routes
 *
 */

'use strict';

var express = require('express');
var router = express.Router();

router.use('/product', require('./modules/product/router'));
router.use('/salesman', require('./modules/salesman/router'));
router.use('/order', require('./modules/order/router'));

module.exports = router;