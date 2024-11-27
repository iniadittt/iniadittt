const schedule = require("node-schedule");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const time = 1000;

async function CHANGE() {
	const readmePath = path.join(__dirname, "README.md");
	const README = fs.readFileSync(readmePath, "utf8");
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const date = String(today.getDate()).padStart(2, "0");
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");
	const seconds = String(today.getSeconds()).padStart(2, "0");
	const formattedDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
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
