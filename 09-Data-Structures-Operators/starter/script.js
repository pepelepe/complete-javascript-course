'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();
// const getCode = function (str) {
//   return str.slice(0, 3).toUpperCase();
// };

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''} ${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(37);

  console.log(output);
}

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({ time, address, mainIndex, starterIndex }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
      will be delivered to ${address} at ${time}`);
  },

  //function using SPREAD
  orederPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with 
      ${ing1}, ${ing2}, ${ing3}`);
  },

  //function using REST
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// Spread operator
const arrr = [7, 8, 9];
const badNewArr = [1, 2, arrr[0], arrr[1], arrr[2]];
console.log(badNewArr);
const newArr = [1, 2, ...arrr];
console.log(newArr);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Create a Shallow Copy of Array
const mainMenuCopy = [...restaurant.mainMenu];
console.log('Copy of main menu: ' + mainMenuCopy);

// Join two Arrays or more
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log('Join two arrays: ' + menu2);

// Iterables : arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.']; // Only we can use spread operator to buid array or to pass values into a function
console.log(letters);
console.log(...str); // J o n a s

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);

// restaurant.orederPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orederPasta(...ingredients); // better & modern way to call arrays

// Objects spread operator
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

// copy of object
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name); // Original name
console.log(restaurantCopy.name); // Modified copy name

const { name, openingHours, categories } = restaurant;
console.log('Restaurante :' + name, openingHours, categories);

const {
  name: retaurantName,
  openingHours: hours,
  categories: labels,
} = restaurant;
console.log('Restaurante :' + retaurantName, hours, labels);

const { menu = [], starterMenu: starters = [] } = restaurant; // [] here is declared a default value in case the data doesn't come from API
console.log('Restaurante :' + menu, starters);

// Mutating variables in objects
let e = 111;
let f = 999;
const obj = { e: 23, f: 7, g: 14 };
({ e, f } = obj);
console.log(e, f);

//Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(`Restaurant on friday open hours ${open}h
                    close hours ${close}h`);

// 1) Destructuring

// SPREAD, beacuse on RIGHT side of =
const arrrr = [1, 2, ...[3, 4]];

// REST, beacuse on LEFT side of =
const [s, t, ...others] = [1, 2, 3, 4, 5];
console.log(s, t, others); // 1 2 (3) [3, 4, 5]

const [uno, , tres, ...othres] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log('pepe: ' + uno, tres, ...othres);

const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions with REST
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log('SUM NUMBERS: ' + sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const xx = [23, 5, 7];
add(...xx);

restaurant.orderPizza('mushrooms', 'spinack', 'olive oil', 'muzarella');

//Short circuiting OR || AND &&
restaurant.orderPizza && console.log('yes, exist!');
!restaurant.orderPizza || console.log('Is the oposite!');

console.log(3 && 'Jonas'); // ||3 truthy values, && Jonas falsy values
console.log('' && 'Jonas'); // ||Jonas, && ''
console.log(true && 0); // ||true, && 0
console.log(undefined && null); // ||null, && undefined

restaurant.numGuest = 0;
const guest = restaurant.numGuest || 10; //truthy value
console.log('guest: ' + guest);

const guest2 = restaurant.numGuest ?? 10; //Nullish value: null, undefined. (NOT 0 or '')
console.log('guest2: ' + guest2);

/////////////////////

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // destructuring array
console.log(x, y, z); // = 2 3 4 ,

let [main, , second] = restaurant.categories;
console.log(main, second); // Italian Vegetarian

// to switch restaurant categories using a Third variable:
const temp = main;
main = second;
second = temp;
console.log(main, second); // Vegetarian Italian

// to switch restaurant categories using destructuring:
[main, second] = [second, main];
console.log(main, second); // Vegetarian Italian

//To receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6, 7]];
const [i, , j] = nested; // 2 (3) [5,6,7]
console.log(i, j);
const [m, , [n, o]] = nested;
console.log(m, n, o); // 2 5 6

// Defaul values
const [p = 1, q = 1, r = 1] = [8, 9]; //when we don't know the length of array we can setup variables as default. Useful to call API's
console.log(p, q, r); // 8 9 1

console.log(
  '---------------- Assignment - Destructuring Arrays ----------------'
);

const books = [
  {
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    publisher: 'Addison-Wesley Professional',
    publicationDate: '2011-03-24',
    edition: 4,
    keywords: [
      'computer science',
      'programming',
      'algorithms',
      'data structures',
      'java',
      'math',
      'software',
      'engineering',
    ],
    pages: 976,
    format: 'hardcover',
    ISBN: '9780321573513',
    language: 'English',
    programmingLanguage: 'Java',
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.41,
        ratingsCount: 1733,
        reviewsCount: 63,
        fiveStarRatingCount: 976,
        oneStarRatingCount: 13,
      },
    },
    highlighted: true,
  },
  {
    title: 'Structure and Interpretation of Computer Programs',
    author: [
      'Harold Abelson',
      'Gerald Jay Sussman',
      'Julie Sussman (Contributor)',
    ],
    publisher: 'The MIT Press',
    publicationDate: '2022-04-12',
    edition: 2,
    keywords: [
      'computer science',
      'programming',
      'javascript',
      'software',
      'engineering',
    ],
    pages: 640,
    format: 'paperback',
    ISBN: '9780262543231',
    language: 'English',
    programmingLanguage: 'JavaScript',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.36,
        ratingsCount: 14,
        reviewsCount: 3,
        fiveStarRatingCount: 8,
        oneStarRatingCount: 0,
      },
    },
    highlighted: true,
  },
  {
    title: "Computer Systems: A Programmer's Perspective",
    author: ['Randal E. Bryant', "David Richard O'Hallaron"],
    publisher: 'Prentice Hall',
    publicationDate: '2002-01-01',
    edition: 1,
    keywords: [
      'computer science',
      'computer systems',
      'programming',
      'software',
      'C',
      'engineering',
    ],
    pages: 978,
    format: 'hardcover',
    ISBN: '9780130340740',
    language: 'English',
    programmingLanguage: 'C',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 1010,
        reviewsCount: 57,
        fiveStarRatingCount: 638,
        oneStarRatingCount: 16,
      },
    },
    highlighted: true,
  },
  {
    title: 'Operating System Concepts',
    author: ['Abraham Silberschatz', 'Peter B. Galvin', 'Greg Gagne'],
    publisher: 'John Wiley & Sons',
    publicationDate: '2004-12-14',
    edition: 10,
    keywords: [
      'computer science',
      'operating systems',
      'programming',
      'software',
      'C',
      'Java',
      'engineering',
    ],
    pages: 921,
    format: 'hardcover',
    ISBN: '9780471694663',
    language: 'English',
    programmingLanguage: 'C, Java',
    onlineContent: false,
    thirdParty: {
      goodreads: {
        rating: 3.9,
        ratingsCount: 2131,
        reviewsCount: 114,
        fiveStarRatingCount: 728,
        oneStarRatingCount: 65,
      },
    },
  },
  {
    title: 'Engineering Mathematics',
    author: ['K.A. Stroud', 'Dexter J. Booth'],
    publisher: 'Palgrave',
    publicationDate: '2007-01-01',
    edition: 14,
    keywords: ['mathematics', 'engineering'],
    pages: 1288,
    format: 'paperback',
    ISBN: '9781403942463',
    language: 'English',
    programmingLanguage: null,
    onlineContent: true,
    thirdParty: {
      goodreads: {
        rating: 4.35,
        ratingsCount: 370,
        reviewsCount: 18,
        fiveStarRatingCount: 211,
        oneStarRatingCount: 6,
      },
    },
    highlighted: true,
  },
  {
    title: 'The Personal MBA: Master the Art of Business',
    author: 'Josh Kaufman',
    publisher: 'Portfolio',
    publicationDate: '2010-12-30',
    keywords: ['business'],
    pages: 416,
    format: 'hardcover',
    ISBN: '9781591843528',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.11,
        ratingsCount: 40119,
        reviewsCount: 1351,
        fiveStarRatingCount: 18033,
        oneStarRatingCount: 1090,
      },
    },
  },
  {
    title: 'Crafting Interpreters',
    author: 'Robert Nystrom',
    publisher: 'Genever Benning',
    publicationDate: '2021-07-28',
    keywords: [
      'computer science',
      'compilers',
      'engineering',
      'interpreters',
      'software',
      'engineering',
    ],
    pages: 865,
    format: 'paperback',
    ISBN: '9780990582939',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.7,
        ratingsCount: 253,
        reviewsCount: 23,
        fiveStarRatingCount: 193,
        oneStarRatingCount: 0,
      },
    },
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    author: 'Cal Newport',
    publisher: 'Grand Central Publishing',
    publicationDate: '2016-01-05',
    edition: 1,
    keywords: ['work', 'focus', 'personal development', 'business'],
    pages: 296,
    format: 'hardcover',
    ISBN: '9781455586691',
    language: 'English',
    thirdParty: {
      goodreads: {
        rating: 4.19,
        ratingsCount: 144584,
        reviewsCount: 11598,
        fiveStarRatingCount: 63405,
        oneStarRatingCount: 1808,
      },
    },
    highlighted: true,
  },
];

// Assignment destructuring Arrays
const [firstBook, secondBook] = books;
console.log(firstBook, secondBook);

const [, , thirdBook] = books;
console.log(thirdBook);

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];
const [[, rating], [, ratingsCount]] = ratings;
console.log(rating, ratingsCount);

const ratingStars = [63405, 1808];
const [fiveStarRatings, oneStarRatings, threeStarRatings = 0] = ratingStars;
console.log(fiveStarRatings, oneStarRatings, threeStarRatings);

console.log(
  '---------------- Assignment - Destructuring Objects ----------------'
);
// Assignment destructuring Objects
const { title, author, ISBN } = books[0];
console.log(title, author, ISBN);

const { keywords: tags } = books[0];
console.log(tags);

const { language, programmingLanguage = 'unknown' } = books[6];
console.log(language, programmingLanguage);

let bookTitle = 'unknown';
let bookAuthor = 'unknown';
({ title: bookTitle, author: bookAuthor } = books[0]);
console.log(bookTitle, bookAuthor);

const {
  thirdParty: {
    goodreads: { rating: bookRating },
  },
} = books[0];
console.log(bookRating);

const printBookInfo = function ({ title, author, year = 'unknown' }) {
  return `${title} by ${author}, ${year}`;
};
console.log(
  printBookInfo({
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
    year: '2021',
  })
);

console.log(
  printBookInfo({
    title: 'Algorithms',
    author: ['Robert Sedgewick', 'Kevin Wayne'],
  })
);

//For Of loop in Array

//const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu2) console.log(item);

for (const [i, food] of menu2.entries()) console.log(`${[i + 1]}: ${food}`);

//Optional chaining

console.log(restaurant.openingHours.mon); //undefined
console.log(restaurant.openingHours?.mon?.open); //WITH optional chaining to avoid errors

// Optional chaining example:
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining on Methods
console.log(restaurant.order?.(0, 1) ?? "Method doesn't exist");
console.log(restaurant.orderRissoto?.(0, 1) ?? "Method doesn't exist");

// Optional chaining on Arrays
const users = [
  {
    name: 'Jonas',
    email: 'hello@jonas.io',
  },
];
console.log(users[0]?.name ?? 'User array empty');

//For Of loop in Object
// Properties NAMES
const properties = Object.keys(openingHours);
//console.log(properties);
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Properties VALUES
const values = Object.values(openingHours);
console.log(values);

// Properties VALUESEntire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

//SETS
const orderSet = new Set([
  'Pasta',
  'Rissotto',
  'Gnoqui',
  'Cannelloni',
  'Pasta',
  'Gnoqui',
]);
console.log(orderSet);
console.log(orderSet.size);
console.log(new Set('Jonnas'));
console.log(orderSet.has('Pasta'));
console.log(orderSet.has('Bread'));
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Rissotto');
//orderSet.clear();
console.log(orderSet);

for (const order of orderSet) console.log(order);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const uniqueStaff = [...new Set(staff)]; // Use of [...] to convert Set to Array
console.log(staff);
console.log(uniqueStaff);

//MAP

const rest = new Map();
rest.set('name', 'Classico Italiano'); // set creates the map
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbone, Portugal')); // set also returns the whole map

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :)')
  .set(false, 'We are closed :(');

console.log(rest.get('name')); // get method allows to read data
console.log(rest.get(true));

const time = 21;
console.log(`Actual time is: ${time}h
and the restaurant status is: ${rest.get(
  time > rest.get('open') && time < rest.get('close')
)}`);

console.log(rest.has('categories'));
rest.delete(2); // delete location in lisbone
//rest.clear(); // empty map
console.log(rest);
console.log(rest.size);

const question = new Map([
  ['question', 'What is the best programming languaje in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Java Script'],
  ['Correct', 3],
  [true, 'Correct :)'],
  [false, 'Try again!'],
]);

console.log(question);

// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer: ${key}: ${value}`);
  }
}
//const answer = Number(prompt('Chose you answer'));
const answer = 3;
console.log('Answer is: ' + answer);

console.log(question.get(answer));
if (answer === 3) {
  console.log(question.get(true));
} else {
  console.log(question.get(false));
}
answer === 3
  ? console.log(question.get(true))
  : console.log(question.get(false));

// Good solution using map
console.log(question.get(question.get('Correct') === answer)); // because "question.get('Correct') === answer)" is true or false boolean value.

console.log(question);
// convert Map to Array
console.log(...question);
console.log(...question.keys());
console.log(...question.values());

//string split and join
console.log('a+very+nice+string'.split('+')); // convert to array
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' '); // convert to array

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); // convert to string
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' '); //convert string to array
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n[0].toUpperCase() + n.slice(1)); //Capitalize first letter and add the rest of string, then push to the end of array

    // namesUpper.push(n.replace(n[0], n[0].toUpperCase)); // other way with replace()
  }
  console.log(namesUpper.join(' ')); // convert Array to string & print
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; // convert to string
  const last = str.slice(-4); // take the last 4 characters of string
  return last.padStart(str.length, '*'); // return the the last(4 digits) plus fulfilled with lenght of number with *.
};

console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad weather... All Departures Delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
