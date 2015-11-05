var React = require("react");

var AttributeModule = React.createClass({

  render: function () {
    var _describeNode = this.props.component.describe ? <div><span>描述：</span><span>{this.props.component.describe}</span></div> : <div></div>;

    return (
      <div>
        <h4>{this.props.component.name}</h4>
        <div><span>类型:</span><span>{this.props.component.type}</span></div>
        {_describeNode}
      </div>
    );
  }
});

exports.AttributeModule = AttributeModule;
