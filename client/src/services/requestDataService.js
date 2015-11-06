var $ = require("../../libs/jquery.min");

exports.asyncGetProjectList = function (cb, that) {
  var url = "/api/projects";
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
  var url = "/api/webapi/versionlist" + "?projectid=" + selectedProject;
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
  var url = "/api/webapi/detail" + "?projectid=" + selectedProject + "&version=" + selectedVersion;
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
