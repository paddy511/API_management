var React = require("react");

var ProjectItems = React.createClass({
  changeProject:function (event) {
    this.props.changeProject(event.target.id);
  },
  render: function () {
    var that = this;
    var projectNodes = this.props.projects.map(
      function (project) {
        var _projectClass = (project._id == that.props.selectedProject || that.props.selectedProject === "default" && project.name === "ra_basic_tools")
          ? "project-actived" : "project-unactived";
          return (<li id={project._id} key={project._id} className={_projectClass} onClick={this.changeProject}>{project.name}</li>);
      }.bind(this)
    );
    return (
          <div className="navContent">
            <ul>
              {projectNodes}
            </ul>
          </div>
    );
  }
});

exports.ProjectItems = ProjectItems;
