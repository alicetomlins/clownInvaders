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
          [0,0,0,3,3,3,3,3,3,0,0],
          [0,0,0,3,3,3,3,3,3,0,0],
          [0,0,0,2,2,2,2,2,2,0,0],
          [0,0,0,2,2,2,2,2,2,0,0],
          [0,0,0,1,1,1,1,1,1,0,0],
          [0,0,0,1,1,1,1,1,1,0,0]],
      3:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,1,1,1,1,1,1,1,1,1,0]],
      4:  [[0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0],
          [3,3,3,3,3,3,3,3,3,3,3],
          [2,2,2,2,2,2,2,2,2,2,2],
          [1,1,1,1,1,1,1,1,1,1,1],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,1,1,1,1,1,1,1,1,1,0],
          [0,3,3,3,3,3,3,3,3,3,0],
          [0,2,2,2,2,2,2,2,2,2,0],
          [0,1,1,1,1,1,1,1,1,1,0]] };


// Positions of graphics on the sprite card

  var spriteData = {
    'alien1': { sx: 0,  sy: 0,  w: 23, h: 23, cls: Alien },
    'alien2': { sx: 24,  sy: 0, w: 23, h: 23, cls: Alien },
    'alien3': { sx: 48,  sy: 0, w: 23, h: 23, cls: Alien },
    'player': { sx: 0,  sy: 24, w: 22, h: 22, cls: Player },
    'missile': { sx: 2,  sy: 48, w: 5,  h: 5, cls: Missile }
  }

  
// Start game callback screen - what appears on the start screen - links to engine .js
  function startGame() {
    var screen = new GameScreen("Clown Invaders","Hit Space to Begin Challenge",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
    Game.loop();
  }

// End game callback screen - same as above but when the user dies
  function endGame() {
    var screen = new GameScreen("Game Over, You Lost","Press space to try again!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

// Win screen - what appears when the user wins
  function winGame() {
    var screen = new GameScreen("You Have Completed The Challenge!","Bet You Can't Do It Again! Press space!",
                                 function() {
                                     Game.loadBoard(new GameBoard(1));
                                 });
    Game.loadBoard(screen);
  }

// Attaches audio to functions
    // File names changed to match the ones below
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



