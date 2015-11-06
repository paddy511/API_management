function getMethodInModule(selectedApiId, module) {
  if(module && module.methods instanceof Array){
    for (var i = 0; i < module.methods.length; i++) {
       if (module.methods[i]._id == selectedApiId) {
         return module.methods[i];
       }
    }
  }
  return;
}


exports.getMethodBySelectedId = function (selectedApiId, apiInfo) {
  if(apiInfo && apiInfo.modules instanceof Array){
    for (var i = 0; i < apiInfo.modules.length; i++) {
      var _method = getMethodInModule(selectedApiId, apiInfo.modules[i]);
       if(_method){
         return _method;
       }
    }
  }
  return;
}
