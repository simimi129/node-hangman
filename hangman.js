const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const word = "testing";
const wordArray = word.split("");

const guessedLetters = new Array(wordArray.length).fill("_");
let guessesLeft = 5;

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

console.log(`word: ${guessedLetters}, guesses left: ${guessesLeft}`);

(async () => {
  while (true) {
    const guess = await question("Take a guess: ");
    const normalizedGuess = guess.toLowerCase();

    if (normalizedGuess.length > 1) {
      console.log("Please write one letter only");
      continue;
    }

    if (wordArray.includes(normalizedGuess)) {
      wordArray.map((l, i) =>
        l === normalizedGuess ? (guessedLetters[i] = normalizedGuess) : null
      );
      if (!guessedLetters.includes("_")) {
        console.log("you've won");
        break;
      }
    } else {
      guessesLeft--;
      if (guessesLeft === 0) {
        console.log("you've lost");
        break;
      }
    }
    console.log(`word: ${guessedLetters}, guesses left: ${guessesLeft}`);
  }
  rl.close();
})();
