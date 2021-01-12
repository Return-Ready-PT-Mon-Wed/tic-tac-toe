/*----- constants -----*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*----- app's state (variables) -----*/
let board;
let turn = "X";
let win;

/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll("#board div"));
const messages = document.querySelector("h2");

/*----- event listeners -----*/
document.getElementById("board").addEventListener("click", handleTurn);
document.getElementById("reset-button").addEventListener("click", init);

/*----- functions -----*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];

  render();
}
//be sure to call the init function!
init();

// function render() {
//         board.forEach(function(mark, index) {
//         //this sets the text content of the square of the same position to the mark on the board.
//         squares[index].textContent = mark;
//         });
//         };

function render() {
  for (let i = 0; i < board.length; i++) {
    squares[i].textContent = board[i];
  }
  // new code below
  if (win === "T") {
    messages.textContent = `That's a tie, queen!`;
  } else if (win) {
    messages.textContent = `${turn} wins the game!`;
  } else {
    messages.textContent = `It's ${turn}'s turn!`;
  }
}

function handleTurn(event) {
  let idx = squares.findIndex(function (square) {
    return square === event.target;
  });
  // new code below
  board[idx] = turn;

  const playerPositions = getPlayerPosition(turn, board);
  let isWin = playerPositionIncludesWinningCombo(
    playerPositions,
    winningCombos
  );
  let isTie = board.every((cell) => cell !== "") && !win;
  if (win) {
    win = isWin;
  } else if (isTie) {
    win = "T";
  } else {
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  }

  // writing the ternary saved you from all that.
  render();
}

function getPlayerPosition(currentTurn, board) {
  const playerPositions = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] == currentTurn) {
      playerPositions.push(i);
    }
  }
  return playerPositions;
}

function playerPositionIncludesWinningCombo(playerPositions, winningCombos) {
  return winningCombos.some((winningCombo) => {
    const isWin = winningCombo.every((position) =>
      playerPositions.includes(position)
    );
    return isWin;
  });
}
