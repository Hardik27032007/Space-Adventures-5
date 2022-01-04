var bg_img,bg,player;
var enemy_img,player_img;
var score,score1;
var b1,bulletGroup,enemyGroup;
var shootSound,laser_img;
var score = 0;
var lifeImage;
var life = 185;
var gameState = 1;

function preload(){
  bg_img = loadImage("images/background.jpg");
  player_img = loadImage("images/player.png");
  enemy_img = loadImage("images/spaceship.png");
  shootSound = loadSound("laserSound.mp3");
  laser_img = loadImage("images/laser.png");
  lifeImage = loadImage("images/life.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2-60,height/2-60);
  bg.addImage("background",bg_img);
  bg.scale = 0.25;

  player = createSprite(width/2-250,height/2-100);
  player.addImage("spaceship",player_img);
  player.scale = 0.4;

bulletGroup = new Group();
enemyGroup = new Group();

  edges = createEdgeSprites();

}

function draw() {
  if (gameState === 1) {
    
  
 if (keyDown(UP_ARROW)) {
   player.y = player.y-7;
 }
 if (keyDown(DOWN_ARROW)) {
   player.y = player.y+7;
 }
 if (keyDown(RIGHT_ARROW)) {
   player.x = player.x+7;
 }
 if (keyDown(LEFT_ARROW)) {
   player.x =player.x-7;
 }

 if (keyDown("space")) {
   createBullets(); 
 }

 createEnemy();

if (bulletGroup.isTouching(enemyGroup)) {
  console.log("collided");
  bulletGroup.destroyEach();
  enemyGroup.destroyEach();
  score = score+2;
}

if (player.isTouching(enemyGroup)) {
   life = life-185/4;
   enemyGroup.destroyEach();
}

if (life <= 0 ) {
  gameState = 2;
  gameOver();
   }

 player.bounceOff(edges[0]);
 player.bounceOff(edges[1]);
 player.bounceOff(edges[2]);
 player.bounceOff(edges[3]);

 drawSprites();

 showLife();
 fill("white");
 textSize(20);
 text("Score:" + score,width-200,50);
 
}
  }

function createBullets(){
  var bullet = createSprite(player.x+170,player.y,30,20);
  bullet.velocityX = 8;
  bullet.addImage(laser_img);
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
  shootSound.setVolume(0.3);
  shootSound.play();
}

function createEnemy(){
  if (frameCount % 130 == 0) {
 var enemy = createSprite(width/2+250,height/2-50);
 enemy.y = Math.round(random(width/2+10,height/2-150));
 enemy.x = Math.round(random(width/2+10,height/2-90));
  enemy.addImage("spaceship",enemy_img);
  enemy.scale = 0.5;
  enemy.setCollider("rectangle",0,0,100,260);
  enemyGroup.add(enemy);
  enemy.velocityY = -7;
  }
}

function showLife() {
  push();
  image(lifeImage, width / 2 - 130, height  - 500, 20, 20);
  fill("white");
  rect(width / 2 - 100, height  - 500, 185, 20);
  fill("#f50057");
  rect(width / 2 - 100, height  - 500, life, 20);
  noStroke();
  pop();
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you loose....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}