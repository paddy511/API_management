var React = require("react");
var ReactDOM = require("react-dom");

var requestDataService = require("./services/requestDataService");

var HeaderBox = require("./components/header/headerBox").HeaderBox;
var MenuBox = require("./components/menu/menuBox").MenuBox;
var ContentBox = require("./components/content/contentBox").ContentBox;

var LayoutBox = React.createClass({
  changeProject: function (projectId) {
    this.setState({
      selectedProject: projectId,
      selectedVersion: "latest"
    }, this.getVersionList);
  },
  changeVersion: function(version){
    this.setState({
      selectedVersion: version
    }, this.getApiInfo);
  },
  getProjectList:function () {
    var that = this;
    requestDataService.asyncGetProjectList(function (data) {
      that.setState({
        projects: data
      }, that.getVersionList);
    }, that);
  },
  getVersionList:function () {
    var that = this;
    requestDataService.asyncGetVersionList(function (data) {
      that.setState({
        versions: data
      }, that.getApiInfo);
    }, that, that.state.selectedProject);
  },
  getApiInfo: function () {
    var that = this;
    requestDataService.asyncGetAPIByProjectAndVersion(function (data) {
      that.setState({
        apiInfo: data
      })
    }, that, that.state.selectedProject, that.state.selectedVersion);
  },
  getInitialState: function () {
    return {
      selectedProject: "default",
      selectedVersion: "latest",
      projects: [],
      versions: [],
      apiInfo: {}
    }
  },
  componentDidMount: function() {
    this.getProjectList();
  },
  render: function () {
    return (
      <div>
        <HeaderBox selectedProject={this.state.selectedProject} projects={this.state.projects} changeProject={this.changeProject}/>
        <div className="main-body">
          <MenuBox versions={this.state.versions} selectedVersion={this.state.selectedVersion} changeVersion={this.changeVersion}/>
          <ContentBox />
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <LayoutBox></LayoutBox>,
  document.getElementById('layout')
);
