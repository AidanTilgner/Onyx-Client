export const checkAuth = async () => {
	const accessToken = localStorage.getItem("access_token");
	if (!accessToken) {
		return false;
	}
	const body = await fetch(`/api/login?token=${accessToken}`);
	const { status } = body;
	if (status === 200 || (status >= 200 && status < 300)) {
		return true;
	}

	// try to refresh the token
	const refreshSuccess = await refreshUser();

	if (refreshSuccess) {
		return true;
	}

	return false;
};

export const checkAuthAndRedirect = async (ifIs: boolean, to: string) => {
	const auth = await checkAuth();
	if (!auth && ifIs) {
		window.location.href = to;
	}
	if (auth && !ifIs) {
		window.location.href = to;
	}
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
	localStorage.setItem("username", username);
	return true;
};

export const logoutUser = async () => {
	localStorage.removeItem("access_token");
	localStorage.removeItem("refresh_token");
	const response = await fetch("/api/login", {
		method: "DELETE"
	});

	const body = await response.json();
	const { error } = body;
	if (error) {
		return false;
	}

	return true;
};

export const refreshUser = async () => {
	const refreshToken = localStorage.getItem("refresh_token");
	const username = localStorage.getItem("username");
	const response = await fetch(`/api/login`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ refresh_token: refreshToken, username })
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
