var React = require("react");
var FunctionModule = require("./functionModule").FunctionModule;
var AttributeModule = require("./attributeModule").AttributeModule;

var MethodInfo = React.createClass({
  render: function () {

    var methodNodes = this.props.components.map(function (component) {
      if(component.componentType === "function"){
        return (<div><FunctionModule component={component}/></div>);
      }else if (component.componentType === "attribute") {
        return (<div><AttributeModule component={component}/></div>);
      }
    });

    return (
      <div className="method-info-box">
        {methodNodes}
      </div>
    );
  }
});

exports.MethodInfo = MethodInfo;
