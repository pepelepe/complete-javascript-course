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
