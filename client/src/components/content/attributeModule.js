var React = require("react");

var AttributeModule = React.createClass({

  render: function () {
    var _describeNode = this.props.component.describe ? <div><h5>描述：</h5><div>{this.props.component.describe}</div></div> : <div></div>;

    return (
      <div className="single-components">
        <h4>{this.props.component.name}</h4>
        <div className="single-type"><span>类型：</span><span>{this.props.component.type}</span></div>
        {_describeNode}
      </div>
    );
  }
});

exports.AttributeModule = AttributeModule;
