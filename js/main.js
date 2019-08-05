/*----- constants -----*/

const gameBoardLength = 10;
const timer = null;
// let gameBoard = Array(10).fill([]);


    /*----- app's state (variables) -----*/
let gameBoard = new Array(10).fill(null).map(e => new Array(10));
// console.log(gameBoard)





// let clickTest = lClick.forEach(function(m,i){
//     m.addEventListener('click', function(){
//         m.style.backgroundColor = 'blue';
//     });
// }); 

/*----- cached element references -----*/











/*----- functions -----*/
init();

function init() {
    let parent = document.querySelector('.gameboard');
    gameBoard.forEach((g, i) => {
        for (var j = 0; j < gameBoard.length; j++) {
            let bomb = Math.random() < 0.3;
            var newPiece = new GamePiece(i, j, bomb);
            g[j] = newPiece;
            
            let div = document.createElement(`div`);
            div.setAttribute('class', 'game-piece');
            div.setAttribute('id', `${i}:${j}`);
            parent.appendChild(div);
        }

    })
    // getNeighbors();
    console.log(gameBoard);
}


function getNeighborsArray(m, row, col) {
    let gamePiece = getGamePiece(m.target.id);
    let simplifiedArray = [];
    gamePiece.isClicked();
    gamePiece.neighbors.forEach(function(n,i){
    simplifiedArray[i] = gamePiece.neighbors[i];
    });
    return simplifiedArray;
}



function getGamePiece(m){
    let row = parseInt(m.split(':')[0]);
    let col = parseInt(m.split(':')[1]);
    // let row = m.row;
    // let col = m.col;
    let gamePiece = gameBoard[row][col];
    return gamePiece;
}

function leftClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    gamePiece.isClicked();
    gamePiece.getNeighbors(gamePiece.row, gamePiece.col)
    if (gamePiece.clicked){
        m.target.style.backgroundColor = 'blue';
    } 

    console.log(gamePiece.neighbors);
    gamePiece.neighbors.forEach(function (n,i){
        console.log(n);
        var otherPiece = document.getElementById(n);
        if(otherPiece.bomb){
            otherPiece.innerHTML = '1'
        }
        if(otherPiece.style.backgroundColor !== 'blue'){
        otherPiece.style.backgroundColor = 'purple';
        }
    });


}
function rightClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    gamePiece.toggleFlag();
    if(gamePiece.flagged){
        m.target.style.backgroundColor = 'red';
    } else m.target.style.backgroundColor = '#FF8300'
    console.log(gamePiece);
}

/*----- timer function -----*/

function changeTime() {
    document.getElementById('timer').innerHTML = `Time Taken <br> ${++time} sec`;
}


function start() {
    time = 0;
    timer = setInterval(changeTime, 1000);
}

/*----- event listeners -----*/
let lClick = document.querySelectorAll('.game-piece');
let rClick = document.querySelectorAll('.game-piece');
let startGame = document.querySelector('.play-game').addEventListener('click', start);


lClick.forEach(function (m, i) {
    m.addEventListener('click', function (evt) {
        leftClick(evt);
    });
});

rClick.forEach(function (m, i) {
    m.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
        rightClick(evt)
    });
});






