var life = 3;
var kill = false;


function LifeSystem() {

    if (life!=-1){
      heart[this.life].dead = true;
      alert(heart[this.life].dead);
      this.life-=1;
      life -= 1;
    }
    else{
      alert("You are dead!!!!!");
    }

//location.reload();
/*Här skall Mikaels kod implementeras.*/
}
