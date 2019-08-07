class GamePiece {
    constructor (row, col, bomb, flagged, clicked, neighbors) {
        this.row = row;
        this.col = col;
        this.bomb = bomb;
        this.flagged = false;
        this.clicked = false;
        this.neighbors = this.getNeighbors(row, col);
       
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
        
        return [`${row-1}:${col-1}`, `${row-1}:${col}`, `${row-1}:${col+1}`,
                     `${row}:${col-1}`, `${row}:${col+1}`,
                     `${row+1}:${col-1}`, `${row+1}:${col}`, `${row+1}:${col+1}`];
    }
}
