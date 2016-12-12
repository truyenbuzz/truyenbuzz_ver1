<!DOCTYPE html>
<html lang="vi">
<head>
  <title>Web Truyen</title>
  <meta name="viewport" content="width=device-width, intial-scale=1">
  <meta charset="utf-8">
  <link href="lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> -->
  <link rel="stylesheet" type="text/css" href="./style/index.css">
  <link rel="stylesheet" type="text/css" href="./style/hint.css">
  <link rel="stylesheet" type="text/css" href="./style/chapter.css">
  <link rel="stylesheet" type="text/css" href="./style/comment.css">

  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
  <script src="lib/jquery/jquery.min.js"></script>
  <script src="./jquery-cookie/jquery.cookie.js"></script>
  <!-- <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> -->
  <script src="lib/bootstrap/js/bootstrap.min.js"></script>
  <script src="jquery.twbsPagination.min.js"></script>
  <script src="./data/covers.js"></script>
  <script src="./javascript/hint.js"></script>
  <script src="./javascript/index.js"></script>
  <script src="./javascript/single.js"></script>
  <script src="./javascript/chapter.js"></script>
</head>
<body>
<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.html">BK Truyện</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li><a href="index.html"><i class="glyphicon glyphicon-home nav-icon"></i>  Trang chủ</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="glyphicon glyphicon-align-left nav-icon"></i>  Thể loại <span class="caret"></span></a>
          <ul class="dropdown-menu genre-menu">
            <!-- COVER GENRE DROPDOWN HERE -->
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li id="nav-login">
          <!-- <a href="./login.html"><span class="glyphicon glyphicon-log-in nav-icon"></span> Login</a> -->
        </li>
        <li><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="glyphicon glyphicon-search nav-icon nav-search-size"></span></a>
            <ul class="dropdown-menu search-menu">
              <li>
                <form onsubmit="return searchStories();">
                  <div class="search-form">
                    <input type="text" id="search-input" name="search" placeholder="Truyện bạn muốn tìm" onkeyup="showHint(replaceStr(this.value))">
                    <input type="submit" class="btn btn-primary button-search" name="Search" value="Search">
                  </div>
                  <div class="hint-form">
                    <div class="row hint_data">
                    </div>
                  </div>
                </form>
              </li>
            </ul>
          </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container">
    <ol class="link">
        <li>
            <a href="index.html">
                <span>Truyện</span>
            </a>
            <span> / </span>
        </li>
        <li id="link-genre">

        </li>
        <li id="link-title">
            <span><!-- COVER'S TITLE HERE --></span>
        </li>
        <li id="link-chapter" class="active">

        </li>
    </ol>
    <div class="color">
        <div id="chapter">

        </div>

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
        ?>

        <?php
            $id = $_GET["id"];
            $chapter = $_GET["chapter"];
            $q = explode("%20", $_GET["q"]);
            $title = "";
            $qlength = count($q);
            for ($i=0; $i < $qlength; $i++) {
                if ($i == $qlength - 1) {
                    $title .= $q[$i];
                }
                else {
                    $title .= $q[$i];
                    $title .= " ";
                }
            }
            $title1 = convert_vi_to_en($title);
            $url = "./cover-chapter/" . $title1 . "/" . $chapter . ".txt";
            $file = fopen($url, 'r');
            echo '<header><h1>';
            if (!feof($file)) {
                echo fgets($file);
            }
            echo '</h1></header>';
            echo '<div class="chap-name">';
            if (!feof($file)) {
                echo fgets($file);
            }
            echo "<br><br>";
            echo '</div>';
            echo '<div class="chap-content">';
            while (!feof($file)) {
                echo fgets($file);
                echo "<br>";
            }
            echo '</div>';
            fclose($file);
            echo "<br><br>";
        ?>

        <div class="center">
            <ul class="pagination">
            </ul>
        </div>
    </div>

    <div class="col-md-12 col-sm-12 col-xs-12 test">
      <div class="row">
        <div id="formcomment-section" class="col-md-12 col-sm-12 col-xs-12">
          <label>Bình luận: </label> <span id="cmt-count"></span>
          <form action="" method="post" id="form-comment" class="form-group" onsubmit="return handleComment();">
            <div class="col-md-1 padding">
              <img id="cmt-user-img" src="./logo/default_user.png" />
            </div>

            <div class="col-md-11 padding">
              <textarea class="form-control" id="comment" rows="4" placeholder="Nhập bình luận. Bình luận phải dài trên 15 ký tự ..."></textarea>
            </div>

            <input id="btn-cmt" type="submit" value="Đăng" class="btn btn-primary">
          </form>
          <span id="cmt-mess"></span>
        </div>

        <div id="comment-section" class="col-md-12 col-sm-12 col-xs-12">
          <select id="sel1" onchange="sortComment()">
            <option value="newest">Nhận xét mới nhất</option>
            <option value="oldest">Nhận xét cũ nhất</option>
          </select>

          <div class="col-md-12 col-sm-12 col-xs-12 text-center">
            <span id="empty-cmt-mess"></span>
          </div>
          <div id="spec-comment">

          </div>

          <!-- <div class="col-md-12 padding" style="margin-top:10px">
            <div class="padding" style="float:left">
              <img style="width:50px;height:50px;"src="./logo/default_user.png" />
            </div>
            <div class="padding" style="float:left; width:75%; margin-left:10px;">
              <label style="line-height:10px;">Phạm Trần Trí</label> <br />
              <span style="font-size:12px;color: #767676;">3 tuần trước</span>
              <p style="font-size: 15px;text-align:justify">
                i always prepare for somebody in running man to leave.. because i believe they will not forever doing the show.. but,I never expect that Kang Gary will be the first one to leave after the 6 years
              </p>
            </div>
          </div> -->

        </div>
      </div>
    </div>
</div>

<footer class="footer">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h3>Giới thiệu</h3>
        <hr>

        <span>BK Truyện là website đọc truyện convert online cập nhật liên tục và nhanh nhất các truyện tiên hiệp, kiếm hiệp, huyền ảo do các thành viên đóng góp, có nhiều truyện hay và nổi bật</span>
      </div>
      <div class="col-md-6">
        <h3>Liên hệ</h3>
        <hr>
        <a href="about.html"><i class="glyphicon glyphicon-book"></i> About us</a> <br>
        <span><i class="glyphicon glyphicon-envelope"></i> 51304364@hcmut.edu.vn</span>
        <br>
        <span><i class="glyphicon glyphicon-phone"></i> 01225417247</span>
      </div>
    </div>
  </div>
</footer>
</body>
</html>
