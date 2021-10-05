//목록부분에 클릭이벤트 넣기.
document.querySelectorAll("#battle-list tr").forEach((el) => {
    el.addEventListener("click", function () {
        const battle_board_teamName = el.querySelector("td").textContent;
        if (battle_board_teamName) {
            getBattleInfo(battle_board_teamName);
        }
    });
});

// 상세 정보 불러오기 함수
async function getBattleInfo(battle_board_teamName) {
    try {//변수 지정해주자.
        const res = await axios.get(`/battle_board/${battle_board_teamName}`); // /battle_board/(해당부분) 주소
        const battleInfo = res.data[0]; //배틀인포 변수에 배틀보드 테이블내용들 저장
        const tbody = document.querySelector("#selected tbody"); //비어있는 부분, 여기에 클릭한것 보여줄거임.
        tbody.innerHTML = "";   //클릭시 쌓이지 않도록.
        console.log(battleInfo) //f12콘솔창에보면 객체의 첫번째 값([0])으로나옴.

        const tr = document.createElement("tr"); //createElement로 row(행)를 만들어줌
        for (const attr in battleInfo) {    
            let td = document.createElement("td");
            td.textContent = battleInfo[attr];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    } catch (err) {
        console.error(err);
    }
}
