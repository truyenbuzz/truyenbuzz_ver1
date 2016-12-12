function openProfile(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

function loadProfileUser() {
    $.cookie.json = true;
    var currentUser = $.cookie('user');
    var userID = $('<input class="form-control" id="input-id" name="input-id" type="text" value="' + currentUser.userID + '" readonly = "true"/>');

    var userName = $('<input class="form-control" id="input-name" name="input-name" type="text" value="' + currentUser.username + '" required/>');
    var errorName = $('<span id="errorName" class="error">  * Tên gồm 2 - 30 ký tự</span>');

    var email = $('<input class="form-control" id="input-email" name="input-email" type="text" value="' + currentUser.email + '" readonly = "true"/>');

    var phone = $('<input class="form-control" id="input-phone" name="input-phone" type="text" value="' + currentUser.phone + '" />');
    var errorPhone = $('<span id="errorPhone" class="error">  Chỉ chứa số</span>');

    var birthdate = $('<input class="form-control" id="input-birthdate" name="input-date" type="text" value="' + currentUser.age + '" />');
    var errorDate = $('<span id="errorDate" class="error">  * Định dạng dd/mm/yyyy</span>');

    var pass = $('<input class="form-control" id="input-pass" name="input-pass" type="password" value="' + currentUser.pass + '" required/>');
    var errorPass = $('<span id="errorPass" class="error">  * Mật khẩu gồm 8 ký tự trở lên</span>');

    var repass = $('<input class="form-control" id="input-repass" name="input-repass" type="password" value="' + currentUser.pass + '" required/>');
    var errorRePass = $('<span id="errorRePass" class="error">  * Mật khẩu phải khớp</span>');

    $('#field-id').append(userID);
    $('#field-name').append(userName, errorName);
    $('#field-birthdate').append(birthdate, errorDate);
    $('#field-email').append(email);
    $('#field-phone').append(phone, errorPhone);
    $('#field-pass').append(pass, errorPass);
    $('#field-repass').append(repass,errorRePass);
    if (currentUser.profileImg != "") {
        $('#profile-pic').attr('src', currentUser.profileImg);
    }
}

// function updateInfo(email, userName, pass, phone, birthdate, userID) {
//     $.ajax({
//         type: 'POST',
//         url: "http://localhost/Ass/Assignment1_BaiLam/controllers/handleChangeUserData.php",
//         data: {
//             name: userName,
//             pass: pass,
//             email: email,
//             phone: phone,
//             age: birthdate,
//             userID: userID
//         },
//         success: function(data) {
//             alert(data);
//             $('#update-mess').text("aaaa");
//         }
//     });
// }
//
// function changeUserData() {
//     $.cookie.json = true;
//     var currentUser = $.cookie('user');
//     var userName = $('#input-name').val();
//     var pass = $('#input-pass').val();
//     var phone = $('#input-phone').val();
//     var birthdate = $('#input-birthdate').val();
//     var email = $('#input-email').val();
//     var userID = currentUser.userID;
//     if (checkUserInput(email, userName, pass, phone, birthdate)) {
//         updateInfo(email, userName, pass, phone, birthdate, userID);
//     } else console.log("aa");
//     return false;
// }

function checkUserInput() {
    var userName = $('#input-name').val();
    var pass = $('#input-pass').val();
    var phone = $('#input-phone').val();
    var birthdate = $('#input-birthdate').val();
    var email = $('#input-email').val();
    var img = $('#image').val();
    var repass = $('#input-repass').val();

    var imgExt = ['png', 'jpeg', 'jpg'];
    var userNamePattern = /^([a-zA-Z0-9 ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+(_|\s)?)+$/;
    var passPattern = /^(.){8,}$/;
    var emailPattern = /^(([a-zA-Z0-9]+(\.?))+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+)$/;
    var phonePattern = /^([0-9]{8,})$/;
    var birthdatePattern = /^([0-3][0-9]\/[01][0-9]\/[12][0-9]{3})$/;

    var completed = true;

    $('#errorName').text("");
    $('#errorPass').text("");
    $('#errorEmail').text("");
    $('#errorPhone').text("");
    $('#errorDate').text("");
    $('#errorImg').text("");
    $('#errorRePass').text("");

    if (imgExt.indexOf(img.split('.')[1]) < 0 && img.length > 0) {
        $('#errorImg').text('Ảnh nhập sai định dạng').css("color", "red");
        completed = false;
    }

    if (!userNamePattern.test(userName) || userName.length < 2 || userName.length > 30) {
        $('#errorName').text('Tên không hợp lệ').css("color", "red");
        completed = false;
    }

    if (!passPattern.test(pass)) {
        $('#errorPass').text('Mật khẩu không hợp lệ').css("color", "red");
        completed = false;
    }
    if (pass !== repass) {
        $('#errorRePass').text('Mật khẩu không khớp').css("color", "red");
        completed = false;
    }

    if (!phonePattern.test(phone)) {
        if (phone.length > 0) {
            $('#errorPhone').text('Số điện thoại không hợp lệ').css("color", "red");
            completed = false;
        }
    }

    if (!birthdatePattern.test(birthdate)) {
        if (birthdate.length > 0) {
            $('#errorDate').text('Ngày sinh không hợp lệ').css("color", "red");
            completed = false;
        }
    } else {
        if (birthdate.length > 0) {
            var birth = birthdate.split('/');
            var day = Number(birth[0]);
            var month = Number(birth[1]);
            var year = Number(birth[2]);
            var date = new Date(year, month - 1, day);
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
                $('#errorDate').text('Không có ngày này').css("color", "red");
                completed = false;
            }
        }
    }

    if (!emailPattern.test(email)) {
        $('#errorEmail').text('Email không hợp lệ').css("color", "red");
        completed = false;
    }

    if (!completed) {
        return false;
    }
    return true;
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#profile-pic').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(e) {
    $('#profile-form').on('submit', (function(e) {
        e.preventDefault();
        if (checkUserInput()) {
            $.ajax({
                type: "POST",
                url: "controllers/handleChangeUserData.php",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    if (data == 'invalid file') {
                        alert("Invalid file format");
                    } else {
                        var result = JSON.parse(data);
                        $.cookie.json = true;
                        $.cookie("user", result);
                        alert("Cập nhật thành công");
                    }
                }
            });
        }
    }));
});

window.onload = function() {
    document.getElementById("defaultOpen").click();
    loadGenreDropDown();
    loadProfileUser();
    checkLogin();
    loadFavorite();
}
