/*----- constants -----*/
const gameRows = Array(10).fill([]);
const gameBoard = Array(10).fill(gameRows);


console.log(gameBoard);
const gamePiece = {
    bomb: '0',
    flagged: false,
    bombsTouching: '0'
}


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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/*----- app's state (variables) -----*/





// let clickTest = lClick.forEach(function(m,i){
//     m.addEventListener('click', function(){
//         m.style.backgroundColor = 'blue';
//     });
// }); 

/*----- cached element references -----*/





/*----- event listeners -----*/
let lClick = document.querySelectorAll('.game-piece');
let rClick = document.querySelectorAll('.game-piece');
// console.log(lClick);

lClick.forEach(function(m,i){
    m.addEventListener('click', function(){
        leftClick(m)
    });
}); 

rClick.forEach(function(m,i){
    m.addEventListener('contextmenu', function(evt){
        rightClick(m)
        evt.preventDefault();
    });
}); 






/*----- functions -----*/
init();

function init(){
    
}








function leftClick(m){
        console.log(`I'm pressed`);
        console.log(m);
    
        m.style.backgroundColor = 'blue';
    
    }
function rightClick(m){
        console.log(`I'm pressed`);
        console.log(m);
    
        m.style.backgroundColor = 'red';
    
    }