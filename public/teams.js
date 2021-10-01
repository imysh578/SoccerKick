// 팀 리스트 불러오기
async function getTeamlist(){
  try {
    const res = await axios.get('/teams');
    const teams = res.data;
    const tbody = document.querySelector('#team-list-2 tbody');
    tbody.innerHTML = '';
    
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('team-create-form').addEventListener('submit', async(e)=>{
  e.preventDefault();
  const team_name = e.target.team_name.value;
  const team_homeGround = e.target.team_homeGround.value;
  const team_headCount = e.target.team_headCount.value;
  const team_area = e.target.team_area.value;
  // try {
  //   getTeamlist();
  // } catch (err) {
  //   console.error(err);
  // }
  console.log(team_name)
  e.target.team_name = '';
  e.target.team_homeGround = '';
  e.target.team_headCount = '';
  e.target.team_area = '';
})


// 삭제 버튼

document.querySelectorAll('.del-btn').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target.parentNode.parentNode.querySelectorAll('td')[1].textContent);
    // e.target.parentNode.parentNode.remove();
    
    
  })
})

// document.getElementsByClassName("team-info")[0].addEventListener('click',async(e)=>{
//   e.preventDefault();
//   const team_name = e.target.id;
//   console.log(team_name)
// })