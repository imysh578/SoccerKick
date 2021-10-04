let delBtn = document.getElementById('delete-btn');
if(delBtn){
  delBtn.addEventListener('click', (e)=>{
    // e.defaultPrevented();
    deleteTeam(delBtn.value); 
    window.location.href = `/teams`;
  })
}

async function deleteTeam(teamName){
  try {
    const res = await axios.get(`/teams/edit/${teamName}/delete`);
  } catch (err) {
    console.error(err);
  }
}