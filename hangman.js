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

winOrLose = "";

(async () => {
  while (winOrLose === "") {
    const guess = await question("Take a guess: ");

    if (guess.length > 1) {
      console.log("Please write one letter only");
      return;
    }

    if (wordArray.includes(guess)) {
      wordArray.map((l, i) =>
        l === guess ? (guessedLetters[i] = guess) : null
      );
      if (!guessedLetters.includes("_")) {
        winOrLose = "w";
        console.log("you've won");
        break;
      }
    } else {
      guessesLeft--;
      if (guessesLeft === 0) {
        winOrLose = "l";
        console.log("you've lost");
        break;
      }
    }
    console.log(`word: ${guessedLetters}, guesses left: ${guessesLeft}`);
  }
  rl.close();
})();
