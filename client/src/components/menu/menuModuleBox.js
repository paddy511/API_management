var React = require("react");

var MenuModuleBox = React.createClass({
  render: function () {
    return (
      <div className="menu-module">
          <h4>{this.props.moduleName}</h4>
      </div>
    );
  }
});

exports.MenuModuleBox = MenuModuleBox;
