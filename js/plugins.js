/// <reference path="../typings/globals/jquery/index.d.ts" />

let currentTurn = 'p1';
let totalMoves = 0;
const $gameBoardRows = $('.gameRow');

const $pOneTurnBtn = $('#pOneTurnBtn');
$pOneTurnBtn.addClass('green');
$pOneTurnBtn.html('Your Turn');

const $pTwoTurnBtn = $('#pTwoTurnBtn');
$pTwoTurnBtn.addClass('red');
$pTwoTurnBtn.html('Waiting');

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

        totalMoves++;
        if(totalMoves == 9){
            alert('Game Over');
        }

    }

});


function OrangeMoved(thisSquare) {
    $(thisSquare).html('O');
    $($pOneTurnBtn).removeClass('green');
    $($pOneTurnBtn).addClass('red');
    $($pOneTurnBtn).html('Waiting');

    $($pTwoTurnBtn).removeClass('red');
    $($pTwoTurnBtn).addClass('green');
    $($pTwoTurnBtn).html('Your Turn');
}

function BlueMoved(thisSquare) {
    $(thisSquare).html('X');
    $($pOneTurnBtn).removeClass('red');
    $($pOneTurnBtn).addClass('green');
    $($pOneTurnBtn).html('Your Turn');

    $($pTwoTurnBtn).removeClass('green');
    $($pTwoTurnBtn).addClass('red');
    $($pTwoTurnBtn).html('Waiting');
}