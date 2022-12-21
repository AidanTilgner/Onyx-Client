import type { RequestHandler } from "@sveltejs/kit";
import { onyxPeople } from "$lib/server/axios";

export const GET: RequestHandler = async (request) => {
	try {
		const token = request.url.searchParams.get("token");
		const response = await onyxPeople.get("/users/me", {
			headers: {
				"x-access-token": token
			}
		});

		const { result, message } = response.data;
		return new Response(
			JSON.stringify({
				status: 200,
				message,
				data: result
			}),
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: "error",
				data: error
			}),
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}
};

export const PUT: RequestHandler = async (request) => {
	try {
		const token = request.url.searchParams.get("token");
		const newUser = await request.request.json();
		const response = await onyxPeople.put("/users/me", newUser, {
			headers: {
				"x-access-token": token
			}
		});

		const { result, message } = response.data;
		return new Response(
			JSON.stringify({
				status: 200,
				message,
				data: result
			}),
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: "error",
				data: error
			}),
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}
};
