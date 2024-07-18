'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';
      //Reassigning outer scope's variable
      output = 'NEW OUTPUT';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    //console.log(str);
    console.log(millenial);
    //console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Peter';
calcAge(1991);
//console.log(age);
//printAge();

console.log('************************ 2 *************************');
//// HOISTING & TDZ (Temporary Death Zone)

//Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Peter';
let job = 'teacher';
const year = 1991;

// Functions
console.log(addDecl(2, 3));
//console.log(addExp(2, 3));
//console.log(addArrow(2, 3));

// Function Declaration
function addDecl(a, b) {
  return a + b;
}
// Function Expression
const addExp = function (a, b) {
  return a + b;
};

// Function Arrow
const addArrow = (a, b) => a + b;

var x = 1; // variables declared with VAR will create a property in the window object
let y = 2;
const z = 3;

// console.log(x === window.x);
// console.log(y === window.y);
// console.log(z === window.z);

console.log('************************ 3 *************************');
//// THIS KEYWORD

console.log(this); // = to window object

const calcAged = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAged(1991); // inside a regular function and in strict mode, this is = undefined,
// in floppy mode, this is = to window object.

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(1991); // inside arrow function, this is = to parent function, in this case to window object.

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge(); // here the "this" is Jonas object

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // method borrowing (from jonas to matilda)
matilda.calcAge();

console.log('************************ 4 *************************');
//// Primitives & Objects

//Primitives Types
let lastName = 'Williams';
let OldLastName = lastName;
lastName = 'Davis';
console.log(lastName, OldLastName); // Primitives are stored in the CALL STACK

//Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica); // Reference elements are stored in the HEAP of JavaScript ENGINE but they point their address (reference) in the CALL STACK

//Copyng objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2); // Is a shallow copy because it works only in the first level of the object
jessicaCopy.lastName = 'Davis';

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);
