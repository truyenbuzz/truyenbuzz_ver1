<?php
  //session_start();
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
  $status = "active";
  $query = "SELECT * FROM users WHERE email = '". $name ."' AND pass = '". $pass ."'";
  $result = $conn->query($query);
  if ($result->num_rows == 1) {
    //$conn->query("UPDATE users SET status ='". $status ."' WHERE email = '". $name ."'");
    $row = $result->fetch_assoc();
    $user = array("username" => $row{'username'}, "phone" => $row{'phone'}, "age" => $row{'age'},
                  "email" => $row{'email'}, "pass" => $row{'pass'}, "role" => $row{'role'},
                  "userID" => $row{'userID'} ,"profileImg" => $row{'profileImg'}, /*"status" => "active",*/ "isLogined" => 1);
    //array_push($_SESSION['user'], $user);
    echo json_encode($user);
  }
  else {
    $error = array("isLogined" => 0);
    echo json_encode($error);
  }
  $conn->close();
?>
