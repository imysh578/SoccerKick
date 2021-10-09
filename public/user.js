document.querySelectorAll("#user-list tr").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const userId = el.querySelector("td").textContent;
    if (userId) {
      getUserInfo(userId);
      console.log(userId);
    }
  });
});

async function getUserInfo(userId) {
  try {
    const res = await axios.get(`/user/${userId}`);
    const userInfo = res.data;
    const tbody = document.querySelector("#selected tbody");
    tbody.innerHTML = "";

    const tr = document.createElement("tr");
    for (const attr in userInfo[0]) {
      let td = document.createElement("td");
      td.textContent = userInfo[0][attr];
      tr.appendChild(td);
    }
    // 회원정보 수정
    const edit = document.createElement("button");
    edit.textContent = "회원정보수정";
    td = document.createElement("td");
    td.appendChild(edit);
    tr.appendChild(td);
    edit.addEventListener("click", (e) => {
      e.preventDefault;
      window.location.href = `user/edit/${userId}`;
    });
    // 회원탈퇴
    const remove = querySelector("#remove");
    remove.addEventListener("click", async (e) => {
      try {
        axios.delete(`/myPage/${userId}`);
      } catch (err) {
        console.error(err);
      }
    });

    tbody.appendChild(tr);
  } catch (err) {
    console.error(err);
  }
}
