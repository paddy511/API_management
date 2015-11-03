/**
 * Created by qinghaibo on 2015/9/21.
 */
var mongoose = require('mongoose');
var config = require('../../config/environment');

//连接参数
var url, reconnected_time, connection;

//初始化连接参数
function initConnectionParams() {
    connection = mongoose.connection;
    url = config.mongo.uri;
    reconnected_time = config.mongo.reconnected_time;
}

//开始连接数据库
function startConnection() {
    console.log("start to connect the mongodb...");
    mongoose.connect(url);
}

//========== 连接回调事件 ===========
var timer;
function connectedCallback() {
    console.log("mongodb has connected successful!");
    if(timer){
        clearInterval(timer);
        timer = undefined;
    }
}

function disconnectedCallback() {
    console.log("disconnected to mongodb!");
    if(typeof timer === 'undefined'){
        timer = setInterval(startConnection, reconnected_time);
    }
}

function errorCallback() {
    console.log("fail to connect to mongodb !");
}

function startUpListeners() {
    connection.on('connected', connectedCallback);
    connection.on('disconnected', disconnectedCallback);
    connection.on('error', errorCallback);
}

//============ 连接mongodb 数据库 ==========
function connectMongdb() {
    initConnectionParams();
    startUpListeners();
    startConnection();
}

module.exports = connectMongdb;