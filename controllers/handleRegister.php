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
  $name = $_POST['name'];
  $pass = $_POST['pass'];
  $email = $_POST['email'];
  $role = "user";
  $userID = uniqid();
  $result = $conn->query("SELECT email FROM users WHERE email = '". $email . "'");
  if ($result->num_rows >= 1) {
    echo "already had";
  }
  else {
    $stmt = $conn->prepare("INSERT INTO users (username, email, pass, role, userID) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $pass, $role, $userID);
    $stmt->execute();
    $stmt->close();
    echo "insert successfully";
  }
  $conn->close();
?>
