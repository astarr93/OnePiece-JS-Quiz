//Global Vars

// Question Bank

const questions = [
  {
    question: "Who is the Captain of the Straw Hat Pirates",
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
    question: "What was the name of the devil fruit that Straw Hat Luffy ate",
    answers: [
      "Gomu-Gomu no Mi",
      "Mera Mera no Mi",
      "Ope Ope no Mi",
      "Suna Suna no Mi",
    ],
    correctAnswer: "Gomu-Gomu no Mi",
  },
];

const startButton = document.getElementById("start-Button");
const quizSpace = document.getElementById("quiz-Space");

// When Start Button is clicked
startButton.addEventListener("click", function () {
  startDisplay.style.display = "none";
  startQuiz();
});

function startQuiz() {
  startTimer();
}

// Create Timer

function time() {
  secondsLeft--;
  if (secondsLeft <= 0) {
    secondsLeft = 0;
  }
  startTimer();
}

// Start Timer

function startTimer() {
  let timerInterval = setInterval(time, 1000);
  return timerInterval;
}

//STOP TIMER FUNCTION
function stopTimer() {
  clearInterval(timerReturn);
  timer.textContent = 0;
}
