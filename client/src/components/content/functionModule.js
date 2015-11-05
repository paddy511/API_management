var React = require("react");

var FunctionModule = React.createClass({
  render: function () {

    var parmaNodes = this.props.component.arguments.map(function (parma) {
      return (<tr><td>{parma.param}</td><td>{parma.type}</td><td>{parma.details}</td></tr>);
    });


    return (
      <div className="single-components">
        <h4>{this.props.component.name}</h4>
        <div className="single-type"><span>类型：</span><span>Function</span></div>
        <div><h5>用法：</h5><div>{this.props.component.usages}</div></div>
        <div><h5>参数介绍：</h5>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr className="info"><td>参数</td><td>类型</td><td>描述</td></tr>
                {parmaNodes}
              </tbody>
            </table>
          </div>
        </div>
        <div><h5>返回值：</h5>
          <div>
            <table className="table table-bordered">
              <tbody>
                <tr><td className="success">类型</td><td>{this.props.component.return.type}</td></tr>
                <tr><td className="success">描述</td><td>{this.props.component.return.details}</td></tr>
                <tr><td className="success">实例</td><td>{this.props.component.return.example}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});

exports.FunctionModule = FunctionModule;
