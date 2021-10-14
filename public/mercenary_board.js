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
      window.location.href = `/mercenary_board/${POST_NUM}`;
    }
  });
});

document.querySelectorAll(".tab-btn").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.id == "want_player") {
      document.querySelectorAll(".want_player").forEach((el) => {
        el.hidden = false;
      });
      document.querySelectorAll(".want_to_play").forEach((el) => {
        el.hidden = true;
      });
    } else if (e.target.id == "want_to_play") {
      document.querySelectorAll(".want_player").forEach((el) => {
        el.hidden = true;
      });
      document.querySelectorAll(".want_to_play").forEach((el) => {
        el.hidden = false;
      });
    }
  });
});
