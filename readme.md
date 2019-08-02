## Psuedocode for Minesweeper

### Initiation 

Populate game board with a 20 x 25 grid of buttons

Each unit square (game piece) will be an object with a class of GamePiece

Bombs will be randomly added to the game board array and the game piece object will be updated accordingly


### User Clicks on Game Piece

First time a user clicks on a square, initiate the game clock.

When a user clicks on a square, check to see if there is a bomb in that square. 

If so, initiate "game over" sequence and ask user if they would like to replay. This game over sequence will diplay all bomb locations as well. 

If not, check to see if there are any bombs touching the clicked square.

If there are bombs, update the square to include the number of bombs touching. 

If there are no bombs touching, update the squares in all directions until squares with bombs next to them are found.  

### User 'Right-Clicks' on Game Piece

Deduct bomb counter by one

Update game piece object with "flag" image

When bomb counter reaches 0, check if game pieces w/ 'flag' property also have 'bomb' property.

If all pieces match bombs to flags, initiate "You Won!" sequence. 