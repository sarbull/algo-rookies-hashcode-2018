var fs = require('fs');

var array = fs.readFileSync('problem.in').toString().split("\n");

var problemInput = [];
array.forEach(function(row, key) {
  problemInput[key] = row.split(" ");
});

var rowsInput = problemInput[0][0];
var columnsInput = problemInput[0][1];
var vehiclesInput = problemInput[0][2];
var ridesInput = problemInput[0][3];
var bonusInput = problemInput[0][4];
var stepsInput = problemInput[0][5];

var rides = [];

for(var i = 0; i < ridesInput; i++) {
  var r = problemInput[i+1];

  var ride = {
    x: r[0],
    y: r[1],
    xTo: r[2],
    yTo: r[3],
    startStep: r[4],
    stopStep: r[5]
  };

  rides.push(ride);
}

var map = new Array(parseInt(rowsInput));
for(var ii = 0; ii < rowsInput; ii++) {
  map[ii] = new Array(parseInt(columnsInput));
}


console.log('rowsInput = ', rowsInput);
console.log('columnsInput = ', columnsInput);
console.log('vehiclesInput = ', vehiclesInput);
console.log('ridesInput = ', ridesInput);
console.log('bonusInput = ', bonusInput);
console.log('stepsInput = ', stepsInput);
console.log('rides = ', rides);

for(var step = 0; step <= stepsInput; step++) {

}
