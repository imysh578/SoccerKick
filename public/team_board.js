document.querySelectorAll("#team-board-list tr").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const post_num = el.querySelector("td").textContent;
    const hidden = document.querySelector(`#hidden-${post_num}`);
    console.log(hidden);

    showList(post_num);
    // toggle을 hidden 속성으로 구현
    if (hidden) {
      if (hidden.hidden) {
        console.log("펼치기");
        hidden.hidden = false;
        let views = document.querySelector(`#views-${post_num}`).textContent;
        document.querySelector(`#views-${post_num}`).textContent = ++views;
        updateViews(post_num, views);
      } else {
        console.log("닫기");
        hidden.hidden = true;
      }
    }
  });
});

// 리스트 펼치기
async function showList(post_num) {
  try {
    const res = await axios.get(`/team_board/${post_num}`);
    const post_details = res.data[0];
    // console.log(post_details);
  } catch (err) {
    console.error(err);
  }
}

// DB에 조회수 전송
async function updateViews(post_num, views) {
  try {
    await axios.post(`/team_board/${post_num}`, { views: views });
  } catch (err) {
    console.log(err);
  }
}

document.querySelectorAll(".board-list__info__name").forEach((el) => {
  // 게시판의 글 목록 중 한 줄을 클릭하면
  el.addEventListener("click", (e) => {
    e.preventDefault();
    // querySelector는 [글번호, 글제목, 글쓴이, 게시일] 중
    // 첫번째 td인 글번호만 가져오고 땡
    // 글번호를 POST_NUM에 집어넣음
    const POST_NUM = el.querySelector("a").textContent;
    if (POST_NUM) {
      window.location.href = `/mercenary_board/content/${POST_NUM}`;
    }
  });
});
