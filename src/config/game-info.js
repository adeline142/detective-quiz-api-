// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'detective-quiz',       // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Detective Quiz',       // the name players will see
  team: 'Team 3 (BSCS 3-2)',    // your group's name and section, for example Bookworms (3-1)
  developer: 'adeline142',       // YOUR GitHub username: this build is yours
  description: 'A competitive investigation quiz game where players answer clue questions, unlock clues, accuse a suspect, and compete for the highest score.', // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 30,
  version: pkg.version,         // read from package.json, do not edit here
};
