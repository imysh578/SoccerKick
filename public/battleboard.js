//목록부분에 클릭이벤트 넣기.
document.querySelectorAll("#battle-list tr").forEach((el) => {
    el.addEventListener("click", function () {
        const battle_board_teamName = el.querySelector("td").textContent;
        if (battle_board_teamName) {
            getBattleInfo(battle_board_teamName);
            console.log(1);
        }
    });
});

async function getBattleInfo(battle_board_teamName) {
    try {
        const res = await axios.get(`/battle_board/${battle_board_teamName}`); // /battle_board/(해당부분) 주소
        const battleInfo = res.data;
        const tbody = document.querySelector("#selected tbody"); //비어있는 부분, 여기에 클릭한것 보여줄거임.
        tbody.innerHTML = "";

        const tr = document.createElement("tr"); //json형태의 키들을 추출
        for (const attr in battleInfo[0]) {
            let td = document.createElement("td");
            td.textContent = battleInfo[0][attr];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    } catch (err) {
        console.error(err);
    }
}
