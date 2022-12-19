import { useOnyxPeople } from "./axios";

const onyxPeople = useOnyxPeople();

export const isAuthed = async (token: string) => {
	try {
		const { data } = await onyxPeople.post("/auth/check", { token });
		const { validated, error } = data;
		if (!validated) {
			return false;
		}

		if (error) {
			return false;
		}

		return validated;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const login = async (username: string, password: string) => {
	try {
		const { data } = await onyxPeople.post("/users/signin", { username, password });
		console.log("Data", data);
		const { access_token, refresh_token, error } = data;
		if (error) {
			return { error };
		}

		return { access_token, refresh_token };
	} catch (error) {
		console.error(error);
		return { error };
	}
};

export const logout = async (username: string) => {
	try {
		const { data } = await onyxPeople.post("/users/logout", { username });
		const { error } = data;
		if (error) {
			return { error };
		}

		return { error };
	} catch (error) {
		console.error(error);
		return { error };
	}
};

export const refresh = async (token: string) => {
	try {
		const { data } = await onyxPeople.post("/users/refresh", { token });
		const { token: newToken, error } = data;
		if (error) {
			return { error };
		}

		return { token: newToken };
	} catch (error) {
		console.error(error);
		return { error };
	}
};
