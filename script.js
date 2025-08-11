const words = [
  { word: "ELEPHANT", category: "Animal", hint: "Largest land animal" },
  { word: "PYTHON", category: "Programming Language", hint: "Snake or code?" },
  { word: "GUITAR", category: "Musical Instrument", hint: "Has strings" },
  { word: "MANALI", category: "Travel Destination", hint: "Famous hill station in Himachal Pradesh"},
  { word: "LAPTOP", category: "Electronics", hint: "Portable computer" }
];

let selectedWord = {};
let wrongGuesses = 0;
const maxWrong = 6;

const wordContainer = document.getElementById("word-container");
const keyboard = document.getElementById("keyboard");
const hangmanBody = document.getElementById("hangman-body");
const winMessage = document.getElementById("win-message");
const playAgainBtn = document.getElementById("play-again-btn");
const hintBox = document.getElementById("hint");
const categoryBox = document.getElementById("category");

const parts = [
  drawHead,
  drawBody,
  drawLeftArm,
  drawRightArm,
  drawLeftLeg,
  drawRightLeg
];

function init() {
  const random = words[Math.floor(Math.random() * words.length)];
  selectedWord = random;
  wrongGuesses = 0;

  wordContainer.innerHTML = "";
  keyboard.innerHTML = "";
  hangmanBody.innerHTML = "";
  hangmanBody.classList.remove("swing");
  winMessage.textContent = "";
  playAgainBtn.style.display = "none";

  hintBox.textContent = `💡 Hint: ${random.hint}`;
  categoryBox.textContent = `📚 Category: ${random.category}`;

  random.word.split("").forEach(() => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = "_";
    wordContainer.appendChild(span);
  });

  for (let i = 65; i <= 90; i++) {
    const btn = document.createElement("button");
    btn.textContent = String.fromCharCode(i);
    btn.addEventListener("click", handleGuess);
    keyboard.appendChild(btn);
  }
}

function handleGuess(e) {
  const letter = e.target.textContent;
  e.target.disabled = true;

  if (selectedWord.word.includes(letter)) {
    revealLetters(letter);
    if (checkWin()) {
      winMessage.textContent = "🎉 You Won the Game!";
      disableAllButtons();
      playAgainBtn.style.display = "inline-block";
    }
  } else {
    wrongGuesses++;
    parts[wrongGuesses - 1]();
    if (wrongGuesses === maxWrong) {
      hangmanBody.classList.add("swing"); // ⛓️ Move body on loss
      winMessage.textContent = "☠️ Game Over!";
      disableAllButtons();
      playAgainBtn.style.display = "inline-block";
    }
  }
}

function revealLetters(letter) {
  const spans = document.querySelectorAll(".letter");
  selectedWord.word.split("").forEach((char, i) => {
    if (char === letter) {
      spans[i].textContent = letter;
    }
  });
}

function checkWin() {
  const spans = document.querySelectorAll(".letter");
  return Array.from(spans).every((span, i) => span.textContent === selectedWord.word[i]);
}

function disableAllButtons() {
  const allButtons = document.querySelectorAll("#keyboard button");
  allButtons.forEach(btn => btn.disabled = true);
}

function drawHead() {
  hangmanBody.innerHTML += `<circle cx="250" cy="130" r="30" stroke="#3eb59d" stroke-width="6" fill="none"/>`;
}
function drawBody() {
  hangmanBody.innerHTML += `<line x1="250" y1="160" x2="250" y2="250" stroke="#3eb59d" stroke-width="6"/>`;
}
function drawLeftArm() {
  hangmanBody.innerHTML += `<line x1="250" y1="180" x2="210" y2="220" stroke="#3eb59d" stroke-width="6"/>`;
}
function drawRightArm() {
  hangmanBody.innerHTML += `<line x1="250" y1="180" x2="290" y2="220" stroke="#3eb59d" stroke-width="6"/>`;
}
function drawLeftLeg() {
  hangmanBody.innerHTML += `<line x1="250" y1="250" x2="220" y2="300" stroke="#3eb59d" stroke-width="6"/>`;
}
function drawRightLeg() {
  hangmanBody.innerHTML += `<line x1="250" y1="250" x2="280" y2="300" stroke="#3eb59d" stroke-width="6"/>`;
}

playAgainBtn.addEventListener("click", init);

init();

