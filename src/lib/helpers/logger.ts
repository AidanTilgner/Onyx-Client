import fs from "fs";

export class Logger {
	private logFile: string;

	private constructor() {
		this.logFile = "/storage/logs.txt";
	}

	public log(message: string, ...args: any[]) {
		fs.appendFileSync(this.logFile, message, ...args);
		console.log(message, ...args);
	}
}
