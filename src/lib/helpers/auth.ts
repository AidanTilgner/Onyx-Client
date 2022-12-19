export const checkAuth = async () => {
	const accessToken = localStorage.getItem("access_token");
	const body = await fetch(`/api/login?token=${accessToken}`);
	const { status } = body;
	if (status === 200 || (status >= 200 && status < 300)) {
		return true;
	}

	return false;
};

export const loginUser = async (username: string, password: string) => {
	const response = await fetch("/api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ username, password })
	});
	const body = await response.json();
	const { access_token, refresh_token, error } = body;
	if (error) {
		return false;
	}
	localStorage.setItem("access_token", access_token);
	localStorage.setItem("refresh_token", refresh_token);
	return true;
};
