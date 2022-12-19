export const checkAuth = async () => {
	const body = await fetch("/login?token=1234");
	console.log("Body", body);
	return false;
};

export const loginUser = async (username: string, password: string) => {
	return true;
};
