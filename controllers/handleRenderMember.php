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

  $role = $_POST['role'];
    $result = $conn->query("SELECT username, phone, age, email, userID, role FROM users WHERE role='". $role ."'");
    $members = array();
    while ($row = $result->fetch_assoc()) {
      $member = array("username" => $row{'username'}, "phone" => $row{'phone'}, "age" => $row{'age'},
                      "email" => $row{'email'}, "userID" => $row{'userID'}, "role" => $row{'role'});
      array_push($members, $member);
    }
    echo json_encode($members);

  $conn->close();
 ?>
