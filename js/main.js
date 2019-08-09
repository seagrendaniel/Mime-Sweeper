/*----- constants -----*/

const gameBoardLength = 10;
let timer = null;
let bombCount = 0;
let openPieces;
const mimeImg = new Image();
mimeImg.src = 'https://i.imgur.com/f4CjPEU.png';
let parent = document.querySelector('.gameboard');
let loseDiv = document.createElement(`div`);
let winDiv = document.createElement(`div`);
const baseTrack = new Audio();
baseTrack.src = 'https://soundimage.org/wp-content/uploads/2018/10/Bells-of-Weirdness_Looping.mp3';
baseTrack.autoplay = true;
baseTrack.loop = true;
baseTrack.load();

const scream = new Audio();



/*----- app's state (variables) -----*/
let gameBoard = new Array(10).fill(null).map(e => new Array(10));
let bombArray = new Array(10).fill('').map(e => new Array(10));

/*----- cached element references -----*/











/*----- functions -----*/
init();

function init() {
    console.log(baseTrack);
    gameBoard.forEach((g, i) => {
        for (let j = 0; j < gameBoard.length; j++) {
            let bomb = Math.random() < 0.15;
            var newPiece = new GamePiece(i, j, bomb);
            g[j] = newPiece;

            let div = document.createElement(`div`);
            div.setAttribute('class', 'game-piece');
            div.setAttribute('id', `${i}:${j}`);
            if (bomb) {
                div.setAttribute('class', 'bomb game-piece');
            }
            parent.appendChild(div);
        }
    })
}


function render() {

    let gameBoardTotalLen = 0;
    let bombCounter = document.getElementById('bombs-left');
    gameBoard.forEach(function (n, i) {
        gameBoard[i].forEach(function (m, j) {
            gameBoardTotalLen += 1;
            bombArray[i][j] = gameBoard[i][j];
            if (gameBoard[i][j].bomb) {
                bombCount += 1;
            }
        });
    })
    bombCounter.innerHTML = `${bombCount}`;
    openPieces = gameBoardTotalLen - bombCount;
    baseTrack.play();
}

/*----- Determine Winner -----*/

function getWinner() {
    let flaggedArray = new Array(10).fill(null).map(e => new Array(10));
    let clickedArray = new Array(10).fill(null).map(e => new Array(10));
    let totalClicked = 0;

    gameBoard.forEach(function (n, i) {
        gameBoard.forEach(function (m, j) {
            if (gameBoard[i][j].flagged) {
                flaggedArray[i][j] = gameBoard[i][j];
            }
            if (gameBoard[i][j].clicked) {
                clickedArray[i][j] = gameBoard[i][j];
                totalClicked += 1;
            }
        });
    });
    console.log(totalClicked);
    for (let i = 0; i < bombArray.length; i++) {
        for (let k = 0; k < gameBoard.length; k++) {
            if (bombArray[i][k].clicked && gameBoard[i][k].clicked) {
                if (bombArray[i][k].bomb) {
                    youLost();
                    return;
                } else if (totalClicked === openPieces) {
                    youWon();
                    return;
                }
            }
        }
    }
}

/*----- Winner/Loser & Reset Functions -----*/

function youWon() {
    let pieces = document.querySelectorAll('.game-piece')
    let resetButton = document.querySelector('.reset-game');
    winDiv.setAttribute(`class`, `winner`);
    winDiv.innerHTML = `You Survived! Ready to try again? Muahahahahaha...`;
    resetButton.style.visibility = 'visible';
    pieces.forEach(p => {
        p.style.display = 'none'
    })
    parent.appendChild(winDiv);
}

function youLost() {
    let pieces = document.querySelectorAll('.game-piece')
    let resetButton = document.querySelector('.reset-game');
    loseDiv.setAttribute(`class`, `loser`);
    let loseDivAction = document.querySelector('body')
    loseDivAction.style.animation = "scare 2s"
    resetButton.style.visibility = 'visible';
    pieces.forEach(p => {
        p.style.display = 'none'
    })
    parent.appendChild(loseDiv);
}

function resetGame() {
    let pieces = document.querySelectorAll('.game-piece');
    if (loseDiv.className === 'loser') {
        parent.removeChild(loseDiv);
    } else if (winDiv.className === 'winner') {
        parent.removeChild(winDiv);
    }


    pieces.forEach(p => {
        parent.removeChild(p);
    });
    bombCount = 0;
    init();
    clearInterval(timer);
    start();
}

/*----- Calculate Game Piece Neighbors -----*/


function getNeighborsArray(m) {
    let gamePiece = m;
    let simplifiedArray = [];
    let neighborArray = [];
    gamePiece.neighbors.forEach(function (n, i) {
        simplifiedArray[i] = gamePiece.neighbors[i];
        simplifiedArray[i] = simplifiedArray[i].split(':');
    });
    simplifiedArray.forEach(function (m, i) {
        simplifiedArray[i].forEach(function (n, j) {
            simplifiedArray[i][j] = parseInt(simplifiedArray[i][j]);
        });
    });
    neighborArray = simplifiedArray.filter(arr => arr[0] >= 0 && arr[1] >= 0 && arr[0] < gameBoard.length && arr[1] < gameBoard.length)
    return neighborArray;
}

function neighborPieceArray(nArr) {
    let nOfN = [];
    let gamePiece;
    for (let i = 0; i < nArr.length; i++) {
        row = nArr[i][0];
        col = nArr[i][1];
        gamePiece = gameBoard[row][col];
        nOfN.push(gamePiece);
    }
    return nOfN;
}

/*----- Get gamePiece Object from Click -----*/

function getGamePiece(m) {
    // console.log(m);
    let row = parseInt(m.split(':')[0]);
    let col = parseInt(m.split(':')[1]);
    let gamePiece = gameBoard[row][col];
    return gamePiece;
}

/*----- Get Div from GamePiece -----*/

function getDivFromPiece(gamePiece) {
    let gpDiv = document.getElementById(`${gamePiece.row}:${gamePiece.col}`);
    return gpDiv;
}

/*----- Calculate Bombs around Clicked Piece and Flood -----*/

function floodBoard(arg, arg2, visitedPieces = {}) {
    let npa = [];
    let bombsAround = 0;
    const key = `${arg.row}:${arg.col}`;

    if (visitedPieces[key]) return;
    visitedPieces[key] = true;


    neighborArray = getNeighborsArray(arg);         // returns array of indices of pieces around arg
    npa = neighborPieceArray(neighborArray);        // returns array of gamePiece objects around arg


    for (let i = 0; i < npa.length; i++) {
        if (npa[i].bomb) {
            bombsAround += 1;
        }
    }

    arg2.innerHTML = bombsAround;
    arg2.style.backgroundColor = 'black';
    arg2.style.color = 'white';

    if (bombsAround === 0) {
        arg2.innerHTML = '';
    }
    


    if (bombsAround === 0) {
        for (let i = 0; i < npa.length; i++) {
            var m = getDivFromPiece(npa[i]);
            floodBoard(npa[i], m, visitedPieces);
        }
    }
}



/*----- Left and Right Click Functions -----*/


function leftClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    gamePiece.isClicked();
    let gpDisplay = m.target;
    if (gamePiece.clicked) {
        if (gamePiece.bomb) {
            gpDisplay.classList.remove('hidden');
        } else m.target.style.backgroundColor = '#59ccf0';
    }

    getWinner();
    floodBoard(gamePiece, m.target);
}




function rightClick(m) {
    let gamePiece = getGamePiece(m.target.id);
    let totalBombs = bombCount
    let counter = 0
    gamePiece.toggleFlag();
    gameBoard.forEach(function (n, i) {
        gameBoard[i].forEach(function (m, j) {
            if (m.flagged) {
                counter += 1
                console.log(m);
            }
        });
    });
    totalBombs = totalBombs - counter;
    let bombCounter = document.getElementById('bombs-left');
    bombCounter.innerHTML = `${totalBombs}`;

    if (gamePiece.flagged) {
        m.target.style.backgroundColor = 'red';
        m.target.textContent = '?';
    } else {
        m.target.style.backgroundColor = '#FF8300';
        m.target.textContent = '';
    }
}


/*----- timer function -----*/

function changeTime() {
    document.getElementById('time-passed').innerHTML = `${++time} sec`;
}


function start() {
    time = 0;
    timer = setInterval(changeTime, 1000);
    // console.log("hithithith")
    lClick.forEach(function (m, i) {
        // console.log(m)
        m.addEventListener('click', function (evt) {
            leftClick(evt);
        });
    });
    
    lClick.forEach(function (m, i) {
        // console.log("hello")
        m.addEventListener('contextmenu', function (evt) {
            evt.preventDefault();
            rightClick(evt)
        });
    });
    render();
}

/*----- event listeners -----*/
let lClick = document.querySelectorAll('.game-piece');
let rClick = document.querySelectorAll('.game-piece');
let startGame = document.querySelector('.play-game');
startGame.addEventListener('click', start);
let resetGameButton = document.querySelector('.reset-game')
resetGameButton.addEventListener('click', resetGame);










