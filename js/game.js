// ALIENS; 

    // Sets speed of missiles 
var AlienFlock = function AlienFlock() {
  this.invulnrable = true;
  this.dx = 10; this.dy = 0;
  this.hit = 1; this.lastHit = 0;
  this.speed = 10;

  this.draw = function() {};

    // If there is a next level then load if, if not show the win screen.
  this.die = function() {
    if(Game.board.nextLevel()) {
      Game.loadBoard(new GameBoard(Game.board.nextLevel())); 
    } else {
      Game.callbacks['win']();
    }
  }
  

//   ASK
  
  this.step = function(dt) { 
    if(this.hit && this.hit != this.lastHit) {
      this.lastHit = this.hit;
      this.dy = this.speed;
    } else {
      this.dy=0;
    }
    this.dx = this.speed * this.hit;

    var max = {}, cnt = 0;
    this.board.iterate(function() {
      if(this instanceof Alien)  {
        if(!max[this.x] || this.y > max[this.x]) {
          max[this.x] = this.y; 
        }
        cnt++;
      } 
    });

    if(cnt == 0) { this.die(); } 

    this.max_y = max;
    return true;
  };

}

// Sets position and information on each alien.

var Alien = function Alien(opts) {
  this.flock = opts['flock'];
  this.frame = 0;
  this.mx = 0;
}

    // Draws alien from sprite card
Alien.prototype.draw = function(canvas) {
  Sprites.draw(canvas,this.name,this.x,this.y,this.frame);
}

    // Play dying sound when alien is hit by user and remove specific alien from game
Alien.prototype.die = function() {
  GameAudio.play('die');
  this.flock.speed += 1;
  this.board.remove(this);
  playerScore++;
  
}

// ASK

Alien.prototype.step = function(dt) {
  this.mx += dt * this.flock.dx;
  this.y += this.flock.dy;
  if(Math.abs(this.mx) > 10) {
    if(this.y == this.flock.max_y[this.x]) {
      this.fireSometimes();
    }
    this.x += this.mx;
    this.mx = 0;
    this.frame = (this.frame+1) % 1;
    if(this.x > Game.width - Sprites.map.alien1.w * 2) this.flock.hit = -1;
    if(this.x < Sprites.map.alien1.w) this.flock.hit = 1;
  }
     
  return true;
}
    // Sets missile firing to random timing by aliens.
Alien.prototype.fireSometimes = function() {
      if(Math.random()*100 < 5) {
        this.board.addSprite('missile',this.x + this.w/2 - Sprites.map.missile.w/2,
                                      this.y + this.h, 
                                     { dy: 100 });
      }
}


// PLAYER; Loads graphic from sprite card and sets position on game. 
var Player = function Player(opts) { 
  this.reloading = 0;
}

Player.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'player',this.x,this.y);
}

// Sets what happens when the user dies
Player.prototype.die = function() {
  GameAudio.play('die');
  Game.callbacks['die']();
}


// PLAYER; Explains what happens when left and right arrow keys are pressed - moves player left and right. 
Player.prototype.step = function(dt) {
  if(Game.keys['left']) { this.x -= 100 * dt; }
  if(Game.keys['right']) { this.x += 100 * dt; }

    // Stops moving when they get to the edge of the screen = 0.
  if(this.x < 0) this.x = 0;
  if(this.x > Game.width-this.w) this.x = Game.width-this.w;
    
    // Code below is set for player to move up and down
  if(Game.keys['up']) { this.y -= 100 * dt; }
  if(Game.keys['down']) { this.y += 100 * dt; }

  if(this.y < 0) this.y = 0;
  if(this.y > Game.height-this.h) this.y = Game.height-this.h;


  this.reloading--;
    
    // Sets how many missiles can be fired at once, also adds graphic and sound for missile. Also sets position of graphics on screen - follows user.
  if(Game.keys['fire'] && this.reloading <= 0 && this.board.missiles < 5) {
    GameAudio.play('fire');
    this.board.addSprite('missile',
                          this.x + this.w/2 - Sprites.map.missile.w/2,
                          this.y-this.h,
                          { dy: -100, player: true });
    this.board.missiles++;
    this.reloading = 10;
  }
  return true;
}

playerScore =0; 
scorerInterval = setInterval(function() {
  document.getElementById("score").innerHTML = playerScore;  

    
});


var Missile = function Missile(opts) {
   this.dy = opts.dy;
   this.player = opts.player;
}


// MISSILES; calls graphic from sprite card and tells game where and when to use missiles.

Missile.prototype.draw = function(canvas) {
   Sprites.draw(canvas,'missile',this.x,this.y);
}

Missile.prototype.step = function(dt) {
   this.y += this.dy * dt;
    
    // Tells missiles to dissapear if collided with alien
   var enemy = this.board.collide(this);
   if(enemy) { 
     enemy.die();
     return false;
   }
   return (this.y < 0 || this.y > Game.height) ? false : true;
}

    // What happens if the missile collides with player?
Missile.prototype.die = function() {
  if(this.player) this.board.missiles--;
  if(this.board.missiles < 0) this.board.missiles=0;
   this.board.remove(this);
}

