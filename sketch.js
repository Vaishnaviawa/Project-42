//constants
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//variables
var thunder, thunder1,thunder2,thunder3,thunder4;
var batAnimation,bat;
var engine, world;
var umbrella;
var rand;
var thunderCreatedFrame = 0;
var maxDrops = 100;
var drops = [];

function preload(){
    //loading the images and animations
    thunder1 = loadImage("1.png");
    thunder2 = loadImage("2.png");
    thunder3 = loadImage("3.png");
    thunder4 = loadImage("4.png");

    batAnimation = loadAnimation("bat1.png","bat2.png","bat3.png",
                        "bat4.png","bat5.png","bat6.png",
                        "bat7.png","bat8.png","bat9.png",
                        "bat10.png","bat11.png","bat12.png");
   
}

function setup(){
    //creating engine
    engine = Engine.create();
    world = engine.world;

    //creating a canvas
    createCanvas(650, 700);
    
    //creating an object
    umbrella = new Umbrella(200,500);

    //adding the drops to the array
    if(frameCount % 150 === 0){
        for(var i=0; i<maxDrops; i++){
            drops.push(new Drop(random(0,400), random(0,400)));
        }
    }    
}

function draw(){
    //updating the engine
    Engine.update(engine);
    //background is black
    background(0); 

    //creating thunder
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(10,370), random(10,30), 10, 10);
        switch(rand){
            case 1: thunder.addImage(thunder1);
            break;
            case 2: thunder.addImage(thunder2);
            break; 
            case 3: thunder.addImage(thunder3);
            break;
            case 4: thunder.addImage(thunder4);
            break;
            default: break;
        }
        thunder.scale = random(0.3,0.6)
    }

    //creating the flying bats effect
    bat = createSprite(Math.round(random(0,400)),Math.round(random(0,400)));
    bat.addAnimation("moving_bat",batAnimation);
    bat.visible = false;
    if(frameCount % 100 === 0){
        bat.visible = true;
        bat.velocityX = Math.round(random(-4,4));
        bat.velocityY = Math.round(random(-4,4));
        bat.scale=0.4;
    }
    
    //destroying the thunder after a particular frame count
    if(thunderCreatedFrame + 10 === frameCount && thunder){
        thunder.destroy();
    }

    //displaying the man with the umbrella
    umbrella.display();

    //displaying rain drops
    for(var i = 0; i<maxDrops; i++){
        drops[i].display();
        drops[i].changePosition();
    }
   
    //drawing the sprites
    drawSprites();
}