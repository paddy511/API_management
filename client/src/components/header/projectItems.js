var React = require("react");

var ProjectItems = React.createClass({
  changeProject:function (event) {
    this.props.changeProject(event.target.id);
  },
  render: function () {
    var that = this;
    var projectNodes = this.props.projects.map(
      function (project) {
        if(project._id === that.props.selectedProject){
          return (<li id={project._id} key={project._id} className="project-actived" onClick={this.changeProject}>{project.name}</li>);
        }else {
          return (<li id={project._id} key={project._id} className="project-unactived" onClick={this.changeProject}>{project.name}</li>);
        }
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
