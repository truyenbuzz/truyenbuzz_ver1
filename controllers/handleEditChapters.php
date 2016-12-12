<?php
  function convert_vi_to_en($str) {
  $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
  $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
  $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
  $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
  $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
  $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
  $str = preg_replace("/(đ)/", 'd', $str);
  $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
  $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
  $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
  $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
  $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
  $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
  $str = preg_replace("/(Đ)/", 'D', $str);
  return $str;
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

  $id = $_POST['id'];
  $chap = $_POST['chap'];
  $name = $_POST['name'];
  $name_chap = "Chương " . $chap . ": " . $name . "\n";
  $content = $_POST['content'];


  $query = "SELECT * FROM covers WHERE id= '". $id . "'";
  $result = $conn->query($query);
  if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $vi_title = $row{'title'};
      $en_title = convert_vi_to_en($vi_title);
      $vi_title = $vi_title."\n";
      $url = "../cover-chapter/" . $en_title . "/" . $chap . ".txt";

      $file = fopen($url, 'w') or die("Unable to open file!");
      $err_title =  fwrite($file, $vi_title);
      $err_name_chap = fwrite($file, $name_chap);
      $err_content = fwrite($file, $content);
      fclose($file);
      if ($err_title !== false && $err_name_chap !== false && $err_content !== false) {
        echo "edit chapter successfully";
      }
      else {
        echo "edit chapter error";
      }
  }
  else {
    echo "database error";
  }


?>
