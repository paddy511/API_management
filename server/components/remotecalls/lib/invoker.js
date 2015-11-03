var ZK = require('./zktool');
var Hessiantool = require('./hessiantool');

var Promise = require('mpromise');

var Invoker = function(hosts, interface_name){
    this.hosts = hosts;
    this.interface_name = interface_name;

    this.zkclient = new ZK.ZKClient(
        {hosts: hosts,
        interfaces: [interface_name]}
    );

    this.hessianChannel = new Hessiantool(this.zkclient);

    this.initPromise = null;

    console.log("A new invoker for interface['%s'] created", interface_name);
}

Invoker.prototype.invoke = function(method_name, args){
    var self = this;

    var initZKClient = function(){
        if(self.zkclient.initflag){
            var promise = new Promise();
            promise.fulfill();
            return promise;
        }

        console.log("Try to init zk client...");
        if(self.initPromise){
            console.log("Waiting for init ready event");
            return self.initPromise;
        }

        self.initPromise = new Promise();
        self.zkclient.zkinit();

        self.zkclient.once('ready', function(){
            console.log("Zk client is ready");
            self.initPromise.fulfill();
            self.initPromise = null;
        });

        return self.initPromise;
    }

    var invokeHessian = function(){
        var invokePromise = new Promise();
        self.hessianChannel.invoke(self.interface_name, method_name, args, function(err, rsp){
            if(err){
                invokePromise.reject(err);
                return;
            }

            invokePromise.fulfill(rsp);
        });

        console.log('send out hessian call for %s.%s', self.interface_name, method_name);
        return invokePromise;
    }

    return initZKClient()
        .then(invokeHessian);
}

module.exports = Invoker;
