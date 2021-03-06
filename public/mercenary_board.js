// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
	listMouseHover();
	listClick();
	tabClick();
});
function listClick() {
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
}

// 게시물 클릭 및 마우스 hover 기능
function listMouseHover() {
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

function tabClick() {
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
}
