function loadChap() {
  href = window.location.href;
  var id = getUrlParameter(href);
  var index = covers.findIndex(function(cover) {return cover.id === id});
  loadInfo(covers[index]);
}

function loadInfo(cover) {
  var chapIndex = Number(cover.chapters) + 1;
  $('#upchap-story-title').text(cover.title);
  $('#upchap-name span').text("Chương " + chapIndex + ": ");
}

function handleUpSubmit() {
  var name = $('#upchap-input').val();
  var content = $('#upchap-content').val();
  var id = getUrlParameter(href);
  $.ajax({
    type: "POST",
    url: "controllers/handleUpChapters.php",
    data: {
      id,
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
  getData();
  loadChap();
  checkLogin();
}
