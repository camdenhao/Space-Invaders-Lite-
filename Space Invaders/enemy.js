
function Enemy(x, y, cost) { //cost is responsible for typing enemies
  this.cost = cost;
  this.x = x;
  this.y = y;
  this.yspeed = 0;
  this.xspeed = .8;
  if (cost === 1) {
    this.color = color(255, 0, 0);
    this.health = 1;
  }
  else if(cost === 5) {
    this.color = color(102, 0, 0);
    this.health = 3;
  }
  else if(cost === 10){
    this.color = color(0);
    this.health = 4;
  }
  this.show = function() {
    fill(this.color);
    rect(this.x,this.y,50,20);
    if (cost === 5) {
      if (this.health === 2) {
        this.color = color(255, 102, 102);
      } else if (this.health === 1) {
        this.color = color(255, 204, 204);
      }
    }
  }
  this.collide = function() {  //collision detection 
    for (var i = 0; i < bullets.length; i++) {
      if (bullets[i].x + 1 > this.x && bullets[i].x  + 1< this.x + 50 && bullets[i].y > this.y && bullets[i].y < this.y + 20) {
        this.health--;
        if(cost === 10){
          this.color = color((4-this.health) * 60);
        }
        bullets.splice(i, 1);
        if (this.health === 0) {
          return true;
        }
      }
    }
  }
  this.update = function() {
    this.y = this.y + this.yspeed;
    this.x = this.x + this.xspeed;
    if (this.y >= 450) {
      console.log(globalHealth);
      this.y = 100;
    }
  }
  this.changeDir = function(){
    this.xspeed = this.xspeed * -1;  
  }

}

function badBullet(x, y){
  this.x = x;
  this.y = y; 
  this.yspeed = 3; 
  this.update = function(){
    this.y = this.y + this.yspeed;
  }
  this.show = function(){
    fill(255, 0, 0);
    rect(this.x - .5, this.y, 1, 30); 
  }

}
