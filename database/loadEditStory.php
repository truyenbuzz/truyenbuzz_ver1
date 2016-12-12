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

  $id = $_POST['id'];
  $result = $conn->query("SELECT * FROM covers WHERE id = '". $id ."'");

  if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $cover = array("id" => $row{'id'}, "title" => $row{'title'}, "author" => $row{'author'}, "genre" => $row{'genre'},
                    "chapters" => $row{'chapters'}, "status" => $row{'status'}, "view" => $row{'view'},
                    "display_src" => $row{'display_src'}, "intro" => $row{'intro'}, "source" => $row{'source'});
    echo json_encode($cover);
  }
  else {
    echo "database error";
  }
  $conn->close();
?>
