<?php
session_start();//Starts a sessions where vars can be saved
//For Insert
if (!empty($_SESSION['ID'])) {
  $_SESSION['ID']; //ID from database, Gets From Insert
}?>

<html>
	<head>
    <title>Atari-Breakout</title>
    <link rel="icon" href="Texture/Favicon/AB.png" type="image/gif" sizes="16x16"></link><!--TabPicture-->
		<link rel="stylesheet" href="Highscore/style.css"> <!--cssFile-->
		<script src="kod.js"></script> <!--Main JS File-->
		<script src="PowerUp/PowerUpController.js"></script> <!--Main PowerUpController File-->
		<script src="LifeSystem/cHeart.js"></script>
		<script src="LifeSystem/LifeSystem.Js"></script>
		<script src="planka.js"></script><!--JS Class For Plank-->
		<script src="ball.js"></script><!--JS Class For Ball-->
		<script src="block.js"></script><!--JS Class For Block-->
		<script src="point.js"></script><!--JS Class For Block-->
		<script src="circle.js"></script><!--JS Class For Block-->
		<script src="Highscore/Top10.Js"></script><!--JS Top10Function For Highscore-->
		<script src="Highscore/InsertHS.Js"></script><!--JS Add New HighScore For Highscore-->
		
	</head>

	<body onload="getScreenSize();Top10Function(this.value);" onresize="">
  <div id="Top10"><b></b></div>
  <canvas id="canvas">
	</canvas>
	<?PHP?>

	</body>
</html>
