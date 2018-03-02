var fs = require('fs');

var Point = (function(x, y) {
  return {
    x: x,
    y:y
  };
});

var Vehicle = (function(id, onRide, rides) {
  return {
    id: id,
    onRide: onRide,
    rides: rides
  }
});

var Ride = (function(id, x, y, xTo, yTo, startAt, endAt) {
  return {
    id: id,
    startAt: startAt,
    endAt: endAt,
    from: new Point(x, y),
    to: new Point(xTo, yTo),
    steps: parseInt(Math.abs(xTo - x) + Math.abs(yTo - y))
  };
});


function objSort() {
  var args = arguments,
    array = args[0],
    case_sensitive, keys_length, key, desc, a, b, i;

  if (typeof arguments[arguments.length - 1] === 'boolean') {
    case_sensitive = arguments[arguments.length - 1];
    keys_length = arguments.length - 1;
  } else {
    case_sensitive = false;
    keys_length = arguments.length;
  }

  return array.sort(function (obj1, obj2) {
    for (i = 1; i < keys_length; i++) {
      key = args[i];
      if (typeof key !== 'string') {
        desc = key[1];
        key = key[0];
        a = obj1[args[i][0]];
        b = obj2[args[i][0]];
      } else {
        desc = false;
        a = obj1[args[i]];
        b = obj2[args[i]];
      }

      if (case_sensitive === false && typeof a === 'string') {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }

      if (! desc) {
        if (a < b) return -1;
        if (a > b) return 1;
      } else {
        if (a > b) return -1;
        if (a < b) return 1;
      }
    }
    return 0;
  });
}

var Problem = (function(fileName) {
  var array = fs.readFileSync("input/" + fileName + ".in").toString().split("\n");

  var problemInput = [];
  array.forEach(function(row, key) {
    problemInput[key] = row.split(" ");
  });

  var input = {
    rows: parseInt(problemInput[0][0]),
    columns: parseInt(problemInput[0][1]),
    vehicles: parseInt(problemInput[0][2]),
    rides: parseInt(problemInput[0][3]),
    bonus: parseInt(problemInput[0][4]),
    steps: parseInt(problemInput[0][5])
  };

  var rides = [];
  for(var i = 0; i < input.rides; i++) {
    var r = problemInput[i+1];

    var ride = new Ride(i, parseInt(r[0]), parseInt(r[1]), parseInt(r[2]), parseInt(r[3]), parseInt(r[4]), parseInt(r[5]));

    rides.push(ride);
  }

  var vehicles = [];
  for(var ii = 0; ii < input.vehicles; ii++) {
    var v = new Vehicle(ii, false, []);

    vehicles.push(v);
  }

  rides = objSort(rides, 'startAt', 'steps', 'endAt');

  return {
    fileName: fileName,
    input: input,
    rides: rides,
    vehicles: vehicles,
    save: function() {
      fs.writeFile("output/" + this.fileName + ".out", this.solution(), function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      });
    },
    solution: function() {
      var output = "";

      this.vehicles.forEach(function (v) {
        output = output + v.rides.length;

        v.rides.forEach(function (r) {
          output = output + " " + r.id;
        });

        output = output + "\n";
      });

      return output;
    },
    iterator: function(step) {
      this.vehicles.forEach(function(v) {
        if(!v.onRide) {
          var r = rides.shift();

          if(r) {
            if(step >= r.startAt && step <= r.endAt) {
              v.onRide = true;
              v.rides.push(r);
              v.rides[v.rides.length-1].steps--;
            } else {
              rides.push(r);
            }
          }
        } else {
          if(v.rides[v.rides.length-1].steps > 0) {
            v.rides[v.rides.length-1].steps--;
          } else {
            v.onRide = false;
          }
        }
      });
    },
    start: function() {
      for(var step = 0; step < this.input.steps; step++) {
        this.iterator(step);
      }

      this.save();
    }
  };
});

var p1 = new Problem('a_example');        p1.start();
var p2 = new Problem('b_should_be_easy'); p2.start();
var p3 = new Problem('c_no_hurry');       p3.start();
var p4 = new Problem('d_metropolis');     p4.start();
var p5 = new Problem('e_high_bonus');     p5.start();
