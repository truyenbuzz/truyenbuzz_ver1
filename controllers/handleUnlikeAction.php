<?php
$userID = $_POST['userID'];
$coverID = $_POST['coverID'];
$username = "root";
$password = "";
$hostname = "localhost";
$selected = "assignment2_ver2";
$conn = new mysqli($hostname, $username, $password, $selected);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
mysqli_set_charset($conn,"utf8");
$stmt = $conn->query("DELETE FROM favorites WHERE userID = '".$userID."' AND coverID = '".$coverID."'");
if($stmt)
{
  echo "Xóa thành công";
}
else {
  echo "Xóa thất bại";
}
$conn->close();
?>
