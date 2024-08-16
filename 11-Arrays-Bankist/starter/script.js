'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');

// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');

// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');

// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = ''; //reinitialization of the movements to empty

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';
//     const html = `
//       <div class="movements__row">
//         <div class="movements__type movements__type--${type}">
//         ${i + 1} ${type}</div>
//         <div class="movements__value">${mov}€</div>
//       </div>
//       `;
//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// const calcDisplayBalance = function (acc) {
//   acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = `${acc.balance}€`;
// };

// const calcDisplaySummary = function (acc) {
//   const incomes = acc.movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumIn.textContent = `${incomes}€`;

//   const out = acc.movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);
//   labelSumOut.textContent = `${Math.abs(out)}€`;

//   const interest = acc.movements
//     .filter(mov => mov > 0)
//     .map(deposit => (deposit * acc.interestRate) / 100)
//     .filter((int, i, arr) => int >= 1) // interest is calculated if amount is biger than 1
//     .reduce((acc, int) => acc + int, 0);
//   labelSumInterest.textContent = `${interest}€`;
// };

// //const user = 'Steven Thomas Williams'; // stw
// // Create User, element username in the object account# from accounts array
// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ') //s,t,w
//       .map(name => name[0])
//       .join(''); //stw
//   });
// };
// createUsernames(accounts);

// const updateUI = function (acc) {
//   //Display movements
//   displayMovements(acc.movements);
//   //Display balance
//   calcDisplayBalance(acc);
//   //Display summary
//   calcDisplaySummary(acc);
// };

// // Event handler for LOGIN
// let currentAccount;
// btnLogin.addEventListener('click', function (e) {
//   //Prevent form for submitting
//   e.preventDefault();
//   console.log('LOGIN');
//   currentAccount = accounts.find(
//     acc => acc.username === inputLoginUsername.value
//   );
//   console.log('Current account: ');
//   console.log(currentAccount);
//   // ? optional chainning
//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     //Display UI and message
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(' ')[0] //firs element //split(' ').reverse()[0] // chainning for last element
//     }`;
//     //containerApp.style = 'opacity: 1';
//     containerApp.style.opacity = 100;
//     //Clear input fields
//     inputLoginUsername.value = inputLoginPin.value = ''; // asignment operator works from right to left
//     inputLoginPin.blur();

//     //Update UI
//     updateUI(currentAccount);
//   }
// });

// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();
//   const amount = Number(inputTransferAmount.value);
//   const receiverAcc = accounts.find(
//     acc => acc.username === inputTransferTo.value
//   );
//   inputTransferAmount.value = inputTransferTo.value = '';
//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc.username !== currentAccount.username
//   ) {
//     // Doing the transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     //Update UI
//     updateUI(currentAccount);
//   }
// });

// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();

//   const amount = Number(inputLoanAmount.value);
//   if (
//     //* 0.1 = 10%
//     amount >= 0 &&
//     currentAccount.movements.some(mov => mov >= amount * 0.1)
//   ) {
//     //Add movement
//     currentAccount.movements.push(amount);
//     //Update UI
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = '';
// });

// btnClose.addEventListener('click', function (e) {
//   e.preventDefault();

//   if (
//     inputCloseUsername.value === currentAccount.username &&
//     Number(inputClosePin.value) === currentAccount.pin
//   ) {
//     console.log('Delete');
//     const index = accounts.findIndex(
//       acc => acc.username === currentAccount.username
//     );
//     accounts.splice(index, 1); //delete account
//     containerApp.style.opacity = 0; //hide UI
//   }
//   inputCloseUsername.value = inputClosePin.value = '';
// });

// let sorted = false;
// btnSort.addEventListener('click', function (e) {
//   e.preventDefault();
//   displayMovements(currentAccount.movements, !sorted);
//   sorted = !sorted;
// });

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr);

//SLICE
console.log(arr.slice(2, 4));
console.log(arr.slice(-1)); // is the last element of array
console.log(arr.slice()); // Create a shallow copy of the array
console.log([...arr]); // Create a shallow copy of the array
console.log({ ...arr }); // Create Object

//SPLICE
console.log(arr.splice(2)); // Splice mutate the original array
console.log(arr.splice(-1)); // Will delete last element from original array (common use)
console.log(arr);

//REVERSE
const arr2 = ['k', 'j', 'i', 'h', 'f'];
console.log(arr2.reverse()); //(5) ['f', 'h', 'i', 'j', 'k'] reverse and mutate the original array
console.log(arr2);

//CONCAT
const letters = arr.concat(arr2); // join the 2 arrays. This mutate original array
console.log(letters);
console.log([...arr, ...arr2]); //the new way Spread operator on ES6. This NOT mutate original array

//JOIN
console.log(typeof letters.join(' - ')); //Convert to string

//AT method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));
console.log(arr3[arr3.length - 1]); // To know the last element of array
console.log(arr3.slice(-1)[0]); // To know the last element of array
console.log(arr3.at(-1)); // To know the last element of array

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposit ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log(`---- FOREACH ----`);

movements.forEach(function (movement, i, arr) {
  // Must respect this order, el, index and whole but  not necesary print all of them
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposit ${movement}`);
    //console.log(`${arr}`); //print the wholw array
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

////////////////////////////////////
//FoeEach with Map & Sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
console.log('//////// Coding Challenge #1 ////////');

const dataJulia1 = [3, 5, 2, 12, 7];
const dataKate1 = [4, 1, 15, 8, 3];
const dataJulia2 = [9, 16, 6, 8, 3];
const dataKate2 = [10, 5, 6, 1, 4];

const checkDogs = function (dogsJulia, dogsKate) {
  const newDogsJulia = [...dogsJulia].slice(1, 3); // remove the cat ages FIRST and the LAST TWO
  const listOfDogsAge = [...newDogsJulia, ...dogsKate];

  listOfDogsAge.forEach((dogAge, i) =>
    dogAge >= 3
      ? console.log(
          `Dog number ${i + 1} is an adult, and is ${dogAge} years old"`
        )
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`)
  );
};
checkDogs(dataJulia2, dataKate2);

// Map method
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
// const movementsUSD = movements2.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements2.map(mov => mov * eurToUsd);
console.log(movements);
console.log(movementsUSD);

const movementDesc = movements2.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementDesc);

//Filter method
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposit);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//Reduce method
// accumulator -> SNOWBALL
const balance = movements.reduce(function (accumulator, cur, i, arr) {
  console.log(`Iteration ${i}: ${accumulator}`);
  return accumulator + cur;
}, 0);
console.log(balance);

//Maximum value
const maxValue = movements.reduce(
  (acc, mov) => (acc > mov ? acc : mov),
  movements[0]
);
console.log('MAX VALUE: ' + maxValue);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('//////// Coding Challenge #2 ////////');

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (dogAge) {
    //if the dog is <= 2 years old, humanAge = 2 * dogAge.
    //If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
    if (dogAge <= 2) {
      return 2 * dogAge;
    } else if (dogAge > 2) {
      return 16 + dogAge * 4;
    }
  });
  //Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  const adultDogs = humanAge.filter(age => age > 18);
  //Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  const averageHumanAge = adultDogs.reduce(function (acc, age) {
    return acc + age / adultDogs.length;
  }, 0);
  return averageHumanAge;
  // console.log(ages);
  // console.log(humanAge);
  // console.log(adultDogs);
  // console.log(averageHumanAge);
};
const data1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const data2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(data1);
console.log(data2);

//Chaining methods
//const eurToUsd = 1.1;

//PIPELINE
const totalDepositesUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositesUSD);

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

console.log('//////// Coding Challenge #3 ////////');

const calcAverageHumanAge2 = function (ages) {
  const humanAge = ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age > 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  return humanAge;
};
const dataA = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const dataB = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(dataA);
console.log(dataB);

//Find method
const firstWithdrawal = movements.find(mov => mov < 0); // Will no return array , it will return the first element that satidfyed the condition
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

console.log(movements);
console.log(movements.includes(-130));

//Some method
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);

//Every method
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

const arr4 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr4.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]

const arr4Deep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arr4Deep.flat(2)); // 2 take second level of deep

//flat method
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);
//flatMap method
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

//strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // mutate original array
console.log(owners);

//Numbers
console.log(movements);
//Ascending
movements.sort((a, b) => a - b);
console.log(movements);
//Descending
movements.sort((a, b) => b - a);
console.log(movements);

const arr5 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//Empty arrays + fill method - Create array programatically
const x = new Array(7);
console.log(x);
x.fill(1, 3, 5);
console.log(x);

arr5.fill(23, 2, 6);
console.log(arr5);

//Array.from - Create array programatically
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (curr, i) => i + 1);
console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);
// });

///////////////////////////////////////
// Array Methods Practice

//1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

//2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposits1000);

//3
const { deposits, withdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawal += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawal'] += cur;
      return sums;
    },
    { deposits: 0, withdrawal: 0 }
  );
console.log(deposits, withdrawal);

//4
//this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not to long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
///////////////////////////1.
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const createRecommendedFoodPortion = function (animals) {
  animals.forEach(function (dog) {
    const recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
    dog.recFood = recommendedFood; // 1000;
  });
};
createRecommendedFoodPortion(dogs);
///////////////////////////2.
console.log(dogs);
const checkDogFood = function (dogOwner) {
  const dog = dogs.find(dog => dog.owners.includes(dogOwner));

  if (!dog) {
    console.log(`Owner dog is not registered!`);
    return;
  }
  const recommendedFood = dog.weight ** 0.75 * 28;

  if (dog.curFood > dog.recFood) {
    console.log(`${dogOwner}'s dog is eating too much food`);
  } else if (dog.curFood < dog.recFood) {
    console.log(`${dogOwner}'s dog is not eating enough food`);
  } else {
    console.log(`${dogOwner}'s dog is eating mormaly amount of food`);
  }
};
checkDogFood('Sarah');
///////////////////////////3.
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];

const listOwners = dogs.forEach(dog => {
  const recommendedFood = dog.weight ** 0.75 * 28;
  if (dog.curFood > recommendedFood * 1.1) {
    ownersEatTooMuch.push(...dog.owners);
  } else if (dog.curFood < recommendedFood * 0.9) {
    ownersEatTooLittle.push(...dog.owners);
  }
});
console.log(`All owners of dogs who eat too much ${ownersEatTooMuch}`);
console.log(`All owners of dogs who eat too little ${ownersEatTooLittle}`);
//Solution don by Johnas
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooLittle);
///////////////////////////4.
console.log(ownersEatTooMuch);
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`);
///////////////////////////5.
const isAnyDogEatingExactly = dogs.some(dog => {
  return dog.curFood === dog.recFood;
});
console.log(isAnyDogEatingExactly); // true or false
///////////////////////////6.
const isAnyDogEatingOkay = dog =>
  dog.curFood >= dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(isAnyDogEatingOkay)); // true or false
///////////////////////////7.
console.log(dogs.filter(isAnyDogEatingOkay));
console.log(dogs.filter(isAnyDogEatingOkay).flatMap(dog => dog.owners));
///////////////////////////8.
const dogsCopy = dogs.slice(); //create shallow copy
console.log(dogsCopy);
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood); //Sort array
console.log(dogsSorted);
