const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");
const { spawn } = require("child_process");

const time = 4000;

async function updateReadme() {
	const readmePath = path.join(__dirname, "README.md");
	if (!fs.existsSync(readmePath)) return console.error("FILE README TIDAK ADA");
	const now = DateTime.now().setZone("Asia/Jakarta").toFormat("yyyy-MM-dd HH:mm:ss");
	const content = fs
		.readFileSync(readmePath, "utf8")
		.split("---")
		.map((x, i) => (i === 1 ? ` Last update: ${now} WIB ` : x))
		.join("---");
	fs.writeFileSync(readmePath, content, "utf8");
	return;
}

async function runGitPush() {
	const batPath = path.resolve(__dirname, "gitpush.bat");
	if (!fs.existsSync(batPath)) return console.error("gitpush.bat tidak ditemukan.");
	spawn("cmd.exe", ["/c", batPath], { stdio: "inherit" }).on("close", (code) => console.log(code === 0 ? "BERHASIL PUSH KE GITHUB" : `ERROR PUSH KE GITHUB! ERROR: ${code}.`));
}

setInterval(async () => {
	try {
		await updateReadme();
		await runGitPush();
	} catch (error) {
		console.error("Terjadi kesalahan:", error);
	}
}, time);

console.log("Job dijadwalkan.");
