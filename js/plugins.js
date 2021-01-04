/// <reference path="../typings/globals/jquery/index.d.ts" />

// Global variables
let currentTurn = 'pX';
let totalMoves = 0;
let $playerXScore = 0;
let $playerOScore = 0;

// Setting start of first game
$('#playerXScore').text($playerXScore);
$('#playerOScore').text($playerOScore);
const { $pOneTurnBtn, $pTwoTurnBtn } = startGame();

// Event listener for new game button
$("#newGameBtn").on('click', () => {
    newGame();
});

function newGame() {
    {
        currentTurn = 'pX';
        totalMoves = 0;

        $gameSpots = $('.board-btn').toArray();
        $gameSpots.forEach(spot => {
            $(spot).html('-');
            if ($(spot).hasClass('orange')) {
                $(spot).removeClass('orange');
            }
            if ($(spot).hasClass('blue')) {
                $(spot).removeClass('blue');
            }
        });

        $($pOneTurnBtn).removeClass('red');
        $($pOneTurnBtn).addClass('green');
        $($pOneTurnBtn).html('Your Turn');

        $($pTwoTurnBtn).removeClass('green');
        $($pTwoTurnBtn).addClass('red');
        $($pTwoTurnBtn).html('Waiting');
    }
}

// Event listener for each game space
$(".board-btn").on('click', (event) => {
    const thisSquare = event.target;

    // Do not allow selected square to be selected again
    if (!$(thisSquare).hasClass('orange') && !$(thisSquare).hasClass('blue')) {
        
        // Change square color based on current player move
        if (currentTurn == 'pX') {
            OrangeMoved(thisSquare);
        }
        else {
            BlueMoved(thisSquare);
        }

        // Check is there is a winner, if so start new game with reset board
        checkForWinner();
    }

});

function checkForWinner() {
    const $gameSpots = $('.board-btn').toArray();
    const winner = isWinner($gameSpots);
    if (winner == 'X') {
        alert('Player X Wins');
        $playerXScore++;
        $('#playerXScore').text($playerXScore);
        newGame();
    }
    else if (winner == 'O') {
        alert('Player O Wins');
        $playerOScore++;
        $('#playerOScore').text($playerOScore);
        newGame();
    }
    else {
        totalMoves++;
        if (totalMoves == 9) {
            alert(`Game over, it's at tie`);
        }
    }
}

function isWinner(gameBoard) {

    // gameBoard.forEach(gameSpace => {
    //     console.log( $(gameSpace).html() )
    // });

    // check rows
    const isRowWinner = checkRowWinner(gameBoard);
    if (isRowWinner == 'X' || isRowWinner == 'O') {
        return isRowWinner;
    }

    // check columns
    const isColumnWinner = checkColumnWinner(gameBoard);
    if (isColumnWinner == 'X' || isColumnWinner == 'O') {
        return isColumnWinner;
    }

    // check diagonal
    const isDiagonalWinner = checkDiagonalWinner(gameBoard, 2, 7, 2);
    if (isDiagonalWinner == 'X' || isDiagonalWinner == 'O') {
        return isDiagonalWinner;
    }

    const isDiagonalWinnerTwo = checkDiagonalWinner(gameBoard, 0, 9, 4);
    if (isDiagonalWinnerTwo == 'X' || isDiagonalWinnerTwo == 'O') {
        return isDiagonalWinnerTwo;
    }

}

function checkDiagonalWinner(gameBoard, start, max, increment) {
    let countX = 0;
    let countO = 0;

    for (let i = start; i < max; i += increment) {
        if ($(gameBoard[i]).html() == 'X') { countX++; }
        if ($(gameBoard[i]).html() == 'O') { countO++; }
    }

    // console.log('x: ' + countX);
    // console.log('o:' + countO);

    if (countX == 3) {
        return 'X';
    }
    else if (countO == 3) {
        return 'O';
    }
    else {
        countX = 0;
        countO = 0;
    }
}

function checkColumnWinner(gameBoard) {

    for (let i = 0; i < 3; i++) {

        let countX = 0;
        let countO = 0;

        for (let j = i; j < 9; j += 3) {
            if ($(gameBoard[j]).html() == 'X') { countX++; }
            if ($(gameBoard[j]).html() == 'O') { countO++; }
        }

        // console.log('x: ' + countX);
        // console.log('o:' + countO);

        if (countX == 3) {
            return 'X';
        }
        else if (countO == 3) {
            return 'O';
        }
        else {
            countX = 0;
            countO = 0;
        }

    }

}

function checkRowWinner(gameBoard) {
    let j = 0;
    let k = 3;
    for (let i = 0; i < 3; i++) {

        let countX = 0;
        let countO = 0;

        for (; j < k; j++) {
            if ($(gameBoard[j]).html() == 'X') { countX++; }
            if ($(gameBoard[j]).html() == 'O') { countO++; }
        }

        // console.log('x: ' + countX);
        // console.log('o:' + countO);

        if (countX == 3) {
            return 'X';
        }
        else if (countO == 3) {
            return 'O';
        }
        else {
            countX = 0;
            countO = 0;
            k += 3;
        }

    }
}

function startGame() {
    const $pOneTurnBtn = $('#pOneTurnBtn');
    $pOneTurnBtn.addClass('green');
    $pOneTurnBtn.html('Your Turn');

    const $pTwoTurnBtn = $('#pTwoTurnBtn');
    $pTwoTurnBtn.addClass('red');
    $pTwoTurnBtn.html('Waiting');
    return { $pOneTurnBtn, $pTwoTurnBtn };
}

function OrangeMoved(thisSquare) {
    $(thisSquare).html('X');
    $($pOneTurnBtn).removeClass('green');
    $($pOneTurnBtn).addClass('red');
    $($pOneTurnBtn).html('Waiting');

    $($pTwoTurnBtn).removeClass('red');
    $($pTwoTurnBtn).addClass('green');
    $($pTwoTurnBtn).html('Your Turn');

    $(thisSquare).toggleClass('orange');
    currentTurn = 'pO';
}

function BlueMoved(thisSquare) {
    $(thisSquare).html('O');
    $($pOneTurnBtn).removeClass('red');
    $($pOneTurnBtn).addClass('green');
    $($pOneTurnBtn).html('Your Turn');

    $($pTwoTurnBtn).removeClass('green');
    $($pTwoTurnBtn).addClass('red');
    $($pTwoTurnBtn).html('Waiting');

    $(thisSquare).toggleClass('blue');
    currentTurn = 'pX';
}