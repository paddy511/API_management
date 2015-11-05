var React = require("react");
var categoryDisposer = require("./categoryDisposer");

var MenuModuleBox = React.createClass({
  changeApi: function (event) {
    this.props.changeApi(event.target.id);
  },
  render: function () {
    var that = this;
    var _methods = this.props.methods || [];
    var categoryList = categoryDisposer.getCategoryList(this.props.methods);

    var _moduleContentNodes = categoryList.map(function (category) {
       var _methodNodes = _methods.map(function (method) {
        if(method.category === category){
          var methodClass = that.props.selectedApiId === method._id ? "nav-method-actived" : "nav-method-unactived";
          return (<div id={method._id} key={method._id} className={methodClass} onClick={that.changeApi}>{method.name}</div>);
        }else {
          return;
        }
      });

      return (<div><h5 className="nav-category">{category}</h5>{_methodNodes}</div>);
    });

    return (
      <div className="menu-module">
          <h4>{this.props.moduleName}</h4>
          {_moduleContentNodes}
      </div>
    );
  }
});

exports.MenuModuleBox = MenuModuleBox;
