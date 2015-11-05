var React = require("react");
var versionDataProcessor = require("../../services/versionDataProcessor");
var MethodInfo = require("./methodInfo").MethodInfo;

var ContentBox = React.createClass({

  render: function () {
    var _method = versionDataProcessor.getMethodBySelectedId(this.props.selectedApiId, this.props.apiInfo);

    if(!_method){
      return (
        <div className="content-box">
          <img src={"img/sb.jpg"} width="100%" height="100%"/>
        </div>
      );
    }

    var _navInnerheight = (window.innerHeight-70) + "px";

    return (
      <div className="content-box" style={{height: _navInnerheight}}>
        <h2>{_method.name}</h2>
        <MethodInfo components={_method.components}/>
      </div>);
  }
});

exports.ContentBox = ContentBox;
