/**
 * Created by qinghaibo on 2015/9/28.
 */
var identityService = require('../../components/services/identityService');
var orderModelService = require('./orderModelService');
var productService = require('../product/productService');
var salesmanService = require('../salesman/salesmanService');
var sendMessage = require('../../components/remotecalls/sendMessage');

var orderService = {};

//=========== save =========
orderService.getOrderFromReq = function (req) {
    var order = {
        name: req.body.name,
        phone: req.body.phone,
        productId: req.body.productId
    };
    return order;
};

orderService.saveOrder = function (order) {
    return identityService.applyForIdentity()
        .then(function (id) {
            order._id = id;
            order.addTime = new Date();
            order.updateTime = new Date();
            return order;
        })
        .then(orderModelService.saveOrder);
};

orderService.updateOrder = function (order) {
    return orderModelService.updateOrder(order);
};

//========== delete ==========
orderService.deleteOrderById = function (id) {
    return orderModelService.deleteOrderById(id);
};

//========== query ==========
orderService.getOrderInfoById = function (id) {
    return orderModelService.getOrderInfoById(id);
};

orderService.getOrderList = function (start, limit) {
    return orderModelService.getOrderCount(start, limit)
        .then(orderModelService.getOrderList);
};

//========= other ==========
function getSMSMessage(_order, salesman, productName) {
    var time = getFormatDate();
    var salesmanName = salesman.name;
    return "你好，" + salesmanName + "！客户：" + _order.name + ", 联系电话：" + _order.phone + "。于" + time + "预约了" + productName + "。请及时联系客户。"
}

function getEmailMessage(_order, salesman, productName) {
    var time = getFormatDate();
    var salesmanName = salesman.name;
    return "你好，" + salesmanName + "！客户：" + _order.name + ", 联系电话：" + _order.phone + "。于" + time + "预约了" + productName + "。请及时联系客户。"
}

function getFormatDate() {
    var now = new Date();
    return (now.getYear() + 1900) + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
}

//发送信息给 salesman
orderService.sendMessageToSalesman = function (_order) {
    var productName;
    var messageInfo = {
        business: "emigrationOrder",
        comment: "reserve"
    };
    return productService.getProductInfoById(_order.productId)
        .then(function (product) {
            productName = product.productName;
            return product.salesmanId;
        })
        .then(salesmanService.getSalesmanInfoById)
        .then(function (salesman) {
            messageInfo.phone = salesman.phone;
            messageInfo.message = getSMSMessage(_order, salesman, productName);
            console.log("send message info is >>>>>>>>>>>>>>>>>>>>>:");
            console.log(messageInfo);
            return messageInfo;
        })
        .then(sendMessage.sendMessage);

};

//发送邮件给salesman
orderService.sendEmailToSalesman = function (_order) {
    var productName;
    var messageInfo = {
        business: "emigrationOrder",
        subject: "移民产品预约"
    };
    return productService.getProductInfoById(_order.productId)
        .then(function (product) {
            productName = product.productName;
            return product.salesmanId;
        })
        .then(salesmanService.getSalesmanInfoById)
        .then(function (salesman) {
            messageInfo.email = salesman.email;
            messageInfo.comment = getEmailMessage(_order, salesman, productName);
            console.log("send message info is >>>>>>>>>>>>>>>>>>>>>:");
            console.log(messageInfo);
            return messageInfo;
        })
        .then(sendMessage.sendEmail);

};

module.exports = orderService;