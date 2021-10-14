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

document.querySelectorAll(".board-list__item").forEach((el) => {
  // 게시판의 글 목록 중 한 줄을 클릭하면
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = el.querySelector(".user__id").textContent.replace(/ /g, "");
    console.log(userId);
    if (userId) {
      window.location.href = `/user/myPage/${userId}`;
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
    });
  }
}
