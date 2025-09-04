const letterBoard = document.getElementById("letter-board");
const rotateButton = document.getElementById("rotate-button");
const randomizeButton = document.getElementById("randomize-button");
const alignButton = document.getElementById("align-button");
const letters = document.getElementsByClassName("letter")
let baseAngles = new Array(letters.length).fill(0)

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
