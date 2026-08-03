

//questions 

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: "Hyper Text Markup Language"
    },

    {
        question: "Which language is used to style web pages?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        correct: "CSS"
    },

    {
        question: "Which language is used to add interactivity to websites?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: "JavaScript"
    },

    {
        question: "Which CSS property changes the text color?",
        answers: [
            "font-color",
            "text-color",
            "color",
            "text-style"
        ],
        correct: "color"
    },

    {
        question: "Which HTML tag is used to create a link?",
        answers: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: "<a>"
    },

    {
        question: "Which CSS property is used to create a Flexbox layout?",
        answers: [
            "display: flex",
            "position: flex",
            "layout: flex",
            "flex: display"
        ],
        correct: "display: flex"
    },

    {
        question: "What does CSS stand for?",
        answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        correct: "Cascading Style Sheets"
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        answers: [
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>"
        ],
        correct: "<h1>"
    },

    {
        question: "Which JavaScript keyword declares a variable that cannot be reassigned?",
        answers: [
            "let",
            "var",
            "const",
            "static"
        ],
        correct: "const"
    },

    {
        question: "What is Tailwind CSS?",
        answers: [
            "A JavaScript framework",
            "A utility-first CSS framework",
            "A database",
            "A programming language"
        ],
        correct: "A utility-first CSS framework"
    }
];


let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreElement = document.getElementById("score");
const questionNumberElement = document.getElementById("question-number");
const questionsLeftElement = document.getElementById("questions-left");
const progressElement = document.getElementById("progress");

const nextButton = document.getElementById("next");
const backButton = document.getElementById("back");


function showQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    answersElement.innerHTML = "";

    selectedAnswer = null;


    current.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.className =
            "bg-white border-2 border-pink-200 hover:bg-pink-100 hover:border-pink-400 rounded-xl p-5 text-xl text-gray-700 transition";

        button.addEventListener("click", () => {

            selectedAnswer = answer;

            const allButtons = answersElement.querySelectorAll("button");

            allButtons.forEach(btn => {
                btn.classList.remove("bg-pink-300", "border-pink-500");
            });

            button.classList.add("bg-pink-300", "border-pink-500");

        });

        answersElement.appendChild(button);

    });


    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    const questionsLeft = questions.length - currentQuestion - 1;

    questionsLeftElement.textContent =
        `${questionsLeft} Questions left`;


    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressElement.style.width = `${progress}%`;


    if (currentQuestion === 0) {
        backButton.disabled = true;
        backButton.classList.add("opacity-50");
    } else {
        backButton.disabled = false;
        backButton.classList.remove("opacity-50");
    }
}


// Next question
nextButton.addEventListener("click", () => {

    if (selectedAnswer === null) {
        alert("Please choose an answer!");
        return;
    }


    if (selectedAnswer === questions[currentQuestion].correct) {
        score++;
        scoreElement.textContent = score;
    }


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {
    saveScore();
    showResult();
}

});


backButton.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});


function showResult() {

    let message;
    let meme;

    const percentage = (score / questions.length) * 100;

    if (percentage >= 80) {
        message = "Excellent! ";
        meme = "../images/proud.jpg";

    } else if (percentage >= 50) {
        message = "Good job! ";
        meme = "../images/happy.jpg";

    } else {
        message = "Keep practicing! ";
        meme = "../images/";
    }

    document.querySelector(".w-full.max-w-4xl").innerHTML = `

        <div class="bg-pink-50 rounded-3xl p-8 md:p-10 text-center shadow-xl">

            <h1 class="text-5xl font-bold text-gray-800 mb-5">
                Quiz Finished!
            </h1>

            <img 
                src="${meme}" 
                alt="Quiz result meme"
                class="w-64 h-64 object-cover rounded-2xl mx-auto mb-5"
            >

            <p class="text-2xl text-pink-600 font-bold mb-3">
                ${message}
            </p>

            <p class="text-xl text-gray-700 mb-8">
                Your score is ${score} out of ${questions.length}
            </p>

            <button
                onclick="location.reload()"
                class="bg-pink-500 hover:bg-pink-700 text-white font-bold px-8 py-4 rounded-xl text-xl">
                Try Again
            </button>

        </div>

    `;
}

function saveScore() {

    let name = prompt("Enter your name:");

    if (!name) {
        name = "Anonymous";
    }

    let scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({
        name: name,
        score: score,
        total: questions.length
    });

    localStorage.setItem("scores", JSON.stringify(scores));
}

showQuestion();