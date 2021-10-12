/************* 쿠키 함수 *************/
// 쿠키에 저장
function setCookie(name, value) {
	// key와 value를 각각 넣어줌, 이때 key 값이 같으면 value는 제일 마지막에 선언한 것으로 대체됨
	document.cookie = `${name}= ${value}`;
}

// 쿠키에서 불러오기
function getCookie(cname) {
	let name = cname + "=";
	// 쿠키 값을 디코딩
	let decodedCookie = decodeURIComponent(document.cookie);
	// ;를 기준으로 나눔
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		// 띄어쓰기가 앞에 있으면 제외하고 그 다음 문자열만 반환
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		// name이 c문자열의 맨 앞에 위치하면 그 뒤에 value값 반환
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}
function checkCookie() {
	let username = getCookie("username");
	if (username != "") {
		alert("Welcome again " + username);
	} else {
		username = prompt("Please enter your name:", "");
		if (username != "" && username != null) {
			setCookie("username", username, 365);
		}
	}
}

module.exports = { setCookie, getCookie, checkCookie };
