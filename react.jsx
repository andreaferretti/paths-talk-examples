/** @jsx React.DOM */
(function() {


  var Dial = React.createClass({
    getInitialState: function() {
      return {
        x: 0,
        y: 0,
        speeds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    },

    componentWillMount: function() {
      setInterval(this.update, 16);
    },

    diff: function(x, y) {
      var deltaX = x - this.state.x;
      var deltaY = y - this.state.y;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },

    avgSpeed: function() {
      var tot = 0, len = this.state.speeds.length;
      for (var i = 0; i < len; i++) {
        tot += this.state.speeds[i];
      }

      return tot / len;
    },

    update: function() {
      var speed = this.diff(mousex || 0, mousey || 0);
      this.state.speeds.shift();
      this.state.speeds.push(speed);

      this.setState({
        x: mousex || 0,
        y: mousey || 0
      });
    },

    render: function() {
      var speed = Math.max(Math.min(this.avgSpeed(), 39.9), 0.1);
      var pie = paths.Pie({
        r: 50,
        R: 80,
        center: [0, 0],
        data: [speed, 40 - speed],
        accessor: function(x) { return x }
      });

      return <div className="panel panel-default" >
        <div className="panel-heading">
          <h2 className="panel-title">Facebook React</h2>
        </div>

        <div className="panel-body">
          <p className="alert alert-info">Here we track the speed of the mouse.</p>

          <svg width="375" height="400">
            <g transform="translate(200,200)">
              <path d={ pie.curves[0].sector.path.print() } fill="green" />
            </g>
          </svg>
        </div>
      </div>
    }
  });


  React.renderComponent(
    <Dial />,
    document.getElementById('react')
  );
})();