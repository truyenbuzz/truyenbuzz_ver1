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
  $userID = $_POST['userID'];
  $coverID = $_POST['coverID'];
  $comment = $_POST['comment'];
  $postDate = $_POST['postDate'];
  $commentID = uniqid();

  $stmt = $conn->prepare("INSERT INTO comments (userID, coverID, content, postdate, commentID) VALUES (?, ?, ?, ?, ?)");
  $stmt->bind_param("sssss", $userID, $coverID, $comment, $postDate, $commentID);
  $stmt->execute();
  $stmt->close();
  echo "insert successfully";
  $conn->close();
?>
