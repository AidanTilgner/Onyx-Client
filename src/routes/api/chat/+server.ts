import type { ChatResponse } from "$lib/declarations/main";
import { onyxInterpretation } from "$lib/server/axios";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (request) => {
	try {
		const { message, session_id } = await request.request.json();
		const access_token = request.url.searchParams.get("access_token");
		const response = await onyxInterpretation
			.post(
				"/chat",
				{
					message,
					session_id
				},
				{
					headers: {
						"x-access-token": access_token
					}
				}
			)
			.then((res) => {
				return res.data as ChatResponse;
			});
		if (response.error) {
			return new Response(
				JSON.stringify({ error: "Error Sending Chat", message: "Error Sending Chat" }),
				{ status: 500, statusText: "Internal Server Error" }
			);
		}
		return new Response(JSON.stringify(response), {
			status: 200,
			statusText: "OK",
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error(err);
		return new Response(
			JSON.stringify({ error: "Error Sending Chat", message: "Error Sending Chat" }),
			{ status: 500, statusText: "Internal Server Error" }
		);
	}
};
