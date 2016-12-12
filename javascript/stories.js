function checkStoryInput() {
  var title = $('#up-title').val();
  var author = $('#up-author').val();
  var genre = $('#up-genre').val();
  var intro = $('#up-intro').val();
  var img = $('#uploadImage').val();
  var imgExt = ['png', 'jpeg', 'jpg'];
  var genreArr = ['TIÊN HIỆP', 'XUYÊN KHÔNG', 'KIẾM HIỆP', 'NGÔN TÌNH'];
  var pattern = /^([a-z0-9A-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30})$/;
  var completed = true;
  $('#up-title-mess').text("");
  $('#up-author-mess').text("");
  $('#up-genre-mess').text("");
  $('#up-intro-mess').text("");
  $('#up-img-mess').text("");
  if (img.length <= 0) {
    $('#up-img-mess').text("Xin vui lòng chọn ảnh bìa").css("color","red");
    completed = false;
  }
  if (imgExt.indexOf(img.split('.')[1]) < 0) {
    $('#up-img-mess').text("Ảnh không đúng dịnh dạng").css("color","red");
    completed = false;
  }
  if (!pattern.test(title)) {
    $('#up-title-mess').text("Chỉ cho phép ký tự và số. Không quá 30 ký tự").css("color","red");
    completed = false;
  }
  if (!pattern.test(author)) {
    $('#up-author-mess').text("Chỉ cho phép ký tự và số. Không quá 30 ký tự").css("color","red");
    completed = false;
  }
  if (genreArr.indexOf(genre) < 0) {
    $('#up-genre-mess').text("Xin vui lòng chọn thể loại truyện").css("color","red");
    completed = false;
  }
  if (intro.length > 2000) {
    $('#up-intro-mess').text("Không quá 2000 ký tự").css("color","red");
    completed = false;
  }
  return completed;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('#previewHolder').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function(e) {
  $('#up-form').on('submit', (function(e) {
    e.preventDefault();
    if (checkStoryInput()) {
      $.ajax({
        type: "POST",
        url: "controllers/handleUploadStory.php",
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData:false,
        success: function(data)
        {
          if(data == 'invalid file')
          {
            alert("Invalid file format");
          }
          else {
            alert("Đăng truyện thành công");
            location.assign("index.html");
          }
        }
      });
    }
  }));
});
