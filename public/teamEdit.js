let delBtn = document.getElementById('delete-btn');

delBtn.addEventListener('click', (e)=>{
  deleteTeam(delBtn.value); 
  window.location.href = `/teams`;
})

async function deleteTeam(teamName){
  try {
    const res = await axios.delete(`/teams/edit/${teamName}/delete`);
  } catch (err) {
    console.error(err);
  }
}