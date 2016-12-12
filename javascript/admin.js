function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function renderMemberTable(role) {
  $.ajax({
    type: "POST",
    data: {role},
    url: "controllers/handleRenderMember.php",
    success:function(data) {
      var memberList = JSON.parse(data);
      memberList.map(function(member) {
        return loadMember(member);
      })
    }
  });
}

function loadMember(member) {
  var tr = $('<tr></tr>');

  var username = $('<td class="tb">'+ member.username + '</td>');
  var email = $('<td class="tb">'+ member.email + '</td>');
  var phone = $('<td class="tb">'+ member.phone + '</td>');
  var age = $('<td class="tb">'+ member.age + '</td>');
  var role_td = $('<td class="tb"></td>');
  var role = $('<select class="form-control user-role" onchange="changeMemberRole(\''+ member.userID +'\')"></select>');

  if (member.role === "user") {
    var id = $('<td class="tb userID">'+ member.userID + '</td>');
    var delBtn = $('<td class="tb"><button class="btn btn-danger" onclick="removeMember(\''+member.userID+'\')">Xóa</button></td>');

    var role_user = $('<option value="user" selected>Thành viên</option>');
    var role_admin = $('<option value="admin">Quản trị viên</option>');
    role.append(role_user, role_admin);
    role_td.append(role);
    tr.append(id, username, email, phone, age, role_td, delBtn);
    $('#user-table').append(tr);
  }
  else {
    var id = $('<td class="tb userID">'+ member.userID + '</td>');

    var role_user = $('<option value="user">Thành viên</option>');
    var role_admin = $('<option value="admin" selected>Quản trị viên</option>');
    role.append(role_user, role_admin);
    role_td.append(role);
    tr.append(id, username, email, phone, age, role_td);
    $('#admin-table').append(tr);
  }
}

function removeMember(id) {
  var confirmed = confirm("Bạn có muốn xóa thành viên");
  if (confirmed) {
    $.ajax({
      type: "POST",
      url: "controllers/handleRemoveMember.php",
      data: {id},
      success: function(data) {
        if (data === "Record deleted successfully") {
          $('#user-table tr').each(function() {
            var removeID = $(this).find('.userID').text();
            if (removeID === id) {
              $(this.remove());
            }
          })
        }
        else {
          alert(data);
        }
      }
    });
  }
}
function changeMemberRole(userID) {
  $('.admin-page-table tr').each(function() {
    var temp_id = $(this).find('.userID').text();
    if (temp_id === userID) {
      var role = $(this).find('.user-role').val();
      $.ajax({
        type: "POST",
        url: "controllers/handleChangeRole.php",
        data: {userID, role},
        success: function(data) {
          try {
            var member = JSON.parse(data);
            if (role === "user") {
              $('#admin-table tr').each(function() {
                var removeID = $(this).find('.userID').text();
                if (removeID === userID) {
                  $(this.remove());
                }
              });
              loadMember(member);
            }
            else {
              $('#user-table tr').each(function() {
                var removeID = $(this).find('.userID').text();
                if (removeID === userID) {
                  $(this.remove());
                }
              });
              loadMember(member);
            }
          }
          catch (e) {
            alert(data);
          }
        }
      });
    }
  });
}
window.onload = function() {
  document.getElementById("defaultOpen").click();
  renderMemberTable("user");
  renderMemberTable("admin");
  loadStory();

}
