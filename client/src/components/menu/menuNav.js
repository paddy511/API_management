var React = require("react");

var MenuModuleBox = require("./menuModuleBox").MenuModuleBox;

var MenuNav = React.createClass({
  render: function () {
    var that = this;
    //获取浏览器高度
    var _navInnerheight = (window.innerHeight - 110) + "px";
    var _modules = this.props.apiInfo.modules || [];

    var moduleNodes = _modules.map(function(module){
      return (<MenuModuleBox key={module._id} moduleId={module._id} moduleName={module.name} methods={module.methods} selectedApiId={this.props.selectedApiId}
        changeApi={this.props.changeApi}/>);
    }.bind(this));
    return (
      <div className="menu-nav" style={{height: _navInnerheight}}>
        {moduleNodes}
      </div>
    );
  }
});

exports.MenuNav = MenuNav;
