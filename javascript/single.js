function postDate() {
  var d = new Date();
  var minute = d.getMinutes();
  var hour = d.getHours();
  var date = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  if (minute.toString().length <= 1) {
    minute = "0" + minute;
  }
  if (date.toString().length <= 1) {
    date = "0" + date;
  }
  if (month.toString().length <= 1) {
    month = "0" + month;
  }
  var postDate = hour + ":" + minute + " " + date + "/" + month + "/" + year;
  return postDate;
}

function handleComment() {
  var comment = $('#comment').val();
  comment = comment.replace(/\r?\n/g, '<br />');
  $.cookie.json = true;
  var user = $.cookie('user');
  var href = window.location.href;
  var coverID = getUrlParameter(href);
  if (user === undefined || user.isLogined === 0) {
    $('#cmt-mess').text('Bạn phải đăng nhập để bình luận');
  }
  else if (comment.length < 15) {
    $('#cmt-mess').text('Bình luận phải dài hơn 15 ký tự');
  }
  else {
    $('#cmt-mess').text("");
    $('#empty-cmt-mess').text("");
    storeComment(comment, user.userID, coverID, postDate());
    $('#form-comment')[0].reset();
  }
  return false;
}

function storeComment(comment, userID, coverID, postDate) {
  $.ajax({
    type: "POST",
    url: "controllers/handleComment.php",
    data: {comment, userID, coverID, postDate},
    success: function(data) {
      $.cookie.json = true;
      var user = $.cookie('user');
      postComment(comment, user, postDate);
    }
  })
}

function loadComment(option) {
  var href = window.location.href;
  var coverID = getUrlParameter(href);

  $.ajax({
    type: "POST",
    url: "database/loadComment.php",
    data: {coverID},
    success: function(data) {
      user_comments = JSON.parse(data);
      //console.log(user_comments);
      if (user_comments.length <= 0) {
        $('#cmt-count').text("0");
        $('#empty-cmt-mess').text("Chưa có bình luận nào");
      }
      else {
        $('#cmt-count').text(user_comments.length.toString());
        $('#empty-cmt-mess').text("");
        if (option === "oldest") {
          user_comments.map(function(user_comment) {
            return postComment(user_comment.content,user_comment, user_comment.postdate);
          });
        }
        else {
          user_comments.reverse().map(function(user_comment) {
            return postComment(user_comment.content,user_comment, user_comment.postdate);
          });
        }
      }
    }
  })
}

function postComment(comment, user, postDate) {

  var container = $('<div class="col-md-12 padding" style="margin-top:10px"></div>');
  var div_img = $('<div class="padding" style="float:left"></div>');
  if (user.profileImg !== "") {
    var img = $('<img style="width:50px;height:50px;" src="'+ user.profileImg + '" />');
  }
  else {
    var img = $('<img style="width:50px;height:50px;" src="./logo/default_user.png" />');
  }
  var div_cmt = $('<div class="padding" style="float:left; width:75%; margin-left:10px;"></div>');
  var username = $('<label style="line-height:10px;">'+user.username+'</label>');
  var br = $('<br />');
  var postdate = $('<span style="font-size:12px;color: #767676;">'+ postDate + '</span>');
  var content = $('<p style="font-size: 15px;text-align:justify">'+ comment +'</p>');
  div_img.append(img);
  div_cmt.append(username,br,postdate,content);
  container.append(div_img, div_cmt);
  $('#spec-comment').append(container);
}

function sortComment() {
  $.cookie.json = true;
  var user = $.cookie('user');
  if (user.profileImg !== "") {
    $('#comment-user-img').attr('src', user.profileImg);
  }
  else {
    $('#comment-user-img').attr('src', './logo/default_user.png');
  }
  $('#spec-comment').text("");
  var option = $('#sel1').val();
  loadComment(option);
}

var getUrlParameter = function getUrlParameter(href) {
  var URLparams = href.split("?");
  var param = URLparams[1].split("=")[1];
  if (param.search("&") > 0) {
    var id = param.split("&")[0];
    return id;
  }
  return param;
};

function changeGenreToLowerCase(genre) {
  switch (genre) {
    case 'KIẾM HIỆP':
    return 'Kiếm hiệp';
    case 'NGÔN TÌNH':
    return 'Ngôn tình';
    case 'XUYÊN KHÔNG':
    return 'Xuyên không';
    case 'TIÊN HIỆP':
    return 'Tiên hiệp';
  }
}

function changePage(data) {
  if (data.chapters != 0) {
    var totalPageNum = (Number(data.chapters) % 10 === 0) ? data.chapters/10 : data.chapters/10 + 1;
    $('#pagination-demo').twbsPagination({
      totalPages: totalPageNum,
      visiblePages: 5,
      onPageClick: function (event, page) {
        $('#chapter-list').text('');
        loadIntialData(page-1, data);
      }
    });
  }
}

function loadIntialData(pageNum, data) {
  var i = (pageNum === 0)? 1:  (pageNum * 10) + 1;
  var max = (pageNum === 0)? 11:  ((pageNum + 1) * 10) + 1;
  if (max > Number(data.chapters)) {
    for (i; i <= Number(data.chapters); i++) {
      var chapter_list = $('<a class="chapters" href="./chapter.php?id=' + data.id + '&chapter=' + i + '&q=' + data.title + '">Chương ' + i + '</a>');
      $('#chapter-list').append(chapter_list);
    }
  }
  else {
    for (i; i < max; i++) {
      var chapter_list = $('<a class="chapters" href="./chapter.php?id=' + data.id + '&chapter=' + i + '&q=' + data.title + '">Chương ' + i + '</a>');
      $('#chapter-list').append(chapter_list);
    }
  }
}

function loadData(data) {
  $('#main-header, h1, #link-title, .title').text(data.title);
  $('.label-chap').text(data.chapters + " Chương");
  $('.label-info').text(data.status);
  $('.label-view').text(data.view + " Lượt xem");
  $('#cover-img').attr('src', data.display_src);

  data.intro  = data.intro.replace(/\r?\n/g, ' <br />');
  var intro = $('<p></p>').append(data.intro);
  $('#single-intro').append(intro);
  // var intro = (data.intro).split("<br>");
  // var length = intro.length;
  // $('#single-intro').append($('<br><p>'));
  // for (var i = 0; i < length; i++) {
  //     if (i == length - 1) {
  //         $('#single-intro').append(intro[i]);
  //         $('#single-intro').append($('</p>'));
  //     }
  //     else {
  //         $('#single-intro').append(intro[i]);
  //         $('#single-intro').append($('<br><br>'));
  //     }
  // }

  var single_author = $('<label class="author1">' + data.author + '</label>');
  $('#single-author').append(single_author);
  var single_genre = $('<a class="genre" href="./genre.html?genre=' + convertGenre(data.genre) + '">' + changeGenreToLowerCase(data.genre) + '</a>');
  $('#single-genre').append(single_genre);
  var link_genre = $('<a href="./genre.html?genre=' + convertGenre(data.genre) + '"><span>' + changeGenreToLowerCase(data.genre) + '</span></a> <span> / </span>');
  $('#link-genre').append(link_genre);
  var single_source = $('<span class="source"><b>Nguồn: ' + data.source + '</b></span>');
  $('#single-source').append(single_source);

  var author = $('<a class="author" href="#"><span><b>Tác giả: ' + data.author + '</b></span></a>');
  var genre = $('<a class="genre" href="./genre.html?genre=' + convertGenre(data,genre) + '"><span><b>Thể loại: ' + changeGenreToLowerCase(data.genre) + '</b></span></a><br>');
  var source = $('<span class="source"><b>Nguồn: ' + data.source + '</b></span><br>');
  $('#s-author').append(author);
  $('#s-author').append(genre);
  $('#s-author').append(source);

  for (var i = 1; i <= Number(data.chapters); i++) {
    var chapter_list = $('<a class="chapters" href="./chapter.php?id=' + data.id + '&chapter=' + i + '">Chương ' + i + '</a>');
    $('#chapter-list').append(chapter_list);
  }
}

function loadSinglePage() {
  var href = window.location.href;
  var id = getUrlParameter(href);
  var index = covers.findIndex(function(cover) {return (id === cover.id)});
  loadData(covers[index]);
  changePage(covers[index]);
}

function searchStories() {
  var keyword = $('#search-input').val();
  var new_href = "./search.html?keyword=" + keyword;
  window.location.href = new_href;
  return false;
}
function handleFav(){

  $.cookie.json = true;
  var currentUser = $.cookie("user");
  var userID = currentUser.userID;
  var href = window.location.href;
  var coverID = getUrlParameter(href);

  $.ajax({
    type:"post",
    url:"controllers/handleFavoriteAction.php",
    data: {userID,coverID},
    success: function(data){
      $('#fav-icon').css({"display":"none"});
      $('#unfav-icon').css({"color":"orange","font-size":"18px","display":"inline-block"});
    }

  });
}
function checkLike(){
  $.cookie.json = true;
  var user = $.cookie("user");
  if (user.isLogined == 0) {
    $('#unfav-icon').css("display","none");
    $('#fav-icon').css("display","none");
  }
  else {
    $.ajax({
      type:"post",
      data: {id: user.userID},
      url:"database/loadFavorites.php",
      success: function(data){
        var results = JSON.parse(data);
        var href = window.location.href;
        var coverID = getUrlParameter(href);
        if (results.findIndex(function(result) {return result.id === coverID}) >-1) {
          $('#unfav-icon').css({"color":"orange","font-size":"18px","display":"inline-block"});
          $('#fav-icon').css("display","none");

        }
        else {
          $('#fav-icon').css({"color":"black","font-size":"18px","display":"inline-block"});
          $('#unfav-icon').css("display","none");
        };

      }

    });
  }
}
function unFav(){
  $.cookie.json = true;
  var currentUser = $.cookie("user");
  var userID = currentUser.userID;
  var href = window.location.href;
  var coverID = getUrlParameter(href);

  $.ajax({
    type:"post",
    url:"controllers/handleUnlikeAction.php",
    data: {userID,coverID},
    success: function(data){
      $('#unfav-icon').css({"display":"none"});
      $('#fav-icon').css({"color":"black","font-size":"18px","display":"inline-block"});
    }
  });
}
window.onload = function(){
  getData();
  loadGenreDropDown();
  loadSinglePage();
  checkLogin();
  sortComment();
  checkLike();
}
