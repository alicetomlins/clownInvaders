// Positons of aliens in each level
  var levelData = { 
     1:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,3,3,3,3,0,0,0],
          [0,0,0,0,2,2,2,2,0,0,0],
          [0,0,0,0,1,1,1,1,0,0,0]],
      2:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,2,2,2,2,2,2,2,2,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0]] };


// Positions of graphics on the sprite card

  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 23, cls: Alien, frames: 1 },
    'alien2': { sx: 24,  sy: 0, w: 23, h: 23, cls: Alien, frames: 1 },
    'alien3': { sx: 48,  sy: 0, w: 23, h: 23, cls: Alien, frames: 1 },
    'player': { sx: 0,  sy: 24, w: 22, h: 22, cls: Player },
    'missile': { sx: 2,  sy: 48, w: 5,  h: 5, cls: Missile }
  }

  
// Start game callback screen - what appears on the start screen - links to engine .js
  function startGame() {
    var screen = new GameScreen("Clown Invaders","Please press space to begin",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

// End game callback screen - same as above but when the user dies
  function endGame() {
    var screen = new GameScreen("Game Over","Dare to try again? Press space!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

// Win screen - what appears when the user wins
  function winGame() {
    var screen = new GameScreen("You Win!","Want another go? Press space!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

// Attaches audio to functions
  $(function() {
    GameAudio.load({ 'fire' : 'media/laser.ogg', 'die' : 'media/explosion.ogg' }, 
                   function() { 
  
// Initializes code through all documents                        
Game.initialize("#gameboard", levelData, spriteData,
                                      { "start": startGame,
                                        "die"  : endGame,
                                        "win"  : winGame });
                   });
   });



