var player;
var wave;
var globalHealth; //player health
var time; 
var waveCounter;
var goodImg;
var badImg;
var numBullets;
var bulletRate; 
var lost;
let bullets = [];
let enemyBullets = []; 
let enemies = [];
let fired = false;     //booleans responsible for single key presses - prevents holding down key 
let nextWave = false;
let restarted = false; 
let started = false; 
let eightBit; //font
function preload(){
  eightBit = loadFont('PressStart2P.ttf');
}
function setup() {
  numBullets = 1;
  waveCleared = false; 
  textFont(eightBit);
  goodImg = loadImage("good guy.png");
  bulletRate = 180; 
  createCanvas(650, 600);
}

function draw() {
  background(200);
  keyPress();
  if(started === false){
    text("Welcome! Press ENTER to start." , 20, height/2);
    text("SPACE to fire. Arrow keys to move", 20, height/2 + 30);
  }
  else{
  player.update();
  player.show();
  player.dir();
  player.collide();
  text('Wave:' + waveCounter, 10 , 45);
  text('Health:' + globalHealth, 10, 20)
  text('Ammo: ' + numBullets, 10, 70);
  if(frameCount % 60 === 0){      //uses frames for tracking time
    for (var i = 0; i < enemies.length; i++){
      enemies[i].changeDir(); 
    }
    numBullets++;
  }
  if(frameCount % 1000 === 0){
    for (var i = 0; i < enemies.length; i++){
      enemies[i].yspeed = 1; 
      enemies[i].xspeed = 0;
    }
  }
  if((frameCount - 60) % 1000 === 0){
    for (var i = 0; i < enemies.length; i++){
      enemies[i].yspeed = 0; 
      enemies[i].xspeed = -1;
    }
  }
  if(frameCount % (floor(floor(180 / enemies.length)/(.1 * pow(waveCounter,2)))) === 0){  //exponential growth of enemy firing rate
    if(enemies.length > 0){
      var tempPoint = floor(random(enemies.length));
      enemyBullets.push(new badBullet(enemies[tempPoint].x + 25, enemies[tempPoint].y + 20));
    }
  }
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].show();
    enemies[i].update();
    if (enemies[i].collide() === true) {
      tempX = enemies[i].x;
      tempY = enemies[i].y;
      tempCost = enemies[i].cost
      enemies.splice(i, 1);
      if(tempCost === 3){    //type 3 enemies split into 2 type 1 enemies
        enemies.push(new Enemy(tempX, tempY, 1));
        enemies.push(new Enemy(tempX, tempY + 75, 1));
      }
      break;
    }
  }
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].show();
    if (bullets[i].y === 0) {
      bullets.splice(i, 1);
      break;
    }
  }
  for (var i = 0; i < enemyBullets.length; i++){
    enemyBullets[i].update();
    enemyBullets[i].show();
    if(enemyBullets[i].y === height){
      enemyBullets.splice(i,1);
      break;
    }
  }
  if (enemies.length === 0 && replay === true) {
    fill(50);
    textAlign(CENTER, CENTER);
    text('Wave clear! Press ENTER for next wave', width/2,height/2);
    nextWave = false;
    console.log("Now on wave: " + waveCounter);
  }
  if (globalHealth <= 0) {
    for(var i = 0; i < enemies.length; i++){
      enemies.splice(i,0);
      replay = false; 
     }
    fill(50);
    text('You lose! Survived until wave: '+ waveCounter, 75, height/2);
    text('Press Q to restart', 75, height/2 + 30);
    lost = true; 
    }
  }
}



function keyPress() {               
  if (keyCode === 32 && fired === false && numBullets > 0) {
    bullets.push(new Bullet(player.center, player.y));
    numBullets--;
    fired = true;
  }
  if(enemies.length === 0){
    if(keyCode === 13 && nextWave === false && started === true){
      waveCounter++;
      wave = new Wave(waveCounter);
      spawnPoints();
      nextWave = true;
      numBullets = 0;
      for(var i = 0; i < bullets.length; i++){
        bullets.splice(i, 1);
      }
    }
  }
  if(keyCode === 13 && started === false) {
    started = true; 
    console.log(started);
    player = new Player();
    waveCounter = 1;
    globalHealth = 3;
    lost = false; 
    wave = new Wave(waveCounter);
    replay = true;
    spawnPoints();
  }
  if(lost === true && restarted === false){
    if(keyCode === 81){
      for(var i = 0; i < enemies.length; i++){
        enemies.splice(i,1);
      }
      replay = true;
      waveCounter = 1; 
      globalHealth = 3; 
      restarted = true; 
      numBullets = 0;
      wave = new Wave(waveCounter); 
      spawnPoints();
    }
  }
}

function keyReleased() {
  fired = false;
}

function Bullet(x, y) {
  this.x = x;
  this.y = y;
  this.yspeed = -4;
  this.show = function() {
    fill(0, 255, 0);
    rect(this.x, this.y, 2, 20);
  }
  this.update = function() {
    this.y = this.y + this.yspeed;
  }
}



function Wave(x) {  //fills up wave with random assortment of enemies below a total "cost" 
  limit = 9 + floor(.25 * pow(x, 2));  //exponential wave growth
  counter = 0;
  costs = [1,2,3];
  while (counter < limit) { 
   temp = costs[floor(random(3))];
   console.log(temp);
   if(temp + counter <= limit){
    enemies.push(new Enemy(random(570), random(200), temp)); //randomization of each wave 
    counter = counter + temp;
   }
  }
}

function spawnPoints() {   //assigns enemy spawn points in an array
  var enemyIndex = 0;
  for(var i = 0; i < 4; i++){
   for(var j = 0; j < 5; j++){
     if(enemyIndex < enemies.length){
      enemies[enemyIndex].y = 75 * i + 150;
      enemies[enemyIndex].x = 275 + (pow(-1,j) * 50 * (j + 1)); 
      enemyIndex++;
     }
   }
  }
}

