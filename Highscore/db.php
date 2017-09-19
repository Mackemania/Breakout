<!--Connects to database for info-->
<?php
$dsn = "mysql:host=localhost;dbname=s1"; //Server Auth
$login = "root";//Username
$password = "";//Password
$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"); //Set Value as UT8 Coding
$dbh = new pdo($dsn,$login,$password,$options); //Establish Con..
$dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
?>
