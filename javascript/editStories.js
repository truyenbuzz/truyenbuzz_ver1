function renderEditStory(story) {
    $('#edit-id').val(story.id);
    $('#edit-title').val(story.title);
    $('#edit-author').val(story.author);
    $('#edit-genre').val(story.genre);
    $('#edit-intro').val(story.intro);
    $('#edit-previewHolder').attr('src', story.display_src);
    $('#addChap').attr('href','./upChapters.html?id=' + story.id);
}

function loadEditStory(id) {
    $.ajax({
        type: "POST",
        data: {
            id
        },
        url: "database/loadEditStory.php",
        success: function(data) {
            if (data === "database error") {
                alert(data);
            } else {
                story = JSON.parse(data);
                renderEditStory(story);
            }
        }
    });
}

function renderEditChap(story) {
  $('#admin-listChap').text('');
  for (var i = 1; i <= Number(story.chapters); i++) {
    var li = $('<li></li>');
    var chapter = $('<a href="./editChapters.html?id='+ story.id + '&chapter='+ i +'">'+"Chương "+ i + '</a>');
    li.append(chapter);
    $('#admin-listChap').append(li);
  }
}

function loadEditChapter(id) {
  $.ajax({
      type: "POST",
      data: {
          id
      },
      url: "database/loadEditChapter.php",
      success: function(data) {
          if (data === "database error") {
              alert(data);
          } else {
              var story = JSON.parse(data);
              renderEditChap(story);
          }
      }
  });

}

function openNav(id, mode) {
    if (mode === "editStory") {
      document.getElementById("myNav").style.height = "100%";
      loadEditStory(id);
    }
    else {
      document.getElementById("myNav-editChap").style.height = "100%";
      loadEditChapter(id);
    }
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav-editChap").style.height = "0%";

}

function checkEditStoryInput() {
    var title = $('#edit-title').val();
    var author = $('#edit-author').val();
    var genre = $('#edit-genre').val();
    var intro = $('#edit-intro').val();
    var img = $('#edit-image').val();
    var imgExt = ['png', 'jpeg', 'jpg'];
    var genreArr = ['TIÊN HIỆP', 'XUYÊN KHÔNG', 'KIẾM HIỆP', 'NGÔN TÌNH'];
    var pattern = /^([a-z0-9A-Z ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]{1,30})$/;
    var completed = true;
    $('#edit-title-mess').text("");
    $('#edit-author-mess').text("");
    $('#edit-genre-mess').text("");
    $('#edit-intro-mess').text("");
    $('#edit-img-mess').text("");
    if (imgExt.indexOf(img.split('.')[1]) < 0 && img.length > 0) {
        $('#edit-img-mess').text("Ảnh không đúng dịnh dạng").css("color", "#ff8e92");
        completed = false;
    }
    if (!pattern.test(title)) {
        $('#edit-title-mess').text("Chỉ cho phép ký tự và số. Không quá 30 ký tự").css("color", "#ff8e92");
        completed = false;
    }
    if (!pattern.test(author)) {
        $('#edit-author-mess').text("Chỉ cho phép ký tự và số. Không quá 30 ký tự").css("color", "#ff8e92");
        completed = false;
    }
    if (genreArr.indexOf(genre) < 0) {
        $('#edit-genre-mess').text("Xin vui lòng chọn thể loại truyện").css("color", "#ff8e92");
        completed = false;
    }
    if (intro.length > 2000) {
        $('#edit-intro-mess').text("Không quá 2000 ký tự").css("color", "#ff8e92");
        completed = false;
    }
    return completed;
}

function readEditURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#edit-previewHolder').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(e) {
    $('#edit-form').on('submit', (function(e) {
        e.preventDefault();
        if (checkEditStoryInput()) {
            $.ajax({
                type: "POST",
                url: "controllers/handleEditStory.php",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    if (data == 'edit successfully') {
                        alert("Chỉnh sửa truyện thành công");
                        location.assign("admin.html");
                    } else {
                        alert(data);
                    }
                }
            });
        }
    }));
});
