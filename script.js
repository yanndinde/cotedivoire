const questions = [
    {q: "Quelle est la capitale de la Côte d'Ivoire ?", a: ["Abidjan", "Yamoussoukro", "Bouaké", "San Pedro"], correct: 1},
    {q: "Quel est l'hymne national ?", a: ["L'Abidjanaise", "La Marseillaise", "God Save the King", "L'Internationale"], correct: 0},
    {q: "Quelle est la couleur du drapeau ivoirien ?", a: ["Vert, jaune, rouge", "Orange, blanc, vert", "Orange, blanc, vert", "Bleu, blanc, rouge"], correct: 1},
    {q: "Quel est l'éléphant célèbre du football ivoirien ?", a: ["Didier Drogba", "Yaya Touré", "Gervinho", "Salomon Kalou"], correct: 0},
    {q: "Quelle est la monnaie officielle ?", a: ["FCFA", "Dollar", "Euro", "CFA"], correct: 0},
    {q: "Quel est le plat traditionnel ?", a: ["Attiéké", "Sushi", "Pizza", "Tacos"], correct: 0},
    {q: "Quel est le plus grand port ?", a: ["San Pedro", "Abidjan", "Yamoussoukro", "Bouaké"], correct: 1},
    {q: "Quel animal symbolise la Côte d'Ivoire ?", a: ["Lion", "Éléphant", "Aigle", "Buffle"], correct: 1},
    {q: "Quelle est la langue officielle ?", a: ["Français", "Anglais", "Espagnol", "Portugais"], correct: 0},
    {q: "Combien de régions en Côte d'Ivoire ?", a: ["14", "31", "19", "5"], correct: 2}
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const loginScreen = document.getElementById("login-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

document.getElementById("start-btn").addEventListener("click", () => {
    const pseudo = document.getElementById("pseudo").value;
    const email = document.getElementById("email").value;
    if(!pseudo || !email) {
        alert("Merci de remplir pseudo et email !");
        return;
    }
    loginScreen.style.display = "none";
    quizScreen.style.display = "block";
    startQuestion();
});

function startQuestion() {
    if(currentQuestion >= questions.length) {
        endQuiz();
        return;
    }
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    questionEl.textContent = questions[currentQuestion].q;
    answersEl.innerHTML = "";
    questions[currentQuestion].a.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.addEventListener("click", () => checkAnswer(index));
        answersEl.appendChild(btn);
    });
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(-1); // temps écoulé
        }
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timer);
    if(index === questions[currentQuestion].correct) score++;
    currentQuestion++;
    startQuestion();
}

function endQuiz() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    scoreEl.textContent = `${score} / ${questions.length}`;
}

document.getElementById("retry-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    resultScreen.style.display = "none";
    loginScreen.style.display = "block";
});
