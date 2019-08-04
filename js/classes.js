class GamePiece {
    constructor (bomb, flagged, neighbors) {
        this.bomb = bomb;
        this.flagged = flagged;
        this.neighbors = neighbors;
    }
    toggleFlag(){
        if(this.flagged === false){
            this.flagged = true;
        } else this.flagged = false;
    }
}