function Top10Function()
{
      if (window.XMLHttpRequest)
      {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
      }
      else
      {
          // code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function()
      {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
          {
              document.getElementById("Top10").innerHTML = this.responseText;
          }
      };
      //Opens Highscore page on index
    xmlhttp.open("POST","Highscore/showHS.php",true);
    xmlhttp.send();
};
