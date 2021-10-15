// DOM이 모두 올라왔을 때 아래 실행
document.addEventListener("DOMContentLoaded", function () {
	boardListClick();
	removeBtnClick();
	backBtnClick();
	// createBtnClick();
	fileUploadBtnClick();
	signupBtnClick();
	FailToLoadFile();
});

// 사진 로딩 실패 했을때
function FailToLoadFile() {
	const img = document.querySelectorAll(".image");
	img.forEach((el) => {
		el.addEventListener("onError", function (e) {
			e.target.src = "/images/question-mark.png";
		});
	});
}

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

// 가입 신청 버튼
function signupBtnClick() {
	const signupBtn = document.querySelector(".signup-btn");
	if (signupBtn) {
		signupBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const teamName = document.querySelector("#team-name").textContent;
			window.location.href = `/team/detail/${teamName}/join`;
			window.alert("가입 신청이 완료되었습니다.");
		});
	}
}

// 삭제 버튼
function removeBtnClick() {
	const removeBtn = document.querySelector(".delete-btn");
	if (removeBtn) {
		removeBtn.addEventListener("click", (e) => {
			e.preventDefault();
			if (
				window.confirm(
					"피와 땀으로 만들어진 당신의 구단이 사라집니다." +
						"\n" +
						"계속 하시겠습니까?"
				)
			) {
				if (window.confirm("진심이세요? 정말 삭제하실건가요?")) {
					if (window.confirm("팀원 버려? 팀원버려???!?")) {
						async function deleteTeam() {
							try {
								const teamName = document.querySelector("#team-name").value;
								window.location.href = `/team/detail/${teamName}/edit/delete`;
							} catch (err) {
								console.error(err);
							}
						}
						deleteTeam();
						window.alert("삭제 되었습니다. 퉤");
						window.location.href = `/team`;
					} else {
						history.back();
					}
				} else {
					history.back();
				}
			} else {
				history.back();
			}
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
				document.querySelector(".title-box img").src = `/images/${fileName}`;
			} else {
				document.querySelector(".upload-name").value = "파일 선택";
				document.querySelector(
					".title-box img"
				).src = `/images/team-logo-empty.png`;
			}
		});
	}
}
