<?php
//This File Controls name and score insertion, if player is same as before update if not then add new one 
session_start();
require("db.php");
if (!empty($_GET['name']) && !empty($_GET['score'])) {
  $name = $_GET['name'];
  $score = $_GET['score'];
}
if (empty($_SESSION['ID'])) { //If Id is empty set is to null
  $ID = null;
}
else{
  $ID = $_SESSION['ID']; //Set Same Id As Players
}

if (!empty($name) && !empty($score)) { //Checks if empty or not
  //Check if player exists
  echo "So Far";
  $sql2 = "SELECT * FROM breakout WHERE Name='$name'";
  $stmt2 = $dbh->prepare($sql2);
  $stmt2->execute();
  $result2 = $stmt2->fetchAll();
  echo $ID;
  if (!empty($ID)) { //If Not A New Player, Update Instead
      echo "Update01";

      /*echo $result2[0]->HighScore;
      echo $score;*/
    if ($result2[0]->HighScore < $score) {
      echo "Updatinh";
      $sql3 = "UPDATE breakout SET HighScore='$score'WHERE ID='$ID'" ;
      $stmt3 = $dbh->prepare($sql3);
      $stmt3->execute();
      echo"Updated";
      header("Refresh:0");
    }
    else{
      echo "NO";
    }
  }
    else if($ID == null){
      echo "So Far2";
      //Insert New Player
      $sql = "INSERT INTO breakout (ID,Name,HighScore) VALUES (null,:Name,:HighScore)";
      //No Hackerino
      $stmt= $dbh->prepare($sql);
      $stmt->bindparam(":Name",$name,PDO::PARAM_STR,256);
      $stmt->bindparam(":HighScore",$score,PDO::PARAM_INT);
      $stmt->execute();
      //Get New Players ID
      $sql4 = "SELECT ID FROM breakout WHERE Name='$name' AND HighScore='$score'";
      $stmt4 = $dbh->prepare($sql4);
      $stmt4->execute();
      $result4 = $stmt4->fetchAll();

      foreach ($result4 as $res) {
      $ID = $result4[0]->ID;
      echo $ID;
      }
      $_SESSION['ID'] = $ID; //Add player ID To Session
      $_SESSION['Name'] = $name;
      header("Refresh:0");
    }
  }
session_destroy();

?>
