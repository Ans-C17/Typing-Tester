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

const words = [
    "apple", "banana", "cat", "dog", "elephant", "fish", "grape", "house", "ice", "juice",
    "kite", "lion", "monkey", "nest", "orange", "pig", "queen", "rabbit", "sun", "tree",
    "umbrella", "vase", "whale", "xylophone", "yogurt", "zebra", "air", "ball", "car", "door",
    "egg", "frog", "goat", "hat", "ink", "jar", "key", "leaf", "moon", "net",
    "owl", "pen", "quilt", "ring", "sock", "table", "unit", "van", "wall", "xray",
    "yard", "zip", "ant", "book", "chalk", "dust", "ear", "fan", "gift", "hill",
    "iron", "jam", "king", "lamp", "mat", "nail", "ocean", "pan", "quiet", "road",
    "shoe", "tank", "user", "vine", "watch", "box", "yellow", "zero", "art", "blue",
    "cloud", "drum", "earth", "flag", "gold", "home", "idea", "joke", "kite", "lake",
    "milk", "name", "open", "plane", "queen", "rain", "star", "tent", "up", "voice",
    "win", "axe", "yarn", "zoo", "animal", "baby", "cake", "dance", "energy", "fire",
    "game", "hill", "island", "jungle", "kitten", "lemon", "mountain", "night", "oasis", "park",
    "quietly", "river", "stone", "train", "under", "vacuum", "wave", "xenon", "yardstick", "zone",
    "answer", "basket", "circle", "dollar", "engine", "forest", "garden", "hammer", "index", "jeans",
    "knife", "ladder", "mirror", "needle", "object", "pencil", "question", "rocket", "spoon", "ticket",
    "umbrella", "valley", "window", "xylem", "yawn", "zinc", "alley", "branch", "chain", "depth",
    "elbow", "feather", "glove", "handle", "invite", "jacket", "kit", "limit", "member", "number",
    "orbit", "pocket", "quiet", "report", "shelf", "tower", "use", "visit", "wheel", "exit",
    "yield", "zone", "angle", "beach", "cliff", "desert", "engineer", "fence", "giant", "hook"
];


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


init();
startButton.onclick = run;