// 날짜형식 만들기
// 게시판 글목록의 행의 길이(개수)를 구해 length에 저장
let length = document.querySelectorAll(".mercenary_recruitment tr").length;
// for문으로 글목록의 길이만큼 반복
for (let index = 1; index <= length; index++) {
  // 글목록 하나하나에 class명을 1부터 넣어 DATE_INFO에 저장
  let DATE_INFO = document.querySelector(`.date_info${index}`).textContent;
  // DATE_INFO를 new Date로 string에서 날짜 object로 type 변환
  let conversion = new Date(DATE_INFO);
  // 연-월-일 시:분 으로 반들어주기
  var year = conversion.getFullYear();
  var month = ("0" + (conversion.getMonth() + 1)).slice(-2);
  var day = ("0" + conversion.getDate()).slice(-2);
  var hours = ("0" + conversion.getHours()).slice(-2);
  var minutes = ("0" + conversion.getMinutes()).slice(-2);
  var dateString = `${year}-${month}-${day} ${hours}:${minutes}`;
  // 각 글목록의 날짜자리에 만든 날짜 집어넣기
  document.querySelector(`.date_info${index}`).textContent = dateString;
}

document.querySelectorAll("#mercenary_recruitment").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const documentNumber = el.querySelector("td").textContent;
    if (documentNumber) {
      getTeamInfo(documentNumber);
    }
  });
});

document.querySelectorAll(".mercenary_recruitment tr").forEach((el) => {
  // 게시판의 글 목록 중 한 줄을 클릭하면
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // querySelector는 [글번호, 글제목, 글쓴이, 게시일] 중
    // 첫번째 td인 글번호만 가져오고 땡
    // 글번호를 documentNumber에 집어넣음
    const documentNumber = el.querySelector("td").textContent;
    if (documentNumber) {
      // getTeamInfo(documentNumber);
      window.location.href = `/mercenary_board/content/${documentNumber}`;
    }
  });
});

// 구단 상세 정보 불러오기 함수
async function getTeamInfo(documentNumber) {
  try {
    // (클릭한) 행의 데이터베이스를 '전부' 가져옴
    const res = await axios.get(`/mercenary_board/${documentNumber}`);
    // 가져온 res 데이터베이스의 data[0], 테이블에 있는
    // mercenary_board_title과 mercenary_board_content 열의
    // 값들을 변수 documentTitle, documentContent 에 각각 집어넣음
    const documentTitle = res.data[0].mercenary_board_title;
    const documentContent = res.data[0].mercenary_board_content;
    const titleTbody = document.querySelector("#mercenary_recruitment-title");
    const contentTbody = document.querySelector(
      "#mercenary_recruitment-content"
    );
    titleTbody.innerHTML = "";
    contentTbody.innerHTML = "";

    // 행 만들기
    let titleTr = document.createElement("tr");
    // 각 열에 들어갈 데이터 입력
    let titleTd = document.createElement("td");
    console.log(titleTr);
    console.log(titleTd);
    titleTd.textContent = documentTitle;
    console.log(titleTd.textContent);
    titleTr.appendChild(titleTd);

    titleTbody.appendChild(titleTr);

    // 행 만들기
    let contentTr = document.createElement("tr");
    // 각 열에 들어갈 데이터 입력
    let contentTd = document.createElement("td");
    console.log(contentTr);
    console.log(contentTd);
    contentTd.textContent = documentContent;
    console.log(contentTd.textContent);
    contentTr.appendChild(contentTd);

    contentTbody.appendChild(contentTr);
  } catch (err) {
    console.error(err);
  }
}
