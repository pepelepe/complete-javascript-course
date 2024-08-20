'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-08-14T17:01:17.194Z',
    '2024-08-16T23:36:17.929Z',
    '2024-08-18T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDays = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(`Esto es passed days: ${daysPassed}`);
  //console.log(`Esto es date: ${date}`);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  //INTL API NUMBER FORMAT + CURRENCY. we can use in any application
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDays(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Your session has expired`;
      containerApp.style.opacity = 0;
    }
    // Drecrease 1s. time = time - 1; = time--;
    time--;
  };
  // Set time to 5 minutes
  let time = 120; // 120 sec = 2 min
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long',
    };
    const locale = currentAccount.locale;
    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`; // day/month/year

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log(23 === 23.0);

// Base 10 - 0 to 9
// Binary base 2 - 0 1

console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // give false, is an error in javascript

// Conversion
console.log(Number('23'));
console.log(+'23'); //+ sign makes type cohersion, converting to Number

// Parsing
console.log(Number.parseInt('30px')); // 30 is a number
console.log(Number.parseInt('e23')); // NaN because should start with a number

console.log(Number.parseInt('2.5rem')); //2
console.log(Number.parseFloat('2.5rem')); //2.5 used for read a value comming from CSS

console.log(parseFloat('2.5rem'));

// Checking if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));

// Checking if value is a number
console.log(Number.isFinite(20)); // true, this is the better way to check if value is a number
console.log(Number.isFinite('20')); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

// Square root
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2)); // 5
// Cubic root
console.log(8 ** (1 / 3)); // 2

//Maximum value
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

//Minimum value
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Calculate area of the circle
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592653589793

// Random number base in six number
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.3)); // 23

console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

// Rounding decimals
console.log((2.7).toFixed(0)); // 3 toFixed will return string
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35 Number

// Reminder
console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1
console.log(8 % 3); // 1
console.log(8 / 3); // 8 = 2 * 3 + 2

// even num : 2, 4, 6, 8
// odd num  : 1, 3, 5, 7

console.log(6 % 2); // 0 even
console.log(6 / 2); // 3 integer number

console.log(7 % 2); // 1 odd
console.log(7 / 2); // 3 integer number

const isEven = n => n % 2 === 0;
console.log(isEven(6));
console.log(isEven(7));
console.log(isEven(23));
console.log(isEven(514));

// document.body.addEventListener('click', function () {
//   const peter = [...document.querySelectorAll('.movements__row')].forEach(
//     function (row, i) {
//       // 0, 2, 4, 6
//       if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//       // 0, 3, 6, 9
//       if (i % 3 === 0) row.style.backgroundColor = 'blue';
//     }
//   );
//   console.log(peter);
// });

// Numeric separator
const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferFee = 15_00;
const transferFee2 = 1_500;

console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230

// BigInt
console.log(2 ** 53 - 1); //9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

console.log(423423423423423424234234234242n);
console.log(BigInt(423423423423423424234234234242));

//Operations
console.log(10000n + 10000n);

const huge = 203448583455890837532n;
const num = 23;
console.log(huge * BigInt(num));

console.log(20n > 15); //true
console.log(20n === 20); //false
console.log(typeof 20n); //bigint
console.log(20n == 20); //true , because type cohersion
console.log(20n == '20'); //true

console.log(huge + 'is Really big!!!'); // converted to string

// Division
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3.3333333333333335

//Creating Dates
const ahora = new Date();
console.log(ahora);
console.log(account1);
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

console.log('//////////////////////');

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(2142274980000));
console.log(Date.now());
console.log(new Date(Date.now()));

future.setFullYear(2040);
console.log(future);

console.log('//////////////////////');

// Operations with date
//const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (24 * 60 * 60 * 1000);
console.log(calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24)));

// Internationalization Date
//const ahora = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};
const locale = navigator.language;
console.log(locale);

//labelDate.textContent = new Intl.DateTimeFormat('en-US', options).format(ahora);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(ahora);

// Internationalization Number

const number = 3884764.23;
const optionsNum = {
  style: 'unit', // unit, percent or currency
  unit: 'mile-per-hour',
  //currency: 'EUR',
  //useGrouping: false,
};
console.log('US: ', new Intl.NumberFormat('en-US', optionsNum).format(number));
console.log(
  'Germany: ',
  new Intl.NumberFormat('de-DE', optionsNum).format(number)
);
console.log(
  'Syria: ',
  new Intl.NumberFormat('ar-SY', optionsNum).format(number)
);
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, optionsNum).format(number)
);

// TIMERS : setTimeout & setInterval
// setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza 🍕 with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('waiting...');

if (ingredients.includes('peperoni')) clearTimeout(pizzaTimer);

// setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 10000);

// TIMER APPLICATION
const projectTimer = function (timeX) {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`; // Here to print
    console.log(`TIMER: ${min}:${sec}`);

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Your session has expired`; // Same, Here to print
      containerApp.style.opacity = 0; // Clean up UI
    }
    // Drecrease 1s. time = time - 1; = time--;
    time--;
  };
  // Set time to X minutes
  let time = timeX; // 120 sec = 2 min
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  //return timer;
};
projectTimer(10);
