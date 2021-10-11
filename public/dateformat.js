function formattedDate(model, attr) {
	const date = [];
	function fotrmatted_date(raw_date) {
		return `${raw_date.getFullYear()}-${
			raw_date.getMonth() + 1
		}-${raw_date.getDate()} ${raw_date.getHours()}:${raw_date.getMinutes()}:${raw_date.getSeconds()}`;
	}
	model.forEach((el) => {
		const raw_date = el.dataValues[attr];
		date.push(fotrmatted_date(raw_date));
	});
	return date;
}

module.exports = formattedDate;
