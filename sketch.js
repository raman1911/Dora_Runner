var dom, domRunning
var backgroundImg, ground, invisibleGround
var obstacle, obstacleImg, OB_Group
var doracake, doracake1Img, DC_Group
var gameover, gameoverImg
var restart, restartImg
var score
var PLAY=2;
var START=1;
var END=0;
var gameState=START;
var life=3


function preload(){

domRunning = loadAnimation("img/dom1.png","img/dom2.png","img/dom3.png","img/dom4.png","img/dom5.png");
backgroundImg = loadImage("img/background.jpg");
doracake1Img = loadImage("img/doracake1.png");
obstacleImg = loadImage("img/obstacle1.png");
gameoverImg = loadImage("img/gameOver.png");
restartImg = loadImage("img/restart.jpeg");
 
}

function setup() {

// to create canvas 
 createCanvas(600, 400);
 
 // to create background sprite and add image
 ground = createSprite(200,200,600,100);
 ground.addImage(backgroundImg);
 ground.scale = 1.8;

 // to create invisible ground
 invisibleGround = createSprite(180,390,600,10);
 invisibleGround.visible = false ;
 
// to create player
 dom = createSprite(100,320,10,100);
 dom.addAnimation("running",domRunning);
 dom.scale = 0.5
 dom.setCollider("rectangle",0,0,23,220);

 // Assigning initial value of score 
 score = 0;

 //Declaring all groups
 OB_Group = new Group();
 DC_Group = new Group();


 //To create gameover sprite
 gameover=createSprite(300,200,10,10);
 gameover.addImage(gameoverImg);
 gameover.scale=0.8;

 //To create restsrt sprite
 restart=createSprite(300,270,10,10);
 restart.addImage(restartImg);
 restart.scale=0.5;

}

function draw() {

 //To assign background
 background("teal");

 //Start state
 if(gameState===START)
 {
   //Bakcground of start state
   background("blue");
   
   //Assigning visibility to all sprites
   ground.visible=false;
   dom.visible=false;
   DC_Group.visible=false;
   OB_Group.visible=false;
   gameover.visible=false;
   restart.visible=false;
   
   //To declare instructions
   textSize(20);
   fill("white");
   text("Read all the instructions before playing the game",80,100);
   text("1.Press Space Key to make jump",50,150);
   text("2.Collect doracake to score the points",50,175);
   text("3.Save the dom from obstacle",50,200);
   text("4.With more score game will be more challenging",50,225);
   text("5.Try to score more and more as you can and share it",50,250);
   textSize(40);
   text("ALL THE BEST!!",130,300);
   
   textSize(28);
   text("Press Enter Key to Start the Game",80,370);
   
   //To start the game when enter key is presses
   if(keyDown("enter"))
   {
     gameState=PLAY; 
   }
 }

 //game state play
else if(gameState===PLAY){

  //Assigning visibility to all sprites
  ground.visible=true;
  dom.visible=true;
  DC_Group.visible=true;
  OB_Group.visible=true;
  gameover.visible=false;
  restart.visible=false;
  
  //to move the background
  if(ground.x<100){
    ground.x = ground.width/2;
    }
    ground.velocityX = -3;
   
  // to make player jump
    if(keyDown("space")&& dom.y>=300){
     dom.velocityY = -13;
    }
    dom.velocityY = dom.velocityY+0.9;
    dom.collide(invisibleGround);

   //Calling other functions in draw function
  spwanDoracake();
  spwanObstacle();

    //To increase the score when player collects doracake
    for (var i = 0; i < DC_Group.length; i++) {
      if(DC_Group.get(i).isTouching(dom))
      { DC_Group.get(i).remove();
        score=score+1;
        
       }
      }
   // to make game end
   for (var i = 0; i < OB_Group.length; i++) {
    if(OB_Group.get(i).isTouching(dom))
    { OB_Group.get(i).remove();
      life=life-1 ;
     }
    }

if(life===0){
  gameState = END;
}

  }

  //End state
  else if(gameState===END){

   //Assigning visibility to all sprites
   gameover.visible=true;
   restart.visible=true;
   ground.visible=false;
   dom.visible=false;
   //DC_Group.visible=false;
  // OB_Group.visible=false;

   DC_Group.setVelocityXEach(0);
   OB_Group.setVelocityXEach(0);

   DC_Group.setLifetimeEach(1);
   OB_Group.setLifetimeEach(1);

   if(mousePressedOver(restart)){
    reset();
   }

  }
   
  dom.debug = false;

 //to draw the sprites
 drawSprites();

 //Displaying score
 fill("white");
 textSize(20);
 text("Score: "+score,50,50);
 text("Life:"+life,450,50)

}

function spwanDoracake(){
  if(frameCount%250===0){
  var doracake = createSprite(460,370,5,80);
  doracake.velocityX = -5;
  doracake.addImage(doracake1Img);
  doracake.scale = 0.07;
  doracake.x = Math.round(random(590,600));
  doracake.y = Math.round(random(150,250));
  doracake.lifetime = 300;
  DC_Group.add(doracake);
  
  }
}

function spwanObstacle(){
  if(frameCount%210===0){
    var obstacle = createSprite(450,350,10,100);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -5;
    obstacle.scale = 0.3;
    obstacle.x = Math.round(random(570,600));
    obstacle.lifetime = 300;
    OB_Group.add(obstacle);
    obstacle.debug = false;
    obstacle.setCollider("rectangle",0,0,150,150)
    
  }
}

function reset(){

  gameState = START
  score = 0
  gameover.visible = false;
  restart.visible = false;
  OB_Group.destroyEach();
  DC_Group.destroyEach();

}