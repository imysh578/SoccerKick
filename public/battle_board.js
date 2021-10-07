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
    try {
        const res = await axios.get(`/battle_board/${battle_board_teamName}`); // /battle_board/(해당부분) 주소
        const battleInfo = res.data[0]; //배틀인포 변수에 배틀보드 테이블내용들 저장
        const tbody = document.querySelector("#selected tbody"); //비어있는 부분변수지정 여기에 클릭한것 보여줄거임.
        tbody.innerHTML = "";   //클릭시 쌓이지 않도록.
        console.log(battleInfo) //f12콘솔창에보면 객체의 첫번째 값([0])으로나옴.

        const tr = document.createElement("tr"); //createElement로 row(행)를 만들어줌
        for (const attr in battleInfo) {    
            let td = document.createElement("td");//열생성
            td.textContent = battleInfo[attr]; //각 열에 들어갈 데이터 입력
            tr.appendChild(td);//생성된 row에  td를 append()(요소나 컨텐츠추가)해준다
            console.log(battleInfo[attr])
        }//여기까지 상세보기를 for문으로 돌려서.

        

        //글 수정 버튼 생성 및 설정
        const edit = document.createElement('button');  //edit 콘솔로그는 <button></button>
        td=document.createElement('td')
        edit.textContent ="글 수정" //문자넣는 textcontent
        td.appendChild(edit); //edit을 td(열)에 넣고
        tr.appendChild(td); //td(열)을 행에 추가

        //글 수정 버튼 관리 이벤트
        edit.addEventListener('click', (e)=>{   //?
            e.preventDefault(); //?
            window.location.href = `/battle_board/edit/${battle_board_teamName}`; //라우터 설정해줄것.
        })
        
        // 글 삭제 버튼 생성
        const delBtn = document.createElement('button');
        delBtn.textContent = "글 삭제";
        td = document.createElement('td');
        td.appendChild(delBtn);
        tr.appendChild(td);

        
        tbody.appendChild(tr);  // 비어있는tbody부분에 append()해준다
    } catch (err) {
        console.error(err);
    }
}
