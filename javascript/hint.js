function showHint(str) {
    if (str.length == 0) {
        $('.hint_data').text('');
        return;
    } else {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                $('.hint-row').remove();
                $('.hint_data').text("");
                if (this.responseText == 'no suggestion') {
                    $('.hint_data').text('no suggestion');
                } else {
                    var data = JSON.parse(this.responseText).toString();
                    var hint = data.split(',');
                    var length = hint.length / 3;
                    console.log(hint);
                    var id = [],
                        name = [],
                        img = [];
                    for (var i = 0; i < length; i++) {
                        id.push(hint[i]);
                        name.push(hint[i + length]);
                        img.push(hint[i + length * 2]);
                    }
                    console.log(id, name, img);
                    for (var i = 0; i < length; i++) {
                        var row = loadHint(id[i], name[i], img[i]);
                        $('.hint_data').append(row);
                    }
                }
                //console.log(this.responseText);
            }
        };
        xmlhttp.open("GET", "./data/hint.php?q=" + str, true);
        xmlhttp.send();
    }
}

function loadHint(id, name, img) {
    var row = $('<div class="col-md-6 hint-row"></div>');
    var row_img = $('<div class="col-md-3"></div>');
    var image = $('<a class="hint-img2" href="./single.html?id=' + id + '"><img class="hint-img" src=' + img + ' alt="No"></a>');
    var row_title = $('<div class="col-md-9"></div>');
    var title = $('<header class="hint-title"><a href="./single.html?id=' + id + '">' + name + '</a></header>');
    row_title.append(title);
    row_img.append(image);
    row.append(row_img, row_title);
    return row;
}
