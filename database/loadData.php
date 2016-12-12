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
  $result = $conn->query("SELECT * FROM covers");
  if(isset($_POST['data'])) {
    $covers = array();
    while ($row = $result->fetch_assoc()) {
      $cover = array("id" => $row{'id'}, "title" => $row{'title'}, "author" => $row{'author'},
                     "genre" => $row{'genre'}, "chapters" => $row{'chapters'}, "status" => $row{'status'},
                     "view" => $row{'view'}, "intro" => $row{'intro'}, "display_src" => $row{'display_src'},
                     "source" => $row{'source'});
      array_push($covers, $cover);
    }
    echo json_encode($covers);
  }
  $conn->close();
?>
