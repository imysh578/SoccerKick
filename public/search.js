// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  boardListClick();
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
      // 마우스 클릭 시 해당 상세페이지이동.
      el.addEventListener("click", (e) => {
        e.preventDefault();
        switch (el.classList[1]) {
          case "team_section":
            const teamName = el.querySelector(
              ".board-list__info__name_1"
            ).textContent;
            if (teamName) {
              //if 없어도됨.
              window.location.href = `/team/detail/${teamName}`;
            }
            break;

          case "mercenary_section":
            const documentNumber = el.querySelector(
              ".board-list__info__name_2" //documentNumber 변수에 name_2로감싸진 '값'을 넣어준다. 이'값'은 글번호이다.
            ).textContent;
            window.location.href = `/mercenary_board/${documentNumber}`; //따온 글번호를 여따넣고 유동적으로 사이트 불러

            break;
          case "battle_section":
            const battle_board_postnumber = el.querySelector(
              ".board-list__info__name_3"
            ).textContent;
            if (battle_board_teamName) {
              window.location.href = `/battle_board`;
            }

            break;
        }
        // if(){
        // 	// 구단
        // 	const teamName = el.querySelector(
        // 		".board-list__info__name"
        // 	).textContent;
        // 	if (teamName) {
        // 		window.location.href = `/team/detail/${teamName}`;
        // 	}
        // } else if{
        // 	// 용병
        // } else if{
        // 	// 한판떠요
        // }
      });
    });
  }
}
