// BoggleBoard
class BoggleBoard {

    constructor() {
        this.gameLetters = "";
        this.boardAngle = 0;
        this.letterAngles = new Array(this.gameLetters.length).fill(0);
    }

    newGame = () => {
        let size = document.querySelector('input[name="board-size"]:checked').value;
        this.gameLetters = genRandStr(size * size);

        // Make html for newLetterBoard
        let newLetterBoard = `<div class="letter-board board-${size}x${size}" id="letter-board">\n`;
        for (let i = 0; i < this.gameLetters.length; i++) {
            if (this.gameLetters[i] === 'q') {
                newLetterBoard += `<div class="letter" data-idx="${i}"><span>qu</span></div>\n`;
            } else {
                newLetterBoard += `<div class="letter" data-idx="${i}"><span>${this.gameLetters[i]}</span></div>\n`;
            }
        }
        newLetterBoard += '</div>';

        // Get letterBoardWrap and insert newLetterBoard
        const letterBoardWrap = document.getElementById("letter-board-wrap");
        letterBoardWrap.innerHTML = newLetterBoard;
        this.boardAngle = 0;
        this.letterAngles = new Array(this.gameLetters.length).fill(0);
    }

    rotateBoard = () => {
        // Get letterBoard
        const letterBoard = document.getElementById("letter-board");

        // Animate letterBoard
        if (letterBoard) {
            console.log(`Board angle: ${this.boardAngle}`);
            letterBoard.animate([
                {transform: `scale(1) rotate(${this.boardAngle}deg)`},
                {transform: `scale(0.65) rotate(${this.boardAngle+45}deg)`},
                {transform: `scale(1) rotate(${this.boardAngle+90}deg)`}
            ], {
                duration: 1000,
                fill: 'forwards',
                easing: 'ease-in-out'
            });

            // Update boardAngle in class and rotation of letter elements in document
            this.boardAngle += 90;
            const letters = Array.from(document.getElementsByClassName("letter"));
            for (let i = 0; i < letters.length; i++) {
                let newAngle = this.letterAngles[i] - this.boardAngle;
                letters[i].style.transform = `rotate(${newAngle}deg)`;
            }
        }
    }

    scrambleLetterOrientations = () => {
        const letters = Array.from(document.getElementsByClassName("letter"));
        this.letterAngles = getRandomAngles(letters.length, [0, 90, 180, 270])
        for (let i = 0; i < letters.length; i++) {
            let newAngle = this.letterAngles[i] - this.boardAngle;
            letters[i].style.transform = `rotate(${newAngle}deg)`;
        }
    }

    alignLetterOrientations = () => {
        const letters = Array.from(document.getElementsByClassName("letter"));
        this.letterAngles.fill(0)
        for (let i = 0; i < letters.length; i++) {
            let newAngle = this.letterAngles[i] - this.boardAngle;
            letters[i].style.transform = `rotate(${newAngle}deg)`;
        }
    }
}

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

function genRandStr(len) {
    const chars = 'abcdefghijklmnopqrstuvwxyz'
    let str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str
}


var board = new BoggleBoard();
console.log(`Board angle: ${board.boardAngle}`);

const newGameButton = document.getElementById("new-game-button");
const rotateButton = document.getElementById("rotate-button");
const scrambleButton = document.getElementById("scramble-button");
const alignButton = document.getElementById("align-button");

newGameButton.addEventListener("click", board.newGame);
rotateButton.addEventListener("click", board.rotateBoard);
scrambleButton.addEventListener("click", board.scrambleLetterOrientations);
alignButton.addEventListener("click", board.alignLetterOrientations);

window.onload = function() {
    board.newGame();
}
