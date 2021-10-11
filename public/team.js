document.querySelectorAll(".board-list__item").forEach((el) => {
	// 마우스 올렸을때 게시물 색상 변경
	el.addEventListener("mouseover", (e) => {
		el.style.backgroundColor = "#8e45865e";
		el.style.cursor = "pointer";
	});
	// 마우스 지나가면 게시물 색상 원상 복귀
	el.addEventListener("mouseout", (e) => {
		el.style.backgroundColor = "transparent";
	});
	// 마우스 클릭 시 구단 관리 페이지로 이동
	el.addEventListener("click", (e) => {
		e.preventDefault();
		const teamName = el.querySelector(".board-list__info__name").textContent;
		if (teamName) {
			window.location.href = `/team/detail/${teamName}`;
		}
	});
});
