// Progress Tracking
let lessonCompleted = false;

// Quiz Data
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tabular Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["background-color", "color", "text-color"],
    answer: "color"
  },
  {
    question: "What does JS stand for?",
    options: ["Java Script", "JavaSource", "JustScript"],
    answer: "Java Script"
  }
];

let currentQuestionIndex = 0;
let score = 0;

// Elements
const markCompletedBtn = document.getElementById('markCompletedBtn');
const progressText = document.getElementById('progressText');
const showCertificateBtn = document.getElementById('showCertificateBtn');
const certificate = document.getElementById('certificate');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');

// Mark Lesson as Completed
markCompletedBtn.addEventListener('click', () => {
  lessonCompleted = true;
  updateProgress();
});

// Update Progress
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    let progress = 0;
  
    if (lessonCompleted) progress += 50;
    if (score >= quizQuestions.length) progress += 50;
  
    progressBar.style.width = `${progress}%`;
  
    if (progress === 100) {
      progressText.textContent = "All lessons and quizzes completed!";
      showCertificateBtn.style.display = "block";
    } else if (lessonCompleted) {
      progressText.textContent = "Lesson completed. Please complete the quiz.";
    } else {
      progressText.textContent = "Complete the lesson and quiz to earn your certificate.";
    }
  }
  


// Display Quiz Questions
function loadQuestion() {
  let currentQ = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQ.question;
  optionsEl.innerHTML = '';
  currentQ.options.forEach(option => {
    let div = document.createElement('div');
    div.classList.add('option');
    div.textContent = option;
    div.addEventListener('click', () => selectOption(option));
    optionsEl.appendChild(div);
  });
}

// Option Selected
function selectOption(selected) {
  let correctAnswer = quizQuestions[currentQuestionIndex].answer;
  if (selected === correctAnswer) {
    score++;
  }
  nextBtn.style.display = "block";
}

// Next Button
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    quizCompleted();
  }
});

// Quiz Completed
function quizCompleted() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = `Your Score: ${score} / ${quizQuestions.length}`;
  nextBtn.style.display = "none";
  updateProgress();
}

// Show Certificate
showCertificateBtn.addEventListener('click', () => {
  certificate.style.display = "block";
});

// Start Quiz
loadQuestion();
