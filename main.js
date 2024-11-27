const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");
const { exec } = require("child_process");

const time = 5000;

async function CHANGE() {
	const readmePath = path.join(__dirname, "README.md");
	const README = fs.readFileSync(readmePath, "utf8");
	const now = DateTime.now().setZone("Asia/Jakarta");
	const formattedDate = now.toFormat("yyyy-MM-dd HH:mm:ss");
	const NEWREADME = README.split("---")
		.map((x, i) => (i === 1 ? ` Last update: ${formattedDate} WIB ` : x))
		.join("---");
	fs.writeFileSync(readmePath, NEWREADME);
	return;
}

async function executeBatScript() {
	const batPath = path.resolve(__dirname, "gitpush.sh");
	exec(`sh ${batPath}`);
	return;
}

setInterval(async () => {
	try {
		await CHANGE();
		await executeBatScript();
		console.log("BERHASIL PUSH KE GITHUB");
	} catch (error) {
		console.log("ERROR PUSH KE GITHUB");
	}
}, time);

console.log("Job telah dijadwalkan.");
