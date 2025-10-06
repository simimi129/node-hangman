const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

const word = "testing";
const wordArray = word.split("");
const guessedLetters = new Array(wordArray.length).fill("_");
let guessesLeft = 5;
const triedLetters = new Set();

function colorize(text, color) {
  const codes = {
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    gray: 90,
  };
  const code = codes[color] || 0;
  return `\x1b[${code}m${text}\x1b[0m`;
}

console.log(`Word: ${guessedLetters.join(" ")} | Guesses left: ${guessesLeft}`);
(async () => {
  while (true) {
    const guess = await question("Take a guess: ");
    const normalizedGuess = guess.toLowerCase();

    if (!/^[a-z]$/i.test(normalizedGuess)) {
      console.log(colorize("⚠️ Please enter a single letter (A-Z)!", "yellow"));
      continue;
    }

    if (triedLetters.has(normalizedGuess)) {
      console.log(
        colorize(
          "⚠️ You've already tried that letter... Try another one!",
          "yellow"
        )
      );
      continue;
    }
    triedLetters.add(normalizedGuess);

    if (wordArray.includes(normalizedGuess)) {
      console.log(colorize("✅ Good guess!", "green"));
      wordArray.forEach((l, i) =>
        l === normalizedGuess ? (guessedLetters[i] = normalizedGuess) : null
      );
      if (!guessedLetters.includes("_")) {
        console.log(colorize("🎉 You've won! 🎉", "green"));
        break;
      }
    } else {
      console.log(colorize("❌ Nope. The letter isn't in the word", "red"));
      guessesLeft--;
      if (guessesLeft === 0) {
        console.log(colorize("💀 You've lost! 💀", "red"));
        break;
      }
    }
    console.log(
      `\nWord: ${guessedLetters.join(" ")} | Guesses left: ${guessesLeft}`
    );
    console.log(`Tried letters: ${Array.from(triedLetters).join(", ")}`);
  }
  rl.close();
})();
