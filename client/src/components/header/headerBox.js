var React = require("react");
var ProjectItems = require("./projectItems").ProjectItems;

var HeaderBox = React.createClass({
  render: function () {
    return (
      <div className="header">
        <nav className="nav">
          <div className="navBrand">
            <b className="glyphicon glyphicon-book"></b>
            <a>API</a>
          </div>
          <ProjectItems projects={this.props.projects} selectedProject={this.props.selectedProject} changeProject={this.props.changeProject}/>
        </nav>
      </div>
    );
  }
});

exports.HeaderBox = HeaderBox;
