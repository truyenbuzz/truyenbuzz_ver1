<?php
$username = "root";
$password = "";
$hostname = "localhost";
$selected = "assignment2_ver2";
$conn = new mysqli($hostname, $username, $password, $selected);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
mysqli_set_charset($conn,"utf8");
$userID = $_POST['id'];
$query = "SELECT covers.id, covers.title, covers.author, covers.genre, covers.chapters,covers.view,covers.intro,covers.display_src, favorites.userID
          FROM covers
          INNER JOIN favorites
          ON favorites.coverID = covers.id
          WHERE favorites.userID = '". $userID ."'";

  $result = $conn->query($query);

  $covers_result = array();

  while ($row = $result->fetch_assoc()) {
    $line_result  = array("title" => $row{'title'}, "author" => $row{'author'},
      "genre" => $row{'genre'}, "chapters" => $row{'chapters'},
      "views" => $row{'view'},"intro" => $row{'intro'},"img_src" => $row{'display_src'},"id" => $row{'id'});
    array_push($covers_result, $line_result);
  }
  echo json_encode($covers_result);
  $conn->close();
?>
