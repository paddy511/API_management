'use strict';

/**
 * 远程评论服务(com.rongan.comment.service.ISMSService)的调用入口
 */

var Invoker = require('./lib/invoker');

var config = require('../../config/environment');

var invoker = new Invoker(config.zookeeper, config.dubbo.interfaces.sms);

exports.sendMessage = function ( messageInfo){
    return invoker.invoke('send2Mobil', [messageInfo.business, parseInt(messageInfo.phone), messageInfo.message, messageInfo.comment]);
};

exports.sendEmail = function (messageInfo){
   return  invoker.invoke('send2Email', [messageInfo.business, messageInfo.email, messageInfo.subject, messageInfo.comment]);
};