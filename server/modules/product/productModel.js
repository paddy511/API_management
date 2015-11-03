/**
 * Created by qinghaibo on 2015/9/22.
 */
var mongoose = require('mongoose');

var productModel = {
    "_id": Number,
    "productName": String,
    "salesmanId": Number,
    "tags": Array,
    "countryCode": String,
    "listPicId": Number,
    "infoPicId": Number,
    "MB_listPicId": Number,
    "MB_infoPicId": Number,
    "addTime": Date,
    "updateTime": Date,
    //用户排序
    "isTop": Number
};

var productSchema = mongoose.Schema(productModel);

module.exports = mongoose.model('Product', productSchema);