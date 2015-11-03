/**
 * Created by qinghaibo on 2015/9/28.
 */
var mongoose = require('mongoose');

var orderModel = {
    "_id": Number,
    "name": String,
    "phone": String,
    "productId": Number,
    "addTime": Date,
    "updateTime": Date
};

var orderSchema = mongoose.Schema(orderModel);

module.exports = mongoose.model('Order', orderSchema);