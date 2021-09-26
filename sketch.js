var dog, happyDog, database, foodS, foodStock, dogImg

function preload()
{
 dogImg= loadImage("images/dogImg.png");
 happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);

  database = firebase.database()

  
  dog = createSprite(400, 350);
  dog.addImage(dogImg);
  dog.scale= 0.5

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

}


function draw() { 
  background(46, 139, 87);
  
  if(keyDown(UP_ARROW)){
   writeStock(foodS)
   dog.addImage(happyDog)
  }

  drawSprites();
  //add styles here
textSize(20);
fill('white');
stroke('black');
text("The food remaining is "+ foodS,50, 100 )
textSize(15);
text("Use up arrow to feed Mimo milk",50,130 );

}



function readStock(data){
  foodS = data.val()
}

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

