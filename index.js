var fs = require('fs');

var array = fs.readFileSync('problem.in').toString().split("\n");

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

  var ride = {
    x: parseInt(r[0]),
    y: parseInt(r[1]),
    xTo: parseInt(r[2]),
    yTo: parseInt(r[3]),
    startStep: parseInt(r[4]),
    stopStep: parseInt(r[5])
  };

  ride.steps = Math.abs(ride.xTo - ride.x) + Math.abs(ride.yTo - ride.y);

  rides.push(ride);
}

rides.sort(function(a, b) {
  return a.steps > b.steps;
});

var map = new Array(input.rows);
for(var ii = 0; ii < input.rows; ii++) {
  map[ii] = new Array(input.columns);
}

console.log('input.rows = ', input.rows);
console.log('input.columns = ', input.columns);
console.log('input.vehicles = ', input.vehicles);
console.log('input.rides = ', input.rides);
console.log('input.bonus = ', input.bonus);
console.log('input.steps = ', input.steps);
// console.log('rides = ', rides);

var finisedVehiclesRides = [];

function iteration(step) {
  input.vehicles--; console.log('input.vehicles = ', input.vehicles);

  rides.forEach(function(ride) {
    if(input.vehicles > 0) {
      if(step === ride.startStep) {
        ride.steps--;

        // if(ride.steps === 0) {
        //
        //   finisedVehiclesRides.push({finished: ride});
        //
        //   input.vehicles++;
        // }
      } else {
        // input.vehicles++;
      }
    }
  });
}

for(var step = 1; step <= input.steps; step++) {
  iteration(step);
}

console.log(finisedVehiclesRides);
