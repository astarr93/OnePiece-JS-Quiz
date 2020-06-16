// Declaring global variables to reference throughout the quiz

const startButton = document.getElementById("start");
const leaderBoardButton = document.getElementById("leaderboard");
const questionDisplay = document.getElementById("question-display");
let questionCounter = 0;
let questionBank = [];
const selectionDisplay = document.getElementById("selection-display");
let answerBank = "";
let answerCheck = "";

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
    correctAnswer: "30,000",
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

for (i = 0; i < quizBank.length; i++) {
  questionBank.push(quizBank[i].question);
}

// onclick Commands for Start Button
startButton.addEventListener("click", function () {
  startButton.style.visibility = "hidden";
  leaderBoardButton.style.visibility = "hidden";
  startQuiz();
});

// These functions make up the logic of the quiz

function startQuiz() {
  showQuestions();
  // showAnswers();
  // startTimer();
  // checkAnswers();
  // showResults();
}

function showQuestions() {
  let a = 0;
  questionDisplay.innerText = questionBank[questionCounter];
  console.log(questionBank);
}

// Timer Functions are below

// function time() {
//   secondsLeft--;
//   if (secondsLeft <= 0) {
//     secondsLeft = 0;
//   }
//   startTimer();
// }

// // Start Timer

// function startTimer() {
//   let timerInterval = setInterval(time, 1000);
//   return timerInterval;
// }

// //STOP TIMER FUNCTION
// function stopTimer() {
//   clearInterval(timerReturn);
//   timer.textContent = 0;
// }
