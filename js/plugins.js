/// <reference path="../typings/globals/jquery/index.d.ts" />

let currentTurn = 'p1';
let totalMoves = 0;

let $playerXScore = 0;
let $playerOScore = 0;

$('#playerXScore').text($playerXScore);
$('#playerOScore').text($playerOScore);

const { $pOneTurnBtn, $pTwoTurnBtn } = startGame();

// Event listener for new game button
$("#newGameBtn").on('click', () => {
    currentTurn = 'p1';
    totalMoves = 0;
    
    $gameSpots = $('.board-btn').toArray();
    $gameSpots.forEach(spot => {
        $(spot).html('-');
        if($(spot).hasClass('orange')){
            $(spot).removeClass('orange');
        }
        if($(spot).hasClass('blue')){
            $(spot).removeClass('blue');
        }
    });

    $($pOneTurnBtn).removeClass('red');
    $($pOneTurnBtn).addClass('green');
    $($pOneTurnBtn).html('Your Turn');

    $($pTwoTurnBtn).removeClass('green');
    $($pTwoTurnBtn).addClass('red');
    $($pTwoTurnBtn).html('Waiting');
});

// Event listener for each game space
$(".board-btn").on('click', (event) => {
    const thisSquare = event.target;

    if (!$(thisSquare).hasClass('orange') && !$(thisSquare).hasClass('blue')) {

        if (currentTurn == 'p1') {
            $(thisSquare).toggleClass('orange');
            OrangeMoved(thisSquare);
            currentTurn = 'p2';
        }
        else {
            $(thisSquare).toggleClass('blue');
            BlueMoved(thisSquare);
            currentTurn = 'p1';
        }

        const $gameSpots = $('.board-btn').toArray();
        const winner = isWinner($gameSpots);
        if(winner == 'X'){
            alert('Player X Wins');
            $playerXScore++;
            $('#playerXScore').text($playerXScore);
        }
        else if(winner == 'O'){
            alert('Player O Wins');
            $playerOScore++;
            $('#playerOScore').text($playerOScore);
        }
        else {
            totalMoves++;
            if(totalMoves == 9){
                alert('Game Over');
            }
        }

    }

});

function isWinner(gameBoard){

    // gameBoard.forEach(gameSpace => {
    //     console.log( $(gameSpace).html() )
    // });

    // check rows
    const isRowWinner = checkRowWinner(gameBoard);
    if(isRowWinner == 'X' || isRowWinner == 'O') {
        return isRowWinner;
    }

    // check columns
    const isColumnWinner = checkColumnWinner(gameBoard);
    if(isColumnWinner == 'X' || isColumnWinner == 'O') {
        return isColumnWinner;
    }

    // check diagonal
    const isDiagonalWinner = checkDiagonalWinner(gameBoard, 2, 7, 2);
    if(isDiagonalWinner == 'X' || isDiagonalWinner == 'O') {
        return isDiagonalWinner;
    }

    const isDiagonalWinnerTwo = checkDiagonalWinner(gameBoard, 0, 9, 4);
    if(isDiagonalWinnerTwo == 'X' || isDiagonalWinnerTwo == 'O') {
        return isDiagonalWinnerTwo;
    }


}

function checkDiagonalWinner(gameBoard, start, max, increment) {
    let countX = 0;
    let countO = 0;

    for(let i = start; i < max; i+=increment){
        if ($(gameBoard[i]).html() == 'X') { countX++; }
        if ($(gameBoard[i]).html() == 'O') { countO++; }
    }

    console.log('x: ' + countX);
    console.log('o:' + countO);

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

        for(let j = i; j < 9; j+=3){
            if ($(gameBoard[j]).html() == 'X') { countX++; }
            if ($(gameBoard[j]).html() == 'O') { countO++; }
        }

        console.log('x: ' + countX);
        console.log('o:' + countO);

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
        console.log('x: ' + countX);
        console.log('o:' + countO);

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
}

function BlueMoved(thisSquare) {
    $(thisSquare).html('O');
    $($pOneTurnBtn).removeClass('red');
    $($pOneTurnBtn).addClass('green');
    $($pOneTurnBtn).html('Your Turn');

    $($pTwoTurnBtn).removeClass('green');
    $($pTwoTurnBtn).addClass('red');
    $($pTwoTurnBtn).html('Waiting');
}