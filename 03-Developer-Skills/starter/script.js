// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;
console.log(x);
// todo Highlight >>
// BUG here to rework
// LEC todo a lecture
// VIDEO I dont now this purpose
// FIXME to fix this pasrt of code
// TODO to do this part

// Coding Challenge #1

/*
Given an array of forecated maximum temperatures,
the thermometer displays a string with these temperatures.

Example: [17,21,23] will print "... 17C in 1 days ... 21C in 2 days ... 23C in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

Use the problem-solving framework: Understand the problem and break it up into sub-problems!

********* my problem solving plan:
1 - Create a function printForecast {}
2 - pass argument (arr) to the function
3 - print each temperature with his index as a number of days
4 - log the result with both DATA TEST

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/
const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    //console.log(arr[i]);
    str += `${arr[i]}°C in ${[i + 1]} days ... `;
  }
  return '... ' + str;
}
let forecast = printForecast(data2);
console.log(forecast);
