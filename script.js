const wordSpace = document.getElementById("wordSpace");
const typeSpace = document.getElementById("typeSpace");
const startButton = document.getElementById("start");
const result = document.getElementById("result");

typeSpace.addEventListener("paste", (e) => e.preventDefault())

let i = 0;
let prevLength = 0;
let correctChars = 0;
let hasStarted = false;
typeSpace.readOnly = true;
let startTime;
let officialWords;
let spanWrap;
let spanElem;

function wordGenerator(len) {
    const wordList = []
    for (let i = 0; i < len; i++) {
        wordList.push(words[Math.floor(Math.random() * words.length)])
    }

    return wordList.join(" ");
}

function resultShower() {
    let timeElapsed = (Date.now() - startTime) / 1000;
    let res = Math.floor(correctChars * 12 / timeElapsed);
    if (isNaN(res)) res = 0;
    result.style.visibility = "visible";
    result.textContent = res + " WPM";
    startButton.textContent = "START";
    typeSpace.readOnly = true;
}

function handleInput() {
    if (!hasStarted) {
        startTime = Date.now();
        hasStarted = true;
    }

    const typedChar = typeSpace.value;
    if (typedChar.length == officialWords.length) {
        resultShower();
        startButton.onclick = reset;
    }

    if (typedChar.length < prevLength) {
        while (i > typedChar.length) {
            i--;
            spanElem[i].style.backgroundColor = "transparent";
        }
    } else if (spanElem[i].textContent == typedChar[typedChar.length - 1]) {
        spanElem[i].style.backgroundColor = "green";
        correctChars++;
        i++;
    } else if (spanElem[i].textContent != typedChar[typedChar.length - 1]) {
        spanElem[i].style.backgroundColor = "red";
        i++;
    }

    prevLength = typedChar.length;
}

function run() {
    startButton.textContent = "STOP"
    startButton.onclick = () => {
        resultShower();
        startButton.onclick = reset;
    }

    typeSpace.readOnly = false;
    typeSpace.placeholder = "Start typing!"
    typeSpace.focus();
    typeSpace.removeEventListener("input", handleInput);
    typeSpace.addEventListener("input", handleInput);
}

function reset() {
    typeSpace.value = "";
    typeSpace.placeholder = "Press Start"
    result.style.visibility = "hidden";
    correctChars = 0;
    hasStarted = false;
    typeSpace.readOnly = true;
    i = 0;
    prevLength = 0;
    
    init();
    run();
}

function init() {
    officialWords = wordGenerator(50);
    spanWrap = officialWords.split("").map(char => `<span>${char}</span>`).join("");
    wordSpace.innerHTML = spanWrap
    spanElem = document.querySelectorAll("span");
}

let words = []
fetch("words.json")
    .then(Response => Response.json())
    .then(data => {
        words = data;
        init();
    })

startButton.onclick = run;
