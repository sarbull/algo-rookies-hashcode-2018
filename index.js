var fs = require('fs');

var fileName = 'e_high_bonus';

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

console.log('input.rows = ', input.rows);
console.log('input.columns = ', input.columns);
console.log('input.vehicles = ', input.vehicles);
console.log('input.rides = ', input.rides);
console.log('input.bonus = ', input.bonus);
console.log('input.steps = ', input.steps);


// THIRD SOLUTION
var output = function(vehiclesInput) {
  var content = "";

  vehiclesInput.forEach(function(v) {
    content = content + v.rides.length;

    v.rides.forEach(function(r) {
      content = content + " " + r.id;
    });

    content = content + "\n";
  });

  fs.writeFile("output/" + fileName + ".out", content, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};


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
    steps: parseInt(Math.abs(xTo - x) + Math.abs(yTo - y)),
    calcSteps: function() {
      return parseInt(Math.abs(xTo - x) + Math.abs(yTo - y));
    }
  };
});

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

// console.log(rides);
// console.log(vehicles);


var sortedRides = rides.sort(function(a, b) {
  return ((a.to.x - b.from.x) + (a.to.y - b.from.y)) < 0;
});

function iteration(step) {
  vehicles.forEach(function(v) {
    if(!v.onRide) {
      var r = sortedRides.pop();

      if(r.startAt >= step) {
        v.onRide = true;
        v.rides.push(r);
        v.rides[v.rides.length-1].steps--;
      } else {
        sortedRides.push(r);
      }
    } else {
      if(v.rides[v.rides.length-1].steps > 0) {
        v.rides[v.rides.length-1].steps--;
      } else {
        v.onRide = false;
      }
    }
  });
}

for(var step = 0; step < input.steps; step++) {
  iteration(step);
}

output(vehicles);








// ===== FIRST SOLUTION =====

// var rides = [];
//
// for(var i = 0; i < input.rides; i++) {
//   var r = problemInput[i+1];
//
//   var ride = {
//     id: i,
//     x: parseInt(r[0]),
//     y: parseInt(r[1]),
//     xTo: parseInt(r[2]),
//     yTo: parseInt(r[3]),
//     startStep: parseInt(r[4]),
//     stopStep: parseInt(r[5])
//   };
//
//   ride.steps = parseInt(Math.abs(ride.xTo - ride.x) + Math.abs(ride.yTo - ride.y));
//
//   rides.push(ride);
// }
//
// rides.sort(function(a, b) {
//   return a.steps > b.steps;
// });
//
// var map = new Array(input.rows);
// for(var ii = 0; ii < input.rows; ii++) {
//   map[ii] = new Array(input.columns);
// }
//
// var vehicles = [];
// for(var iii = 0; iii < input.vehicles; iii++) {
//   vehicles.push({
//     id: iii,
//     name: "Car " + iii,
//     onRide: false,
//     rides: []
//   });
// }

// function iteration(step) {
//   // console.log("========> step = ", step);
//
//   vehicles.forEach(function(v) {
//     if(!v.onRide) {
//
//       var r = rides.pop();
//
//       if(r.startStep >= step) {
//         // console.log('========> ride started');
//
//         v.onRide = true;
//
//         v.rides.push(r);
//
//         v.rides[v.rides.length-1].steps--;
//       } else {
//         rides.push(r);
//       }
//     }
//       else
//     {
//
//       if(v.rides[v.rides.length-1].steps > 0) {
//         v.rides[v.rides.length-1].steps--;
//       } else {
//         v.onRide = false;
//
//         // console.log('========> ride ended');
//       }
//     }
//   });
// }

// for(var step = 0; step < input.steps; step++) {
//   iteration(step);
// }

// var content = "";
//
// vehicles.forEach(function(v) {
//   content = content + v.rides.length;
//
//   v.rides.forEach(function(r) {
//     content = content + " " + r.id;
//   });
//
//   content = content + "\n";
// });

// fs.writeFile("output/" + fileName + ".out", content, function(err) {
//   if(err) {
//     return console.log(err);
//   }
//
//   console.log("The file was saved!");
// });


// ===== SECOND SOLUTION =====

// vehicles.forEach(function(v, indexV) {
//   v.rides[0] = rides.pop();
//
//   console.log('v id = ', indexV);
//
//   rides.forEach(function(r, indexR) {
//     if(v.rides.length > 0) {
//       var currentRide = v.rides[v.rides.length - 1];
//
//       var distance = Math.abs(currentRide.yTo - r.yTo) + Math.abs(currentRide.xTo - r.xTo);
//       var nextDistance = Math.abs(v.yTo - v.y) + Math.abs(v.xTo - v.x);
//
//       v.rides[v.rides.length - 1] = Math.abs(r.earliestTime - distance);
//
//       if(!((distance + nextDistance) < r.latestFinish)) {
//         v.rides[v.rides.length - 1].score = 0;
//       }
//
//       v.rides.push(Math.abs(r.earliestTime - distance));
//     }
//   });
// });



