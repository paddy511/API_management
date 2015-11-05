var React = require("react");

var FunctionModule = React.createClass({
  render: function () {
    return (
      <div>
        <h4>{this.props.component.name}</h4>
      </div>
    );
  }
});

exports.FunctionModule = FunctionModule;
