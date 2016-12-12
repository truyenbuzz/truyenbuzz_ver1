<?php
  $valid_extensions = array('jpeg', 'jpg', 'png');
  $path = "../cover-img/";
  $database_path = "./cover-img/";
  if (isset($_FILES['image'])) {
    $img = $_FILES['image']['name'];
    $tmp = $_FILES['image']['tmp_name'];
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

    $title = $_POST['up-title'];
    $author = $_POST['up-author'];
    $genre = $_POST['up-genre'];
    $intro = $_POST['up-intro'];
    $id = uniqid();
    $status = "Đang cập nhật";
    $view = "0";
    $chapters = "0";
    $source ="webtruyen.vn";
    $stmt = $conn->prepare("INSERT INTO covers (id, title, author, genre, chapters, status, view, display_src, intro, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssss", $id, $title, $author, $genre, $chapters, $status, $view, $database_path, $intro, $source);
    $stmt->execute();
    $stmt->close();
    echo "insert successfully";
    $conn->close();
  }
  else {
    echo "invalid file";
  }
?>
