<?php
  $valid_extensions = array('jpeg', 'jpg', 'png');
  $path = "../cover-img/";
  $database_path = "./cover-img/";
  if (isset($_FILES['edit-image'])) {
    $img = $_FILES['edit-image']['name'];
    $tmp = $_FILES['edit-image']['tmp_name'];
    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    $final_image = rand(1000, 1000000).$img;
    if(in_array($ext, $valid_extensions))
    {
      $path = $path.strtolower($final_image);
      $database_path = $database_path.strtolower($final_image);
      if(move_uploaded_file($tmp,$path))
      {

      }
      else {
        echo "invalid file";
        return;
      }
    }
    $username = "root";
    $password = "";
    $hostname = "localhost";
    $selected = "assignment2_ver2";
    $conn = new mysqli($hostname, $username, $password, $selected);
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    mysqli_set_charset($conn,"utf8");
    $id = $_POST['edit-id'];
    $title = $_POST['edit-title'];
    $author = $_POST['edit-author'];
    $genre = $_POST['edit-genre'];
    $intro = $_POST['edit-intro'];
    $status = "Đang cập nhật";
    $source ="webtruyen.vn";
    if($_FILES['edit-image']['name'] == "") {
      $sql = "UPDATE covers SET title = '". $title ."', author = '". $author ."', genre = '". $genre ."',
                                intro = '". $intro ."', status = '". $status ."', source = '". $source ."'
                                WHERE id = '". $id . "'";
    }
    else {
      $sql = "UPDATE covers SET title = '". $title ."', author = '". $author ."', genre = '". $genre ."',
                                intro = '". $intro ."', status = '". $status ."', source = '". $source ."', display_src = '". $database_path ."'
                                WHERE id = '". $id . "'";
    }
    if($conn->query($sql)) {
      echo "edit successfully";
    }
    else {
      echo $conn->error;
    }
    // $stmt = $conn->prepare("UPDATE covers (id, title, author, genre, chapters, status, view, display_src, intro, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    // $stmt->bind_param("ssssssssss", $id, $title, $author, $genre, $chapters, $status, $view, $database_path, $intro, $source);
    // $stmt->execute();
    // $stmt->close();
    $conn->close();
  }
  else {
    echo "invalid file";
  }
?>
