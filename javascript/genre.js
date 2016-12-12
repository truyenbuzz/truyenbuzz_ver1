function filterGenre(datas, genre) {
	var covers = datas.filter(function(data) {
		return data.genre === genre;
	});
	return covers;
}

function sortCovers(index) {
	return (index % 6);
}

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

function loadFigure(data, pos, last) {
	$('#link-genre').text(changeGenreToLowerCase(data.genre));
	var figure = $('<figure class="figure-img"></figure>');
	var img = $('<a id="route_img" href="./single.html?id=' + data.id +'"><img src="' + data.display_src + '" alt="No"></a>');
	var title = $('<div class="title"><a id="route-title" href="./single.html?id=' + data.id +'">' + data.title + '</a></div>');
	var author = $('<div class="truncate author"><i class="glyphicon glyphicon-pencil"></i>' + " " + data.author + '</div>');
	var genre = $('<div class="genre">' + data.genre + '</div>');
	var chapters = $('<div class="chapter"><i class="glyphicon glyphicon-list"></i>' + " " + data.chapters + '</div>');
	var view = $('<div class="view"><i class="glyphicon glyphicon-eye-open"></i>' + " " + data.view + '</div>');
	var hr = $('<hr>');
	figure.append(img, title, author, genre, chapters, view);

	switch (pos) {
		case 0:
			(last) ? $('#first').append(figure) : $('#first').append(figure, hr)
			break;
		case 1:
			(last) ? $('#second').append(figure) : $('#second').append(figure, hr)
			break;
		case 2:
			(last) ? $('#third').append(figure) : $('#third').append(figure, hr)
			break;
		case 3:
			(last) ? $('#fourth').append(figure) : $('#fourth').append(figure, hr)
			break;
		case 4:
			(last) ? $('#fifth').append(figure) : $('#fifth').append(figure, hr)
			break;
		case 5:
			(last) ? $('#sixth').append(figure) : $('#sixth').append(figure, hr)
			break;
	}
}

function loadIntialData(genre) {

	var last = true;
	var index = 0;
	var afterFilterCovers = filterGenre(covers, genre);
	for (var i = 0; i < afterFilterCovers.length; i++) {

		index = sortCovers(i);
		last = (i >= (afterFilterCovers.length - 6)) ? true : false

		loadFigure(afterFilterCovers[i], index, last);
	}
}

function searchStories() {
    var keyword = $('#search-input').val();
    var new_href = "./search.html?keyword=" + keyword;
    window.location.href = new_href;
    return false;
}

window.onload = function() {
	getData();
	loadGenreDropDown();
	var href = window.location.href;
    var genre = getUrlParameter(href);
    switch (genre) {
    	case "KIEMHIEP":
    		$('.main-header').text("Kiếm Hiệp");
    		loadIntialData("KIẾM HIỆP");
    		break;
    	case "NGONTINH":
    		$('.main-header').text("Ngôn tình");
    		loadIntialData("NGÔN TÌNH");
    		break;
    	case "XUYENKHONG":
    		$('.main-header').text("Xuyên không");
    		loadIntialData("XUYÊN KHÔNG");
    		break;
    	case "TIENHIEP":
    		$('.main-header').text("Tiên Hiệp");
    		loadIntialData("TIÊN HIỆP");
    		break;

    }
	checkLogin();
}
