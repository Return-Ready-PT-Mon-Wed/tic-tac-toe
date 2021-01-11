const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
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
const cellElements = document.querySelectorAll('[grid_element]')
const gameBoard = document.getElementById('gameBoard')
const winningMessageElement = document.getElementById('winningMessage')
const playAgainBtn = document.getElementById('playAgainBtn')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

playAgainBtn.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a toe!... get it :)"
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "Player O" : "Player X"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  gameBoard.classList.remove(X_CLASS)
  gameBoard.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    gameBoard.classList.add(CIRCLE_CLASS)
  } else {
    gameBoard.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
