const board = document.getElementsByClassName("board");
const p = document.getElementById("turn");
function changePlayer() {
    if (player == orangePlayer) {
        player = bluePlayer;
        p.textContent = "blue's turn";
    } else {
        player = orangePlayer;
        p.textContent = "orange's turn";
    }
}
function calculateWinner(player) {
    let tilesClicked = 0;
    for(let i=0; i<winningCombos.length; i++) {
        for(let j=0; j<player.tiles.length; j++) {
            for(let k=0; k<3; k++) {
                if(player.tiles[j] == winningCombos[i][k]) {
                    tilesClicked++;
                    if(tilesClicked == 3) {
                        return player;
                    }
                }
            }
        }
        tilesClicked = 0;
    }
}
function calculateTie() {
    for (let i=0; i<allTiles.length; i++) {
        if (allTiles[i].className !== "clicked") {
            return false;
        }
    }
    return true;
}
bluePlayer = {
    name: "blue",
    color: "#76aef9",
    tiles: []

}
orangePlayer = {
    name: "orange",
    color: "#feab2a",
    tiles: []
}
let player = bluePlayer;
// change color of tile when clicked
document.addEventListener('click', (event) => {
    if(event.target.className !== "clicked") {
        if(event.target.nodeName == 'SPAN') {
            event.target.className = "clicked";
            event.target.style.backgroundColor = player.color;
            player.tiles.push(event.target);
            if(calculateWinner(player) == player) {
                p.textContent = `${player.name} wins!`;
            }
            else if (calculateTie()){
                p.textContent = "it's a tie.";
            } else {
                changePlayer();
            }
        }
    }  
})
const button = document.createElement('button');
button.style.marginTop = "10px"
const label = document.createTextNode("Reset");
button.appendChild(label);
document.querySelector('body').appendChild(button);
// reset board when button is clicked
button.addEventListener('click', ()=> {
    const tiles = document.querySelectorAll('span');
    for (let i=0; i<tiles.length; i++) {
        tiles[i].className = "";
        tiles[i].style.backgroundColor = "lightgray";
    }
    bluePlayer.tiles = [];
    orangePlayer.tiles = [];
    changePlayer();
})

const winningCombos = [
    //horizontal
    [document.getElementById("space1"), document.getElementById("space2"), document.getElementById("space3")],
    [document.getElementById("space4"), document.getElementById("space5"), document.getElementById("space6")],
    [document.getElementById("space7"), document.getElementById("space8"), document.getElementById("space9")],
    //vertical
    [document.getElementById("space1"), document.getElementById("space4"), document.getElementById("space7")],
    [document.getElementById("space2"), document.getElementById("space5"), document.getElementById("space8")],
    [document.getElementById("space3"), document.getElementById("space6"), document.getElementById("space9")],
    //diagonal
    [document.getElementById("space1"), document.getElementById("space5"), document.getElementById("space9")],
    [document.getElementById("space3"), document.getElementById("space5"), document.getElementById("space7")],
];
const allTiles = [
    document.getElementById("space1"), document.getElementById("space2"), document.getElementById("space3"),
    document.getElementById("space4"), document.getElementById("space5"), document.getElementById("space6"),
    document.getElementById("space7"), document.getElementById("space8"), document.getElementById("space9")
];