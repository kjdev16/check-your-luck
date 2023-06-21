let randomNumber = Math.floor(Math.random() * 20);
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

// Initialize the highscore
if (localStorage.getItem('highscore')) {
  highscoreValue = parseInt(localStorage.getItem('highscore'));
  highscoreElement.textContent = highscoreValue;
}

scoreElement.textContent = scoreValue;

function checkNumber() {
  console.log('Checking Number...');

  if (userInput.value > 20) {
    messageBox.textContent = 'Please enter a number less than 20.';
    return;
  }
  if (userInput.value < 1) {
    messageBox.textContent = 'Please enter a number greater than 1.';
    return;
  }
  if (randomNumber == userInput.value) {
    messageBox.textContent = 'Right!';
    main.style.backgroundColor = '#68B984';

    if (scoreValue > highscoreValue) {
      highscoreValue = scoreValue;
      highscoreElement.textContent = highscoreValue;
      localStorage.setItem('highscore', highscoreValue);
    }

    return;
  }

  scoreValue--;
  scoreElement.textContent = scoreValue;

  if (scoreValue === 0) {
    messageBox.textContent = 'You have lost the game! Click on Again.';
    main.style.backgroundColor = '#D23369';
    return;
  }

  if (randomNumber > userInput.value) {
    messageBox.textContent = 'Too Low';
    main.style.backgroundColor = '#CE7777';
    return;
  }

  if (randomNumber < userInput.value) {
    messageBox.textContent = 'Too High';
    main.style.backgroundColor = '#CE7777';
    return;
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 20);
  main.style.backgroundColor = '#333';
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
