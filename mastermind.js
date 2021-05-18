// Open global variables

var code;
var attempt;
var guessCount = 0;

//Functions


// User selects difficulty and generates code to guess

function setCode() {
    let difficulty = challenge.value;
    code = generateCode(difficulty);
    return(code);
}

function generateCode(difficulty) {
    let code;
    let howTo;
    if (difficulty == "easy") {
        code = getRandomInt(3) + getRandomInt(3) + getRandomInt(3);
        howTo = "Easy Mode: Guess the three digit code. Each digit is between 1 and 3.";
    } else if (difficulty == "medium") {
        code = getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9);
        howTo = "Medium Mode: Guess the four digit code. Each digit is between 1 and 9.";
    } else {
        code = randomLetter() + randomLetter() + randomLetter() + randomLetter();
        howTo = "Hard Mode: Guess the sequence of four random lowercase letters.";
    }
    instructions.innerHTML = howTo;
    return(code);
}

function getRandomInt(max) {
    let int = 1 + Math.floor(Math.random() * max);
    let stringInt = int.toString();
    return(stringInt);
  }

function randomLetter() {
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let randomizer = +getRandomInt(26) - 1;
    return(alphabet[randomizer]);
  }


// Count user's guess, assess win conidtion, and give feedback

function checkAttempt() {
    let attempt = getAttempt();

    if (code == null) {
            alert("Generate a code first!");
        } else if (attempt == "") {
            alert("You must enter a guess!");
        } else if (attempt == code) {
            alert("Congratulations - you guessed right!");
        } else if (guessCount == 8 ) {
            alert("You are out of guesses - you lose!");
        } else {
            alert("That guess does not match");
            return(guessCount++);
        }
}

function getAttempt() {
    let attempt = guess.value;
    return(attempt);
}

function feedback() {
    guessCountDisplay.innerHTML = guessCount;
}

//DOM Variables
const input = document.querySelector('button');
const instructions = document.getElementById('instructions');
const challenge = document.querySelector('select');
const guess = document.getElementById('guess'); 
// "blah" is not an appropriate variable...
const blah = document.getElementById('attempt');
const guessCountDisplay = document.getElementById("guessCount");

//Listeners

code = input.addEventListener('click', setCode);
attempt = blah.addEventListener('click', checkAttempt);

//Executable

feedback();