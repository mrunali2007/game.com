var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,groundImage;
var spaceship,spaceshipImage,beam,beamImage;
var invisible1,invisible2;
var blastAnimation;
var meteroite,meteoriteImage;

function preload() {
    groundImage = loadImage("space.png");
    spaceshipImage = loadImage("spaceship.png");
    blastImage = loadImage("blast.png");
    meteoriteImage = loadImage("Meteorit.png");
    beamImage = loadImage("beam.png");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
   
    //SPRITES//
    ground = createSprite(680,-500,windowWidth,windowHeight);
    ground.addImage(groundImage);
    ground.scale = 10;
    ground.velocityY = 20;

    spaceship = createSprite(700,540,10,10);
    spaceship.addImage(spaceshipImage);
    spaceship.addImage("blast",blastImage);
    spaceship.scale = 0.5;

    invisible1 = createSprite(10,350,10,1000);
    invisible1.visible = false;

    invisible2 = createSprite(1355,200,10,1000);
    invisible2.visible = false;

   //GROUPS//
    meteroites = new Group();
    beams = new Group();
}

function draw() {
    background("white");

    //*****GAME STATE PLAY*****//

    if(gameState = PLAY){
   
    //MAKING VERTICALLY MOVING GROUND//  
      if(ground.y > 1150){
         ground.y = ground.height/1000;
        }

    //MOVING SPACESHIP IN RIGHT//
        if(keyDown(RIGHT_ARROW)){
         spaceship.position.x = spaceship.position.x + 10;
         }

    //MOVING SPACESHIP IN LEFT//
      if(keyDown(LEFT_ARROW)){
         spaceship.position.x = spaceship.position.x - 10;
         }

    //SHOOTING BEAM//     
         if (keyDown("space")) {
            createBeam();
       }

    //MAKING METEROITE MOVE RANDOMLY//
       select_meteroite = Math.round(random(1,4));
    
       if (World.frameCount % 10 == 0) {
       
       if (select_meteroite == 1) {
           meteroiteMove();
       }
          }

         
    
      //REMOVING METERORITES AFTER COLLIDING WITH BEAMS//
          beams.isTouching(meteroites,removeM);
        //  beams.isTouching(meteroites,removeB); 
        //  if(beams.collide(meteroites)){
         //   meteroite.addImage(blastImage);
           // beams.destroyEach();
         //}
      
         if(spaceship.isTouching(meteroites)){
            spaceship.changeImage("blast",blastImage); 
            spaceship.destroy();
            gameState = END;
            
          }

      spaceship.collide(invisible1);
      spaceship.collide(invisible2);
       
    }
      
      if(gameState == END){
        spaceship.x = 10000000;
        
         spaceship.remove();
        beams.destroyEach();
        
         
        // meteroite.remove(); 
       //  meteroiteRemove()

       if(spaceship.x === 10000000){
       
        
        textSize(100);
        fill("White");
        text("GAME OVER",340, 1000);
        
       }
       ground.velocityY = 0;
      }   

      drawSprites();  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  }

  function createBeam() {
    beam = createSprite(700, 450, 20, 50);
    beam.addImage(beamImage);
    beam.x = spaceship.x;
    beam.y = 450;
    beam.velocityY = -4;
    beam.lifetime = 150;
    beam.scale = 0.05;
    beams.add(beam);
  }

 function meteroiteMove(sprite,meteroite){
    meteroite = createSprite(Math.round(random(50, 1300)),0, 0, 0);
    meteroite.addImage(meteoriteImage);
    meteroite.velocityY = 5;
    meteroite.lifetime = 600;
    meteroite.scale = 0.08;
    meteroites.add(meteroite);
}

  function removeM(sprite,meteroite){
    meteroite.remove();  
  }

 // function removeB(sprites,beam){
//beam.remove();
  //}


  function removeSpaceship(sprite,spaceship){
    tint(255,spaceship.visible = false);
    image(spaceship.image,spaceship.position.x,spaceship.position.y,50,50)
  }