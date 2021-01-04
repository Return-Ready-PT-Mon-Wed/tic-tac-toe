/// <reference path="../typings/globals/jquery/index.d.ts" />

let currentTurn = 'p1';
let totalMoves = 0;

// const $gameSpots = $('.board-btn').toArray();
// console.log( $($gameSpots[3]).html() );


const { $pOneTurnBtn, $pTwoTurnBtn } = startGame();

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
        }
        if(winner == 'O'){
            alert('Player O Wins');
        }

        totalMoves++;
        if(totalMoves == 9){
            alert('Game Over');
        }

    }

});

function isWinner(gameBoard){

    // gameBoard.forEach(gameSpace => {
    //     console.log( $(gameSpace).html() )
    // });

    let j = 0;
    let k = 3;

    // check rows
    for(let i = 0; i < 3; i++){

        let countX = 0; 
        let countO = 0;

        for(; j < k; j++){
            if( $(gameBoard[j]).html() == 'X') { countX++; }
            if( $(gameBoard[j]).html() == 'O') { countO++; }
        }
        console.log('x: ' + countX);
        console.log('o:' + countO);

        if( countX == 3 ) {
            return 'X'; 
        } 
        else if( countO == 3) {
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