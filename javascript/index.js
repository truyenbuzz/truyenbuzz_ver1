function getData() {
		$.ajax({
			type: "POST",
			data: {data: 1},
			url: "database/loadData.php",
			success: function(data) {
				covers = JSON.parse(data);
			},
			async: false,
			global: false
		});
}

function changePage() {
	var totalPageNum = (covers.length % 9 === 0) ? covers.length/9 : covers.length/9 + 1;
	$('#pagination-demo').twbsPagination({
		totalPages: totalPageNum,
		visiblePages: 5,
		onPageClick: function (event, page) {
			$('#right, #left, #middle').text('');
			loadIntialData(page-1);
		}
	});
}

function loadRecmdCovers() {
	for (var i = 0; i < 5; i++) {
		var div = $('<div class="col-md-12 col-sm-12 col-xs-12 padding"></div>')
		var link = $('<a class="recmt-link" href="./single.html?id='+covers[i].id+'"></a>');
		var img = $('<div class="col-md-4 col-sm-12 col-xs-12 recmd-figure"> <img class="recmt-img" src="'+covers[i].display_src+'"> </div>');
		var div_captions = $('<div class="col-md-7 col-sm-12 col-xs-12"> </div>');
		var title = $('<span class="recmt-title center">'+covers[i].title+'</span>');
		var author = $('<span class="truncate author"><i class="glyphicon glyphicon-pencil"></i> '+covers[i].author+'</span><br>');
		var intro = $('<p class="recmt-intro hidden-xs">'+covers[i].intro+'</p>');
		div_captions.append(title,author,intro);
		link.append(img,div_captions);
		div.append(link);
		$('.recmt-wrap').append(div);

	}
}

function loadGenreDropDown() {
	var kiemhiep = $('<li><a href="./genre.html?genre=KIEMHIEP">Kiếm hiệp</a></li>');
	var xuyenkhong = $('<li><a href="./genre.html?genre=XUYENKHONG">Xuyên không</a></li>');
	var tienhiep = $('<li><a href="./genre.html?genre=TIENHIEP">Tiên hiệp</a></li>');
	var ngontinh = $('<li><a href="./genre.html?genre=NGONTINH">Ngôn tình</a></li>');

	$('.genre-menu').append(kiemhiep, xuyenkhong, tienhiep, ngontinh);
}

function sortCovers(index) {
	return (index % 3);
}

function convertGenre(genre) {
	switch (genre) {
		case "KIẾM HIỆP":
		return "KIEMHIEP";
		break;
		case "XUYÊN KHÔNG":
		return "XUYENKHONG";
		break;
		case "TIÊN HIỆP":
		return "TIENHIEP";
		break;
		case "NGÔN TÌNH":
		return "NGONTINH";
		break;
	}
}

function loadFigure(data, pos, last) {

		var figure = $('<figure class="figure-img"></figure>');
		var img = $('<a id="route-img" href="./single.html?id=' + data.id +'"><img src="' + data.display_src + '" alt="No"></a>');
		var title = $('<div class="title"><a id="route-title" href="./single.html?id=' + data.id +'">' + data.title + '</a></div>');
		var author = $('<div class="truncate author"><i class="glyphicon glyphicon-pencil"></i>' + " " + data.author + '</div>');
		var genre = $('<div class="genre"><a id="route-genre" href="./genre.html?genre=' + convertGenre(data.genre) +'">' + data.genre + '</a></div>');
		var chapters = $('<div class="chapter"><i class="glyphicon glyphicon-list"></i>' + " " + data.chapters + '</div>');
		var view = $('<div class="view"><i class="glyphicon glyphicon-eye-open"></i>' + " " + data.view + '</div>');

		var hr = $('<hr>');
		figure.append(img, title, author, genre, chapters, view);

		switch (pos) {
			case 0:
			(last) ? $('#left').append(figure) : $('#left').append(figure, hr)
			break;
			case 1:
			(last) ? $('#middle').append(figure) : $('#middle').append(figure, hr)
			break;
			case 2:
			(last) ? $('#right').append(figure) : $('#right').append(figure, hr)
			break;
		}
}

function loadIntialData(pageNum) {
	var pos = {
		left: 0,
		middle: 1,
		right: 2
	}
	var last = true;
	var index = 0;
	var totalPageNum = (covers.length % 9 === 0) ? covers.length/9 : covers.length/9 + 1;
	var i = (pageNum === 0) ? pageNum : (pageNum*9);
	var max = 0;//(pageNum === 0) ? 9 : (pageNum+1)*9;
	if (pageNum === 0) {
		max = (covers.length <= 9) ? max = covers.length : max = 9;
	}
	else if (pageNum === Math.floor(totalPageNum) - 1) {
		max = covers.length;

	}
	else {
		max = (pageNum + 1)*9;
	}
	for (i; i < max; i++) {
		index = sortCovers(i);
		last = (i >= (max - 3)) ? true : false
		switch(index) {
			case 0:
			loadFigure(covers[i], pos.left, last);
			break;
			case 1:
			loadFigure(covers[i], pos.middle, last);
			break;
			case 2:
			loadFigure(covers[i], pos.right, last);
			break;
		}
	}
}

function searchStories() {
	var keyword = $('#search-input').val();
	var new_href = "./search.html?keyword=" + keyword;
	window.location.href = new_href;
	return false;
}

function checkLogin() {
	$.cookie.json = true;
	var currentUser = $.cookie("user");

	if (currentUser !== undefined && currentUser.isLogined === 1) {
		if (currentUser.profileImg === "") {
			var login = $('<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="nav-icon"><img src="./logo/default_user.png"></span>' + currentUser.username + '</a>');
		}
		else {
			var login = $('<a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="nav-icon"><img src="'+ currentUser.profileImg +'"></span>' + currentUser.username + '</a>');
		}
		var ul = $('<ul class="dropdown-menu profile-menu"></ul>');
		var profile = $('<li><a href="profile.html">Trang cá nhân</a></li>');
		var logout = $('<li><a href="" onclick="handleLogout()">Đăng xuất</a></li>');
		if (currentUser.role === "admin") {
			var admin = $('<li><a href = "admin.html">Quản lý thành viên</a></li>');
			ul.append(profile, admin, logout);
		}
		else {
			ul.append(profile, logout);
		}
		$('#nav-login').append(login);
		$('#nav-login').append(ul);
	}
	else {
		var login = $('<a href="./login.html"><span class="glyphicon glyphicon-log-in nav-icon"></span> Đăng nhập</a>');
		$('#nav-login').append(login);
	}
}

function handleLogout() {
	$.cookie.json = true;
	$.cookie("user", {isLogined: 0});
	var href = window.location.href;
	var pos = href.indexOf("profile.html");
	if (pos != -1) {
		var new_href = href.replace("profile.html", "index.html");
		//alert(new_href);
		history.back();
	}
	else {
		location.reload();
	}
}

function replaceStr(str) {
	str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
	str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
	str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
	str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
	str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
	str = str.replace(/(đ)/g, 'd');

	str = str.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ|A)/g, 'a');
	str = str.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ|E)/g, 'e');
	str = str.replace(/(Ì|Í|Ị|Ỉ|Ĩ|I)/g, 'i');
	str = str.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ|O)/g, 'o');
	str = str.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ|U)/g, 'u');
	str = str.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ|Y)/g, 'y');
	str = str.replace(/(Đ|D)/g, 'd');
  str = str.toLowerCase();
	return str;
}

function postCover() {
    $.ajax({
        type: "POST",
        url: "data/hint_data.php",
        data: {
            cover: covers
        },
        success :function(data) {
        }
    });
}

window.onload = function() {
	getData();
	loadGenreDropDown();
	loadRecmdCovers();
	changePage();
	checkLogin();
	postCover();
}
