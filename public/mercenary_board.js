console.log("나 준비됐어");
dateMaker(document.querySelectorAll(".mercenary_recruitment tr"));

// $("#mercenary_recruitment").click(function () {
//   $(".mercenary_recruitment").show();
//   $(".mercenary_want").hide();
//   dateMaker($(".mercenary_recruitment_list"));
// });
// $("#mercenary_want").click(function () {
//   $(".mercenary_recruitment").hide();
//   $(".mercenary_want").show();
//   dateMaker($(".mercenary_want_list"));
// });
// 날짜형식 만들기

document.querySelectorAll(".tab-btn").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.id == "구해요") {
      document.querySelectorAll(".구해요").forEach((el) => {
        el.hidden = false;
      });
      document.querySelectorAll(".할래요").forEach((el) => {
        el.hidden = true;
      });
    } else if (e.target.id == "할래요") {
      document.querySelectorAll(".구해요").forEach((el) => {
        el.hidden = true;
      });
      document.querySelectorAll(".할래요").forEach((el) => {
        el.hidden = false;
      });
    }
  });
});

// 날짜형식 새로 만들기
function dateMaker(e) {
  // 게시판 글목록의 행의 길이(개수)를 구해 length에 저장
  let length = e.length;

  // for문으로 글목록의 길이만큼 반복
  for (let index = 1; index <= length; index++) {
    // 글목록 하나하나에 class명을 1부터 넣어 DATE_INFO에 저장
    let DATE_INFO = document.querySelector(`.date_info${index}`).textContent;
    // DATE_INFO를 new Date로 string에서 날짜 object로 type 변환
    let conversion = new Date(DATE_INFO);
    // 연-월-일 시:분 으로 만들어주기
    var year = conversion.getFullYear();
    var month = ("0" + (conversion.getMonth() + 1)).slice(-2);
    var day = ("0" + conversion.getDate()).slice(-2);
    var hours = ("0" + conversion.getHours()).slice(-2);
    var minutes = ("0" + conversion.getMinutes()).slice(-2);
    var dateString = `${year}-${month}-${day} ${hours}:${minutes}`;
    // 각 글목록의 날짜자리에 만든 날짜 집어넣기
    document.querySelector(`.date_info${index}`).textContent = dateString;
  }
}

document.querySelectorAll(".mercenary_recruitment tr").forEach((el) => {
  // 게시판의 글 목록 중 한 줄을 클릭하면
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // querySelector는 [글번호, 글제목, 글쓴이, 게시일] 중
    // 첫번째 td인 글번호만 가져오고 땡
    // 글번호를 documentNumber에 집어넣음
    const documentNumber = el.querySelector("td").textContent;
    if (documentNumber) {
      window.location.href = `/mercenary_board/content/${documentNumber}`;
    }
  });
});
