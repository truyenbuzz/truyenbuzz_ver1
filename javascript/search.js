function searchStories() {
    var keyword = $('#search-input').val();
    var new_href = "./search.html?keyword=" + keyword;
    window.location.href = new_href;
    return false;
}

var getUrlParameterStr = function getUrlParameterStr(href) {
    var URLparams = href.split("?");
    var keyword = URLparams[1].split("=")[1];
    var word = keyword.search("%20");
    var str = "";
    if (word != -1) {
    	var keyword1 = keyword.split("%20");
    	var length = keyword1.length;
    	for (var i = 0; i < length; i++) {
    		if (i == length - 1) {
    			str = str + keyword1[i];
    		}
    		else {
    			str = str + keyword1[i] + " ";
    		}
    	}
    }
    else {
    	str = keyword;
    }
    return str;
};

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

function loadSearch(str) {
	var s1 = replaceStr(str);
	var arr = [];
	for (var i = 0; i < covers.length; i++) {
		var re_cover = replaceStr(covers[i].title);
		var sr = re_cover.search(s1);
		if (sr != -1) {
			arr.push(covers[i]);
		}
	}
	return arr;
}

function loadData() {
	var href = window.location.href;
    var str = getUrlParameterStr(href);
    var s1 = decodeURIComponent(str);
    $('#search-keyword').text(s1);
    var result = loadSearch(s1);
    if (result.length <= 0) {
        $('.count-result').text('Không tìm thấy truyện');
        $('#search-main').css("margin-bottom", "200px");
    }
    else {
        $('.count-result').text('Có ' +  result.length + ' truyện phù hợp');
        for (var i = 0; i < result.length; i++) {
    		var row = $('<div class="col-md-6 col-sm-6 col-xs-12 padding result"></div>');
    		var row_img = $('<div class="col-md-3 col-sm-4 col-xs-3 padding result-img"></div>');
    		var img = $('<a href="./single.html?id='+ result[i].id + '"><img src=' + result[i].display_src + ' alt="No"></a>')
    		var row_caption = $('<div class="col-md-8 col-sm-7 padding result-caption"></div>');
    		var link = $('<a href="./single.html?id='+ result[i].id + '"></a>');
    		var title = $('<header class="search-title">' + result[i].title + '</header>');
    		var author = $('<span class="search-author">Tác giả: ' + result[i].author + '</span>');
    		var genre = $('<span class="search-genre">Thể loại: ' + result[i].genre + '</span>');
    		var chapter = $('<span class="search-chapter">Số chương: ' + result[i].chapters + '</span>');
    		var view = $('<span class="search-view">Lượt xem: ' + result[i].view + '</span>');
    		link.append(title,author,genre,chapter,view);
    		row_caption.append(link);
    		row_img.append(img);
    		row.append(row_img,row_caption);
            $('.grid-search').append(row);
    	}
    }
}

window.onload = function() {
	loadGenreDropDown();
  getData();
	loadData();
  checkLogin();
}
