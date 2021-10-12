const Teams = require("../models/teams");
const path = require("path");
const fs = require("fs");

async function deleteTeamLogo(teamName) {
	const team = await Teams.findOne({
		attributes: ["logo_filename"],
		where: {
			team_name: teamName,
		},
	});
	const fileName = team.dataValues.logo_filename;
	const dir = path.join(__dirname, "../public/uploads");
	const fileDir = path.join(dir, "/" + fileName);
	console.log(fileDir);
	if (fileName) {
		fs.unlink(fileDir, async function (err) {
			try {
				console.log("*** Team logo file is deleted! ***");
			} catch (err) {
				console.error(err);
			}
		});
	}
}

module.exports = deleteTeamLogo;
