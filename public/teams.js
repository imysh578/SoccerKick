document.querySelectorAll('#team-list tr').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    const teamName = el.querySelector('td').textContent;
    if(teamName) {
      getTeamInfo(teamName);
    }
  });
});

// 구단 상세 정보 불러오기 함수
async function getTeamInfo(teamName){
  try {
    const res = await axios.get(`/teams/${teamName}`);
    const teamInfo = res.data[0];
    const tbody = document.querySelector('#selected tbody');
    tbody.innerHTML = '';
    
    // 행 만들기
    const tr = document.createElement('tr');
    for (const attr in teamInfo) {
      // 각 열에 들어갈 데이터 입력
      let td = document.createElement('td');
      td.textContent = teamInfo[attr];
      tr.appendChild(td);
    }

    // 가입신청 버튼
    const join = document.createElement('button');
    join.textContent = "가입 신청";
    td = document.createElement('td');
    td.appendChild(join);
    tr.appendChild(td);
    
    // 구단 관리 버튼
    const edit = document.createElement('button');
    edit.textContent = "구단 관리";
    td = document.createElement('td');
    td.appendChild(edit);
    tr.appendChild(td);

    // 구단 관리 버튼 이벤트
    edit.addEventListener('click', (e)=>{
      e.preventDefault();
      window.location.href = `/teams/edit/${teamName}`;
    })

    tbody.appendChild(tr);
  } catch (err) {
    console.error(err);
  }
}


