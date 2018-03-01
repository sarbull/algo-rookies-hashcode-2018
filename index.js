var fs = require('fs');

var array = fs.readFileSync('problem.in').toString().split("\n");

var problemInput = [];
array.forEach(function(row, key) {
  problemInput[key] = row.split(" ");
});

var rowsInput = parseInt(problemInput[0][0]);
var columnsInput = parseInt(problemInput[0][1]);
var vehiclesInput = parseInt(problemInput[0][2]);
var ridesInput = parseInt(problemInput[0][3]);
var bonusInput = parseInt(problemInput[0][4]);
var stepsInput = parseInt(problemInput[0][5]);

var rides = [];

for(var i = 0; i < ridesInput; i++) {
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

var map = new Array(rowsInput);
for(var ii = 0; ii < rowsInput; ii++) {
  map[ii] = new Array(columnsInput);
}

console.log('rowsInput = ', rowsInput);
console.log('columnsInput = ', columnsInput);
console.log('vehiclesInput = ', vehiclesInput);
console.log('ridesInput = ', ridesInput);
console.log('bonusInput = ', bonusInput);
console.log('stepsInput = ', stepsInput);
console.log('rides = ', rides);

function iteration(step) {

}

for(var step = 0; step <= stepsInput; step++) {
  iteration(step);
}
