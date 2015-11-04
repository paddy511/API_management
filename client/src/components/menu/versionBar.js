var React = require("react");
var $ = require("../../../libs/jquery.min");

var VersionBar = React.createClass({
  changeVersion:function (event) {
    this.props.changeVersion(this.refs.versionSelectBar.value);
    $(this.refs.versionSelectBar).blur();
  },
  render: function () {
    var that = this;
    var versionNodes = this.props.versions.map(
      function (version) {
          return (<option property="voucherCategoryClass" key={version._id} value={version.name}>{version.name}</option>);
      }.bind(this)
    );
    return (
      <div className="version-bar">
        <select ref="versionSelectBar" property="voucherCategoryClass" value={this.props.selectedVersion} onChange={this.changeVersion}>
          {versionNodes}
        </select>
      </div>
    );
  }
});

exports.VersionBar = VersionBar;
