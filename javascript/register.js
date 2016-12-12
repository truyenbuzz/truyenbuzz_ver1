function checkRegisterInput(username, pass, repass, email) {
  var usernamePattern = /^([a-zA-Z0-9 ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+(_|\s)?)+$/;
  var passPattern = /^(.){8,}$/;
  var emailPattern = /^(([a-zA-Z0-9]+(\.?))+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+)$/;
  var completed = true;
  $('#errorUser').text("");
  $('#errorPass').text("");
  $('#errorRepass').text("");
  $('#errorEmail').text("");
  if (!usernamePattern.test(username) || username.length < 2 || username.length > 30) {
    $('#errorUser').text('Chỉ cho phép kí tự và số').css("color","red");
    completed = false;
  }
  if (!passPattern.test(pass)) {
    $('#errorPass').text('Ít nhất 8 kí tự').css("color","red");
    completed = false;
  }
  if (pass !== repass) {
    $('#errorRepass').text('Mật khẩu không khớp').css("color","red");
    completed = false;
  }
  if (!emailPattern.test(email)) {
    $('#errorEmail').text('Email không hợp lệ').css("color","red");
    completed = false;
  }
  return completed;
}

function postRegisInfo(username, pass, email) {
  $.ajax({
    type: "POST",
    url: "controllers/handleRegister.php",
    data: {
      name: username,
      pass: pass,
      email: email
    },
    success: function(data) {
      $('#errorEmail').text("");
      $('#regis-mess').text("");
      if (data === "already had") {
        $('#errorEmail').text("Email này đã có người sử dụng").css("color","red");
      }
      else {
        $('#regis-mess').text("Đăng ký thành công").css({"color": "green", "font-size": "20px", "margin-top": "20px"});
        $('#register')[0].reset();
      }
    }
  });
}

function handleRegister() {
  var username = $('#regis-username').val();
  var pass = $('#regis-pass').val();
  var repass = $('#regis-repass').val();
  var email = $('#regis-email').val();
  if(checkRegisterInput(username, pass, repass, email)) {
    postRegisInfo(username, pass, email);
  }
  return false;
}
