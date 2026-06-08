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
	const isWindows = process.platform === "win32";
	const shPath = path.resolve(__dirname, isWindows ? "gitpush.bat" : "gitpush.sh");
	if (!fs.existsSync(shPath)) return console.error("gitpush tidak ditemukan.");
	const child = isWindows ? spawn("cmd.exe", ["/c", shPath], { stdio: "inherit" }) : spawn("sh", [shPath], { stdio: "inherit" });
	child.on("close", (code) => console.log(code === 0 ? "BERHASIL PUSH KE GITHUB" : `ERROR PUSH KE GITHUB! ERROR: ${code}.`));
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
