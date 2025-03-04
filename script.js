let randomNumber = Math.floor(Math.random() * 20) + 1; // Ensure 1-20 range
console.log(randomNumber);

const checkButton = document.getElementById('check');
const againButton = document.getElementById('again');
const userInput = document.getElementById('user-Input');
const messageBox = document.getElementById('message');
const main = document.getElementById('main');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');
const clearHighscoreButton = document.getElementById('clearHighscore');

let scoreValue = 20;
let highscoreValue = 0;

// Load highscore from localStorage
if (localStorage.getItem('highscore')) {
  highscoreValue = parseInt(localStorage.getItem('highscore'));
  highscoreElement.textContent = highscoreValue;
}

scoreElement.textContent = scoreValue;

function checkNumber() {
  let guess = parseInt(userInput.value);

  if (isNaN(guess) || guess < 1 || guess > 20) {
    messageBox.textContent = 'Enter a number between 1 and 20.';
    return;
  }

  if (guess === randomNumber) {
    messageBox.textContent = 'Correct! 🎉';
    main.style.backgroundColor = '#68B984';

    if (scoreValue > highscoreValue) {
      highscoreValue = scoreValue;
      highscoreElement.textContent = highscoreValue;
      localStorage.setItem('highscore', highscoreValue);
    }
    return;
  }

  // Score deduction based on difference
  let difference = Math.abs(randomNumber - guess);
  let deduction = difference >= 10 ? 5 : difference >= 5 ? 3 : 1; // Higher penalty for bigger mistakes

  scoreValue = Math.max(scoreValue - deduction, 0); // Prevent negative scores
  scoreElement.textContent = scoreValue;

  if (scoreValue === 0) {
    messageBox.textContent = 'Game Over! Click "Again" to restart.';
    main.style.backgroundColor = '#D23369';
    return;
  }

  messageBox.textContent = guess < randomNumber ? 'Too Low! 📉' : 'Too High! 📈';
  main.style.backgroundColor = '#CE7777';
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 20) + 1; // Ensure 1-20 range
  console.log(randomNumber);
  main.style.backgroundColor = '#222';
  messageBox.textContent = 'Start Guessing...';
  scoreValue = 20;
  scoreElement.textContent = scoreValue;
  userInput.value = '';
}

function clearHighscore() {
  localStorage.removeItem('highscore');
  highscoreValue = 0;
  highscoreElement.textContent = highscoreValue;
}

function handleEnterKeyPress(event) {
  if (event.key === 'Enter') {
    checkNumber();
  }
}

checkButton.addEventListener('click', checkNumber);
againButton.addEventListener('click', resetGame);
clearHighscoreButton.addEventListener('click', clearHighscore);
userInput.addEventListener('keydown', handleEnterKeyPress);
