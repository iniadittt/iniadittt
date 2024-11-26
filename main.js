const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const time = 3 * 1 * 1000;

async function CHANGE() {
	const readmePath = path.join(__dirname, "README.md");
	console.log({ readmePath });
	const README = fs.readFileSync(readmePath, "utf8");
	console.log({ README });
	const today = new Date();
	console.log({ today });
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const date = String(today.getDate()).padStart(2, "0");
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");
	const seconds = String(today.getSeconds()).padStart(2, "0");
	const formattedDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
	console.log({ formattedDate });
	const NEWREADME = README.split("---")
		.map((x, i) => (i === 1 ? ` Last update: ${formattedDate} WIB ` : x))
		.join("---");
	console.log({ NEWREADME });
	fs.writeFileSync(readmePath, NEWREADME);
	return;
}

async function executeBatScript() {
	const batPath = path.resolve(__dirname, "gitpush.bat");
	exec(batPath);
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
