// Declaring global variables

const instructionsButton = document.getElementById("instructions");
const startButton = document.getElementById("start");
const leaderBoardButton = document.getElementById("leaderboard");
const questionDisplay = document.getElementById("question-display");
let questionCounter = 0;
let questionBank = [];
const choiceDisplay = document.getElementById("choice-display");
let answerBank = "";
let answerCheck = "";
let userSelection = "";
let userInitials = "";
let score = 0;
let highScore = 0;
let secondsLeft = 56;
const title = document.getElementById("title");
let totalQuestionCount = "";
let timerInterval = "";

// Array containing all questions with their corresponding answers and correct answer

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
  {
    question: 'Who said: "Scars on the back are a swordsman\'s shame"?',
    answers: [
      "Dracule Mihawk",
      "Roronoa Zoro",
      "Trafalgar D. Water Law",
      "Axe-Hand Morgan",
    ],
    correctAnswer: "Roronoa Zoro",
  },
  {
    question:
      "Luffy was faced with anger from which crew member when he made his annoucement about parting with the Going Merry",
    answers: ["Chopper", "Sanji", "Nami", "Usopp"],
    correctAnswer: "Usopp",
  },
  {
    question: '"Iron Pirate" Franky had the original name of what?',
    answers: ["Pandaman", "Mountain Ricky", "Cutty Flam", "Iceberg"],
    correctAnswer: "Cutty Flam",
  },
  {
    question:
      "Who assisted Straw Hat Luffy in infiltrating the underwater prison Impel Down?",
    answers: [
      "Boa Hancock",
      "Silvers Raleigh",
      "Donquiote Doflamingo",
      "Kizaru",
    ],
    correctAnswer: "Boa Hancock",
  },
  {
    question:
      'Pirate "Fire-Fist" Ace is the commander of which division of the Whitebeard Pirates?',
    answers: ["1st", "2nd", "3rd", "4th"],
    correctAnswer: "2nd",
  },
  {
    question: "In the anime, Gol D. Roger was executed in which way?",
    answers: [
      "Stabbed with two spears",
      "Hung from the gallows",
      "Walked a plank",
      "Decapitated",
    ],
    correctAnswer: "Stabbed with two spears",
  },
  {
    question:
      "Which member of the Straw Hat Pirates was the only one to have their bounty picture drawn?",
    answers: ["Zoro", "Robin", "Brook", "Sanji"],
    correctAnswer: "Sanji",
  },
];

// Instructions Button on-click event listener: Displays quiz instructions to the user

instructionsButton.addEventListener("click", function () {
  title.innerText = "Instructions:";
  questionDisplay.innerHTML =
    "For every question you get right, you get +1 point and increase the timer by +10 seconds. If you answer wrong, the timer is decreased by 10 seconds." +
    "<br />" +
    "<br />" +
    "At the end of the quiz, the remaining time is added with your answer score to give your final score.";
});

// Start Quiz Button on-click event listener: This starts the quiz by calling one function to run multiple functions.

startButton.addEventListener("click", function () {
  startQuiz();
});

// Leaderboards Button on-click event listener: Displays user's highscore stored in Chrome local storage in the question-display

leaderBoardButton.addEventListener("click", function () {
  title.innerText = "Leaderboard:";
  choiceDisplay.innerText = "";
  if (userInitials != "") {
    questionDisplay.innerText =
      "The high score belongs to: " + userInitials + "" + highScore;
  } else {
    questionDisplay.innerText =
      "No high score recorded yet. Click Start Quiz and give it your all!";
  }
});

// These functions make up the abstract steps of the quiz

function startQuiz() {
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

// Show Questions function: Displays questions on the document

function showQuestions() {
  if (quizBank.length == questionCounter) {
    endQuiz();
  } else {
    questionDisplay.innerText = quizBank[questionCounter].question;
    showAnswers();
  }
}

// Show Answers function: Displays answer choices and answer submit button

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

// Choice Display on Click event listener: After the user locks in their choice, we check for right/wrong and adjust score accordingly

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
  showMenu();
  highScore = score + secondsLeft;
  questionDisplay.innerHTML =
    "You got " +
    score +
    " out of " +
    quizBank.length +
    " right for a final score of: " +
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
