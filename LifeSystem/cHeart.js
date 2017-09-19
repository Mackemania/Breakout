var canvas;
var context;
var image;
var imageWidth;
var x; //X Pos
var y;//Y Pos
var dead;
var positionInArray;

function Heart(positionInArray,imgSource,x,y,canvas,context,totalLives){
  this.dead = false;
  this.canvas = canvas;
  this.context = context;
  this.imgSource = imgSource;
  this.x = x;
  this.y = y;
  this.positionInArray = positionInArray +1;
  this.image = new Image();
  this.image.src = imgSource;
  this.image.onload = () =>
  {
      this.context = this.canvas.getContext('2d');
      this.context.drawImage(this.image,(canvas.width - (62*(totalLives+1))) + (this.positionInArray*62),0);
  };
  this.DrawHeart = DrawHeart;
}
function DrawHeart(){
  if (!this.dead) {

    this.context = this.canvas.getContext('2d');
    this.context.drawImage(this.image,(canvas.width - (65*4)) + (this.positionInArray*62),0);
  }
}
