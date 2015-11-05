var React = require("react");
var versionDataProcessor = require("../../services/versionDataProcessor");
var MethodInfo = require("./methodInfo").MethodInfo;

var ContentBox = React.createClass({

  render: function () {
    var _method = versionDataProcessor.getMethodBySelectedId(this.props.selectedApiId, this.props.apiInfo);

    if(!_method){
      return (
        <div className="content-box">
          <img src={"img/sb.jpg"}/>
        </div>
      );
    }

    return (
      <div className="content-box" >
        <h3>{_method.name}</h3>
        <MethodInfo components={_method.components}/>
      </div>);
  }
});

exports.ContentBox = ContentBox;
