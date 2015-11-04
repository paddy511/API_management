exports.getCategoryList = function (methods) {
  var _categoryList = [];
  for (var i = 0; i < methods.length; i++) {
    if(_categoryList.indexOf(methods[i].category) === -1){
      _categoryList.push(methods[i].category);
    }
  }
  return _categoryList;
}
