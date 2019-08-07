/*----- constants -----*/

const gameBoardLength = 10;
let timer = null;
let bombCount = 0;
let openPieces;
// let gameBoard = Array(10).fill([]);


/*----- app's state (variables) -----*/
let gameBoard = new Array(10).fill(null).map(e => new Array(10));
let bombArray = new Array(10).fill('').map(e => new Array(10));
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
            let bomb = Math.random() < 0.9;
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
}


function render(){
    
    let gameBoardTotalLen = 0;
    let bombCounter = document.getElementById('bombs-left');
    gameBoard.forEach(function(n, i){
        gameBoard[i].forEach(function(m, j){
            gameBoardTotalLen += 1;
            bombArray[i][j] = gameBoard[i][j];
            if(gameBoard[i][j].bomb){
                bombCount += 1;
            } 
        });
    })
    bombCounter.innerHTML = `${bombCount}`;
    openPieces = gameBoardTotalLen - bombCount;
    // console.log(openPieces);
}


function getWinner(){
    let flaggedArray = new Array(10).fill(null).map(e => new Array(10));
    let clickedArray = new Array(10).fill(null).map(e => new Array(10));
    let totalClicked = 0;

    gameBoard.forEach(function(n,i){
        gameBoard.forEach(function(m,j){
            if(gameBoard[i][j].flagged){
                flaggedArray[i][j] = gameBoard[i][j];
            }
            if(gameBoard[i][j].clicked){
                clickedArray[i][j] = gameBoard[i][j];
                totalClicked += 1;
            } 
    });
});
    console.log(totalClicked);
    for(let i=0; i<bombArray.length; i++){
        for(let k=0; k<gameBoard.length; k++){
            if(bombArray[i][k].clicked && gameBoard[i][k].clicked){
            if(bombArray[i][k].bomb){
                console.log('You Lost!');
            } else if (totalClicked === openPieces) {
                console.log('You won!')
                }
            }
        }
    }   
}








function getNeighborsArray(m) {
    let gamePiece = m;
    console.log('im a game piece', gamePiece);
    let simplifiedArray = [];
    let neighborsArray = [];
    gamePiece.neighbors.forEach(function(n,i){
        simplifiedArray[i] = gamePiece.neighbors[i];
        simplifiedArray[i] = simplifiedArray[i].split(':');
    });
    simplifiedArray.forEach(function(m,i){
        simplifiedArray[i].forEach(function(n,j){
            simplifiedArray[i][j] = parseInt(simplifiedArray[i][j]);
        });
    });
    // simplifiedArray.forEach(function(m,i){
    //     neighborsArray.push(m.filter(function(n,j){
    //         if(n[j] >= 0 && n[j] < gameBoard.length)
    //         return n[j];
    //     }));
    // });
    neighborsArray = simplifiedArray.filter(arr => arr[0] >= 0 && arr[1] >= 0 && arr[0] < gameBoard.length && arr[1] < gameBoard.length)
    console.log(simplifiedArray);
    console.log('final array', neighborsArray);
    return neighborsArray;
}



function getGamePiece(m){
    console.log(m);
    let row = parseInt(m.split(':')[0]);
    let col = parseInt(m.split(':')[1]);
    let gamePiece = gameBoard[row][col];
    return gamePiece;
}

function leftClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    // console.log(gamePiece);
    gamePiece.isClicked();
    let gpDisplay = m.target;
    gamePiece.getNeighbors(gamePiece.row, gamePiece.col)
    if (gamePiece.clicked){
        if(gamePiece.bomb){
            console.log('this is', gpDisplay);
            // gpDisplay.classList.remove('hidden');
        } else m.target.style.backgroundColor = 'blue';
    } 

    getWinner();
    getNeighborsArray(gamePiece);
    gamePiece.neighbors.forEach(function (n,i){
        var otherPiece = document.getElementById(n);
        if(otherPiece.style.backgroundColor !== 'blue'){
        otherPiece.style.backgroundColor = 'purple';
        }
    });

}

function rightClick(m) {
    let gamePiece = getGamePiece(m.target.id);
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





