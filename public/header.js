document.addEventListener("DOMContentLoaded", function () {
  scrollStyleChange();
});

function scrollStyleChange() {
  window.addEventListener(
    "scroll",
    function (event) {
      if (window.scrollY) {
        document.querySelector(".top-nav").style.backgroundColor = "#ddd";
        document.querySelector(".search-bar").style.color = "#8e4585";
      } else {
        document.querySelector(".top-nav").style.backgroundColor = "#e9e9e93d";
        document.querySelector(".search-bar").style.color = "#eee";
      }
    },
    false
  );
}

document.querySelectorAll("inTeam").forEach((el) => {});
