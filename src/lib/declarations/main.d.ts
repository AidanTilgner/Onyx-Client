export type ChatResponse = {
	response: string;
	actions_performed: string[];
	actions_failed: string[];
	metadata: unknown;
	error?: unknown;
};

export type UserProfile = {
	id: number;
	username: string;
	email: string | null;
	role: string;
	allowed_roles: string;
	disabled: boolean;
	first_name: string | null;
	last_name: string | null;
	interests: string[] | null;
	phone_number: string | null;
	createdAt: string;
	updatedAt: string;
};
