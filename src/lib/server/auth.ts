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
