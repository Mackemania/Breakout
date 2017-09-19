//Prepare  For Insert  Into Database
function InsertHighscore(name,score)
{
  alert(name);
  if (name && score)
  {

    if (window.XMLHttpRequest)
      {
        xmlhttp = new XMLHttpRequest();
    }
    else
    {
      xmlhttp = new ActiveXObject("Microsoft.xmlhttp");
    }
    //Ajax Request Function
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
      {
        alert("Added To HighScore");
      }
    };
    //Open next page and send name and score
    xmlhttp.open("GET","Highscore/insertHS.php?name="+name+"&score="+score,true);
    xmlhttp.send("name=" + name + "&score=" + score);
  }
};//Add New HighScore
