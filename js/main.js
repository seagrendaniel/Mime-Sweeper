/*----- constants -----*/
const gameRows = Array(10).fill(new GamePiece(0, false, 0));
const gameBoard = Array(10).fill(gameRows);


// console.log(gameBoard);
const gamePiece = {
    bomb: '0',
    flagged: false,
    neighbors: '0'
};


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
}








function leftClick(m) {
    console.log(`I'm pressed`);
    console.log(m);
    
    m.style.backgroundColor = 'blue';
    
}
function rightClick(m) {
    console.log(m.d);
    let selectedPiece = m.id;
    m.style.backgroundColor = 'red';
    let row = +selectedPiece.split(':')[0];
    let col = +selectedPiece.split(':')[1];
    gameBoard[row][col].toggleFlag();
    console.log(gameBoard[row][col]);
    
       
}

/*----- event listeners -----*/
let lClick = document.querySelectorAll('.game-piece');
let rClick = document.querySelectorAll('.game-piece');
// console.log(lClick);

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