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
    console.log(teamInfo);
    const tbody = document.querySelector('#selected tbody');
    tbody.innerHTML = '';

    teamInfo.map((team)=>{
      const tr = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = team.team_name;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_leaderId;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_homeGround;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_headCount;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_info;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_manner;
      tr.appendChild(td);
      td = document.createElement('td');
      td.textContent = team.team_area;
      tr.appendChild(td);

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

