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