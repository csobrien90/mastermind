// Open global variables

var code;
var attempt;
var guessCount;
var guessLength;

//Functions

// User selects difficulty and generates code to guess

function setCode(difficulty) {
    guessLog.innerHTML = null;
    guessCountDisplay.innerHTML = 1;
    guessCount = 1;
    code = generateCode(difficulty);
    return(code);
}

function generateCode(difficulty) {
    let code;
    let howTo;
    if (difficulty == "easy") {
        code = getRandomInt(3) + getRandomInt(3) + getRandomInt(3);
        howTo = "Easy Mode: Guess the three digit code. Each digit is between 1 and 3.";
        guessLength = 3;
    } else if (difficulty == "medium") {
        code = getRandomInt(9) + getRandomInt(9) + getRandomInt(9) + getRandomInt(9);
        howTo = "Medium Mode: Guess the four digit code. Each digit is between 1 and 9.";
        guessLength = 4;
    } else {
        code = randomLetter() + randomLetter() + randomLetter() + randomLetter();
        howTo = "Hard Mode: Guess the sequence of four random lowercase letters.";
        guessLength = 4;
    }
    instructions.innerHTML = howTo;
    instructionsTitle.style.display = 'unset';
    guessDiv.style.display = 'unset';
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
    let double = duplicateCheck();

    if (code == null) {
            alert("Generate a code first!");
        } else if (attempt == "") {
            alert("You must enter a guess!");
        } else if (attempt.length != guessLength) {
            alert(`Your guess is invalid - it must be ${guessLength} characters long.`)
        } else if (attempt == code) {
            alert("Congratulations - you guessed right!");
            location.reload();
            return false;
        } else if (double) {
            alert("You have already guessed that! Please try again.");
        } else {
            guessCount++;
            displayCount();
            showGuessLog();
            giveFeedback();
            if (guessCount == 9) {
                alert(`You are out of guesses - you lose! The code was: ${code}`);
                location.reload();
                return false;
            }
            return(guessCount);
        }
}

function getAttempt() {
    let attempt = guess.value;
    return(attempt);
}

function displayCount() {
    guessCountDisplay.innerHTML = guessCount;
}

function showGuessLog() {
    let guess = getAttempt();
    var entry = document.createElement('td');
    entry.appendChild(document.createTextNode(guess));
    guessTable.appendChild(entry);
}

function duplicateCheck() {
    let attempt = getAttempt();
    let log = document.querySelectorAll('#guessTable tbody tr td'); 
    for (i=0; i < log.length; i++) {
        if (log[i].innerHTML == attempt) {
            return(true);
        }
    }
}

function giveFeedback() {

    //check digits of attempt against digits of code and give feedback a la mastermind game
    //compare attempt and code for number correct

    let attempt = getAttempt();
    let totalCorrect = 0;
    let correctPosition = 0;

    for (codeDigit of code) { 
        for (guessDigit of attempt) { 
            if (guessDigit == codeDigit) {
            totalCorrect++;
            break;
            }
        }
    }

    //compare attempt and code for correct number and position

    for (let i = 0; i < code.length; i++) {
        if (code[i] == attempt[i]) {
            correctPosition++;
        }
    }

    //issue statement with numbers of fully correct and partially correct
    var entry = document.createElement('td');
    var feedback = `${totalCorrect} correct digit(s); ${correctPosition} correctly positioned`
    entry.appendChild(document.createTextNode(feedback));
    guessTable.appendChild(entry);
    guessTable.innerHTML += ``;
}

//DOM Variables

var instructions = document.getElementById('instructions');
var challenge = document.querySelector('select');
var guess = document.getElementById('guess'); 
var attemptSubmit = document.getElementById('attempt');
var guessCountDisplay = document.getElementById("guessCount");
var guessTable = document.getElementById('guessTable');
var instructionsTitle = document.getElementById('instructionsTitle');
var guessDiv = document.getElementById('guessSection');

//Listeners

attempt = attemptSubmit.addEventListener('click', checkAttempt);