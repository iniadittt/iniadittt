const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");
const { spawn } = require("child_process");

const time = 5000; // 5 detik

async function CHANGE() {
	try {
		const readmePath = path.join(__dirname, "README.md");
		if (!fs.existsSync(readmePath)) {
			console.error("File README.md tidak ditemukan.");
			return;
		}

		const README = fs.readFileSync(readmePath, "utf8");
		const now = DateTime.now().setZone("Asia/Jakarta");
		const formattedDate = now.toFormat("yyyy-MM-dd HH:mm:ss");

		const NEWREADME = README.split("---")
			.map((x, i) => (i === 1 ? ` Last update: ${formattedDate} WIB ` : x))
			.join("---");

		fs.writeFileSync(readmePath, NEWREADME, "utf8");
		console.log("README.md berhasil diperbarui.");
	} catch (error) {
		console.error("Gagal memperbarui README.md:", error);
	}
}

async function executeBatScript() {
	try {
		const batPath = path.resolve(__dirname, "gitpush.bat");
		if (!fs.existsSync(batPath)) {
			console.error("File gitpush.bat tidak ditemukan.");
			return;
		}

		const process = spawn("cmd.exe", ["/c", batPath], { stdio: "inherit" });

		process.on("error", (err) => {
			console.error("Gagal menjalankan script batch:", err);
		});

		process.on("close", (code) => {
			if (code === 0) {
				console.log("gitpush.bat berhasil dijalankan.");
			} else {
				console.error(`gitpush.bat keluar dengan kode ${code}.`);
			}
		});
	} catch (error) {
		console.error("Gagal menjalankan script batch:", error);
	}
}

setInterval(async () => {
	try {
		await CHANGE();
		await executeBatScript();
		console.log("BERHASIL PUSH KE GITHUB");
	} catch (error) {
		console.error("ERROR PUSH KE GITHUB:", error);
	}
}, time);

console.log("Job telah dijadwalkan.");
