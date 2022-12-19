export type ChatResponse = {
	response: string;
	actions_performed: string[];
	actions_failed: string[];
	metadata: unknown;
	error?: unknown;
};
