// Declaring global variables to reference throughout the quiz

const instructionsButton = document.getElementById("instructions");
const startButton = document.getElementById("start");
const leaderBoardButton = document.getElementById("leaderboard");
const questionDisplay = document.getElementById("question-display");
let questionCounter = 0;
let questionBank = [];
const choiceDisplay = document.getElementById("choice-display");
let answerBank = "";
let answerCheck = 0;
let userSelection = "";
let userName = "";
let score = 0;
let secondsLeft = 56;
const timer = document.getElementById("title");

// Declared array containing all questions with their answers and correct answer.

const quizBank = [
  {
    question: "Who is the Captain of the Straw Hat Pirates?",
    answers: [
      "Monkey D. Luffy",
      "Buggy The Clown",
      "Red-Haired Shanks",
      "Edward D. Teach",
    ],
    correctAnswer: "Monkey D. Luffy",
  },
  {
    question: "What was Straw Hat Luffy's first bounty?",
    answers: ["30,000 Beli", "15,000 Beli", "50,000 Beli", "20,000 Beli"],
    correctAnswer: "30,000 Beli",
  },
  {
    question: "What was the name of the devil fruit that Straw Hat Luffy ate?",
    answers: [
      "Gomu Gomu no Mi",
      "Mera Mera no Mi",
      "Ope Ope no Mi",
      "Suna Suna no Mi",
    ],
    correctAnswer: "Gomu Gomu no Mi",
  },
];

// Instructions Button on-click event listener: Displays instructions in the question-display
instructionsButton.addEventListener("click", function () {
  questionDisplay.innerText = "Instructions:";
  choiceDisplay.innerText =
    "For every question you get right, you get +1 point and increase the timer by +10 seconds. If you answer wrong, the timer is decreased by 10 seconds. At the end of the quiz, the remaining time is added with your answer score to give your final score.";
});

// Start Quiz Button on-click event listener: It starts the quiz
startButton.addEventListener("click", function () {
  startQuiz();
});

// Leaderboards Button on-click event listener: Displays user's highscore stored in Chrome local storage in the question-display
leaderBoardButton.addEventListener("click", function () {
  questionDisplay.innerText = "Your highest score is";
});

// These functions make up the abstract steps of the quiz

function startQuiz() {
  hideMenu();
  showQuestions();
  showAnswers();
  startTimer();
  // checkAnswers();
  // showResults();
}

// Hide Menu function: Hides Leaderboards and Start Quiz Button during quiz

function hideMenu() {
  startButton.style.visibility = "hidden";
  leaderBoardButton.style.visibility = "hidden";
  instructionsButton.style.visibility = "hidden";
}

// Show Menu function: Shows Leaderboards and Start Quiz Button when not taking quiz.

function showMenu() {
  startButton.style.visibility = "display";
  leaderBoardButton.style.visibility = "display";
  instructionsButton.style.visibility = "display";
}

// Show Questions function: Displays questions on the document

function showQuestions() {
  questionDisplay.innerText = quizBank[questionCounter].question;
}

// Show Answers function: Displays radio buttons as possible answer choices corresponding to the question from Quiz Bank.

function showAnswers() {
  choiceDisplay.innerText = "";
  for (let i = 0; i < quizBank[questionCounter].answers.length; i++) {
    let radioId = "answer" + i;
    let radioInput = document.createElement("input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("name", "answer");
    radioInput.setAttribute("value", quizBank[questionCounter].answers[i]);
    radioInput.setAttribute("id", radioId);
    let label = document.createElement("label");
    label.setAttribute("for", radioId);
    label.innerHTML = quizBank[questionCounter].answers[i];
    choiceDisplay.appendChild(radioInput);
    choiceDisplay.appendChild(label);
  }
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  choiceDisplay.appendChild(submit);
}

choiceDisplay.addEventListener("submit", function (event) {
  event.preventDefault();
  for (let i = 0; i < this.elements.length; i++) {
    if (this.elements[i].checked) {
      if (this.elements[i].value === quizBank[questionCounter].correctAnswer) {
        console.log("Correct");
        secondsLeft += 10;
      } else {
        console.log("Wrong");
        secondsLeft -= 10;
      }
    }
  }
  questionCounter++;
  showQuestions();
  showAnswers();
});

// function submitAnswer(answer) {
//   console.log(answer);
// }

function endQuiz() {
  let userInitials = prompt("Enter your name: ");
  localStorage.setItem("Username", "userInitials");
}
// Timer Function: This function shows the timer, initiates a countdown using a global variable, and ends the quiz at 0

function startTimer() {
  let timerInterval = setInterval(function () {
    timer.innerText = "Remaining Time: " + secondsLeft;
    secondsLeft -= 1;
    timer.innerText = "Remaining Time: " + secondsLeft;
    if (secondsLeft <= 10) {
      timer.setAttribute("class", "final-countdown");
    }
    while (secondsLeft <= 0) {
      timer.innerText = "Game Over";
      break;
    }
  }, 1000);
}

// When the timer reaches 0, run endQuiz()

if (secondsLeft <= 0) {
  endQuiz();
}

// Record Results Function: This function prompts users to store their score

function recordResults() {
  userName = prompt("Record your name: ");
  localStorage(userName);
}
