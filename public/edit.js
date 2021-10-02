document.getElementById("edit_button").addEventListener("click", (e) => {
    e.preventDefault();
});

async function edit_user(user_id) {
    try {
        const res = await axios.get(`/user/${user_id}`);
    } catch (err) {}
}
