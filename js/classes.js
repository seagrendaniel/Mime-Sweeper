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
    getNeighbors(row, col) {
        
        this.neighbors = [`${row-1}:${col-1}`, `${row-1}:${col}`, `${row-1}:${col+1}`,
                     `${row}:${col-1}`, `${row}:${col+1}`,
                     `${row+1}:${col-1}`, `${row+1}:${col}`, `${row+1}:${col+1}`];
        // this.neighbors.forEach(function(m, i){
        //     this.neighbors = parseInt((this.neighbors).split(':')); 
        // });
        // return neighbors;
    }
}
