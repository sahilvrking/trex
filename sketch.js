var play = 1
var end = 0
var gs = play



var trex, trex_running;


function preload() {
  trex_running = loadAnimation("trex_1.png", "trex_2.png", "trex_3.png");
  groundImage = loadImage("ground.png");
  cloudImage = loadImage("cloud.png")
  obstacle_coming1 = loadImage("obstacle1.png")
  obstacle_coming2 = loadImage("obstacle2.png") 
  obstacle_coming3 = loadImage("obstacle3.png")
  obstacle_coming4 = loadImage("obstacle4.png")
  graphic = loadImage("backgroundimg.png")
  gameend = loadImage("gameOver.png");
  gamers = loadImage("restart.png");
  jump = loadSound("jump.wav");
  suraj = loadImage("sun.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  trex = createSprite(100, 200, 30, 50);
  ground = createSprite(200, 750, width, 30);
  gameover = createSprite(width/2, height/2, 1, 1);
  restart = createSprite(width/2, height/2, 1, 1);
  sun = createSprite(1000,50,20,20)
  sun.addImage("sun1",suraj)
  trex.scale = 0.1;
  trex.x = 50;
  trex.addAnimation("run", trex_running);
  ground.addImage("road", groundImage);
  gameover.addImage("end", gameend);
  restart.addImage("start", gamers)
  
  ground.velocityX = -4;
  ob = createGroup();
  cb = createGroup();
  trex.setCollider("circle", 0, 0, 40);

  trex.debug = true
}
function draw() {
  background(graphic);

  if (gs === play) {

    if (touches.length >0 || keyDown("space")&& trex.y>=166)  {
     // console.log(trex.y)
     trex.velocityY = -10;
     touches = []
     jump.play();
    }
    trex.velocityY = trex.velocityY + 0.8;
    trex.collide(ground);
    if (ground.x < 0) {
      ground.x = 200;
    }
    spawnCloud();
    spawnObstacles();
    if (ob.isTouching(trex)) {
     
      gs = end;
    }
    gameover.visible = false
    restart.visible = false
    // Collider.visible = false



  }
  else if (gs === end) {
    ground.velocityX = 0;
    trex.velocityY = 0
    ob.setLifetimeEach(-1)
    cb.setLifetimeEach(-1)
    ob.setVelocityXEach(0)
    cb.setVelocityXEach(0)
    gameover.visible = true
    restart.visible = true
    //Collider.visible = true
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();


}

function spawnCloud() {
  if (frameCount % 60 === 0) {
    //console.log(frameCount);
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10, 60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    cloud.lifetime = 300
    cb.add(cloud)
  }
                          
                           
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    //console.log(frameCount);
    obstacle = createSprite(750, height-95, 20, 40);
    
    var rand = Math.round(random(1,4))
    switch(rand){
      case 1 :obstacle.addImage(obstacle_coming1)
      break;
      case 2 :obstacle.addImage(obstacle_coming2)
      break;
      case 3 :obstacle.addImage(obstacle_coming3)
      break;
      case 4 :obstacle.addImage(obstacle_coming4)
      break;default:break
    }
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 300
    ob.add(obstacle)
  }
}

function reset(){
gs = play
restart.visible = false
gameover.visible = false
ob.destroyEach();
cb.destroyEach();

}