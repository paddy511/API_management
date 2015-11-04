var $ = require("../../libs/jquery.min");

exports.asyncGetProjectList = function (cb, that) {
  var url = "testData/projectList.json";
  $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        cb(data);
      }.bind(that),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(that)
    });
}

exports.asyncGetVersionList = function (cb, that, selectedProject) {
  var url = "testData/versionList.json" + "?selectedProject=" + selectedProject;
  $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      success: function(data) {
        cb(data);
      }.bind(that),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(that)
    });
}

exports.asyncGetAPIByProjectAndVersion = function (cb, that, selectedProject, selectedVersion) {
  var url = "testData/apiInfo.json" + "?selectedProject=" + selectedProject + "&selectedVersion=" + selectedVersion;
  $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      cache: false,
      success: function(data) {
        cb(data);
      }.bind(that),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(that)
    });
}
