//Create variables here
var dog1, dogHappy;
var dogIMG, dogHappyIMG;
var database, foodS, foodStock;


function preload()
{
dogIMG=loadImage("images/dogImg.png")
dogHappyIMG=loadImage("images/dogImg1.png")

}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog1=createSprite(250,300,150,150); 
  dog1.addImage(dogIMG); 
  dog1.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
}



function draw() {  
background(46,139,87)
  //add styles here


  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog1.addImage(dogHappyIMG);
  }
  drawSprites();
  fill(255,255,254); 
  stroke("black"); 
  text("Food remaining : "+foodS,170,200); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}


//Function to write value in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}

//Function to read values from DB 
function readStock(data){ 
  foodS=data.val();
 }
