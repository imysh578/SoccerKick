const User = require("../models/users");
const Team = require("../models/teams");

function members(model, attr) {
  const date = [];
  function fotrmatted_date(raw_date) {
    let year = String(raw_date.getFullYear());
    let month = String(raw_date.getMonth() + 1);
    let day = String(raw_date.getDate());
    let hour = String(raw_date.getHours());
    let min = String(raw_date.getMinutes());
    let sec = String(raw_date.getSeconds());

    if (month.length < 2) month = ("0" + month).slice(-2);
    if (day.length < 2) day = ("0" + day).slice(-2);
    if (hour.length < 2) hour = ("0" + hour).slice(-2);
    if (min.length < 2) min = ("0" + min).slice(-2);
    if (sec.length < 2) sec = ("0" + sec).slice(-2);

    const result = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    return result;
  }

  model.forEach((el) => {
    const raw_date = el.dataValues[attr];
    date.push(fotrmatted_date(raw_date));
  });
  return date;
}

module.exports = members;
