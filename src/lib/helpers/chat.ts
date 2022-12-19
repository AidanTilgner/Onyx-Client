import type { ChatResponse } from "$lib/declarations/main";

export const sendChat = async (message: string, session_id: string): Promise<ChatResponse> => {
	const accessToken = localStorage.getItem("access_token");
	const response = await fetch(`/api/chat?access_token=${accessToken}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message,
			session_id
		})
	}).then((res) => {
		return res.json() as unknown as ChatResponse;
	});

	return {
		...response
	};
};
