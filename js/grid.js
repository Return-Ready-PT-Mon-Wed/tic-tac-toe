const x_class = 'x';
const circle_class = 'circle';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.getElementById('gameBoard');
let circleTurn;
let xTurn;

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true})
    })
    setBoardHoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? circle_class : x_class
    placeMark(cell, currentClass)
    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    cicrleTurn = !circleTurn
}

function setBoardHoverClass() {
    gameBoard.classList.remove(x_class)
    gameBoard.classList.remove(circle_class)
    if (cicrleTurn) {
        gameBoard.classList.add(circle_class)
    } else {
        gameBoard.classList.add(x_class)
    }
}