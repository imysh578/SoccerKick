// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  boardListClick();
  //   removeBtnClick();
  backBtnClick();
});

// 뒤로가기 버튼
function backBtnClick() {
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      history.back();
    });
  }
}

// // 리스트 펼치기
// async function showList(post_num) {
//   try {
//     const res = await axios.get(`/team_board/${post_num}`);
//     const post_details = res.data[0];
//     // console.log(post_details);
//   } catch (err) {
//     console.error(err);
//   }
// }

// DB에 조회수 전송
async function updateViews(post_num, views) {
  try {
  } catch (err) {
    console.log(err);
  }
}

document.querySelectorAll(".board-list__item").forEach((el) => {
  // 게시판의 글 목록 중 한 줄을 클릭하면
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // querySelector는 [글번호, 글제목, 글쓴이, 게시일] 중
    // 첫번째 글번호만 가져오고 땡
    // 글번호를 POST_NUM에 집어넣음
    const POST_NUM = el.querySelector("a").textContent;
    console.log(POST_NUM);
    if (POST_NUM) {
      window.location.href = `/team_board/${POST_NUM}`;
    }
  });
});

// 게시물 클릭 및 마우스 hover 기능
function boardListClick() {
  const boardList = document.querySelectorAll(".board-list__item");
  if (boardList) {
    boardList.forEach((el) => {
      // 마우스 hover 색상 변경
      el.addEventListener("mouseover", (e) => {
        el.style.backgroundColor = "#8e4586bd";
        el.style.cursor = "pointer";
      });
      el.addEventListener("mouseout", (e) => {
        el.style.backgroundColor = "rgba(221, 221, 221, 0.9)";
      });
      //   // 마우스 클릭 시 구단 관리 페이지로 이동
      //   el.addEventListener("click", (e) => {
      //     e.preventDefault();
      //     const teamName = el.querySelector(
      //       ".board-list__info__name"
      //     ).textContent;
      //     if (teamName) {
      //       window.location.href = `/team/detail/${teamName}`;
      //     }
      //   });
    });
  }
}
