// Handler when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
	boardListClick();
	removeBtnClick();
	backBtnClick();
	createBtnClick();
	fileUploadBtnClick();
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
			// 마우스 클릭 시 구단 관리 페이지로 이동
			el.addEventListener("click", (e) => {
				e.preventDefault();
				const teamName = el.querySelector(
					".board-list__info__name"
				).textContent;
				if (teamName) {
					window.location.href = `/team/detail/${teamName}`;
				}
			});
		});
	}
}

// 삭제 버튼
function removeBtnClick() {
	const removeBtn = document.querySelector(".delete-btn");
	if (removeBtn) {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			async function deleteTeam() {
				try {
					const teamName = document.querySelector("#team-name").value;
					const res = await axios.delete(
						`/team/detail/${teamName}/edit/delete`
					);
				} catch (err) {
					console.error(err);
				}
			}
			deleteTeam();
			window.location.href = `/`;
		});
	}
}

// 뒤로가기 버튼
function backBtnClick() {
	const backBtn = document.querySelector(".back-btn");
	if (backBtn) {
		backBtn.addEventListener("click", () => {
			history.back();
		});
	}
}

// 생성 버튼
function createBtnClick() {
	const createBtn = document.querySelector(".create-btn");
	if (createBtn) {
		createBtn.addEventListener("click", () => {
			// window.location.href = "/";
		});
	}
}

// 파일 업로드
function fileUploadBtnClick() {
	const uploadBtn = document.querySelector("#ex_filename");
	if (uploadBtn) {
		uploadBtn.addEventListener("change", () => {
			const fileName = document
				.querySelector(".upload-hidden")
				.value.split("/")
				.pop()
				.split("\\")
				.pop();
			if (fileName) {
				document.querySelector(".upload-name").value = fileName;
			} else {
				document.querySelector(".upload-name").value = "파일 선택";
			}
		});
	}
}

// document.querySelector(".submit-btn").addEventListener("click", (e) => {
// 	e.preventDefault();
// 	async function edit() {
// 		document.querySelectorAll(".detail-info input").forEach((el) => {
// 			const placeholder = el.placeholder;
// 			const value = el.value;
// 			if (!value) {
// 				el.value = placeholder;
// 			}
// 		});
// 		const teamName = document.querySelector("#team-name").value;
// 		console.log(Date.now());
// 		console.log("*************");
// 		await axios.post(`/team/detail/${teamName}/edit`);
// 		// window.location.href = `/team/detail`;
// 	}
// 	edit();
// });
