let js = 'amazing';

console.log(40 + 8 + 23 - 10);
console.log('Jonas');
console.log(23);

let firstName = "Jonas"
console.log(firstName)

// 1 - Declare variables called country, continent and population and assign their values according to your own country (population in millions).

// Log their values to the console.

let country = "Canada";
let continent = "North America";
let population = 38930000

console.log(`${country} is located in ${continent} and has a population of ${population} million people`)

// 2 - Declare a variable called isIsland and set its value according to your country. The variable should hold a Boolean value. Also declare a variable language, but don't assign it any value yet.

// Log the types of isIsland, population, country and language to the console.

let isIsland = false;
let language = "";

console.log(typeof isIsland, typeof population, typeof country, typeof language)

// 3 - let, const and var﻿
//Set the value of language to the language spoken where you live (some countries have multiple languages, but just choose one).

// Think about which variables should be const variables (which values will never change, and which might change?). Then, change these variables to const.

// Try to change one of the changed variables now, and observe what happens.

language = "english";

// 4 - Basic Operators﻿
// If your country split in half, and each half would contain half the population, then how many people would live in each half?

// Increase the population of your country by 1 and log the result to the console.

// Finland has a population of 6 million. Does your country have more people than Finland?

// The average population of a country is 33 million people. Does you country have less people than the average country?

// Based on the variables you created, create a new variable description which contains a string with this format: 'Portugal is in Europe, and its 11 million people speak portuguese'.

let halfPopulation = population / 2;
console.log(`Half of the population of ${country} are ${halfPopulation} million people`)

let increasePopulation = population + 1;
console.log(`When the population is increased by 1 is ${increasePopulation} million people`)

const Finland = 6000000;
const averagePopulation = 33000000

if (population > Finland) {
	console.log(`Yes! ${country} has ${population}, that is more population than ${Finland} of Finland`)
} else {
	console.log(`No! ${country} has not more population than ${Finland} of Finland`)
}

if (population > averagePopulation) {
	console.log(`Yes! ${country} has more population than ${averagePopulation} of an average country`)
} else {
	console.log(`No! ${country} has not more population than ${Finland} of an average country`)
}

let description = `${country} is in ${continent}, and its ${population} million people speak ${language}`
console.log(description)

// 5 - Recreate the description variable from the last assignment, this time using the template literal syntax.
// 7 - Type Conversion and Coercion﻿
//Predict the result of these 5 operations without executing them:


console.log('9' - '5'); // -> ?
console.log('19' - '13' + '17'); // -> ?
console.log('19' - '13' + 17); // -> ?
console.log('123' < 57); // -> ?
console.log(5 + 6 + '4' + 9 - 4 - 2); // -> ?

// 8 - Equality Operators: == vs. ===﻿
// Declare a variable numNeighbours based on a prompt input like this:

// prompt('How many neighbour countries does your contry have?');
// If there is only 1 neighbour, log to the console 'Only 1 border!' (use loose equality == for now).

// Use an else-if block to log 'More than 1 border' in case numNeighbours is greater than 1.

// Use an else block to log 'No borders' (this block will be executed when numNeighbours is 0 or any other value).

// Test the code with different values of numNeighbours, including 1 and 0.

// Change == to ===, and test the code again, with the same values of numNeighbours. Notice what happens when there is exactly 1 border! Why is this happening?

// Finally, convert numNeighbours to a number, and watch what happens now when you input 1.

// Reflect on why we should use the === operator and type conversion in this situation.

const numNeighbours = Number(
	prompt('How many neighbour countries does your country have?')
);

if (numNeighbours === 1) {
	console.log('Only 1 border!');
} else if (numNeighbours > 1) {
	console.log('More than 1 border');
} else {
	console.log('No borders');
}

// 9 - Logical Operators﻿
// Comment out the previous code so the prompt doesn't get in the way.

// Let's say Sarah is looking for a new country to live in. She wants to live in a country that speaks English, has less than 50 million people and is not an island.

// Write an if statement to help Sarah figure out if your country is right for her. You will need to write a condition that accounts for all of Sarah's criteria. Take your time with this, and check part of the solution if necessary.

//If yours is the right country, log a strings like this 'You should live in Portugal :)'. If not, log 'Portugal does not meet your criteria :('.

if (language === 'english' && population < 50000000 && !isIsland) {
	console.log('You should live in ' + country + ' :)')
} else {
	console.log(country + ' does not meet your criteria :(')
}

// 10 - The switch Statement﻿
// Use a switch statement to log the following string for the given language:

// chinese or mandarin: 'MOST number of native speakers!';

// spanish: '2nd place in number of native speakers';

// english: '3rd place';

// hindi: 'Number 4';

// arabic: '5th most spoken language';

// for all other simply log 'Great language too :D'.

language = "spanish";

switch (language) {
	case "chinese":
	case "mandarin":
		console.log(language + ': MOST number of native speakers!');
		break;
	case "spanish":
		console.log(language + ': 2nd place in number of native speakers');
		break;
	case "english":
		console.log(language + ': 3rd place');
		break;
	case "hindi":
		console.log(language + ': Number 4');
		break;
	case "arabic":
		console.log(language + ': 5th most spoken language');
		break;
	default:
		console.log(language + ': Great language too :D');
}

// 11 - The Conditional (Ternary) Operator﻿
// If your country's population is greater than 33 million, use the ternary operator to log a string like this to the console: "Portugal's population is above average". Otherwise, simply log "Portugal's population is below average". Notice how only one word change between these two sentences!

let position = population > 33000000 ? "above" : "below";
console.log(`${country}'s population is ${position} average`)
// After checking the result, change the population temporarily to 13 and then to 130. See the different results, and set the population back to original.
