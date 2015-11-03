var zookeeper = require('node-zookeeper-client');
var config = require('./zkconfig');
var util = require("util");
var events = require("events");
var url = require('url');
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

var HESSIAN = 'hessian';

function Zk(zkoptions){
    events.EventEmitter.call(this);
    this.client = zookeeper.createClient(zkoptions.hosts,
        {   connectTimeout:1000,
            retries : 3 // Defaults to 0, no retry.
        });
    this.interfaces = zkoptions.interfaces;

    this.interfacespaths=[];
    this.config = config;
    this.gbservicelist = {};
    this.initflag = false;
}

util.inherits(Zk, events.EventEmitter);

Zk.prototype.selecturl = function(interfacename){
    var serverlist = this.gbservicelist[interfacename];
    return this.config.loaderbalanceconfig.radrom(serverlist);
}

Zk.prototype.reselecturl = function(interfacename,url){
    var serverlist = this.gbservicelist[interfacename];
    return this.config.loaderbalanceconfig.reradrom(serverlist,url);
}


Zk.prototype.watchChildren = function(key,path){
    var self = this;
    this.client.getChildren(
        path,
        function (event) {
            console.log('Got watcher event: %s', event);
            self.watchChildren(key, path);
        },
        function (error, childrens, stat) {
            if (error) {
                console.log(
                    'Failed to list children of %s due to: %s.',
                    path,
                    error
                );
                self.initflag = false;
                return;
            }

            var i=0;
            var tempServicelist = [];
            for(i=0;i<childrens.length;i++){
                var data = unescape(childrens[i]);
                var parseobj = url.parse(data);
                var host = parseobj.host;
                var pathname = parseobj.pathname;
                pathname = pathname.replace("//",'/');
                var protocol = parseobj.protocol;
                if(!protocol || protocol.indexOf(HESSIAN) != 0){
                    continue;
                }

                var invokerurl = 'http://'+host+pathname;
                tempServicelist.push(invokerurl);

//                console.log('zk data=',data);
//                console.log('host=',host);
//                console.log('pathname=',pathname);
//                console.log('protocol=',protocol);
            }
            self.gbservicelist[key] = tempServicelist;

            if(!self.initflag){
                self.initflag = true;
                self.emit('ready');
            }

        }
    );
}

Zk.prototype.zkinit = function(){

    this.interfacespaths = initPath(this.interfaces);
    this.gbservicelist = initServiceList(this.interfaces);

    var self = this;
    this.client.once('connected', function () {
        var i = 0;
        for(i=0;i<self.interfacespaths.length;i++){
            var obj = self.interfacespaths[i];
            self.watchChildren(obj.key,obj.path);
        }

        // client.close();
    });
    this.client.connect();
}

function initPath(interfaces){
    var interfacespathstemp = [];
    var i = 0;

    for(i=0; i<interfaces.length; i++){
        interfacespathstemp.push({key:interfaces[i], path:'/dubbo/'+interfaces[i]+'/providers'});
    }
    return interfacespathstemp;
}

function initServiceList(interfaces){
    var gbservicelisttemp = {};
    var i = 0;

    for(i=0;i<interfaces.length;i++){
        gbservicelisttemp[interfaces[i]] = [];
    }
    return gbservicelisttemp;
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
};

exports.ZKClient = Zk;




