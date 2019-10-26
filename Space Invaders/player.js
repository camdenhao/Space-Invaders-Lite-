 
function Player() {
  this.x = 290;
  this.y = 500;
  this.xspeed = 0;
  this.center = 25;
  this.show = function() {
    fill(0, 0, 255);
    image(goodImg, this.x, this.y, goodImg.width/10, goodImg.height/10);
    tint(255,0,0);
  }
  this.update = function() {
    this.x = this.x + this.xspeed;
    this.x = constrain(this.x, 0, width - 50);
    this.center = this.x + 25;
  }
  this.dir = function() {
    if (keyIsDown(LEFT_ARROW)) {
      this.xspeed = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.xspeed = 5;
    } else {
      this.xspeed = 0;
    }
  }
  this.collide = function(){
    for(var i = 0; i < enemyBullets.length; i++){
      if(enemyBullets[i].x > this.x && enemyBullets[i].x < this.x + goodImg.width/10 && enemyBullets[i].y + 30 === this.y){
        enemyBullets.splice(i,1);
        globalHealth--; 
      }
    }
  }
}