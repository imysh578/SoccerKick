$("#register-btn").on("click", function () {
  let id = $("#user_id").val();
  let pw = $("#user_password").val();
  let name = $("#user_name").val();
  let email = $("#user_mail").val();

  let idregex = /^[a-z][a-z\d]{4,11}$/;
  let pwregex = /^[A-Za-z\d]{8,12}$/;
  let nameregex = /[가-힣]{2,}/;
  let emailregex = /.+@[a-z]+(\.[a-z]+){1,2}$/;

  let idregex = idregex.exec(id);
  if (idregex == null) {
    alert("아이디양식을 다시 확인해주세요");
    return;
  }
  let pwregex = pwregex.exec(pw);
  if (pwregex == null) {
    alert("비밀번호양식을 다시 확인해주세요");
    retrun;
  }
  let nameregex = nameregex.exec(name);
  if (nameregex == null) {
    alert("이름양식을 다시 확인해주세요");
    retrun;
  }
  let emailregex = emailregex.exec(email);
  if (emailregex == null) {
    alert("이메일양식을 다시 확인해주세요");
    retrun;
  }

  //빈칸 없을 때 제출.
  $("#register-btn").submit();
});
