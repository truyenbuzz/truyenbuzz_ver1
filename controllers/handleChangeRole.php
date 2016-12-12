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

$id = $_POST['userID'];
$role = $_POST['role'];

$query = "UPDATE users SET role = '". $role ."' WHERE userID = '". $id ."'";
$result = $conn->query($query);

  if ($result) {
    //echo "Update user role successfully";
    $query1 = "SELECT username, phone, age, email, userID, role FROM users WHERE userID='". $id ."'";
    $sel_result = $conn->query($query1);
    if ($sel_result) {
      $row = $sel_result->fetch_assoc();
      $member = array("username" => $row{'username'}, "phone" => $row{'phone'}, "age" => $row{'age'},
                      "email" => $row{'email'}, "userID" => $row{'userID'}, "role" => $row{'role'});
      echo json_encode($member);
    }
    else {
      echo "Error select user";
    }
  }
  else {
    echo "Error update user role";
  }

?>
