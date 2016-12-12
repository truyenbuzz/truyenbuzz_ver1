<?php
  //header('Content-Type: text/html; charset=utf-8');
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
  $name = $_POST['name'];
  $content = $_POST['content'];

  $query1 = "SELECT * FROM covers WHERE id='". $id ."'";
  $result = $conn->query($query1);
  $row = $result->fetch_assoc();

  $chapter = $row{'chapters'};
  $new_chap = $chapter + 1;
  $name_chap = "Chương " . $new_chap . ": " . $name . "\n";

  $vi_title = $row{'title'};
  $en_title = convert_vi_to_en($vi_title);
  $vi_title = $vi_title."\n";

  $dir_path = "../cover-chapter/" . $en_title;
  if(!file_exists($dir_path)) {
    mkdir($dir_path, 0777, true);
  }

  $url = "../cover-chapter/" . $en_title . "/" . $new_chap . ".txt";

  $file = fopen($url, 'w') or die("Unable to open file!");
  $err_title =  fwrite($file, $vi_title);
  $err_name_chap = fwrite($file, $name_chap);
  $err_content = fwrite($file, $content);
  if ($err_title !== false && $err_name_chap !== false && $err_content !== false) {
      $query2 = "UPDATE covers SET chapters= '". $new_chap ."' WHERE id = '". $id ."'";
      if($conn->query($query2)) {
        echo "upload chapter successfully";
      }
      else {
        echo "error upload chapter";
      }
  }
  else {
    echo "error file write";
  }
  fclose($file);

?>
