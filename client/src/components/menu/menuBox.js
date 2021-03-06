var React = require("react");

var VersionBar = require("./versionBar").VersionBar;
var MenuNav = require("./menuNav").MenuNav;

var MenuBox = React.createClass({
  render: function () {

    return (
    <div className="menuBox">
      <VersionBar versions={this.props.versions} selectedVersion={this.props.selectedVersion} changeVersion={this.props.changeVersion}/>
      <MenuNav selectedApiId={this.props.selectedApiId} apiInfo={this.props.apiInfo} changeApi={this.props.changeApi}/>
    </div>);
  }
});

exports.MenuBox = MenuBox;
