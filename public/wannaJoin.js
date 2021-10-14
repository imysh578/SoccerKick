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
