<?php
    $valid_extensions = array('jpeg', 'jpg', 'png');
    $path = "../user-img/";
    $database_path = "./user-img/";
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
        $name = $_POST['input-name'];
        $email = $_POST['input-email'];
        $pass = $_POST['input-pass'];
        $phone = $_POST['input-phone'];
        $age = $_POST['input-date'];
        $userID = $_POST['input-id'];

        $img = $_FILES['image']['name'];
        if ($img == "") {
            $result = $conn->query("UPDATE users SET username = '". $name ."', phone = '". $phone ."',
                                    age = '". $age ."', email = '". $email ."', pass = '". $pass ."'
                                    WHERE userID = '". $userID . "'");
        }
        else {
            $result = $conn->query("UPDATE users SET username = '". $name ."', phone = '". $phone ."',
                                    age = '". $age ."', email = '". $email ."', pass = '". $pass ."', profileImg = '". $database_path ."'
                                    WHERE userID = '". $userID . "'");
        }
        $query = "SELECT * FROM users WHERE userID = '". $userID . "'";
        $data = $conn->query($query);
        $row = $data->fetch_assoc();
        $user = array("username" => $row{'username'}, "phone" => $row{'phone'}, "age" => $row{'age'},
                      "email" => $row{'email'}, "pass" => $row{'pass'}, "role" => $row{'role'},
                      "userID" => $row{'userID'} ,"profileImg" => $row{'profileImg'}, "isLogined" => 1);
        if ($result) {
            echo json_encode($user);
        }
        else echo $conn->error;
        $conn->close();
    }
    else {
        echo "invalid file";
    }
?>
