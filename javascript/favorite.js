function loadFavorite(){
	$.cookie.json = true;
	var currentUser = $.cookie("user");
	$.ajax({
		type:"post",
		data: {id: currentUser.userID},
		url:"database/loadFavorites.php",
		success: function(data){
			var result = JSON.parse(data);
			var length = result.length;
			for(var i = 0; i< length; i++){
				loadSingleData(result[i]);
			}
		}
	});
}
function loadSingleData(data){
	var row = $('<div class="row"></div>');

	var div_12 = $('<div class="col-md-12"></div>');
	var link = $('<a href="./single.html?id='+data.id+'"></a>');

	var div_3 = $('<div class="col-md-3 fav-figure center-block center"></div>');
	var img_src = $('<img src="' + data.img_src + '" alt="" class="img-thumbnail">');
	var id = $('<span class="fav-story-id" style="display:none">'+ data.id +'</span>');

	var div_8 = $('<div class="col-md-8 fav-content "></div>');
	var title_link = $('<a href="./single.html?id='+data.id+'"></a>');
	var title = $('<h3 class="fav-title" style ="font-size:32px;font-weight:bold;">' + data.title + '</h3>');
	var author = $('<h4><span class="glyphicon glyphicon-user"></span><a style="text-decoration:none">' + ' ' + data.author + ' ' + '</a><span class="glyphicon glyphicon-book"></span><a style="text-decoration:none">'+ ' ' + data.genre + '</a></h4>');
	var numChapters = $('<h4><span class="glyphicon glyphicon-book"></span><a style="text-decoration:none">'+ ' ' + data.chapters +' Chapters </a><span class="glyphicon glyphicon-eye-open"></span><a style="text-decoration:none">'+ ' ' + data.views + ' Views</a></h4>');
	var like_btn = $('<button class="label label-fav btn btn-default btn-sm" onclick="unlikeAction(\''+data.id+'\')" style = "color:orange;font-size: 14px" ><span class="glyphicon glyphicon-heart-empty" id = "fav-icon"style = "font-size:18px"></span><span class="fav-content1" > Bỏ Yêu Thích</span></button>')
	var content = $('<p class="story-content" style="font-size: 20px;font-style: italic; height: 75px; line-height:25px; overflow: hidden">' + data.intro + '</p>');

	title_link.append(title);
	div_8.append(title_link,author,numChapters,like_btn,content);
	link.append(img_src,id);
	div_3.append(link);
	div_12.append(div_3,div_8);
	row.append(div_12);
	$('.favo-cont').append(row);
}
function unlikeAction(coverID){
	$.cookie.json = true;
	var currentUser = $.cookie("user");
	var userID = currentUser.userID;
	if (confirm("Bạn có muốn bỏ yêu thích?")) {
		$.ajax({
			type:"post",
			data:{userID,coverID},
			url:"controllers/handleUnlikeAction.php",
			success:function(data){
				// $.cookie.json = true;
				// var user = $.cookie("user");
				if(data == "Xóa thành công"){
					// $('.favo-cont').text("");
					// $.ajax({
					// 	type: "post",
					// 	data: {id: user.userID},
					// 	url: "database/loadFavorites.php",
					// 	success: function(result) {
					// 		var records = JSON.parse(result);
					// 		var length = records.length;
					// 		for(var i = 0; i< length; i++){
					// 			loadSingleData(records[i]);
					// 		}
					// 	}
					// });
					$('#Favorite .row').each(function(){
						var removeID = $(this).find('.fav-story-id').text();
						if (removeID === coverID) {
							$(this).remove();
						}
					})
				}
				else {
					alert("Xóa thất bại");
				}
			}
		});
	}
}
