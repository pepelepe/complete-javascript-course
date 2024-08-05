'use strict';

const bookings = [];

const createBooking = function (
  //ES6 new way of SC
  flightName,
  numPassengers = 1,
  price = 750 * numPassengers
) {
  //ES5 old way of shortcicuiting
  //numPassengers = numPassengers || 1;
  //price = price || 'Non available price';
  const booking = {
    flightName,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH727');
createBooking('LH727', 2, 900);
createBooking('LH727', 2);
createBooking('LH727', undefined, 1200);
console.log(bookings);

const flight = 'LH324';
const jonas = {
  name: 'Jonas Smithmann',
  passport: 'JS24739479342',
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH323';
  passenger.name = 'Mr ' + passenger.name;

  if (passenger.passport === 'JS24739479342') {
    console.log('Checked in');
  } else {
    console.log('Wrong passport !');
  }
};
checkIn(flight, jonas);
console.log(flight, jonas);
console.log(jonas);

console.log('////////////////////////////////////');

//First class functions vs High order functions

const oneWorld = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWorld = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//High Order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed strin: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best!', oneWorld); //oneWorld is Call back function
transformer('Javascript is the best!', upperFirstWorld);

//JS use callbacks all the time
const high5 = function () {
  console.log('🖐');
};
//document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adams'].forEach(high5);

//Functions returning functions
const greet = function (greeting) {
  return function (name) {
    console.log(greeting + ' ' + name);
  };
};
const greet2 = greeting => name => console.log(greeting + ' ' + name);

const greetingHey = greet('Hey');
greetingHey('Jonas');
greetingHey('Martha');
greet('Hello')('Peter');

greet2('Hola')('Toto');

console.log('////////////////////////////////////');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function () {},
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight, ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}, ${name}` });
  },
};
lufthansa.book(526, 'Jonas Smith');
lufthansa.book(525, 'Wall Ter');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Call method
book.call(eurowings, 23, 'Martha Steedwars');
console.log(eurowings);

// Apply method
const flighData = [512, 'Petro Vielos'];
book.apply(eurowings, flighData);

book.call(eurowings, ...flighData); // Modern Js is doing the same that in apply method

//Bind method
//book.call(eurowings, 23, 'Martha Steedwars');
const bookEW = book.bind(eurowings);
bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// document
//   .querySelector('.buy')
//   .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);

console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const input = prompt(
      `${this.question}\n${this.options.join('\n')}\n(Write option number)`
    );
    const answer = parseInt(input);
    if (!isNaN(answer) && answer >= 0 && answer < this.answers.length) {
      this.answers[answer]++;
    } else {
      alert('Invalid input. Please enter a valid number.');
    }
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type === 'array') {
      console.log(this.answers);
    }
  },
};
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// BONUS TEST DATA
const testData1 = [5, 2, 3];
const testData2 = [1, 5, 3, 9, 6, 1];

// Using the displayResults method with test data 1 (as array)
poll.displayResults.call({ answers: testData1 }, 'array'); // Output: [5, 2, 3]

// Using the displayResults method with test data 1 (as string)
poll.displayResults.call({ answers: testData1 }, 'string'); // Output: Poll results are 5, 2, 3

// Using the displayResults method with test data 2 (as array)
poll.displayResults.call({ answers: testData2 }, 'array'); // Output: [1, 5, 3, 9, 6, 1]

// Using the displayResults method with test data 2 (as string)
poll.displayResults.call({ answers: testData2 }, 'string'); // Output: Poll results are 1, 5, 3, 9, 6, 1

///////////////////////////////////////

//Immediately Invoked Function Expressions (IIFE)
(function () {
  console.log(`///////////////////////////////////////
		//Immediately Invoked Function Expressions (IIFE)
		Runs only once and is not saved in memory. It bypass JS error because is wrapped as expression "()" and called on tge fly wuth another "();"
		`);
})();

// same works for Arrow Function
(() =>
  console.log(`// (IIFE) with Arrow function
	Also runs only once and is not saved in memory.`))();

///////////////////////////////////////
// Closures

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f();

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    console.log('Click on body');
    header.style.color = 'blue';
  });
})();
