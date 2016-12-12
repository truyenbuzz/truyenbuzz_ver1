function changePage(data) {
    var totalPageNum = Number(data.chapters);
    $('#pagination-chapter').twbsPagination({
        totalPages: totalPageNum,
        visiblePages: 0,
        onPageClick: function (event, page) {
            $('#chapter').text('');
            readPageData(page, data);
        }
    });
}

function readPageData(pageNum, data) {
    if (pageNum != 1) {
        var href = window.location.href;
        var URLparams = href.split("&");
        var chapter = URLparams[1];
        var page = chapter.split("=");
        page[1] = pageNum;
        new_href = URLparams[0].concat("&").concat(page[0]).concat("=").concat(page[1]).concat("&").concat(URLparams[2]);
        window.location.href = new_href;
    }
}

function readPage (data) {
    max = Number(data.chapters);
    var href = window.location.href;
    var URLparams = href.split("&");
    var chapter = URLparams[1];
    var page = chapter.split("=");
    var pageNum = page[1];
    var num = Number(pageNum);
    pageNext = num + 1;
    pagePre = num - 1;
    next_href = URLparams[0].concat("&").concat(page[0]).concat("=").concat(pageNext).concat("&").concat(URLparams[2]);
    pre_href = URLparams[0].concat("&").concat(page[0]).concat("=").concat(pagePre).concat("&").concat(URLparams[2]);
    if (num == 1) {
        var pre = $('<li class="disabled not-active"><a  href='+ pre_href +'>Trước</a></li>');
            }
    else {
        var pre = $('<li><a href='+ pre_href +'>Trước</a></li>');
    }
    if (num == max) {
        var next = $('<li class="disabled not-active"><a href='+ next_href +'>Sau</a></li>');
    }
    else {
        var next = $('<li><a href='+ next_href +'>Sau</a></li>');
    }
    $('.pagination').append(pre);
    $('.pagination').append(next);
}

function loadGenreDropDown() {
    var kiemhiep = $('<li><a href="./genre.html?genre=KIEMHIEP">Kiếm hiệp</a></li>');
    var xuyenkhong = $('<li><a href="./genre.html?genre=XUYENKHONG">Xuyên không</a></li>');
    var tienhiep = $('<li><a href="./genre.html?genre=TIENHIEP">Tiên hiệp</a></li>');
    var ngontinh = $('<li><a href="./genre.html?genre=NGONTINH">Ngôn tình</a></li>');

    $('.genre-menu').append(kiemhiep, xuyenkhong, tienhiep, ngontinh);
}

var getUrlParameterId = function getUrlParameterId(href) {
    var URLparams = href.split("?");
    var param = URLparams[1].split("=");
    var id = param[1].split("&")[0];
    return id;
};

var getUrlParameterChapter = function getUrlParameterChapter(href) {
    var URLparams = href.split("&");
    var param = URLparams[1].split("=")[1];
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

function loadData(data) {
    var link_genre = $('<a href="./genre.html?genre=' + convertGenre(data.genre) +'"><span>'+ changeGenreToLowerCase(data.genre) +'</span></a> <span> / </span>');
    $('#link-genre').append(link_genre);
    var link_title = $('<a href="./single.html?id=' + data.id +'"><span>'+ data.title +'</span></a> <span> / </span>');
    $('#link-title').append(link_title);
    var href = window.location.href;
    var id = getUrlParameterChapter(href);
    var link_chapter = $('<span>Chương ' + id + '</span>');
    $('#link-chapter').append(link_chapter);
}

function loadChapterPage() {
    var href = window.location.href;
    var id = getUrlParameterId(href);
    var index = covers.findIndex(function(cover) {return (id === cover.id)});
    loadData(covers[index]);
    readPage(covers[index]);
}
function searchStories() {
    var keyword = $('#search-input').val();
    var new_href = "./search.html?keyword=" + keyword;
    window.location.href = new_href;
    return false;
}
window.onload = function(){
    loadGenreDropDown();
    getData();
    loadChapterPage();
    checkLogin();
    sortComment();
}
