document.querySelectorAll('#team-list tr').forEach(el=>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    const teamName = el.querySelector('td').textContent;
    // console.log(teamName);
    if(teamName) {
      getTeamInfo(teamName);
    }
  });
});

async function getTeamInfo(teamName){
  try {
    const res = await axios.get(`/teams/${teamName}`);
    const teamInfo = res.data;
    const tbody = document.querySelector('#selected tbody');
    tbody.innerHTML = '';

    teamInfo.map((team)=>{
      const tr = document.createElement('tr');
      for (const attr in team) {
        let td = document.createElement('td');
        td.textContent = team[attr];
        tr.appendChild(td);
      }

      const join = document.createElement('button');
      join.textContent = "가입 신청";
      td = document.createElement('td');
      td.appendChild(join);
      tr.appendChild(td);
      
      const edit = document.createElement('button');
      edit.textContent = "구단 관리";
      td = document.createElement('td');
      td.appendChild(edit);
      tr.appendChild(td);
      
      
      tbody.appendChild(tr);
    })
  } catch (err) {
    console.error(err);
  }
}

