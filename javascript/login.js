function checkInput(loginName, password) {
  var pattern = /^(([a-zA-Z0-9]+(\.?))+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+)$/;
  var completed = true;
  $('#login-mess').text("");
  if (password.length < 8) {
      completed = false;
  }
  if (!pattern.test(loginName)) {
      completed = false;
  }
  if (!completed) {
    $('#login-mess').text("Email hoặc mật khẩu không hợp lệ");
    return false;
  }
  return true;
}
function postInfo(loginName, password) {
  $.ajax({
    type: "POST",
    url: "controllers/handleLogin.php",
    data: {
            name: loginName,
            pass: password
          },
    success: function(data) {
        var result = JSON.parse(data);
         if (result.isLogined === 1) {
            $.cookie.json = true;
            $.cookie("user", result);
            history.back();
         }
         else {
           $('#login-mess').text("Email hoặc mật khẩu không đúng");
         }
    }
  });
}

function handleSubmit() {
  var loginName = $('#loginName').val();
  var password = $('#password').val();
  if(checkInput(loginName, password)) {
      postInfo(loginName,password);
  }
  return false;
}
