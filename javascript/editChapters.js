function loadChapterContent() {
  href = window.location.href;
  var id = getUrlParameterId(href);
  var chapter = getUrlParameterChapter(href);
  $.ajax({
    type: "POST",
    data: {id, chapter},
    url: "database/loadChapterContent.php",
    success: function(data) {
      if (data ==="database error") {
        alert(data);
      }
      else {
        var story = JSON.parse(data);
        renderChapterContent(story);
        console.log(story);
      }
    }
  });
}

function renderChapterContent(story) {
  $('#editchap-story-title').text(story.title);
  var chapter = story.chapter.split(":");
  $('#editchap-name span').text(chapter[0]+": ");
  $('#editchap-input').val(chapter[1]);
  $('#editchap-content').val(story.content);
}

function handleEditSubmit() {
  var name = $('#editchap-input').val();
  var content = $('#editchap-content').val();
  var id = getUrlParameterId(href);
  var chap = getUrlParameterChapter(href);
  $.ajax({
    type: "POST",
    url: "controllers/handleEditChapters.php",
    data: {
      id,
      chap,
      name,
      content,
    },
    success: function(data) {
      alert(data);
    }
  });
  return false;
}

window.onload = function() {
  loadGenreDropDown();
  loadChapterContent();
  checkLogin();
}
