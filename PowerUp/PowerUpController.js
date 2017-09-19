//SpawnZone Attributes
var posX;//Spawnbox posX
var posY;//spawnbox posX
var Width;//Width of spawnbox
var Height; //Height of the spawnbox
var Intervalls;//How Many secs it should wait before spawning again.
//Image Attributes
var imagePosX;//Where the Image IsGoing To Be
var imagePosY;//-:-
var imageWidth;
var imageHeight;
var image; //Picture
var context;
var canvas;
var context;
var canInteract = false;
var debug;
function PowerUp(Width,Height,posX,posY,Intervalls,imgSource,canvas,context){
  this.posX = posX;
  this.posY = posY;
  this.Width = Width;
  this.Height = Height;
  this.Intervalls = Intervalls;
  this.imagePosX = 40;
  this.imagePosY = 40;
  this.canvas = canvas;
  this.context = context;
  this.image = new Image();
  this.image.src = imgSource;
  this.canInteract = canInteract;
  this.imageWidth = 48;
  this.imageHeight = 48;
  this.image.onload = () =>
  {
      this.context = this.canvas.getContext('2d');
      this.context.drawImage(this.image,0,0);
  };
  this.Draw = Draw;
  this.randomPos = randomPos;
}
function Draw(debug){
  this.debug = debug;
  /*
  if (this.canInteract) {
  context.fillStyle = "Yellow";
  context.beginPath();
  context.rect(this.imagePosX, this.imagePosY,this.imageWidth,this.imageHeight);//X,Y,Width,Height
  context.fill();
    if (this.debug) {
      context.fillStyle = "black";
      context.beginPath();
      context.rect(this.imagePosX, this.imagePosY,this.imageWidth,this.imageHeight);//X,Y,Width,Height
      context.fill();
      context.strokeStyle = "Yellow";
      context.beginPath();
      context.strokeRect(this.posX, this.posY, this.canvas.width, this.Height);//X,Y,Width,Height
      context.fill();
    }
  }*/
  if (this.canInteract) {
    this.context.drawImage(this.image,this.imagePosX,this.imagePosY);
  }
}
//Slumps SpawnPos For PowerUp
function randomPos(){
  //this.imagePosX = 133;
  //this.imagePosY = 500;
    if (this.debug) {

    }
    else{
      this.imagePosX = Math.floor((Math.random() * this.canvas.width)+this.posX); //Highest number first
      //console.log("X: "+this.imagePosX);
      this.imagePosY = Math.floor((Math.random() * this.Height)+this.posY); //Highest number first
      //console.log("Y: "+this.imagePosY);
    }

}
