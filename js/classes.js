class GamePiece {
    constructor (row, col, bomb, flagged, clicked, neighbors) {
        this.row = row;
        this.col = col;
        this.bomb = bomb;
        this.flagged = false;
        this.clicked = false;
        this.neighbors = [];
        // this.neighbors = [[this[row-1][col-1], this[row-1][col], this[row-1][col+1]],
        // [this[row][col-1], this[row][col+1]],
        // [this[row+1][col-1], this[row+1][col], this[row+1][col+1]]];
    }
    toggleFlag(){
        if(this.flagged === false){
            this.flagged = true;
        } else this.flagged = false;
    }
    isClicked() {
        if(this.clicked === false) {
            this.clicked = true;
        } 
    }
    // getNeighbors(row, col) {
        
    //     neighbors = [[gamePiece[row-1][col-1], gamePiece[row-1][col], gamePiece[row-1][col+1]],
    //                  [gamePiece[row][col-1], gamePiece[row][col+1]],
    //                  [gamePiece[row+1][col-1], gamePiece[row+1][col], gamePiece[row+1][col+1]]];
    //     return neighbors;
    // }
}
