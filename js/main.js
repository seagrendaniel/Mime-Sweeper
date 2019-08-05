/*----- constants -----*/
const gameRows = Array(10).fill(new GamePiece(0, false, 0));
const gameBoard = Array(10).fill(gameRows.slice());




let gameBoardTest = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/*----- app's state (variables) -----*/





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
    for (i = 0; i < gameBoardTest.length; i++) {
        for (let j = 0; j < gameBoardTest[i].length; j++) {
            let div = document.createElement(`div`);
            div.setAttribute('class', 'game-piece');
            div.setAttribute('id', `${i}:${j}`);
            parent.appendChild(div);
        }
    }
    getNeighbors();
}

function placeBomb(){
    
}

function getNeighbors(){
    let gamePiece = getGamePiece(id);
    console.log(gamePiece);
    
}



// arr[i][j-1], arr[i][j+1]
// arr[i+1][j-1], arr[i][j+1], arr[i+1][j]
// arr[i-1][j-1], arr[i-1][j+1], arr[i-1][j]

function getGamePiece(id){
    let row = parseInt(id.split(':')[0]);
    let col = parseInt(id.split(':')[1]);
    let gamePiece = gameBoard[row][col];
    return gamePiece;
}

function leftClick(m) {
    console.log(`I'm pressed`);
    console.log(m);
    
    m.style.backgroundColor = 'blue';
    
}
function rightClick(m) {
    let gamePiece = getGamePiece(m.id);
    gamePiece.toggleFlag();
    console.log(gameBoard[0]);
    if(gamePiece.flagged === true){
        m.style.backgroundColor = 'red';
    } else m.style.backgroundColor = '#FF8300'
    
}

/*----- event listeners -----*/
let lClick = document.querySelectorAll('.game-piece');
let rClick = document.querySelectorAll('.game-piece');


lClick.forEach(function (m, i) {
    m.addEventListener('click', function () {
        leftClick(m)
    });
});

rClick.forEach(function (m, i) {
    m.addEventListener('contextmenu', function (evt) {
        evt.preventDefault();
        rightClick(m)
        // console.log(gamePiece.flagged);
    });
});






