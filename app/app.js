var letterBoard = document.getElementById("letter-board");
var letters = document.getElementsByClassName("letter");
var baseAngles = new Array(letters.length).fill(0);

const letterBoardWrap = document.getElementById("letter-board-wrap");
const newGameButton = document.getElementById("new-game-button");
const rotateButton = document.getElementById("rotate-button");
const randomizeButton = document.getElementById("scramble-button");
const alignButton = document.getElementById("align-button");

function getRandomAngle(angles) {
    return angles[Math.floor(Math.random() * angles.length)]
}

function getRandomAngles(n, angleSet) {
    let randomAngles = [];
    for (let i = 0; i <= n; i++) {
        randomAngles.push(getRandomAngle(angleSet))
    }
    return randomAngles
}

const options = {
    duration: 1000,
    fill: 'forwards',
    easing: 'ease-in-out'
};
let angle = 0;
function handleRotate() {
    let keyframes = [
        {transform: `scale(1) rotate(${angle}deg)`},
        {transform: `scale(0.65) rotate(${angle+45}deg)`},
        {transform: `scale(1) rotate(${angle+90}deg)`}
    ]; 
    letterBoard.animate(keyframes, options);
    angle += 90;
    for (let i = 0; i < letters.length; i++) {
        newAngle = baseAngles[i] - angle;
        letters[i].style.transform = `rotate(${newAngle}deg)`;
    }
}

rotateButton.addEventListener("click", handleRotate)

function handleRandomize() {
    baseAngles = getRandomAngles(letters.length, [0, 90, 180, 270])
    for (let i = 0; i < letters.length; i++) {
        let newAngle = baseAngles[i] - angle
        letters[i].style.transform = `rotate(${newAngle}deg)`;
    }
}

randomizeButton.addEventListener("click", handleRandomize)

function handleAlign() {
    baseAngles.fill(0)
    for (let i = 0; i < letters.length; i++) {
        let newAngle = baseAngles[i] - angle
        letters[i].style.transform = `rotate(${newAngle}deg)`;
    }
}

alignButton.addEventListener("click", handleAlign)

function genRandStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str
}

function handleNewGame() {
    let sz = document.querySelector('input[name="board-size"]:checked').value;
    let newChars = genRandStr(sz * sz);
    let newLetterBoard = `<div class="letter-board board-${sz}x${sz}" id="letter-board">\n`;
    for (let i = 0; i < newChars.length; i++) {
        if (newChars[i] === 'q') {
            newLetterBoard += `<div class="letter" data-idx="${i}"><span>qu</span></div>\n`;
        } else {
            newLetterBoard += `<div class="letter" data-idx="${i}"><span>${newChars[i]}</span></div>\n`;
        }
    }
    newLetterBoard += '</div>';
    letterBoardWrap.innerHTML = newLetterBoard;
    letterBoard = document.getElementById("letter-board");
    letters = document.getElementsByClassName("letter");
    baseAngles = new Array(letters.length).fill(0);
    angle = 0;
}

newGameButton.addEventListener("click", handleNewGame)
