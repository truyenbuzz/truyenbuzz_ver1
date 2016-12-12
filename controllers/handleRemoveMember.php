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

  $result = $conn->query("DELETE FROM users WHERE userID = '".$id. "'");
  if ($result === TRUE) {
    echo "Record deleted successfully";
  }
  else {
    echo "Error deleting record: " . $conn->error;
  }


$conn->close();
 ?>
