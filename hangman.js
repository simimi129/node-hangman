const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const word = "testing";
const wordArray = word.split("");

const guessedLetters = new Array(wordArray.length).fill("_");
let guessesLeft = 5;

const triedLetters = new Set();

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

console.log(`word: ${guessedLetters.join(" ")}, guesses left: ${guessesLeft}`);

(async () => {
  while (true) {
    const guess = await question("Take a guess: ");
    const normalizedGuess = guess.toLowerCase();

    if (normalizedGuess.length > 1) {
      console.log("Please write one letter only!");
      continue;
    }

    if (triedLetters.has(normalizedGuess)) {
      console.log("You've already tried that letter... Try another one!");
      continue;
    }
    triedLetters.add(normalizedGuess);

    if (wordArray.includes(normalizedGuess)) {
      console.log("Good guess!");
      wordArray.map((l, i) =>
        l === normalizedGuess ? (guessedLetters[i] = normalizedGuess) : null
      );
      if (!guessedLetters.includes("_")) {
        console.log("You've won!");
        break;
      }
    } else {
      console.log("Nope. The letter isn't in the word");
      guessesLeft--;
      if (guessesLeft === 0) {
        console.log("You've lost!");
        break;
      }
    }
    console.log(
      `\nword: ${guessedLetters.join(" ")}, guesses left: ${guessesLeft}`
    );
  }
  rl.close();
})();
