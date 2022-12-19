import type { error, RequestHandler } from "@sveltejs/kit";
import { isAuthed } from "../../lib/server/auth";

export const GET: RequestHandler = async (request) => {
	try {
		const token = request.url.searchParams.get("token");
		console.log("token: ", token);
		if (!token) {
			return new Response("No Token", { status: 401, statusText: "Unauthorized" });
		}
		const authed = await isAuthed(token);
		if (!authed) {
			return new Response("Not Authed", { status: 401, statusText: "Unauthorized" });
		}
		return new Response("Authed", {
			status: 200,
			statusText: "OK",
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error(err);
		return new Response("Error Checking Auth", { status: 401, statusText: "Unauthorized" });
	}
};
