<?php
    session_start();
    $_SESSION['data'] = $_POST['cover'];

    echo json_encode($_SESSION['data']);
    //echo session_save_path("directory");
?>
