// Declaring global variables to reference throughout the quiz

const startButton = document.getElementById("start");
const leaderBoardButton = document.getElementById("leaderboard");
const questionDisplay = document.getElementById("question-display");
let questionCounter = 0;
let questionBank = [];
const choiceDisplay = document.getElementById("choice-display");
let answerBank = "";
let answerCheck = "";
let userSelection = "";
let score = 0;
let secondsLeft = 10;
const timer = document.getElementsByClassName("timer");

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
      "Gomu-Gomu no Mi",
      "Mera Mera no Mi",
      "Ope Ope no Mi",
      "Suna Suna no Mi",
    ],
    correctAnswer: "Gomu-Gomu no Mi",
  },
];

let questionDiv = document.getElementsByClassName("question-row");
// Now I need to break up the quizBank into separate arrays to reference in functions

// for (i = 0; i < quizBank.length; i++) {
//   questionBank.push(quizBank[i].question);
// }

// onclick Commands for Start Button
startButton.addEventListener("click", function () {
  startButton.style.visibility = "hidden";
  leaderBoardButton.style.visibility = "hidden";
  startQuiz();
});

// These functions make up the logic of the quiz

function startQuiz() {
  showQuestions();
  showAnswers();
  startTimer();
  // checkAnswers();
  // showResults();
}

function showQuestions() {
  questionDisplay.innerText = quizBank[questionCounter].question;
}

function showAnswers() {
  choiceDisplay.innerText = "";
  for (let i = 0; i < quizBank[questionCounter].answers.length; i++) {
    let radioId = "answer" + i;
    let radioInput = document.createElement("input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("name", "answer");
    radioInput.setAttribute("value", quizBank[questionCounter].answers[i]);
    radioInput.setAttribute("id", radioId);
    // radioInput.setAttribute(
    //   "onclick",
    //   "submitAnswer(" + quizBank[questionCounter].answers[i] + ")"
    // );
    let label = document.createElement("label");
    label.setAttribute("for", radioId);
    label.innerHTML = quizBank[questionCounter].answers[i];
    choiceDisplay.appendChild(radioInput);
    choiceDisplay.appendChild(label);
  }
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  choiceDisplay.appendChild(submit);
  // submit.setAttribute("onclick", checkAnswer());
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

function submitAnswer(answer) {
  console.log(answer);
}

// Timer Functions are below

function time() {
  // startTimer();
}

// // Start Timer

function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft -= 1;
    timer.innerHTML = secondsLeft;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  // return timerInterval;
}
