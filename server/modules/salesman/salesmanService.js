/**
 * Created by qinghaibo on 2015/9/25.
 */
var identityService = require('../../components/services/identityService');
var salesmanModelService = require('./salesmanModelService');

var salesmanService = {};

//=========== save =========
salesmanService.getSalesmanFromReq = function(req){
    var salesman = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    };
    return salesman;
};

salesmanService.saveSalesman = function(salesman){
    return identityService.applyForIdentity()
        .then(function(id){
            salesman._id = id;
            salesman.addTime = new Date();
            salesman.updateTime = new Date();
            return salesman;
        })
        .then(salesmanModelService.saveSalesman);
};

salesmanService.updateSalesman = function(Salesman){
    return salesmanModelService.updateSalesman(Salesman);
};

//========== delete ==========
salesmanService.deleteSalesmanById = function (id){
    return  salesmanModelService.deleteSalesmanById(id);
};

//========== query ==========
salesmanService.getSalesmanInfoById = function (id){
    return  salesmanModelService.getSalesmanInfoById(id);
};

salesmanService.getSalesmanList = function (start, limit, tag){
    return salesmanModelService.getSalesmanCount(start, limit, tag)
        .then(salesmanModelService.getSalesmanList);
};

module.exports = salesmanService;