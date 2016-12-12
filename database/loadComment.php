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
  $coverID = $_POST['coverID'];

  $query = "SELECT users.username, users.userID, users.email, users.profileImg, comments.commentID, comments.content, comments.postdate
            FROM users
            INNER JOIN comments
            ON users.userID = comments.userID
            WHERE comments.coverID = '". $coverID ."'";
  $result = $conn->query($query);

  $user_comments = array();
  while ($row = $result->fetch_assoc()) {
    $user_comment = array("commentID" => $row{'commentID'}, "userID" => $row{'userID'},
                     "username" => $row{'username'}, "content" => $row{'content'},
                     "postdate" => $row{'postdate'}, "email" => $row{'email'}, "profileImg" => $row{'profileImg'});

    array_push($user_comments, $user_comment);
  }
  echo json_encode($user_comments);
  $conn->close();
?>
