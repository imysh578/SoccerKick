document.querySelectorAll("#team-board-list tr").forEach((el) => {
	el.addEventListener("click", (e) => {
		e.preventDefault();
		const postNo = el.querySelector("td").textContent;
		const hidden = document.querySelector(`#hidden-${postNo}`);
		console.log(hidden);

		showList(postNo);
		// toggle을 hidden 속성으로 구현
		if (hidden) {
			if (hidden.hidden) {
				console.log("펼치기");
				hidden.hidden = false;
				let views = document.querySelector(`#views-${postNo}`).textContent;
				document.querySelector(`#views-${postNo}`).textContent = ++views;
				updateViews(postNo, views);
			} else {
				console.log("닫기");
				hidden.hidden = true;
			}
		}
	});
});

// 리스트 펼치기
async function showList(postNo) {
	try {
		const res = await axios.get(`/team_board/${postNo}`);
		const post_details = res.data[0];
		// console.log(post_details);
	} catch (err) {
		console.error(err);
	}
}

// DB에 조회수 전송
async function updateViews(postNo, views) {
	try {
		await axios.post(`/team_board/${postNo}`, { views: views });
	} catch (err) {
		console.log(err);
	}
}
