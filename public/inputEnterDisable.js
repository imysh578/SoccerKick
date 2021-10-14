document.querySelectorAll("input").forEach((el) => {
  el.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      return false;
    }
  });
});
