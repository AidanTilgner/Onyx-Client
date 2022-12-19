import type { RequestHandler } from "@sveltejs/kit";
import { isAuthed, login, logout, refresh } from "$lib/server/auth";

export const GET: RequestHandler = async (request) => {
	try {
		const token = request.url.searchParams.get("token");

		if (!token) {
			return new Response(JSON.stringify({ error: "No Token", message: "No Token" }), {
				status: 401,
				statusText: "Unauthorized"
			});
		}
		const authed = await isAuthed(token);
		if (!authed) {
			return new Response(JSON.stringify({ error: "Not Authed", message: "Not Authed" }), {
				status: 401,
				statusText: "Unauthorized"
			});
		}
		return new Response(
			JSON.stringify({
				authed: true,
				token,
				message: "Authed"
			}),
			{
				status: 200,
				statusText: "OK",
				headers: { "Content-Type": "application/json" }
			}
		);
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({ error: "Error Checking Auth", message: "Error Checking Auth" }),
			{ status: 401, statusText: "Unauthorized" }
		);
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return new Response(
				JSON.stringify({ error: "No Username or Password", message: "No Username or Password" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		const { access_token, refresh_token, error } = await login(username, password);
		if (error) {
			return new Response(
				JSON.stringify({ error: "Error Logging In", message: "Error Logging In" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		return new Response(
			JSON.stringify({
				authed: true,
				access_token,
				refresh_token,
				message: "Logged In"
			}),
			{
				status: 200,
				statusText: "OK",
				headers: { "Content-Type": "application/json" }
			}
		);
	} catch (err) {
		console.error(err);
		return new Response("Error Logging In", { status: 401, statusText: "Unauthorized" });
	}
};

export const PUT: RequestHandler = async ({ request }) => {
	// hits the refresh endpoint
	try {
		const { refresh_token, username } = await request.json();

		if (!refresh_token) {
			return new Response(
				JSON.stringify({ error: "No Refresh Token", message: "No Refresh Token" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		const {
			access_token,
			refresh_token: new_refresh_token,
			error
		} = await refresh(username, refresh_token);
		if (error) {
			return new Response(
				JSON.stringify({ error: "Error Refreshing Token", message: "Error Refreshing Token" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		return new Response(
			JSON.stringify({
				authed: true,
				access_token,
				refresh_token: new_refresh_token,
				message: "Refreshed Token"
			}),
			{
				status: 200,
				statusText: "OK",
				headers: { "Content-Type": "application/json" }
			}
		);
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({
				error: "Error Refreshing Token",
				message: "Error Refreshing Token"
			}),
			{ status: 401, statusText: "Unauthorized" }
		);
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	// hits the logout endpoint
	try {
		const { refresh_token } = await request.json();

		if (!refresh_token) {
			return new Response(
				JSON.stringify({ error: "No Refresh Token", message: "No Refresh Token" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		const { error } = await logout(refresh_token);
		if (error) {
			return new Response(
				JSON.stringify({ error: "Error Logging Out", message: "Error Logging Out" }),
				{ status: 401, statusText: "Unauthorized" }
			);
		}
		return new Response(
			JSON.stringify({
				authed: false,
				access_token: null,
				refresh_token: null,
				message: "Logged Out"
			}),
			{
				status: 200,
				statusText: "OK",
				headers: { "Content-Type": "application/json" }
			}
		);
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({ error: "Error Logging Out", message: "Error Logging Out" }),
			{ status: 401, statusText: "Unauthorized" }
		);
	}
};
