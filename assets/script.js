// Declaring global variables

const instructionsButton = document.getElementById("instructions");
const startButton = document.getElementById("start");
const leaderBoardButton = document.getElementById("leaderboard");
const title = document.getElementById("title");
const questionDisplay = document.getElementById("question-display");
const choiceDisplay = document.getElementById("choice-display");
let answerBank = "";
let answerCheck = "";
let userSelection = "";
let userInitials = "";
let timerInterval = "";
let secondsLeft = 56;
let questionCounter = 0;
let score = 0;
let highScore = 0;

// Instructions Button: Displays quiz instructions to the user

instructionsButton.addEventListener("click", function () {
  title.innerText = "Instructions:";
  questionDisplay.innerHTML =
    "For every question you get right, you get +1 point and increase the timer by +10 seconds. If you answer wrong, the timer is decreased by 10 seconds." +
    "<br />" +
    "<br />" +
    "At the end of the quiz, the remaining time is added with your answer score to give your final score.";
});

// Start Quiz Button: Button calls function that starts quiz

startButton.addEventListener("click", function () {
  startQuiz();
});

// Leaderboards Button: Displays user's highscore stored in local storage

leaderBoardButton.addEventListener("click", function () {
  title.innerText = "Leaderboard:";
  choiceDisplay.innerText = "";
  if (userInitials != "") {
    questionDisplay.innerText =
      "The high score belongs to: " +
      userInitials +
      " with a score of " +
      highScore;
  } else {
    questionDisplay.innerText =
      "No high score recorded yet. Click Start Quiz and give it your all!";
  }
});

// These functions make up the abstract steps of the quiz

function startQuiz() {
  questionCounter = 0;
  hideMenu();
  showQuestions();
  startTimer();
}

// Hide Menu function: Hides Leaderboards and Start Quiz Button during quiz

function hideMenu() {
  startButton.style.visibility = "hidden";
  leaderBoardButton.style.visibility = "hidden";
  instructionsButton.style.visibility = "hidden";
}

// Show Menu function: Shows Leaderboards and Start Quiz Button when not taking quiz.

function showMenu() {
  startButton.style.visibility = "visible";
  leaderBoardButton.style.visibility = "visible";
  instructionsButton.style.visibility = "visible";
}

// Show Questions function: Displays questions on the document until the questions run out

function showQuestions() {
  if (quizBank.length == questionCounter) {
    endQuiz();
  } else {
    questionDisplay.innerText = quizBank[questionCounter].question;
    showAnswers();
  }
}

// Show Answers function: Displays answer choices and answer submit button. Start's right/wrong check on submit

function showAnswers() {
  choiceDisplay.innerText = "";
  for (let i = 0; i < quizBank[questionCounter].answers.length; i++) {
    let buttonInput = document.createElement("input");
    buttonInput.setAttribute("type", "radio");
    buttonInput.setAttribute("name", "answer");
    buttonInput.setAttribute("value", quizBank[questionCounter].answers[i]);
    buttonInput.setAttribute("id", "radioId");
    let label = document.createElement("label");
    label.setAttribute("for", "radioId");
    label.innerHTML = quizBank[questionCounter].answers[i];
    choiceDisplay.appendChild(buttonInput);
    choiceDisplay.appendChild(label);
  }
  let submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submitId");
  choiceDisplay.appendChild(submitButton);
  submitButton.addEventListener("click", function () {
    let answers = document.getElementsByName("answer");
    answers.forEach(function (answer) {
      if (answer.checked == true) {
        userSelection = answer.value;
        checkAnswers();
      }
    });
  });
}

// checkAnswers function: Answer submission check

function checkAnswers() {
  if (userSelection == quizBank[questionCounter].correctAnswer) {
    score++;
    secondsLeft += 10;
  } else {
    secondsLeft -= 10;
  }
  questionCounter++;
  showQuestions();
}

// End Quiz function: This function controls the handling of end of quiz and prompts users to save their initials and score to local storage - referenced in Leaderboard button

function endQuiz() {
  clearInterval(timerInterval);
  title.innerText = "Thanks for playing!";
  choiceDisplay.innerText = "";
  showMenu();
  highScore = score + secondsLeft;
  questionDisplay.innerHTML =
    "You got " +
    score +
    " out of " +
    quizBank.length +
    " right with a remaining time of " +
    secondsLeft +
    " for a final score of: " +
    highScore;
  userInitials = prompt("Enter your initials: ");
  localStorage.setItem("Username", userInitials);
  localStorage.setItem("Highscore", highScore);
}

// Timer Functions and Logic:
// Start Timer Function: Displays timer, initiates countdown from global variable

function startTimer() {
  timerInterval = setInterval(function () {
    title.innerText = "Remaining Time: " + secondsLeft;
    secondsLeft -= 1;
    title.innerText = "Remaining Time: " + secondsLeft;
    if (secondsLeft <= 10) {
      title.setAttribute("class", "final-countdown");
    }
    if (secondsLeft <= 0) {
      title.innerText = "Game Over";
      endQuiz();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}
