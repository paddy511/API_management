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
      selectedVersion: "latest",
      selectedApiId: "default"
    }, this.getVersionList);
  },
  changeVersion: function(version){
    this.setState({
      selectedVersion: version,
      selectedApiId: "default"
    }, this.getApiInfo);
  },
  changeApi: function(apiId){
    this.setState({
      selectedApiId: apiId
    });
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
      selectedApiId: "default",
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
          <MenuBox versions={this.state.versions} selectedVersion={this.state.selectedVersion} changeVersion={this.changeVersion}
            selectedApiId={this.state.selectedApiId} apiInfo={this.state.apiInfo} changeApi={this.changeApi}/>
          <ContentBox selectedApiId={this.state.selectedApiId} apiInfo={this.state.apiInfo}/>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <LayoutBox></LayoutBox>,
  document.getElementById('layout')
);
