var React = require("react");
var ReactDOM = require("react-dom");

var HeaderBox = require("./components/header/headerBox").HeaderBox;
var MenuBox = require("./components/menu/menuBox").MenuBox;
var ContentBox = require("./components/content/contentBox").ContentBox;

var LayoutBox = React.createClass({
  changeProject: function (projectId) {
    this.setState({
      selectedProject: projectId
    });
  },
  getInitialState: function () {
    return {
      selectedProject: "001",
      projects: [
        {
          _id: "001",
          name: "ra_portal"
        },
        {
          _id: "002",
          name: "ra_session_managemnet"
        },
        {
          _id: "003",
          name: "ra_basic_tools"
        }
      ]
    }
  },
  render: function () {
    return (
      <div>
        <HeaderBox selectedProject={this.state.selectedProject} projects={this.state.projects} changeProject={this.changeProject}/>
        <MenuBox />
        <ContentBox />
      </div>
    );
  }
});

ReactDOM.render(
  <LayoutBox>Hello, world!</LayoutBox>,
  document.getElementById('layout')
);
