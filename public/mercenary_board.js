document.querySelectorAll("#mercenary_recruitment").forEach((el) => {
  el.addEventListener("click", (e) => {
    console.log(1);
    e.preventDefault();
    // const teamName = el.querySelector("td").textContent;
    // if (teamName) {
    //   getTeamInfo(teamName);
    // }
  });
});

async function getTeamInfo(mercenary_board) {
  try {
    const res = await axios.get(`/mercenary_board/${mercenary_board}`);
    const teamInfo = res.data;
    const tbody = document.querySelector("#selected tbody");
    tbody.innerHTML = "";

    const tr = document.createElement("tr");
    for (const attr in teamInfo[0]) {
      let td = document.createElement("td");
      td.textContent = teamInfo[0][attr];
      tr.appendChild(td);
    }
    const join = document.createElement("button");
    join.textContent = "가입 신청";
    td = document.createElement("td");
    td.appendChild(join);
    tr.appendChild(td);

    const edit = document.createElement("button");
    edit.textContent = "구단 관리";
    td = document.createElement("td");
    td.appendChild(edit);
    tr.appendChild(td);
    edit.addEventListener("click", (e) => {
      e.preventDefault();
      teamName = teamInfo[0].team_name;
      // console.log(teamName);
      window.location.href = `/teams/edit/${teamName}`;
    });

    tbody.appendChild(tr);
  } catch (err) {
    console.error(err);
  }
}
