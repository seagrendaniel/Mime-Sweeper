/*----- constants -----*/

const gameBoardLength = 10;
let timer = null;
let bombCount = 0;
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
        for (let j = 0; j < gameBoard.length; j++) {
            let bomb = Math.random() < 0.1;
            var newPiece = new GamePiece(i, j, bomb);
            g[j] = newPiece;
            
            let div = document.createElement(`div`);
            div.setAttribute('class', 'game-piece');
            div.setAttribute('id', `${i}:${j}`);
            if(bomb){ 
                div.setAttribute('class', 'bomb game-piece');
                div.innerHTML = 'O';
            }
            parent.appendChild(div);
        }

    })
    // console.log(gameBoard);
}


function render(){
    
    let bombCounter = document.getElementById('bombs-left');
    gameBoard.forEach(function(n, i){
        gameBoard[i].forEach(function(m, j){
            if(gameBoard[i][j].bomb) {
                bombCount += 1;
            } 
        });
    })
    bombCounter.innerHTML = `${bombCount}`;
}


function getWinner(){
    gameBoard.forEach(function(n,i){
        gameBoard.forEach(function(m,j){
            if(gameBoard[i][j].flagged && gameBoard[i][j].bomb){
                alert('You won!');
            } else if(gameBoard[i][j].clicked && gameBoard[i][j].bomb){
                alert('You lost!');
            }

        });
    });
};








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
    let gamePiece = gameBoard[row][col];
    return gamePiece;
}

function leftClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    console.log(gamePiece);
    let gpDisplay = m.target;
    gamePiece.isClicked();
    gamePiece.getNeighbors(gamePiece.row, gamePiece.col)
    if (gamePiece.clicked){
        if(gamePiece.bomb){
            console.log('this is', gpDisplay);
            // gpDisplay.classList.remove('hidden');
        } else m.target.style.backgroundColor = 'blue';
    } 

    gamePiece.neighbors.forEach(function (n,i){
        var otherPiece = document.getElementById(n);
        if(otherPiece.style.backgroundColor !== 'blue'){
        otherPiece.style.backgroundColor = 'purple';
        }
    });
    getWinner();

}
function rightClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    // let bombCount = parseInt(document.getElementById('bombs-left').innerHTML);
    let totalBombs = bombCount
    let counter = 0
    gamePiece.toggleFlag();
    gameBoard.forEach(function(n, i){
        gameBoard[i].forEach(function(m, j){
            if(m.flagged){
                counter += 1
                console.log(m);
            }
        });
    });
    totalBombs = totalBombs - counter;
    // console.log(totalBombs)
    let bombCounter = document.getElementById('bombs-left');
    // console.log(bombCount);
    bombCounter.innerHTML = `${totalBombs}`;
    
    if(gamePiece.flagged){
        m.target.style.backgroundColor = 'red';
    } else m.target.style.backgroundColor = '#FF8300'

    getWinner();
}
    // render();
    // console.log(gamePiece);


/*----- timer function -----*/

function changeTime() {
    document.getElementById('time-passed').innerHTML = `${++time} sec`;
}


function start() {
    time = 0;
    timer = setInterval(changeTime, 1000);
    render();
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






