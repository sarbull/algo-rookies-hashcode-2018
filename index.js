var fs = require('fs');

var array = fs.readFileSync('problem.in').toString().split("\n");

var problemInput = [];
array.forEach(function(row, key) {
  problemInput[key] = row.split(" ");
});

var rows = problemInput[0][0];
var columns = problemInput[0][1];
var vehicles = problemInput[0][2];
var rides = problemInput[0][3];
var bonus = problemInput[0][4];
var steps = problemInput[0][5];

console.log('rows = ', rows);
console.log('columns = ', columns);
console.log('vehicles = ', vehicles);
console.log('rides = ', rides);
console.log('bonus = ', bonus);
console.log('steps = ', steps);

var map = new Array(parseInt(rows));
for(var i = 0; i < rows; i++) {
  map[i] = new Array(parseInt(columns));
}

console.log('map', map);


for(var step = 0; step <= steps; step++) {

}
