'use strict';

//Coding Challenge #1

/*
We're building a football betting app (Soccer for my American firends :))!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables "players1" and "players2")
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ("fieldPlayers") with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ("playersFinal") containing all the original team1 players plus "Thiago", "Coutinho" and "Perisic"
5. Based on the game.odds object, create one variable for each odd (called "team1", "dreaw" and "team2")
6. Write a function ("printGoals") that receives an arbitrary number of player names (Nor an array) and prints each of them to the console, along with the number of goals who were scored (number of player names passed in)
7. The team with the lower odd is more likely to win.
Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players "Davies", "Muller", "Lewandowski" and "Kimmich". Then, call the fucntion again with players from game.scored

GOOD LUCK :)
*/

const game = {
  team1: 'Bayer Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schutz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4.0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Humels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const players1 = game.players[0];
const players2 = game.players[1];
// Solution : const [players1, players2] = game.players;
console.log('Team 1: ' + players1);
console.log('Team 2: ' + players2);

//2
const [gk, ...fieldplayers] = players1; // Good
console.log('Goalkeeper in team 1: ' + gk);
console.log('Field players in team 1: ' + fieldplayers);

//3
const allPlayers = [...players1, ...players2]; // Good
console.log('All players: ' + allPlayers);

//4
const playersFinal = [...players1, 'Thiago', 'Coutinho', 'Perisic']; // Good
console.log('All members of team 1: ' + playersFinal);

//5
const team1 = game.odds.team1;
const team2 = game.odds.team2;
const draw = game.odds.x;
//Solution : const {odds:{team1, x:draw, team2}} = game;
console.log('Team 1 Odds: ' + team1);
console.log('Team 2 Odds: ' + team2);
console.log('Draw Odds: ' + draw);

//6
const printGoals = function (...playerNames) {
  // Good
  const score = game.score;
  console.log('The following players scored in the match: ');
  for (let i = 0; i < playerNames.length; i++) console.log(playerNames[i]);
  console.log(`with a total score of ${score} during the play time.`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

//7
const team1Name = game.team1;
const team2Name = game.team2;
if (game.odds.team1 < game.odds.team2) {
  console.log(
    `${team1Name} has the lower odd ${team1} and is more likely to win. ${team2Name} odd is ${team2}`
  );
} else if (game.odds.team1 === game.odds.team2) {
  console.log(`${team1Name} and ${team1Name} has a draw odd is ${draw}`);
} else {
  console.log(
    `${team2Name} has the lower odd ${team2} and is more likely to win. ${team1Name} odd is ${team1}`
  );
}

game.odds.team1 < game.odds.team2 && // Good
  console.log(
    `Odds: ${team1Name} has the lower odd ${team1} and is more likely to win. ${team2Name} odd is ${team2}`
  );

//Coding Challenge #2

/*
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names.

BONUS: Create an object called 'scorers' which contains the names of the players who scored as proprties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
GOOD LUCK :)
*/

console.log('-------------- Coding Challenge #2 --------------');

//1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
const gameScored = Object.entries(game.scored);
for (const [i, player] of gameScored) {
  const index = Number(i); // or use +i
  console.log(`Goal ${[index + 1]}: ${player}`);
}

//2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
const gameOdds = Object.entries(game.odds);
let sumOdd = 0;
for (const [Key, odds] of gameOdds) {
  sumOdd += Number(odds);
}
const averageOdd = sumOdd / gameOdds.length;
console.log(`The average odd is ${averageOdd}`);

//3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} :${odd}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as proprties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

console.log('-------------- Coding Challenge #3 --------------');
//1
gameEvents.set(93, '✋ End of match');
console.log(gameEvents);

//2
gameEvents.delete(64);

//3

//4
const matchTime = 0;
for (const [key, value] of gameEvents) {
  if (key < 45) console.log(`[FIRST HALF] ${key}: ${value}`);
  else console.log(`[SECOND HALF] ${key}: ${value}`);
}

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

// const camelCaseConverter = function (text) {
//   const [firstStr, secondStr] = text.split('_');
//   const newText = [firstStr];
//   newText.push(secondStr.slice(0, 1).toUpperCase() + secondStr.slice(1));
//   console.log(newText.join(''));

//   //namesUpper.push(n[0].toUpperCase() + n.slice(1));
//   console.log(
//     `This is the variable transformed from original: ${text}, to converted: ${newText
//       .join('')
//       .trim()}`
//   );
// };

const camelCaseConverter = function (text) {
  const newText = text.toLowerCase().trim().split(' ');
  let textFiltered = newText.filter(function (el) {
    return el != '';
  });
  for (const [i, str] of textFiltered.entries()) {
    const [firstStr, secondStr] = str.split('_');
    const output = `${firstStr}${secondStr.replace(
      secondStr[0],
      secondStr[0].toUpperCase()
    )} `;
    console.log(`${output.padEnd(20)}${'✈️'.repeat(i + 1)}`);
  }
  console.log();
};
camelCaseConverter(
  'underscore_case  first_name Some_Variable  calculate_AGE delayed_departure'
);
camelCaseConverter(' PEDRO_tony');