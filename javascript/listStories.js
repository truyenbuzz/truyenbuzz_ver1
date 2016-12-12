function renderStory(story) {
  var tr = $('<tr></tr>');
  //var link = $('<a href="javascript:void(0)" onclick="openNav()"></a>')
  var id = $('<td><span style="cursor:pointer; text-decoration:underline; color: #0033cc" onclick="openNav(\''+ story.id +'\' , \''+ "editStory" + '\')">'+ story.id +'</span></td>');
  var title = $('<td>'+ story.title +'</td>');
  var chapter = $('<td><span style="cursor:pointer; text-decoration:underline; color: #0033cc" onclick="openNav(\''+ story.id +'\', \''+ "editChapter" + '\')">'+ story.chapters +'</span></td>');
  var view = $('<td>'+ story.view +'</td>');
  var status = $('<td>'+ story.status +'</td>');
  //link.append(id, title, chapter, view, status);
  tr.append(id, title, chapter, view, status);
  $('#story-table').append(tr);
}

function loadStory() {
  $.ajax({
    type: "GET",
    url: "database/loadStory.php",
    success: function(data) {
      var stories = JSON.parse(data);
      stories.map(function(story) {
        return renderStory(story);
      });
    }
  });
}
