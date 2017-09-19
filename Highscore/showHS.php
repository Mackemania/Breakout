<?php
require("db.php");
session_start();
if (!empty($_SESSION['ID'])) {
    $sID = $_SESSION['ID'];
}

//Select top10 players from database
$sql = "SELECT * FROM breakout ORDER BY Highscore DESC LIMIT 10";
$stmt = $dbh->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll();
if (!empty($sID)) {
  $sql2 = "SELECT * FROM breakout WHERE ID = $sID";
  $stmt2 = $dbh->prepare($sql2);
  $stmt2->execute();
  $result2 = $stmt2->fetchAll();
}

?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="Highscore/style.css">
</head>
<body>
  <script>
  </script>
  <!--Shows PersonalScore-->
  <div id="SB">
    <h1>HighScore</h1>
<?php
  echo "<table>
  <tr>
  <th>Name</th>
  <th>Score</th>
  </tr>";
  if (!empty($sID)) {
    if (!empty($result2[0]->Name)) {
    echo "<tr id='PersonalScore'>";
    echo "<td>" . $result2[0]->Name . "</td>";
    echo "<td>" . $result2[0]->HighScore . "</td>";
    echo "</tr>";
    }
}
//Show Top 10 People
  foreach ($result as $res) {
    if (!empty($res)) {
    echo "<tr>";
    echo "<td>" . $res->Name . "</td>";
    echo "<td>" . $res->HighScore . "</td>";
    echo "</tr>";
  }
  }
  echo "</table>";
  ?>
</body>
</html>
  </body>
</html>
